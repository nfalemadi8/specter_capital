-- 015_billing.sql

CREATE TABLE subscription_plans (
  id TEXT PRIMARY KEY, -- 'starter', 'professional', 'enterprise'
  name TEXT NOT NULL,
  monthly_price NUMERIC(10,2),
  annual_price NUMERIC(10,2),
  max_seats INTEGER,
  max_entities INTEGER,
  max_accounts INTEGER,
  features JSONB NOT NULL, -- list of enabled feature flags
  stripe_monthly_price_id TEXT,
  stripe_annual_price_id TEXT
);

-- Seed the subscription plans
INSERT INTO subscription_plans (id, name, monthly_price, annual_price, max_seats, max_entities, max_accounts, features) VALUES
('starter', 'Starter', 499.00, 4990.00, 5, 10, 5, '{"terminal_embedded": true, "terminal_standalone": false, "ai_queries_monthly": 100, "integrations": ["plaid"], "white_label": false, "single_tenant": false, "e2e_messaging": true, "e2e_documents": false, "report_frequency": "monthly"}'),
('professional', 'Professional', 1499.00, 14990.00, 15, 50, 25, '{"terminal_embedded": true, "terminal_standalone": true, "ai_queries_monthly": 1000, "integrations": ["plaid", "ibkr", "alpaca"], "white_label": false, "single_tenant": false, "e2e_messaging": true, "e2e_documents": true, "report_frequency": "weekly"}'),
('enterprise', 'Enterprise', NULL, NULL, NULL, NULL, NULL, '{"terminal_embedded": true, "terminal_standalone": true, "terminal_dedicated": true, "ai_queries_monthly": null, "integrations": ["plaid", "ibkr", "alpaca", "custom"], "white_label": true, "single_tenant": true, "e2e_messaging": true, "e2e_documents": true, "e2e_custom_keys": true, "report_frequency": "realtime"}');
