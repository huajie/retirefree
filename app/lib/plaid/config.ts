import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid'

/**
 * Check if Plaid is properly configured
 */
export function isPlaidConfigured(): boolean {
  return !!(
    process.env.PLAID_CLIENT_ID &&
    process.env.PLAID_SECRET &&
    process.env.PLAID_ENV
  )
}

/**
 * Plaid client configuration
 * Uses environment variables for API credentials
 * Lazy initialization to avoid errors when Plaid is not configured
 */
let _plaidClient: PlaidApi | null = null

export function getPlaidClient(): PlaidApi {
  if (!_plaidClient) {
    if (!isPlaidConfigured()) {
      throw new Error('Plaid is not configured. Please set PLAID_CLIENT_ID, PLAID_SECRET, and PLAID_ENV environment variables.')
    }

    const configuration = new Configuration({
      basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
      baseOptions: {
        headers: {
          'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
          'PLAID-SECRET': process.env.PLAID_SECRET,
        },
      },
    })

    _plaidClient = new PlaidApi(configuration)
  }

  return _plaidClient
}

// For backward compatibility - export plaidClient
// This is safe because the Proxy only triggers getPlaidClient() when methods are accessed
export const plaidClient: PlaidApi = new Proxy({} as PlaidApi, {
  get(_target, prop) {
    const client = getPlaidClient()
    const value = client[prop as keyof PlaidApi]
    return typeof value === 'function' ? value.bind(client) : value
  }
})

/**
 * Plaid products we want to use
 */
export const PLAID_PRODUCTS = ['transactions', 'auth', 'investments'] as const

/**
 * Country codes supported
 */
export const PLAID_COUNTRY_CODES = ['US'] as const

/**
 * Environment check
 */
export const PLAID_ENV = process.env.PLAID_ENV || 'sandbox'
