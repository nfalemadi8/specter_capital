'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { formatCurrency, formatPercent, formatDate } from '@/lib/utils/format';
import { StatCard, LoadingSkeleton } from '@specter/ui';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import type { Holding, TaxLot } from '@specter/shared-types';

export default function HoldingDetailPage() {
  const params = useParams();
  const holdingId = params.holding as string;
  const supabase = createClient();

  const { data: holding, isLoading } = useQuery({
    queryKey: ['holding', holdingId],
    queryFn: async () => {
      const { data } = await supabase
        .from('holdings')
        .select('*')
        .eq('id', holdingId)
        .single();
      return data as Holding | null;
    },
  });

  const { data: taxLots } = useQuery({
    queryKey: ['tax-lots', holdingId],
    queryFn: async () => {
      const { data } = await supabase
        .from('tax_lots')
        .select('*')
        .eq('holding_id', holdingId)
        .order('acquisition_date', { ascending: true });
      return (data ?? []) as TaxLot[];
    },
    enabled: !!holdingId,
  });

  if (isLoading) return <LoadingSkeleton variant="card" />;
  if (!holding) return <p className="text-[var(--color-muted-foreground)]">Holding not found</p>;

  const pnl = holding.unrealized_pnl ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/portfolio" className="rounded-lg p-2 hover:bg-[var(--color-surface-hover)]">
          <ArrowLeft size={20} className="text-[var(--color-muted-foreground)]" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{holding.symbol}</h1>
          <p className="text-sm text-[var(--color-muted-foreground)]">{holding.security_name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Current Price"
          value={`$${Number(holding.current_price ?? 0).toFixed(2)}`}
        />
        <StatCard
          title="Market Value"
          value={formatCurrency(holding.market_value ?? 0)}
        />
        <StatCard
          title="Unrealized P&L"
          value={formatCurrency(pnl)}
          change={formatPercent(holding.unrealized_pnl_pct ?? 0)}
          changeType={pnl >= 0 ? 'positive' : 'negative'}
          icon={pnl >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
        />
        <StatCard
          title="Cost Basis"
          value={formatCurrency(holding.cost_basis ?? 0)}
        />
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <h3 className="mb-4 text-sm font-medium text-[var(--color-muted-foreground)]">Position Details</h3>
          <dl className="space-y-3 text-sm">
            {[
              ['Quantity', Number(holding.quantity).toLocaleString()],
              ['Asset Class', holding.asset_class],
              ['Sector', holding.sector ?? '—'],
              ['Industry', holding.industry ?? '—'],
              ['Holding Period', holding.holding_period ?? '—'],
              ['Acquisition Date', holding.acquisition_date ? formatDate(holding.acquisition_date) : '—'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <dt className="text-[var(--color-muted-foreground)]">{label}</dt>
                <dd className="font-mono text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <h3 className="mb-4 text-sm font-medium text-[var(--color-muted-foreground)]">
            Tax Lots ({taxLots?.length ?? 0})
          </h3>
          {taxLots && taxLots.length > 0 ? (
            <div className="space-y-2">
              {taxLots.map((lot) => (
                <div
                  key={lot.id}
                  className="flex items-center justify-between rounded-lg bg-[var(--color-background)] px-3 py-2 text-sm"
                >
                  <div>
                    <p className="text-white">
                      {Number(lot.quantity).toLocaleString()} shares @ ${Number(lot.cost_basis_per_unit).toFixed(2)}
                    </p>
                    <p className="text-xs text-[var(--color-muted-foreground)]">
                      {formatDate(lot.acquisition_date)} &middot; {lot.acquisition_method}
                    </p>
                  </div>
                  {lot.is_wash_sale && (
                    <span className="rounded bg-[var(--color-warning)]/10 px-2 py-0.5 text-xs text-[var(--color-warning)]">
                      Wash Sale
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--color-muted)]">No tax lot data available</p>
          )}
        </div>
      </div>
    </div>
  );
}
