import { createClient } from '@supabase/supabase-js'
import { plaidClient } from './config'

/**
 * Create a Supabase client with service role for server-side operations
 */
function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

/**
 * Save Plaid item to database
 */
export async function savePlaidItem(
  userId: string,
  itemId: string,
  accessToken: string,
  institutionName?: string,
  institutionId?: string
) {
  const supabase = getServiceClient()

  const { data, error } = await supabase
    .from('plaid_items')
    .insert({
      user_id: userId,
      plaid_item_id: itemId,
      plaid_access_token: accessToken,
      institution_name: institutionName,
      institution_id: institutionId,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Save financial accounts to database
 */
export async function saveFinancialAccounts(
  userId: string,
  plaidItemId: string,
  accounts: any[]
) {
  const supabase = getServiceClient()

  const accountsToInsert = accounts.map((account) => ({
    user_id: userId,
    plaid_item_id: plaidItemId,
    plaid_account_id: account.account_id,
    account_name: account.name,
    account_type: account.type,
    account_subtype: account.subtype,
    current_balance: account.balances.current,
    available_balance: account.balances.available,
    last_synced_at: new Date().toISOString(),
  }))

  const { data, error } = await supabase
    .from('financial_accounts')
    .upsert(accountsToInsert, {
      onConflict: 'plaid_account_id',
    })
    .select()

  if (error) throw error
  return data
}

/**
 * Get Plaid access token for a user's item
 */
export async function getAccessToken(userId: string, itemId: string) {
  const supabase = getServiceClient()

  const { data, error } = await supabase
    .from('plaid_items')
    .select('plaid_access_token')
    .eq('user_id', userId)
    .eq('id', itemId)
    .single()

  if (error) throw error
  return data.plaid_access_token
}

/**
 * Update account balances
 */
export async function updateAccountBalances(accounts: any[]) {
  const supabase = getServiceClient()

  const updates = accounts.map((account) => ({
    plaid_account_id: account.account_id,
    current_balance: account.balances.current,
    available_balance: account.balances.available,
    last_synced_at: new Date().toISOString(),
  }))

  const { error } = await supabase
    .from('financial_accounts')
    .upsert(updates, {
      onConflict: 'plaid_account_id',
    })

  if (error) throw error
}

/**
 * Save balance to history
 */
export async function saveBalanceHistory(accountId: string, balance: number) {
  const supabase = getServiceClient()

  const { error } = await supabase
    .from('account_balance_history')
    .insert({
      account_id: accountId,
      balance: balance,
    })

  if (error) throw error
}

/**
 * Delete Plaid item and all associated accounts
 */
export async function deletePlaidItem(userId: string, itemId: string) {
  const supabase = getServiceClient()

  // Get the access token first to invalidate it with Plaid
  const { data: itemData } = await supabase
    .from('plaid_items')
    .select('plaid_access_token, plaid_item_id')
    .eq('user_id', userId)
    .eq('id', itemId)
    .single()

  if (itemData?.plaid_access_token) {
    try {
      // Remove item from Plaid
      await plaidClient.itemRemove({
        access_token: itemData.plaid_access_token,
      })
    } catch (error) {
      console.error('Error removing item from Plaid:', error)
      // Continue with database deletion even if Plaid removal fails
    }
  }

  // Delete from database (cascade will handle accounts)
  const { error } = await supabase
    .from('plaid_items')
    .delete()
    .eq('user_id', userId)
    .eq('id', itemId)

  if (error) throw error
}

/**
 * Get user's financial accounts
 */
export async function getUserAccounts(userId: string) {
  const supabase = getServiceClient()

  const { data, error } = await supabase
    .from('financial_accounts')
    .select(
      `
      *,
      plaid_items (
        institution_name,
        institution_id
      )
    `
    )
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * Calculate total investment account balance for a user
 */
export async function getTotalInvestmentBalance(userId: string): Promise<number> {
  const supabase = getServiceClient()

  const { data, error } = await supabase
    .from('financial_accounts')
    .select('current_balance')
    .eq('user_id', userId)
    .eq('account_type', 'investment')

  if (error) throw error

  return data?.reduce((sum, account) => sum + (Number(account.current_balance) || 0), 0) || 0
}

/**
 * Sync transactions from Plaid for a specific item
 */
export async function syncTransactions(
  userId: string,
  plaidItemId: string,
  accessToken: string,
  startDate: string,
  endDate: string
) {
  const supabase = getServiceClient()

  // Fetch transactions from Plaid
  const response = await plaidClient.transactionsGet({
    access_token: accessToken,
    start_date: startDate,
    end_date: endDate,
  })

  const plaidTransactions = response.data.transactions

  // Get account mappings (plaid_account_id -> database id)
  const { data: accounts } = await supabase
    .from('financial_accounts')
    .select('id, plaid_account_id')
    .eq('plaid_item_id', plaidItemId)

  const accountMap = new Map(
    accounts?.map((acc) => [acc.plaid_account_id, acc.id]) || []
  )

  // Transform and save transactions
  const transactionsToUpsert = plaidTransactions
    .map((txn) => {
      const accountId = accountMap.get(txn.account_id)
      if (!accountId) return null

      // Get primary and detailed categories
      const categories = txn.category || []
      const categoryPrimary = categories[0] || 'Other'
      const categoryDetailed = categories.length > 1 ? categories.join(' > ') : categoryPrimary

      return {
        user_id: userId,
        account_id: accountId,
        plaid_transaction_id: txn.transaction_id,
        transaction_date: txn.date,
        amount: -txn.amount, // Plaid uses positive for expenses, we use negative
        merchant_name: txn.merchant_name || txn.name || 'Unknown',
        category_primary: categoryPrimary,
        category_detailed: categoryDetailed,
        pending: txn.pending,
      }
    })
    .filter(Boolean)

  // Upsert transactions (update if exists, insert if new)
  if (transactionsToUpsert.length > 0) {
    const { error } = await supabase
      .from('transactions')
      .upsert(transactionsToUpsert, {
        onConflict: 'plaid_transaction_id',
        ignoreDuplicates: false,
      })

    if (error) throw error
  }

  // Update sync status
  await supabase
    .from('transaction_sync_status')
    .upsert(
      {
        user_id: userId,
        plaid_item_id: plaidItemId,
        last_synced_at: new Date().toISOString(),
        sync_start_date: startDate,
        sync_end_date: endDate,
        transaction_count: transactionsToUpsert.length,
      },
      {
        onConflict: 'user_id,plaid_item_id',
      }
    )

  return {
    synced: transactionsToUpsert.length,
    startDate,
    endDate,
  }
}

/**
 * Get transaction summary by category for a user
 */
export async function getTransactionSummary(userId: string, startDate: string, endDate: string) {
  const supabase = getServiceClient()

  // Get all transactions in date range (excluding transfers and payments)
  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('amount, category_primary, pending')
    .eq('user_id', userId)
    .gte('transaction_date', startDate)
    .lte('transaction_date', endDate)
    .eq('pending', false) // Only non-pending transactions

  if (error) throw error

  const excludedCategories = ['Transfer', 'Payment', 'Credit Card Payment']

  // Calculate totals
  let totalSpent = 0
  let totalIncome = 0
  const categoryTotals = new Map<string, { amount: number; count: number }>()

  transactions?.forEach((txn) => {
    const amount = Number(txn.amount)

    // Skip transfers and payments
    if (excludedCategories.includes(txn.category_primary)) {
      return
    }

    if (amount < 0) {
      totalSpent += Math.abs(amount)

      // Add to category total
      const current = categoryTotals.get(txn.category_primary) || { amount: 0, count: 0 }
      categoryTotals.set(txn.category_primary, {
        amount: current.amount + Math.abs(amount),
        count: current.count + 1,
      })
    } else {
      totalIncome += amount
    }
  })

  // Convert category map to sorted array
  const byCategory = Array.from(categoryTotals.entries())
    .map(([category, data]) => ({
      category,
      amount: Math.round(data.amount * 100) / 100,
      count: data.count,
    }))
    .sort((a, b) => b.amount - a.amount)

  return {
    totalSpent: Math.round(totalSpent * 100) / 100,
    totalIncome: Math.round(totalIncome * 100) / 100,
    netCashFlow: Math.round((totalIncome - totalSpent) * 100) / 100,
    byCategory,
  }
}

/**
 * Get recent transactions for a user
 */
export async function getRecentTransactions(userId: string, limit: number = 30) {
  const supabase = getServiceClient()

  const { data, error } = await supabase
    .from('transactions')
    .select(
      `
      id,
      transaction_date,
      amount,
      merchant_name,
      category_primary,
      category_detailed,
      pending,
      account_id,
      financial_accounts!inner (
        account_name
      )
    `
    )
    .eq('user_id', userId)
    .order('transaction_date', { ascending: false })
    .limit(limit)

  if (error) throw error

  // Transform the data to match expected type
  return data?.map((txn: any) => ({
    ...txn,
    financial_accounts: Array.isArray(txn.financial_accounts)
      ? txn.financial_accounts[0]
      : txn.financial_accounts
  })) || []
}

/**
 * Get last sync status for user's items
 */
export async function getLastSyncStatus(userId: string) {
  const supabase = getServiceClient()

  const { data, error } = await supabase
    .from('transaction_sync_status')
    .select('*')
    .eq('user_id', userId)
    .order('last_synced_at', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}
