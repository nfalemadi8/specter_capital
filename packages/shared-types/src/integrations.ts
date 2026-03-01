export type UserRole =
  | 'principal'
  | 'co_principal'
  | 'cfo'
  | 'accountant'
  | 'advisor'
  | 'family_member'
  | 'family_junior'
  | 'auditor'
  | 'property_manager';

export type PlanTier = 'starter' | 'professional' | 'enterprise';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  deployment_type: 'multi' | 'single';
  logo_url: string | null;
  primary_color: string;
  accent_color: string;
  font_family: string;
  custom_domain: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  plan: PlanTier;
  plan_seats: number;
  default_currency: string;
  supported_currencies: string[];
  timezone: string;
  fiscal_year_start: number;
  created_at: string;
  updated_at: string;
}

export interface TenantMember {
  id: string;
  tenant_id: string;
  user_id: string;
  role: UserRole;
  permissions_override: Record<string, unknown>;
  display_name: string;
  avatar_url: string | null;
  title: string | null;
  public_key: string | null;
  encrypted_private_key: string | null;
  invited_at: string | null;
  accepted_at: string | null;
  last_active_at: string | null;
  is_active: boolean;
  created_at: string;
}

export interface RolePermissions {
  role: UserRole;
  permissions: Record<string, Record<string, boolean>>;
}

export interface IntegrationConnection {
  id: string;
  tenant_id: string;
  provider: string;
  status: 'active' | 'error' | 'disconnected' | 'pending';
  credentials_encrypted: Record<string, unknown> | null;
  last_sync_at: string | null;
  next_sync_at: string | null;
  sync_frequency: string;
  sync_error: string | null;
  config: Record<string, unknown>;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  monthly_price: number | null;
  annual_price: number | null;
  max_seats: number | null;
  max_entities: number | null;
  max_accounts: number | null;
  features: Record<string, boolean>;
  stripe_monthly_price_id: string | null;
  stripe_annual_price_id: string | null;
}

export interface AuditLogEntry {
  id: string;
  tenant_id: string;
  member_id: string | null;
  action: string;
  resource_type: string;
  resource_id: string | null;
  details: Record<string, unknown> | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface Notification {
  id: string;
  tenant_id: string;
  member_id: string | null;
  title: string;
  body: string | null;
  notification_type: string | null;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  action_url: string | null;
  resource_type: string | null;
  resource_id: string | null;
  is_read: boolean;
  read_at: string | null;
  is_dismissed: boolean;
  created_at: string;
}

export interface CashFlowEntry {
  id: string;
  tenant_id: string;
  entity_id: string | null;
  account_id: string | null;
  entry_type: 'inflow' | 'outflow';
  category: string;
  sub_category: string | null;
  amount: number;
  currency: string;
  is_recurring: boolean;
  recurrence_pattern: string | null;
  next_occurrence: string | null;
  status: 'actual' | 'projected' | 'pending_approval';
  description: string | null;
  vendor_payee: string | null;
  tags: string[];
  date: string;
  created_at: string;
}

export interface BillPayment {
  id: string;
  tenant_id: string;
  entity_id: string | null;
  payee: string;
  amount: number;
  currency: string;
  category: string | null;
  invoice_date: string | null;
  due_date: string;
  paid_date: string | null;
  status: 'pending' | 'approved' | 'paid' | 'rejected' | 'overdue';
  submitted_by: string | null;
  approved_by: string | null;
  approved_at: string | null;
  payment_method: string | null;
  payment_account_id: string | null;
  reference_number: string | null;
  invoice_url: string | null;
  receipt_url: string | null;
  notes: string | null;
  created_at: string;
}

export interface InsurancePolicy {
  id: string;
  tenant_id: string;
  entity_id: string | null;
  policy_type: string;
  carrier: string;
  policy_number: string | null;
  coverage_amount: number | null;
  deductible: number | null;
  annual_premium: number | null;
  effective_date: string | null;
  expiration_date: string | null;
  renewal_date: string | null;
  status: 'active' | 'expired' | 'cancelled' | 'pending_renewal';
  auto_renew: boolean;
  property_id: string | null;
  agent_name: string | null;
  agent_contact: string | null;
  policy_document_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdvisorContact {
  id: string;
  tenant_id: string;
  name: string;
  company: string | null;
  role: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  retainer_amount: number | null;
  retainer_frequency: string | null;
  last_engagement_date: string | null;
  specialty: string[];
  rating: number | null;
  notes: string | null;
  tags: string[];
  is_active: boolean;
  created_at: string;
}

export interface Document {
  id: string;
  tenant_id: string;
  folder_id: string | null;
  name: string;
  file_type: string | null;
  file_size: number | null;
  storage_path: string;
  is_encrypted: boolean;
  encryption_key_id: string | null;
  version: number;
  previous_version_id: string | null;
  content_text: string | null;
  document_category: string | null;
  entity_id: string | null;
  deal_id: string | null;
  property_id: string | null;
  tags: string[];
  expiry_date: string | null;
  uploaded_by: string | null;
  last_viewed_by: string | null;
  last_viewed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TenantBranding {
  tenant_id: string;
  logo_light_url: string | null;
  logo_dark_url: string | null;
  favicon_url: string | null;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  danger_color: string;
  background_color: string;
  surface_color: string;
  font_heading: string;
  font_body: string;
  font_mono: string;
  custom_css: string | null;
  updated_at: string;
}
