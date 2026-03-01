'use client';

import { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { useRealtime } from '@/lib/hooks/use-realtime';
import { formatCurrency, formatPercent } from '@/lib/utils/format';
import { StatCard } from '@specter/ui';
import { TrendingUp, Wallet, BarChart3, Clock } from 'lucide-react';
import { AllocationDonut } from '@/components/dashboard/allocation-donut';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { EntityTree } from '@/components/dashboard/entity-tree';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { WatchlistPanel } from '@/components/dashboard/watchlist-panel';
import { LoadingSkeleton } from '@specter/ui';

export default function DashboardPage() {
  const { tenant } = useTenant();
  const supabase = createClient();

  // Fetch portfolio stats
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats', tenant?.id],
    queryFn: async () => {
      if (!tenant) return null;

      const { data: holdings } = await supabase
        .from('holdings')
        .select('market_value, unrealized_pnl, cost_basis, asset_class, sector')
        .eq('tenant_id', tenant.id);

      const totalNetWorth = holdings?.reduce((sum, h) => sum + (h.market_value ?? 0), 0) ?? 0;
      const totalCostBasis = holdings?.reduce((sum, h) => sum + (h.cost_basis ?? 0), 0) ?? 0;
      const totalUnrealized = holdings?.reduce((sum, h) => sum + (h.unrealized_pnl ?? 0), 0) ?? 0;
      const ytdReturn = totalCostBasis > 0 ? (totalUnrealized / totalCostBasis) * 100 : 0;

      // Get liquid assets (cash + equities + ETFs)
      const { data: accounts } = await supabase
        .from('accounts')
        .select('cash_balance')
        .eq('tenant_id', tenant.id);
      const liquidCash = accounts?.reduce((sum, a) => sum + (a.cash_balance ?? 0), 0) ?? 0;
      const liquidHoldings = holdings
        ?.filter((h) => ['equity', 'etf', 'crypto'].includes(h.asset_class))
        .reduce((sum, h) => sum + (h.market_value ?? 0), 0) ?? 0;

      // Get pending actions
      const { count: pendingBills } = await supabase
        .from('bill_payments')
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', tenant.id)
        .eq('status', 'pending');

      const { count: pendingCalls } = await supabase
        .from('capital_calls')
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', tenant.id)
        .eq('status', 'pending');

      // Asset allocation breakdown
      const allocation: Record<string, number> = {};
      holdings?.forEach((h) => {
        const key = h.sector ?? h.asset_class ?? 'Other';
        allocation[key] = (allocation[key] ?? 0) + (h.market_value ?? 0);
      });

      return {
        totalNetWorth,
        liquidAssets: liquidCash + liquidHoldings,
        ytdReturn,
        pendingActions: (pendingBills ?? 0) + (pendingCalls ?? 0),
        allocation,
      };
    },
    enabled: !!tenant?.id,
  });

  // Real-time updates
  useRealtime('holdings', ['dashboard-stats', tenant?.id ?? ''], tenant?.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <QuickActions />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Net Worth"
          value={stats ? formatCurrency(stats.totalNetWorth, 'USD', true) : '--'}
          change={stats ? formatPercent(stats.ytdReturn) : undefined}
          changeType={stats && stats.ytdReturn >= 0 ? 'positive' : 'negative'}
          icon={<TrendingUp size={20} />}
        />
        <StatCard
          title="Liquid Assets"
          value={stats ? formatCurrency(stats.liquidAssets, 'USD', true) : '--'}
          icon={<Wallet size={20} />}
        />
        <StatCard
          title="YTD Return"
          value={stats ? formatPercent(stats.ytdReturn) : '--'}
          changeType={stats && stats.ytdReturn >= 0 ? 'positive' : 'negative'}
          icon={<BarChart3 size={20} />}
        />
        <StatCard
          title="Pending Actions"
          value={stats ? String(stats.pendingActions) : '--'}
          icon={<Clock size={20} />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Asset Allocation */}
          <Suspense fallback={<LoadingSkeleton variant="chart" />}>
            <AllocationDonut allocation={stats?.allocation ?? {}} />
          </Suspense>

          {/* Activity Feed */}
          <Suspense fallback={<LoadingSkeleton variant="card" />}>
            <ActivityFeed />
          </Suspense>
        </div>

        <div className="space-y-6">
          {/* Entity Tree */}
          <Suspense fallback={<LoadingSkeleton variant="card" />}>
            <EntityTree />
          </Suspense>

          {/* Watchlist */}
          <Suspense fallback={<LoadingSkeleton variant="card" />}>
            <WatchlistPanel />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
