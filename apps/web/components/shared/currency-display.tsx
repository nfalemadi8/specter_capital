'use client';

import { formatCurrency } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';

interface CurrencyDisplayProps {
  amount: number;
  currency?: string;
  compact?: boolean;
  className?: string;
  showSign?: boolean;
}

export function CurrencyDisplay({ amount, currency = 'USD', compact = false, className, showSign = false }: CurrencyDisplayProps) {
  const isPositive = amount > 0;
  const isNegative = amount < 0;
  const formatted = formatCurrency(Math.abs(amount), currency, compact);
  const sign = showSign && isPositive ? '+' : '';
  const display = `${sign}${isNegative ? '-' : ''}${formatted}`;

  return (
    <span
      className={cn(
        showSign && isPositive && 'text-[var(--phantom-success)]',
        showSign && isNegative && 'text-[var(--phantom-danger)]',
        className
      )}
    >
      {display}
    </span>
  );
}
