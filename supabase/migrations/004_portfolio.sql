-- 004_portfolio.sql

CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id),
  -- Account details
  account_name TEXT NOT NULL,
  institution TEXT NOT NULL,
  account_type TEXT NOT NULL, -- 'brokerage', 'bank', 'crypto_exchange', 'retirement', 'custodial'
  account_number_encrypted TEXT, -- E2E encrypted
  -- Integration
  plaid_item_id TEXT,
  plaid_access_token_encrypted TEXT,
  ibkr_account_id TEXT,
  alpaca_account_id TEXT,
  -- Balance
  cash_balance NUMERIC(18,2) DEFAULT 0,
  total_value NUMERIC(18,2) DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  -- Sync
  last_synced_at TIMESTAMPTZ,
  sync_status TEXT DEFAULT 'pending',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE holdings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
  -- Security info
  symbol TEXT NOT NULL,
  security_name TEXT,
  asset_class TEXT NOT NULL, -- 'equity', 'fixed_income', 'crypto', 'etf', 'option', 'futures', 'commodity'
  -- Position
  quantity NUMERIC(18,8) NOT NULL,
  cost_basis NUMERIC(18,2),
  cost_basis_per_unit NUMERIC(18,8),
  current_price NUMERIC(18,8),
  market_value NUMERIC(18,2),
  unrealized_pnl NUMERIC(18,2),
  unrealized_pnl_pct NUMERIC(8,4),
  -- Tax lots
  acquisition_date DATE,
  holding_period TEXT, -- 'short_term', 'long_term'
  -- Metadata
  sector TEXT,
  industry TEXT,
  country TEXT,
  currency TEXT DEFAULT 'USD',
  last_price_update TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tax_lots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  holding_id UUID REFERENCES holdings(id) ON DELETE CASCADE,
  quantity NUMERIC(18,8) NOT NULL,
  cost_basis_per_unit NUMERIC(18,8) NOT NULL,
  acquisition_date DATE NOT NULL,
  acquisition_method TEXT DEFAULT 'purchase', -- 'purchase', 'gift', 'inheritance', 'exercise'
  is_wash_sale BOOLEAN DEFAULT false,
  wash_sale_adjustment NUMERIC(18,2) DEFAULT 0
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  account_id UUID REFERENCES accounts(id),
  -- Transaction details
  transaction_type TEXT NOT NULL, -- 'buy', 'sell', 'dividend', 'interest', 'fee', 'transfer', 'deposit', 'withdrawal'
  symbol TEXT,
  quantity NUMERIC(18,8),
  price NUMERIC(18,8),
  total_amount NUMERIC(18,2) NOT NULL,
  fees NUMERIC(18,2) DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  -- Dates
  transaction_date TIMESTAMPTZ NOT NULL,
  settlement_date TIMESTAMPTZ,
  -- Source
  source TEXT DEFAULT 'manual', -- 'manual', 'plaid', 'ibkr', 'alpaca'
  external_id TEXT,
  -- Tax
  realized_pnl NUMERIC(18,2),
  -- Metadata
  description TEXT,
  category TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE watchlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  member_id UUID REFERENCES tenant_members(id),
  symbol TEXT NOT NULL,
  target_price NUMERIC(18,8),
  alert_above NUMERIC(18,8),
  alert_below NUMERIC(18,8),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE price_history (
  symbol TEXT NOT NULL,
  date DATE NOT NULL,
  open NUMERIC(18,8),
  high NUMERIC(18,8),
  low NUMERIC(18,8),
  close NUMERIC(18,8),
  volume BIGINT,
  PRIMARY KEY (symbol, date)
);

CREATE TABLE benchmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- 'S&P 500', '60/40', 'Custom Blend'
  components JSONB NOT NULL, -- [{"symbol": "SPY", "weight": 0.6}, {"symbol": "AGG", "weight": 0.4}]
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE rebalance_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  target_allocation JSONB NOT NULL, -- {"equity": 60, "fixed_income": 25, "alternatives": 15}
  drift_threshold NUMERIC(5,2) DEFAULT 5.00, -- percentage
  rebalance_frequency TEXT DEFAULT 'quarterly',
  last_rebalanced_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_accounts_tenant ON accounts(tenant_id);
CREATE INDEX idx_holdings_tenant ON holdings(tenant_id);
CREATE INDEX idx_holdings_account ON holdings(account_id);
CREATE INDEX idx_holdings_symbol ON holdings(symbol);
CREATE INDEX idx_transactions_tenant ON transactions(tenant_id);
CREATE INDEX idx_transactions_account ON transactions(account_id);
CREATE INDEX idx_transactions_date ON transactions(tenant_id, transaction_date DESC);
CREATE INDEX idx_watchlist_tenant ON watchlist(tenant_id);
CREATE INDEX idx_price_history_symbol ON price_history(symbol, date DESC);
