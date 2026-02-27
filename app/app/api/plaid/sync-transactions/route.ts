import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { syncTransactions, getTransactionSummary } from '@/lib/plaid/service'
import { subDays, format } from 'date-fns'

/**
 * POST /api/plaid/sync-transactions
 * Syncs transactions from Plaid for all user's connected items
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
        transactionCount: 0,
      })
    }

    // Date range: last 90 days
    const endDate = new Date()
    const startDate = subDays(endDate, 90)
    const startDateStr = format(startDate, 'yyyy-MM-dd')
    const endDateStr = format(endDate, 'yyyy-MM-dd')

    let totalTransactions = 0
    const errors: any[] = []

    // Sync each item
    for (const item of plaidItems) {
      try {
        const result = await syncTransactions(
          user.id,
          item.id,
          item.plaid_access_token,
          startDateStr,
          endDateStr
        )
        totalTransactions += result.synced
      } catch (error: any) {
        console.error(`Error syncing transactions for item ${item.id}:`, error)
        errors.push({
          item_id: item.id,
          error: error.message,
        })
      }
    }

    // Get transaction summary
    const summary = await getTransactionSummary(user.id, startDateStr, endDateStr)

    // Calculate monthly average (90 days = ~3 months)
    const monthlyAverage = Math.round((summary.totalSpent / 3) * 100) / 100

    if (errors.length > 0) {
      return NextResponse.json({
        success: true,
        transactionCount: totalTransactions,
        dateRange: {
          start: startDateStr,
          end: endDateStr,
        },
        summary: {
          ...summary,
          monthlyAverage,
        },
        errors,
        message: 'Some items failed to sync',
      })
    }

    return NextResponse.json({
      success: true,
      transactionCount: totalTransactions,
      dateRange: {
        start: startDateStr,
        end: endDateStr,
      },
      summary: {
        ...summary,
        monthlyAverage,
      },
      message: `Successfully synced ${totalTransactions} transactions`,
    })
  } catch (error: any) {
    console.error('Error syncing transactions:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to sync transactions' },
      { status: 500 }
    )
  }
}
