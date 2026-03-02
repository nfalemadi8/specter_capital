'use client';

import React from 'react';
import { clsx } from 'clsx';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  sparkline?: React.ReactNode;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  sparkline,
  className,
}: StatCardProps) {
  return (
    <div
      className={clsx(
        'rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6',
        'hover:border-[var(--color-primary)]/20 transition-colors',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-[var(--color-muted-foreground)]">{title}</p>
          <p className="text-2xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-mono)' }}>
            {value}
          </p>
          {change && (
            <p
              className={clsx('text-sm font-medium', {
                'text-[var(--color-success)]': changeType === 'positive',
                'text-[var(--color-danger)]': changeType === 'negative',
                'text-[var(--color-muted-foreground)]': changeType === 'neutral',
              })}
            >
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="rounded-lg bg-[var(--color-primary)]/10 p-2 text-[var(--color-primary)]">
            {icon}
          </div>
        )}
      </div>
      {sparkline && <div className="mt-4">{sparkline}</div>}
    </div>
  );
}
