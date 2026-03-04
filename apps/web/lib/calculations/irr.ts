/**
 * Calculate Internal Rate of Return using Newton's method.
 * cashFlows: array of { date: Date, amount: number } where negative = outflow, positive = inflow
 */
export function calculateXIRR(
  cashFlows: { date: Date; amount: number }[],
  guess: number = 0.1
): number | null {
  if (cashFlows.length < 2) return null;

  const sortedFlows = [...cashFlows].sort((a, b) => a.date.getTime() - b.date.getTime());
  const d0 = sortedFlows[0].date.getTime();

  const yearFrac = (d: Date) => (d.getTime() - d0) / (365.25 * 24 * 60 * 60 * 1000);

  let rate = guess;
  for (let i = 0; i < 100; i++) {
    let npv = 0;
    let dnpv = 0;

    for (const cf of sortedFlows) {
      const t = yearFrac(cf.date);
      const factor = Math.pow(1 + rate, t);
      npv += cf.amount / factor;
      dnpv -= (t * cf.amount) / (factor * (1 + rate));
    }

    if (Math.abs(dnpv) < 1e-10) return null;
    const newRate = rate - npv / dnpv;

    if (Math.abs(newRate - rate) < 1e-8) return newRate;
    rate = newRate;

    if (rate < -0.99 || rate > 10) return null;
  }

  return null;
}

/**
 * Simple IRR calculation from a series of periodic cash flows.
 */
export function calculateIRR(cashFlows: number[], guess: number = 0.1): number | null {
  if (cashFlows.length < 2) return null;

  let rate = guess;
  for (let i = 0; i < 100; i++) {
    let npv = 0;
    let dnpv = 0;

    for (let t = 0; t < cashFlows.length; t++) {
      const factor = Math.pow(1 + rate, t);
      npv += cashFlows[t] / factor;
      dnpv -= (t * cashFlows[t]) / (factor * (1 + rate));
    }

    if (Math.abs(dnpv) < 1e-10) return null;
    const newRate = rate - npv / dnpv;

    if (Math.abs(newRate - rate) < 1e-8) return newRate;
    rate = newRate;
  }

  return null;
}
