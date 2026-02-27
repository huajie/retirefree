import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
})

// Initialize Supabase client with service role key
// If service role key is not available, webhooks will fail but won't crash the build
const getSupabaseClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey || serviceRoleKey === 'xxx') {
    console.error('SUPABASE_SERVICE_ROLE_KEY is not set properly')
    return null
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey
  )
}

const supabase = getSupabaseClient()

/**
 * POST /api/webhooks/stripe
 * Handle Stripe webhook events
 */
export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    if (!supabase) {
      console.error('Supabase client not initialized - skipping webhook processing')
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutSessionCompleted(session)
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdate(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaymentSucceeded(invoice)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaymentFailed(invoice)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  if (!supabase) return

  const userId = session.metadata?.supabase_user_id

  if (!userId) {
    console.error('No user ID found in session metadata')
    return
  }

  const subscriptionId = session.subscription as string

  if (subscriptionId) {
    const subscriptionResponse = await stripe.subscriptions.retrieve(subscriptionId)
    const subscription = subscriptionResponse as any // Type workaround for new API version

    await supabase
      .from('subscriptions')
      .upsert({
        user_id: userId,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: subscriptionId,
        status: subscription.status,
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        trial_end: subscription.trial_end
          ? new Date(subscription.trial_end * 1000).toISOString()
          : null,
        cancel_at_period_end: subscription.cancel_at_period_end,
      })
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  if (!supabase) return

  const sub = subscription as any // Type workaround for new API version
  const userId = sub.metadata?.supabase_user_id

  if (!userId) {
    console.error('No user ID found in subscription metadata')
    return
  }

  await supabase
    .from('subscriptions')
    .upsert({
      user_id: userId,
      stripe_customer_id: sub.customer as string,
      stripe_subscription_id: sub.id,
      status: sub.status,
      current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
      trial_end: sub.trial_end
        ? new Date(sub.trial_end * 1000).toISOString()
        : null,
      cancel_at_period_end: sub.cancel_at_period_end,
    })
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  if (!supabase) return

  const sub = subscription as any // Type workaround for new API version
  const userId = sub.metadata?.supabase_user_id

  if (!userId) {
    console.error('No user ID found in subscription metadata')
    return
  }

  await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
      cancel_at_period_end: true,
    })
    .eq('stripe_subscription_id', sub.id)
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  if (!supabase) return

  const inv = invoice as any // Type workaround for new API version
  const subscriptionId = inv.subscription as string

  if (subscriptionId) {
    const subscriptionResponse = await stripe.subscriptions.retrieve(subscriptionId)
    const subscription = subscriptionResponse as any // Type workaround for new API version
    const userId = subscription.metadata?.supabase_user_id

    if (userId) {
      await supabase
        .from('subscriptions')
        .update({
          status: 'active',
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        })
        .eq('user_id', userId)
    }
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  if (!supabase) return

  const inv = invoice as any // Type workaround for new API version
  const subscriptionId = inv.subscription as string

  if (subscriptionId) {
    const subscriptionResponse = await stripe.subscriptions.retrieve(subscriptionId)
    const subscription = subscriptionResponse as any // Type workaround for new API version
    const userId = subscription.metadata?.supabase_user_id

    if (userId) {
      await supabase
        .from('subscriptions')
        .update({
          status: 'past_due',
        })
        .eq('user_id', userId)
    }
  }
}
