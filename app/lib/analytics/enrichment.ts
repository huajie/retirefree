/**
 * Analytics Enrichment Functions
 * Extracts device, browser, OS, and traffic source information
 */

export interface DeviceInfo {
  type: 'mobile' | 'tablet' | 'desktop'
  browser: string
  os: string
  screenWidth?: number
  screenHeight?: number
}

export interface TrafficSource {
  source: string // 'organic', 'direct', 'social', 'referral', 'email', 'paid'
  medium: string // 'search', 'cpc', 'social', etc.
  campaign?: string
  referrer_domain?: string
}

/**
 * Detect device type from user agent
 */
export function getDeviceInfo(userAgent: string): DeviceInfo {
  const ua = userAgent.toLowerCase()

  // Detect device type
  let type: 'mobile' | 'tablet' | 'desktop' = 'desktop'

  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    type = 'tablet'
  } else if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      userAgent
    )
  ) {
    type = 'mobile'
  }

  // Detect browser
  let browser = 'unknown'
  if (ua.includes('firefox')) browser = 'Firefox'
  else if (ua.includes('edg')) browser = 'Edge'
  else if (ua.includes('chrome')) browser = 'Chrome'
  else if (ua.includes('safari')) browser = 'Safari'
  else if (ua.includes('opera')) browser = 'Opera'

  // Detect OS
  let os = 'unknown'
  if (ua.includes('windows')) os = 'Windows'
  else if (ua.includes('mac')) os = 'macOS'
  else if (ua.includes('linux')) os = 'Linux'
  else if (ua.includes('android')) os = 'Android'
  else if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) os = 'iOS'

  return { type, browser, os }
}

/**
 * Get device info from browser (client-side)
 */
export function getClientDeviceInfo(): DeviceInfo {
  const userAgent = navigator.userAgent
  const deviceInfo = getDeviceInfo(userAgent)

  return {
    ...deviceInfo,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
  }
}

/**
 * Categorize traffic source from referrer and URL parameters
 */
export function categorizeTrafficSource(
  referrer: string,
  currentUrl: string
): TrafficSource {
  const url = new URL(currentUrl)

  // Check for UTM parameters first
  const utmSource = url.searchParams.get('utm_source')
  const utmMedium = url.searchParams.get('utm_medium')
  const utmCampaign = url.searchParams.get('utm_campaign')

  if (utmSource || utmMedium) {
    return {
      source: utmSource || categorizeReferrerSource(referrer),
      medium: utmMedium || 'unknown',
      campaign: utmCampaign || undefined,
      referrer_domain: referrer ? new URL(referrer).hostname : undefined,
    }
  }

  // No UTM parameters, categorize by referrer
  if (!referrer || referrer === '') {
    return {
      source: 'direct',
      medium: 'none',
    }
  }

  const referrerUrl = new URL(referrer)
  const referrerDomain = referrerUrl.hostname

  // Check if same domain (internal navigation)
  if (referrerDomain === url.hostname) {
    return {
      source: 'internal',
      medium: 'referral',
      referrer_domain: referrerDomain,
    }
  }

  return {
    source: categorizeReferrerSource(referrer),
    medium: getMediumFromSource(categorizeReferrerSource(referrer)),
    referrer_domain: referrerDomain,
  }
}

/**
 * Categorize source from referrer URL
 */
function categorizeReferrerSource(referrer: string): string {
  if (!referrer) return 'direct'

  const domain = new URL(referrer).hostname.toLowerCase()

  // Search engines
  const searchEngines = [
    'google',
    'bing',
    'yahoo',
    'duckduckgo',
    'baidu',
    'yandex',
  ]
  if (searchEngines.some((engine) => domain.includes(engine))) {
    return 'organic'
  }

  // Social media
  const socialPlatforms = [
    'facebook',
    'twitter',
    'linkedin',
    'instagram',
    'reddit',
    'pinterest',
    'tiktok',
    'youtube',
  ]
  if (socialPlatforms.some((platform) => domain.includes(platform))) {
    return 'social'
  }

  // Email
  const emailPlatforms = ['mail', 'gmail', 'outlook', 'yahoo']
  if (emailPlatforms.some((platform) => domain.includes(platform))) {
    return 'email'
  }

  // Default to referral
  return 'referral'
}

/**
 * Get medium from source type
 */
function getMediumFromSource(source: string): string {
  switch (source) {
    case 'organic':
      return 'search'
    case 'social':
      return 'social'
    case 'email':
      return 'email'
    case 'direct':
      return 'none'
    default:
      return 'referral'
  }
}

/**
 * Calculate session ID (simple implementation)
 * In production, you might want to use a more sophisticated session tracking
 */
export function getSessionId(): string {
  const sessionKey = '_retirefree_session'

  // Check if session exists in sessionStorage
  let sessionId = sessionStorage.getItem(sessionKey)

  if (!sessionId) {
    // Generate new session ID
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    sessionStorage.setItem(sessionKey, sessionId)
  }

  return sessionId
}

/**
 * Check if this is first page of session (for bounce rate calculation)
 */
export function isFirstPageView(): boolean {
  const firstPageKey = '_retirefree_first_page'
  const isFirst = !sessionStorage.getItem(firstPageKey)

  if (isFirst) {
    sessionStorage.setItem(firstPageKey, 'true')
  }

  return isFirst
}

/**
 * Get page load time (for performance tracking)
 */
export function getPageLoadTime(): number | undefined {
  if (typeof window === 'undefined') return undefined

  const perfData = window.performance.timing
  if (!perfData) return undefined

  const loadTime = perfData.loadEventEnd - perfData.navigationStart
  return loadTime > 0 ? loadTime : undefined
}
