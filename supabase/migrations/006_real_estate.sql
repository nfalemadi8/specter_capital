-- 006_real_estate.sql

CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id),
  -- Property info
  name TEXT NOT NULL,
  property_type TEXT NOT NULL, -- 'residential', 'commercial', 'industrial', 'land', 'mixed_use'
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'US',
  zip TEXT,
  latitude NUMERIC(10,8),
  longitude NUMERIC(11,8),
  -- Financials
  purchase_price NUMERIC(18,2),
  purchase_date DATE,
  current_value NUMERIC(18,2),
  last_appraisal_date DATE,
  -- Mortgage
  has_mortgage BOOLEAN DEFAULT false,
  mortgage_balance NUMERIC(18,2),
  mortgage_rate NUMERIC(5,4),
  mortgage_monthly_payment NUMERIC(18,2),
  mortgage_maturity_date DATE,
  lender TEXT,
  -- Rental
  is_rental BOOLEAN DEFAULT false,
  monthly_rent NUMERIC(18,2),
  vacancy_rate NUMERIC(5,2),
  -- Expenses
  annual_taxes NUMERIC(18,2),
  annual_insurance NUMERIC(18,2),
  annual_maintenance NUMERIC(18,2),
  annual_hoa NUMERIC(18,2),
  -- Metrics
  cap_rate NUMERIC(5,4),
  cash_on_cash_return NUMERIC(5,4),
  noi NUMERIC(18,2), -- net operating income
  -- Depreciation
  depreciable_basis NUMERIC(18,2),
  depreciation_method TEXT DEFAULT 'straight_line',
  useful_life_years INTEGER DEFAULT 27, -- residential: 27.5, commercial: 39
  accumulated_depreciation NUMERIC(18,2) DEFAULT 0,
  -- 1031 Exchange
  is_1031_candidate BOOLEAN DEFAULT false,
  exchange_deadline DATE,
  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'under_contract', 'sold', 'development')),
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tenants_property ( -- property tenants (renters), not platform tenants
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  tenant_name TEXT NOT NULL,
  unit TEXT,
  lease_start DATE,
  lease_end DATE,
  monthly_rent NUMERIC(18,2),
  security_deposit NUMERIC(18,2),
  payment_status TEXT DEFAULT 'current', -- 'current', 'late', 'delinquent'
  contact_email TEXT,
  contact_phone TEXT,
  notes TEXT
);

CREATE TABLE maintenance_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'emergency')),
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
  estimated_cost NUMERIC(18,2),
  actual_cost NUMERIC(18,2),
  vendor TEXT,
  requested_by TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE renovation_budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  project_name TEXT NOT NULL,
  total_budget NUMERIC(18,2),
  spent NUMERIC(18,2) DEFAULT 0,
  start_date DATE,
  target_completion DATE,
  status TEXT DEFAULT 'planning',
  line_items JSONB DEFAULT '[]', -- [{category, description, budgeted, actual}]
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_properties_tenant ON properties(tenant_id);
CREATE INDEX idx_properties_entity ON properties(entity_id);
CREATE INDEX idx_maintenance_property ON maintenance_requests(property_id);
