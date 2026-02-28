import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { getTransactionSummary, getRecentTransactions, getLastSyncStatus } from '@/lib/plaid/service'
import { isPlaidConfigured } from '@/lib/plaid/config'
import { SpendingClient } from './SpendingClient'
import { subDays, format } from 'date-fns'

export const metadata = {
  title: 'My Spending - RetireFree',
  description: 'Track your spending and see where your money goes',
  robots: { index: false, follow: false },
}

export default async function SpendingPage() {
  try {
    const supabase = await createClient()

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect('/auth/login')
    }

    // Validate environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceKey) {
      console.error('Missing required environment variables:', {
        hasUrl: !!supabaseUrl,
        hasServiceKey: !!serviceKey,
        urlLength: supabaseUrl?.length || 0,
        keyLength: serviceKey?.length || 0
      })
      throw new Error('Server configuration error: Missing Supabase credentials')
    }

    // Get service client for accessing data
    const serviceClient = createServiceClient(supabaseUrl, serviceKey)

    // Check if Plaid is configured
    const plaidConfigured = isPlaidConfigured()

    // Check if user has any connected accounts
    let hasAccounts = false
    if (plaidConfigured) {
      try {
        const { data: plaidItems } = await serviceClient
          .from('plaid_items')
          .select('id')
          .eq('user_id', user.id)
          .limit(1)

        hasAccounts = !!(plaidItems && plaidItems.length > 0)
      } catch (err) {
        console.error('Error checking plaid items:', err)
      }
    }

    // Get last sync status
    let lastSync = null
    try {
      lastSync = await getLastSyncStatus(user.id)
    } catch (err) {
      console.error('Error getting last sync status:', err)
    }

    // Date range: last 90 days
    const endDate = new Date()
    const startDate = subDays(endDate, 90)
    const startDateStr = format(startDate, 'yyyy-MM-dd')
    const endDateStr = format(endDate, 'yyyy-MM-dd')

    // Get transaction summary and recent transactions
    let summary = null
    let recentTransactions = null

    if (hasAccounts && lastSync) {
      try {
        summary = await getTransactionSummary(user.id, startDateStr, endDateStr)
        recentTransactions = await getRecentTransactions(user.id, 30)
      } catch (error) {
        console.error('Error fetching transaction data:', error)
      }
    }

    // Get user's calculator data for comparison
    let calculatorMonthlyExpenses = null
    try {
      const { data: userData } = await serviceClient
        .from('users')
        .select('monthly_expenses')
        .eq('id', user.id)
        .single()

      calculatorMonthlyExpenses = userData?.monthly_expenses || null
    } catch (err) {
      console.error('Error fetching user data:', err)
    }

    return (
      <SpendingClient
        hasAccounts={hasAccounts}
        lastSync={lastSync}
        summary={summary}
        recentTransactions={recentTransactions || []}
        calculatorMonthlyExpenses={calculatorMonthlyExpenses}
        dateRange={{
          start: startDateStr,
          end: endDateStr,
        }}
      />
    )
  } catch (error) {
    console.error('Error in SpendingPage:', error)
    throw error
  }
}
