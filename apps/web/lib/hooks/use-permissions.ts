'use client';

import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import {
  hasPermission,
  isAdmin,
  canAccessModule,
  type ModuleName,
  type ActionType,
} from '@/lib/utils/permissions';
import type { TenantMember, RolePermissions } from '@specter/shared-types';

export function usePermissions() {
  const supabase = createClient();

  const { data: member } = useQuery({
    queryKey: ['current-member'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from('tenant_members')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      return data as TenantMember | null;
    },
  });

  const { data: rolePermissions } = useQuery({
    queryKey: ['role-permissions', member?.role],
    queryFn: async () => {
      if (!member?.role) return null;

      const { data } = await supabase
        .from('role_permissions')
        .select('*')
        .eq('role', member.role)
        .single();

      return data as RolePermissions | null;
    },
    enabled: !!member?.role,
  });

  const can = useCallback(
    (module: ModuleName, action: ActionType) => {
      return hasPermission(rolePermissions ?? null, member ?? null, module, action);
    },
    [rolePermissions, member]
  );

  const canAccess = useCallback(
    (module: ModuleName) => {
      return canAccessModule(rolePermissions ?? null, member ?? null, module);
    },
    [rolePermissions, member]
  );

  return {
    member,
    rolePermissions,
    can,
    canAccess,
    isAdmin: member ? isAdmin(member.role) : false,
  };
}
