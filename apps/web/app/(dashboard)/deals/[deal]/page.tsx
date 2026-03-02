'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { LoadingSkeleton, StatCard } from '@specter/ui';
import Link from 'next/link';
import { ArrowLeft, FileText, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';
import type { Deal, DealNote, DDChecklist } from '@specter/shared-types';

export default function DealDetailPage() {
  const params = useParams();
  const dealId = params.deal as string;
  const supabase = createClient();

  const { data: deal, isLoading } = useQuery({
    queryKey: ['deal', dealId],
    queryFn: async () => {
      const { data } = await supabase.from('deals').select('*').eq('id', dealId).single();
      return data as Deal | null;
    },
  });

  const { data: notes } = useQuery({
    queryKey: ['deal-notes', dealId],
    queryFn: async () => {
      const { data } = await supabase
        .from('deal_notes')
        .select('*, tenant_members(display_name)')
        .eq('deal_id', dealId)
        .order('created_at', { ascending: false });
      return (data ?? []) as (DealNote & { tenant_members: { display_name: string } | null })[];
    },
    enabled: !!dealId,
  });

  const { data: checklist } = useQuery({
    queryKey: ['dd-checklist', dealId],
    queryFn: async () => {
      const { data } = await supabase
        .from('dd_checklists')
        .select('*')
        .eq('deal_id', dealId)
        .order('category');
      return (data ?? []) as DDChecklist[];
    },
    enabled: !!dealId,
  });

  if (isLoading) return <LoadingSkeleton variant="card" />;
  if (!deal) return <p className="text-[var(--color-muted-foreground)]">Deal not found</p>;

  const completedChecks = checklist?.filter((c) => c.status === 'completed').length ?? 0;
  const totalChecks = checklist?.length ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/deals" className="rounded-lg p-2 hover:bg-[var(--color-surface-hover)]">
          <ArrowLeft size={20} className="text-[var(--color-muted-foreground)]" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{deal.name}</h1>
          <p className="text-sm text-[var(--color-muted-foreground)]">
            {deal.company_name} &middot; {deal.sector} &middot;{' '}
            <span className="capitalize">{deal.stage.replace(/_/g, ' ')}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Target Amount" value={formatCurrency(deal.target_amount ?? 0, 'USD', true)} />
        <StatCard title="Invested" value={formatCurrency(deal.invested_amount, 'USD', true)} />
        {deal.moic && <StatCard title="MOIC" value={`${deal.moic.toFixed(2)}x`} />}
        {deal.irr && <StatCard title="IRR" value={`${(deal.irr * 100).toFixed(1)}%`} />}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Deal Details */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <h3 className="mb-4 text-sm font-medium text-[var(--color-muted-foreground)]">Deal Details</h3>
          <dl className="space-y-3 text-sm">
            {[
              ['Deal Type', deal.deal_type?.replace(/_/g, ' ') ?? '—'],
              ['Geography', deal.geography ?? '—'],
              ['Vintage Year', deal.vintage_year ?? '—'],
              ['Sourced Date', deal.sourced_date ? formatDate(deal.sourced_date) : '—'],
              ['Expected Exit', deal.expected_exit_date ? formatDate(deal.expected_exit_date) : '—'],
              ['Lead Investor', deal.lead_investor ?? '—'],
              ['Opportunity Score', deal.opportunity_score ? `${deal.opportunity_score}/10` : '—'],
              ['Risk Score', deal.risk_score ? `${deal.risk_score}/10` : '—'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <dt className="text-[var(--color-muted-foreground)]">{label}</dt>
                <dd className="font-mono text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* DD Checklist */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-[var(--color-muted-foreground)]">
              Due Diligence ({completedChecks}/{totalChecks})
            </h3>
            <div className="h-2 w-24 rounded-full bg-[var(--color-background)]">
              <div
                className="h-2 rounded-full bg-[var(--color-success)]"
                style={{ width: totalChecks > 0 ? `${(completedChecks / totalChecks) * 100}%` : '0%' }}
              />
            </div>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {checklist && checklist.length > 0 ? (
              checklist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg bg-[var(--color-background)] px-3 py-2 text-sm"
                >
                  <CheckCircle
                    size={16}
                    className={clsx(
                      item.status === 'completed'
                        ? 'text-[var(--color-success)]'
                        : item.status === 'flagged'
                          ? 'text-[var(--color-danger)]'
                          : 'text-[var(--color-muted)]'
                    )}
                  />
                  <div className="flex-1">
                    <span className="text-white">{item.item}</span>
                    <span className="ml-2 text-xs text-[var(--color-muted-foreground)]">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-[var(--color-muted)]">No checklist items</p>
            )}
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-[var(--color-muted-foreground)]">
          <FileText size={16} />
          Notes ({notes?.length ?? 0})
        </h3>
        <div className="space-y-4">
          {notes && notes.length > 0 ? (
            notes.map((note) => (
              <div key={note.id} className="border-l-2 border-[var(--color-border)] pl-4">
                <div className="flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
                  <span className="font-medium text-white">
                    {note.tenant_members?.display_name ?? 'Unknown'}
                  </span>
                  <span>&middot;</span>
                  <span>{formatDate(note.created_at)}</span>
                  <span className="rounded bg-[var(--color-surface-hover)] px-1.5 py-0.5 capitalize">
                    {note.note_type}
                  </span>
                </div>
                <p className="mt-1 text-sm text-white">{note.content}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-[var(--color-muted)]">No notes yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
