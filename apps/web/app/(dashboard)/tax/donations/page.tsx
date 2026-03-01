'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { StatCard } from '@specter/ui';
import Link from 'next/link';
import { ArrowLeft, Heart, DollarSign } from 'lucide-react';
import type { CharitableDonation } from '@specter/shared-types';

export default function DonationsPage() {
  const { tenant } = useTenant();
  const supabase = createClient();
  const currentYear = new Date().getFullYear();

  const { data: donations } = useQuery({
    queryKey: ['donations', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('charitable_donations')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('donation_date', { ascending: false });
      return (data ?? []) as CharitableDonation[];
    },
    enabled: !!tenant?.id,
  });

  const ytdDonations = donations?.filter((d) => d.tax_year === currentYear) ?? [];
  const totalDonated = ytdDonations.reduce((s, d) => s + d.amount, 0);
  const totalDeductions = ytdDonations.reduce((s, d) => s + (d.tax_deduction_amount ?? 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/tax" className="rounded-lg p-2 hover:bg-[var(--color-surface-hover)]">
          <ArrowLeft size={20} className="text-[var(--color-muted-foreground)]" />
        </Link>
        <h1 className="text-2xl font-bold text-white">Charitable Donations</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard title={`${currentYear} Donations`} value={String(ytdDonations.length)} icon={<Heart size={20} />} />
        <StatCard title="Total Donated" value={formatCurrency(totalDonated, 'USD', true)} icon={<DollarSign size={20} />} />
        <StatCard title="Tax Deductions" value={formatCurrency(totalDeductions, 'USD', true)} icon={<DollarSign size={20} />} />
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="divide-y divide-[var(--color-border)]">
          {donations && donations.length > 0 ? (
            donations.map((d) => (
              <div key={d.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-white">{d.recipient}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
                    {d.donation_type && (
                      <span className="capitalize rounded bg-[var(--color-surface-hover)] px-1.5 py-0.5">
                        {d.donation_type}
                      </span>
                    )}
                    <span>{formatDate(d.donation_date)}</span>
                    {d.acknowledgment_received && (
                      <span className="text-[var(--color-success)]">Receipt received</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm text-white">{formatCurrency(d.amount)}</p>
                  {d.tax_deduction_amount && (
                    <p className="text-xs text-[var(--color-success)]">
                      Deduction: {formatCurrency(d.tax_deduction_amount)}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-[var(--color-muted)]">No donations recorded</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
