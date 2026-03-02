-- 001_tenants.sql
-- Multi-tenant with white-label support

CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  -- Deployment mode
  deployment_type TEXT NOT NULL DEFAULT 'multi' CHECK (deployment_type IN ('multi', 'single')),
  -- White-label branding
  logo_url TEXT,
  primary_color TEXT DEFAULT '#22d3ee',
  accent_color TEXT DEFAULT '#a78bfa',
  font_family TEXT DEFAULT 'JetBrains Mono',
  custom_domain TEXT UNIQUE,
  -- Subscription
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan TEXT NOT NULL DEFAULT 'starter' CHECK (plan IN ('starter', 'professional', 'enterprise')),
  plan_seats INTEGER NOT NULL DEFAULT 5,
  -- Settings
  default_currency TEXT NOT NULL DEFAULT 'USD',
  supported_currencies TEXT[] DEFAULT ARRAY['USD', 'EUR', 'GBP', 'SAR', 'AED', 'CHF', 'JPY', 'CNY'],
  timezone TEXT DEFAULT 'UTC',
  fiscal_year_start INTEGER DEFAULT 1, -- month 1-12
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tenants_slug ON tenants(slug);
CREATE INDEX idx_tenants_custom_domain ON tenants(custom_domain) WHERE custom_domain IS NOT NULL;
