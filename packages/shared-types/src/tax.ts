export interface TaxEstimate {
  id: string;
  tenant_id: string;
  entity_id: string | null;
  tax_year: number;
  quarter: number | null;
  jurisdiction: string;
  estimated_income: number | null;
  estimated_deductions: number | null;
  estimated_tax: number | null;
  amount_paid: number;
  due_date: string | null;
  paid_date: string | null;
  status: 'pending' | 'paid' | 'overdue';
  notes: string | null;
  created_at: string;
}

export interface TaxLossHarvesting {
  id: string;
  tenant_id: string;
  symbol: string;
  holding_id: string | null;
  unrealized_loss: number;
  potential_tax_savings: number | null;
  has_wash_sale_risk: boolean;
  wash_sale_window_end: string | null;
  replacement_symbol: string | null;
  status: 'identified' | 'approved' | 'executed' | 'dismissed';
  executed_date: string | null;
  notes: string | null;
  created_at: string;
}

export interface CharitableDonation {
  id: string;
  tenant_id: string;
  entity_id: string | null;
  recipient: string;
  recipient_ein: string | null;
  donation_type: 'cash' | 'stock' | 'property' | 'daf' | null;
  amount: number;
  fair_market_value: number | null;
  cost_basis: number | null;
  tax_deduction_amount: number | null;
  donation_date: string;
  tax_year: number | null;
  receipt_url: string | null;
  acknowledgment_received: boolean;
  notes: string | null;
  created_at: string;
}

export interface GiftTracking {
  id: string;
  tenant_id: string;
  donor_member_id: string | null;
  recipient_name: string;
  recipient_relationship: string | null;
  amount: number;
  gift_type: 'cash' | 'stock' | 'property' | 'trust_distribution' | null;
  gift_date: string;
  tax_year: number | null;
  annual_exclusion_used: number | null;
  lifetime_exemption_used: number | null;
  requires_form_709: boolean;
  notes: string | null;
  created_at: string;
}

export interface ComplianceDeadline {
  id: string;
  tenant_id: string;
  entity_id: string | null;
  deadline_type: string;
  description: string | null;
  due_date: string;
  jurisdiction: string | null;
  status: 'upcoming' | 'in_progress' | 'completed' | 'overdue' | 'extended';
  extended_to: string | null;
  completed_date: string | null;
  assigned_to: string | null;
  notes: string | null;
  created_at: string;
}
