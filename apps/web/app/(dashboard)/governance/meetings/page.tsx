'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatDate } from '@/lib/utils/format';
import Link from 'next/link';
import { ArrowLeft, Calendar, Plus, MapPin } from 'lucide-react';
import { clsx } from 'clsx';
import type { FamilyMeeting } from '@specter/shared-types';

export default function MeetingsPage() {
  const { tenant } = useTenant();
  const supabase = createClient();

  const { data: meetings } = useQuery({
    queryKey: ['meetings-all', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('family_meetings')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('meeting_date', { ascending: false });
      return (data ?? []) as FamilyMeeting[];
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
          <h1 className="text-2xl font-bold text-white">Family Meetings</h1>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90">
          <Plus size={16} />
          Schedule Meeting
        </button>
      </div>

      <div className="space-y-4">
        {meetings && meetings.length > 0 ? (
          meetings.map((m) => (
            <div key={m.id} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-white">{m.title}</h3>
                  <div className="mt-1 flex items-center gap-3 text-sm text-[var(--color-muted-foreground)]">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(m.meeting_date)}
                    </div>
                    {m.location && (
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        {m.location}
                      </div>
                    )}
                    {m.meeting_type && (
                      <span className="capitalize">{m.meeting_type.replace(/_/g, ' ')}</span>
                    )}
                  </div>
                </div>
                <span
                  className={clsx(
                    'rounded-full px-2.5 py-0.5 text-xs capitalize',
                    m.status === 'completed' ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' :
                    m.status === 'scheduled' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' :
                    m.status === 'cancelled' ? 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]' :
                    'bg-[var(--color-warning)]/10 text-[var(--color-warning)]'
                  )}
                >
                  {m.status}
                </span>
              </div>
              {m.description && (
                <p className="mt-3 text-sm text-[var(--color-muted-foreground)]">{m.description}</p>
              )}
              {m.agenda_items && m.agenda_items.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-medium text-[var(--color-muted-foreground)]">Agenda ({m.agenda_items.length} items)</p>
                  <div className="mt-2 space-y-1">
                    {m.agenda_items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-white">
                        <span className="text-xs text-[var(--color-muted)]">{i + 1}.</span>
                        {item.title}
                        {item.duration_minutes && (
                          <span className="text-xs text-[var(--color-muted-foreground)]">({item.duration_minutes}min)</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-12 text-center">
            <p className="text-sm text-[var(--color-muted)]">No meetings scheduled</p>
          </div>
        )}
      </div>
    </div>
  );
}
