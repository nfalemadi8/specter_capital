'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { StatCard } from '@specter/ui';
import { ArrowDownLeft, ArrowUpRight, DollarSign, TrendingUp, Filter } from 'lucide-react';
import { clsx } from 'clsx';
import type { CashFlowEntry } from '@specter/shared-types';

type FilterType = 'all' | 'inflow' | 'outflow';

export default function CashFlowPage() {
  const { tenant } = useTenant();
  const supabase = createClient();
  const [filter, setFilter] = useState<FilterType>('all');

  const { data: entries } = useQuery({
    queryKey: ['cash-flow', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('cash_flow_entries')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('date', { ascending: false });
      return (data ?? []) as CashFlowEntry[];
    },
    enabled: !!tenant?.id,
  });

  const filtered = entries?.filter((e) => filter === 'all' || e.entry_type === filter) ?? [];
  const totalInflows = entries?.filter((e) => e.entry_type === 'inflow').reduce((s, e) => s + e.amount, 0) ?? 0;
  const totalOutflows = entries?.filter((e) => e.entry_type === 'outflow').reduce((s, e) => s + e.amount, 0) ?? 0;
  const netCashFlow = totalInflows - totalOutflows;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Cash Flow</h1>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-[var(--color-muted-foreground)]" />
          {(['all', 'inflow', 'outflow'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={clsx(
                'rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors',
                filter === f
                  ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                  : 'bg-[var(--color-surface)] text-[var(--color-muted-foreground)] hover:text-white'
              )}
            >
              {f === 'all' ? 'All' : f === 'inflow' ? 'Inflows' : 'Outflows'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Inflows"
          value={formatCurrency(totalInflows, 'USD', true)}
          icon={<ArrowDownLeft size={20} />}
        />
        <StatCard
          title="Total Outflows"
          value={formatCurrency(totalOutflows, 'USD', true)}
          icon={<ArrowUpRight size={20} />}
        />
        <StatCard
          title="Net Cash Flow"
          value={formatCurrency(netCashFlow, 'USD', true)}
          icon={netCashFlow >= 0 ? <TrendingUp size={20} /> : <DollarSign size={20} />}
        />
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="border-b border-[var(--color-border)] px-6 py-3">
          <h3 className="text-sm font-medium text-[var(--color-muted-foreground)]">
            Transactions ({filtered.length})
          </h3>
        </div>
        <div className="divide-y divide-[var(--color-border)]">
          {filtered.length > 0 ? (
            filtered.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className={clsx(
                      'flex h-8 w-8 items-center justify-center rounded-full',
                      entry.entry_type === 'inflow'
                        ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]'
                        : 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]'
                    )}
                  >
                    {entry.entry_type === 'inflow' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {entry.description ?? entry.vendor_payee ?? entry.category}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
                      <span className="capitalize">{entry.category.replace(/_/g, ' ')}</span>
                      {entry.is_recurring && (
                        <span className="rounded bg-[var(--color-surface-hover)] px-1.5 py-0.5">
                          {entry.recurrence_pattern}
                        </span>
                      )}
                      <span>{formatDate(entry.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={clsx(
                      'font-mono text-sm font-medium',
                      entry.entry_type === 'inflow' ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'
                    )}
                  >
                    {entry.entry_type === 'inflow' ? '+' : '-'}
                    {formatCurrency(entry.amount)}
                  </p>
                  <p className="text-xs capitalize text-[var(--color-muted-foreground)]">
                    {entry.status.replace(/_/g, ' ')}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-[var(--color-muted)]">No cash flow entries</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
