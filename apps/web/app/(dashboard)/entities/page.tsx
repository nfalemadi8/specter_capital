'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatCurrency } from '@/lib/utils/format';
import { DataTable, type Column } from '@specter/ui';
import Link from 'next/link';
import { Building2, Plus } from 'lucide-react';
import type { Entity } from '@specter/shared-types';

const columns: Column<Entity & Record<string, unknown>>[] = [
  {
    key: 'name',
    header: 'Entity Name',
    sortable: true,
    render: (item) => (
      <Link href={`/entities/${item.id}`} className="font-medium text-[var(--color-primary)] hover:underline">
        {item.name}
      </Link>
    ),
  },
  {
    key: 'entity_type',
    header: 'Type',
    sortable: true,
    render: (item) => (
      <span className="rounded-full bg-[var(--color-primary)]/10 px-2.5 py-0.5 text-xs capitalize text-[var(--color-primary)]">
        {item.entity_type.replace(/_/g, ' ')}
      </span>
    ),
  },
  { key: 'state_of_formation', header: 'State', sortable: true },
  {
    key: 'total_value',
    header: 'Total Value',
    sortable: true,
    className: 'text-right font-mono',
    render: (item) => <span>{formatCurrency(item.total_value)}</span>,
  },
  {
    key: 'ownership_percentage',
    header: 'Ownership',
    sortable: true,
    className: 'text-right font-mono',
    render: (item) => (
      <span>{item.ownership_percentage ? `${item.ownership_percentage}%` : '—'}</span>
    ),
  },
  {
    key: 'is_active',
    header: 'Status',
    render: (item) => (
      <span
        className={`text-xs ${item.is_active ? 'text-[var(--color-success)]' : 'text-[var(--color-muted-foreground)]'}`}
      >
        {item.is_active ? 'Active' : 'Dissolved'}
      </span>
    ),
  },
];

export default function EntitiesPage() {
  const { tenant } = useTenant();
  const supabase = createClient();

  const { data: entities } = useQuery({
    queryKey: ['entities', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('entities')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('name');
      return (data ?? []) as Entity[];
    },
    enabled: !!tenant?.id,
  });

  const totalValue = entities?.reduce((sum, e) => sum + e.total_value, 0) ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Building2 size={24} className="text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-white">Entities</h1>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90">
          <Plus size={16} />
          New Entity
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <p className="text-sm text-[var(--color-muted-foreground)]">Total Entities</p>
          <p className="mt-1 text-2xl font-semibold text-white">{entities?.length ?? 0}</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <p className="text-sm text-[var(--color-muted-foreground)]">Combined Value</p>
          <p className="mt-1 text-2xl font-semibold font-mono text-white">{formatCurrency(totalValue, 'USD', true)}</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <p className="text-sm text-[var(--color-muted-foreground)]">Active</p>
          <p className="mt-1 text-2xl font-semibold text-white">
            {entities?.filter((e) => e.is_active).length ?? 0}
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={(entities ?? []) as (Entity & Record<string, unknown>)[]}
        keyExtractor={(item) => item.id}
        searchable
        searchKeys={['name', 'entity_type', 'state_of_formation']}
        emptyMessage="No entities yet. Create your first entity to get started."
      />
    </div>
  );
}
