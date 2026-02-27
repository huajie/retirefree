# RetireFree Project Structure

## Complete Directory Tree

```
retirewise/
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx                # Root layout (fonts, providers)
│   ├── page.tsx                  # Landing page (/)
│   ├── globals.css               # Global styles + Tailwind
│   ├── providers.tsx             # Context providers (Supabase, etc.)
│   │
│   ├── dashboard/                # Authenticated user dashboard
│   │   ├── layout.tsx            # Dashboard layout with nav
│   │   ├── page.tsx              # Main dashboard view
│   │   ├── calculations/         # Calculation history
│   │   │   └── page.tsx
│   │   ├── settings/             # User settings
│   │   │   └── page.tsx
│   │   └── billing/              # Subscription management
│   │       └── page.tsx
│   │
│   ├── auth/                     # Authentication pages
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   └── callback/             # OAuth callback
│   │       └── route.ts
│   │
│   ├── pricing/                  # Pricing page
│   │   └── page.tsx
│   │
│   └── api/                      # API routes
│       ├── calculate/            # AI calculation endpoint
│       │   └── route.ts
│       ├── stripe/
│       │   ├── checkout/         # Create checkout session
│       │   │   └── route.ts
│       │   ├── webhook/          # Stripe webhooks
│       │   │   └── route.ts
│       │   └── portal/           # Customer portal session
│       │       └── route.ts
│       └── user/
│           ├── profile/          # Get/update user profile
│           │   └── route.ts
│           └── calculations/     # Get user calculations
│               └── route.ts
│
├── components/                   # React components
│   ├── Calculator.tsx            # Main calculator form
│   ├── CalculationResult.tsx    # Results display
│   ├── Dashboard.tsx             # Dashboard container
│   ├── Header.tsx                # Site header with nav
│   ├── Footer.tsx                # Site footer
│   ├── PricingCard.tsx           # Pricing plan card
│   ├── Hero.tsx                  # Landing page hero
│   ├── Features.tsx              # Feature showcase
│   ├── Testimonials.tsx          # Social proof
│   ├── AuthForm.tsx              # Login/signup form
│   │
│   └── ui/                       # Reusable UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Card.tsx
│       ├── Modal.tsx
│       ├── Toast.tsx
│       ├── Spinner.tsx
│       └── Badge.tsx
│
├── lib/                          # Utility functions and clients
│   ├── supabase/
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   └── middleware.ts         # Auth middleware
│   ├── stripe/
│   │   ├── client.ts             # Stripe initialization
│   │   └── utils.ts              # Stripe helpers
│   ├── ai/
│   │   ├── client.ts             # Anthropic client
│   │   ├── prompts.ts            # AI prompt templates
│   │   └── calculate.ts          # Calculation logic
│   ├── email/
│   │   ├── client.ts             # Resend client
│   │   └── templates.tsx         # Email templates
│   ├── utils.ts                  # General utilities
│   ├── constants.ts              # App constants
│   └── validations.ts            # Zod schemas
│
├── types/                        # TypeScript types
│   ├── database.ts               # Supabase generated types
│   ├── calculation.ts            # Calculation types
│   ├── user.ts                   # User types
│   └── stripe.ts                 # Stripe types
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts                # Authentication hook
│   ├── useCalculation.ts         # Calculation hook
│   ├── useSubscription.ts        # Subscription status hook
│   └── useToast.ts               # Toast notifications hook
│
├── middleware.ts                 # Next.js middleware (auth)
│
├── supabase/                     # Supabase migrations
│   ├── migrations/
│   │   ├── 001_initial_schema.sql
│   │   └── 002_rls_policies.sql
│   └── seed.sql                  # Seed data (optional)
│
├── public/                       # Static assets
│   ├── logo.svg
│   ├── og-image.png              # Open Graph image
│   └── favicon.ico
│
├── emails/                       # React Email templates
│   ├── WelcomeEmail.tsx
│   ├── CalculationEmail.tsx
│   └── SubscriptionEmail.tsx
│
├── .env.example                  # Example environment variables
├── .env.local                    # Local environment (gitignored)
├── .gitignore
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json
├── pnpm-lock.yaml
└── README.md
```

---

## Key Files Explained

### `/app/page.tsx` - Landing Page
```typescript
// Hero, features, pricing, CTA
// Public, non-authenticated
// SEO optimized with metadata
```

### `/app/dashboard/page.tsx` - Main Dashboard
```typescript
// Calculator component
// Recent calculations
// Quick stats
// Protected route (requires auth)
```

### `/app/api/calculate/route.ts` - AI Calculation
```typescript
// POST endpoint
// Validates input
// Calls Claude API
// Saves to database
// Returns calculation + advice
```

### `/components/Calculator.tsx` - Calculator Form
```typescript
// Form inputs: age, savings, expenses
// Client-side validation
// Calls /api/calculate
// Displays results
```

### `/lib/supabase/client.ts` - Supabase Browser Client
```typescript
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### `/lib/ai/calculate.ts` - AI Calculation Logic
```typescript
// Core retirement calculation
// Claude API integration
// Prompt engineering
// Response parsing
```

### `/middleware.ts` - Authentication Middleware
```typescript
// Protects /dashboard routes
// Refreshes auth tokens
// Redirects to /auth/login if not authenticated
```

---

## Route Structure

### Public Routes
- `/` - Landing page
- `/pricing` - Pricing plans
- `/auth/login` - Login page
- `/auth/signup` - Signup page

### Protected Routes (require auth)
- `/dashboard` - Main dashboard
- `/dashboard/calculations` - Calculation history
- `/dashboard/settings` - User settings
- `/dashboard/billing` - Subscription management

### API Routes
- `POST /api/calculate` - Run calculation
- `POST /api/stripe/checkout` - Create checkout session
- `POST /api/stripe/webhook` - Handle Stripe events
- `POST /api/stripe/portal` - Create portal session
- `GET /api/user/profile` - Get user profile
- `PATCH /api/user/profile` - Update user profile
- `GET /api/user/calculations` - Get user's calculations

---

## Component Hierarchy

```
App
├── Providers (Supabase, Toast)
│   ├── Layout
│   │   ├── Header
│   │   │   ├── Logo
│   │   │   ├── Navigation
│   │   │   └── UserMenu
│   │   │
│   │   ├── Page Content
│   │   │
│   │   └── Footer
│   │
│   └── Dashboard Layout (protected)
│       ├── Sidebar
│       ├── Dashboard Content
│       │   ├── Calculator
│       │   │   ├── Input Fields
│       │   │   ├── Calculate Button
│       │   │   └── CalculationResult
│       │   │       ├── Withdrawal Amount
│       │   │       ├── AI Advice
│       │   │       └── Save/Share Buttons
│       │   │
│       │   └── CalculationHistory
│       │       └── CalculationCard[]
│       │
│       └── User Menu
```

---

## Data Flow

### 1. User Calculation Flow
```
User inputs data → Calculator component
  → POST /api/calculate
  → Validate input (Zod)
  → Check user auth (Supabase)
  → Call Claude API
  → Save to database
  → Send email (optional)
  → Return result
  → Display in CalculationResult component
```

### 2. Subscription Flow
```
User clicks "Subscribe" → PricingCard
  → POST /api/stripe/checkout
  → Create Stripe checkout session
  → Redirect to Stripe
  → User completes payment
  → Stripe webhook → /api/stripe/webhook
  → Update subscriptions table
  → Send confirmation email
  → Redirect to /dashboard
```

### 3. Authentication Flow
```
User submits form → AuthForm
  → Supabase Auth (signInWithPassword)
  → Store session in cookies
  → Redirect to /dashboard
  → Middleware validates on each request
```

---

## State Management

### Client State
- **React useState**: Local component state
- **React Context**: Auth state, toast notifications

### Server State
- **Supabase**: User data, calculations, subscriptions
- **Next.js Server Components**: Data fetching

### No external state library needed for MVP
- React's built-in tools are sufficient
- Add Zustand or Jotai later if needed

---

## File Naming Conventions

- **Components**: PascalCase (`Calculator.tsx`)
- **Utilities**: camelCase (`calculateRetirement.ts`)
- **API Routes**: lowercase (`route.ts` in folder)
- **Pages**: lowercase (`page.tsx` in folder)
- **Types**: PascalCase (`CalculationType`)

---

## Import Aliases (tsconfig.json)

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["components/*"],
      "@/lib/*": ["lib/*"],
      "@/types/*": ["types/*"],
      "@/hooks/*": ["hooks/*"]
    }
  }
}
```

Usage:
```typescript
import { Calculator } from '@/components/Calculator'
import { createClient } from '@/lib/supabase/client'
import { CalculationType } from '@/types/calculation'
```

---

## Summary

- **Total Files**: ~60-80 files
- **Lines of Code**: ~3,000-4,000 LOC (estimated)
- **Build Time**: 14 days for MVP
- **Complexity**: Low-to-medium (beginner-friendly)

This structure is:
- ✅ Scalable (easy to add features)
- ✅ Maintainable (clear separation of concerns)
- ✅ Type-safe (TypeScript everywhere)
- ✅ Next.js 14 best practices
- ✅ Easy to understand for solo developer
