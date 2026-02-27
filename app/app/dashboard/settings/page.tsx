import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SettingsClient from './SettingsClient'

export const metadata = {
  title: 'Settings | RetireFree',
  description: 'Manage your account settings'
}

export default async function SettingsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user's connected accounts count
  const { data: plaidItems } = await supabase
    .from('plaid_items')
    .select('id, institution_name')
    .eq('user_id', user.id)

  const connectedAccounts = plaidItems || []

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <SettingsClient
        userEmail={user.email || ''}
        connectedAccountsCount={connectedAccounts.length}
        connectedAccounts={connectedAccounts}
      />
    </div>
  )
}
