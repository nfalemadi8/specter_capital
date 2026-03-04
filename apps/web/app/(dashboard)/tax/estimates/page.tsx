'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { StatCard } from '@/components/shared/stat-card';
import { ChartContainer } from '@/components/shared/chart-container';
import { StatusBadge } from '@/components/shared/status-badge';
import { EmptyState } from '@/components/shared/empty-state';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { Calculator, Calendar, DollarSign, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];
const CURRENT_YEAR = new Date().getFullYear();

export default function TaxEstimatesPage() {
  const { tenant } = useTenant();
  const supabase = createClient();
  const [year, setYear] = useState(CURRENT_YEAR);

  const { data: estimates, isLoading } = useQuery({
    queryKey: ['tax-estimates', tenant?.id, year],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('tax_estimates')
        .select('*, entities(name)')
        .eq('tenant_id', tenant.id)
        .eq('tax_year', year)
        .order('quarter');
      return data || [];
    },
    enabled: !!tenant?.id,
  });

  const { data: deadlines } = useQuery({
    queryKey: ['compliance-deadlines', tenant?.id, year],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('compliance_deadlines')
        .select('*')
        .eq('tenant_id', tenant.id)
        .gte('due_date', `${year}-01-01`)
        .lte('due_date', `${year}-12-31`)
        .ilike('deadline_type', '%tax%')
        .order('due_date');
      return data || [];
    },
    enabled: !!tenant?.id,
  });

  const totalEstimated = estimates?.reduce((s, e) => s + (e.estimated_amount || 0), 0) || 0;
  const totalPaid = estimates?.reduce((s, e) => s + (e.paid_amount || 0), 0) || 0;
  const totalRemaining = totalEstimated - totalPaid;
  const overdue = estimates?.filter(e => e.status === 'overdue').length || 0;

  // Group estimates by entity and quarter
  const byEntity: Record<string, typeof estimates> = {};
  estimates?.forEach(e => {
    const name = e.entities?.name || 'Individual';
    if (!byEntity[name]) byEntity[name] = [];
    byEntity[name]!.push(e);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-normal text-white/90">Tax Estimates</h1>
        <div className="flex gap-1 rounded border border-white/[0.06] p-0.5">
          {[CURRENT_YEAR - 1, CURRENT_YEAR, CURRENT_YEAR + 1].map(y => (
            <button
              key={y}
              onClick={() => setYear(y)}
              className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                y === year ? 'bg-white/10 text-white/80' : 'text-white/30 hover:text-white/50'
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Estimated" value={formatCurrency(totalEstimated, 'USD', true)} icon={<Calculator size={16} />} loading={isLoading} />
        <StatCard label="Total Paid" value={formatCurrency(totalPaid, 'USD', true)} changeType="positive" icon={<DollarSign size={16} />} loading={isLoading} />
        <StatCard label="Remaining" value={formatCurrency(totalRemaining, 'USD', true)} changeType={totalRemaining > 0 ? 'negative' : 'positive'} icon={<Calendar size={16} />} loading={isLoading} />
        <StatCard label="Overdue" value={String(overdue)} changeType={overdue > 0 ? 'negative' : 'positive'} change={overdue > 0 ? 'Action required' : 'All current'} icon={<AlertTriangle size={16} />} loading={isLoading} />
      </div>

      {/* Quarterly Breakdown by Entity */}
      {Object.keys(byEntity).length > 0 ? (
        Object.entries(byEntity).map(([entityName, entityEstimates]) => (
          <ChartContainer key={entityName} title={entityName}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.04]">
                    <th className="px-4 py-3 text-left text-[10px] font-medium uppercase tracking-[2px] text-white/30">Quarter</th>
                    <th className="px-4 py-3 text-left text-[10px] font-medium uppercase tracking-[2px] text-white/30">Jurisdiction</th>
                    <th className="px-4 py-3 text-right text-[10px] font-medium uppercase tracking-[2px] text-white/30">Estimated</th>
                    <th className="px-4 py-3 text-right text-[10px] font-medium uppercase tracking-[2px] text-white/30">Paid</th>
                    <th className="px-4 py-3 text-right text-[10px] font-medium uppercase tracking-[2px] text-white/30">Remaining</th>
                    <th className="px-4 py-3 text-left text-[10px] font-medium uppercase tracking-[2px] text-white/30">Due Date</th>
                    <th className="px-4 py-3 text-left text-[10px] font-medium uppercase tracking-[2px] text-white/30">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {entityEstimates?.map(est => (
                    <tr key={est.id} className="border-b border-white/[0.03] last:border-0">
                      <td className="px-4 py-3 text-sm text-white/70">Q{est.quarter}</td>
                      <td className="px-4 py-3 text-sm text-white/50">{est.jurisdiction || 'Federal'}</td>
                      <td className="px-4 py-3 text-right text-sm text-white/70">{formatCurrency(est.estimated_amount || 0)}</td>
                      <td className="px-4 py-3 text-right text-sm text-[var(--phantom-success)]">{formatCurrency(est.paid_amount || 0)}</td>
                      <td className="px-4 py-3 text-right text-sm text-white/50">{formatCurrency((est.estimated_amount || 0) - (est.paid_amount || 0))}</td>
                      <td className="px-4 py-3 text-sm text-white/40">{est.due_date ? formatDate(est.due_date) : '—'}</td>
                      <td className="px-4 py-3">
                        <StatusBadge
                          label={est.status || 'pending'}
                          variant={est.status === 'paid' ? 'success' : est.status === 'overdue' ? 'danger' : 'warning'}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ChartContainer>
        ))
      ) : (
        <EmptyState
          icon={<Calculator size={24} />}
          title="No tax estimates"
          description="Quarterly tax estimates will appear here once configured."
        />
      )}

      {/* Upcoming Deadlines */}
      {deadlines && deadlines.length > 0 && (
        <ChartContainer title="Tax Deadlines">
          <div className="space-y-0">
            {deadlines.map(d => {
              const isPast = new Date(d.due_date) < new Date();
              return (
                <div key={d.id} className="flex items-center justify-between border-b border-white/[0.03] py-3 last:border-0">
                  <div>
                    <span className="text-sm text-white/70">{d.title || d.deadline_type}</span>
                    {d.description && <p className="mt-0.5 text-xs text-white/30">{d.description}</p>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-white/40">{formatDate(d.due_date)}</span>
                    <StatusBadge
                      label={d.status === 'completed' ? 'Done' : isPast ? 'Overdue' : 'Upcoming'}
                      variant={d.status === 'completed' ? 'success' : isPast ? 'danger' : 'warning'}
                      dot
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </ChartContainer>
      )}
    </div>
  );
}
