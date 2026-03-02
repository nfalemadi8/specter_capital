-- 013_contacts.sql

CREATE TABLE advisor_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  -- Contact
  name TEXT NOT NULL,
  company TEXT,
  role TEXT, -- 'attorney', 'cpa', 'financial_advisor', 'insurance_agent', 'banker', 'property_manager', 'trustee', 'appraiser'
  email TEXT,
  phone TEXT,
  address TEXT,
  -- Engagement
  retainer_amount NUMERIC(18,2),
  retainer_frequency TEXT,
  last_engagement_date DATE,
  specialty TEXT[],
  -- Rating
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  notes TEXT,
  tags TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE advisor_engagements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID REFERENCES advisor_contacts(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  description TEXT,
  amount NUMERIC(18,2),
  entity_id UUID REFERENCES entities(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_advisor_contacts_tenant ON advisor_contacts(tenant_id);
CREATE INDEX idx_advisor_engagements_contact ON advisor_engagements(contact_id);
