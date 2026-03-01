-- 003_entities.sql

CREATE TYPE entity_type AS ENUM (
  'holding_company', 'trust', 'llc', 'lp', 'gp',
  'corporation', 'foundation', 'daf', 'ira',
  'joint_account', 'individual', 'foreign_entity'
);

CREATE TABLE entities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES entities(id),
  name TEXT NOT NULL,
  entity_type entity_type NOT NULL,
  -- Legal details
  ein TEXT, -- encrypted
  state_of_formation TEXT,
  country_of_formation TEXT DEFAULT 'US',
  date_formed DATE,
  registered_agent TEXT,
  -- Financial
  total_value NUMERIC(18,2) DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  -- Ownership
  ownership_percentage NUMERIC(5,2), -- of parent entity
  -- Filing
  annual_report_due DATE,
  tax_filing_due DATE,
  -- Status
  is_active BOOLEAN DEFAULT true,
  dissolved_date DATE,
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE entity_beneficiaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id UUID REFERENCES entities(id) ON DELETE CASCADE,
  member_id UUID REFERENCES tenant_members(id),
  beneficiary_name TEXT NOT NULL,
  beneficiary_type TEXT CHECK (beneficiary_type IN ('primary', 'contingent', 'remainder')),
  percentage NUMERIC(5,2),
  distribution_schedule TEXT, -- 'quarterly', 'annually', 'discretionary'
  notes TEXT
);

CREATE TABLE entity_signatories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id UUID REFERENCES entities(id) ON DELETE CASCADE,
  member_id UUID REFERENCES tenant_members(id),
  authority_level TEXT CHECK (authority_level IN ('full', 'limited', 'co_sign')),
  max_amount NUMERIC(18,2), -- max transaction amount
  requires_co_signer BOOLEAN DEFAULT false,
  co_signer_id UUID REFERENCES tenant_members(id)
);

CREATE TABLE inter_entity_loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  lender_entity_id UUID REFERENCES entities(id),
  borrower_entity_id UUID REFERENCES entities(id),
  principal_amount NUMERIC(18,2) NOT NULL,
  interest_rate NUMERIC(5,4),
  outstanding_balance NUMERIC(18,2),
  term_months INTEGER,
  start_date DATE,
  maturity_date DATE,
  payment_schedule TEXT, -- 'monthly', 'quarterly', 'bullet'
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paid_off', 'defaulted'))
);

CREATE INDEX idx_entities_tenant ON entities(tenant_id);
CREATE INDEX idx_entities_parent ON entities(parent_id);
CREATE INDEX idx_entities_type ON entities(tenant_id, entity_type);
CREATE INDEX idx_inter_entity_loans_tenant ON inter_entity_loans(tenant_id);
