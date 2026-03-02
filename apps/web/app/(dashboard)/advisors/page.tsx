'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { DataTable, type Column } from '@specter/ui';
import Link from 'next/link';
import { Users, Plus, Star } from 'lucide-react';
import type { AdvisorContact } from '@specter/shared-types';

const columns: Column<AdvisorContact & Record<string, unknown>>[] = [
  {
    key: 'name',
    header: 'Name',
    sortable: true,
    render: (item) => (
      <Link href={`/advisors/${item.id}`} className="font-medium text-[var(--color-primary)] hover:underline">
        {item.name}
      </Link>
    ),
  },
  {
    key: 'role',
    header: 'Role',
    sortable: true,
    render: (item) => (
      <span className="rounded-full bg-[var(--color-primary)]/10 px-2.5 py-0.5 text-xs capitalize text-[var(--color-primary)]">
        {item.role?.replace(/_/g, ' ') ?? '—'}
      </span>
    ),
  },
  { key: 'company', header: 'Company', sortable: true },
  { key: 'email', header: 'Email' },
  {
    key: 'retainer_amount',
    header: 'Retainer',
    className: 'text-right font-mono',
    render: (item) => (
      <span>
        {item.retainer_amount ? `${formatCurrency(item.retainer_amount)}/${item.retainer_frequency ?? 'mo'}` : '—'}
      </span>
    ),
  },
  {
    key: 'rating',
    header: 'Rating',
    render: (item) =>
      item.rating ? (
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={12}
              className={i < item.rating! ? 'fill-[var(--color-warning)] text-[var(--color-warning)]' : 'text-[var(--color-muted)]'}
            />
          ))}
        </div>
      ) : (
        <span className="text-[var(--color-muted)]">—</span>
      ),
  },
  {
    key: 'last_engagement_date',
    header: 'Last Engaged',
    sortable: true,
    render: (item) => (
      <span>{item.last_engagement_date ? formatDate(item.last_engagement_date) : '—'}</span>
    ),
  },
  {
    key: 'is_active',
    header: 'Status',
    render: (item) => (
      <span className={`text-xs ${item.is_active ? 'text-[var(--color-success)]' : 'text-[var(--color-muted-foreground)]'}`}>
        {item.is_active ? 'Active' : 'Inactive'}
      </span>
    ),
  },
];

export default function AdvisorsPage() {
  const { tenant } = useTenant();
  const supabase = createClient();

  const { data: advisors } = useQuery({
    queryKey: ['advisors', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('advisor_contacts')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('name');
      return (data ?? []) as AdvisorContact[];
    },
    enabled: !!tenant?.id,
  });

  const totalRetainers = advisors
    ?.filter((a) => a.is_active && a.retainer_amount)
    .reduce((s, a) => s + (a.retainer_amount ?? 0), 0) ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users size={24} className="text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-white">Advisors & Contacts</h1>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90">
          <Plus size={16} />
          Add Advisor
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <p className="text-sm text-[var(--color-muted-foreground)]">Total Advisors</p>
          <p className="mt-1 text-2xl font-semibold text-white">{advisors?.length ?? 0}</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <p className="text-sm text-[var(--color-muted-foreground)]">Active</p>
          <p className="mt-1 text-2xl font-semibold text-white">
            {advisors?.filter((a) => a.is_active).length ?? 0}
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <p className="text-sm text-[var(--color-muted-foreground)]">Monthly Retainers</p>
          <p className="mt-1 text-2xl font-semibold font-mono text-white">
            {formatCurrency(totalRetainers, 'USD', true)}
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={(advisors ?? []) as (AdvisorContact & Record<string, unknown>)[]}
        keyExtractor={(item) => item.id}
        searchable
        searchKeys={['name', 'company', 'role', 'email']}
        emptyMessage="No advisors tracked yet."
      />
    </div>
  );
}
