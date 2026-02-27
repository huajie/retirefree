/**
 * Analytics Tracker for RetireFree
 * Tracks page views, affiliate clicks, and user events
 */

export interface TrackingEvent {
  event_type: string
  page_url: string
  referrer?: string
  user_id?: string
  metadata?: Record<string, any>
  timestamp: string
}

/**
 * Track a page view
 */
export async function trackPageView(
  pageUrl: string,
  userId?: string,
  metadata?: Record<string, any>
) {
  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: 'page_view',
        page_url: pageUrl,
        referrer: document.referrer,
        user_id: userId,
        metadata,
        timestamp: new Date().toISOString(),
      }),
    })
  } catch (error) {
    console.error('Failed to track page view:', error)
  }
}

/**
 * Track an affiliate link click
 */
export async function trackAffiliateClick(
  toolName: string,
  affiliateUrl: string,
  userId?: string,
  location?: string
) {
  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: 'affiliate_click',
        page_url: window.location.href,
        referrer: document.referrer,
        user_id: userId,
        metadata: {
          tool_name: toolName,
          affiliate_url: affiliateUrl,
          location: location, // e.g., 'dashboard', 'blog_post'
        },
        timestamp: new Date().toISOString(),
      }),
    })
  } catch (error) {
    console.error('Failed to track affiliate click:', error)
  }
}

/**
 * Track custom event
 */
export async function trackEvent(
  eventType: string,
  metadata?: Record<string, any>,
  userId?: string
) {
  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: eventType,
        page_url: window.location.href,
        referrer: document.referrer,
        user_id: userId,
        metadata,
        timestamp: new Date().toISOString(),
      }),
    })
  } catch (error) {
    console.error('Failed to track event:', error)
  }
}

/**
 * Track calculator usage
 */
export async function trackCalculatorUse(
  calculatorData: {
    age?: number
    savings?: number
    monthly_expenses?: number
    risk_tolerance?: string
  },
  userId?: string
) {
  await trackEvent('calculator_use', calculatorData, userId)
}

/**
 * Track signup/conversion
 */
export async function trackSignup(userId: string, source?: string) {
  await trackEvent('signup', { source }, userId)
}

/**
 * Track subscription purchase
 */
export async function trackSubscription(
  userId: string,
  plan: string,
  amount: number
) {
  await trackEvent('subscription_purchase', { plan, amount }, userId)
}
