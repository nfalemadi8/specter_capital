'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { useRealtime } from '@/lib/hooks/use-realtime';
import { StatCard } from '@/components/shared/stat-card';
import { ChartContainer } from '@/components/shared/chart-container';
import { StatusBadge } from '@/components/shared/status-badge';
import { EmptyState } from '@/components/shared/empty-state';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { PhoneCall, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

type StatusFilter = 'all' | 'pending' | 'funded' | 'overdue';

const statusVariant = (status: string) => {
  switch (status) {
    case 'funded': return 'success' as const;
    case 'pending': return 'warning' as const;
    case 'overdue': return 'danger' as const;
    case 'partially_funded': return 'info' as const;
    default: return 'default' as const;
  }
};

export default function CapitalCallsPage() {
  const { tenant } = useTenant();
  const supabase = createClient();
  const [filter, setFilter] = useState<StatusFilter>('all');

  const { data: calls, isLoading } = useQuery({
    queryKey: ['capital-calls', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('capital_calls')
        .select('*, deals(name)')
        .eq('tenant_id', tenant.id)
        .order('due_date', { ascending: true });
      return data || [];
    },
    enabled: !!tenant?.id,
  });

  useRealtime('capital_calls', ['capital-calls', tenant?.id ?? ''], tenant?.id);

  const filtered = calls?.filter(c => filter === 'all' || c.status === filter) || [];
  const totalCalled = calls?.reduce((s, c) => s + (c.call_amount || 0), 0) || 0;
  const totalFunded = calls?.filter(c => c.status === 'funded').reduce((s, c) => s + (c.call_amount || 0), 0) || 0;
  const totalPending = calls?.filter(c => c.status === 'pending').reduce((s, c) => s + (c.call_amount || 0), 0) || 0;
  const totalOverdue = calls?.filter(c => c.status === 'overdue').reduce((s, c) => s + (c.call_amount || 0), 0) || 0;

  return (
    <div className="space-y-6">
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-normal text-white/90">Capital Calls</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Called" value={formatCurrency(totalCalled, 'USD', true)} icon={<DollarSign size={16} />} loading={isLoading} />
        <StatCard label="Funded" value={formatCurrency(totalFunded, 'USD', true)} changeType="positive" icon={<CheckCircle size={16} />} loading={isLoading} />
        <StatCard label="Pending" value={formatCurrency(totalPending, 'USD', true)} change={`${calls?.filter(c => c.status === 'pending').length || 0} calls`} changeType="warning" icon={<Clock size={16} />} loading={isLoading} />
        <StatCard label="Overdue" value={formatCurrency(totalOverdue, 'USD', true)} changeType={totalOverdue > 0 ? 'negative' : 'positive'} icon={<PhoneCall size={16} />} loading={isLoading} />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 border-b border-white/[0.04] pb-0">
        {(['all', 'pending', 'funded', 'overdue'] as StatusFilter[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2.5 text-xs font-medium capitalize transition-colors ${
              filter === f
                ? 'border-b-2 border-[var(--phantom-gold)] text-white/80'
                : 'text-white/30 hover:text-white/50'
            }`}
          >
            {f === 'all' ? `All (${calls?.length || 0})` : `${f} (${calls?.filter(c => c.status === f).length || 0})`}
          </button>
        ))}
      </div>

      {/* Table */}
      {filtered.length > 0 ? (
        <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  {['Deal', 'Call Amount', 'Due Date', 'Status', 'Notice Date', 'Funded Date'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[10px] font-medium uppercase tracking-[2px] text-white/30">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(call => (
                  <tr key={call.id} className="border-b border-[var(--color-border)] transition-colors last:border-0 hover:bg-white/[0.02]">
                    <td className="px-4 py-3">
                      <Link href={`/deals/${call.deal_id}`} className="text-sm text-[var(--phantom-gold)] hover:underline">
                        {call.deals?.name || 'Unknown Deal'}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-white/70">{formatCurrency(call.call_amount || 0)}</td>
                    <td className="px-4 py-3 text-sm text-white/50">{call.due_date ? formatDate(call.due_date) : '—'}</td>
                    <td className="px-4 py-3">
                      <StatusBadge label={call.status || 'pending'} variant={statusVariant(call.status)} />
                    </td>
                    <td className="px-4 py-3 text-sm text-white/40">{call.notice_date ? formatDate(call.notice_date) : '—'}</td>
                    <td className="px-4 py-3 text-sm text-white/40">{call.funded_date ? formatDate(call.funded_date) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
          icon={<PhoneCall size={24} />}
          title="No capital calls"
          description={filter === 'all' ? 'Capital calls from your fund investments will appear here.' : `No ${filter} capital calls found.`}
        />
      )}
    </div>
  );
}
