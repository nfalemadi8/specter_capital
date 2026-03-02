-- 012_insurance.sql

CREATE TABLE insurance_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id),
  -- Policy
  policy_type TEXT NOT NULL, -- 'property', 'liability', 'umbrella', 'auto', 'life', 'health', 'do', 'knr', 'cyber', 'art', 'jewelry'
  carrier TEXT NOT NULL,
  policy_number TEXT,
  -- Coverage
  coverage_amount NUMERIC(18,2),
  deductible NUMERIC(18,2),
  annual_premium NUMERIC(18,2),
  -- Dates
  effective_date DATE,
  expiration_date DATE,
  renewal_date DATE,
  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled', 'pending_renewal')),
  auto_renew BOOLEAN DEFAULT true,
  -- Linked assets
  property_id UUID REFERENCES properties(id),
  -- Agent
  agent_name TEXT,
  agent_contact TEXT,
  -- Documents
  policy_document_id UUID REFERENCES documents(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_insurance_tenant ON insurance_policies(tenant_id);
CREATE INDEX idx_insurance_expiry ON insurance_policies(expiration_date) WHERE status = 'active';
