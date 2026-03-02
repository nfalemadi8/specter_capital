'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { LoadingSkeleton } from '@specter/ui';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Entity, EntityBeneficiary, EntitySignatory } from '@specter/shared-types';

export default function EntityDetailPage() {
  const params = useParams();
  const entityId = params.entity as string;
  const supabase = createClient();

  const { data: entity, isLoading } = useQuery({
    queryKey: ['entity', entityId],
    queryFn: async () => {
      const { data } = await supabase.from('entities').select('*').eq('id', entityId).single();
      return data as Entity | null;
    },
  });

  const { data: beneficiaries } = useQuery({
    queryKey: ['entity-beneficiaries', entityId],
    queryFn: async () => {
      const { data } = await supabase
        .from('entity_beneficiaries')
        .select('*, tenant_members(display_name)')
        .eq('entity_id', entityId);
      return (data ?? []) as (EntityBeneficiary & { tenant_members: { display_name: string } | null })[];
    },
    enabled: !!entityId,
  });

  const { data: signatories } = useQuery({
    queryKey: ['entity-signatories', entityId],
    queryFn: async () => {
      const { data } = await supabase
        .from('entity_signatories')
        .select('*, tenant_members(display_name)')
        .eq('entity_id', entityId);
      return (data ?? []) as (EntitySignatory & { tenant_members: { display_name: string } | null })[];
    },
    enabled: !!entityId,
  });

  if (isLoading) return <LoadingSkeleton variant="card" />;
  if (!entity) return <p className="text-[var(--color-muted-foreground)]">Entity not found</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/entities" className="rounded-lg p-2 hover:bg-[var(--color-surface-hover)]">
          <ArrowLeft size={20} className="text-[var(--color-muted-foreground)]" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{entity.name}</h1>
          <p className="text-sm capitalize text-[var(--color-muted-foreground)]">
            {entity.entity_type.replace(/_/g, ' ')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <h3 className="mb-4 text-sm font-medium text-[var(--color-muted-foreground)]">Details</h3>
          <dl className="space-y-3 text-sm">
            {[
              ['Total Value', formatCurrency(entity.total_value)],
              ['State of Formation', entity.state_of_formation ?? '—'],
              ['Country', entity.country_of_formation],
              ['Date Formed', entity.date_formed ? formatDate(entity.date_formed) : '—'],
              ['Registered Agent', entity.registered_agent ?? '—'],
              ['Ownership', entity.ownership_percentage ? `${entity.ownership_percentage}%` : '—'],
              ['Status', entity.is_active ? 'Active' : 'Dissolved'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <dt className="text-[var(--color-muted-foreground)]">{label}</dt>
                <dd className="font-mono text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <h3 className="mb-4 text-sm font-medium text-[var(--color-muted-foreground)]">
              Beneficiaries ({beneficiaries?.length ?? 0})
            </h3>
            {beneficiaries && beneficiaries.length > 0 ? (
              <div className="space-y-2">
                {beneficiaries.map((b) => (
                  <div key={b.id} className="flex justify-between rounded-lg bg-[var(--color-background)] px-3 py-2 text-sm">
                    <span className="text-white">{b.beneficiary_name}</span>
                    <span className="text-[var(--color-muted-foreground)]">
                      {b.percentage ? `${b.percentage}%` : ''} {b.beneficiary_type}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[var(--color-muted)]">No beneficiaries</p>
            )}
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <h3 className="mb-4 text-sm font-medium text-[var(--color-muted-foreground)]">
              Signatories ({signatories?.length ?? 0})
            </h3>
            {signatories && signatories.length > 0 ? (
              <div className="space-y-2">
                {signatories.map((s) => (
                  <div key={s.id} className="flex justify-between rounded-lg bg-[var(--color-background)] px-3 py-2 text-sm">
                    <span className="text-white">{s.tenant_members?.display_name ?? 'Unknown'}</span>
                    <span className="capitalize text-[var(--color-muted-foreground)]">
                      {s.authority_level.replace(/_/g, ' ')}
                      {s.max_amount ? ` (up to ${formatCurrency(s.max_amount)})` : ''}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[var(--color-muted)]">No signatories</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
