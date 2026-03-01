'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatDate } from '@/lib/utils/format';
import Link from 'next/link';
import { ArrowLeft, GraduationCap, CheckCircle, Circle } from 'lucide-react';
import { clsx } from 'clsx';
import type { EducationProgram } from '@specter/shared-types';

export default function EducationPage() {
  const { tenant } = useTenant();
  const supabase = createClient();

  const { data: programs } = useQuery({
    queryKey: ['education-all', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('education_programs')
        .select('*, tenant_members(display_name)')
        .eq('tenant_id', tenant.id)
        .order('created_at', { ascending: false });
      return (data ?? []) as (EducationProgram & { tenant_members: { display_name: string } | null })[];
    },
    enabled: !!tenant?.id,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/governance" className="rounded-lg p-2 hover:bg-[var(--color-surface-hover)]">
          <ArrowLeft size={20} className="text-[var(--color-muted-foreground)]" />
        </Link>
        <h1 className="text-2xl font-bold text-white">Education Programs</h1>
      </div>

      <div className="space-y-4">
        {programs && programs.length > 0 ? (
          programs.map((p) => (
            <div key={p.id} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-white">{p.title}</h3>
                  <div className="mt-1 flex items-center gap-3 text-sm text-[var(--color-muted-foreground)]">
                    {p.tenant_members && <span>{p.tenant_members.display_name}</span>}
                    {p.category && <span className="capitalize">{p.category.replace(/_/g, ' ')}</span>}
                    {p.started_at && <span>Started {formatDate(p.started_at)}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-white">{p.progress_pct}%</span>
                  <div className="h-2 w-20 rounded-full bg-[var(--color-background)]">
                    <div
                      className={clsx(
                        'h-2 rounded-full',
                        p.progress_pct === 100 ? 'bg-[var(--color-success)]' : 'bg-[var(--color-primary)]'
                      )}
                      style={{ width: `${p.progress_pct}%` }}
                    />
                  </div>
                </div>
              </div>
              {p.description && (
                <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">{p.description}</p>
              )}
              {p.modules && p.modules.length > 0 && (
                <div className="mt-4 space-y-1.5">
                  {p.modules.map((mod, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      {mod.completed ? (
                        <CheckCircle size={14} className="text-[var(--color-success)]" />
                      ) : (
                        <Circle size={14} className="text-[var(--color-muted)]" />
                      )}
                      <span className={clsx(mod.completed ? 'text-[var(--color-muted-foreground)] line-through' : 'text-white')}>
                        {mod.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-12 text-center">
            <GraduationCap size={32} className="mx-auto text-[var(--color-muted)]" />
            <p className="mt-2 text-sm text-[var(--color-muted)]">No education programs yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
