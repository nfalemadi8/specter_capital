'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatDate } from '@/lib/utils/format';
import Link from 'next/link';
import { ArrowLeft, Users, CheckCircle, XCircle } from 'lucide-react';
import type { SuccessionPlan } from '@specter/shared-types';

export default function SuccessionPage() {
  const { tenant } = useTenant();
  const supabase = createClient();

  const { data: plans } = useQuery({
    queryKey: ['succession-all', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('succession_plans')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('updated_at', { ascending: false });
      return (data ?? []) as SuccessionPlan[];
    },
    enabled: !!tenant?.id,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/governance" className="rounded-lg p-2 hover:bg-[var(--color-surface-hover)]">
          <ArrowLeft size={20} className="text-[var(--color-muted-foreground)]" />
        </Link>
        <h1 className="text-2xl font-bold text-white">Succession Planning</h1>
      </div>

      <div className="space-y-6">
        {plans && plans.length > 0 ? (
          plans.map((plan) => {
            const readyCount = plan.assignments.filter((a) => a.ready).length;
            return (
              <div key={plan.id} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-white">{plan.title}</h3>
                    <div className="mt-1 flex items-center gap-3 text-sm text-[var(--color-muted-foreground)]">
                      {plan.effective_trigger && (
                        <span>Trigger: {plan.effective_trigger.replace(/_/g, ' ')}</span>
                      )}
                      <span>{plan.assignments.length} roles · {readyCount} ready</span>
                      {plan.next_review_date && (
                        <span>Next review: {formatDate(plan.next_review_date)}</span>
                      )}
                    </div>
                  </div>
                  <span className="rounded-full bg-[var(--color-primary)]/10 px-2.5 py-0.5 text-xs capitalize text-[var(--color-primary)]">
                    {plan.status}
                  </span>
                </div>
                {plan.description && (
                  <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">{plan.description}</p>
                )}
                {plan.assignments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {plan.assignments.map((a, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg bg-[var(--color-background)] px-3 py-2 text-sm">
                        <span className="text-white">{a.role}</span>
                        <div className="flex items-center gap-2">
                          {a.ready ? (
                            <CheckCircle size={14} className="text-[var(--color-success)]" />
                          ) : (
                            <XCircle size={14} className="text-[var(--color-warning)]" />
                          )}
                          <span className="text-xs text-[var(--color-muted-foreground)]">
                            {a.ready ? 'Ready' : 'In preparation'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-12 text-center">
            <Users size={32} className="mx-auto text-[var(--color-muted)]" />
            <p className="mt-2 text-sm text-[var(--color-muted)]">No succession plans created yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
