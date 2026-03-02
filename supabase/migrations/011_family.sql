-- 011_family.sql

CREATE TABLE family_meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  meeting_date TIMESTAMPTZ NOT NULL,
  location TEXT,
  meeting_type TEXT, -- 'quarterly_review', 'annual', 'special', 'education'
  -- Agenda
  agenda_items JSONB DEFAULT '[]', -- [{title, presenter, duration_minutes, notes}]
  -- Minutes
  minutes TEXT, -- encrypted
  minutes_approved BOOLEAN DEFAULT false,
  approved_by UUID REFERENCES tenant_members(id),
  -- Attendees
  attendees UUID[],
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE family_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  meeting_id UUID REFERENCES family_meetings(id),
  title TEXT NOT NULL,
  description TEXT,
  vote_type TEXT DEFAULT 'majority' CHECK (vote_type IN ('majority', 'supermajority', 'unanimous')),
  -- Options
  options JSONB NOT NULL DEFAULT '["Approve", "Reject", "Abstain"]',
  -- Status
  voting_opens_at TIMESTAMPTZ,
  voting_closes_at TIMESTAMPTZ,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'open', 'closed')),
  result TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE family_vote_ballots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vote_id UUID REFERENCES family_votes(id) ON DELETE CASCADE,
  member_id UUID REFERENCES tenant_members(id),
  choice TEXT NOT NULL,
  voted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(vote_id, member_id)
);

CREATE TABLE philanthropy_grants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id), -- foundation or DAF
  -- Grant details
  recipient_name TEXT NOT NULL,
  recipient_ein TEXT,
  amount NUMERIC(18,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  purpose TEXT,
  grant_type TEXT, -- 'general_operating', 'project', 'scholarship', 'endowment'
  -- Dates
  grant_date DATE,
  reporting_due_date DATE,
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'disbursed', 'completed', 'rejected')),
  approved_by UUID REFERENCES tenant_members(id),
  -- Compliance
  expenditure_responsibility BOOLEAN DEFAULT false,
  report_received BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE succession_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  -- Plan
  title TEXT NOT NULL,
  description TEXT,
  effective_trigger TEXT, -- 'incapacity', 'death', 'retirement', 'age_milestone'
  -- Assignments
  assignments JSONB NOT NULL DEFAULT '[]',
  -- Status
  last_reviewed_date DATE,
  next_review_date DATE,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE education_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  member_id UUID REFERENCES tenant_members(id),
  -- Program
  title TEXT NOT NULL,
  category TEXT, -- 'financial_literacy', 'investment', 'governance', 'philanthropy', 'leadership'
  description TEXT,
  -- Progress
  modules JSONB DEFAULT '[]', -- [{title, completed, completed_date, notes}]
  progress_pct INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_family_meetings_tenant ON family_meetings(tenant_id);
CREATE INDEX idx_family_votes_tenant ON family_votes(tenant_id);
CREATE INDEX idx_philanthropy_tenant ON philanthropy_grants(tenant_id);
CREATE INDEX idx_succession_tenant ON succession_plans(tenant_id);
CREATE INDEX idx_education_tenant ON education_programs(tenant_id);
