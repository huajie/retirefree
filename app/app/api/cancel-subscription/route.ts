import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
})

/**
 * POST /api/cancel-subscription
 * Cancel user's subscription at the end of the billing period
 */
export async function POST() {
  try {
    const supabase = await createClient()

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's subscription
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('stripe_subscription_id')
      .eq('user_id', user.id)
      .single()

    if (!subscription || !subscription.stripe_subscription_id) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 404 }
      )
    }

    // Cancel subscription at period end (user keeps access until then)
    const updatedSubscription = await stripe.subscriptions.update(
      subscription.stripe_subscription_id,
      {
        cancel_at_period_end: true,
      }
    )

    // Update database
    await supabase
      .from('subscriptions')
      .update({
        cancel_at_period_end: true,
      })
      .eq('user_id', user.id)

    return NextResponse.json({
      success: true,
      cancel_at: updatedSubscription.current_period_end,
    })
  } catch (error: any) {
    console.error('Cancel subscription error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to cancel subscription' },
      { status: 500 }
    )
  }
}
