'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatCurrency } from '@/lib/utils/format';
import { StatCard } from '@specter/ui';
import Link from 'next/link';
import { ArrowLeft, TrendingDown, AlertTriangle, DollarSign } from 'lucide-react';
import { clsx } from 'clsx';
import type { TaxLossHarvesting } from '@specter/shared-types';

const STATUS_STYLES: Record<string, string> = {
  identified: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
  approved: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]',
  executed: 'bg-[var(--color-success)]/10 text-[var(--color-success)]',
  dismissed: 'bg-[var(--color-muted)]/10 text-[var(--color-muted-foreground)]',
};

export default function TLHScannerPage() {
  const { tenant } = useTenant();
  const supabase = createClient();

  const { data: opportunities } = useQuery({
    queryKey: ['tlh', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('tax_loss_harvesting')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('unrealized_loss', { ascending: true });
      return (data ?? []) as TaxLossHarvesting[];
    },
    enabled: !!tenant?.id,
  });

  const identified = opportunities?.filter((o) => o.status === 'identified') ?? [];
  const totalLoss = identified.reduce((s, o) => s + o.unrealized_loss, 0);
  const totalSavings = identified.reduce((s, o) => s + (o.potential_tax_savings ?? 0), 0);
  const washSaleRisks = identified.filter((o) => o.has_wash_sale_risk).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/tax" className="rounded-lg p-2 hover:bg-[var(--color-surface-hover)]">
          <ArrowLeft size={20} className="text-[var(--color-muted-foreground)]" />
        </Link>
        <h1 className="text-2xl font-bold text-white">Tax Loss Harvesting Scanner</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <StatCard title="Opportunities" value={String(identified.length)} icon={<TrendingDown size={20} />} />
        <StatCard title="Unrealized Losses" value={formatCurrency(Math.abs(totalLoss), 'USD', true)} icon={<DollarSign size={20} />} />
        <StatCard title="Potential Savings" value={formatCurrency(totalSavings, 'USD', true)} icon={<DollarSign size={20} />} />
        <StatCard title="Wash Sale Risks" value={String(washSaleRisks)} icon={<AlertTriangle size={20} />} />
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="border-b border-[var(--color-border)] px-6 py-3">
          <h3 className="text-sm font-medium text-[var(--color-muted-foreground)]">Harvesting Opportunities</h3>
        </div>
        <div className="divide-y divide-[var(--color-border)]">
          {opportunities && opportunities.length > 0 ? (
            opportunities.map((opp) => (
              <div key={opp.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-medium text-white">{opp.symbol}</span>
                    <span className={clsx('rounded-full px-2 py-0.5 text-xs capitalize', STATUS_STYLES[opp.status] ?? '')}>
                      {opp.status}
                    </span>
                    {opp.has_wash_sale_risk && (
                      <span className="flex items-center gap-1 rounded-full bg-[var(--color-danger)]/10 px-2 py-0.5 text-xs text-[var(--color-danger)]">
                        <AlertTriangle size={10} />
                        Wash sale risk
                      </span>
                    )}
                  </div>
                  {opp.replacement_symbol && (
                    <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">
                      Replacement: <span className="font-mono text-white">{opp.replacement_symbol}</span>
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm text-[var(--color-danger)]">
                    {formatCurrency(opp.unrealized_loss)}
                  </p>
                  {opp.potential_tax_savings && (
                    <p className="text-xs text-[var(--color-success)]">
                      Save {formatCurrency(opp.potential_tax_savings)}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-[var(--color-muted)]">No tax loss harvesting opportunities identified</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
