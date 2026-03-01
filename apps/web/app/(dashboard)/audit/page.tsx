'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatDate } from '@/lib/utils/format';
import { Shield, Search } from 'lucide-react';
import { clsx } from 'clsx';
import type { AuditLogEntry } from '@specter/shared-types';

const ACTION_STYLES: Record<string, string> = {
  view: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
  create: 'bg-[var(--color-success)]/10 text-[var(--color-success)]',
  update: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]',
  delete: 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]',
  approve: 'bg-[var(--color-success)]/10 text-[var(--color-success)]',
  login: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
  export: 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]',
  download: 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]',
};

export default function AuditPage() {
  const { tenant } = useTenant();
  const supabase = createClient();
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('all');

  const { data: logs } = useQuery({
    queryKey: ['audit-log', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('audit_log')
        .select('*, tenant_members(display_name)')
        .eq('tenant_id', tenant.id)
        .order('created_at', { ascending: false })
        .limit(200);
      return (data ?? []) as (AuditLogEntry & { tenant_members: { display_name: string } | null })[];
    },
    enabled: !!tenant?.id,
  });

  const filtered = logs?.filter((log) => {
    if (actionFilter !== 'all' && log.action !== actionFilter) return false;
    if (search) {
      const s = search.toLowerCase();
      return (
        log.action.toLowerCase().includes(s) ||
        log.resource_type.toLowerCase().includes(s) ||
        log.tenant_members?.display_name.toLowerCase().includes(s) ||
        log.ip_address?.includes(s)
      );
    }
    return true;
  }) ?? [];

  const actions = ['all', ...new Set(logs?.map((l) => l.action) ?? [])];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield size={24} className="text-[var(--color-primary)]" />
        <h1 className="text-2xl font-bold text-white">Audit Trail</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit log..."
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] py-2 pl-9 pr-4 text-sm text-white placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:outline-none"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto">
          {actions.map((a) => (
            <button
              key={a}
              onClick={() => setActionFilter(a)}
              className={clsx(
                'whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors',
                actionFilter === a
                  ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                  : 'bg-[var(--color-surface)] text-[var(--color-muted-foreground)] hover:text-white'
              )}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="divide-y divide-[var(--color-border)]">
          {filtered.length > 0 ? (
            filtered.map((log) => (
              <div key={log.id} className="flex items-center justify-between px-6 py-3">
                <div className="flex items-center gap-3">
                  <span className={clsx('rounded-full px-2 py-0.5 text-xs capitalize', ACTION_STYLES[log.action] ?? 'bg-[var(--color-surface-hover)] text-white')}>
                    {log.action}
                  </span>
                  <div>
                    <p className="text-sm text-white">
                      <span className="font-medium">{log.tenant_members?.display_name ?? 'System'}</span>
                      {' '}
                      <span className="text-[var(--color-muted-foreground)]">{log.action}</span>
                      {' '}
                      <span className="capitalize">{log.resource_type.replace(/_/g, ' ')}</span>
                    </p>
                    {log.details && (
                      <p className="mt-0.5 max-w-md truncate text-xs text-[var(--color-muted-foreground)]">
                        {JSON.stringify(log.details)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right text-xs text-[var(--color-muted-foreground)]">
                  <p>{formatDate(log.created_at)}</p>
                  {log.ip_address && <p className="font-mono">{log.ip_address}</p>}
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-[var(--color-muted)]">No audit log entries</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
