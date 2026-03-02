'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatRelativeTime } from '@/lib/utils/format';
import type { AuditLogEntry } from '@specter/shared-types';

const ACTION_LABELS: Record<string, string> = {
  create: 'Created',
  update: 'Updated',
  delete: 'Deleted',
  approve: 'Approved',
  login: 'Logged in',
  view: 'Viewed',
  export: 'Exported',
  download: 'Downloaded',
};

export function ActivityFeed() {
  const { tenant } = useTenant();
  const supabase = createClient();

  const { data: activities } = useQuery({
    queryKey: ['activity-feed', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('audit_log')
        .select('*, tenant_members(display_name)')
        .eq('tenant_id', tenant.id)
        .order('created_at', { ascending: false })
        .limit(10);
      return (data ?? []) as (AuditLogEntry & { tenant_members: { display_name: string } | null })[];
    },
    enabled: !!tenant?.id,
  });

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
      <h3 className="mb-4 text-sm font-medium text-[var(--color-muted-foreground)]">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {(!activities || activities.length === 0) ? (
          <p className="text-sm text-[var(--color-muted)]">No recent activity</p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--color-primary)]" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-white">
                  <span className="font-medium">
                    {activity.tenant_members?.display_name ?? 'System'}
                  </span>{' '}
                  {ACTION_LABELS[activity.action] ?? activity.action}{' '}
                  <span className="text-[var(--color-muted-foreground)]">
                    {activity.resource_type}
                  </span>
                </p>
                <p className="text-xs text-[var(--color-muted)]">
                  {formatRelativeTime(activity.created_at)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
