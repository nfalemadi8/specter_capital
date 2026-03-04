import { cn } from '@/lib/utils/cn';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('animate-pulse rounded bg-white/5', className)} />
  );
}

export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="flex gap-4 border-b border-[var(--color-border)] p-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-3 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 border-b border-[var(--color-border)] p-4 last:border-0">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      <Skeleton className="mb-3 h-3 w-20" />
      <Skeleton className="mb-2 h-7 w-32" />
      <Skeleton className="h-3 w-16" />
    </div>
  );
}

export function ChartSkeleton({ height = 300 }: { height?: number }) {
  return (
    <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      <Skeleton className="mb-4 h-4 w-32" />
      <Skeleton className="w-full" style={{ height }} />
    </div>
  );
}
