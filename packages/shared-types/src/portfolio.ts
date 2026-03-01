export type AssetClass =
  | 'equity'
  | 'fixed_income'
  | 'crypto'
  | 'etf'
  | 'option'
  | 'futures'
  | 'commodity';

export type TransactionType =
  | 'buy'
  | 'sell'
  | 'dividend'
  | 'interest'
  | 'fee'
  | 'transfer'
  | 'deposit'
  | 'withdrawal';

export type AccountType =
  | 'brokerage'
  | 'bank'
  | 'crypto_exchange'
  | 'retirement'
  | 'custodial';

export interface Account {
  id: string;
  tenant_id: string;
  entity_id: string | null;
  account_name: string;
  institution: string;
  account_type: AccountType;
  account_number_encrypted: string | null;
  plaid_item_id: string | null;
  plaid_access_token_encrypted: string | null;
  ibkr_account_id: string | null;
  alpaca_account_id: string | null;
  cash_balance: number;
  total_value: number;
  currency: string;
  last_synced_at: string | null;
  sync_status: string;
  is_active: boolean;
  created_at: string;
}

export interface Holding {
  id: string;
  tenant_id: string;
  account_id: string;
  symbol: string;
  security_name: string | null;
  asset_class: AssetClass;
  quantity: number;
  cost_basis: number | null;
  cost_basis_per_unit: number | null;
  current_price: number | null;
  market_value: number | null;
  unrealized_pnl: number | null;
  unrealized_pnl_pct: number | null;
  acquisition_date: string | null;
  holding_period: 'short_term' | 'long_term' | null;
  sector: string | null;
  industry: string | null;
  country: string | null;
  currency: string;
  last_price_update: string | null;
  created_at: string;
  updated_at: string;
}

export interface TaxLot {
  id: string;
  holding_id: string;
  quantity: number;
  cost_basis_per_unit: number;
  acquisition_date: string;
  acquisition_method: 'purchase' | 'gift' | 'inheritance' | 'exercise';
  is_wash_sale: boolean;
  wash_sale_adjustment: number;
}

export interface Transaction {
  id: string;
  tenant_id: string;
  account_id: string | null;
  transaction_type: TransactionType;
  symbol: string | null;
  quantity: number | null;
  price: number | null;
  total_amount: number;
  fees: number;
  currency: string;
  transaction_date: string;
  settlement_date: string | null;
  source: 'manual' | 'plaid' | 'ibkr' | 'alpaca';
  external_id: string | null;
  realized_pnl: number | null;
  description: string | null;
  category: string | null;
  tags: string[];
  created_at: string;
}

export interface WatchlistItem {
  id: string;
  tenant_id: string;
  member_id: string | null;
  symbol: string;
  target_price: number | null;
  alert_above: number | null;
  alert_below: number | null;
  notes: string | null;
  created_at: string;
}

export interface PriceHistory {
  symbol: string;
  date: string;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  volume: number | null;
}

export interface Benchmark {
  id: string;
  tenant_id: string;
  name: string;
  components: Array<{ symbol: string; weight: number }>;
  is_default: boolean;
  created_at: string;
}

export interface RebalanceRule {
  id: string;
  tenant_id: string;
  name: string;
  target_allocation: Record<string, number>;
  drift_threshold: number;
  rebalance_frequency: string;
  last_rebalanced_at: string | null;
  is_active: boolean;
}
