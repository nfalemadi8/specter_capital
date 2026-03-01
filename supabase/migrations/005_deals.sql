-- 005_deals.sql

CREATE TYPE deal_stage AS ENUM (
  'sourcing', 'screening', 'due_diligence', 'term_sheet',
  'legal_review', 'closing', 'closed', 'passed', 'exited'
);

CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id), -- investing entity
  -- Deal info
  name TEXT NOT NULL,
  company_name TEXT,
  sector TEXT,
  sub_sector TEXT,
  geography TEXT,
  stage deal_stage NOT NULL DEFAULT 'sourcing',
  deal_type TEXT, -- 'direct', 'co_invest', 'fund_allocation', 'syndicate', 'secondary'
  -- Financials
  target_amount NUMERIC(18,2),
  committed_amount NUMERIC(18,2),
  invested_amount NUMERIC(18,2) DEFAULT 0,
  current_value NUMERIC(18,2),
  -- Metrics
  entry_valuation NUMERIC(18,2),
  current_valuation NUMERIC(18,2),
  moic NUMERIC(8,4),
  irr NUMERIC(8,4),
  dpi NUMERIC(8,4), -- distributions to paid-in
  tvpi NUMERIC(8,4), -- total value to paid-in
  -- Dates
  sourced_date DATE,
  closed_date DATE,
  expected_exit_date DATE,
  vintage_year INTEGER,
  -- Source
  source TEXT, -- who brought the deal
  lead_investor TEXT,
  -- Scoring
  opportunity_score INTEGER CHECK (opportunity_score BETWEEN 1 AND 10),
  risk_score INTEGER CHECK (risk_score BETWEEN 1 AND 10),
  -- Status
  assigned_to UUID REFERENCES tenant_members(id),
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE deal_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
  document_type TEXT, -- 'pitch_deck', 'term_sheet', 'financials', 'dd_report', 'legal'
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  encrypted BOOLEAN DEFAULT true,
  uploaded_by UUID REFERENCES tenant_members(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE deal_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
  author_id UUID REFERENCES tenant_members(id),
  content TEXT NOT NULL, -- encrypted
  note_type TEXT DEFAULT 'general', -- 'general', 'dd_finding', 'risk', 'decision'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE capital_calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES deals(id),
  -- Fund info (for LP positions)
  fund_name TEXT,
  fund_manager TEXT,
  -- Call details
  call_amount NUMERIC(18,2) NOT NULL,
  total_commitment NUMERIC(18,2),
  cumulative_called NUMERIC(18,2),
  remaining_commitment NUMERIC(18,2),
  -- Dates
  call_date DATE NOT NULL,
  due_date DATE NOT NULL,
  paid_date DATE,
  -- Funding
  funding_account_id UUID REFERENCES accounts(id),
  funding_entity_id UUID REFERENCES entities(id),
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'disputed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE distributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES deals(id),
  fund_name TEXT,
  distribution_type TEXT, -- 'return_of_capital', 'profit', 'dividend', 'interest'
  amount NUMERIC(18,2) NOT NULL,
  distribution_date DATE NOT NULL,
  receiving_account_id UUID REFERENCES accounts(id),
  receiving_entity_id UUID REFERENCES entities(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE dd_checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
  category TEXT NOT NULL, -- 'financial', 'legal', 'operational', 'market', 'technical', 'management'
  item TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'flagged', 'na')),
  assigned_to UUID REFERENCES tenant_members(id),
  notes TEXT,
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_deals_tenant ON deals(tenant_id);
CREATE INDEX idx_deals_stage ON deals(tenant_id, stage);
CREATE INDEX idx_capital_calls_tenant ON capital_calls(tenant_id);
CREATE INDEX idx_capital_calls_due ON capital_calls(tenant_id, due_date) WHERE status = 'pending';
CREATE INDEX idx_distributions_tenant ON distributions(tenant_id);
