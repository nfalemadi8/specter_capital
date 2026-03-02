-- 019_branding.sql

CREATE TABLE tenant_branding (
  tenant_id UUID PRIMARY KEY REFERENCES tenants(id) ON DELETE CASCADE,
  logo_light_url TEXT,
  logo_dark_url TEXT,
  favicon_url TEXT,
  primary_color TEXT DEFAULT '#22d3ee',
  secondary_color TEXT DEFAULT '#a78bfa',
  accent_color TEXT DEFAULT '#34d399',
  danger_color TEXT DEFAULT '#f87171',
  background_color TEXT DEFAULT '#0a0e17',
  surface_color TEXT DEFAULT '#0f1423',
  font_heading TEXT DEFAULT 'Inter',
  font_body TEXT DEFAULT 'Inter',
  font_mono TEXT DEFAULT 'JetBrains Mono',
  custom_css TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
