'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { LoadingSkeleton, StatCard } from '@specter/ui';
import Link from 'next/link';
import { ArrowLeft, DollarSign, Home, Percent, Wrench } from 'lucide-react';
import { clsx } from 'clsx';
import type { Property, PropertyTenant, MaintenanceRequest } from '@specter/shared-types';

const PRIORITY_COLORS: Record<string, string> = {
  low: 'text-[var(--color-muted-foreground)]',
  normal: 'text-[var(--color-primary)]',
  high: 'text-[var(--color-warning)]',
  emergency: 'text-[var(--color-danger)]',
};

const STATUS_COLORS: Record<string, string> = {
  open: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
  in_progress: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]',
  completed: 'bg-[var(--color-success)]/10 text-[var(--color-success)]',
  cancelled: 'bg-[var(--color-muted)]/10 text-[var(--color-muted-foreground)]',
};

export default function PropertyDetailPage() {
  const params = useParams();
  const propertyId = params.property as string;
  const supabase = createClient();

  const { data: property, isLoading } = useQuery({
    queryKey: ['property', propertyId],
    queryFn: async () => {
      const { data } = await supabase.from('properties').select('*').eq('id', propertyId).single();
      return data as Property | null;
    },
  });

  const { data: tenants } = useQuery({
    queryKey: ['property-tenants', propertyId],
    queryFn: async () => {
      const { data } = await supabase
        .from('tenants_property')
        .select('*')
        .eq('property_id', propertyId)
        .order('unit');
      return (data ?? []) as PropertyTenant[];
    },
    enabled: !!propertyId,
  });

  const { data: maintenance } = useQuery({
    queryKey: ['maintenance', propertyId],
    queryFn: async () => {
      const { data } = await supabase
        .from('maintenance_requests')
        .select('*')
        .eq('property_id', propertyId)
        .order('created_at', { ascending: false });
      return (data ?? []) as MaintenanceRequest[];
    },
    enabled: !!propertyId,
  });

  if (isLoading) return <LoadingSkeleton variant="card" />;
  if (!property) return <p className="text-[var(--color-muted-foreground)]">Property not found</p>;

  const equity = (property.current_value ?? 0) - (property.mortgage_balance ?? 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/real-estate" className="rounded-lg p-2 hover:bg-[var(--color-surface-hover)]">
          <ArrowLeft size={20} className="text-[var(--color-muted-foreground)]" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{property.name}</h1>
          <p className="text-sm text-[var(--color-muted-foreground)]">
            {[property.address, property.city, property.state].filter(Boolean).join(', ')}
            {' · '}
            <span className="capitalize">{property.property_type.replace(/_/g, ' ')}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Current Value"
          value={formatCurrency(property.current_value ?? 0, 'USD', true)}
          icon={<DollarSign size={20} />}
        />
        <StatCard
          title="Equity"
          value={formatCurrency(equity, 'USD', true)}
          icon={<Home size={20} />}
        />
        {property.cap_rate && (
          <StatCard
            title="Cap Rate"
            value={`${(property.cap_rate * 100).toFixed(2)}%`}
            icon={<Percent size={20} />}
          />
        )}
        {property.noi && (
          <StatCard
            title="NOI"
            value={formatCurrency(property.noi, 'USD', true)}
            icon={<DollarSign size={20} />}
          />
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Property Details */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <h3 className="mb-4 text-sm font-medium text-[var(--color-muted-foreground)]">Property Details</h3>
          <dl className="space-y-3 text-sm">
            {[
              ['Purchase Price', property.purchase_price ? formatCurrency(property.purchase_price) : '—'],
              ['Purchase Date', property.purchase_date ? formatDate(property.purchase_date) : '—'],
              ['Last Appraisal', property.last_appraisal_date ? formatDate(property.last_appraisal_date) : '—'],
              ['Status', property.status.replace(/_/g, ' ')],
              ['Cash-on-Cash', property.cash_on_cash_return ? `${(property.cash_on_cash_return * 100).toFixed(2)}%` : '—'],
              ['Annual Taxes', property.annual_taxes ? formatCurrency(property.annual_taxes) : '—'],
              ['Annual Insurance', property.annual_insurance ? formatCurrency(property.annual_insurance) : '—'],
              ['Annual HOA', property.annual_hoa ? formatCurrency(property.annual_hoa) : '—'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <dt className="text-[var(--color-muted-foreground)]">{label}</dt>
                <dd className="font-mono capitalize text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Mortgage */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <h3 className="mb-4 text-sm font-medium text-[var(--color-muted-foreground)]">Mortgage</h3>
          {property.has_mortgage ? (
            <dl className="space-y-3 text-sm">
              {[
                ['Balance', formatCurrency(property.mortgage_balance ?? 0)],
                ['Rate', property.mortgage_rate ? `${(property.mortgage_rate * 100).toFixed(3)}%` : '—'],
                ['Monthly Payment', property.mortgage_monthly_payment ? formatCurrency(property.mortgage_monthly_payment) : '—'],
                ['Maturity', property.mortgage_maturity_date ? formatDate(property.mortgage_maturity_date) : '—'],
                ['Lender', property.lender ?? '—'],
                ['LTV', property.current_value ? `${(((property.mortgage_balance ?? 0) / property.current_value) * 100).toFixed(1)}%` : '—'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <dt className="text-[var(--color-muted-foreground)]">{label}</dt>
                  <dd className="font-mono text-white">{value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-sm text-[var(--color-muted)]">No mortgage — owned outright</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Tenants */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <h3 className="mb-4 text-sm font-medium text-[var(--color-muted-foreground)]">
            Tenants ({tenants?.length ?? 0})
          </h3>
          {tenants && tenants.length > 0 ? (
            <div className="space-y-2">
              {tenants.map((t) => (
                <div key={t.id} className="flex items-center justify-between rounded-lg bg-[var(--color-background)] px-3 py-2 text-sm">
                  <div>
                    <span className="text-white">{t.tenant_name}</span>
                    {t.unit && <span className="ml-2 text-xs text-[var(--color-muted-foreground)]">Unit {t.unit}</span>}
                  </div>
                  <div className="flex items-center gap-3">
                    {t.monthly_rent && (
                      <span className="font-mono text-white">{formatCurrency(t.monthly_rent)}/mo</span>
                    )}
                    <span
                      className={clsx(
                        'text-xs capitalize',
                        t.payment_status === 'current' ? 'text-[var(--color-success)]' :
                        t.payment_status === 'late' ? 'text-[var(--color-warning)]' :
                        'text-[var(--color-danger)]'
                      )}
                    >
                      {t.payment_status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--color-muted)]">{property.is_rental ? 'No tenants' : 'Not a rental property'}</p>
          )}
        </div>

        {/* Maintenance */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <div className="mb-4 flex items-center gap-2">
            <Wrench size={16} className="text-[var(--color-muted-foreground)]" />
            <h3 className="text-sm font-medium text-[var(--color-muted-foreground)]">
              Maintenance ({maintenance?.length ?? 0})
            </h3>
          </div>
          {maintenance && maintenance.length > 0 ? (
            <div className="max-h-80 space-y-2 overflow-y-auto">
              {maintenance.map((m) => (
                <div key={m.id} className="rounded-lg bg-[var(--color-background)] px-3 py-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white">{m.title}</span>
                    <span className={clsx('rounded-full px-2 py-0.5 text-xs capitalize', STATUS_COLORS[m.status] ?? '')}>
                      {m.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
                    <span className={PRIORITY_COLORS[m.priority]}>{m.priority}</span>
                    {m.estimated_cost && <span>Est. {formatCurrency(m.estimated_cost)}</span>}
                    {m.vendor && <span>· {m.vendor}</span>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--color-muted)]">No maintenance requests</p>
          )}
        </div>
      </div>
    </div>
  );
}
