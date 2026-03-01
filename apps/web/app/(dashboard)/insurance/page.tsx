'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { StatCard, DataTable, type Column } from '@specter/ui';
import { Shield, DollarSign, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';
import type { InsurancePolicy } from '@specter/shared-types';

const STATUS_STYLES: Record<string, string> = {
  active: 'text-[var(--color-success)]',
  expired: 'text-[var(--color-danger)]',
  cancelled: 'text-[var(--color-muted-foreground)]',
  pending_renewal: 'text-[var(--color-warning)]',
};

const columns: Column<InsurancePolicy & Record<string, unknown>>[] = [
  {
    key: 'policy_type',
    header: 'Type',
    sortable: true,
    render: (item) => (
      <span className="rounded-full bg-[var(--color-primary)]/10 px-2.5 py-0.5 text-xs capitalize text-[var(--color-primary)]">
        {item.policy_type.replace(/_/g, ' ')}
      </span>
    ),
  },
  { key: 'carrier', header: 'Carrier', sortable: true },
  { key: 'policy_number', header: 'Policy #', render: (item) => <span className="font-mono">{item.policy_number ?? '—'}</span> },
  {
    key: 'coverage_amount',
    header: 'Coverage',
    sortable: true,
    className: 'text-right font-mono',
    render: (item) => <span>{item.coverage_amount ? formatCurrency(item.coverage_amount, 'USD', true) : '—'}</span>,
  },
  {
    key: 'annual_premium',
    header: 'Premium/yr',
    sortable: true,
    className: 'text-right font-mono',
    render: (item) => <span>{item.annual_premium ? formatCurrency(item.annual_premium) : '—'}</span>,
  },
  {
    key: 'expiration_date',
    header: 'Expires',
    sortable: true,
    render: (item) => {
      if (!item.expiration_date) return <span>—</span>;
      const isExpiringSoon = new Date(item.expiration_date) <= new Date(Date.now() + 30 * 86400000);
      return (
        <span className={clsx(isExpiringSoon && item.status === 'active' && 'text-[var(--color-warning)]')}>
          {formatDate(item.expiration_date)}
        </span>
      );
    },
  },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <span className={clsx('text-xs capitalize', STATUS_STYLES[item.status] ?? '')}>
        {item.status.replace(/_/g, ' ')}
      </span>
    ),
  },
];

export default function InsurancePage() {
  const { tenant } = useTenant();
  const supabase = createClient();

  const { data: policies } = useQuery({
    queryKey: ['insurance', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('insurance_policies')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('expiration_date');
      return (data ?? []) as InsurancePolicy[];
    },
    enabled: !!tenant?.id,
  });

  const activePolicies = policies?.filter((p) => p.status === 'active') ?? [];
  const totalCoverage = activePolicies.reduce((s, p) => s + (p.coverage_amount ?? 0), 0);
  const totalPremium = activePolicies.reduce((s, p) => s + (p.annual_premium ?? 0), 0);
  const expiringCount = activePolicies.filter((p) => {
    if (!p.expiration_date) return false;
    return new Date(p.expiration_date) <= new Date(Date.now() + 60 * 86400000);
  }).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield size={24} className="text-[var(--color-primary)]" />
        <h1 className="text-2xl font-bold text-white">Insurance</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <StatCard title="Active Policies" value={String(activePolicies.length)} icon={<Shield size={20} />} />
        <StatCard title="Total Coverage" value={formatCurrency(totalCoverage, 'USD', true)} icon={<DollarSign size={20} />} />
        <StatCard title="Annual Premiums" value={formatCurrency(totalPremium, 'USD', true)} icon={<DollarSign size={20} />} />
        <StatCard title="Expiring Soon" value={String(expiringCount)} icon={<AlertTriangle size={20} />} />
      </div>

      <DataTable
        columns={columns}
        data={(policies ?? []) as (InsurancePolicy & Record<string, unknown>)[]}
        keyExtractor={(item) => item.id}
        searchable
        searchKeys={['carrier', 'policy_type', 'policy_number']}
        emptyMessage="No insurance policies tracked yet."
      />
    </div>
  );
}
