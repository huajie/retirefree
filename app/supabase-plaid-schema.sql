-- Plaid Integration Database Schema for RetireFree
-- Run this in your Supabase SQL editor to add Plaid tables

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Plaid items (represents bank/institution connection)
CREATE TABLE plaid_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plaid_item_id TEXT NOT NULL UNIQUE,
  plaid_access_token TEXT NOT NULL,
  institution_name TEXT,
  institution_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Financial accounts (checking, savings, 401k, IRA, brokerage, etc.)
CREATE TABLE financial_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plaid_item_id UUID REFERENCES plaid_items(id) ON DELETE CASCADE,
  plaid_account_id TEXT NOT NULL,
  account_name TEXT NOT NULL,
  account_type TEXT NOT NULL, -- depository, investment, credit, loan
  account_subtype TEXT, -- checking, savings, 401k, ira, brokerage
  current_balance DECIMAL(15, 2) DEFAULT 0,
  available_balance DECIMAL(15, 2),
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(plaid_account_id)
);

-- Account balance history (for tracking over time)
CREATE TABLE account_balance_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID REFERENCES financial_accounts(id) ON DELETE CASCADE NOT NULL,
  balance DECIMAL(15, 2) NOT NULL,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_plaid_items_user_id ON plaid_items(user_id);
CREATE INDEX idx_financial_accounts_user_id ON financial_accounts(user_id);
CREATE INDEX idx_financial_accounts_plaid_item_id ON financial_accounts(plaid_item_id);
CREATE INDEX idx_account_balance_history_account_id ON account_balance_history(account_id);
CREATE INDEX idx_account_balance_history_recorded_at ON account_balance_history(recorded_at DESC);

-- Enable Row Level Security
ALTER TABLE plaid_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE account_balance_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for plaid_items
CREATE POLICY "Users can view own plaid items" ON plaid_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own plaid items" ON plaid_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own plaid items" ON plaid_items
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own plaid items" ON plaid_items
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for financial_accounts
CREATE POLICY "Users can view own accounts" ON financial_accounts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own accounts" ON financial_accounts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own accounts" ON financial_accounts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own accounts" ON financial_accounts
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for account_balance_history
CREATE POLICY "Users can view own balance history" ON account_balance_history
  FOR SELECT USING (
    account_id IN (SELECT id FROM financial_accounts WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can insert own balance history" ON account_balance_history
  FOR INSERT WITH CHECK (
    account_id IN (SELECT id FROM financial_accounts WHERE user_id = auth.uid())
  );

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_plaid_items_updated_at
  BEFORE UPDATE ON plaid_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_financial_accounts_updated_at
  BEFORE UPDATE ON financial_accounts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Transactions table for spending analysis
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  account_id UUID REFERENCES financial_accounts(id) ON DELETE CASCADE NOT NULL,
  plaid_transaction_id TEXT NOT NULL UNIQUE,
  transaction_date DATE NOT NULL,
  amount DECIMAL(15, 2) NOT NULL, -- negative for expenses, positive for income
  merchant_name TEXT,
  category_primary TEXT, -- e.g., "Food and Drink"
  category_detailed TEXT, -- e.g., "Restaurants"
  pending BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for fast queries
CREATE INDEX idx_transactions_user_date ON transactions(user_id, transaction_date DESC);
CREATE INDEX idx_transactions_account ON transactions(account_id);
CREATE INDEX idx_transactions_category ON transactions(user_id, category_primary);
CREATE INDEX idx_transactions_plaid_id ON transactions(plaid_transaction_id);

-- Enable Row Level Security
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for transactions
CREATE POLICY "Users can view own transactions" ON transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" ON transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transactions" ON transactions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own transactions" ON transactions
  FOR DELETE USING (auth.uid() = user_id);

-- Trigger to automatically update updated_at on transactions
CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Transaction sync metadata table
CREATE TABLE transaction_sync_status (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plaid_item_id UUID REFERENCES plaid_items(id) ON DELETE CASCADE NOT NULL,
  last_synced_at TIMESTAMPTZ DEFAULT NOW(),
  sync_start_date DATE,
  sync_end_date DATE,
  transaction_count INTEGER DEFAULT 0,
  UNIQUE(user_id, plaid_item_id)
);

-- Enable RLS on sync status
ALTER TABLE transaction_sync_status ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sync status" ON transaction_sync_status
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sync status" ON transaction_sync_status
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sync status" ON transaction_sync_status
  FOR UPDATE USING (auth.uid() = user_id);

-- Comments for documentation
COMMENT ON TABLE plaid_items IS 'Stores Plaid item connections for each user';
COMMENT ON TABLE financial_accounts IS 'Stores individual financial accounts (checking, savings, investment accounts, etc.)';
COMMENT ON TABLE account_balance_history IS 'Tracks historical balance data for accounts over time';
COMMENT ON TABLE transactions IS 'Stores transaction data from Plaid for spending analysis';
COMMENT ON TABLE transaction_sync_status IS 'Tracks when transactions were last synced for each Plaid item';
COMMENT ON COLUMN financial_accounts.account_type IS 'Primary account type: depository, investment, credit, loan';
COMMENT ON COLUMN financial_accounts.account_subtype IS 'Specific account subtype: checking, savings, 401k, ira, brokerage, etc.';
COMMENT ON COLUMN transactions.amount IS 'Transaction amount: negative for expenses, positive for income';
COMMENT ON COLUMN transactions.category_primary IS 'Primary transaction category from Plaid (e.g., Food and Drink, Healthcare, Travel)';
COMMENT ON COLUMN transactions.category_detailed IS 'Detailed transaction category from Plaid (e.g., Restaurants, Groceries, Pharmacies)';
