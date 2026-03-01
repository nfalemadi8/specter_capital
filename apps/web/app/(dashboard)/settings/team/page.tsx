'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatDate } from '@/lib/utils/format';
import Link from 'next/link';
import { ArrowLeft, UserPlus, Shield, MoreVertical } from 'lucide-react';
import { clsx } from 'clsx';
import type { TenantMember, UserRole } from '@specter/shared-types';

const ROLE_COLORS: Record<UserRole, string> = {
  principal: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
  co_principal: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
  cfo: 'bg-[var(--color-success)]/10 text-[var(--color-success)]',
  accountant: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]',
  advisor: 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]',
  family_member: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
  family_junior: 'bg-[var(--color-muted)]/10 text-[var(--color-muted-foreground)]',
  auditor: 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]',
  property_manager: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]',
};

export default function TeamSettingsPage() {
  const { tenant } = useTenant();
  const supabase = createClient();
  const [showInvite, setShowInvite] = useState(false);

  const { data: members } = useQuery({
    queryKey: ['team-members', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('tenant_members')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('role');
      return (data ?? []) as TenantMember[];
    },
    enabled: !!tenant?.id,
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/settings" className="rounded-lg p-2 hover:bg-[var(--color-surface-hover)]">
            <ArrowLeft size={20} className="text-[var(--color-muted-foreground)]" />
          </Link>
          <h1 className="text-2xl font-bold text-white">Team Members</h1>
        </div>
        <button
          onClick={() => setShowInvite(!showInvite)}
          className="flex items-center gap-1.5 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
        >
          <UserPlus size={16} />
          Invite
        </button>
      </div>

      {showInvite && (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <h3 className="text-sm font-medium text-white">Invite Team Member</h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Email address"
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2.5 text-sm text-white placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:outline-none"
            />
            <select className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2.5 text-sm text-white focus:border-[var(--color-primary)] focus:outline-none">
              <option value="family_member">Family Member</option>
              <option value="co_principal">Co-Principal</option>
              <option value="cfo">CFO</option>
              <option value="accountant">Accountant</option>
              <option value="advisor">Advisor</option>
              <option value="family_junior">Family Junior</option>
              <option value="auditor">Auditor</option>
              <option value="property_manager">Property Manager</option>
            </select>
          </div>
          <button className="mt-4 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-foreground)]">
            Send Invitation
          </button>
        </div>
      )}

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="divide-y divide-[var(--color-border)]">
          {members?.map((member) => (
            <div key={member.id} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-sm font-medium text-[var(--color-primary)]">
                  {member.display_name?.[0]?.toUpperCase() ?? '?'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white">{member.display_name}</p>
                    <span className={clsx('rounded-full px-2 py-0.5 text-xs capitalize', ROLE_COLORS[member.role])}>
                      {member.role.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-muted-foreground)]">
                    {member.title ?? ''}
                    {member.last_active_at ? ` · Last active ${formatDate(member.last_active_at)}` : ''}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={clsx('text-xs', member.is_active ? 'text-[var(--color-success)]' : 'text-[var(--color-muted-foreground)]')}>
                  {member.is_active ? 'Active' : 'Inactive'}
                </span>
                <button className="rounded-lg p-1.5 hover:bg-[var(--color-surface-hover)]">
                  <MoreVertical size={16} className="text-[var(--color-muted-foreground)]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-[var(--color-primary)]" />
          <h3 className="text-sm font-medium text-white">Seat Usage</h3>
        </div>
        <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
          {members?.length ?? 0} of {tenant?.plan_seats ?? 5} seats used
        </p>
        <div className="mt-2 h-2 w-full rounded-full bg-[var(--color-background)]">
          <div
            className="h-2 rounded-full bg-[var(--color-primary)]"
            style={{ width: `${Math.min(((members?.length ?? 0) / (tenant?.plan_seats ?? 5)) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
