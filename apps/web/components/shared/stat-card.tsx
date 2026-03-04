'use client';

import { cn } from '@/lib/utils/cn';

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  loading?: boolean;
}

export function StatCard({ label, value, change, changeType = 'neutral', icon, loading }: StatCardProps) {
  if (loading) {
    return (
      <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <div className="mb-3 h-3 w-20 animate-pulse rounded bg-white/5" />
        <div className="mb-2 h-7 w-32 animate-pulse rounded bg-white/5" />
        <div className="h-3 w-16 animate-pulse rounded bg-white/5" />
      </div>
    );
  }

  return (
    <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-[3px] text-white/30">
          {label}
        </span>
        {icon && <span className="text-white/20">{icon}</span>}
      </div>
      <div className="mb-1 font-['DM_Sans'] text-[28px] font-light text-white/90">
        {value}
      </div>
      {change && (
        <span
          className={cn(
            'text-xs font-medium',
            changeType === 'positive' && 'text-[var(--phantom-success)]',
            changeType === 'negative' && 'text-[var(--phantom-danger)]',
            changeType === 'neutral' && 'text-white/40'
          )}
        >
          {change}
        </span>
      )}
    </div>
  );
}
