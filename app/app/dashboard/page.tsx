import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardClient } from './DashboardClient'

// Don't cache this page - always fetch fresh subscription data
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DashboardPage() {
  const supabase = await createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch user's calculations
  const { data: calculations, error } = await supabase
    .from('calculations')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching calculations:', error)
  }

  // Fetch subscription status
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .single()

  console.log('[Dashboard] User ID:', user.id)
  console.log('[Dashboard] Subscription data:', JSON.stringify(subscription))

  return (
    <DashboardClient
      user={user}
      calculations={calculations || []}
      subscription={subscription}
    />
  )
}
