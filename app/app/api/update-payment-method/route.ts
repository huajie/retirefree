import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
})

/**
 * POST /api/update-payment-method
 * Create a Stripe checkout session in setup mode to update payment method
 */
export async function POST(request: NextRequest) {
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
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single()

    if (!subscription || !subscription.stripe_customer_id) {
      return NextResponse.json(
        { error: 'No subscription found' },
        { status: 404 }
      )
    }

    // Create a checkout session in setup mode to update payment method
    const session = await stripe.checkout.sessions.create({
      customer: subscription.stripe_customer_id,
      mode: 'setup',
      payment_method_types: ['card'],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || request.headers.get('origin')}/dashboard/billing?updated=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || request.headers.get('origin')}/dashboard/billing`,
    })

    return NextResponse.json({
      url: session.url,
    })
  } catch (error: any) {
    console.error('Update payment method error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create session' },
      { status: 500 }
    )
  }
}
