export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

/**
 * Generate full mortgage amortization schedule
 */
export function calculateAmortization(
  loanAmount: number,
  annualRate: number,
  termMonths: number,
  extraPayment: number = 0
): AmortizationRow[] {
  const monthlyRate = annualRate / 100 / 12;
  const payment =
    monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
        (Math.pow(1 + monthlyRate, termMonths) - 1)
      : loanAmount / termMonths;

  const schedule: AmortizationRow[] = [];
  let balance = loanAmount;

  for (let month = 1; month <= termMonths && balance > 0; month++) {
    const interest = balance * monthlyRate;
    let principal = payment - interest + extraPayment;
    if (principal > balance) principal = balance;

    balance -= principal;
    if (balance < 0.01) balance = 0;

    schedule.push({
      month,
      payment: principal + interest,
      principal,
      interest,
      balance,
    });
  }

  return schedule;
}

/**
 * Calculate monthly payment amount
 */
export function calculateMonthlyPayment(
  loanAmount: number,
  annualRate: number,
  termMonths: number
): number {
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return loanAmount / termMonths;
  return (
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1)
  );
}
