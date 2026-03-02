'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatDate } from '@/lib/utils/format';
import { StatCard } from '@specter/ui';
import Link from 'next/link';
import { Users, Calendar, Vote, GraduationCap, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import type { FamilyMeeting, FamilyVote, SuccessionPlan, EducationProgram } from '@specter/shared-types';

export default function GovernancePage() {
  const { tenant } = useTenant();
  const supabase = createClient();

  const { data: meetings } = useQuery({
    queryKey: ['meetings', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('family_meetings')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('meeting_date', { ascending: false })
        .limit(5);
      return (data ?? []) as FamilyMeeting[];
    },
    enabled: !!tenant?.id,
  });

  const { data: votes } = useQuery({
    queryKey: ['votes', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('family_votes')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('created_at', { ascending: false })
        .limit(5);
      return (data ?? []) as FamilyVote[];
    },
    enabled: !!tenant?.id,
  });

  const { data: plans } = useQuery({
    queryKey: ['succession-plans', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('succession_plans')
        .select('*')
        .eq('tenant_id', tenant.id);
      return (data ?? []) as SuccessionPlan[];
    },
    enabled: !!tenant?.id,
  });

  const { data: programs } = useQuery({
    queryKey: ['education', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('education_programs')
        .select('*')
        .eq('tenant_id', tenant.id);
      return (data ?? []) as EducationProgram[];
    },
    enabled: !!tenant?.id,
  });

  const openVotes = votes?.filter((v) => v.status === 'open').length ?? 0;
  const upcomingMeetings = meetings?.filter((m) => m.status === 'scheduled').length ?? 0;
  const activePrograms = programs?.filter((p) => !p.completed_at).length ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users size={24} className="text-[var(--color-primary)]" />
        <h1 className="text-2xl font-bold text-white">Family Governance</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <StatCard title="Upcoming Meetings" value={String(upcomingMeetings)} icon={<Calendar size={20} />} />
        <StatCard title="Open Votes" value={String(openVotes)} icon={<Vote size={20} />} />
        <StatCard title="Succession Plans" value={String(plans?.length ?? 0)} icon={<Users size={20} />} />
        <StatCard title="Active Programs" value={String(activePrograms)} icon={<GraduationCap size={20} />} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Meetings */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-[var(--color-muted-foreground)]">Recent Meetings</h3>
            <Link href="/governance/meetings" className="flex items-center gap-1 text-xs text-[var(--color-primary)] hover:underline">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {meetings && meetings.length > 0 ? (
            <div className="space-y-2">
              {meetings.map((m) => (
                <div key={m.id} className="flex items-center justify-between rounded-lg bg-[var(--color-background)] px-3 py-2 text-sm">
                  <div>
                    <p className="font-medium text-white">{m.title}</p>
                    <p className="text-xs text-[var(--color-muted-foreground)]">
                      {formatDate(m.meeting_date)} · {m.meeting_type?.replace(/_/g, ' ')}
                    </p>
                  </div>
                  <span
                    className={clsx(
                      'rounded-full px-2 py-0.5 text-xs capitalize',
                      m.status === 'completed' ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' :
                      m.status === 'scheduled' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' :
                      'bg-[var(--color-muted)]/10 text-[var(--color-muted-foreground)]'
                    )}
                  >
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--color-muted)]">No meetings scheduled</p>
          )}
        </div>

        {/* Votes */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-[var(--color-muted-foreground)]">Recent Votes</h3>
            <Link href="/governance/votes" className="flex items-center gap-1 text-xs text-[var(--color-primary)] hover:underline">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {votes && votes.length > 0 ? (
            <div className="space-y-2">
              {votes.map((v) => (
                <div key={v.id} className="flex items-center justify-between rounded-lg bg-[var(--color-background)] px-3 py-2 text-sm">
                  <div>
                    <p className="font-medium text-white">{v.title}</p>
                    <p className="text-xs capitalize text-[var(--color-muted-foreground)]">
                      {v.vote_type} · {v.options.length} options
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={clsx(
                        'rounded-full px-2 py-0.5 text-xs capitalize',
                        v.status === 'open' ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' :
                        v.status === 'closed' ? 'bg-[var(--color-muted)]/10 text-[var(--color-muted-foreground)]' :
                        'bg-[var(--color-warning)]/10 text-[var(--color-warning)]'
                      )}
                    >
                      {v.status}
                    </span>
                    {v.result && <p className="mt-0.5 text-xs text-[var(--color-success)]">{v.result}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--color-muted)]">No votes yet</p>
          )}
        </div>

        {/* Succession Plans */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-[var(--color-muted-foreground)]">Succession Plans</h3>
            <Link href="/governance/succession" className="flex items-center gap-1 text-xs text-[var(--color-primary)] hover:underline">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {plans && plans.length > 0 ? (
            <div className="space-y-2">
              {plans.map((p) => (
                <div key={p.id} className="rounded-lg bg-[var(--color-background)] px-3 py-2 text-sm">
                  <p className="font-medium text-white">{p.title}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
                    <span>{p.assignments.length} assignments</span>
                    {p.effective_trigger && <span>· Trigger: {p.effective_trigger.replace(/_/g, ' ')}</span>}
                    {p.next_review_date && <span>· Review: {formatDate(p.next_review_date)}</span>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--color-muted)]">No succession plans</p>
          )}
        </div>

        {/* Education Programs */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-[var(--color-muted-foreground)]">Education Programs</h3>
            <Link href="/governance/education" className="flex items-center gap-1 text-xs text-[var(--color-primary)] hover:underline">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {programs && programs.length > 0 ? (
            <div className="space-y-2">
              {programs.map((p) => (
                <div key={p.id} className="rounded-lg bg-[var(--color-background)] px-3 py-2 text-sm">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-white">{p.title}</p>
                    <span className="text-xs text-[var(--color-muted-foreground)]">{p.progress_pct}%</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-[var(--color-background)]">
                    <div
                      className="h-1.5 rounded-full bg-[var(--color-primary)]"
                      style={{ width: `${p.progress_pct}%` }}
                    />
                  </div>
                  {p.category && (
                    <p className="mt-1 text-xs capitalize text-[var(--color-muted-foreground)]">
                      {p.category.replace(/_/g, ' ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--color-muted)]">No education programs</p>
          )}
        </div>
      </div>
    </div>
  );
}
