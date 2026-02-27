# Transaction Tracking Feature - Testing Documentation

## Overview

This document describes how to test the new transaction tracking feature that allows users to sync their transactions from Plaid and view spending analysis.

## Database Setup

Before testing, you need to run the updated database schema in your Supabase SQL editor:

1. Log into your Supabase project
2. Go to the SQL Editor
3. Run the updated `supabase-plaid-schema.sql` file

The schema adds:
- `transactions` table - stores transaction data from Plaid
- `transaction_sync_status` table - tracks sync metadata
- Appropriate indexes and RLS policies

## Feature Components

### 1. Database Schema

**New Tables:**
- `transactions` - stores transaction details (date, amount, merchant, categories, etc.)
- `transaction_sync_status` - tracks when transactions were last synced per Plaid item

**Key Fields:**
- `amount` - negative for expenses, positive for income
- `category_primary` - main category (e.g., "Food and Drink")
- `category_detailed` - subcategory (e.g., "Restaurants > Fast Food")
- `pending` - whether transaction is pending

### 2. API Endpoints

**POST /api/plaid/sync-transactions**
- Syncs transactions for last 90 days from all connected accounts
- Returns transaction count, date range, and spending summary
- Excludes transfers and payments from spending totals

### 3. Frontend Pages

**/dashboard/spending**
- Displays spending summary and category breakdown
- Shows pie chart of spending by category
- Lists recent transactions
- Compares spending to calculator inputs
- Auto-syncs or manual sync button

## Testing Steps

### Step 1: Connect Bank Accounts

1. Log into your RetireFree account
2. Navigate to `/dashboard/accounts`
3. Click "Connect Bank Account"
4. Use Plaid Link to connect a test bank account
   - Use Plaid Sandbox credentials: `user_good` / `pass_good`
   - Select accounts to connect
5. Verify accounts appear on the Accounts page

### Step 2: Sync Transactions

1. Navigate to `/dashboard/spending`
2. You should see a prompt to "Sync Your Transactions"
3. Click the "Sync Transactions" button
4. Wait for the sync to complete (should take a few seconds)
5. Page will refresh automatically

**Expected Result:**
- Transaction count displayed in sync result
- Summary cards show total spent, monthly average, and income
- Category breakdown appears with pie chart
- Recent transactions listed

### Step 3: Verify Data Display

**Summary Cards:**
- Total Spent (90 days) - should show total expenses
- Monthly Average - should be ~1/3 of total spent
- Total Income (90 days) - should show income received

**Category Breakdown:**
- Pie chart showing top categories
- Category list with amounts and percentages
- Categories like "Food and Drink", "Shopping", "Healthcare", etc.

**Recent Transactions:**
- Up to 30 most recent transactions
- Each showing: merchant name, date, category, amount
- Expenses in red (negative), income in green (positive)
- Pending transactions marked if applicable

### Step 4: Test Calculator Comparison

1. Go to home page calculator (/#calculator)
2. Enter a monthly expenses value (e.g., $4,000)
3. Complete the calculation and save
4. Go back to `/dashboard/spending`
5. If your actual spending differs significantly from calculator input:
   - Should see a warning alert
   - Shows difference in dollars and percentage
   - Link to update calculator

### Step 5: Test Re-sync

1. On `/dashboard/spending` page
2. Click the "↻ Sync Transactions" button in top-right
3. Wait for sync to complete
4. Verify data updates (if new transactions exist)

### Step 6: Test Navigation

1. Verify "Spending" link appears in header (when logged in)
2. Click between Accounts and Spending pages
3. Navigate back to Dashboard
4. Verify all links work correctly

## Edge Cases to Test

### No Accounts Connected
- Visit `/dashboard/spending` without connected accounts
- Should see prompt to connect accounts
- "Connect Accounts" button should link to `/dashboard/accounts`

### No Transactions Yet
- Connect accounts but don't sync
- Should see prompt to sync transactions
- "Sync Transactions" button should trigger sync

### Empty Transaction History
- Connect account with no recent transactions
- Should handle gracefully with "No transactions found" message

### Pending Transactions
- If sandbox data includes pending transactions
- Should be marked as "Pending" in the list
- Excluded from spending totals

### Multiple Accounts
- Connect multiple bank accounts
- Sync should work across all accounts
- Transactions from all accounts appear in list

## Expected Data Format

### Sample Transaction Object
```json
{
  "id": "uuid",
  "transaction_date": "2024-02-20",
  "amount": -45.50,
  "merchant_name": "Whole Foods",
  "category_primary": "Food and Drink",
  "category_detailed": "Groceries",
  "pending": false,
  "financial_accounts": {
    "account_name": "Chase Checking"
  }
}
```

### Sample Summary Response
```json
{
  "totalSpent": 4250.00,
  "totalIncome": 3200.00,
  "netCashFlow": -1050.00,
  "byCategory": [
    {
      "category": "Food and Drink",
      "amount": 1200.00,
      "count": 45
    },
    ...
  ]
}
```

## Common Issues and Solutions

### Issue: Sync button does nothing
- Check browser console for errors
- Verify API endpoint is accessible
- Check network tab for failed requests

### Issue: No transactions appear after sync
- Verify Plaid sandbox has transaction data
- Check database to see if transactions were saved
- Look at server logs for sync errors

### Issue: Categories not showing
- Verify Plaid is returning category data
- Check if transactions have `category_primary` field
- Look for data transformation issues

### Issue: Calculator comparison not showing
- Verify user has calculator data saved
- Check `users` table for `monthly_expenses` value
- Ensure value is significantly different from actual spending

## Database Queries for Debugging

### Check transactions were saved:
```sql
SELECT COUNT(*) FROM transactions WHERE user_id = 'your-user-id';
```

### View recent transactions:
```sql
SELECT transaction_date, merchant_name, amount, category_primary
FROM transactions
WHERE user_id = 'your-user-id'
ORDER BY transaction_date DESC
LIMIT 10;
```

### Check sync status:
```sql
SELECT * FROM transaction_sync_status
WHERE user_id = 'your-user-id';
```

### View spending by category:
```sql
SELECT
  category_primary,
  SUM(ABS(amount)) as total,
  COUNT(*) as count
FROM transactions
WHERE user_id = 'your-user-id'
  AND amount < 0
  AND pending = false
GROUP BY category_primary
ORDER BY total DESC;
```

## Performance Considerations

- Transactions are synced for 90 days only (to keep data manageable)
- Summary calculations happen on-demand (could be cached in future)
- Plaid API limits: ~1 request per second recommended
- Large transaction volumes (>1000) may need pagination

## Future Enhancements

Potential improvements for later:
- Custom date range selection
- Export transactions to CSV
- Budget setting per category
- Spending trends over time
- Month-over-month comparisons
- Transaction search and filtering
- Category customization
- Recurring transaction detection
- Anomaly detection (unusual spending)

## Success Criteria

The feature is working correctly if:
1. Users can sync transactions from connected accounts
2. Transaction data displays accurately in spending dashboard
3. Categories are properly grouped and visualized
4. Recent transactions list is accurate
5. Calculator comparison works when data exists
6. No console errors or failed API calls
7. Database queries are performant (<100ms for summaries)
8. RLS policies prevent users from seeing others' data
