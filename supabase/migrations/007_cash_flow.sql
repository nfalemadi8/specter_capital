-- 007_cash_flow.sql

CREATE TABLE cash_flow_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id),
  account_id UUID REFERENCES accounts(id),
  -- Entry details
  entry_type TEXT NOT NULL CHECK (entry_type IN ('inflow', 'outflow')),
  category TEXT NOT NULL,
  sub_category TEXT,
  amount NUMERIC(18,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  -- Recurrence
  is_recurring BOOLEAN DEFAULT false,
  recurrence_pattern TEXT, -- 'weekly', 'monthly', 'quarterly', 'annually'
  next_occurrence DATE,
  -- Status
  status TEXT DEFAULT 'actual' CHECK (status IN ('actual', 'projected', 'pending_approval')),
  -- Metadata
  description TEXT,
  vendor_payee TEXT,
  tags TEXT[],
  date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE bill_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id),
  -- Bill details
  payee TEXT NOT NULL,
  amount NUMERIC(18,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  category TEXT,
  -- Dates
  invoice_date DATE,
  due_date DATE NOT NULL,
  paid_date DATE,
  -- Approval workflow
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'rejected', 'overdue')),
  submitted_by UUID REFERENCES tenant_members(id),
  approved_by UUID REFERENCES tenant_members(id),
  approved_at TIMESTAMPTZ,
  -- Payment
  payment_method TEXT, -- 'wire', 'ach', 'check', 'card'
  payment_account_id UUID REFERENCES accounts(id),
  reference_number TEXT,
  -- Attachments
  invoice_url TEXT,
  receipt_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subscriptions_tracked (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  service_name TEXT NOT NULL,
  amount NUMERIC(18,2) NOT NULL,
  frequency TEXT NOT NULL, -- 'monthly', 'quarterly', 'annually'
  next_billing_date DATE,
  category TEXT,
  entity_id UUID REFERENCES entities(id),
  auto_renew BOOLEAN DEFAULT true,
  cancel_by_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_cash_flow_tenant ON cash_flow_entries(tenant_id);
CREATE INDEX idx_cash_flow_date ON cash_flow_entries(tenant_id, date DESC);
CREATE INDEX idx_bill_payments_tenant ON bill_payments(tenant_id);
CREATE INDEX idx_bill_payments_status ON bill_payments(tenant_id, status) WHERE status IN ('pending', 'overdue');
CREATE INDEX idx_subscriptions_tenant ON subscriptions_tracked(tenant_id);
