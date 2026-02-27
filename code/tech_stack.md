# RetireFree Tech Stack

## Overview
A modern, serverless stack optimized for rapid MVP development with minimal costs ($200 budget) and maximum scalability.

---

## Frontend

### Next.js 14 (App Router)
- **Version**: 14.x (latest stable)
- **Why**: React framework with built-in SSR, API routes, file-based routing, and excellent performance
- **Key Features**:
  - App Router for modern routing patterns
  - Server Components for optimal performance
  - Built-in image optimization
  - TypeScript support

### React 18
- **Version**: 18.x
- **Why**: Component-based UI library with excellent ecosystem
- **Usage**: Client and server components

### Tailwind CSS
- **Version**: 3.x
- **Why**: Utility-first CSS framework for rapid UI development
- **Plugins**:
  - @tailwindcss/forms (form styling)
  - @tailwindcss/typography (content styling)
- **Component Library**: shadcn/ui (optional, recommended for pre-built components)

### TypeScript
- **Version**: 5.x
- **Why**: Type safety reduces bugs and improves developer experience
- **Config**: Strict mode enabled

---

## Backend

### Next.js API Routes
- **Why**: Serverless functions co-located with frontend code
- **Usage**:
  - `/api/calculate` - AI withdrawal calculations
  - `/api/stripe/*` - Payment webhooks
  - `/api/auth/*` - Authentication helpers (if needed beyond Supabase)

### Supabase (PostgreSQL)
- **Tier**: Free (500MB database, 2GB bandwidth, 50,000 monthly active users)
- **Why**: Open-source Firebase alternative with PostgreSQL
- **Features Used**:
  - PostgreSQL database
  - Authentication (email/password, magic links)
  - Row Level Security (RLS)
  - Real-time subscriptions (if needed)
  - Storage (profile images if needed)
- **Client**: @supabase/supabase-js v2

---

## Authentication

### Supabase Auth
- **Methods**:
  - Email + Password
  - Magic Links (passwordless)
  - Google OAuth (optional, for better conversion)
- **Session Management**: JWT tokens with automatic refresh
- **Security**: Row Level Security policies on all tables

---

## Payments

### Stripe
- **Tier**: Free (2.9% + $0.30 per transaction)
- **Why**: Industry-standard payment processor with excellent API
- **Products**:
  - Stripe Checkout (hosted payment page)
  - Customer Portal (self-service subscription management)
  - Webhooks (payment event handling)
- **Client**: stripe npm package
- **Pricing Model**: $29/month subscription or $99 one-time analysis

---

## AI

### Claude API (Anthropic)
- **Model**: Claude 3.5 Sonnet (claude-3-5-sonnet-20241022)
- **Tier**: Pay-as-you-go ($3 per million input tokens, $15 per million output tokens)
- **Why**: State-of-the-art reasoning for financial calculations
- **Budget**: ~$10-20 for first 100 users
- **Client**: @anthropic-ai/sdk
- **Usage**:
  - Retirement withdrawal calculations
  - Personalized advice generation
  - Risk assessment

---

## Hosting & Infrastructure

### Vercel
- **Tier**: Free (Hobby plan)
- **Why**: Built by Next.js creators, zero-config deployment
- **Features**:
  - Automatic deployments from Git
  - Preview deployments for PRs
  - Edge functions
  - Analytics
  - Custom domains
- **Limits**: 100GB bandwidth/month, unlimited sites

### Domain
- **Registrar**: Namecheap or Cloudflare
- **Cost**: ~$10-15/year for .com
- **DNS**: Vercel or Cloudflare

---

## Email

### Resend
- **Tier**: Free (3,000 emails/month, 1 domain)
- **Why**: Modern email API built by Vercel team, excellent DX
- **Client**: resend npm package
- **Usage**:
  - Welcome emails
  - Calculation results
  - Subscription confirmations
  - Password reset (via Supabase)
- **Templates**: React Email for type-safe templates

---

## Analytics

### Plausible Analytics
- **Tier**: Free trial (30 days), then $9/month
- **Alternative**: Simple Analytics ($9/month)
- **Why**: Privacy-friendly, GDPR compliant, lightweight
- **Metrics**:
  - Page views
  - Conversion tracking
  - Goal completions

### Google Analytics 4 (Fallback)
- **Tier**: Free
- **Why**: Free alternative if budget is tight
- **Trade-off**: More complex, privacy concerns

---

## Development Tools

### Version Control
- **Git**: GitHub (free private repos)
- **Branching**: main (production), develop (staging)

### Package Manager
- **pnpm** (recommended) or **npm**
- **Why pnpm**: Faster, more efficient disk usage

### Code Quality
- **ESLint**: Next.js default config
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks (optional)

### Environment Management
- **.env.local**: Local development
- **Vercel Environment Variables**: Production secrets

---

## Database Schema (Supabase)

### Tables

#### users (managed by Supabase Auth)
- Automatically created by Supabase

#### user_profiles
```sql
- id (uuid, references auth.users)
- age (integer)
- retirement_age (integer)
- created_at (timestamp)
- updated_at (timestamp)
```

#### calculations
```sql
- id (uuid, primary key)
- user_id (uuid, references auth.users)
- current_age (integer)
- savings_amount (decimal)
- monthly_expenses (decimal)
- calculated_withdrawal (decimal)
- ai_advice (text)
- created_at (timestamp)
```

#### subscriptions
```sql
- id (uuid, primary key)
- user_id (uuid, references auth.users)
- stripe_customer_id (text)
- stripe_subscription_id (text)
- status (text) -- active, canceled, past_due
- plan_type (text) -- monthly, one_time
- current_period_end (timestamp)
- created_at (timestamp)
- updated_at (timestamp)
```

---

## Cost Breakdown

| Service | Tier | Monthly Cost |
|---------|------|--------------|
| Vercel | Free | $0 |
| Supabase | Free | $0 |
| Stripe | Pay-per-use | ~$0-5 (2.9% per transaction) |
| Claude API | Pay-per-use | ~$10-20 (first 100 users) |
| Resend | Free | $0 |
| Plausible | Trial/Paid | $0-9 |
| Domain | Annual | ~$1/month |
| **Total** | | **~$11-35/month** |

**First Month**: ~$15 (domain + minimal API usage)
**Budget Remaining**: $185 for marketing, testing, scaling

---

## Scaling Path

### When to Upgrade (>500 users):
- Supabase Pro: $25/month (8GB database, better support)
- Vercel Pro: $20/month (more bandwidth, better analytics)
- Consider caching with Upstash Redis (free tier available)

### Performance Optimizations:
- Next.js Image optimization (automatic)
- Static generation for landing page
- Edge functions for auth checks
- Database indexing on user_id columns

---

## Security Considerations

1. **Environment Variables**: Never commit secrets
2. **API Routes**: Validate all inputs, check authentication
3. **Supabase RLS**: Enable on all tables
4. **HTTPS**: Automatic with Vercel
5. **CORS**: Configure for API routes
6. **Rate Limiting**: Use Vercel Edge Config or Upstash
7. **Input Validation**: Zod for schema validation

---

## Developer Experience

### Hot Reload
- Next.js Fast Refresh for instant updates

### Type Safety
- TypeScript across frontend and API routes
- Supabase generated types

### Testing (Optional for MVP)
- Jest + React Testing Library
- Playwright for E2E (can add post-launch)

---

## Summary

This stack provides:
- **Rapid Development**: Next.js + Tailwind for quick iteration
- **Low Cost**: $15-35/month to start
- **Scalability**: All services scale automatically
- **Modern DX**: TypeScript, hot reload, excellent tooling
- **Production-Ready**: Battle-tested technologies

Total setup time: ~2-3 hours
Total development time: 14 days for MVP
