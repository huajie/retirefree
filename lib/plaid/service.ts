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
