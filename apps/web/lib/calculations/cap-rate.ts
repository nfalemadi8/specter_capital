/**
 * Capitalization Rate = NOI / Property Value
 */
export function calculateCapRate(noi: number, propertyValue: number): number {
  if (propertyValue === 0) return 0;
  return (noi / propertyValue) * 100;
}

/**
 * Cash-on-Cash Return = Annual Pre-Tax Cash Flow / Total Cash Invested
 */
export function calculateCashOnCash(annualCashFlow: number, totalCashInvested: number): number {
  if (totalCashInvested === 0) return 0;
  return (annualCashFlow / totalCashInvested) * 100;
}

/**
 * Net Operating Income = Gross Rental Income - Operating Expenses
 */
export function calculateNOI(grossIncome: number, operatingExpenses: number): number {
  return grossIncome - operatingExpenses;
}

/**
 * Gross Rent Multiplier = Property Price / Annual Gross Rental Income
 */
export function calculateGRM(propertyPrice: number, annualGrossRent: number): number {
  if (annualGrossRent === 0) return 0;
  return propertyPrice / annualGrossRent;
}
