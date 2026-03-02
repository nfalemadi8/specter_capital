'use client';

import React from 'react';
import { clsx } from 'clsx';

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
  variant?: 'text' | 'card' | 'chart';
}

export function LoadingSkeleton({ className, lines = 3, variant = 'text' }: LoadingSkeletonProps) {
  if (variant === 'card') {
    return (
      <div
        className={clsx(
          'animate-pulse rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6',
          className
        )}
      >
        <div className="h-4 w-1/3 rounded bg-[var(--color-muted)]/30" />
        <div className="mt-3 h-8 w-2/3 rounded bg-[var(--color-muted)]/30" />
        <div className="mt-2 h-3 w-1/4 rounded bg-[var(--color-muted)]/30" />
      </div>
    );
  }

  if (variant === 'chart') {
    return (
      <div
        className={clsx(
          'animate-pulse rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6',
          className
        )}
      >
        <div className="h-4 w-1/4 rounded bg-[var(--color-muted)]/30" />
        <div className="mt-4 h-48 w-full rounded bg-[var(--color-muted)]/20" />
      </div>
    );
  }

  return (
    <div className={clsx('animate-pulse space-y-3', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 rounded bg-[var(--color-muted)]/30"
          style={{ width: `${Math.max(40, 100 - i * 15)}%` }}
        />
      ))}
    </div>
  );
}
