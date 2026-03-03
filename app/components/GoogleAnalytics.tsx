'use client'

import { useEffect } from 'react'
import Script from 'next/script'

const GA_MEASUREMENT_ID = 'G-WRFN778Y9W'

export function GoogleAnalytics() {
  useEffect(() => {
    // Send pageview when component mounts
    if (typeof window !== 'undefined' && (window as any).gtag) {
      console.log('Sending pageview to GA')
      ;(window as any).gtag('event', 'page_view', {
        page_path: window.location.pathname,
        page_title: document.title,
      })
    }
  }, [])

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
            console.log('GA initialized:', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />
    </>
  )
}
