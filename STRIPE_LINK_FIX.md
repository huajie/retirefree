# How to Disable Stripe Link (Fix SMS Verification Issue)

## Problem
When users try to checkout, they're redirected to a Stripe Link page asking for SMS verification, which doesn't work in test mode.

## Solution
Disable Stripe Link in your Stripe Dashboard (recommended) or use code workaround.

---

## Option 1: Disable in Stripe Dashboard (RECOMMENDED)

### Steps:
1. Go to: https://dashboard.stripe.com/test/settings/payment_methods
2. Click on **Settings** → **Payment methods**
3. Scroll down to find **"Link"**
4. Click the **toggle to disable** Stripe Link
5. Click **Save**

### Test Mode vs Production:
- You need to do this for BOTH test mode and production mode
- Switch between modes using the toggle in top-left of Stripe Dashboard

**Test mode:** https://dashboard.stripe.com/test/settings/payment_methods
**Production:** https://dashboard.stripe.com/settings/payment_methods

---

## Option 2: Code Workaround (Not Reliable)

The `payment_method_collection: 'always'` parameter in the code doesn't reliably disable Stripe Link. Stripe's API doesn't provide a direct way to disable Link per checkout session.

### Current code (doesn't work):
```typescript
const session = await stripe.checkout.sessions.create({
  customer: customerId,
  payment_method_types: ['card'],
  payment_method_collection: 'always', // ❌ Doesn't actually disable Link
  // ...
})
```

### Alternative (causes other issues):
Using `customer_email` instead of `customer` can avoid Link, but breaks webhook logic:
```typescript
const session = await stripe.checkout.sessions.create({
  customer_email: user.email, // Avoids Link but...
  // ❌ Webhook won't have customer ID
  // ❌ Customer won't be reused for future purchases
})
```

---

## Why This Happens

Stripe Link is a feature that lets customers save their payment info across different merchants. When enabled:

1. Stripe detects the customer's email
2. Checks if they've used Link before
3. Sends an SMS to verify identity
4. In test mode, SMS doesn't actually send → stuck

**In test mode:** SMS verification doesn't work, so users get stuck.
**In production:** SMS works, but adds friction to checkout.

---

## Recommendation

**Disable Stripe Link entirely** (Option 1) because:

✅ Simpler checkout flow (less friction)
✅ Works in both test and production
✅ No SMS verification step
✅ Faster conversion rate
❌ Users can't save payment info across merchants (not important for subscription business)

---

## After Disabling

1. Test the checkout flow again at: https://app-nine-gamma-71.vercel.app
2. Click "Start Trial"
3. Use test card: `4242 4242 4242 4242`
4. You should go directly to card entry form (no SMS page)
5. Complete payment
6. Subscription should activate immediately

---

## Current Status

- Code has `payment_method_collection: 'always'` (doesn't work)
- Stripe Link is still enabled in Dashboard
- Users are getting stuck on SMS verification page

**Action Required:** Disable Link in Stripe Dashboard (both test and production modes)

---

_Last Updated: March 3, 2026_
