# RetireFree 14-Day Implementation Plan

## Overview
This plan breaks down the MVP build into daily tasks with clear deliverables. Each day builds on the previous, with testing and polish built in throughout.

**Goal**: Launchable product by Day 14 with core features working

---

## Phase 1: Foundation (Days 1-3)

### Day 1: Project Setup + Landing Page Structure
**Time**: 6-8 hours

**Tasks**:
1. ✅ Initialize Next.js 14 project
   ```bash
   npx create-next-app@latest retirewise --typescript --tailwind --app
   ```
2. ✅ Install dependencies
   ```bash
   pnpm add @supabase/supabase-js @supabase/ssr stripe @stripe/stripe-js @anthropic-ai/sdk resend zod react-email
   pnpm add -D @types/node
   ```
3. ✅ Setup folder structure (see project_structure.md)
4. ✅ Configure Tailwind + add custom colors
5. ✅ Create basic layout components
   - Header with logo + navigation
   - Footer
   - Layout wrapper
6. ✅ Build landing page structure
   - Hero section (headline, subheading, CTA)
   - Features section (3-4 key benefits)
   - Simple pricing preview
   - Footer with links

**Deliverables**:
- [ ] Project initialized and running on localhost
- [ ] Landing page with placeholder content
- [ ] Basic styling with Tailwind
- [ ] Responsive layout (mobile-first)

**Validation**: `npm run dev` works, landing page looks decent on mobile and desktop

---

### Day 2: Calculator UI + Validation
**Time**: 6-8 hours

**Tasks**:
1. ✅ Create Calculator component
   - Input fields: Current Age, Savings Amount, Monthly Expenses
   - Optional fields: Retirement Age, Risk Tolerance
2. ✅ Add Zod validation schemas
   ```typescript
   // lib/validations.ts
   - Age: 18-100
   - Savings: $1,000 - $100,000,000
   - Expenses: $100 - $100,000
   ```
3. ✅ Create CalculationResult component (placeholder for now)
4. ✅ Build UI components
   - Button (primary, secondary, loading states)
   - Input (text, number, with validation errors)
   - Card
   - Spinner
5. ✅ Add form state management
   - React useState for form data
   - Client-side validation
   - Error messages
6. ✅ Create placeholder calculation logic (mock response)

**Deliverables**:
- [ ] Functional calculator form with validation
- [ ] Clean, professional UI
- [ ] Error handling for invalid inputs
- [ ] Mock calculation result display

**Validation**: Form validates inputs, shows errors, displays mock results

---

### Day 3: Supabase Setup + Database
**Time**: 6-8 hours

**Tasks**:
1. ✅ Create Supabase project (free tier)
2. ✅ Setup database schema
   ```sql
   -- Run in Supabase SQL editor
   - user_profiles table
   - calculations table
   - subscriptions table
   ```
3. ✅ Enable Row Level Security (RLS)
   ```sql
   -- Policies for each table
   - Users can only see their own data
   - Authenticated users can insert
   ```
4. ✅ Generate TypeScript types
   ```bash
   npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.ts
   ```
5. ✅ Setup Supabase clients
   - Browser client (lib/supabase/client.ts)
   - Server client (lib/supabase/server.ts)
6. ✅ Configure environment variables
   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   ```
7. ✅ Test database connection

**Deliverables**:
- [ ] Supabase project configured
- [ ] Database tables created with RLS
- [ ] Supabase clients working
- [ ] TypeScript types generated

**Validation**: Can connect to Supabase from Next.js, insert test data

---

## Phase 2: Core Features (Days 4-7)

### Day 4: Stripe Integration
**Time**: 6-8 hours

**Tasks**:
1. ✅ Create Stripe account (test mode)
2. ✅ Create products + prices
   - Monthly plan: $29/month
   - One-time analysis: $99
3. ✅ Setup Stripe client (lib/stripe/client.ts)
4. ✅ Build pricing page
   - PricingCard components
   - Feature comparison
   - CTAs for each plan
5. ✅ Create checkout API route
   ```typescript
   // app/api/stripe/checkout/route.ts
   - Create checkout session
   - Return session URL
   ```
6. ✅ Add success/cancel redirect pages
   - /dashboard/billing/success
   - /dashboard/billing/canceled
7. ✅ Test checkout flow (test mode)

**Deliverables**:
- [ ] Stripe configured in test mode
- [ ] Pricing page with working checkout buttons
- [ ] Checkout redirects to Stripe
- [ ] Success page shows after test payment

**Validation**: Can click "Subscribe", complete test checkout, redirect to success page

---

### Day 5: Stripe Webhooks + Subscription Management
**Time**: 6-8 hours

**Tasks**:
1. ✅ Setup Stripe webhook endpoint
   ```typescript
   // app/api/stripe/webhook/route.ts
   - Verify signature
   - Handle events: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted
   ```
2. ✅ Add webhook URL to Stripe dashboard
   - Use ngrok for local testing: `ngrok http 3000`
3. ✅ Implement subscription logic
   - Create/update subscriptions table on payment
   - Store Stripe customer ID and subscription ID
4. ✅ Build Customer Portal integration
   ```typescript
   // app/api/stripe/portal/route.ts
   - Create portal session
   - Redirect to Stripe portal
   ```
5. ✅ Create billing page
   - Show current plan
   - "Manage Subscription" button
   - Cancel/upgrade options
6. ✅ Test webhook events with Stripe CLI
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   stripe trigger checkout.session.completed
   ```

**Deliverables**:
- [ ] Webhooks working and updating database
- [ ] Subscription data stored correctly
- [ ] Customer Portal accessible
- [ ] Billing page shows subscription status

**Validation**: Complete checkout, see subscription in database, access portal

---

### Day 6: Authentication + Protected Routes
**Time**: 6-8 hours

**Tasks**:
1. ✅ Enable Supabase Auth
   - Email + password
   - Magic links (optional)
2. ✅ Create auth pages
   - /auth/login
   - /auth/signup
   - /auth/callback (for magic links)
3. ✅ Build AuthForm component
   - Toggle between login/signup
   - Email and password fields
   - Error handling
4. ✅ Implement authentication logic
   ```typescript
   // hooks/useAuth.ts
   - signUp()
   - signIn()
   - signOut()
   - useEffect to check session
   ```
5. ✅ Setup middleware for protected routes
   ```typescript
   // middleware.ts
   - Check auth on /dashboard/* routes
   - Redirect to /auth/login if not authenticated
   ```
6. ✅ Add user menu to header
   - Profile dropdown
   - Logout button
7. ✅ Create dashboard layout
   - Sidebar navigation
   - User info display

**Deliverables**:
- [ ] Working signup/login flow
- [ ] Protected dashboard routes
- [ ] Session persistence
- [ ] User can logout

**Validation**: Can signup, login, access dashboard, logout, cannot access dashboard when logged out

---

### Day 7: Testing + Bug Fixes
**Time**: 6-8 hours

**Tasks**:
1. ✅ Test entire user flow
   - Landing page → Signup → Login → Dashboard → Pricing → Checkout → Billing
2. ✅ Fix bugs found during testing
3. ✅ Improve error handling
   - Add try/catch blocks
   - User-friendly error messages
   - Toast notifications
4. ✅ Add loading states
   - Spinner during API calls
   - Disabled buttons while loading
5. ✅ Test on mobile devices
   - Responsive layout issues
   - Touch targets
6. ✅ Improve accessibility
   - ARIA labels
   - Keyboard navigation
   - Focus states
7. ✅ Code cleanup
   - Remove console.logs
   - Add comments
   - Fix TypeScript errors

**Deliverables**:
- [ ] All critical bugs fixed
- [ ] Smooth user experience
- [ ] Mobile-friendly
- [ ] No TypeScript errors

**Validation**: User flow works end-to-end without errors

---

## Phase 3: AI Integration (Days 8-10)

### Day 8: Claude API Integration
**Time**: 6-8 hours

**Tasks**:
1. ✅ Get Claude API key (Anthropic Console)
2. ✅ Setup Anthropic client
   ```typescript
   // lib/ai/client.ts
   import Anthropic from '@anthropic-ai/sdk'
   ```
3. ✅ Create AI calculation logic
   ```typescript
   // lib/ai/calculate.ts
   - Build prompt with user data
   - Call Claude API
   - Parse response
   ```
4. ✅ Design prompt template
   - Input: age, savings, expenses
   - Output: withdrawal amount + advice
   - See ai_logic.md for details
5. ✅ Create API route
   ```typescript
   // app/api/calculate/route.ts
   - Validate input
   - Check auth
   - Call AI calculation
   - Save to database
   - Return result
   ```
6. ✅ Add environment variable
   ```
   ANTHROPIC_API_KEY=
   ```
7. ✅ Test with sample inputs

**Deliverables**:
- [ ] Claude API working
- [ ] Calculations return realistic results
- [ ] Results saved to database
- [ ] API route secured (auth required)

**Validation**: Calculator form calls API, returns AI-generated advice

---

### Day 9: Calculation Results + History
**Time**: 6-8 hours

**Tasks**:
1. ✅ Enhance CalculationResult component
   - Display withdrawal amount (large, prominent)
   - Show AI advice (formatted nicely)
   - Add explanation section
   - "Save" and "Email Results" buttons
2. ✅ Create calculation history page
   ```typescript
   // app/dashboard/calculations/page.tsx
   - Fetch user's past calculations
   - Display in cards or table
   - Click to view details
   ```
3. ✅ Add calculations API route
   ```typescript
   // app/api/user/calculations/route.ts
   - GET: Fetch user's calculations
   - Paginated (10 per page)
   ```
4. ✅ Implement "Save Calculation" feature
   - Auto-save to database on calculation
   - Show success message
5. ✅ Add comparison feature (optional)
   - Compare two calculations side-by-side
6. ✅ Improve result visualization
   - Chart showing withdrawal over time (optional)
   - Progress bar for savings longevity

**Deliverables**:
- [ ] Beautiful calculation results display
- [ ] Working calculation history
- [ ] Can view past calculations
- [ ] Results saved automatically

**Validation**: Run calculation, see result, view history, see past calculations

---

### Day 10: AI Refinement + Edge Cases
**Time**: 6-8 hours

**Tasks**:
1. ✅ Test AI with various inputs
   - Young savers (30s)
   - Near-retirees (60s)
   - Low savings
   - High savings
   - High expenses
2. ✅ Refine prompt for better advice
   - Add examples to prompt
   - Adjust temperature
   - Handle edge cases
3. ✅ Add input constraints
   - Prevent unrealistic inputs
   - Add helpful hints
4. ✅ Improve error handling
   - Handle API failures
   - Retry logic
   - Fallback messaging
5. ✅ Add rate limiting (optional)
   - Prevent abuse
   - Free users: 3 calculations/day
   - Paid users: unlimited
6. ✅ Optimize API costs
   - Cache common calculations
   - Shorter prompts where possible
7. ✅ Add loading indicators
   - "Calculating..." message
   - Progress dots

**Deliverables**:
- [ ] AI gives high-quality advice
- [ ] Edge cases handled gracefully
- [ ] Fast response times
- [ ] Good error messages

**Validation**: Test 10+ different scenarios, all produce useful results

---

## Phase 4: Polish & Launch (Days 11-14)

### Day 11: Email System
**Time**: 6-8 hours

**Tasks**:
1. ✅ Setup Resend account
2. ✅ Add environment variable
   ```
   RESEND_API_KEY=
   ```
3. ✅ Create email templates
   ```typescript
   // emails/WelcomeEmail.tsx
   - Welcome new users
   - Link to dashboard
   ```
   ```typescript
   // emails/CalculationEmail.tsx
   - Send calculation results
   - Summary of advice
   - Link to full details
   ```
4. ✅ Implement email sending
   ```typescript
   // lib/email/client.ts
   - Send welcome email on signup
   - Send calculation results on request
   ```
5. ✅ Add "Email Results" button to calculator
   - Trigger email send
   - Show success toast
6. ✅ Test emails
   - Check formatting
   - Verify links work
7. ✅ Setup email preferences (optional)
   - User can opt out of emails

**Deliverables**:
- [ ] Welcome emails sent on signup
- [ ] Calculation results can be emailed
- [ ] Emails look professional
- [ ] All links work

**Validation**: Signup and receive welcome email, calculate and email results

---

### Day 12: UI Polish + Content
**Time**: 6-8 hours

**Tasks**:
1. ✅ Improve landing page copy
   - Compelling headline
   - Clear value proposition
   - Social proof (testimonials or stats)
   - Strong CTA
2. ✅ Add more features to landing page
   - How it works section
   - FAQ section
   - Trust indicators
3. ✅ Polish calculator UI
   - Better labels and hints
   - Input formatting (currency, percentages)
   - Visual feedback
4. ✅ Enhance dashboard
   - Welcome message
   - Quick stats
   - Recent calculations
5. ✅ Add metadata for SEO
   ```typescript
   // app/page.tsx
   export const metadata = {
     title: 'RetireFree - AI-Powered Retirement Planning',
     description: '...',
     openGraph: {...}
   }
   ```
6. ✅ Create Open Graph image
   - Design in Figma/Canva
   - 1200x630px
7. ✅ Add favicon

**Deliverables**:
- [ ] Professional, polished UI
- [ ] Compelling copy on landing page
- [ ] SEO metadata added
- [ ] Brand assets (logo, OG image, favicon)

**Validation**: Landing page converts well, dashboard is intuitive

---

### Day 13: Final Testing + Fixes
**Time**: 6-8 hours

**Tasks**:
1. ✅ Complete end-to-end testing
   - Every user flow
   - All API routes
   - Payment flows
   - Email sending
2. ✅ Cross-browser testing
   - Chrome, Firefox, Safari, Edge
   - Mobile Safari, Chrome mobile
3. ✅ Fix all remaining bugs
   - Prioritize critical bugs
   - Document minor issues for later
4. ✅ Performance optimization
   - Optimize images
   - Lazy load components
   - Check Lighthouse score
5. ✅ Security check
   - No exposed API keys
   - All routes authenticated properly
   - RLS policies working
6. ✅ Add analytics
   - Setup Plausible or GA4
   - Track key events (signups, calculations, checkouts)
7. ✅ Final code review
   - Remove dead code
   - Fix linting issues
   - Update README

**Deliverables**:
- [ ] Zero critical bugs
- [ ] Works on all major browsers
- [ ] Fast load times (Lighthouse score >80)
- [ ] Analytics tracking
- [ ] Clean, production-ready code

**Validation**: Every feature works flawlessly, no console errors

---

### Day 14: Deploy + Launch
**Time**: 6-8 hours

**Tasks**:
1. ✅ Setup custom domain
   - Buy domain (Namecheap/Cloudflare)
   - Configure DNS
2. ✅ Deploy to Vercel
   - Connect GitHub repo
   - Add environment variables
   - Deploy production
3. ✅ Configure production services
   - Stripe: Enable live mode, update webhook
   - Supabase: Check connection pooling
   - Resend: Verify domain
4. ✅ Test production deployment
   - Signup with real email
   - Run calculation
   - Complete real payment (then refund)
5. ✅ Setup monitoring
   - Vercel analytics
   - Supabase dashboard
   - Stripe dashboard
6. ✅ Create launch checklist
   - [ ] Domain working
   - [ ] HTTPS enabled
   - [ ] All API keys working
   - [ ] Payments processing
   - [ ] Emails sending
7. ✅ Soft launch
   - Share with friends/family
   - Collect initial feedback
   - Fix urgent issues
8. ✅ Prepare for public launch
   - Social media posts
   - Product Hunt submission (optional)
   - Email to waitlist (if applicable)

**Deliverables**:
- [ ] Live production site
- [ ] Custom domain with HTTPS
- [ ] All services working in production
- [ ] Monitoring setup
- [ ] Ready for public launch

**Validation**: Site is live, fully functional, and ready for users

---

## Daily Schedule Template

Each day should follow this structure:

**Morning (3-4 hours)**:
- Review previous day's work
- Start on main tasks
- Focus on core functionality

**Afternoon (3-4 hours)**:
- Continue implementation
- Test as you build
- Fix bugs immediately

**Evening (1-2 hours, optional)**:
- Polish UI
- Write documentation
- Prepare for next day

**Total**: 6-8 hours/day = 84-112 hours total

---

## Risk Mitigation

### If Behind Schedule:
- **Day 7**: Cut comparison feature, focus on core
- **Day 10**: Simplify AI prompt, ship basic version
- **Day 12**: Use minimal landing page, polish post-launch
- **Day 14**: Launch with known minor bugs, fix in week 2

### If Ahead of Schedule:
- Add more features to landing page
- Build admin dashboard
- Add more AI features (scenarios, projections)
- Improve visualizations (charts, graphs)

---

## Success Criteria

By Day 14, you should have:
- ✅ Live, working product at custom domain
- ✅ Users can signup, login, calculate, pay
- ✅ AI calculations providing value
- ✅ No critical bugs
- ✅ Ready to acquire first paying customers

**Launch goal**: 10 signups, 1 paid customer in first week

---

## Post-Launch (Week 3+)

**Week 3: Iterate based on feedback**
- Fix reported bugs
- Add requested features
- Improve conversion rate

**Week 4: Growth**
- Content marketing (blog posts)
- SEO optimization
- Paid ads (if budget allows)
- Product Hunt launch

**Month 2: Scale**
- Add advanced features
- Improve AI accuracy
- Build community
- Reach profitability

---

## Resources Needed

- **Time**: 84-112 hours (6-8 hrs/day × 14 days)
- **Budget**: $200
  - Domain: $15
  - Stripe fees: ~$5 (testing)
  - API usage: ~$20
  - Buffer: $160
- **Tools**: VSCode, GitHub, Figma/Canva (free tier)
- **Accounts**: Vercel, Supabase, Stripe, Anthropic, Resend

---

## Summary

This plan is:
- ✅ **Realistic**: 14 days for solo developer
- ✅ **Structured**: Clear daily tasks
- ✅ **Flexible**: Can adjust if ahead/behind
- ✅ **Complete**: Covers all MVP features
- ✅ **Launch-ready**: Includes deployment and testing

**Total MVP**: ~100 hours, 14 days, $200 budget

Let's build! 🚀
