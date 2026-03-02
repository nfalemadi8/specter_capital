'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import type { WatchlistItem } from '@specter/shared-types';

export function WatchlistPanel() {
  const { tenant } = useTenant();
  const supabase = createClient();

  const { data: watchlist } = useQuery({
    queryKey: ['watchlist', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('watchlist')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('created_at', { ascending: false })
        .limit(10);
      return (data ?? []) as WatchlistItem[];
    },
    enabled: !!tenant?.id,
  });

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
      <h3 className="mb-4 text-sm font-medium text-[var(--color-muted-foreground)]">
        Watchlist
      </h3>
      <div className="space-y-3">
        {(!watchlist || watchlist.length === 0) ? (
          <p className="text-sm text-[var(--color-muted)]">No items in watchlist</p>
        ) : (
          watchlist.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg bg-[var(--color-background)] px-3 py-2"
            >
              <div>
                <p className="text-sm font-medium text-white">{item.symbol}</p>
                {item.notes && (
                  <p className="text-xs text-[var(--color-muted-foreground)] truncate max-w-[120px]">
                    {item.notes}
                  </p>
                )}
              </div>
              <div className="text-right font-mono text-sm">
                {item.target_price && (
                  <p className="text-[var(--color-muted-foreground)]">
                    Target: ${item.target_price.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
