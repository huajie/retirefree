import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AccountsClient } from './AccountsClient'

export const metadata = {
  title: 'My Accounts - RetireFree',
  description: 'Manage your connected financial accounts',
}

export default async function AccountsPage() {
  const supabase = await createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch user's connected accounts
  const { data: accounts, error } = await supabase
    .from('financial_accounts')
    .select(
      `
      *,
      plaid_items (
        id,
        institution_name,
        institution_id
      )
    `
    )
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching accounts:', error)
  }

  // Calculate totals
  const totalBalance = accounts?.reduce(
    (sum, account) => sum + (Number(account.current_balance) || 0),
    0
  ) || 0

  const investmentBalance = accounts
    ?.filter((account) => account.account_type === 'investment')
    .reduce((sum, account) => sum + (Number(account.current_balance) || 0), 0) || 0

  const cashBalance = accounts
    ?.filter((account) => account.account_type === 'depository')
    .reduce((sum, account) => sum + (Number(account.current_balance) || 0), 0) || 0

  // Get unique items for display
  const uniqueItems = accounts?.reduce((acc, account) => {
    const itemId = account.plaid_items?.id
    if (itemId && !acc.find((item) => item.id === itemId)) {
      acc.push({
        id: itemId,
        institution_name: account.plaid_items?.institution_name || 'Unknown',
      })
    }
    return acc
  }, [] as { id: string; institution_name: string }[])

  return (
    <AccountsClient
      accounts={accounts || []}
      totalBalance={totalBalance}
      investmentBalance={investmentBalance}
      cashBalance={cashBalance}
      connectedItems={uniqueItems || []}
    />
  )
}
