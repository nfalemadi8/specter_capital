export type DealStage =
  | 'sourcing'
  | 'screening'
  | 'due_diligence'
  | 'term_sheet'
  | 'legal_review'
  | 'closing'
  | 'closed'
  | 'passed'
  | 'exited';

export type DealType = 'direct' | 'co_invest' | 'fund_allocation' | 'syndicate' | 'secondary';

export interface Deal {
  id: string;
  tenant_id: string;
  entity_id: string | null;
  name: string;
  company_name: string | null;
  sector: string | null;
  sub_sector: string | null;
  geography: string | null;
  stage: DealStage;
  deal_type: DealType | null;
  target_amount: number | null;
  committed_amount: number | null;
  invested_amount: number;
  current_value: number | null;
  entry_valuation: number | null;
  current_valuation: number | null;
  moic: number | null;
  irr: number | null;
  dpi: number | null;
  tvpi: number | null;
  sourced_date: string | null;
  closed_date: string | null;
  expected_exit_date: string | null;
  vintage_year: number | null;
  source: string | null;
  lead_investor: string | null;
  opportunity_score: number | null;
  risk_score: number | null;
  assigned_to: string | null;
  notes: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface DealDocument {
  id: string;
  deal_id: string;
  document_type: string | null;
  file_name: string;
  file_url: string;
  encrypted: boolean;
  uploaded_by: string | null;
  created_at: string;
}

export interface DealNote {
  id: string;
  deal_id: string;
  author_id: string | null;
  content: string;
  note_type: 'general' | 'dd_finding' | 'risk' | 'decision';
  created_at: string;
}

export interface CapitalCall {
  id: string;
  tenant_id: string;
  deal_id: string | null;
  fund_name: string | null;
  fund_manager: string | null;
  call_amount: number;
  total_commitment: number | null;
  cumulative_called: number | null;
  remaining_commitment: number | null;
  call_date: string;
  due_date: string;
  paid_date: string | null;
  funding_account_id: string | null;
  funding_entity_id: string | null;
  status: 'pending' | 'paid' | 'overdue' | 'disputed';
  notes: string | null;
  created_at: string;
}

export interface Distribution {
  id: string;
  tenant_id: string;
  deal_id: string | null;
  fund_name: string | null;
  distribution_type: 'return_of_capital' | 'profit' | 'dividend' | 'interest' | null;
  amount: number;
  distribution_date: string;
  receiving_account_id: string | null;
  receiving_entity_id: string | null;
  notes: string | null;
  created_at: string;
}

export interface DDChecklist {
  id: string;
  deal_id: string;
  category: 'financial' | 'legal' | 'operational' | 'market' | 'technical' | 'management';
  item: string;
  status: 'pending' | 'in_progress' | 'completed' | 'flagged' | 'na';
  assigned_to: string | null;
  notes: string | null;
  completed_at: string | null;
}
