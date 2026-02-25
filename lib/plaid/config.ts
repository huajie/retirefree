import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid'

/**
 * Plaid client configuration
 * Uses environment variables for API credentials
 */
const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
})

export const plaidClient = new PlaidApi(configuration)

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
