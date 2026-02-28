'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView } from '@/lib/analytics/tracker'
import { createClient } from '@/lib/supabase/client'

/**
 * Automatic page view tracking component
 * Place in root layout to track all page navigations
 */
export function PageViewTracker() {
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    // Track page view on mount and path change
    const trackView = async () => {
      // Get user ID if logged in
      const { data } = await supabase.auth.getUser()
      const userId = data.user?.id

      // Track the page view
      await trackPageView(window.location.href, userId)
    }

    trackView()
  }, [pathname, supabase])

  return null // This component doesn't render anything
}
