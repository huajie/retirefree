import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { deletePlaidItem } from '@/lib/plaid/service'

/**
 * DELETE /api/plaid/remove-item
 * Removes a Plaid item connection and all associated accounts
 */
export async function DELETE(req: NextRequest) {
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
    const { item_id } = await req.json()

    if (!item_id) {
      return NextResponse.json(
        { error: 'item_id is required' },
        { status: 400 }
      )
    }

    // Verify the item belongs to the user before deletion
    const { data: item, error: itemError } = await supabase
      .from('plaid_items')
      .select('id')
      .eq('id', item_id)
      .eq('user_id', user.id)
      .single()

    if (itemError || !item) {
      return NextResponse.json(
        { error: 'Item not found or unauthorized' },
        { status: 404 }
      )
    }

    // Delete the item (this will also remove from Plaid and cascade delete accounts)
    await deletePlaidItem(user.id, item_id)

    return NextResponse.json({
      success: true,
      message: 'Bank connection removed successfully',
    })
  } catch (error: any) {
    console.error('Error removing Plaid item:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to remove bank connection' },
      { status: 500 }
    )
  }
}
