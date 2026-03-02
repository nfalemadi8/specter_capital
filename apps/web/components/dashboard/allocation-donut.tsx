'use client';

import { DonutChart } from '@specter/ui';
import { formatCurrency } from '@/lib/utils/format';

const COLORS = [
  '#22d3ee', '#a78bfa', '#34d399', '#f59e0b', '#f87171',
  '#818cf8', '#fb923c', '#38bdf8', '#4ade80', '#e879f9',
];

interface AllocationDonutProps {
  allocation: Record<string, number>;
}

export function AllocationDonut({ allocation }: AllocationDonutProps) {
  const total = Object.values(allocation).reduce((sum, v) => sum + v, 0);

  const data = Object.entries(allocation)
    .sort(([, a], [, b]) => b - a)
    .map(([name, value], idx) => ({
      name,
      value,
      color: COLORS[idx % COLORS.length],
    }));

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
      <h3 className="mb-4 text-sm font-medium text-[var(--color-muted-foreground)]">
        Asset Allocation
      </h3>
      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <DonutChart
          data={data}
          centerLabel="Total"
          centerValue={formatCurrency(total, 'USD', true)}
        />
        <div className="flex-1 space-y-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[var(--color-muted-foreground)]">{item.name}</span>
              </div>
              <span className="font-mono text-white">
                {total > 0 ? ((item.value / total) * 100).toFixed(1) : 0}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
