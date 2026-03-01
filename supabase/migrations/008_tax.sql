-- 008_tax.sql

CREATE TABLE tax_estimates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id),
  tax_year INTEGER NOT NULL,
  quarter INTEGER CHECK (quarter BETWEEN 1 AND 4),
  jurisdiction TEXT NOT NULL, -- 'federal', state code, country code
  -- Estimates
  estimated_income NUMERIC(18,2),
  estimated_deductions NUMERIC(18,2),
  estimated_tax NUMERIC(18,2),
  amount_paid NUMERIC(18,2) DEFAULT 0,
  due_date DATE,
  paid_date DATE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tax_loss_harvesting (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  -- Opportunity
  symbol TEXT NOT NULL,
  holding_id UUID REFERENCES holdings(id),
  unrealized_loss NUMERIC(18,2) NOT NULL,
  potential_tax_savings NUMERIC(18,2),
  -- Wash sale check
  has_wash_sale_risk BOOLEAN DEFAULT false,
  wash_sale_window_end DATE,
  replacement_symbol TEXT, -- suggested replacement to maintain exposure
  -- Status
  status TEXT DEFAULT 'identified' CHECK (status IN ('identified', 'approved', 'executed', 'dismissed')),
  executed_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE charitable_donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id),
  -- Donation
  recipient TEXT NOT NULL,
  recipient_ein TEXT,
  donation_type TEXT, -- 'cash', 'stock', 'property', 'daf'
  amount NUMERIC(18,2) NOT NULL,
  fair_market_value NUMERIC(18,2),
  cost_basis NUMERIC(18,2), -- for donated stock/property
  tax_deduction_amount NUMERIC(18,2),
  -- Dates
  donation_date DATE NOT NULL,
  tax_year INTEGER,
  -- Documentation
  receipt_url TEXT,
  acknowledgment_received BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE gift_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  -- Gift details
  donor_member_id UUID REFERENCES tenant_members(id),
  recipient_name TEXT NOT NULL,
  recipient_relationship TEXT,
  amount NUMERIC(18,2) NOT NULL,
  gift_type TEXT, -- 'cash', 'stock', 'property', 'trust_distribution'
  gift_date DATE NOT NULL,
  tax_year INTEGER,
  -- Annual exclusion tracking
  annual_exclusion_used NUMERIC(18,2),
  lifetime_exemption_used NUMERIC(18,2),
  requires_form_709 BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE compliance_deadlines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id),
  -- Deadline
  deadline_type TEXT NOT NULL, -- 'tax_filing', 'annual_report', 'fbar', 'fatca', 'k1_distribution', 'audit', 'boi_report'
  description TEXT,
  due_date DATE NOT NULL,
  jurisdiction TEXT,
  -- Status
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'in_progress', 'completed', 'overdue', 'extended')),
  extended_to DATE,
  completed_date DATE,
  assigned_to UUID REFERENCES tenant_members(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tax_estimates_tenant ON tax_estimates(tenant_id);
CREATE INDEX idx_tax_estimates_year ON tax_estimates(tenant_id, tax_year);
CREATE INDEX idx_tlh_tenant ON tax_loss_harvesting(tenant_id);
CREATE INDEX idx_charitable_tenant ON charitable_donations(tenant_id);
CREATE INDEX idx_gift_tenant ON gift_tracking(tenant_id);
CREATE INDEX idx_compliance_tenant ON compliance_deadlines(tenant_id);
CREATE INDEX idx_compliance_due ON compliance_deadlines(tenant_id, due_date) WHERE status IN ('upcoming', 'in_progress');
