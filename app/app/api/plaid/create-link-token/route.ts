import { NextRequest, NextResponse } from 'next/server'
import { Products, CountryCode } from 'plaid'
import { createClient } from '@/lib/supabase/server'
import { plaidClient, isPlaidConfigured } from '@/lib/plaid/config'

/**
 * POST /api/plaid/create-link-token
 * Creates a Plaid Link token for the authenticated user
 */
export async function POST(req: NextRequest) {
  try {
    // Check if Plaid is configured
    if (!isPlaidConfigured()) {
      return NextResponse.json(
        { error: 'Plaid is not configured. Please add PLAID_CLIENT_ID, PLAID_SECRET, and PLAID_ENV to environment variables.' },
        { status: 500 }
      )
    }

    // Get authenticated user
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Create link token
    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: user.id,
      },
      client_name: 'RetireFree',
      products: [Products.Transactions, Products.Auth, Products.Investments],
      country_codes: [CountryCode.Us],
      language: 'en',
      webhook: process.env.PLAID_WEBHOOK_URL,
    })

    return NextResponse.json({ link_token: response.data.link_token })
  } catch (error: any) {
    console.error('Error creating link token:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create link token' },
      { status: 500 }
    )
  }
}
