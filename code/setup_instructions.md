# RetireFree Setup Instructions

Complete step-by-step guide to get RetireFree running locally and deploy to production.

---

## Prerequisites

- **Node.js**: v18.17 or higher ([Download](https://nodejs.org/))
- **pnpm**: Package manager ([Install](https://pnpm.io/installation))
  ```bash
  npm install -g pnpm
  ```
- **Git**: For version control
- **Code editor**: VSCode recommended
- **Accounts needed**:
  - GitHub (free)
  - Vercel (free)
  - Supabase (free)
  - Stripe (free)
  - Anthropic (pay-as-you-go)
  - Resend (free)

---

## Part 1: Local Development Setup

### Step 1: Clone/Create Project

```bash
# Create new Next.js project
npx create-next-app@latest retirewise

# Options:
# ✔ Would you like to use TypeScript? Yes
# ✔ Would you like to use ESLint? Yes
# ✔ Would you like to use Tailwind CSS? Yes
# ✔ Would you like to use `src/` directory? No
# ✔ Would you like to use App Router? Yes
# ✔ Would you like to customize the default import alias? No

cd retirewise
```

---

### Step 2: Install Dependencies

```bash
# Core dependencies
pnpm add @supabase/supabase-js @supabase/ssr
pnpm add stripe @stripe/stripe-js
pnpm add @anthropic-ai/sdk
pnpm add resend react-email
pnpm add zod

# UI dependencies (optional but recommended)
pnpm add class-variance-authority clsx tailwind-merge
pnpm add @radix-ui/react-dropdown-menu @radix-ui/react-dialog @radix-ui/react-toast

# Dev dependencies
pnpm add -D @types/node
```

---

### Step 3: Create Folder Structure

```bash
# Create directories
mkdir -p app/dashboard app/auth app/pricing app/api/calculate app/api/stripe/checkout app/api/stripe/webhook app/api/stripe/portal app/api/user/profile app/api/user/calculations
mkdir -p components/ui
mkdir -p lib/supabase lib/stripe lib/ai lib/email
mkdir -p types hooks supabase/migrations public emails
```

---

### Step 4: Configure Environment Variables

Create `.env.local` in project root:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Anthropic (Claude API)
ANTHROPIC_API_KEY=your_anthropic_api_key

# Resend (Email)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Create `.env.example` (for version control):

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
ANTHROPIC_API_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Part 2: Supabase Setup

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/login
3. Click "New Project"
4. Fill in:
   - **Name**: retirewise
   - **Database Password**: (save this!)
   - **Region**: Choose closest to you
   - **Plan**: Free
5. Wait 2-3 minutes for project to be ready

---

### Step 2: Get API Keys

1. Go to **Settings** → **API**
2. Copy these values to `.env.local`:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

---

### Step 3: Create Database Schema

Go to **SQL Editor** → Click "New Query" → Paste and run:

```sql
-- User profiles
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  age INTEGER,
  retirement_age INTEGER DEFAULT 65,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Calculations
CREATE TABLE calculations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  current_age INTEGER NOT NULL,
  savings_amount DECIMAL(15, 2) NOT NULL,
  monthly_expenses DECIMAL(10, 2) NOT NULL,
  calculated_withdrawal DECIMAL(10, 2) NOT NULL,
  ai_advice TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  stripe_customer_id TEXT UNIQUE NOT NULL,
  stripe_subscription_id TEXT UNIQUE,
  status TEXT NOT NULL, -- active, canceled, past_due
  plan_type TEXT NOT NULL, -- monthly, one_time
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX calculations_user_id_idx ON calculations(user_id);
CREATE INDEX calculations_created_at_idx ON calculations(created_at DESC);
CREATE INDEX subscriptions_user_id_idx ON subscriptions(user_id);
CREATE INDEX subscriptions_stripe_customer_id_idx ON subscriptions(stripe_customer_id);
```

---

### Step 4: Enable Row Level Security (RLS)

Run in SQL Editor:

```sql
-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- User profiles policies
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Calculations policies
CREATE POLICY "Users can view own calculations"
  ON calculations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own calculations"
  ON calculations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Subscriptions policies
CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage subscriptions"
  ON subscriptions FOR ALL
  USING (true)
  WITH CHECK (true);
```

---

### Step 5: Enable Authentication

1. Go to **Authentication** → **Settings**
2. Enable **Email** provider (enabled by default)
3. Optional: Enable **Google** OAuth
4. Configure **Site URL**: `http://localhost:3000` (change to production URL later)
5. Add **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `https://yourdomain.com/auth/callback` (add later)

---

### Step 6: Generate TypeScript Types

```bash
# Install Supabase CLI
pnpm add -D supabase

# Login to Supabase
npx supabase login

# Generate types
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.ts

# Find PROJECT_ID in Supabase dashboard URL:
# https://app.supabase.com/project/YOUR_PROJECT_ID
```

---

## Part 3: Stripe Setup

### Step 1: Create Stripe Account

1. Go to [stripe.com](https://stripe.com)
2. Sign up for free account
3. Activate **Test Mode** (toggle in dashboard)

---

### Step 2: Create Products

1. Go to **Products** → **Add Product**

**Product 1: Monthly Subscription**
- **Name**: RetireFree Monthly
- **Pricing**: $29/month, recurring
- **Copy Price ID**: Starts with `price_...`

**Product 2: One-Time Analysis**
- **Name**: RetireFree One-Time
- **Pricing**: $99, one-time
- **Copy Price ID**: Starts with `price_...`

Save these Price IDs in `lib/constants.ts`:

```typescript
export const STRIPE_PRICES = {
  MONTHLY: 'price_YOUR_MONTHLY_PRICE_ID',
  ONE_TIME: 'price_YOUR_ONE_TIME_PRICE_ID',
}
```

---

### Step 3: Get API Keys

1. Go to **Developers** → **API Keys**
2. Copy to `.env.local`:
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** → `STRIPE_SECRET_KEY` (keep secret!)

---

### Step 4: Setup Webhooks (for local testing)

Install Stripe CLI:

```bash
# Mac
brew install stripe/stripe-cli/stripe

# Windows (with Scoop)
scoop install stripe

# Or download from: https://stripe.com/docs/stripe-cli
```

Login and forward webhooks:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

This will output a webhook secret starting with `whsec_...`
Add to `.env.local`:

```bash
STRIPE_WEBHOOK_SECRET=whsec_...
```

Keep this terminal window open while developing!

---

## Part 4: Anthropic (Claude) Setup

### Step 1: Create Account

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up with email
3. Verify email

---

### Step 2: Get API Key

1. Go to **API Keys** → **Create Key**
2. Copy API key (starts with `sk-ant-api03-...`)
3. Add to `.env.local`:
   ```bash
   ANTHROPIC_API_KEY=sk-ant-api03-...
   ```

---

### Step 3: Add Credits

1. Go to **Billing** → **Add Credits**
2. Add **$5 to start** (enough for 100+ calculations)
3. Costs: ~$0.01-0.03 per calculation

---

## Part 5: Resend (Email) Setup

### Step 1: Create Account

1. Go to [resend.com](https://resend.com)
2. Sign up with email

---

### Step 2: Get API Key

1. Go to **API Keys** → **Create API Key**
2. Copy key
3. Add to `.env.local`:
   ```bash
   RESEND_API_KEY=re_...
   ```

---

### Step 3: Add Domain (for production)

1. Go to **Domains** → **Add Domain**
2. Enter your domain (e.g., `yourdomain.com`)
3. Add DNS records (SPF, DKIM)
4. For now, use **Development Mode** (emails to your own address)

---

## Part 6: Run Locally

### Step 1: Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

### Step 2: Test Authentication

1. Go to `/auth/signup`
2. Create test account
3. Check Supabase dashboard → **Authentication** → **Users**
4. Should see new user

---

### Step 3: Test Stripe

1. Use test credit card: `4242 4242 4242 4242`
2. Any future expiry date (e.g., 12/34)
3. Any CVC (e.g., 123)
4. Any ZIP code

---

### Step 4: Test Claude API

1. Run a calculation
2. Check console for API response
3. Should return withdrawal amount + advice

---

## Part 7: Production Deployment

### Step 1: Create GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/retirewise.git
git push -u origin main
```

---

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Import Project**
3. Select your GitHub repo
4. Framework Preset: **Next.js** (auto-detected)
5. Click **Deploy**

---

### Step 3: Add Environment Variables to Vercel

1. Go to **Settings** → **Environment Variables**
2. Add all variables from `.env.local` (except `NEXT_PUBLIC_APP_URL`)
3. Add new variable:
   ```
   NEXT_PUBLIC_APP_URL=https://yourdomain.vercel.app
   ```
4. Redeploy (Deployments → ... → Redeploy)

---

### Step 4: Configure Custom Domain

1. Buy domain (Namecheap, Cloudflare, etc.)
2. In Vercel: **Settings** → **Domains**
3. Add custom domain
4. Update DNS records (Vercel provides instructions)
5. Wait for DNS propagation (5-30 minutes)

---

### Step 5: Update Service Configurations

**Supabase:**
1. **Settings** → **API Settings**
2. Add production URL to **Site URL**
3. Add `https://yourdomain.com/auth/callback` to redirect URLs

**Stripe:**
1. Switch to **Live Mode**
2. Copy new API keys to Vercel environment variables
3. **Developers** → **Webhooks** → **Add Endpoint**
4. URL: `https://yourdomain.com/api/stripe/webhook`
5. Events to send:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
6. Copy webhook signing secret to Vercel

**Resend:**
1. Verify domain
2. Update `RESEND_FROM_EMAIL` in Vercel to your domain

---

### Step 6: Final Production Test

1. Visit your domain
2. Create real account
3. Run calculation
4. Complete real payment (you can refund later)
5. Check all services are working

---

## Part 8: Monitoring & Maintenance

### Vercel Analytics
- **Analytics** tab in Vercel dashboard
- See traffic, performance, errors

### Supabase Dashboard
- Monitor database usage
- Check auth logs
- View API requests

### Stripe Dashboard
- Track payments
- Monitor failed charges
- View customer data

### Anthropic Console
- Check API usage
- Monitor costs
- View rate limits

---

## Troubleshooting

### Issue: Supabase connection fails
**Fix**: Check if API URL and keys are correct in `.env.local`

### Issue: Stripe webhook not receiving events
**Fix**: Make sure `stripe listen` is running locally, or webhook is configured in Stripe dashboard for production

### Issue: Claude API returns 401
**Fix**: Verify API key is correct and has credits

### Issue: Emails not sending
**Fix**: Check Resend API key, verify domain if in production

### Issue: Build fails on Vercel
**Fix**: Check build logs, ensure all environment variables are set

---

## Next Steps

1. ✅ Complete initial setup (this guide)
2. ✅ Follow implementation_plan.md for building features
3. ✅ Refer to tech_stack.md for architecture details
4. ✅ Use ai_logic.md for AI implementation
5. ✅ Launch and iterate based on user feedback

---

## Useful Commands

```bash
# Development
pnpm dev                # Start dev server
pnpm build              # Build for production
pnpm start              # Start production server
pnpm lint               # Run ESLint

# Supabase
npx supabase start      # Start local Supabase
npx supabase stop       # Stop local Supabase
npx supabase db reset   # Reset database

# Stripe
stripe listen --forward-to localhost:3000/api/stripe/webhook
stripe trigger checkout.session.completed

# Git
git status
git add .
git commit -m "Your message"
git push
```

---

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Anthropic Docs](https://docs.anthropic.com)
- [Resend Docs](https://resend.com/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)

---

## Support

If you get stuck:
1. Check error messages in console/logs
2. Search in relevant documentation
3. Ask in community forums:
   - Next.js Discord
   - Supabase Discord
   - Stripe Discord
4. Check GitHub Issues for similar problems

---

**You're ready to build! 🚀**

Follow the implementation_plan.md to start coding, and refer back to this guide as needed for setup questions.
