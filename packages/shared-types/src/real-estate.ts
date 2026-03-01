export type PropertyType = 'residential' | 'commercial' | 'industrial' | 'land' | 'mixed_use';

export type PropertyStatus = 'active' | 'under_contract' | 'sold' | 'development';

export interface Property {
  id: string;
  tenant_id: string;
  entity_id: string | null;
  name: string;
  property_type: PropertyType;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string;
  zip: string | null;
  latitude: number | null;
  longitude: number | null;
  purchase_price: number | null;
  purchase_date: string | null;
  current_value: number | null;
  last_appraisal_date: string | null;
  has_mortgage: boolean;
  mortgage_balance: number | null;
  mortgage_rate: number | null;
  mortgage_monthly_payment: number | null;
  mortgage_maturity_date: string | null;
  lender: string | null;
  is_rental: boolean;
  monthly_rent: number | null;
  vacancy_rate: number | null;
  annual_taxes: number | null;
  annual_insurance: number | null;
  annual_maintenance: number | null;
  annual_hoa: number | null;
  cap_rate: number | null;
  cash_on_cash_return: number | null;
  noi: number | null;
  depreciable_basis: number | null;
  depreciation_method: string;
  useful_life_years: number;
  accumulated_depreciation: number;
  is_1031_candidate: boolean;
  exchange_deadline: string | null;
  status: PropertyStatus;
  notes: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface PropertyTenant {
  id: string;
  property_id: string;
  tenant_name: string;
  unit: string | null;
  lease_start: string | null;
  lease_end: string | null;
  monthly_rent: number | null;
  security_deposit: number | null;
  payment_status: 'current' | 'late' | 'delinquent';
  contact_email: string | null;
  contact_phone: string | null;
  notes: string | null;
}

export interface MaintenanceRequest {
  id: string;
  property_id: string;
  title: string;
  description: string | null;
  priority: 'low' | 'normal' | 'high' | 'emergency';
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  estimated_cost: number | null;
  actual_cost: number | null;
  vendor: string | null;
  requested_by: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface RenovationBudget {
  id: string;
  property_id: string;
  project_name: string;
  total_budget: number | null;
  spent: number;
  start_date: string | null;
  target_completion: string | null;
  status: string;
  line_items: Array<{
    category: string;
    description: string;
    budgeted: number;
    actual: number;
  }>;
  created_at: string;
}
