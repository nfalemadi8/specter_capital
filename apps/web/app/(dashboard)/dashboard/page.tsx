'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  TrendingUp, ArrowLeftRight, BarChart3, ClipboardCheck,
  Send, FileCheck, Handshake, Upload,
  DollarSign, Building2, Clock,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { StatCard } from '@/components/shared/stat-card';
import { ChartContainer } from '@/components/shared/chart-container';
import { DateRangePicker } from '@/components/shared/date-range-picker';
import { StatusBadge } from '@/components/shared/status-badge';
import { formatCurrency, formatPercent, formatRelativeTime } from '@/lib/utils/format';

const ASSET_COLORS = ['#c8b88a', '#5a8ec4', '#4a9e6e', '#c89b4a', '#c45a5a', '#8a6ec4', '#5ac4b8'];

const MARKET_HOURS = [
  { name: 'NYSE', tz: 'America/New_York', open: 9.5, close: 16, flag: '🇺🇸' },
  { name: 'NASDAQ', tz: 'America/New_York', open: 9.5, close: 16, flag: '🇺🇸' },
  { name: 'LSE', tz: 'Europe/London', open: 8, close: 16.5, flag: '🇬🇧' },
  { name: 'TSE', tz: 'Asia/Tokyo', open: 9, close: 15, flag: '🇯🇵' },
  { name: 'Tadawul', tz: 'Asia/Riyadh', open: 10, close: 15, flag: '🇸🇦' },
];

function isMarketOpen(market: typeof MARKET_HOURS[0]): boolean {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: market.tz,
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
      weekday: 'short',
    });
    const parts = formatter.formatToParts(now);
    const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0');
    const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0');
    const weekday = parts.find(p => p.type === 'weekday')?.value || '';
    const currentHour = hour + minute / 60;
    if (['Sat', 'Sun'].includes(weekday)) return false;
    return currentHour >= market.open && currentHour < market.close;
  } catch {
    return false;
  }
}

type DateRange = '1M' | '3M' | '6M' | '1Y' | '5Y' | 'ALL';

export default function DashboardPage() {
  const supabase = createClient();
  const [chartRange, setChartRange] = useState<DateRange>('1Y');

  // Fetch KPI data
  const { data: kpis, isLoading: kpisLoading } = useQuery({
    queryKey: ['dashboard-kpis'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: member } = await supabase
        .from('tenant_members')
        .select('tenant_id')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (!member) return null;

      // Fetch holdings for net worth
      const { data: holdings } = await supabase
        .from('holdings')
        .select('quantity, current_price, cost_basis')
        .eq('tenant_id', member.tenant_id);

      // Fetch recent cash flows
      const { data: cashFlows } = await supabase
        .from('cash_flow_entries')
        .select('amount, entry_type')
        .eq('tenant_id', member.tenant_id)
        .gte('entry_date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

      // Fetch pending approvals
      const { data: pendingBills } = await supabase
        .from('bill_payments')
        .select('id')
        .eq('tenant_id', member.tenant_id)
        .eq('status', 'pending');

      const totalValue = holdings?.reduce((sum, h) => sum + (h.quantity || 0) * (h.current_price || 0), 0) || 0;
      const totalCost = holdings?.reduce((sum, h) => sum + (h.cost_basis || 0), 0) || 0;
      const monthlyInflow = cashFlows?.filter(c => c.entry_type === 'inflow').reduce((s, c) => s + (c.amount || 0), 0) || 0;
      const monthlyOutflow = cashFlows?.filter(c => c.entry_type === 'outflow').reduce((s, c) => s + (c.amount || 0), 0) || 0;
      const returnPct = totalCost > 0 ? ((totalValue - totalCost) / totalCost) * 100 : 0;

      return {
        netWorth: totalValue,
        monthlyCashFlow: monthlyInflow - monthlyOutflow,
        returnYTD: returnPct,
        pendingApprovals: pendingBills?.length || 0,
        tenantId: member.tenant_id,
      };
    },
  });

  // Fetch allocation data
  const { data: allocation } = useQuery({
    queryKey: ['dashboard-allocation', kpis?.tenantId],
    queryFn: async () => {
      if (!kpis?.tenantId) return [];
      const { data: holdings } = await supabase
        .from('holdings')
        .select('asset_class, quantity, current_price')
        .eq('tenant_id', kpis.tenantId);

      if (!holdings?.length) return [];

      const byClass: Record<string, number> = {};
      holdings.forEach(h => {
        const cls = h.asset_class || 'Other';
        byClass[cls] = (byClass[cls] || 0) + (h.quantity || 0) * (h.current_price || 0);
      });

      return Object.entries(byClass).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
    },
    enabled: !!kpis?.tenantId,
  });

  // Fetch activity feed
  const { data: activities } = useQuery({
    queryKey: ['dashboard-activity', kpis?.tenantId],
    queryFn: async () => {
      if (!kpis?.tenantId) return [];
      const { data } = await supabase
        .from('audit_log')
        .select('id, action, resource_type, resource_id, metadata, created_at, user_id')
        .eq('tenant_id', kpis.tenantId)
        .order('created_at', { ascending: false })
        .limit(20);
      return data || [];
    },
    enabled: !!kpis?.tenantId,
  });

  // Fetch entities for mini tree
  const { data: entities } = useQuery({
    queryKey: ['dashboard-entities', kpis?.tenantId],
    queryFn: async () => {
      if (!kpis?.tenantId) return [];
      const { data } = await supabase
        .from('entities')
        .select('id, name, entity_type, total_value')
        .eq('tenant_id', kpis.tenantId)
        .is('parent_entity_id', null)
        .order('total_value', { ascending: false })
        .limit(6);
      return data || [];
    },
    enabled: !!kpis?.tenantId,
  });

  // Fetch watchlist
  const { data: watchlist } = useQuery({
    queryKey: ['dashboard-watchlist', kpis?.tenantId],
    queryFn: async () => {
      if (!kpis?.tenantId) return [];
      const { data } = await supabase
        .from('watchlist')
        .select('id, symbol, name, current_price, price_change_pct, alert_above, alert_below')
        .eq('tenant_id', kpis.tenantId)
        .limit(5);
      return data || [];
    },
    enabled: !!kpis?.tenantId,
  });

  // Generate mock chart data for net worth over time
  const chartData = useMemo(() => {
    const base = kpis?.netWorth || 0;
    const points: { date: string; value: number }[] = [];
    const months = chartRange === '1M' ? 1 : chartRange === '3M' ? 3 : chartRange === '6M' ? 6 : chartRange === '1Y' ? 12 : chartRange === '5Y' ? 60 : 120;
    const now = new Date();

    for (let i = months; i >= 0; i--) {
      const d = new Date(now);
      d.setMonth(d.getMonth() - i);
      const variance = 1 - (i / months) * 0.3 + (Math.sin(i * 0.5) * 0.05);
      points.push({
        date: d.toLocaleDateString('en-US', { month: 'short', year: i > 12 ? '2-digit' : undefined }),
        value: base * variance,
      });
    }
    return points;
  }, [kpis?.netWorth, chartRange]);

  const totalAllocation = allocation?.reduce((s, a) => s + a.value, 0) || 0;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Net Worth"
          value={formatCurrency(kpis?.netWorth || 0, 'USD', true)}
          change={kpis ? formatPercent(kpis.returnYTD) + ' all time' : undefined}
          changeType={kpis && kpis.returnYTD >= 0 ? 'positive' : 'negative'}
          icon={<TrendingUp size={16} />}
          loading={kpisLoading}
        />
        <StatCard
          label="Monthly Cash Flow"
          value={formatCurrency(kpis?.monthlyCashFlow || 0, 'USD', true)}
          change="Last 30 days"
          changeType={kpis && kpis.monthlyCashFlow >= 0 ? 'positive' : 'negative'}
          icon={<ArrowLeftRight size={16} />}
          loading={kpisLoading}
        />
        <StatCard
          label="Portfolio Return YTD"
          value={kpis ? formatPercent(kpis.returnYTD) : '—'}
          change="vs S&P 500"
          changeType="neutral"
          icon={<BarChart3 size={16} />}
          loading={kpisLoading}
        />
        <StatCard
          label="Pending Approvals"
          value={String(kpis?.pendingApprovals || 0)}
          change={kpis?.pendingApprovals ? 'Requires attention' : 'All clear'}
          changeType={kpis?.pendingApprovals ? 'warning' : 'positive'}
          icon={<ClipboardCheck size={16} />}
          loading={kpisLoading}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Net Worth Chart */}
        <ChartContainer
          title="Net Worth"
          className="xl:col-span-2"
          action={<DateRangePicker value={chartRange} onChange={setChartRange} />}
        >
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="nwGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c8b88a" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#c8b88a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.1)" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis stroke="rgba(255,255,255,0.1)" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatCurrency(v, 'USD', true)} width={60} />
              <Tooltip
                contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, fontSize: 12 }}
                labelStyle={{ color: 'rgba(255,255,255,0.5)' }}
                itemStyle={{ color: '#c8b88a' }}
                formatter={(value: number) => [formatCurrency(value), 'Net Worth']}
              />
              <Area type="monotone" dataKey="value" stroke="#c8b88a" strokeWidth={1.5} fill="url(#nwGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Allocation Donut */}
        <ChartContainer title="Asset Allocation">
          {allocation && allocation.length > 0 ? (
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={allocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    dataKey="value"
                    stroke="none"
                  >
                    {allocation.map((_, i) => (
                      <Cell key={i} fill={ASSET_COLORS[i % ASSET_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, fontSize: 12 }}
                    formatter={(value: number) => [formatCurrency(value, 'USD', true)]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
                {allocation.map((a, i) => (
                  <div key={a.name} className="flex items-center gap-1.5 text-xs text-white/50">
                    <span className="h-2 w-2 rounded-full" style={{ background: ASSET_COLORS[i % ASSET_COLORS.length] }} />
                    {a.name} ({totalAllocation > 0 ? ((a.value / totalAllocation) * 100).toFixed(0) : 0}%)
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center text-sm text-white/30">
              No holdings yet
            </div>
          )}
        </ChartContainer>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Activity Feed */}
        <ChartContainer title="Recent Activity" className="xl:col-span-2">
          {activities && activities.length > 0 ? (
            <div className="max-h-[300px] space-y-0 overflow-y-auto">
              {activities.map((a) => (
                <div key={a.id} className="flex items-start gap-3 border-b border-white/[0.03] py-3 last:border-0">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-[var(--phantom-gold)]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/70">
                      <span className="font-medium text-white/80">{a.action}</span>
                      {' '}
                      <span className="text-white/40">{a.resource_type}</span>
                    </p>
                    <p className="mt-0.5 text-xs text-white/30">{formatRelativeTime(a.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center text-sm text-white/30">
              No recent activity
            </div>
          )}
        </ChartContainer>

        {/* Quick Actions */}
        <ChartContainer title="Quick Actions">
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Log Wire', icon: Send, href: '/bill-pay' },
              { label: 'Approve Payment', icon: FileCheck, href: '/bill-pay/approvals' },
              { label: 'Log Deal', icon: Handshake, href: '/deals/new' },
              { label: 'Upload Document', icon: Upload, href: '/documents' },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-2 rounded border border-white/[0.04] p-4 text-center transition-colors hover:border-[rgba(200,184,138,0.15)] hover:bg-white/[0.02]"
              >
                <action.icon size={18} className="text-[var(--phantom-gold)]" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-white/50">{action.label}</span>
              </Link>
            ))}
          </div>
        </ChartContainer>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Entity Tree Mini */}
        <ChartContainer title="Top Entities">
          {entities && entities.length > 0 ? (
            <div className="space-y-0">
              {entities.map((e) => (
                <Link
                  key={e.id}
                  href={`/entities/${e.id}`}
                  className="flex items-center justify-between border-b border-white/[0.03] py-3 text-sm transition-colors last:border-0 hover:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-2">
                    <Building2 size={14} className="text-white/20" />
                    <span className="text-white/70">{e.name}</span>
                    <StatusBadge label={e.entity_type || 'entity'} variant="default" />
                  </div>
                  <span className="font-['DM_Sans'] text-sm font-light text-white/50">
                    {formatCurrency(e.total_value || 0, 'USD', true)}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex h-[150px] items-center justify-center text-sm text-white/30">
              No entities configured
            </div>
          )}
        </ChartContainer>

        {/* Watchlist */}
        <ChartContainer title="Watchlist">
          {watchlist && watchlist.length > 0 ? (
            <div className="space-y-0">
              {watchlist.map((w) => (
                <div key={w.id} className="flex items-center justify-between border-b border-white/[0.03] py-3 last:border-0">
                  <div>
                    <span className="text-sm font-medium text-white/80">{w.symbol}</span>
                    <p className="text-xs text-white/30">{w.name}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-white/70">{formatCurrency(w.current_price || 0)}</span>
                    {w.price_change_pct != null && (
                      <p className={`text-xs ${w.price_change_pct >= 0 ? 'text-[var(--phantom-success)]' : 'text-[var(--phantom-danger)]'}`}>
                        {formatPercent(w.price_change_pct)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[150px] items-center justify-center text-sm text-white/30">
              No watchlist items
            </div>
          )}
        </ChartContainer>

        {/* Market Hours */}
        <ChartContainer title="Market Hours">
          <div className="space-y-0">
            {MARKET_HOURS.map((market) => {
              const open = isMarketOpen(market);
              return (
                <div key={market.name} className="flex items-center justify-between border-b border-white/[0.03] py-3 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{market.flag}</span>
                    <span className="text-sm text-white/70">{market.name}</span>
                  </div>
                  <StatusBadge
                    label={open ? 'Open' : 'Closed'}
                    variant={open ? 'success' : 'default'}
                    dot
                  />
                </div>
              );
            })}
          </div>
        </ChartContainer>
      </div>
    </div>
  );
}
