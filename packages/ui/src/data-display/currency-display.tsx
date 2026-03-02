'use client';

import React from 'react';
import { clsx } from 'clsx';

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  SAR: '﷼',
  AED: 'د.إ',
  CHF: 'CHF',
  JPY: '¥',
  CNY: '¥',
};

interface CurrencyDisplayProps {
  amount: number;
  currency?: string;
  showSign?: boolean;
  compact?: boolean;
  className?: string;
}

export function CurrencyDisplay({
  amount,
  currency = 'USD',
  showSign = false,
  compact = false,
  className,
}: CurrencyDisplayProps) {
  const isNegative = amount < 0;
  const abs = Math.abs(amount);

  let formatted: string;
  if (compact) {
    if (abs >= 1_000_000_000) {
      formatted = `${(abs / 1_000_000_000).toFixed(1)}B`;
    } else if (abs >= 1_000_000) {
      formatted = `${(abs / 1_000_000).toFixed(1)}M`;
    } else if (abs >= 1_000) {
      formatted = `${(abs / 1_000).toFixed(1)}K`;
    } else {
      formatted = abs.toFixed(2);
    }
  } else {
    formatted = abs.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
  const sign = isNegative ? '-' : showSign ? '+' : '';

  return (
    <span
      className={clsx(
        'tabular-nums',
        {
          'text-[var(--color-success)]': showSign && !isNegative && amount !== 0,
          'text-[var(--color-danger)]': isNegative,
        },
        className
      )}
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      {sign}
      {symbol}
      {formatted}
    </span>
  );
}
