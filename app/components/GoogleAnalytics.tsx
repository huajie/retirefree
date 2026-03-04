'use client'

import { useEffect } from 'react'

const GA_MEASUREMENT_ID = 'G-WRFN778Y9W'

export function GoogleAnalytics() {
  useEffect(() => {
    // Load gtag.js script
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    script.async = true
    document.head.appendChild(script)

    // Initialize gtag after script loads
    script.onload = () => {
      // Initialize dataLayer
      (window as any).dataLayer = (window as any).dataLayer || []
      function gtag(...args: any[]) {
        ;(window as any).dataLayer.push(args)
      }
      (window as any).gtag = gtag

      // Configure GA
      gtag('js', new Date())
      gtag('config', GA_MEASUREMENT_ID, {
        page_path: window.location.pathname,
      })

      console.log('✅ GA initialized:', GA_MEASUREMENT_ID)
    }
  }, [])

  return null
}
