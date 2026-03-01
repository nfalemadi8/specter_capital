'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import Link from 'next/link';
import { ArrowLeft, Palette, Upload } from 'lucide-react';
import type { TenantBranding } from '@specter/shared-types';

interface ColorField {
  key: keyof TenantBranding;
  label: string;
}

const COLOR_FIELDS: ColorField[] = [
  { key: 'primary_color', label: 'Primary' },
  { key: 'secondary_color', label: 'Secondary' },
  { key: 'accent_color', label: 'Accent' },
  { key: 'danger_color', label: 'Danger' },
  { key: 'background_color', label: 'Background' },
  { key: 'surface_color', label: 'Surface' },
];

export default function BrandingSettingsPage() {
  const { tenant } = useTenant();
  const supabase = createClient();

  const { data: branding } = useQuery({
    queryKey: ['branding', tenant?.id],
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

  const [formData, setFormData] = useState<Partial<TenantBranding>>({});

  useEffect(() => {
    if (branding) {
      setFormData(branding);
    }
  }, [branding]);

  const updateField = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/settings" className="rounded-lg p-2 hover:bg-[var(--color-surface-hover)]">
          <ArrowLeft size={20} className="text-[var(--color-muted-foreground)]" />
        </Link>
        <h1 className="text-2xl font-bold text-white">Branding</h1>
      </div>

      {/* Logo */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <h3 className="text-sm font-medium text-white">Logo</h3>
        <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">Upload logos for light and dark themes.</p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-dashed border-[var(--color-border)] p-6">
            <Upload size={24} className="text-[var(--color-muted)]" />
            <span className="text-xs text-[var(--color-muted-foreground)]">Light Logo</span>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-dashed border-[var(--color-border)] p-6">
            <Upload size={24} className="text-[var(--color-muted)]" />
            <span className="text-xs text-[var(--color-muted-foreground)]">Dark Logo</span>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <div className="flex items-center gap-2">
          <Palette size={18} className="text-[var(--color-primary)]" />
          <h3 className="text-sm font-medium text-white">Colors</h3>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {COLOR_FIELDS.map(({ key, label }) => (
            <div key={key}>
              <label className="text-xs text-[var(--color-muted-foreground)]">{label}</label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="color"
                  value={(formData[key] as string) ?? '#22d3ee'}
                  onChange={(e) => updateField(key, e.target.value)}
                  className="h-8 w-8 cursor-pointer rounded border border-[var(--color-border)]"
                />
                <input
                  type="text"
                  value={(formData[key] as string) ?? ''}
                  onChange={(e) => updateField(key, e.target.value)}
                  className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-1.5 font-mono text-xs text-white focus:border-[var(--color-primary)] focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fonts */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <h3 className="text-sm font-medium text-white">Typography</h3>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {[
            { key: 'font_heading', label: 'Heading Font' },
            { key: 'font_body', label: 'Body Font' },
            { key: 'font_mono', label: 'Mono Font' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="text-xs text-[var(--color-muted-foreground)]">{label}</label>
              <input
                type="text"
                value={(formData[key as keyof TenantBranding] as string) ?? ''}
                onChange={(e) => updateField(key, e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-white focus:border-[var(--color-primary)] focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <h3 className="text-sm font-medium text-white">Custom CSS</h3>
        <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">Advanced: Add custom CSS for fine-grained control.</p>
        <textarea
          value={(formData.custom_css as string) ?? ''}
          onChange={(e) => updateField('custom_css', e.target.value)}
          rows={6}
          className="mt-3 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 font-mono text-xs text-white placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:outline-none"
          placeholder="/* Custom CSS */"
        />
      </div>

      <div className="flex justify-end">
        <button className="rounded-lg bg-[var(--color-primary)] px-6 py-2.5 text-sm font-medium text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90">
          Save Branding
        </button>
      </div>
    </div>
  );
}
