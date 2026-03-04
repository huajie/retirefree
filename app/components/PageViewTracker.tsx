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

      // Track the page view in Supabase
      await trackPageView(window.location.href, userId)

      // Track page view in Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', 'G-WRFN778Y9W', {
          page_path: pathname,
        })
      }
    }

    trackView()
  }, [pathname, supabase])

  return null // This component doesn't render anything
}
