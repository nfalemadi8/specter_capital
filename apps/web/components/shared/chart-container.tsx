'use client';

import { cn } from '@/lib/utils/cn';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ChartContainer({ title, subtitle, action, children, className }: ChartContainerProps) {
  return (
    <div className={cn('rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5', className)}>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-base font-normal text-white/80">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-0.5 text-xs text-white/30">{subtitle}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
      {children}
    </div>
  );
}
