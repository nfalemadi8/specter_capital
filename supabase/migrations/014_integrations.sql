-- 014_integrations.sql

CREATE TABLE integration_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  -- Integration
  provider TEXT NOT NULL, -- 'plaid', 'ibkr', 'alpaca', 'specter_terminal', 'stripe', 'quickbooks', 'xero'
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'error', 'disconnected', 'pending')),
  -- Credentials (encrypted)
  credentials_encrypted JSONB,
  -- Sync
  last_sync_at TIMESTAMPTZ,
  next_sync_at TIMESTAMPTZ,
  sync_frequency TEXT DEFAULT 'daily',
  sync_error TEXT,
  -- Config
  config JSONB DEFAULT '{}',
  created_by UUID REFERENCES tenant_members(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_integrations_tenant ON integration_connections(tenant_id);
CREATE INDEX idx_integrations_provider ON integration_connections(tenant_id, provider);
