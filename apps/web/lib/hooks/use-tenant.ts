'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { Tenant } from '@specter/shared-types';

export function useTenant() {
  const supabase = createClient();

  const { data: tenant, isLoading } = useQuery({
    queryKey: ['current-tenant'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      // Get tenant through membership
      const { data: membership } = await supabase
        .from('tenant_members')
        .select('tenant_id')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (!membership) return null;

      const { data: tenant } = await supabase
        .from('tenants')
        .select('*')
        .eq('id', membership.tenant_id)
        .single();

      return tenant as Tenant | null;
    },
  });

  return { tenant, isLoading };
}
