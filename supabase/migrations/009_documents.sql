-- 009_documents.sql

CREATE TABLE document_folders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES document_folders(id),
  name TEXT NOT NULL,
  folder_type TEXT, -- 'entity', 'deal', 'property', 'personal', 'tax', 'insurance', 'governance'
  -- Access
  restricted_to_roles user_role[],
  restricted_to_members UUID[],
  created_by UUID REFERENCES tenant_members(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  folder_id UUID REFERENCES document_folders(id),
  -- Document info
  name TEXT NOT NULL,
  file_type TEXT, -- 'pdf', 'docx', 'xlsx', 'image', 'other'
  file_size BIGINT,
  storage_path TEXT NOT NULL, -- Supabase Storage path
  -- E2E Encryption
  is_encrypted BOOLEAN DEFAULT true,
  encryption_key_id TEXT, -- reference to encrypted symmetric key
  -- Versioning
  version INTEGER DEFAULT 1,
  previous_version_id UUID REFERENCES documents(id),
  -- Search
  content_text TEXT, -- extracted text for search (encrypted at rest)
  -- Metadata
  document_category TEXT, -- 'will', 'trust_agreement', 'deed', 'insurance_policy', 'tax_return', 'k1', 'operating_agreement', 'passport', 'drivers_license'
  entity_id UUID REFERENCES entities(id),
  deal_id UUID REFERENCES deals(id),
  property_id UUID REFERENCES properties(id),
  tags TEXT[],
  expiry_date DATE, -- for licenses, insurance, etc.
  -- Audit
  uploaded_by UUID REFERENCES tenant_members(id),
  last_viewed_by UUID REFERENCES tenant_members(id),
  last_viewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_document_folders_tenant ON document_folders(tenant_id);
CREATE INDEX idx_documents_tenant ON documents(tenant_id);
CREATE INDEX idx_documents_folder ON documents(folder_id);
CREATE INDEX idx_documents_entity ON documents(entity_id);
CREATE INDEX idx_documents_deal ON documents(deal_id);
CREATE INDEX idx_documents_expiry ON documents(expiry_date) WHERE expiry_date IS NOT NULL;
