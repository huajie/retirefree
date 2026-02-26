# Plaid Data Access Statement for RetireFree

## What We Ask Plaid For

When you connect your bank accounts via Plaid, RetireFree requests access to:

### 1. **Account Information** (Auth Product)
- Account names and types (checking, savings, 401k, IRA, brokerage)
- Current and available balances
- Account and routing numbers (for verification only)

**Why we need this:**
To calculate your total retirement savings and show you a complete picture of your financial accounts in one place.

### 2. **Transaction Data** (Transactions Product)
- Last 90 days of transaction history
- Transaction amounts, dates, and merchant names
- Automatic categorization (groceries, healthcare, travel, etc.)

**Why we need this:**
To show you exactly where your money goes each month and compare your actual spending to your budget. This helps us give you more accurate retirement withdrawal recommendations.

### 3. **Investment Holdings** (Investments Product)
- Investment account balances
- Holdings and asset allocation (optional)
- Market value updates

**Why we need this:**
To track your investment accounts (401k, IRA, brokerage) separately from cash accounts and provide more accurate withdrawal strategies.

---

## Privacy Statement for Plaid Link

**Official Statement (shown to users during Plaid Link):**

> RetireFree uses your bank data to:
>
> 1. Calculate your total retirement savings across all accounts
> 2. Track your monthly spending to provide accurate budget recommendations
> 3. Monitor your account balances to ensure your withdrawal strategy stays on track
>
> We only access your financial data with your permission and use bank-level encryption to keep it secure. You can disconnect your accounts at any time.

---

## Technical Implementation

In your Plaid Link Token creation, use this configuration:

```typescript
const response = await plaidClient.linkTokenCreate({
  user: {
    client_user_id: user.id,
  },
  client_name: 'RetireFree',
  products: [Products.Transactions, Products.Auth, Products.Investments],
  country_codes: [CountryCode.Us],
  language: 'en',

  // IMPORTANT: Data access reason
  redirect_uri: 'https://retirefree.app/dashboard/accounts',

  // User-friendly explanation
  webhook: 'https://retirefree.app/api/plaid/webhook',

  // This appears in Plaid Link UI
  account_filters: {
    depository: {
      account_subtypes: ['checking', 'savings', 'money market', 'cd'],
    },
    investment: {
      account_subtypes: ['401k', 'ira', 'roth', 'brokerage', '403b', '529'],
    },
  },
})
```

---

## What We DON'T Access

❌ We do NOT request:
- Ability to move money or make transfers
- Ability to create payments
- Credit card payment capabilities
- Loan modification abilities
- Any write access to your accounts

✅ We only have READ-ONLY access to:
- Account balances
- Transaction history
- Account details

---

## User-Facing Communication

### In the App (before clicking "Connect Bank Account"):

**"Why do we need access to your bank accounts?"**

We connect to your bank using Plaid (the same secure service used by Venmo, Robinhood, and other major financial apps) to:

• **See your total savings** across all retirement accounts (401k, IRA, brokerage, etc.)
• **Track your spending** to show you exactly where your money goes each month
• **Monitor your balances** so we can alert you if your withdrawal strategy needs adjusting

We can only VIEW your accounts—we can never move money, make payments, or change anything. You're in complete control and can disconnect anytime.

---

### During Plaid Link Flow:

Plaid will show users a screen explaining:
- What data RetireFree is requesting
- Which accounts will be connected
- That it's read-only access
- How to disconnect later

---

## For Plaid Production Application

When applying for Plaid production access, use this business description:

**Business Description:**
RetireFree is an AI-powered retirement planning application that helps retirees determine safe withdrawal amounts from their retirement savings. We connect to users' bank and investment accounts to:

1. Aggregate total retirement savings across multiple accounts
2. Analyze spending patterns to provide accurate budget recommendations
3. Monitor account balances to ensure sustainable withdrawal strategies

**Data Usage:**
- Account balances: Calculate total retirement portfolio value
- Transactions: Analyze monthly spending patterns and categorize expenses
- Investment holdings: Track retirement account performance and asset allocation

**User Benefit:**
Users receive personalized monthly withdrawal recommendations based on their actual financial situation, helping them avoid running out of money while maximizing their retirement lifestyle.

**Security:**
All data is encrypted in transit and at rest. Access tokens are stored server-side only. Users can disconnect accounts at any time via our dashboard.

---

## Compliance Notes

- **Read-only access**: We only request read access, never write/transfer capabilities
- **Data minimization**: We only request the minimum data needed for our core functionality
- **User control**: Users can disconnect accounts anytime from their dashboard
- **Transparency**: We clearly explain what data we access and why
- **Security**: Bank-level encryption (TLS 1.2+), encrypted database storage, RLS policies

---

## Support Documentation

Provide users with:
1. FAQ about Plaid integration
2. How to disconnect accounts
3. What data we can and cannot see
4. Link to Plaid's security information
5. Link to our privacy policy

This builds trust and complies with Plaid's requirements for production approval.
