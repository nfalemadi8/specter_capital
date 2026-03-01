'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { StatCard } from '@specter/ui';
import { Heart, DollarSign, Plus } from 'lucide-react';
import { clsx } from 'clsx';
import type { PhilanthropyGrant } from '@specter/shared-types';

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]',
  approved: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
  disbursed: 'bg-[var(--color-success)]/10 text-[var(--color-success)]',
  completed: 'bg-[var(--color-success)]/10 text-[var(--color-success)]',
  rejected: 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]',
};

export default function PhilanthropyPage() {
  const { tenant } = useTenant();
  const supabase = createClient();

  const { data: grants } = useQuery({
    queryKey: ['grants', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('philanthropy_grants')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('grant_date', { ascending: false });
      return (data ?? []) as PhilanthropyGrant[];
    },
    enabled: !!tenant?.id,
  });

  const totalGranted = grants?.reduce((s, g) => s + g.amount, 0) ?? 0;
  const pendingGrants = grants?.filter((g) => g.status === 'pending').length ?? 0;
  const disbursed = grants?.filter((g) => ['disbursed', 'completed'].includes(g.status))
    .reduce((s, g) => s + g.amount, 0) ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Heart size={24} className="text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-white">Philanthropy</h1>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90">
          <Plus size={16} />
          New Grant
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard title="Total Granted" value={formatCurrency(totalGranted, 'USD', true)} icon={<DollarSign size={20} />} />
        <StatCard title="Disbursed" value={formatCurrency(disbursed, 'USD', true)} icon={<DollarSign size={20} />} />
        <StatCard title="Pending Approval" value={String(pendingGrants)} icon={<Heart size={20} />} />
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="divide-y divide-[var(--color-border)]">
          {grants && grants.length > 0 ? (
            grants.map((g) => (
              <div key={g.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white">{g.recipient_name}</p>
                    <span className={clsx('rounded-full px-2 py-0.5 text-xs capitalize', STATUS_STYLES[g.status] ?? '')}>
                      {g.status}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
                    {g.grant_type && (
                      <span className="capitalize">{g.grant_type.replace(/_/g, ' ')}</span>
                    )}
                    {g.purpose && <span>· {g.purpose}</span>}
                    {g.grant_date && <span>· {formatDate(g.grant_date)}</span>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm font-medium text-white">{formatCurrency(g.amount)}</p>
                  {g.expenditure_responsibility && (
                    <p className="text-xs text-[var(--color-warning)]">ER Required</p>
                  )}
                  {g.reporting_due_date && !g.report_received && (
                    <p className="text-xs text-[var(--color-muted-foreground)]">
                      Report due {formatDate(g.reporting_due_date)}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-[var(--color-muted)]">No grants tracked yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
