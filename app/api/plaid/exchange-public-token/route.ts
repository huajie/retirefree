import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { plaidClient } from '@/lib/plaid/config'
import { savePlaidItem, saveFinancialAccounts } from '@/lib/plaid/service'

/**
 * POST /api/plaid/exchange-public-token
 * Exchanges a public token from Plaid Link for an access token
 * and saves the connected accounts to the database
 */
export async function POST(req: NextRequest) {
  try {
    // Get authenticated user
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse request body
    const { public_token } = await req.json()

    if (!public_token) {
      return NextResponse.json(
        { error: 'public_token is required' },
        { status: 400 }
      )
    }

    // Exchange public token for access token
    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token,
    })

    const accessToken = exchangeResponse.data.access_token
    const itemId = exchangeResponse.data.item_id

    // Get institution info
    let institutionName: string | undefined
    let institutionId: string | undefined

    try {
      const itemResponse = await plaidClient.itemGet({
        access_token: accessToken,
      })

      institutionId = itemResponse.data.item.institution_id || undefined

      if (institutionId) {
        const institutionResponse = await plaidClient.institutionsGetById({
          institution_id: institutionId,
          country_codes: ['US'],
        })
        institutionName = institutionResponse.data.institution.name
      }
    } catch (error) {
      console.error('Error fetching institution info:', error)
      // Continue without institution info
    }

    // Save Plaid item to database
    const plaidItem = await savePlaidItem(
      user.id,
      itemId,
      accessToken,
      institutionName,
      institutionId
    )

    // Get accounts from Plaid
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    })

    const accounts = accountsResponse.data.accounts

    // Save accounts to database
    await saveFinancialAccounts(user.id, plaidItem.id, accounts)

    return NextResponse.json({
      success: true,
      item_id: itemId,
      accounts_count: accounts.length,
      institution_name: institutionName,
    })
  } catch (error: any) {
    console.error('Error exchanging public token:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to exchange public token' },
      { status: 500 }
    )
  }
}
