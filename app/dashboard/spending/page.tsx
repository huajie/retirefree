import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { getTransactionSummary, getRecentTransactions, getLastSyncStatus } from '@/lib/plaid/service'
import { SpendingClient } from './SpendingClient'
import { subDays, format } from 'date-fns'

export const metadata = {
  title: 'My Spending - RetireFree',
  description: 'Track your spending and see where your money goes',
  robots: { index: false, follow: false },
}

export default async function SpendingPage() {
  const supabase = await createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Get service client for accessing data
  const serviceClient = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Check if user has any connected accounts
  const { data: plaidItems } = await serviceClient
    .from('plaid_items')
    .select('id')
    .eq('user_id', user.id)
    .limit(1)

  const hasAccounts = !!(plaidItems && plaidItems.length > 0)

  // Get last sync status
  const lastSync = await getLastSyncStatus(user.id)

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
  const { data: userData } = await serviceClient
    .from('users')
    .select('monthly_expenses')
    .eq('id', user.id)
    .single()

  const calculatorMonthlyExpenses = userData?.monthly_expenses || null

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
}
