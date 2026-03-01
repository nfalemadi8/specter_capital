-- 016_audit_log.sql

CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  member_id UUID REFERENCES tenant_members(id),
  -- Action
  action TEXT NOT NULL, -- 'view', 'create', 'update', 'delete', 'approve', 'login', 'export', 'download'
  resource_type TEXT NOT NULL, -- 'document', 'transaction', 'deal', 'entity', 'settings', etc.
  resource_id UUID,
  -- Details
  details JSONB, -- what changed
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_log_tenant ON audit_log(tenant_id, created_at DESC);
CREATE INDEX idx_audit_log_member ON audit_log(member_id, created_at DESC);
CREATE INDEX idx_audit_log_resource ON audit_log(resource_type, resource_id);
