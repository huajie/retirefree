import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import BillingClient from './BillingClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BillingPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get subscription data
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return <BillingClient user={user} subscription={subscription} />
}
