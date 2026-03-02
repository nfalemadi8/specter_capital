'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { LoadingSkeleton } from '@specter/ui';
import Link from 'next/link';
import { ArrowLeft, Star, Mail, Phone, MapPin } from 'lucide-react';
import type { AdvisorContact } from '@specter/shared-types';

interface AdvisorEngagement {
  id: string;
  contact_id: string;
  date: string;
  description: string | null;
  amount: number | null;
  entity_id: string | null;
  created_at: string;
}

export default function AdvisorDetailPage() {
  const params = useParams();
  const advisorId = params.advisor as string;
  const supabase = createClient();

  const { data: advisor, isLoading } = useQuery({
    queryKey: ['advisor', advisorId],
    queryFn: async () => {
      const { data } = await supabase.from('advisor_contacts').select('*').eq('id', advisorId).single();
      return data as AdvisorContact | null;
    },
  });

  const { data: engagements } = useQuery({
    queryKey: ['advisor-engagements', advisorId],
    queryFn: async () => {
      const { data } = await supabase
        .from('advisor_engagements')
        .select('*')
        .eq('contact_id', advisorId)
        .order('date', { ascending: false });
      return (data ?? []) as AdvisorEngagement[];
    },
    enabled: !!advisorId,
  });

  if (isLoading) return <LoadingSkeleton variant="card" />;
  if (!advisor) return <p className="text-[var(--color-muted-foreground)]">Advisor not found</p>;

  const totalSpent = engagements?.reduce((s, e) => s + (e.amount ?? 0), 0) ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/advisors" className="rounded-lg p-2 hover:bg-[var(--color-surface-hover)]">
          <ArrowLeft size={20} className="text-[var(--color-muted-foreground)]" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{advisor.name}</h1>
          <p className="text-sm capitalize text-[var(--color-muted-foreground)]">
            {advisor.role?.replace(/_/g, ' ')}
            {advisor.company ? ` at ${advisor.company}` : ''}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <h3 className="mb-4 text-sm font-medium text-[var(--color-muted-foreground)]">Contact Details</h3>
          <div className="space-y-3 text-sm">
            {advisor.email && (
              <div className="flex items-center gap-2 text-white">
                <Mail size={14} className="text-[var(--color-muted-foreground)]" />
                <a href={`mailto:${advisor.email}`} className="text-[var(--color-primary)] hover:underline">
                  {advisor.email}
                </a>
              </div>
            )}
            {advisor.phone && (
              <div className="flex items-center gap-2 text-white">
                <Phone size={14} className="text-[var(--color-muted-foreground)]" />
                {advisor.phone}
              </div>
            )}
            {advisor.address && (
              <div className="flex items-center gap-2 text-white">
                <MapPin size={14} className="text-[var(--color-muted-foreground)]" />
                {advisor.address}
              </div>
            )}
            {advisor.rating && (
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < advisor.rating!
                        ? 'fill-[var(--color-warning)] text-[var(--color-warning)]'
                        : 'text-[var(--color-muted)]'
                    }
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 border-t border-[var(--color-border)] pt-4">
            <dl className="space-y-3 text-sm">
              {[
                ['Retainer', advisor.retainer_amount ? `${formatCurrency(advisor.retainer_amount)}/${advisor.retainer_frequency ?? 'month'}` : '—'],
                ['Total Spent', formatCurrency(totalSpent)],
                ['Last Engaged', advisor.last_engagement_date ? formatDate(advisor.last_engagement_date) : '—'],
                ['Status', advisor.is_active ? 'Active' : 'Inactive'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <dt className="text-[var(--color-muted-foreground)]">{label}</dt>
                  <dd className="font-mono text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {advisor.specialty && advisor.specialty.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {advisor.specialty.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-[var(--color-primary)]/10 px-2.5 py-0.5 text-xs text-[var(--color-primary)]"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <h3 className="mb-4 text-sm font-medium text-[var(--color-muted-foreground)]">
            Engagements ({engagements?.length ?? 0})
          </h3>
          {engagements && engagements.length > 0 ? (
            <div className="max-h-96 space-y-3 overflow-y-auto">
              {engagements.map((e) => (
                <div key={e.id} className="border-l-2 border-[var(--color-border)] pl-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--color-muted-foreground)]">{formatDate(e.date)}</span>
                    {e.amount && <span className="font-mono text-sm text-white">{formatCurrency(e.amount)}</span>}
                  </div>
                  {e.description && <p className="mt-1 text-sm text-white">{e.description}</p>}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--color-muted)]">No engagements recorded</p>
          )}
        </div>
      </div>
    </div>
  );
}
