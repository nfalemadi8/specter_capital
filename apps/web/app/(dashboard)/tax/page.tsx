'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { StatCard } from '@specter/ui';
import Link from 'next/link';
import { Calculator, DollarSign, Calendar, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';
import type { TaxEstimate, ComplianceDeadline } from '@specter/shared-types';

export default function TaxPage() {
  const { tenant } = useTenant();
  const supabase = createClient();
  const currentYear = new Date().getFullYear();

  const { data: estimates } = useQuery({
    queryKey: ['tax-estimates', tenant?.id, currentYear],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('tax_estimates')
        .select('*')
        .eq('tenant_id', tenant.id)
        .eq('tax_year', currentYear)
        .order('quarter');
      return (data ?? []) as TaxEstimate[];
    },
    enabled: !!tenant?.id,
  });

  const { data: deadlines } = useQuery({
    queryKey: ['compliance-deadlines', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('compliance_deadlines')
        .select('*')
        .eq('tenant_id', tenant.id)
        .in('status', ['upcoming', 'in_progress', 'overdue'])
        .order('due_date');
      return (data ?? []) as ComplianceDeadline[];
    },
    enabled: !!tenant?.id,
  });

  const totalEstimated = estimates?.reduce((s, e) => s + (e.estimated_tax ?? 0), 0) ?? 0;
  const totalPaid = estimates?.reduce((s, e) => s + e.amount_paid, 0) ?? 0;
  const overdueDeadlines = deadlines?.filter((d) => d.status === 'overdue').length ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calculator size={24} className="text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-white">Tax Center</h1>
        </div>
        <div className="flex gap-2">
          <Link
            href="/tax/tlh"
            className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm text-white hover:bg-[var(--color-surface-hover)]"
          >
            TLH Scanner
          </Link>
          <Link
            href="/tax/donations"
            className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm text-white hover:bg-[var(--color-surface-hover)]"
          >
            Donations
          </Link>
          <Link
            href="/tax/gifts"
            className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm text-white hover:bg-[var(--color-surface-hover)]"
          >
            Gifts
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <StatCard title="Estimated Tax" value={formatCurrency(totalEstimated, 'USD', true)} icon={<DollarSign size={20} />} />
        <StatCard title="Taxes Paid" value={formatCurrency(totalPaid, 'USD', true)} icon={<DollarSign size={20} />} />
        <StatCard title="Remaining" value={formatCurrency(totalEstimated - totalPaid, 'USD', true)} icon={<Calculator size={20} />} />
        <StatCard title="Overdue Deadlines" value={String(overdueDeadlines)} icon={<AlertTriangle size={20} />} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Quarterly Estimates */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <h3 className="mb-4 text-sm font-medium text-[var(--color-muted-foreground)]">
            {currentYear} Quarterly Estimates
          </h3>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((q) => {
              const qEstimates = estimates?.filter((e) => e.quarter === q) ?? [];
              const qTotal = qEstimates.reduce((s, e) => s + (e.estimated_tax ?? 0), 0);
              const qPaid = qEstimates.reduce((s, e) => s + e.amount_paid, 0);
              const allPaid = qEstimates.every((e) => e.status === 'paid');
              const hasOverdue = qEstimates.some((e) => e.status === 'overdue');
              return (
                <div key={q} className="flex items-center justify-between rounded-lg bg-[var(--color-background)] px-4 py-3">
                  <div>
                    <span className="text-sm font-medium text-white">Q{q}</span>
                    <span className="ml-2 text-xs text-[var(--color-muted-foreground)]">
                      {qEstimates.length > 0 && qEstimates[0].due_date ? formatDate(qEstimates[0].due_date) : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-mono text-sm text-white">{formatCurrency(qTotal)}</p>
                      {qPaid > 0 && (
                        <p className="text-xs text-[var(--color-success)]">Paid: {formatCurrency(qPaid)}</p>
                      )}
                    </div>
                    <span
                      className={clsx(
                        'rounded-full px-2 py-0.5 text-xs',
                        allPaid ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' :
                        hasOverdue ? 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]' :
                        'bg-[var(--color-warning)]/10 text-[var(--color-warning)]'
                      )}
                    >
                      {allPaid ? 'Paid' : hasOverdue ? 'Overdue' : 'Pending'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <div className="mb-4 flex items-center gap-2">
            <Calendar size={16} className="text-[var(--color-muted-foreground)]" />
            <h3 className="text-sm font-medium text-[var(--color-muted-foreground)]">
              Upcoming Deadlines ({deadlines?.length ?? 0})
            </h3>
          </div>
          {deadlines && deadlines.length > 0 ? (
            <div className="max-h-80 space-y-2 overflow-y-auto">
              {deadlines.map((d) => (
                <div key={d.id} className="flex items-center justify-between rounded-lg bg-[var(--color-background)] px-3 py-2 text-sm">
                  <div>
                    <p className="font-medium text-white capitalize">{d.deadline_type.replace(/_/g, ' ')}</p>
                    {d.description && (
                      <p className="text-xs text-[var(--color-muted-foreground)]">{d.description}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className={clsx(
                      'text-xs',
                      d.status === 'overdue' ? 'text-[var(--color-danger)]' : 'text-[var(--color-muted-foreground)]'
                    )}>
                      {formatDate(d.due_date)}
                    </p>
                    <span
                      className={clsx(
                        'text-xs capitalize',
                        d.status === 'overdue' ? 'text-[var(--color-danger)]' :
                        d.status === 'in_progress' ? 'text-[var(--color-primary)]' :
                        'text-[var(--color-muted-foreground)]'
                      )}
                    >
                      {d.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--color-muted)]">No upcoming deadlines</p>
          )}
        </div>
      </div>
    </div>
  );
}
