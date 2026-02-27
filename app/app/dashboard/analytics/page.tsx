import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AnalyticsClient } from './AnalyticsClient'

export default async function AnalyticsPage() {
  const supabase = await createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch analytics data (last 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  // Get page views
  const { data: pageViews } = await supabase
    .from('analytics_events')
    .select('*')
    .eq('event_type', 'page_view')
    .gte('timestamp', thirtyDaysAgo.toISOString())
    .order('timestamp', { ascending: false })
    .limit(100)

  // Get affiliate clicks
  const { data: affiliateClicks } = await supabase
    .from('analytics_events')
    .select('*')
    .eq('event_type', 'affiliate_click')
    .gte('timestamp', thirtyDaysAgo.toISOString())
    .order('timestamp', { ascending: false })

  // Get calculator uses
  const { data: calculatorUses } = await supabase
    .from('analytics_events')
    .select('*')
    .eq('event_type', 'calculator_use')
    .gte('timestamp', thirtyDaysAgo.toISOString())

  return (
    <AnalyticsClient
      pageViews={pageViews || []}
      affiliateClicks={affiliateClicks || []}
      calculatorUses={calculatorUses || []}
    />
  )
}
