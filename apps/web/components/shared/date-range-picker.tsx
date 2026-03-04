'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

type Range = '1M' | '3M' | '6M' | '1Y' | '5Y' | 'ALL';

interface DateRangePickerProps {
  value: Range;
  onChange: (range: Range) => void;
}

const ranges: Range[] = ['1M', '3M', '6M', '1Y', '5Y', 'ALL'];

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  return (
    <div className="flex gap-1 rounded border border-white/[0.06] p-0.5">
      {ranges.map((r) => (
        <button
          key={r}
          onClick={() => onChange(r)}
          className={cn(
            'rounded px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider transition-colors',
            r === value
              ? 'bg-white/10 text-white/80'
              : 'text-white/30 hover:text-white/50'
          )}
        >
          {r}
        </button>
      ))}
    </div>
  );
}

export function getDateRangeStart(range: Range): Date {
  const now = new Date();
  switch (range) {
    case '1M': return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    case '3M': return new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
    case '6M': return new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
    case '1Y': return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    case '5Y': return new Date(now.getFullYear() - 5, now.getMonth(), now.getDate());
    case 'ALL': return new Date(2000, 0, 1);
  }
}
