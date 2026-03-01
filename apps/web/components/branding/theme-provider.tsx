'use client';

import { useEffect } from 'react';
import { useTenant } from '@/lib/hooks/use-tenant';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { TenantBranding } from '@specter/shared-types';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { tenant } = useTenant();
  const supabase = createClient();

  const { data: branding } = useQuery({
    queryKey: ['tenant-branding', tenant?.id],
    queryFn: async () => {
      if (!tenant) return null;
      const { data } = await supabase
        .from('tenant_branding')
        .select('*')
        .eq('tenant_id', tenant.id)
        .single();
      return data as TenantBranding | null;
    },
    enabled: !!tenant?.id,
  });

  useEffect(() => {
    if (!branding) return;

    const root = document.documentElement;
    root.style.setProperty('--color-primary', branding.primary_color);
    root.style.setProperty('--color-accent', branding.secondary_color);
    root.style.setProperty('--color-success', branding.accent_color);
    root.style.setProperty('--color-danger', branding.danger_color);
    root.style.setProperty('--color-background', branding.background_color);
    root.style.setProperty('--color-surface', branding.surface_color);

    if (branding.custom_css) {
      const style = document.createElement('style');
      style.textContent = branding.custom_css;
      style.id = 'tenant-custom-css';
      const existing = document.getElementById('tenant-custom-css');
      if (existing) existing.remove();
      document.head.appendChild(style);
    }
  }, [branding]);

  return <>{children}</>;
}
