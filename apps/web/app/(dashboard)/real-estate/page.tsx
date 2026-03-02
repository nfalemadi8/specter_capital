'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatCurrency } from '@/lib/utils/format';
import { StatCard, DataTable, type Column } from '@specter/ui';
import Link from 'next/link';
import { Home, Plus, DollarSign, TrendingUp } from 'lucide-react';
import type { Property } from '@specter/shared-types';

const STATUS_COLORS: Record<string, string> = {
  active: 'text-[var(--color-success)]',
  under_contract: 'text-[var(--color-warning)]',
  sold: 'text-[var(--color-muted-foreground)]',
  development: 'text-[var(--color-primary)]',
};

const columns: Column<Property & Record<string, unknown>>[] = [
  {
    key: 'name',
    header: 'Property',
    sortable: true,
    render: (item) => (
      <Link href={`/real-estate/${item.id}`} className="font-medium text-[var(--color-primary)] hover:underline">
        {item.name}
      </Link>
    ),
  },
  {
    key: 'property_type',
    header: 'Type',
    sortable: true,
    render: (item) => (
      <span className="rounded-full bg-[var(--color-primary)]/10 px-2.5 py-0.5 text-xs capitalize text-[var(--color-primary)]">
        {item.property_type.replace(/_/g, ' ')}
      </span>
    ),
  },
  {
    key: 'city',
    header: 'Location',
    sortable: true,
    render: (item) => (
      <span>{[item.city, item.state].filter(Boolean).join(', ') || '—'}</span>
    ),
  },
  {
    key: 'current_value',
    header: 'Value',
    sortable: true,
    className: 'text-right font-mono',
    render: (item) => <span>{item.current_value ? formatCurrency(item.current_value, 'USD', true) : '—'}</span>,
  },
  {
    key: 'noi',
    header: 'NOI',
    sortable: true,
    className: 'text-right font-mono',
    render: (item) => <span>{item.noi ? formatCurrency(item.noi, 'USD', true) : '—'}</span>,
  },
  {
    key: 'cap_rate',
    header: 'Cap Rate',
    sortable: true,
    className: 'text-right font-mono',
    render: (item) => <span>{item.cap_rate ? `${(item.cap_rate * 100).toFixed(2)}%` : '—'}</span>,
  },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <span className={`text-xs capitalize ${STATUS_COLORS[item.status] ?? ''}`}>
        {item.status.replace(/_/g, ' ')}
      </span>
    ),
  },
];

export default function RealEstatePage() {
  const { tenant } = useTenant();
  const supabase = createClient();

  const { data: properties } = useQuery({
    queryKey: ['properties', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('properties')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('name');
      return (data ?? []) as Property[];
    },
    enabled: !!tenant?.id,
  });

  const totalValue = properties?.reduce((sum, p) => sum + (p.current_value ?? 0), 0) ?? 0;
  const totalEquity = properties?.reduce(
    (sum, p) => sum + (p.current_value ?? 0) - (p.mortgage_balance ?? 0),
    0
  ) ?? 0;
  const totalNOI = properties?.reduce((sum, p) => sum + (p.noi ?? 0), 0) ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Home size={24} className="text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-white">Real Estate</h1>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90">
          <Plus size={16} />
          Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Portfolio Value"
          value={formatCurrency(totalValue, 'USD', true)}
          icon={<DollarSign size={20} />}
        />
        <StatCard
          title="Total Equity"
          value={formatCurrency(totalEquity, 'USD', true)}
          icon={<TrendingUp size={20} />}
        />
        <StatCard
          title="Annual NOI"
          value={formatCurrency(totalNOI, 'USD', true)}
          icon={<DollarSign size={20} />}
        />
      </div>

      <DataTable
        columns={columns}
        data={(properties ?? []) as (Property & Record<string, unknown>)[]}
        keyExtractor={(item) => item.id}
        searchable
        searchKeys={['name', 'city', 'state', 'property_type']}
        emptyMessage="No properties yet. Add your first property to get started."
      />
    </div>
  );
}
