export type EntityType =
  | 'holding_company'
  | 'trust'
  | 'llc'
  | 'lp'
  | 'gp'
  | 'corporation'
  | 'foundation'
  | 'daf'
  | 'ira'
  | 'joint_account'
  | 'individual'
  | 'foreign_entity';

export interface Entity {
  id: string;
  tenant_id: string;
  parent_id: string | null;
  name: string;
  entity_type: EntityType;
  ein: string | null;
  state_of_formation: string | null;
  country_of_formation: string;
  date_formed: string | null;
  registered_agent: string | null;
  total_value: number;
  currency: string;
  ownership_percentage: number | null;
  annual_report_due: string | null;
  tax_filing_due: string | null;
  is_active: boolean;
  dissolved_date: string | null;
  notes: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface EntityBeneficiary {
  id: string;
  entity_id: string;
  member_id: string | null;
  beneficiary_name: string;
  beneficiary_type: 'primary' | 'contingent' | 'remainder';
  percentage: number | null;
  distribution_schedule: string | null;
  notes: string | null;
}

export interface EntitySignatory {
  id: string;
  entity_id: string;
  member_id: string | null;
  authority_level: 'full' | 'limited' | 'co_sign';
  max_amount: number | null;
  requires_co_signer: boolean;
  co_signer_id: string | null;
}

export interface InterEntityLoan {
  id: string;
  tenant_id: string;
  lender_entity_id: string;
  borrower_entity_id: string;
  principal_amount: number;
  interest_rate: number | null;
  outstanding_balance: number | null;
  term_months: number | null;
  start_date: string | null;
  maturity_date: string | null;
  payment_schedule: string | null;
  status: 'active' | 'paid_off' | 'defaulted';
}
