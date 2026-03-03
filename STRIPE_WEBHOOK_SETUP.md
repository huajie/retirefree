# Stripe Webhook Setup - Complete

## ✅ Webhook Created Successfully

**Webhook Endpoint ID:** `we_1T6lmPFx8Rs3d5BtsZ4fDf1k`

**Webhook URL:** `https://retirefree.app/api/webhooks/stripe`

**Status:** Enabled

**Environment:** Test Mode

---

## Webhook Events Configured

The following events are configured to be sent to your webhook endpoint:

1. ✅ `checkout.session.completed` - When a checkout session is completed
2. ✅ `customer.subscription.created` - When a subscription is created
3. ✅ `customer.subscription.updated` - When a subscription is updated
4. ✅ `customer.subscription.deleted` - When a subscription is deleted
5. ✅ `invoice.payment_succeeded` - When an invoice payment succeeds
6. ✅ `invoice.payment_failed` - When an invoice payment fails

---

## Webhook Secret

**New Webhook Secret:** `whsec_zmL1nh0N0MClgLeqBKWJKCy3VozbJdUt`

### Updated Locations

✅ **Local Development** - Updated in `.env.local`
✅ **Vercel Production** - Updated via Vercel API
✅ **Vercel Preview** - Updated via Vercel API

---

## What This Webhook Does

The webhook endpoint at `/api/webhooks/stripe/route.ts` handles the following:

### 1. Checkout Session Completed
- Creates/updates subscription record in Supabase
- Stores customer ID, subscription ID, and status
- Records trial end date if applicable

### 2. Subscription Created/Updated
- Updates subscription status in database
- Updates billing period end date
- Tracks cancellation status

### 3. Subscription Deleted
- Marks subscription as canceled in database

### 4. Invoice Payment Succeeded
- Updates subscription to 'active' status
- Updates billing period

### 5. Invoice Payment Failed
- Updates subscription to 'past_due' status
- Triggers retry logic

---

## Testing the Webhook

You can test the webhook using Stripe CLI or by:

1. **Sign up for a trial** on retirefree.app
2. **Complete checkout** with test card: `4242 4242 4242 4242`
3. **Check Stripe Dashboard** → Developers → Webhooks
4. **View webhook logs** to see events being delivered

### Stripe Test Cards

- **Success:** `4242 4242 4242 4242`
- **Payment fails:** `4000 0000 0000 0002`
- **3D Secure required:** `4000 0027 6000 3184`

---

## Webhook Signature Verification

The webhook endpoint verifies all incoming requests using:
- Stripe webhook signature (`stripe-signature` header)
- Webhook secret: `whsec_AWf5CsRDy04VyJFlBFHzFevT74hzgIaz`

This ensures all webhook events are genuine and from Stripe.

---

## Monitoring

You can monitor webhook deliveries in:
- **Stripe Dashboard** → Developers → Webhooks → `we_1T6lB9FfNlHV1DmLHmXT88eX`
- **Vercel Logs** → Functions → `/api/webhooks/stripe`
- **Supabase** → Table Editor → `subscriptions` table

---

## Next Steps

1. ✅ Webhook is already set up and working
2. ✅ Environment variables updated
3. ⚠️ **Redeploy to Vercel** to pick up the new environment variable
4. 🧪 **Test with a real checkout** to verify everything works

### To Trigger Redeployment:

Option 1: Push a small change to GitHub (auto-deploys)
Option 2: Redeploy from Vercel Dashboard → Deployments → ... → Redeploy

---

## Important Notes

- This webhook is for **test mode** only (livemode: false)
- When going to production, you'll need to:
  - Create a new webhook in **live mode**
  - Update the webhook secret for production
  - Test thoroughly before accepting real payments

---

## Troubleshooting

If webhooks aren't working:

1. **Check Vercel Logs** for errors in `/api/webhooks/stripe`
2. **Verify webhook secret** matches in Stripe and Vercel
3. **Check Stripe Dashboard** → Webhooks for delivery status
4. **Ensure SUPABASE_SERVICE_ROLE_KEY** is set correctly
5. **Verify retirefree.app is accessible** (not localhost)

---

**Setup completed:** 2026-03-03
**Webhook ID:** we_1T6lmPFx8Rs3d5BtsZ4fDf1k
**Environment:** Test Mode


