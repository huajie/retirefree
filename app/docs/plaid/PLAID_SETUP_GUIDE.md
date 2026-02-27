# Plaid Integration Setup Guide for RetireFree

This guide provides step-by-step instructions to get the Plaid integration up and running.

## Quick Setup (5 minutes)

### Step 1: Get Plaid API Keys

1. **Sign up for Plaid** (if you haven't already):
   - Go to [https://dashboard.plaid.com/signup](https://dashboard.plaid.com/signup)
   - Create a free account
   - Complete the onboarding

2. **Get your API credentials**:
   - Log in to [Plaid Dashboard](https://dashboard.plaid.com/)
   - Go to **Team Settings** → **Keys**
   - Copy these values:
     - `client_id` (looks like: `6331f2a8f9cd3a001234abcd`)
     - `sandbox` secret (looks like: `8a9f1c2e3d4b5a6c7d8e9f0a1b2c3d4e`)

### Step 2: Add Environment Variables

Add these to your `.env.local` file:

```bash
# Plaid Integration
PLAID_CLIENT_ID=your_actual_client_id_here
PLAID_SECRET=your_sandbox_secret_here
PLAID_ENV=sandbox
```

Replace the placeholder values with your actual credentials from Step 1.

### Step 3: Run Database Migrations

1. Open your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your RetireFree project
3. Go to **SQL Editor**
4. Copy the entire contents of `/workspace/group/retirefree/app/supabase-plaid-schema.sql`
5. Paste into the SQL editor
6. Click **Run**
7. Verify the tables were created (no errors should appear)

### Step 4: Test the Integration

1. **Start your dev server**:
   ```bash
   cd /workspace/group/retirefree/app
   npm run dev
   ```

2. **Visit** `http://localhost:3000` and log in (or sign up)

3. **Navigate to** `/dashboard/accounts`

4. **Click** "Connect Bank Account"

5. **Search for** "Platypus" (test bank in sandbox)

6. **Login with**:
   - Username: `user_good`
   - Password: `pass_good`
   - MFA (if asked): `1234`

7. **Verify** that accounts appear on the dashboard

8. **Go to homepage** and check that the calculator auto-fills savings amount

**That's it!** You now have Plaid integration working in sandbox mode.

---

## What Was Installed

### NPM Packages
- `plaid` - Official Plaid Node.js SDK
- `react-plaid-link` - React component for Plaid Link

### Database Tables Created
- `plaid_items` - Stores bank connections
- `financial_accounts` - Stores individual accounts (checking, savings, 401k, IRA, etc.)
- `account_balance_history` - Tracks balance changes over time

### API Routes Created
- `POST /api/plaid/create-link-token` - Generates link token for Plaid Link
- `POST /api/plaid/exchange-public-token` - Exchanges public token for access token
- `POST /api/plaid/sync-accounts` - Syncs account balances from Plaid
- `DELETE /api/plaid/remove-item` - Disconnects a bank connection

### Pages Created
- `/dashboard/accounts` - Account management dashboard
  - View all connected accounts
  - See total portfolio value
  - Connect new accounts
  - Sync balances
  - Disconnect accounts

### Components Created
- `PlaidLink` - React component that launches Plaid Link modal

### Updated Features
- Calculator now auto-fills "Total Retirement Savings" from connected investment accounts
- Navigation includes "Accounts" link for logged-in users
- Dashboard has "My Accounts" quick action button

---

## File Structure

```
retirefree/
├── app/
│   ├── api/
│   │   └── plaid/
│   │       ├── create-link-token/route.ts
│   │       ├── exchange-public-token/route.ts
│   │       ├── sync-accounts/route.ts
│   │       └── remove-item/route.ts
│   ├── dashboard/
│   │   └── accounts/
│   │       ├── page.tsx
│   │       └── AccountsClient.tsx
│   └── ...
├── components/
│   ├── PlaidLink.tsx
│   └── ...
├── lib/
│   └── plaid/
│       ├── config.ts (Plaid client configuration)
│       └── service.ts (Database operations)
├── supabase-plaid-schema.sql (Database schema)
├── .env.example (Updated with Plaid variables)
├── PLAID_TESTING.md (Testing documentation)
└── PLAID_SETUP_GUIDE.md (This file)
```

---

## How It Works

### 1. User Connects Bank Account

1. User clicks "Connect Bank Account"
2. Frontend calls `/api/plaid/create-link-token`
3. API creates a link token and returns it
4. PlaidLink component opens Plaid Link modal
5. User selects bank and enters credentials
6. Plaid returns a public token

### 2. Exchange Token & Save Accounts

1. Frontend calls `/api/plaid/exchange-public-token` with public token
2. API exchanges public token for access token (permanent)
3. API fetches institution info and account details from Plaid
4. API saves to database:
   - `plaid_items` table (bank connection)
   - `financial_accounts` table (individual accounts)

### 3. Display Accounts

1. User visits `/dashboard/accounts`
2. Server fetches accounts from `financial_accounts` table
3. Displays accounts grouped by institution
4. Shows balances, account types, last sync time

### 4. Sync Balances

1. User clicks "Sync All"
2. Frontend calls `/api/plaid/sync-accounts`
3. API fetches fresh balances from Plaid for all connected items
4. Updates `financial_accounts` table
5. Saves snapshot to `account_balance_history`

### 5. Auto-Fill Calculator

1. User visits homepage while logged in
2. Calculator component fetches user's investment accounts
3. Calculates total from `financial_accounts` where `account_type = 'investment'`
4. Auto-fills "Total Retirement Savings" field
5. Shows helper text: "Auto-filled from $X in connected accounts"

### 6. Disconnect Account

1. User clicks "Disconnect" on an institution
2. Frontend calls `/api/plaid/remove-item` with item ID
3. API calls Plaid to invalidate access token
4. API deletes from database (cascade deletes accounts)
5. Page refreshes to show updated list

---

## Security Notes

### Access Token Storage
- Access tokens are stored in `plaid_items.plaid_access_token`
- **Important**: These are sensitive! They allow full access to user's financial data
- Currently stored as plain text - consider encrypting in production
- Only accessible via Supabase service role (not exposed to client)

### Row Level Security (RLS)
- All Plaid tables have RLS enabled
- Users can only see their own data
- Policies enforce `user_id = auth.uid()` check

### API Security
- All API routes verify user authentication
- Only service role can read access tokens
- Public tokens are immediately exchanged and discarded

### Recommendations for Production
1. **Encrypt access tokens** at rest in database
2. **Set up Plaid webhooks** for real-time updates
3. **Implement rate limiting** on API routes
4. **Add error monitoring** (Sentry, LogRocket, etc.)
5. **Enable audit logging** for all account operations

---

## Troubleshooting

### "Plaid is not configured" Error
**Cause**: Environment variables not set correctly

**Fix**:
1. Check `.env.local` has all three Plaid variables
2. Ensure no extra spaces or quotes
3. Restart dev server: `npm run dev`

### Link Token Creation Fails
**Cause**: Invalid API credentials

**Fix**:
1. Verify `PLAID_CLIENT_ID` and `PLAID_SECRET` in Plaid Dashboard
2. Make sure you're using the **sandbox** secret (not development)
3. Check Plaid API status at [status.plaid.com](https://status.plaid.com)

### Accounts Not Saving
**Cause**: Database permissions or RLS issue

**Fix**:
1. Check Supabase logs for errors
2. Verify RLS policies were created correctly
3. Ensure user is authenticated when connecting

### Calculator Not Auto-Filling
**Cause**: No investment accounts or fetch error

**Fix**:
1. Connect accounts that are type "investment" (401k, IRA, brokerage)
2. Check browser console for errors
3. Verify accounts exist in database with correct `account_type`

---

## Next Steps

### Sandbox Testing
- See `PLAID_TESTING.md` for detailed testing instructions
- Test all flows: connect, sync, disconnect
- Try different test credentials

### Moving to Development
Once sandbox testing is complete:
1. Get development secret from Plaid Dashboard
2. Update `.env.local`: `PLAID_ENV=development`
3. Test with real bank accounts (first 100 users free)

### Going to Production
Before production:
1. Submit for Plaid production approval (1-3 days)
2. Get production secret
3. Update `.env.production`: `PLAID_ENV=production`
4. Set up webhooks for real-time updates
5. Implement error monitoring
6. Consider encrypting access tokens

---

## Support

- **Plaid Docs**: [plaid.com/docs](https://plaid.com/docs/)
- **Plaid Support**: support@plaid.com
- **Testing Guide**: See `PLAID_TESTING.md`
- **RetireFree Issues**: Check project README

---

## Cost Estimates

### Plaid Pricing
- **Sandbox**: Free, unlimited
- **Development**: First 100 users free, then $0.10-0.30/account/month
- **Production**: ~$0.10-0.30 per account per month

### Cost Optimization Tips
1. Only sync when user requests (not on every page load)
2. Use webhooks instead of polling
3. Archive inactive connections
4. Monitor usage in Plaid Dashboard

---

That's everything! You should now have a fully functional Plaid integration. 🎉
