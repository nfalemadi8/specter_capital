-- Seed data for Demo Family Office
-- This creates a complete demo environment for development

-- 1. Create demo tenant
INSERT INTO tenants (id, name, slug, plan, plan_seats, default_currency, timezone) VALUES
('00000000-0000-0000-0000-000000000001', 'Demo Family Office', 'demo-family', 'professional', 15, 'USD', 'America/New_York');

-- 2. Create branding for demo tenant
INSERT INTO tenant_branding (tenant_id) VALUES
('00000000-0000-0000-0000-000000000001');

-- 3. Create 5 sample members (user_ids are placeholders — link to real auth.users after signup)
INSERT INTO tenant_members (id, tenant_id, user_id, role, display_name, title, is_active, accepted_at) VALUES
('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '00000000-aaaa-0000-0000-000000000001', 'principal', 'James Harrison', 'Principal & Founder', true, NOW()),
('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '00000000-aaaa-0000-0000-000000000002', 'cfo', 'Sarah Chen', 'Chief Financial Officer', true, NOW()),
('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', '00000000-aaaa-0000-0000-000000000003', 'accountant', 'Michael Torres', 'Senior Accountant', true, NOW()),
('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', '00000000-aaaa-0000-0000-000000000004', 'family_member', 'Emily Harrison', 'Family Member', true, NOW()),
('10000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001', '00000000-aaaa-0000-0000-000000000005', 'advisor', 'Robert Kim', 'External Advisor', true, NOW());

-- 4. Seed role permissions matrix
INSERT INTO role_permissions (role, permissions) VALUES
('principal', '{
  "dashboard": {"view": true, "edit": true},
  "portfolio": {"view": true, "edit": true, "trade": true},
  "deals": {"view": true, "edit": true, "approve": true},
  "real_estate": {"view": true, "edit": true},
  "entities": {"view": true, "edit": true},
  "documents": {"view": true, "upload": true, "delete": true},
  "cash_flow": {"view": true, "approve": true},
  "bill_pay": {"view": true, "approve": true, "create": true},
  "insurance": {"view": true, "edit": true},
  "contacts": {"view": true, "edit": true},
  "tax": {"view": true, "edit": true},
  "audit": {"view": true},
  "reports": {"view": true, "generate": true},
  "governance": {"view": true, "vote": true, "edit": true},
  "philanthropy": {"view": true, "edit": true},
  "messaging": {"view": true, "send": true},
  "settings": {"view": true, "edit": true},
  "billing": {"view": true, "edit": true},
  "integrations": {"view": true, "edit": true},
  "ai_copilot": {"view": true, "query": true}
}'),
('co_principal', '{
  "dashboard": {"view": true, "edit": true},
  "portfolio": {"view": true, "edit": true, "trade": true},
  "deals": {"view": true, "edit": true, "approve": true},
  "real_estate": {"view": true, "edit": true},
  "entities": {"view": true, "edit": true},
  "documents": {"view": true, "upload": true, "delete": true},
  "cash_flow": {"view": true, "approve": true},
  "bill_pay": {"view": true, "approve": true, "create": true},
  "insurance": {"view": true, "edit": true},
  "contacts": {"view": true, "edit": true},
  "tax": {"view": true, "edit": true},
  "audit": {"view": true},
  "reports": {"view": true, "generate": true},
  "governance": {"view": true, "vote": true, "edit": true},
  "philanthropy": {"view": true, "edit": true},
  "messaging": {"view": true, "send": true},
  "settings": {"view": true, "edit": true},
  "billing": {"view": true, "edit": true},
  "integrations": {"view": true, "edit": true},
  "ai_copilot": {"view": true, "query": true}
}'),
('cfo', '{
  "dashboard": {"view": true, "edit": true},
  "portfolio": {"view": true, "edit": true, "trade": true},
  "deals": {"view": true, "edit": true, "approve": true},
  "real_estate": {"view": true, "edit": true},
  "entities": {"view": true, "edit": true},
  "documents": {"view": true, "upload": true, "delete": false},
  "cash_flow": {"view": true, "approve": true},
  "bill_pay": {"view": true, "approve": true, "create": true},
  "insurance": {"view": true, "edit": true},
  "contacts": {"view": true, "edit": true},
  "tax": {"view": true, "edit": true},
  "audit": {"view": true},
  "reports": {"view": true, "generate": true},
  "governance": {"view": false, "vote": false},
  "philanthropy": {"view": true, "edit": false},
  "messaging": {"view": true, "send": true},
  "settings": {"view": true, "edit": false},
  "billing": {"view": true, "edit": false},
  "integrations": {"view": true, "edit": true},
  "ai_copilot": {"view": true, "query": true}
}'),
('accountant', '{
  "dashboard": {"view": true, "edit": false},
  "portfolio": {"view": true, "edit": false, "trade": false},
  "deals": {"view": true, "edit": false, "approve": false},
  "real_estate": {"view": true, "edit": false},
  "entities": {"view": true, "edit": false},
  "documents": {"view": true, "upload": true, "delete": false},
  "cash_flow": {"view": true, "approve": false},
  "bill_pay": {"view": true, "approve": false, "create": true},
  "insurance": {"view": true, "edit": false},
  "contacts": {"view": true, "edit": false},
  "tax": {"view": true, "edit": true},
  "audit": {"view": true},
  "reports": {"view": true, "generate": true},
  "governance": {"view": false, "vote": false},
  "philanthropy": {"view": false, "edit": false},
  "messaging": {"view": true, "send": true},
  "settings": {"view": false, "edit": false},
  "billing": {"view": false, "edit": false},
  "integrations": {"view": false, "edit": false},
  "ai_copilot": {"view": true, "query": true}
}'),
('advisor', '{
  "dashboard": {"view": true, "edit": false},
  "portfolio": {"view": true, "edit": false, "trade": false},
  "deals": {"view": true, "edit": false, "approve": false},
  "real_estate": {"view": false, "edit": false},
  "entities": {"view": true, "edit": false},
  "documents": {"view": true, "upload": false, "delete": false},
  "cash_flow": {"view": false, "approve": false},
  "bill_pay": {"view": false, "approve": false, "create": false},
  "insurance": {"view": false, "edit": false},
  "contacts": {"view": false, "edit": false},
  "tax": {"view": false, "edit": false},
  "audit": {"view": false},
  "reports": {"view": true, "generate": false},
  "governance": {"view": false, "vote": false},
  "philanthropy": {"view": false, "edit": false},
  "messaging": {"view": true, "send": true},
  "settings": {"view": false, "edit": false},
  "billing": {"view": false, "edit": false},
  "integrations": {"view": false, "edit": false},
  "ai_copilot": {"view": false, "query": false}
}'),
('family_member', '{
  "dashboard": {"view": true, "edit": false},
  "portfolio": {"view": true, "edit": false, "trade": false},
  "deals": {"view": false, "edit": false, "approve": false},
  "real_estate": {"view": true, "edit": false},
  "entities": {"view": true, "edit": false},
  "documents": {"view": true, "upload": false, "delete": false},
  "cash_flow": {"view": false, "approve": false},
  "bill_pay": {"view": false, "approve": false, "create": false},
  "insurance": {"view": true, "edit": false},
  "contacts": {"view": false, "edit": false},
  "tax": {"view": false, "edit": false},
  "audit": {"view": false},
  "reports": {"view": true, "generate": false},
  "governance": {"view": true, "vote": true},
  "philanthropy": {"view": true, "edit": false},
  "messaging": {"view": true, "send": true},
  "settings": {"view": false, "edit": false},
  "billing": {"view": false, "edit": false},
  "integrations": {"view": false, "edit": false},
  "ai_copilot": {"view": true, "query": true}
}'),
('family_junior', '{
  "dashboard": {"view": true, "edit": false},
  "portfolio": {"view": false, "edit": false, "trade": false},
  "deals": {"view": false, "edit": false, "approve": false},
  "real_estate": {"view": false, "edit": false},
  "entities": {"view": false, "edit": false},
  "documents": {"view": false, "upload": false, "delete": false},
  "cash_flow": {"view": false, "approve": false},
  "bill_pay": {"view": false, "approve": false, "create": false},
  "insurance": {"view": false, "edit": false},
  "contacts": {"view": false, "edit": false},
  "tax": {"view": false, "edit": false},
  "audit": {"view": false},
  "reports": {"view": false, "generate": false},
  "governance": {"view": true, "vote": false},
  "philanthropy": {"view": true, "edit": false},
  "messaging": {"view": true, "send": true},
  "settings": {"view": false, "edit": false},
  "billing": {"view": false, "edit": false},
  "integrations": {"view": false, "edit": false},
  "ai_copilot": {"view": true, "query": true}
}'),
('auditor', '{
  "dashboard": {"view": true, "edit": false},
  "portfolio": {"view": true, "edit": false, "trade": false},
  "deals": {"view": true, "edit": false, "approve": false},
  "real_estate": {"view": true, "edit": false},
  "entities": {"view": true, "edit": false},
  "documents": {"view": true, "upload": false, "delete": false},
  "cash_flow": {"view": true, "approve": false},
  "bill_pay": {"view": true, "approve": false, "create": false},
  "insurance": {"view": true, "edit": false},
  "contacts": {"view": true, "edit": false},
  "tax": {"view": true, "edit": false},
  "audit": {"view": true},
  "reports": {"view": true, "generate": true},
  "governance": {"view": true, "vote": false},
  "philanthropy": {"view": true, "edit": false},
  "messaging": {"view": false, "send": false},
  "settings": {"view": false, "edit": false},
  "billing": {"view": false, "edit": false},
  "integrations": {"view": false, "edit": false},
  "ai_copilot": {"view": false, "query": false}
}'),
('property_manager', '{
  "dashboard": {"view": false, "edit": false},
  "portfolio": {"view": false, "edit": false, "trade": false},
  "deals": {"view": false, "edit": false, "approve": false},
  "real_estate": {"view": true, "edit": true},
  "entities": {"view": false, "edit": false},
  "documents": {"view": true, "upload": true, "delete": false},
  "cash_flow": {"view": false, "approve": false},
  "bill_pay": {"view": false, "approve": false, "create": false},
  "insurance": {"view": true, "edit": false},
  "contacts": {"view": true, "edit": true},
  "tax": {"view": false, "edit": false},
  "audit": {"view": false},
  "reports": {"view": false, "generate": false},
  "governance": {"view": false, "vote": false},
  "philanthropy": {"view": false, "edit": false},
  "messaging": {"view": true, "send": true},
  "settings": {"view": false, "edit": false},
  "billing": {"view": false, "edit": false},
  "integrations": {"view": false, "edit": false},
  "ai_copilot": {"view": false, "query": false}
}');

-- 5. Create 8 entities
INSERT INTO entities (id, tenant_id, parent_id, name, entity_type, state_of_formation, date_formed, total_value, ownership_percentage) VALUES
-- Holding company (root)
('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', NULL, 'Harrison Holdings LLC', 'holding_company', 'Delaware', '2005-03-15', 250000000.00, NULL),
-- Trusts
('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Harrison Family Trust', 'trust', 'Nevada', '2008-06-01', 85000000.00, 100.00),
('20000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Harrison Children''s Trust', 'trust', 'Nevada', '2012-01-15', 25000000.00, 100.00),
-- LLCs
('20000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Harrison Real Estate LLC', 'llc', 'Wyoming', '2010-09-20', 45000000.00, 100.00),
('20000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Harrison Ventures LLC', 'llc', 'Delaware', '2015-04-10', 35000000.00, 100.00),
('20000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Harrison Media LLC', 'llc', 'Delaware', '2018-07-22', 12000000.00, 80.00),
-- LP
('20000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Harrison Capital Partners LP', 'lp', 'Delaware', '2016-11-01', 40000000.00, 95.00),
-- Foundation
('20000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000001', NULL, 'Harrison Family Foundation', 'foundation', 'New York', '2009-03-01', 8000000.00, NULL);

-- 6. Create 2 brokerage accounts
INSERT INTO accounts (id, tenant_id, entity_id, account_name, institution, account_type, cash_balance, total_value) VALUES
('30000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', 'Harrison Family Trust - Goldman Sachs', 'Goldman Sachs', 'brokerage', 2500000.00, 65000000.00),
('30000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Holdings - Schwab Brokerage', 'Charles Schwab', 'brokerage', 1200000.00, 38000000.00);

-- 7. Create 15 holdings across 2 accounts
INSERT INTO holdings (id, tenant_id, account_id, symbol, security_name, asset_class, quantity, cost_basis, cost_basis_per_unit, current_price, market_value, unrealized_pnl, unrealized_pnl_pct, sector, holding_period) VALUES
-- Account 1: Goldman Sachs
('40000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'AAPL', 'Apple Inc.', 'equity', 25000, 3750000.00, 150.00, 195.50, 4887500.00, 1137500.00, 30.33, 'Technology', 'long_term'),
('40000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'MSFT', 'Microsoft Corporation', 'equity', 15000, 4200000.00, 280.00, 420.75, 6311250.00, 2111250.00, 50.27, 'Technology', 'long_term'),
('40000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'AMZN', 'Amazon.com Inc.', 'equity', 12000, 1800000.00, 150.00, 185.30, 2223600.00, 423600.00, 23.53, 'Consumer Discretionary', 'long_term'),
('40000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'GOOGL', 'Alphabet Inc.', 'equity', 20000, 2400000.00, 120.00, 175.60, 3512000.00, 1112000.00, 46.33, 'Communication Services', 'long_term'),
('40000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'BRK.B', 'Berkshire Hathaway B', 'equity', 8000, 2800000.00, 350.00, 445.20, 3561600.00, 761600.00, 27.20, 'Financials', 'long_term'),
('40000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'SPY', 'SPDR S&P 500 ETF', 'etf', 30000, 12000000.00, 400.00, 520.40, 15612000.00, 3612000.00, 30.10, NULL, 'long_term'),
('40000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'AGG', 'iShares Core US Aggregate Bond', 'etf', 50000, 5250000.00, 105.00, 98.50, 4925000.00, -325000.00, -6.19, NULL, 'long_term'),
('40000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'BTC', 'Bitcoin', 'crypto', 25.00000000, 750000.00, 30000.00, 95000.00, 2375000.00, 1625000.00, 216.67, NULL, 'long_term'),
-- Account 2: Schwab
('40000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000002', 'NVDA', 'NVIDIA Corporation', 'equity', 5000, 1500000.00, 300.00, 875.50, 4377500.00, 2877500.00, 191.83, 'Technology', 'long_term'),
('40000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000002', 'JPM', 'JPMorgan Chase & Co', 'equity', 10000, 1500000.00, 150.00, 205.80, 2058000.00, 558000.00, 37.20, 'Financials', 'long_term'),
('40000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000002', 'JNJ', 'Johnson & Johnson', 'equity', 15000, 2475000.00, 165.00, 158.30, 2374500.00, -100500.00, -4.06, 'Healthcare', 'long_term'),
('40000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000002', 'VNQ', 'Vanguard Real Estate ETF', 'etf', 20000, 1800000.00, 90.00, 85.20, 1704000.00, -96000.00, -5.33, NULL, 'long_term'),
('40000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000002', 'GLD', 'SPDR Gold Shares', 'etf', 12000, 2160000.00, 180.00, 225.60, 2707200.00, 547200.00, 25.33, NULL, 'long_term'),
('40000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000002', 'ETH', 'Ethereum', 'crypto', 200.00000000, 400000.00, 2000.00, 3500.00, 700000.00, 300000.00, 75.00, NULL, 'long_term'),
('40000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000002', 'TSLA', 'Tesla Inc.', 'equity', 3000, 600000.00, 200.00, 245.80, 737400.00, 137400.00, 22.90, 'Consumer Discretionary', 'short_term');

-- 8. Create 5 deals at various pipeline stages
INSERT INTO deals (id, tenant_id, entity_id, name, company_name, sector, stage, deal_type, target_amount, committed_amount, invested_amount, current_value, moic, irr, sourced_date, vintage_year, opportunity_score, risk_score) VALUES
('50000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000005', 'Series B - DataVault AI', 'DataVault AI', 'Technology', 'due_diligence', 'direct', 5000000.00, NULL, 0, NULL, NULL, NULL, '2025-12-01', 2026, 8, 4),
('50000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000005', 'Seed - GreenBridge Energy', 'GreenBridge Energy', 'Clean Energy', 'screening', 'co_invest', 2000000.00, NULL, 0, NULL, NULL, NULL, '2026-01-15', 2026, 7, 5),
('50000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000007', 'LP Allocation - Sequoia Fund XX', 'Sequoia Capital', 'Multi-Sector', 'closed', 'fund_allocation', 10000000.00, 10000000.00, 6500000.00, 8200000.00, 1.26, 0.18, '2023-06-01', 2023, 9, 3),
('50000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000005', 'Series A - NeuroLink Health', 'NeuroLink Health', 'Healthcare', 'term_sheet', 'direct', 3000000.00, 3000000.00, 0, NULL, NULL, NULL, '2025-10-15', 2026, 8, 6),
('50000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000005', 'Acquisition - CloudScale SaaS', 'CloudScale Inc.', 'Software', 'exited', 'direct', 8000000.00, 8000000.00, 8000000.00, 24000000.00, 3.00, 0.42, '2021-03-01', 2021, 9, 4);

-- 9. Create 3 properties
INSERT INTO properties (id, tenant_id, entity_id, name, property_type, address, city, state, zip, purchase_price, purchase_date, current_value, has_mortgage, mortgage_balance, mortgage_rate, mortgage_monthly_payment, is_rental, monthly_rent, annual_taxes, cap_rate, noi, status) VALUES
('60000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000004', '245 Park Avenue Office', 'commercial', '245 Park Avenue', 'New York', 'NY', '10167', 18000000.00, '2015-08-15', 25000000.00, true, 10000000.00, 0.0425, 52000.00, true, 175000.00, 385000.00, 0.0640, 1600000.00, 'active'),
('60000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000004', 'Aspen Residence', 'residential', '500 Aspen Mountain Road', 'Aspen', 'CO', '81611', 12000000.00, '2019-06-01', 15500000.00, false, NULL, NULL, NULL, false, NULL, 125000.00, NULL, NULL, 'active'),
('60000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000004', 'Miami Beach Multifamily', 'residential', '1200 Ocean Drive', 'Miami Beach', 'FL', '33139', 8500000.00, '2020-11-20', 11200000.00, true, 5500000.00, 0.0375, 28500.00, true, 85000.00, 195000.00, 0.0580, 649000.00, 'active');

-- 10. Sample cash flow entries
INSERT INTO cash_flow_entries (tenant_id, entity_id, entry_type, category, amount, date, is_recurring, recurrence_pattern, status, description) VALUES
('00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'inflow', 'dividend', 125000.00, '2026-01-15', true, 'quarterly', 'actual', 'Q4 2025 dividend income'),
('00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000004', 'inflow', 'rental_income', 260000.00, '2026-02-01', true, 'monthly', 'actual', 'February rental collections'),
('00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'outflow', 'payroll', 85000.00, '2026-02-15', true, 'monthly', 'actual', 'Staff payroll'),
('00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'outflow', 'tax_payment', 450000.00, '2026-01-15', false, NULL, 'actual', 'Q4 estimated tax payment'),
('00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000008', 'outflow', 'grant', 200000.00, '2026-01-20', false, NULL, 'actual', 'Community education grant');

-- 11. Sample insurance policies
INSERT INTO insurance_policies (tenant_id, entity_id, policy_type, carrier, policy_number, coverage_amount, deductible, annual_premium, effective_date, expiration_date, status) VALUES
('00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'umbrella', 'Chubb', 'UMB-2025-001', 50000000.00, 10000.00, 35000.00, '2025-07-01', '2026-07-01', 'active'),
('00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000004', 'property', 'AIG', 'PROP-2025-245', 25000000.00, 25000.00, 42000.00, '2025-08-15', '2026-08-15', 'active'),
('00000000-0000-0000-0000-000000000001', NULL, 'life', 'MetLife', 'LIFE-2025-JH', 20000000.00, 0.00, 28000.00, '2025-01-01', '2026-01-01', 'pending_renewal');

-- 12. Sample advisor contacts
INSERT INTO advisor_contacts (tenant_id, name, company, role, email, specialty, rating) VALUES
('00000000-0000-0000-0000-000000000001', 'William Park', 'Sullivan & Cromwell', 'attorney', 'wpark@sullcrom.com', ARRAY['estate planning', 'corporate', 'tax'], 5),
('00000000-0000-0000-0000-000000000001', 'Lisa Wang', 'KPMG', 'cpa', 'lwang@kpmg.com', ARRAY['family office', 'international tax', 'compliance'], 5),
('00000000-0000-0000-0000-000000000001', 'David Cho', 'Goldman Sachs PWM', 'financial_advisor', 'dcho@gs.com', ARRAY['portfolio management', 'alternatives', 'estate planning'], 4);
