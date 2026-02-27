# Security Implementation Checklist for Plaid Production

## ✅ Quick Wins (Can Complete Today)

### 1. Add Security Headers (15 minutes)
**Priority: HIGH**

Edit `next.config.ts`:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' plaid.com cdn.plaid.com *.vercel-scripts.com; connect-src 'self' *.supabase.co plaid.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  }
}

export default nextConfig
```

Test: Deploy and check headers with `curl -I https://retirefree.app`

---

### 2. Enable GitHub Branch Protection (5 minutes)
**Priority: HIGH**

1. Go to GitHub → retirefree → Settings → Branches
2. Click "Add branch protection rule"
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require a pull request before merging
   - ✅ Require approvals (1)
   - ✅ Dismiss stale pull request approvals
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
   - ✅ Do not allow bypassing the above settings
5. Save

---

### 3. Enable Dependabot (5 minutes)
**Priority: HIGH**

1. Go to GitHub → Settings → Security → Code security and analysis
2. Enable:
   - ✅ Dependency graph
   - ✅ Dependabot alerts
   - ✅ Dependabot security updates
3. Create `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

---

### 4. Add npm audit to CI (10 minutes)
**Priority: MEDIUM**

Create `.github/workflows/security-checks.yml`:

```yaml
name: Security Checks

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm audit --audit-level=high
      - run: npm run lint
```

---

## 📄 Documentation Needed (Can Complete This Week)

### 5. Privacy Policy (2-3 hours)
**Priority: CRITICAL**

Create `app/privacy/page.tsx` with:
- What data we collect (via Plaid)
- How we use it
- How long we keep it
- User rights (access, deletion, export)
- Third-party services (Plaid, Vercel, Supabase)
- Contact information

Use template from: https://www.privacypolicies.com/

Key sections for Plaid:
```
FINANCIAL DATA COLLECTION

We use Plaid Technologies, Inc. to connect to your financial accounts.
When you connect your bank account, we collect:

• Account names and types (checking, savings, 401k, IRA)
• Account balances
• Transaction history (last 90 days)
• Transaction categories and merchant names

We use this data solely to:
• Calculate safe retirement withdrawal amounts
• Analyze your spending patterns
• Provide personalized budget recommendations

We do NOT:
• Sell your financial data
• Share your data with third parties for marketing
• Have the ability to move money or make transactions

You can disconnect your accounts at any time from your dashboard.
```

---

### 6. Terms of Service (2-3 hours)
**Priority: CRITICAL**

Create `app/terms/page.tsx`

Use template from: https://www.termsofservicegenerator.net/

Key sections:
- Service description
- User responsibilities
- Account termination
- Limitation of liability
- Disclaimer (not financial advice)
- Governing law

Important disclaimer:
```
DISCLAIMER

RetireFree provides informational tools for retirement planning.
Our recommendations are NOT financial advice. We are not registered
investment advisors. You should consult with a qualified financial
professional before making retirement decisions.
```

---

### 7. Information Security Policy (1-2 hours)
**Priority: HIGH**

Create `docs/INFORMATION_SECURITY_POLICY.md` (internal document)

Sections:
1. **Purpose**: Protect customer data and maintain trust
2. **Scope**: All systems handling user data
3. **Data Classification**:
   - Public (marketing materials)
   - Internal (business docs)
   - Confidential (user PII)
   - Restricted (financial data, Plaid tokens)
4. **Access Control**:
   - Principle of least privilege
   - 2FA required for all production systems
   - Access reviewed monthly
5. **Encryption**:
   - TLS 1.3 for data in transit
   - AES-256 for data at rest (via Supabase)
6. **Incident Response**:
   - Detection, containment, investigation, resolution
   - User notification within 72 hours if breach affects PII
7. **Compliance**:
   - GDPR, CCPA, SOC 2 (via cloud providers)
8. **Review Schedule**: Quarterly

---

### 8. Incident Response Plan (1 hour)
**Priority: HIGH**

Create `docs/INCIDENT_RESPONSE_PLAN.md`

Template:
```markdown
# Security Incident Response Plan

## Severity Levels

**Critical**: Data breach, unauthorized access to production
**High**: Service outage, potential security vulnerability
**Medium**: Degraded performance, minor security issue
**Low**: Cosmetic issues, low-risk bugs

## Response Process

### 1. Detection
- Monitoring alerts (Vercel, Supabase, Sentry)
- User reports
- Security scans

### 2. Triage (within 1 hour for Critical)
- Assess severity
- Identify affected systems
- Assemble response team (currently: founder)

### 3. Containment
- Isolate affected systems
- Revoke compromised credentials
- Block malicious traffic
- Preserve evidence (logs, screenshots)

### 4. Investigation
- Review audit logs
- Identify root cause
- Document timeline

### 5. Resolution
- Apply patches
- Restore from backups if needed
- Verify fix works

### 6. Communication
- Notify affected users (if data breach)
- Update status page
- Post-mortem report

### 7. Post-Incident
- Document lessons learned
- Update policies/procedures
- Implement preventive measures

## Contact Information

**Security Contact**: security@retirefree.app
**Founder**: [your email]
**Plaid Support**: https://plaid.com/contact/
```

---

## 🔧 Feature Implementation (This Week)

### 9. Account Deletion with Plaid Token Revocation (2-3 hours)
**Priority: CRITICAL**

Create `app/api/user/delete/route.ts`:

```typescript
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid'

const plaidClient = new PlaidApi(new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
}))

export async function POST(request: Request) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // 1. Get all Plaid items for this user
    const { data: plaidItems } = await supabase
      .from('plaid_items')
      .select('access_token')
      .eq('user_id', user.id)

    // 2. Revoke all Plaid access tokens
    if (plaidItems) {
      for (const item of plaidItems) {
        try {
          await plaidClient.itemRemove({
            access_token: item.access_token
          })
        } catch (e) {
          console.error('Error revoking Plaid token:', e)
        }
      }
    }

    // 3. Delete all user data (cascade deletes via foreign keys)
    await supabase.from('plaid_items').delete().eq('user_id', user.id)
    await supabase.from('financial_accounts').delete().eq('user_id', user.id)
    await supabase.from('transactions').delete().eq('user_id', user.id)
    await supabase.from('calculator_inputs').delete().eq('user_id', user.id)

    // 4. Delete auth user (this also signs them out)
    const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id)

    if (deleteError) {
      throw deleteError
    }

    return NextResponse.json({
      success: true,
      message: 'Account and all data deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting account:', error)
    return NextResponse.json(
      { error: 'Failed to delete account' },
      { status: 500 }
    )
  }
}
```

Add to `app/dashboard/settings/page.tsx`:

```typescript
'use client'

export default function SettingsPage() {
  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure? This will permanently delete your account and all data. This cannot be undone.')) {
      return
    }

    const confirmed = prompt('Type "DELETE" to confirm account deletion:')
    if (confirmed !== 'DELETE') {
      return
    }

    const response = await fetch('/api/user/delete', { method: 'POST' })

    if (response.ok) {
      window.location.href = '/'
    } else {
      alert('Failed to delete account. Please contact support.')
    }
  }

  return (
    <div>
      <h1>Settings</h1>

      <section className="danger-zone">
        <h2>Danger Zone</h2>
        <button
          onClick={handleDeleteAccount}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete Account
        </button>
        <p className="text-sm text-gray-600">
          This will permanently delete your account, disconnect all bank accounts,
          and remove all your data. This action cannot be undone.
        </p>
      </section>
    </div>
  )
}
```

---

### 10. Add Security Event Logging (1 hour)
**Priority: MEDIUM**

Create `lib/logger.ts`:

```typescript
type SecurityEvent =
  | 'user_signup'
  | 'user_login'
  | 'user_logout'
  | 'plaid_link_initiated'
  | 'plaid_link_success'
  | 'plaid_link_error'
  | 'plaid_token_exchange'
  | 'plaid_token_revoked'
  | 'transaction_sync'
  | 'account_deleted'
  | 'failed_login_attempt'

export function logSecurityEvent(
  event: SecurityEvent,
  userId: string | null,
  metadata?: Record<string, any>
) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    userId,
    metadata,
    severity: 'info',
    source: 'retirefree'
  }

  // In production, send to logging service (Sentry, LogDNA, etc.)
  // For now, console.log (Vercel captures these)
  console.log('[SECURITY]', JSON.stringify(logEntry))

  // Optional: Store in database for audit trail
  // await supabase.from('audit_logs').insert(logEntry)
}
```

Use in auth callbacks and Plaid endpoints:

```typescript
import { logSecurityEvent } from '@/lib/logger'

// In Plaid exchange endpoint
logSecurityEvent('plaid_token_exchange', user.id, {
  institutionId: metadata.institution.institution_id,
  accountCount: accounts.length
})

// In auth callback
logSecurityEvent('user_login', user.id, {
  method: 'email'
})
```

---

### 11. Add Consent Flow Before Plaid Link (1 hour)
**Priority: HIGH**

Update `app/dashboard/accounts/page.tsx`:

```typescript
'use client'

export default function AccountsPage() {
  const [consentGiven, setConsentGiven] = useState(false)
  const [showConsentModal, setShowConsentModal] = useState(false)

  const handleConnectBank = () => {
    setShowConsentModal(true)
  }

  const handleConsentConfirm = () => {
    setConsentGiven(true)
    setShowConsentModal(false)
    // Now open Plaid Link
    openPlaidLink()
  }

  return (
    <div>
      <button onClick={handleConnectBank}>
        Connect Bank Account
      </button>

      {showConsentModal && (
        <div className="modal">
          <h2>Authorization Required</h2>
          <p>
            By connecting your bank account, you authorize RetireFree to:
          </p>
          <ul>
            <li>View your account balances and transaction history</li>
            <li>Analyze your spending patterns</li>
            <li>Calculate personalized retirement recommendations</li>
          </ul>
          <p>
            We use Plaid (trusted by Venmo, Robinhood, and others) for secure,
            read-only access to your financial data.
          </p>
          <p>
            <strong>We will never:</strong>
          </p>
          <ul>
            <li>Move money or make transactions</li>
            <li>Sell your data to third parties</li>
            <li>Share your data for marketing purposes</li>
          </ul>
          <p>
            You can disconnect your accounts at any time. Read our{' '}
            <a href="/privacy">Privacy Policy</a> and{' '}
            <a href="/terms">Terms of Service</a> for more details.
          </p>

          <div className="actions">
            <button onClick={() => setShowConsentModal(false)}>
              Cancel
            </button>
            <button onClick={handleConsentConfirm}>
              I Authorize
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
```

---

## 🔐 Optional But Recommended

### 12. Add User 2FA Option (2 hours)
**Priority: MEDIUM**

Supabase Auth supports MFA out of the box:

```typescript
// Enable 2FA enrollment
const { data, error } = await supabase.auth.mfa.enroll({
  factorType: 'totp',
  friendlyName: 'RetireFree Account'
})

// Show QR code to user
const qrCode = data.totp.qr_code

// User scans with authenticator app, enters code
const { data: verified } = await supabase.auth.mfa.verify({
  factorId: data.id,
  code: userInputCode
})
```

Add to settings page as optional feature.

---

### 13. Set Up Sentry (30 minutes)
**Priority: MEDIUM**

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

Configure in `sentry.client.config.ts`:

```typescript
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
})
```

Add to Vercel env vars:
- `NEXT_PUBLIC_SENTRY_DSN`
- `SENTRY_AUTH_TOKEN`

---

## 📋 Final Checklist Before Submitting to Plaid

- [ ] Security headers deployed to production
- [ ] Privacy Policy published at /privacy
- [ ] Terms of Service published at /terms
- [ ] Account deletion feature works
- [ ] Consent flow before Plaid Link
- [ ] GitHub branch protection enabled
- [ ] Dependabot enabled
- [ ] Information Security Policy documented
- [ ] Incident Response Plan documented
- [ ] Security event logging implemented
- [ ] Verify all Plaid environment variables set correctly
- [ ] Test full flow: signup → connect bank → view transactions → delete account
- [ ] Update PLAID_DATA_ACCESS_STATEMENT.md to remove "Auth" product

---

## Timeline Estimate

**Day 1 (4 hours):**
- Security headers ✅
- Branch protection ✅
- Dependabot ✅
- npm audit CI ✅

**Day 2 (6 hours):**
- Privacy Policy ✅
- Terms of Service ✅
- Consent flow ✅

**Day 3 (4 hours):**
- Account deletion ✅
- Security logging ✅
- Info Security Policy ✅

**Day 4 (2 hours):**
- Incident Response Plan ✅
- Test everything ✅
- Submit to Plaid ✅

**Total: ~16 hours of focused work**

You can realistically complete all critical items in 3-4 days!
