/**
 * Multiple on Invested Capital
 * totalValue: current value + distributions received
 * totalInvested: total capital invested
 */
export function calculateMOIC(totalValue: number, totalInvested: number): number {
  if (totalInvested === 0) return 0;
  return totalValue / totalInvested;
}

/**
 * Distributions to Paid-In (DPI)
 * distributions: total cash distributions received
 * invested: total capital invested
 */
export function calculateDPI(distributions: number, invested: number): number {
  if (invested === 0) return 0;
  return distributions / invested;
}

/**
 * Residual Value to Paid-In (RVPI)
 * currentValue: current portfolio value
 * invested: total capital invested
 */
export function calculateRVPI(currentValue: number, invested: number): number {
  if (invested === 0) return 0;
  return currentValue / invested;
}

/**
 * Total Value to Paid-In (TVPI = DPI + RVPI)
 */
export function calculateTVPI(distributions: number, currentValue: number, invested: number): number {
  if (invested === 0) return 0;
  return (distributions + currentValue) / invested;
}
