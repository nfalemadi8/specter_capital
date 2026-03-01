'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatDate } from '@/lib/utils/format';
import Link from 'next/link';
import { ArrowLeft, Plug, RefreshCw, Check, AlertCircle, Clock } from 'lucide-react';
import { clsx } from 'clsx';
import type { IntegrationConnection } from '@specter/shared-types';

interface IntegrationProvider {
  id: string;
  name: string;
  description: string;
  logo: string;
  available: boolean;
}

const PROVIDERS: IntegrationProvider[] = [
  {
    id: 'plaid',
    name: 'Plaid',
    description: 'Connect 12,000+ banks for account and transaction data',
    logo: '🏦',
    available: true,
  },
  {
    id: 'ibkr',
    name: 'Interactive Brokers',
    description: 'Positions, orders, and market data from IBKR',
    logo: '📈',
    available: true,
  },
  {
    id: 'alpaca',
    name: 'Alpaca',
    description: 'Commission-free trading API with paper trading',
    logo: '🦙',
    available: true,
  },
  {
    id: 'specter_terminal',
    name: 'Specter Terminal',
    description: 'Embedded market terminal with real-time data',
    logo: '⚡',
    available: true,
  },
];

const STATUS_ICONS: Record<string, React.ReactNode> = {
  active: <Check size={14} className="text-[var(--color-success)]" />,
  error: <AlertCircle size={14} className="text-[var(--color-danger)]" />,
  pending: <Clock size={14} className="text-[var(--color-warning)]" />,
  disconnected: <AlertCircle size={14} className="text-[var(--color-muted-foreground)]" />,
};

export default function IntegrationsPage() {
  const { tenant } = useTenant();
  const supabase = createClient();
  const queryClient = useQueryClient();

  const { data: connections } = useQuery({
    queryKey: ['integrations', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('integration_connections')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('provider');
      return (data ?? []) as IntegrationConnection[];
    },
    enabled: !!tenant?.id,
  });

  const syncMutation = useMutation({
    mutationFn: async ({ provider, connectionId }: { provider: string; connectionId: string }) => {
      const response = await fetch(`/api/integrations/${provider}/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ connectionId }),
      });
      if (!response.ok) throw new Error('Sync failed');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['integrations'] });
    },
  });

  const getConnection = (provider: string) =>
    connections?.find((c) => c.provider === provider);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/settings" className="rounded-lg p-2 hover:bg-[var(--color-surface-hover)]">
          <ArrowLeft size={20} className="text-[var(--color-muted-foreground)]" />
        </Link>
        <div className="flex items-center gap-2">
          <Plug size={24} className="text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-white">Integrations</h1>
        </div>
      </div>

      <div className="space-y-4">
        {PROVIDERS.map((provider) => {
          const connection = getConnection(provider.id);
          return (
            <div
              key={provider.id}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{provider.logo}</span>
                  <div>
                    <h3 className="text-sm font-medium text-white">{provider.name}</h3>
                    <p className="text-xs text-[var(--color-muted-foreground)]">{provider.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {connection ? (
                    <>
                      <div className="flex items-center gap-1.5">
                        {STATUS_ICONS[connection.status]}
                        <span className={clsx(
                          'text-xs capitalize',
                          connection.status === 'active' ? 'text-[var(--color-success)]' :
                          connection.status === 'error' ? 'text-[var(--color-danger)]' :
                          'text-[var(--color-muted-foreground)]'
                        )}>
                          {connection.status}
                        </span>
                      </div>
                      <button
                        onClick={() => syncMutation.mutate({ provider: provider.id, connectionId: connection.id })}
                        disabled={syncMutation.isPending}
                        className="rounded-lg border border-[var(--color-border)] p-1.5 hover:bg-[var(--color-surface-hover)] disabled:opacity-50"
                      >
                        <RefreshCw size={14} className={clsx('text-[var(--color-muted-foreground)]', syncMutation.isPending && 'animate-spin')} />
                      </button>
                    </>
                  ) : (
                    <button className="rounded-lg bg-[var(--color-primary)] px-4 py-1.5 text-xs font-medium text-[var(--color-primary-foreground)]">
                      Connect
                    </button>
                  )}
                </div>
              </div>
              {connection && (
                <div className="mt-3 flex items-center gap-4 border-t border-[var(--color-border)] pt-3 text-xs text-[var(--color-muted-foreground)]">
                  {connection.last_sync_at && (
                    <span>Last synced: {formatDate(connection.last_sync_at)}</span>
                  )}
                  <span>Frequency: {connection.sync_frequency}</span>
                  {connection.sync_error && (
                    <span className="text-[var(--color-danger)]">Error: {connection.sync_error}</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
