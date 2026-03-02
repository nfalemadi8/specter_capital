'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { useRealtime } from '@/lib/hooks/use-realtime';
import { formatCurrency, formatPercent } from '@/lib/utils/format';
import { StatCard, DataTable, type Column } from '@specter/ui';
import { PieChart, TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';
import type { Holding } from '@specter/shared-types';

const columns: Column<Holding & Record<string, unknown>>[] = [
  {
    key: 'symbol',
    header: 'Symbol',
    sortable: true,
    render: (item) => (
      <Link href={`/portfolio/${item.id}`} className="font-medium text-[var(--color-primary)] hover:underline">
        {item.symbol}
      </Link>
    ),
  },
  { key: 'security_name', header: 'Name', sortable: true },
  { key: 'asset_class', header: 'Class', sortable: true },
  {
    key: 'quantity',
    header: 'Qty',
    sortable: true,
    className: 'text-right font-mono',
    render: (item) => <span>{Number(item.quantity).toLocaleString()}</span>,
  },
  {
    key: 'current_price',
    header: 'Price',
    sortable: true,
    className: 'text-right font-mono',
    render: (item) => <span>${Number(item.current_price ?? 0).toFixed(2)}</span>,
  },
  {
    key: 'market_value',
    header: 'Market Value',
    sortable: true,
    className: 'text-right font-mono',
    render: (item) => <span>{formatCurrency(item.market_value ?? 0)}</span>,
  },
  {
    key: 'unrealized_pnl',
    header: 'Unrealized P&L',
    sortable: true,
    className: 'text-right font-mono',
    render: (item) => {
      const pnl = item.unrealized_pnl ?? 0;
      return (
        <span className={pnl >= 0 ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}>
          {formatCurrency(pnl)} ({formatPercent(item.unrealized_pnl_pct ?? 0)})
        </span>
      );
    },
  },
  {
    key: 'sector',
    header: 'Sector',
    sortable: true,
    render: (item) => <span className="text-[var(--color-muted-foreground)]">{item.sector ?? '—'}</span>,
  },
];

export default function PortfolioPage() {
  const { tenant } = useTenant();
  const supabase = createClient();

  const { data: holdings } = useQuery({
    queryKey: ['holdings', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('holdings')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('market_value', { ascending: false });
      return (data ?? []) as Holding[];
    },
    enabled: !!tenant?.id,
  });

  useRealtime('holdings', ['holdings', tenant?.id ?? ''], tenant?.id);

  const totalValue = holdings?.reduce((sum, h) => sum + (h.market_value ?? 0), 0) ?? 0;
  const totalPnl = holdings?.reduce((sum, h) => sum + (h.unrealized_pnl ?? 0), 0) ?? 0;
  const totalCost = holdings?.reduce((sum, h) => sum + (h.cost_basis ?? 0), 0) ?? 0;
  const dayPnlPct = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Portfolio</h1>
        <Link
          href="/portfolio/rebalance"
          className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm text-white hover:bg-[var(--color-surface-hover)]"
        >
          Rebalance
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Portfolio Value"
          value={formatCurrency(totalValue, 'USD', true)}
          icon={<PieChart size={20} />}
        />
        <StatCard
          title="Unrealized P&L"
          value={formatCurrency(totalPnl)}
          change={formatPercent(dayPnlPct)}
          changeType={totalPnl >= 0 ? 'positive' : 'negative'}
          icon={totalPnl >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
        />
        <StatCard
          title="Holdings"
          value={String(holdings?.length ?? 0)}
          icon={<PieChart size={20} />}
        />
      </div>

      <DataTable
        columns={columns}
        data={(holdings ?? []) as (Holding & Record<string, unknown>)[]}
        keyExtractor={(item) => item.id}
        searchable
        searchKeys={['symbol', 'security_name', 'sector']}
        onRowClick={() => {}}
        emptyMessage="No holdings found. Connect a brokerage to get started."
      />
    </div>
  );
}
