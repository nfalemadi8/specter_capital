export interface AllocationTarget {
  assetClass: string;
  targetPercent: number;
  currentValue: number;
}

export interface RebalanceSuggestion {
  assetClass: string;
  targetPercent: number;
  currentPercent: number;
  drift: number;
  currentValue: number;
  targetValue: number;
  tradeAmount: number;
  action: 'buy' | 'sell' | 'hold';
}

/**
 * Calculate rebalancing suggestions given current holdings and target allocations.
 */
export function calculateRebalance(targets: AllocationTarget[]): RebalanceSuggestion[] {
  const totalValue = targets.reduce((sum, t) => sum + t.currentValue, 0);
  if (totalValue === 0) return [];

  return targets.map((t) => {
    const currentPercent = (t.currentValue / totalValue) * 100;
    const targetValue = (t.targetPercent / 100) * totalValue;
    const drift = currentPercent - t.targetPercent;
    const tradeAmount = targetValue - t.currentValue;

    return {
      assetClass: t.assetClass,
      targetPercent: t.targetPercent,
      currentPercent,
      drift,
      currentValue: t.currentValue,
      targetValue,
      tradeAmount,
      action: Math.abs(tradeAmount) < totalValue * 0.005 ? 'hold' : tradeAmount > 0 ? 'buy' : 'sell',
    };
  });
}
