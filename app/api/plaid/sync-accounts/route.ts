import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { plaidClient } from '@/lib/plaid/config'
import { updateAccountBalances, saveBalanceHistory } from '@/lib/plaid/service'
import { createClient as createServiceClient } from '@supabase/supabase-js'

/**
 * POST /api/plaid/sync-accounts
 * Syncs account balances from Plaid for all user's connected items
 */
export async function POST(req: NextRequest) {
  try {
    // Get authenticated user
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get service client for reading access tokens
    const serviceClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Get all Plaid items for this user
    const { data: plaidItems, error: itemsError } = await serviceClient
      .from('plaid_items')
      .select('id, plaid_access_token')
      .eq('user_id', user.id)

    if (itemsError) {
      throw itemsError
    }

    if (!plaidItems || plaidItems.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No accounts to sync',
        synced_count: 0,
      })
    }

    let totalSynced = 0
    const errors: any[] = []

    // Sync each item
    for (const item of plaidItems) {
      try {
        // Get fresh account data from Plaid
        const accountsResponse = await plaidClient.accountsBalanceGet({
          access_token: item.plaid_access_token,
        })

        const accounts = accountsResponse.data.accounts

        // Update balances in database
        await updateAccountBalances(accounts)

        // Get account IDs from database to save history
        const { data: dbAccounts } = await serviceClient
          .from('financial_accounts')
          .select('id, plaid_account_id')
          .eq('plaid_item_id', item.id)

        // Save balance history for each account
        for (const account of accounts) {
          const dbAccount = dbAccounts?.find(
            (a) => a.plaid_account_id === account.account_id
          )
          if (dbAccount && account.balances.current != null) {
            await saveBalanceHistory(dbAccount.id, account.balances.current)
          }
        }

        totalSynced += accounts.length
      } catch (error: any) {
        console.error(`Error syncing item ${item.id}:`, error)
        errors.push({
          item_id: item.id,
          error: error.message,
        })
      }
    }

    if (errors.length > 0) {
      return NextResponse.json({
        success: true,
        synced_count: totalSynced,
        errors,
        message: 'Some accounts failed to sync',
      })
    }

    return NextResponse.json({
      success: true,
      synced_count: totalSynced,
      message: `Successfully synced ${totalSynced} accounts`,
    })
  } catch (error: any) {
    console.error('Error syncing accounts:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to sync accounts' },
      { status: 500 }
    )
  }
}
