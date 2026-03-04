export interface TLHCandidate {
  symbol: string;
  name: string;
  quantity: number;
  currentPrice: number;
  costBasis: number;
  unrealizedLoss: number;
  estimatedSavings: number;
  holdingPeriod: 'short' | 'long';
  washSaleRisk: boolean;
  replacement?: string;
}

/**
 * Scan holdings for tax-loss harvesting opportunities.
 * taxRate: combined federal + state rate
 */
export function scanTLHOpportunities(
  holdings: {
    symbol: string;
    name: string;
    quantity: number;
    current_price: number;
    cost_basis: number;
    purchase_date: string;
    recent_sales?: { symbol: string; sale_date: string }[];
  }[],
  taxRate: number = 0.37
): TLHCandidate[] {
  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const thirtyDaysFromNow = new Date(now);
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

  return holdings
    .filter((h) => {
      const unrealizedPL = (h.current_price - h.cost_basis) * h.quantity;
      return unrealizedPL < 0;
    })
    .map((h) => {
      const unrealizedLoss = Math.abs((h.current_price - h.cost_basis) * h.quantity);
      const purchaseDate = new Date(h.purchase_date);
      const daysHeld = Math.floor((now.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24));
      const holdingPeriod = daysHeld > 365 ? 'long' as const : 'short' as const;

      const washSaleRisk = h.recent_sales?.some((s) => {
        if (s.symbol !== h.symbol) return false;
        const saleDate = new Date(s.sale_date);
        return saleDate >= thirtyDaysAgo && saleDate <= thirtyDaysFromNow;
      }) ?? false;

      const effectiveRate = holdingPeriod === 'long' ? taxRate * 0.6 : taxRate;

      return {
        symbol: h.symbol,
        name: h.name,
        quantity: h.quantity,
        currentPrice: h.current_price,
        costBasis: h.cost_basis,
        unrealizedLoss,
        estimatedSavings: unrealizedLoss * effectiveRate,
        holdingPeriod,
        washSaleRisk,
      };
    })
    .sort((a, b) => b.estimatedSavings - a.estimatedSavings);
}
