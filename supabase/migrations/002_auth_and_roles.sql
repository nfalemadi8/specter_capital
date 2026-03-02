-- 002_auth_and_roles.sql
-- Role-based access control

CREATE TYPE user_role AS ENUM (
  'principal',       -- Full access, owner
  'co_principal',    -- Full access, co-owner
  'cfo',             -- Financial operations, no governance
  'accountant',      -- Accounting, tax, bill pay only
  'advisor',         -- Read-only portfolio + documents shared with them
  'family_member',   -- Limited dashboard, governance, messaging
  'family_junior',   -- Minimal view, education content
  'auditor',         -- Read-only everything for compliance
  'property_manager' -- Real estate module only
);

CREATE TABLE tenant_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'family_member',
  -- Permissions override (JSON for granular module access)
  permissions_override JSONB DEFAULT '{}',
  -- Profile
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  title TEXT, -- "Principal", "CFO", etc.
  -- E2E encryption
  public_key TEXT, -- X25519 public key for E2E encryption
  encrypted_private_key TEXT, -- Private key encrypted with user's password
  -- Status
  invited_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ,
  last_active_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, user_id)
);

-- Module access matrix per role
CREATE TABLE role_permissions (
  role user_role PRIMARY KEY,
  permissions JSONB NOT NULL
);

CREATE INDEX idx_tenant_members_tenant ON tenant_members(tenant_id);
CREATE INDEX idx_tenant_members_user ON tenant_members(user_id);
CREATE INDEX idx_tenant_members_active ON tenant_members(tenant_id, is_active) WHERE is_active = true;
