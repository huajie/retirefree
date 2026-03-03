'use client'

import { useEffect } from 'react'

const GA_MEASUREMENT_ID = 'G-WRFN778Y9W'

export function GoogleAnalytics() {
  useEffect(() => {
    // Check if already loaded
    if (document.querySelector(`script[src*="googletagmanager"]`)) {
      console.log('GA already loaded')
      return
    }

    console.log('Loading Google Analytics...')

    // Load Google Analytics script
    const script1 = document.createElement('script')
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    script1.async = true
    document.head.appendChild(script1)

    // Initialize gtag after script loads
    script1.onload = () => {
      console.log('GA script loaded, initializing...')
      const script2 = document.createElement('script')
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', {
          page_path: window.location.pathname,
        });
        console.log('GA initialized with ID: ${GA_MEASUREMENT_ID}');
      `
      document.head.appendChild(script2)
    }
  }, [])

  return null
}
