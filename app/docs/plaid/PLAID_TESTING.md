# Plaid Integration Testing Guide

This guide will help you test the Plaid integration for RetireFree in sandbox mode.

## Table of Contents
- [Setup Plaid Account](#setup-plaid-account)
- [Configure Environment Variables](#configure-environment-variables)
- [Run Database Migrations](#run-database-migrations)
- [Testing in Sandbox Mode](#testing-in-sandbox-mode)
- [Testing Checklist](#testing-checklist)
- [Common Issues](#common-issues)
- [Moving to Production](#moving-to-production)

---

## Setup Plaid Account

### 1. Sign Up for Plaid
1. Go to [https://dashboard.plaid.com/signup](https://dashboard.plaid.com/signup)
2. Create a free account
3. Complete the onboarding process
4. You'll automatically start in Sandbox mode (free, unlimited testing)

### 2. Get Your API Keys
1. Log in to [Plaid Dashboard](https://dashboard.plaid.com/)
2. Navigate to **Team Settings** > **Keys**
3. Copy your credentials:
   - **Client ID**: Your unique identifier
   - **Sandbox Secret**: For sandbox testing
   - **Development Secret**: For development mode (first 100 users free)

### 3. Enable Required Products
1. In the dashboard, go to **Products**
2. Ensure these products are enabled:
   - ✅ **Auth** (account verification)
   - ✅ **Transactions** (transaction data)
   - ✅ **Investments** (investment account data)

---

## Configure Environment Variables

### 1. Update `.env.local`
Add these environment variables to your `.env.local` file:

```bash
# Plaid Integration
PLAID_CLIENT_ID=your_actual_client_id_here
PLAID_SECRET=your_sandbox_secret_here
PLAID_ENV=sandbox
```

**Important**:
- Use your actual Client ID (starts with a random string)
- Use your Sandbox Secret (starts with a random string)
- Keep `PLAID_ENV=sandbox` for testing

### 2. Verify Configuration
Run this command to verify Plaid is configured:

```bash
cd /workspace/group/retirefree/app
npm run dev
```

Visit `http://localhost:3000` and check the console for any Plaid-related errors.

---

## Run Database Migrations

### 1. Execute SQL Schema
1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your RetireFree project
3. Go to **SQL Editor**
4. Copy the contents of `supabase-plaid-schema.sql`
5. Paste and click **Run**

### 2. Verify Tables
Check that these tables were created:
- `plaid_items`
- `financial_accounts`
- `account_balance_history`

You can verify by running:
```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name LIKE '%plaid%' OR table_name LIKE '%financial%';
```

---

## Testing in Sandbox Mode

### Sandbox Test Credentials

Plaid provides test banks in sandbox mode. Use these credentials:

#### Test Bank: "First Platypus Bank"
- **Institution**: Search for "Platypus" in Plaid Link
- **Username**: `user_good`
- **Password**: `pass_good`
- **MFA Code**: `1234` (if prompted)

#### Test Bank: "Tattersall Federal Credit Union"
- **Institution**: Search for "Tattersall"
- **Username**: `user_good`
- **Password**: `pass_good`

#### Account Types in Sandbox:
When you connect with `user_good`, you'll get:
- Checking account with ~$100
- Savings account with ~$210
- Credit card with balance
- Investment accounts (401k, IRA) with various balances

### Special Test Scenarios

#### Test Authentication Error:
- **Username**: `user_bad`
- **Password**: (any)
- **Result**: Authentication fails (tests error handling)

#### Test Account Locked:
- **Username**: `locked_account`
- **Password**: (any)
- **Result**: Account locked error

#### Test Investment Accounts Only:
- **Username**: `user_good`
- Look for accounts marked as "investment" type

---

## Testing Checklist

Use this checklist to ensure everything works:

### ✅ Connection Flow
- [ ] Navigate to `/dashboard/accounts`
- [ ] Click "Connect Bank Account"
- [ ] Plaid Link modal opens
- [ ] Search for "Platypus"
- [ ] Enter test credentials (`user_good` / `pass_good`)
- [ ] Successfully connect accounts
- [ ] Accounts appear on dashboard

### ✅ Account Display
- [ ] All connected accounts are visible
- [ ] Account names are correct
- [ ] Balances are displayed accurately
- [ ] Account types are labeled correctly (401k, IRA, Checking, etc.)
- [ ] Institution name shows correctly

### ✅ Sync Functionality
- [ ] Click "Sync All" button
- [ ] Loading state appears
- [ ] Balances update (may not change in sandbox, but should complete without error)
- [ ] "Last synced" timestamp updates

### ✅ Calculator Integration
- [ ] Go to homepage (calculator)
- [ ] If logged in with connected accounts, "Total Retirement Savings" auto-fills
- [ ] Amount matches investment account total
- [ ] Helper text shows "Auto-filled from $X in connected accounts"
- [ ] Manual override still works

### ✅ Disconnect Flow
- [ ] Click "Disconnect" on an institution
- [ ] Confirmation dialog appears
- [ ] Confirm disconnect
- [ ] All accounts from that institution are removed
- [ ] Page refreshes and accounts are gone

### ✅ Multiple Connections
- [ ] Connect "Platypus" bank
- [ ] Connect "Tattersall" bank
- [ ] Both institutions appear separately
- [ ] Total portfolio reflects all accounts
- [ ] Can disconnect each independently

### ✅ Error Handling
- [ ] Try connecting with `user_bad` credentials
- [ ] Error message appears
- [ ] Can retry connection
- [ ] Dashboard still works after error

---

## Common Issues

### Issue: "Plaid is not configured" error
**Solution**:
- Verify `.env.local` has correct values
- Ensure no extra spaces in environment variables
- Restart your Next.js dev server: `npm run dev`

### Issue: Link token creation fails
**Solution**:
- Check that PLAID_CLIENT_ID and PLAID_SECRET are correct
- Verify you're using the Sandbox secret (not Development)
- Check Plaid Dashboard for API status

### Issue: Accounts not saving to database
**Solution**:
- Check Supabase SQL logs for errors
- Verify Row Level Security (RLS) policies are set up correctly
- Ensure user is authenticated when connecting accounts
- Check browser console for errors

### Issue: Balances showing as $0
**Solution**:
- In sandbox, some test accounts may have $0 balance
- Try using `user_good` credentials
- Check account type - some types may not have balances in sandbox

### Issue: "Institution not found"
**Solution**:
- Sandbox has limited institutions
- Search for "Platypus" or "Tattersall" (guaranteed to work)
- Don't search for real banks in sandbox mode

### Issue: Calculator not auto-filling
**Solution**:
- Ensure you're logged in
- Verify you have connected **investment** accounts (not just checking/savings)
- Check browser console for fetch errors
- Verify `financial_accounts` table has data for your user

---

## Moving to Production

### Before Going Live:

#### 1. Complete Plaid's Production Approval
- In Plaid Dashboard, go to **Team Settings** > **Compliance**
- Fill out required information
- Submit for production access approval
- Wait for approval (usually 1-3 business days)

#### 2. Update Environment Variables
```bash
# Production Plaid credentials
PLAID_CLIENT_ID=same_as_sandbox  # Client ID stays the same
PLAID_SECRET=your_production_secret  # Get from Plaid Dashboard
PLAID_ENV=production  # Change from 'sandbox' to 'production'
PLAID_WEBHOOK_URL=https://retirefree.app/api/plaid/webhook  # For real-time updates
```

#### 3. Pricing Considerations
- **Sandbox**: Free, unlimited
- **Development**: First 100 live users free
- **Production**: ~$0.10-0.30 per account per month
- **Optimize costs**: Only sync when user clicks "Sync" (not on every page load)

#### 4. Set Up Webhooks (Optional but Recommended)
Create `/app/api/plaid/webhook/route.ts` to handle:
- Item errors (re-authentication needed)
- Account updates
- Transaction updates

#### 5. Test in Development Mode First
Before going to production:
1. Change `PLAID_ENV=development`
2. Test with real bank accounts (yours or test users)
3. Verify everything works with real data
4. Then switch to `PLAID_ENV=production`

#### 6. Monitor Usage
- Track API calls in Plaid Dashboard
- Set up alerts for errors
- Monitor database growth
- Check sync frequency

---

## Support Resources

- **Plaid Documentation**: [https://plaid.com/docs/](https://plaid.com/docs/)
- **Plaid API Reference**: [https://plaid.com/docs/api/](https://plaid.com/docs/api/)
- **Plaid Support**: support@plaid.com
- **Status Page**: [https://status.plaid.com/](https://status.plaid.com/)

---

## Quick Test Script

Run this test sequence to verify everything:

1. **Sign up / Log in** to RetireFree
2. **Go to** `/dashboard/accounts`
3. **Click** "Connect Bank Account"
4. **Search** for "Platypus"
5. **Login** with `user_good` / `pass_good`
6. **Verify** accounts appear
7. **Click** "Sync All"
8. **Go to** homepage
9. **Check** that savings amount auto-fills
10. **Calculate** retirement plan
11. **Return** to accounts
12. **Click** "Disconnect"
13. **Verify** accounts are removed

If all steps work, your Plaid integration is ready! 🎉
