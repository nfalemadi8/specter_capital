-- 010_messaging.sql

CREATE TABLE message_channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT,
  channel_type TEXT DEFAULT 'direct' CHECK (channel_type IN ('direct', 'group', 'entity', 'deal')),
  -- E2E encryption
  is_encrypted BOOLEAN DEFAULT true,
  -- Linked context
  entity_id UUID REFERENCES entities(id),
  deal_id UUID REFERENCES deals(id),
  created_by UUID REFERENCES tenant_members(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE message_channel_members (
  channel_id UUID REFERENCES message_channels(id) ON DELETE CASCADE,
  member_id UUID REFERENCES tenant_members(id) ON DELETE CASCADE,
  -- E2E: member's copy of the channel key, encrypted with their public key
  encrypted_channel_key TEXT,
  last_read_at TIMESTAMPTZ,
  PRIMARY KEY (channel_id, member_id)
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id UUID REFERENCES message_channels(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES tenant_members(id),
  -- E2E encrypted content
  encrypted_content TEXT NOT NULL, -- encrypted with channel key
  content_nonce TEXT NOT NULL,
  -- Metadata (not encrypted)
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'file', 'system')),
  reply_to_id UUID REFERENCES messages(id),
  file_url TEXT,
  file_name TEXT,
  -- Status
  is_edited BOOLEAN DEFAULT false,
  edited_at TIMESTAMPTZ,
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_message_channels_tenant ON message_channels(tenant_id);
CREATE INDEX idx_messages_channel ON messages(channel_id, created_at DESC);
CREATE INDEX idx_messages_sender ON messages(sender_id);
