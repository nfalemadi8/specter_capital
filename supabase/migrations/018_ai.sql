-- 018_ai.sql

CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  member_id UUID REFERENCES tenant_members(id),
  title TEXT,
  messages JSONB DEFAULT '[]', -- [{role, content, timestamp}]
  context JSONB DEFAULT '{}', -- what data the AI can access
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ai_conversations_member ON ai_conversations(member_id, updated_at DESC);
CREATE INDEX idx_ai_conversations_tenant ON ai_conversations(tenant_id);
