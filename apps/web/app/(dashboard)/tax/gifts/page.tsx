'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { StatCard } from '@specter/ui';
import Link from 'next/link';
import { ArrowLeft, Gift, DollarSign, FileText } from 'lucide-react';
import type { GiftTracking } from '@specter/shared-types';

export default function GiftTrackingPage() {
  const { tenant } = useTenant();
  const supabase = createClient();
  const currentYear = new Date().getFullYear();

  const { data: gifts } = useQuery({
    queryKey: ['gifts', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('gift_tracking')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('gift_date', { ascending: false });
      return (data ?? []) as GiftTracking[];
    },
    enabled: !!tenant?.id,
  });

  const ytdGifts = gifts?.filter((g) => g.tax_year === currentYear) ?? [];
  const totalGifted = ytdGifts.reduce((s, g) => s + g.amount, 0);
  const exclusionUsed = ytdGifts.reduce((s, g) => s + (g.annual_exclusion_used ?? 0), 0);
  const form709Required = ytdGifts.filter((g) => g.requires_form_709).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/tax" className="rounded-lg p-2 hover:bg-[var(--color-surface-hover)]">
          <ArrowLeft size={20} className="text-[var(--color-muted-foreground)]" />
        </Link>
        <h1 className="text-2xl font-bold text-white">Gift Tracking</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <StatCard title={`${currentYear} Gifts`} value={String(ytdGifts.length)} icon={<Gift size={20} />} />
        <StatCard title="Total Gifted" value={formatCurrency(totalGifted, 'USD', true)} icon={<DollarSign size={20} />} />
        <StatCard title="Exclusion Used" value={formatCurrency(exclusionUsed, 'USD', true)} icon={<DollarSign size={20} />} />
        <StatCard title="Form 709 Required" value={String(form709Required)} icon={<FileText size={20} />} />
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="divide-y divide-[var(--color-border)]">
          {gifts && gifts.length > 0 ? (
            gifts.map((g) => (
              <div key={g.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-white">{g.recipient_name}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
                    {g.recipient_relationship && <span>{g.recipient_relationship}</span>}
                    {g.gift_type && (
                      <span className="capitalize rounded bg-[var(--color-surface-hover)] px-1.5 py-0.5">
                        {g.gift_type.replace(/_/g, ' ')}
                      </span>
                    )}
                    <span>{formatDate(g.gift_date)}</span>
                    {g.requires_form_709 && (
                      <span className="text-[var(--color-warning)]">Form 709</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm text-white">{formatCurrency(g.amount)}</p>
                  {g.annual_exclusion_used && (
                    <p className="text-xs text-[var(--color-muted-foreground)]">
                      Exclusion: {formatCurrency(g.annual_exclusion_used)}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-[var(--color-muted)]">No gifts tracked</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
