'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatDate } from '@/lib/utils/format';
import Link from 'next/link';
import { ArrowLeft, Vote, Plus } from 'lucide-react';
import { clsx } from 'clsx';
import type { FamilyVote } from '@specter/shared-types';

export default function VotesPage() {
  const { tenant } = useTenant();
  const supabase = createClient();

  const { data: votes } = useQuery({
    queryKey: ['votes-all', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('family_votes')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('created_at', { ascending: false });
      return (data ?? []) as FamilyVote[];
    },
    enabled: !!tenant?.id,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/governance" className="rounded-lg p-2 hover:bg-[var(--color-surface-hover)]">
            <ArrowLeft size={20} className="text-[var(--color-muted-foreground)]" />
          </Link>
          <h1 className="text-2xl font-bold text-white">Family Votes</h1>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90">
          <Plus size={16} />
          Create Vote
        </button>
      </div>

      <div className="space-y-4">
        {votes && votes.length > 0 ? (
          votes.map((v) => (
            <div key={v.id} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-white">{v.title}</h3>
                  <div className="mt-1 flex items-center gap-3 text-sm text-[var(--color-muted-foreground)]">
                    <span className="capitalize">{v.vote_type}</span>
                    {v.voting_opens_at && <span>Opens: {formatDate(v.voting_opens_at)}</span>}
                    {v.voting_closes_at && <span>Closes: {formatDate(v.voting_closes_at)}</span>}
                  </div>
                </div>
                <span
                  className={clsx(
                    'rounded-full px-2.5 py-0.5 text-xs capitalize',
                    v.status === 'open' ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' :
                    v.status === 'closed' ? 'bg-[var(--color-muted)]/10 text-[var(--color-muted-foreground)]' :
                    'bg-[var(--color-warning)]/10 text-[var(--color-warning)]'
                  )}
                >
                  {v.status}
                </span>
              </div>
              {v.description && (
                <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">{v.description}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {v.options.map((option) => (
                  <span
                    key={option}
                    className={clsx(
                      'rounded-lg border px-3 py-1.5 text-sm',
                      v.result === option
                        ? 'border-[var(--color-success)] bg-[var(--color-success)]/10 text-[var(--color-success)]'
                        : 'border-[var(--color-border)] text-white'
                    )}
                  >
                    {option}
                    {v.result === option && ' ✓'}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-12 text-center">
            <Vote size={32} className="mx-auto text-[var(--color-muted)]" />
            <p className="mt-2 text-sm text-[var(--color-muted)]">No votes created yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
