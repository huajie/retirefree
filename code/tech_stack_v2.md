# RetireFree Tech Stack v2.0

## Overview
A modern, serverless stack optimized for rapid MVP development with minimal costs ($200 budget), maximum scalability, and **multi-platform support** (web + native mobile apps).

**Key Changes from v1:**
- ✅ Primary AI provider: **DeepSeek** (cost-effective, high performance)
- ✅ AI provider abstraction layer (easy switching between DeepSeek, Claude, OpenAI, Gemini)
- ✅ API-first architecture for mobile app consumption
- ✅ Native mobile app readiness (React Native/Expo)

---

## Frontend (Web)

### Next.js 14 (App Router)
- **Version**: 14.x (latest stable)
- **Why**: React framework with built-in SSR, API routes, file-based routing, and excellent performance
- **Key Features**:
  - App Router for modern routing patterns
  - Server Components for optimal performance
  - Built-in image optimization
  - TypeScript support
  - **API routes serve as backend for both web and mobile clients**

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

## Frontend (Mobile) - Phase 2

### React Native + Expo
- **Version**: Expo SDK 50+ (latest stable)
- **Why**: Build native iOS and Android apps with React/TypeScript
- **Key Features**:
  - Single codebase for iOS + Android
  - Fast iteration with Expo Go
  - Over-the-air updates
  - Excellent TypeScript support
  - Native modules for platform-specific features

### Expo Router
- **Why**: File-based routing (similar to Next.js App Router)
- **Benefits**: Consistent navigation patterns across web and mobile

### NativeWind (Tailwind for React Native)
- **Why**: Use same Tailwind classes as web app
- **Benefits**: Shared design system, faster development

### Shared Code Strategy
```
retirewise/
├── packages/
│   ├── shared/          # Shared business logic
│   │   ├── api/         # API client (fetch wrapper)
│   │   ├── types/       # TypeScript types
│   │   ├── utils/       # Helper functions
│   │   └── constants/   # Shared constants
│   ├── web/             # Next.js web app
│   └── mobile/          # Expo mobile app
```

**Shared Components**: 60-70% code reuse between web and mobile
**Platform-Specific**: Navigation, authentication flows, payment UI

---

## Backend (API-First Architecture)

### Next.js API Routes
- **Why**: Serverless functions that serve both web and mobile clients
- **Key APIs**:
  - `/api/auth/*` - Authentication endpoints
  - `/api/calculate` - AI withdrawal calculations
  - `/api/user/profile` - User profile CRUD
  - `/api/stripe/*` - Payment webhooks
  - `/api/dashboard/*` - Dashboard data
- **Response Format**: JSON (consumed by web and mobile)
- **Authentication**: JWT tokens in headers (works for both platforms)

### Supabase (PostgreSQL)
- **Tier**: Free (500MB database, 2GB bandwidth, 50,000 monthly active users)
- **Why**: Open-source Firebase alternative with PostgreSQL
- **Features Used**:
  - PostgreSQL database
  - Authentication (email/password, magic links)
  - Row Level Security (RLS)
  - Real-time subscriptions (optional)
  - Storage (profile images if needed)
- **Client**:
  - Web: @supabase/supabase-js v2
  - Mobile: @supabase/supabase-js v2 (same client works on React Native)

---

## Authentication

### Supabase Auth
- **Methods**:
  - Email + Password
  - Magic Links (passwordless)
  - Google OAuth (optional, for better conversion)
- **Session Management**: JWT tokens with automatic refresh
- **Security**: Row Level Security policies on all tables
- **Mobile Support**: Expo AuthSession for OAuth flows

---

## Payments

### Stripe
- **Tier**: Free (2.9% + $0.30 per transaction)
- **Why**: Industry-standard payment processor with excellent API
- **Products**:
  - **Web**: Stripe Checkout (hosted payment page)
  - **Mobile**: Stripe React Native SDK
  - Customer Portal (self-service subscription management)
  - Webhooks (payment event handling)
- **Client**:
  - Web: stripe npm package
  - Mobile: @stripe/stripe-react-native
- **Pricing Model**: $15/month subscription

---

## AI (Multi-Provider Abstraction)

### Primary: DeepSeek API
- **Model**: deepseek-chat (latest)
- **Tier**: Pay-as-you-go (~$0.27 per million input tokens, ~$1.10 per million output tokens)
- **Why**:
  - **85% cheaper than Claude** for similar quality
  - Excellent reasoning capabilities
  - Fast response times
  - Growing ecosystem
- **Budget**: ~$2-5 for first 100 users (vs $10-20 with Claude)
- **Client**: Custom HTTP client or OpenAI-compatible SDK

### AI Provider Abstraction Layer

**Architecture Pattern**: Strategy Pattern with Provider Interface

```typescript
// packages/shared/ai/types.ts
export interface AIProvider {
  name: string;
  generateAdvice(params: CalculationParams): Promise<AIResponse>;
  estimateCost(inputTokens: number, outputTokens: number): number;
}

export interface CalculationParams {
  age: number;
  savings: number;
  monthlyExpenses: number;
  riskTolerance: 'low' | 'medium' | 'high';
}

export interface AIResponse {
  withdrawalAmount: number;
  confidence: number;
  advice: string;
  reasoning: string;
}
```

**Supported Providers**:
1. **DeepSeek** (Primary)
   - Cost: $0.27 input / $1.10 output per 1M tokens
   - Speed: Fast
   - Quality: High

2. **Claude 3.5 Sonnet** (Fallback/Premium)
   - Cost: $3 input / $15 output per 1M tokens
   - Speed: Fast
   - Quality: Excellent
   - Use case: Premium tier users

3. **OpenAI GPT-4o** (Alternative)
   - Cost: $2.50 input / $10 output per 1M tokens
   - Speed: Fast
   - Quality: Excellent

4. **Google Gemini 1.5 Pro** (Alternative)
   - Cost: $1.25 input / $5 output per 1M tokens
   - Speed: Fast
   - Quality: High

**Provider Selection Logic**:
```typescript
// packages/shared/ai/provider-factory.ts
export function getAIProvider(config: {
  provider: 'deepseek' | 'claude' | 'openai' | 'gemini';
  fallbackProvider?: string;
}): AIProvider {
  switch (config.provider) {
    case 'deepseek':
      return new DeepSeekProvider();
    case 'claude':
      return new ClaudeProvider();
    case 'openai':
      return new OpenAIProvider();
    case 'gemini':
      return new GeminiProvider();
    default:
      return new DeepSeekProvider(); // Default to DeepSeek
  }
}
```

**Environment Variables**:
```bash
# Primary provider
AI_PROVIDER=deepseek
DEEPSEEK_API_KEY=sk-xxx

# Fallback providers (optional)
CLAUDE_API_KEY=sk-ant-xxx
OPENAI_API_KEY=sk-xxx
GEMINI_API_KEY=xxx

# Feature flags
ENABLE_MULTI_PROVIDER=true
ALLOW_USER_PROVIDER_SELECTION=false # Premium feature
```

**Cost Comparison (per 100 calculations)**:
| Provider | Avg Tokens (in/out) | Cost per 100 | Cost per 1000 |
|----------|---------------------|--------------|---------------|
| DeepSeek | 500/1500 | $0.18 | $1.80 |
| Claude | 500/1500 | $2.85 | $28.50 |
| OpenAI | 500/1500 | $2.25 | $22.50 |
| Gemini | 500/1500 | $1.38 | $13.80 |

**Decision**: DeepSeek saves ~93% compared to Claude

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
- **Mobile Support**: API routes accessible from mobile apps via HTTPS

### Domain
- **Registrar**: Namecheap or Cloudflare
- **Cost**: ~$10-15/year for .com
- **DNS**: Vercel or Cloudflare
- **Options**: (to be determined after domain search)

### Mobile App Distribution

#### iOS (App Store)
- **Apple Developer Account**: $99/year (deferred to Phase 2)
- **TestFlight**: Free beta testing
- **Review Time**: 1-3 days

#### Android (Google Play)
- **Google Play Console**: $25 one-time fee (deferred to Phase 2)
- **Internal Testing**: Free, instant
- **Review Time**: Few hours to 1 day

#### MVP Strategy
- **Phase 1 (Weeks 1-2)**: Web app only
- **Phase 2 (Month 2)**: Mobile app after first 50-100 paying web users
- **Beta Distribution**: Expo EAS Build + TestFlight/Google Play Internal Testing

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
- **Mobile**: Same API for mobile-triggered emails

---

## Analytics

### Plausible Analytics (Web)
- **Tier**: Free trial (30 days), then $9/month
- **Alternative**: Simple Analytics ($9/month) or Google Analytics (free)
- **Why**: Privacy-friendly, GDPR compliant, lightweight
- **Metrics**:
  - Page views
  - Conversion tracking
  - Goal completions

### PostHog (Mobile + Web)
- **Tier**: Free (1M events/month)
- **Why**: Product analytics with mobile SDKs
- **Features**:
  - Event tracking
  - Session replay (web)
  - Feature flags
  - A/B testing
- **Mobile SDK**: posthog-react-native

---

## Development Tools

### Monorepo Management
- **Tool**: Turborepo or pnpm workspaces
- **Why**: Share code between web and mobile apps
- **Structure**:
  ```
  retirewise/
  ├── apps/
  │   ├── web/          # Next.js app
  │   └── mobile/       # Expo app
  ├── packages/
  │   ├── shared/       # Shared business logic
  │   ├── ui/           # Shared UI components
  │   └── config/       # Shared config (ESLint, TS)
  └── package.json
  ```

### Version Control
- **Git**: GitHub (free private repos)
- **Branching**: main (production), develop (staging), mobile (mobile dev)

### Package Manager
- **pnpm** (recommended) or **npm**
- **Why pnpm**: Faster, more efficient disk usage, great for monorepos

### Code Quality
- **ESLint**: Next.js + React Native configs
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks (optional)
- **TypeScript**: Strict mode across all packages

### Environment Management
- **.env.local**: Local development
- **Vercel Environment Variables**: Production secrets
- **Expo EAS Secrets**: Mobile app secrets

---

## Database Schema (Supabase)

### Tables

#### users (managed by Supabase Auth)
- Automatically created by Supabase

#### user_profiles
```sql
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  age INTEGER,
  retirement_age INTEGER,
  platform TEXT DEFAULT 'web', -- 'web', 'ios', 'android'
  app_version TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### calculations
```sql
CREATE TABLE calculations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users,
  current_age INTEGER NOT NULL,
  savings_amount DECIMAL NOT NULL,
  monthly_expenses DECIMAL NOT NULL,
  calculated_withdrawal DECIMAL NOT NULL,
  ai_provider TEXT DEFAULT 'deepseek', -- Track which AI was used
  ai_advice TEXT,
  ai_reasoning TEXT,
  platform TEXT, -- 'web', 'ios', 'android'
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_user_calculations (user_id, created_at DESC)
);
```

#### subscriptions
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  status TEXT NOT NULL, -- 'active', 'canceled', 'past_due'
  plan_type TEXT DEFAULT 'monthly', -- 'monthly'
  platform TEXT, -- 'web', 'ios', 'android'
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_user_subscription (user_id)
);
```

#### ai_provider_usage (for cost tracking)
```sql
CREATE TABLE ai_provider_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  calculation_id UUID REFERENCES calculations,
  provider TEXT NOT NULL, -- 'deepseek', 'claude', 'openai', 'gemini'
  input_tokens INTEGER,
  output_tokens INTEGER,
  estimated_cost DECIMAL,
  response_time_ms INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_provider_stats (provider, created_at DESC)
);
```

---

## Cost Breakdown

### MVP Phase (Month 1 - Web Only)

| Service | Tier | Monthly Cost |
|---------|------|--------------|
| Vercel | Free | $0 |
| Supabase | Free | $0 |
| Stripe | Pay-per-use | ~$0-5 (2.9% per transaction) |
| **DeepSeek API** | Pay-per-use | **~$2-5** (first 100 users) |
| Resend | Free | $0 |
| Domain | Annual | ~$1/month |
| **Total** | | **~$3-11/month** |

**First Month**: ~$13 (domain $12 + minimal API usage $1)
**Budget Remaining**: $187 for marketing, testing, scaling

### Phase 2 (Month 2 - Add Mobile)

| Additional Cost | Amount |
|----------------|---------|
| Google Play Console | $25 one-time |
| Apple Developer | $99/year (if iOS ready) |
| EAS Build (Expo) | Free tier (30 builds/month) |
| **Total** | $25-124 one-time |

**Monthly Costs Stay Same**: Mobile apps use same backend APIs

---

## Scaling Path

### When to Upgrade (>500 users):
- Supabase Pro: $25/month (8GB database, better support)
- Vercel Pro: $20/month (more bandwidth, better analytics)
- Consider caching with Upstash Redis (free tier available)
- EAS Production Plan: $399/year (if using Expo)

### Performance Optimizations:
- Next.js Image optimization (automatic)
- Static generation for landing page
- Edge functions for auth checks
- Database indexing on user_id columns
- **Mobile**: Image caching with react-native-fast-image
- **Mobile**: Offline support with AsyncStorage + sync

### AI Cost Optimization:
- Cache common calculations (Redis or Supabase)
- Batch similar requests
- Use cheaper providers for non-premium users
- Implement rate limiting (5 calculations/day for free users)

---

## Security Considerations

1. **Environment Variables**: Never commit secrets
2. **API Routes**: Validate all inputs, check authentication
3. **Supabase RLS**: Enable on all tables
4. **HTTPS**: Automatic with Vercel
5. **CORS**: Configure for mobile app origins
6. **Rate Limiting**: Use Vercel Edge Config or Upstash
7. **Input Validation**: Zod for schema validation (shared between web and mobile)
8. **Mobile**:
   - Secure API keys with react-native-dotenv
   - Certificate pinning for API calls
   - Biometric authentication (FaceID, TouchID)

---

## Developer Experience

### Hot Reload
- Next.js Fast Refresh for web
- Expo Fast Refresh for mobile

### Type Safety
- TypeScript across web, mobile, and API routes
- Supabase generated types (shared package)
- Shared types package for consistency

### Testing (Phase 2)
- **Web**: Jest + React Testing Library
- **Mobile**: Jest + React Native Testing Library
- **E2E**: Detox (mobile) + Playwright (web)

---

## Mobile App Implementation Timeline

### Phase 1: Web MVP (Weeks 1-2) - CURRENT FOCUS
- ✅ Build web app with API-first architecture
- ✅ All API routes return JSON (mobile-ready)
- ✅ Authentication via JWT tokens (works for mobile)
- ✅ Launch and get first 50-100 users

### Phase 2: Mobile Preparation (Week 3-4)
- Create monorepo structure with Turborepo
- Extract shared business logic to packages/shared
- Set up Expo project in apps/mobile
- Create API client wrapper (works for both platforms)

### Phase 3: Mobile MVP (Month 2)
- Build core mobile screens (Calculator, Dashboard)
- Implement mobile authentication flow
- Add Stripe React Native integration
- Beta testing with TestFlight + Google Play Internal Testing

### Phase 4: Mobile Launch (Month 3)
- Submit to App Store + Google Play
- Launch marketing campaign for mobile
- Add mobile-specific features (push notifications, offline support)

---

## API Design for Mobile Support

### RESTful Endpoints (mobile-ready)

#### Authentication
```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
```

#### User Profile
```
GET    /api/user/profile
PATCH  /api/user/profile
DELETE /api/user/profile
```

#### Calculations
```
POST /api/calculate
GET  /api/calculations (paginated)
GET  /api/calculations/:id
```

#### Subscriptions
```
POST /api/subscription/create
GET  /api/subscription/status
POST /api/subscription/cancel
```

#### Dashboard
```
GET /api/dashboard/summary
GET /api/dashboard/charts
```

**Response Format**: All endpoints return JSON
```json
{
  "success": true,
  "data": { ... },
  "error": null
}
```

**Error Format**:
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Age must be between 18 and 100"
  }
}
```

---

## Summary

### Key Advantages of v2 Architecture

1. **85-93% Lower AI Costs**: DeepSeek vs Claude/OpenAI
2. **Multi-Platform Ready**: API-first design works for web + mobile
3. **Easy AI Switching**: Abstract provider layer, swap anytime
4. **Shared Codebase**: 60-70% code reuse between web and mobile
5. **Progressive Rollout**: Launch web first, add mobile later
6. **Low Risk**: Validate market with web before investing in mobile apps

### Total Costs

**Month 1 (Web MVP)**: $13 (domain) + $1 (DeepSeek) = $14
**Month 2 (Add Mobile)**: $14/month + $25 (Google Play) + $0 (iOS later) = $39
**Month 3+**: $14-25/month (depending on usage)

**Budget**: Well within $200 limit, with $161-186 remaining for marketing

### Development Time

- **Web MVP**: 14 days (unchanged from v1)
- **Mobile Prep**: 7 days (monorepo setup, code extraction)
- **Mobile MVP**: 14 days (after web launch)
- **Total Time to Full Platform**: 35 days (5 weeks)

---

## Next Steps

1. ✅ Finalize domain name (alternatives to retirefree.app)
2. ✅ Set up accounts (Vercel, Supabase, Stripe, DeepSeek)
3. ✅ Start web MVP development (follow implementation_plan.md)
4. ✅ Launch web app and get first 50 users
5. ⏳ Extract shared logic and set up monorepo (Week 3-4)
6. ⏳ Build mobile MVP (Month 2)
7. ⏳ Submit to app stores (Month 3)

**This architecture provides maximum flexibility with minimal costs while preparing for multi-platform growth.**
