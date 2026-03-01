'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatCurrency } from '@/lib/utils/format';
import { StatCard } from '@specter/ui';
import Link from 'next/link';
import { Plus, Briefcase, DollarSign, Target } from 'lucide-react';
import { clsx } from 'clsx';
import type { Deal, DealStage } from '@specter/shared-types';

const STAGE_ORDER: DealStage[] = [
  'sourcing', 'screening', 'due_diligence', 'term_sheet',
  'legal_review', 'closing', 'closed', 'passed', 'exited',
];

const STAGE_COLORS: Record<DealStage, string> = {
  sourcing: '#94a3b8',
  screening: '#38bdf8',
  due_diligence: '#a78bfa',
  term_sheet: '#f59e0b',
  legal_review: '#fb923c',
  closing: '#22d3ee',
  closed: '#34d399',
  passed: '#f87171',
  exited: '#818cf8',
};

export default function DealsPage() {
  const { tenant } = useTenant();
  const supabase = createClient();

  const { data: deals } = useQuery({
    queryKey: ['deals', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('deals')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('updated_at', { ascending: false });
      return (data ?? []) as Deal[];
    },
    enabled: !!tenant?.id,
  });

  const activeDeals = deals?.filter((d) => !['passed', 'exited'].includes(d.stage)) ?? [];
  const totalPipeline = activeDeals.reduce((sum, d) => sum + (d.target_amount ?? 0), 0);
  const avgDealSize = activeDeals.length > 0 ? totalPipeline / activeDeals.length : 0;

  // Group deals by stage for Kanban
  const dealsByStage = STAGE_ORDER.reduce(
    (acc, stage) => {
      acc[stage] = deals?.filter((d) => d.stage === stage) ?? [];
      return acc;
    },
    {} as Record<DealStage, Deal[]>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Deal Pipeline</h1>
        <Link
          href="/deals/new"
          className="flex items-center gap-1.5 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
        >
          <Plus size={16} />
          New Deal
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Active Deals"
          value={String(activeDeals.length)}
          icon={<Briefcase size={20} />}
        />
        <StatCard
          title="Pipeline Value"
          value={formatCurrency(totalPipeline, 'USD', true)}
          icon={<DollarSign size={20} />}
        />
        <StatCard
          title="Avg Deal Size"
          value={formatCurrency(avgDealSize, 'USD', true)}
          icon={<Target size={20} />}
        />
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4" style={{ minWidth: STAGE_ORDER.length * 280 }}>
          {STAGE_ORDER.map((stage) => (
            <div
              key={stage}
              className="w-[280px] shrink-0 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]"
            >
              <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
                <div className="flex items-center gap-2">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: STAGE_COLORS[stage] }}
                  />
                  <span className="text-sm font-medium capitalize text-white">
                    {stage.replace(/_/g, ' ')}
                  </span>
                </div>
                <span className="rounded-full bg-[var(--color-background)] px-2 py-0.5 text-xs text-[var(--color-muted-foreground)]">
                  {dealsByStage[stage].length}
                </span>
              </div>
              <div className="space-y-2 p-3">
                {dealsByStage[stage].map((deal) => (
                  <Link
                    key={deal.id}
                    href={`/deals/${deal.id}`}
                    className={clsx(
                      'block rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-3',
                      'hover:border-[var(--color-primary)]/30 transition-colors'
                    )}
                  >
                    <p className="text-sm font-medium text-white">{deal.name}</p>
                    {deal.company_name && (
                      <p className="text-xs text-[var(--color-muted-foreground)]">
                        {deal.company_name}
                      </p>
                    )}
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="text-[var(--color-muted-foreground)]">{deal.sector}</span>
                      {deal.target_amount && (
                        <span className="font-mono text-white">
                          {formatCurrency(deal.target_amount, 'USD', true)}
                        </span>
                      )}
                    </div>
                    {deal.moic && (
                      <div className="mt-1 flex gap-2 text-xs">
                        <span className="text-[var(--color-success)]">
                          {deal.moic.toFixed(2)}x MOIC
                        </span>
                        {deal.irr && (
                          <span className="text-[var(--color-primary)]">
                            {(deal.irr * 100).toFixed(1)}% IRR
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                ))}
                {dealsByStage[stage].length === 0 && (
                  <p className="py-4 text-center text-xs text-[var(--color-muted)]">
                    No deals
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
