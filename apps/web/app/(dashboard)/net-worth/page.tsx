'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar,
} from 'recharts';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { useRealtime } from '@/lib/hooks/use-realtime';
import { StatCard } from '@/components/shared/stat-card';
import { ChartContainer } from '@/components/shared/chart-container';
import { DateRangePicker } from '@/components/shared/date-range-picker';
import { formatCurrency, formatPercent } from '@/lib/utils/format';
import { TrendingUp, TrendingDown, Building2, Briefcase, Home, Landmark } from 'lucide-react';

const COLORS = ['#c8b88a', '#5a8ec4', '#4a9e6e', '#c89b4a', '#c45a5a', '#8a6ec4', '#5ac4b8'];

type DateRange = '1M' | '3M' | '6M' | '1Y' | '5Y' | 'ALL';

export default function NetWorthPage() {
  const { tenant } = useTenant();
  const supabase = createClient();
  const [range, setRange] = useState<DateRange>('1Y');

  const { data: holdings, isLoading } = useQuery({
    queryKey: ['net-worth-holdings', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('holdings')
        .select('id, symbol, security_name, asset_class, quantity, current_price, cost_basis, market_value, unrealized_pnl, account_id')
        .eq('tenant_id', tenant.id);
      return data || [];
    },
    enabled: !!tenant?.id,
  });

  const { data: entities } = useQuery({
    queryKey: ['net-worth-entities', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('entities')
        .select('id, name, entity_type, total_value')
        .eq('tenant_id', tenant.id)
        .order('total_value', { ascending: false });
      return data || [];
    },
    enabled: !!tenant?.id,
  });

  const { data: properties } = useQuery({
    queryKey: ['net-worth-properties', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('properties')
        .select('id, name, property_type, current_value, purchase_price')
        .eq('tenant_id', tenant.id);
      return data || [];
    },
    enabled: !!tenant?.id,
  });

  useRealtime('holdings', ['net-worth-holdings', tenant?.id ?? ''], tenant?.id);

  const totalPortfolio = holdings?.reduce((s, h) => s + (h.market_value || h.quantity * h.current_price || 0), 0) || 0;
  const totalRealEstate = properties?.reduce((s, p) => s + (p.current_value || 0), 0) || 0;
  const totalEntities = entities?.reduce((s, e) => s + (e.total_value || 0), 0) || 0;
  const netWorth = totalPortfolio + totalRealEstate;
  const totalCost = holdings?.reduce((s, h) => s + (h.cost_basis || 0), 0) || 0;
  const totalPnl = holdings?.reduce((s, h) => s + (h.unrealized_pnl || 0), 0) || 0;
  const returnPct = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0;

  // Asset class breakdown
  const assetBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    holdings?.forEach(h => {
      const cls = h.asset_class || 'Other';
      map[cls] = (map[cls] || 0) + (h.market_value || h.quantity * h.current_price || 0);
    });
    if (totalRealEstate > 0) map['Real Estate'] = (map['Real Estate'] || 0) + totalRealEstate;
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [holdings, totalRealEstate]);

  // Entity breakdown
  const entityBreakdown = useMemo(() => {
    return (entities || []).slice(0, 8).map(e => ({
      name: e.name?.length > 20 ? e.name.slice(0, 20) + '…' : e.name,
      value: e.total_value || 0,
    }));
  }, [entities]);

  // Simulated historical chart data
  const chartData = useMemo(() => {
    const months = range === '1M' ? 30 : range === '3M' ? 90 : range === '6M' ? 180 : range === '1Y' ? 365 : range === '5Y' ? 1825 : 3650;
    const points: { date: string; value: number }[] = [];
    const now = new Date();
    const dataPoints = Math.min(months, 60);

    for (let i = dataPoints; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - (i * months / dataPoints));
      const progress = 1 - (i / dataPoints);
      const variance = progress * 0.3 + 0.7 + Math.sin(i * 0.3) * 0.04;
      points.push({
        date: d.toLocaleDateString('en-US', { month: 'short', day: months <= 90 ? 'numeric' : undefined, year: months > 365 ? '2-digit' : undefined }),
        value: netWorth * variance,
      });
    }
    return points;
  }, [netWorth, range]);

  const totalAlloc = assetBreakdown.reduce((s, a) => s + a.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-normal text-white/90">Net Worth</h1>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Net Worth"
          value={formatCurrency(netWorth, 'USD', true)}
          icon={<Landmark size={16} />}
          loading={isLoading}
        />
        <StatCard
          label="Public Portfolio"
          value={formatCurrency(totalPortfolio, 'USD', true)}
          change={formatPercent(returnPct) + ' return'}
          changeType={returnPct >= 0 ? 'positive' : 'negative'}
          icon={<Briefcase size={16} />}
          loading={isLoading}
        />
        <StatCard
          label="Real Estate"
          value={formatCurrency(totalRealEstate, 'USD', true)}
          icon={<Home size={16} />}
          loading={isLoading}
        />
        <StatCard
          label="Entities"
          value={String(entities?.length || 0)}
          change={formatCurrency(totalEntities, 'USD', true) + ' total'}
          changeType="neutral"
          icon={<Building2 size={16} />}
          loading={isLoading}
        />
      </div>

      {/* Net Worth Chart */}
      <ChartContainer
        title="Net Worth Over Time"
        action={<DateRangePicker value={range} onChange={setRange} />}
      >
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="nwAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c8b88a" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#c8b88a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" stroke="rgba(255,255,255,0.1)" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis stroke="rgba(255,255,255,0.1)" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatCurrency(v, 'USD', true)} width={65} />
            <Tooltip
              contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, fontSize: 12 }}
              labelStyle={{ color: 'rgba(255,255,255,0.5)' }}
              formatter={(value: number) => [formatCurrency(value), 'Net Worth']}
            />
            <Area type="monotone" dataKey="value" stroke="#c8b88a" strokeWidth={1.5} fill="url(#nwAreaGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Breakdown Charts */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {/* Asset Class Breakdown */}
        <ChartContainer title="Asset Class Breakdown">
          {assetBreakdown.length > 0 ? (
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={assetBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={95} dataKey="value" stroke="none">
                    {assetBreakdown.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, fontSize: 12 }}
                    formatter={(value: number) => [formatCurrency(value, 'USD', true)]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
                {assetBreakdown.map((a, i) => (
                  <div key={a.name} className="flex items-center gap-1.5 text-xs text-white/50">
                    <span className="h-2 w-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                    {a.name} ({totalAlloc > 0 ? ((a.value / totalAlloc) * 100).toFixed(1) : 0}%)
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-[240px] items-center justify-center text-sm text-white/30">
              No asset data available
            </div>
          )}
        </ChartContainer>

        {/* Entity Breakdown */}
        <ChartContainer title="By Entity">
          {entityBreakdown.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={entityBreakdown} layout="vertical">
                <XAxis type="number" stroke="rgba(255,255,255,0.1)" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatCurrency(v, 'USD', true)} />
                <YAxis type="category" dataKey="name" stroke="rgba(255,255,255,0.1)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} width={120} />
                <Tooltip
                  contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, fontSize: 12 }}
                  formatter={(value: number) => [formatCurrency(value, 'USD', true)]}
                />
                <Bar dataKey="value" fill="#c8b88a" radius={[0, 2, 2, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-[280px] items-center justify-center text-sm text-white/30">
              No entity data available
            </div>
          )}
        </ChartContainer>
      </div>

      {/* Family Member Breakdown */}
      <ChartContainer title="Holdings by Account">
        {holdings && holdings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.04]">
                  <th className="px-4 py-3 text-left text-[10px] font-medium uppercase tracking-[2px] text-white/30">Asset Class</th>
                  <th className="px-4 py-3 text-right text-[10px] font-medium uppercase tracking-[2px] text-white/30">Holdings</th>
                  <th className="px-4 py-3 text-right text-[10px] font-medium uppercase tracking-[2px] text-white/30">Market Value</th>
                  <th className="px-4 py-3 text-right text-[10px] font-medium uppercase tracking-[2px] text-white/30">Allocation</th>
                </tr>
              </thead>
              <tbody>
                {assetBreakdown.map((a, i) => (
                  <tr key={a.name} className="border-b border-white/[0.03] last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                        <span className="text-sm text-white/70">{a.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-white/50">
                      {holdings.filter(h => (h.asset_class || 'Other') === a.name).length}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-white/70">
                      {formatCurrency(a.value, 'USD', true)}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-white/50">
                      {totalAlloc > 0 ? ((a.value / totalAlloc) * 100).toFixed(1) : 0}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex h-[100px] items-center justify-center text-sm text-white/30">
            No holdings data available
          </div>
        )}
      </ChartContainer>
    </div>
  );
}
