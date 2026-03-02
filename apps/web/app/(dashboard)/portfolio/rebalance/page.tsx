'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatPercent } from '@/lib/utils/format';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { RebalanceRule, Holding } from '@specter/shared-types';

export default function RebalancePage() {
  const { tenant } = useTenant();
  const supabase = createClient();

  const { data: rules } = useQuery({
    queryKey: ['rebalance-rules', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('rebalance_rules')
        .select('*')
        .eq('tenant_id', tenant.id)
        .eq('is_active', true);
      return (data ?? []) as RebalanceRule[];
    },
    enabled: !!tenant?.id,
  });

  const { data: holdings } = useQuery({
    queryKey: ['holdings-allocation', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('holdings')
        .select('asset_class, market_value')
        .eq('tenant_id', tenant.id);
      return (data ?? []) as Pick<Holding, 'asset_class' | 'market_value'>[];
    },
    enabled: !!tenant?.id,
  });

  const totalValue = holdings?.reduce((sum, h) => sum + (h.market_value ?? 0), 0) ?? 0;
  const currentAllocation: Record<string, number> = {};
  holdings?.forEach((h) => {
    currentAllocation[h.asset_class] =
      (currentAllocation[h.asset_class] ?? 0) + (h.market_value ?? 0);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/portfolio" className="rounded-lg p-2 hover:bg-[var(--color-surface-hover)]">
          <ArrowLeft size={20} className="text-[var(--color-muted-foreground)]" />
        </Link>
        <h1 className="text-2xl font-bold text-white">Rebalancing Tool</h1>
      </div>

      {rules && rules.length > 0 ? (
        rules.map((rule) => {
          const targets = rule.target_allocation as Record<string, number>;
          return (
            <div
              key={rule.id}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
            >
              <h3 className="mb-4 font-medium text-white">{rule.name}</h3>
              <p className="mb-4 text-xs text-[var(--color-muted-foreground)]">
                Drift threshold: {rule.drift_threshold}% &middot; Frequency: {rule.rebalance_frequency}
              </p>
              <div className="space-y-3">
                {Object.entries(targets).map(([cls, target]) => {
                  const current =
                    totalValue > 0
                      ? ((currentAllocation[cls] ?? 0) / totalValue) * 100
                      : 0;
                  const drift = current - target;
                  const overThreshold = Math.abs(drift) > rule.drift_threshold;

                  return (
                    <div key={cls} className="flex items-center gap-4 text-sm">
                      <span className="w-32 capitalize text-[var(--color-muted-foreground)]">
                        {cls.replace(/_/g, ' ')}
                      </span>
                      <div className="flex-1">
                        <div className="h-2 rounded-full bg-[var(--color-background)]">
                          <div
                            className="h-2 rounded-full bg-[var(--color-primary)]"
                            style={{ width: `${Math.min(current, 100)}%` }}
                          />
                        </div>
                      </div>
                      <span className="w-20 text-right font-mono text-white">
                        {current.toFixed(1)}%
                      </span>
                      <span className="w-20 text-right font-mono text-[var(--color-muted-foreground)]">
                        {target}%
                      </span>
                      <span
                        className={`w-20 text-right font-mono ${
                          overThreshold ? 'text-[var(--color-danger)]' : 'text-[var(--color-success)]'
                        }`}
                      >
                        {formatPercent(drift)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      ) : (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
          <p className="text-[var(--color-muted-foreground)]">
            No rebalancing rules configured. Set target allocations to get started.
          </p>
        </div>
      )}
    </div>
  );
}
