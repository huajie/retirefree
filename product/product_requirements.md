# RetireFree Product Requirements Document (PRD)

**Version:** 1.0
**Date:** February 23, 2026
**Status:** MVP Definition
**Owner:** Product Management

---

## 1. Product Overview & Positioning

### 1.1 Product Summary
RetireFree is an AI-powered retirement spending platform that helps recent retirees optimize their withdrawal strategy and gain confidence they won't run out of money in retirement.

**Tagline:** "Never worry about running out of money in retirement"

**Value Proposition:** Traditional retirement calculators provide static projections. RetireFree provides dynamic, AI-powered recommendations that adapt to market conditions, spending patterns, and life circumstances—giving retirees peace of mind and actionable guidance.

### 1.2 Market Opportunity
- **Target Market:** 60% of retirees are off-track with their retirement spending plans
- **Primary Segment:** Recent retirees aged 65-70 actively managing their withdrawal decisions
- **Pain Points:**
  - Fear of running out of money
  - Uncertainty about safe withdrawal rates
  - Confusion from conflicting advice (4% rule vs. dynamic strategies)
  - Lack of personalized guidance that adapts to their situation

### 1.3 Product Positioning
- **Category:** AI-powered retirement financial planning tool
- **Differentiator:** Real-time, personalized AI recommendations vs. static calculators
- **Pricing:** $15/month with 7-day free trial
- **Go-to-Market:** Bootstrap approach with $200 initial budget, 14-day MVP timeline

---

## 2. Target User Personas

### Persona 1: "Cautious Carol"
**Demographics:**
- Age: 67
- Status: Recently retired teacher
- Portfolio: $600K in 401(k) and IRAs
- Income: $2,200/month Social Security

**Behaviors:**
- Checks portfolio weekly
- Reads retirement planning articles regularly
- Conservative investor (60/40 stock/bond allocation)
- Afraid to spend her savings

**Goals:**
- Understand how much she can safely spend monthly
- Avoid running out of money
- Maintain her lifestyle without constant worry

**Pain Points:**
- Paralyzed by conflicting advice online
- Doesn't trust financial advisors (cost concerns)
- Worries every market downturn means she needs to cut spending

**RetireFree Use Case:**
- Uses landing page calculator to get initial confidence
- Signs up to get monthly spending recommendations
- Checks dashboard after market volatility for reassurance

---

### Persona 2: "Active Andrew"
**Demographics:**
- Age: 65
- Status: Newly retired corporate executive
- Portfolio: $1.2M across retirement accounts
- Income: $3,000/month Social Security

**Behaviors:**
- Wants to travel extensively in early retirement
- Tech-savvy, uses multiple financial apps
- Willing to adjust spending based on market conditions
- Moderate risk tolerance (70/30 allocation)

**Goals:**
- Maximize spending in healthy years (65-75)
- Understand trade-offs between spending now vs. later
- Get data-driven guidance on withdrawal strategy

**Pain Points:**
- Unsure if he can afford higher spending early in retirement
- Wants dynamic strategy, not fixed 4% rule
- Needs confidence to spend on experiences now

**RetireFree Use Case:**
- Attracted by AI-powered optimization promise
- Uses dashboard to model different spending scenarios
- Appreciates personalized recommendations that adapt monthly

---

## 3. User Flows

### 3.1 Primary User Flow: Discovery → Conversion → Engagement

```
Landing Page → Calculator Tool → Results + CTA → Signup → Payment → Dashboard
```

**Detailed Flow:**

1. **Discovery (Landing Page)**
   - User arrives via Google search, social media, or word-of-mouth
   - Sees headline addressing their fear: "Never worry about running out of money"
   - Reads benefit-oriented copy and social proof
   - Call-to-action: "Try our free retirement calculator"

2. **Engagement (Calculator)**
   - Simple form (5 inputs max):
     - Age
     - Total retirement savings
     - Monthly Social Security/pension
     - Desired monthly spending
     - Risk tolerance (Conservative/Moderate/Aggressive)
   - Instant results showing:
     - Probability of success (e.g., "87% chance your money lasts 30+ years")
     - Recommended safe withdrawal amount
     - Visual chart of projected portfolio balance

3. **Conversion (Results → Signup)**
   - Results page shows calculator output
   - Value proposition for paid tier:
     - "Get AI-powered recommendations that adapt every month"
     - "See how market changes affect your plan"
     - "Optimize for higher spending in early retirement"
   - CTA: "Start 7-day free trial ($15/month after)"
   - Email capture form → Stripe Checkout

4. **Payment (Stripe Integration)**
   - Stripe Checkout hosted page
   - Collects email + payment method
   - 7-day trial, then $15/month recurring
   - Confirmation email with dashboard link

5. **Engagement (Dashboard)**
   - Personalized welcome with user's name
   - AI-generated withdrawal recommendation card:
     - "This month, you can safely withdraw $4,200"
     - Confidence level and reasoning
     - Comparison to previous month
   - Visual portfolio projection chart
   - Quick access to update inputs
   - Educational content on withdrawal strategies

---

### 3.2 Secondary Flow: Trial → Paid Conversion

```
Trial Start → Email Reminders (Day 3, Day 6) → Trial End → Payment Processing / Cancellation
```

**Day 3 Email:** "Here's what RetireFree found about your retirement plan..."
**Day 6 Email:** "Your trial ends tomorrow—keep your personalized recommendations"

---

## 4. Feature Specifications

### Feature 1: Landing Page with Retirement Calculator

**Purpose:** Provide immediate value and capture leads through simple retirement assessment

**User Story:**
"As a worried retiree, I want to quickly check if my retirement plan is on track, so I can decide if I need more detailed guidance."

**Components:**

1. **Hero Section**
   - Headline: "Never worry about running out of money in retirement"
   - Subheadline: "Get AI-powered guidance on how much you can safely spend each month"
   - CTA button: "Try Our Free Calculator"
   - Hero image: Confident older couple

2. **Benefits Section**
   - 3 key benefits with icons:
     - "Personalized AI recommendations"
     - "Adapts to market conditions"
     - "Peace of mind guarantee"

3. **Social Proof**
   - Testimonial placeholder (to be added post-launch)
   - "Trusted by 500+ retirees" (update as we grow)

4. **Calculator Tool**
   - Clean, single-page form
   - 5 required inputs:
     - Current age (slider, 60-80)
     - Total retirement savings (text input with $ formatting)
     - Monthly guaranteed income (Social Security + pension)
     - Desired monthly spending (text input)
     - Risk tolerance (radio buttons: Conservative/Moderate/Aggressive)
   - "Calculate" button → instant results on same page

5. **Results Display**
   - Success probability (large percentage with color coding):
     - Green: 85-100% ("Excellent")
     - Yellow: 70-84% ("Good")
     - Red: <70% ("Needs adjustment")
   - Recommended safe withdrawal amount
   - Simple line chart: portfolio balance projection over 30 years
   - CTA: "Get monthly AI recommendations - Start free trial"

**Technical Requirements:**
- Static HTML/CSS/JavaScript (no backend for calculator)
- Calculator logic runs client-side (Monte Carlo simulation simplified)
- Responsive design (mobile-first)
- Load time: <2 seconds
- Analytics: Track calculator completions, CTA clicks

**Acceptance Criteria:**
- [ ] User can input all 5 fields without errors
- [ ] Calculator returns results in <1 second
- [ ] Results display correctly on mobile and desktop
- [ ] CTA button links to signup flow
- [ ] Analytics events fire for calculator_completed and cta_clicked
- [ ] Form validates inputs (e.g., age within range, savings > 0)

---

### Feature 2: Paid Dashboard with AI Withdrawal Recommendations

**Purpose:** Deliver core product value through personalized, dynamic withdrawal guidance

**User Story:**
"As a paying customer, I want to see how much I can safely withdraw this month based on current market conditions and my personal situation, so I can spend confidently without fear of running out."

**Components:**

1. **Dashboard Header**
   - Welcome message: "Welcome back, [First Name]"
   - Current month/year
   - Navigation: Dashboard | Settings | Help

2. **Main Recommendation Card**
   - Primary metric (large, bold):
     - "Safe to withdraw: $4,200 this month"
   - Confidence indicator:
     - "High confidence" (green) / "Moderate confidence" (yellow) / "Low confidence" (red)
   - AI reasoning (2-3 sentences):
     - "Your portfolio is up 3% this quarter, and your spending has been below target. This allows for a 5% increase in withdrawals while maintaining 90% success probability."
   - Comparison to previous month:
     - "↑ $150 from last month"

3. **Portfolio Projection Chart**
   - Interactive line chart showing:
     - Projected portfolio balance over next 30 years
     - Multiple scenarios (best case, expected, worst case)
   - X-axis: Years (0-30)
   - Y-axis: Portfolio value ($)
   - Tooltips on hover

4. **Quick Stats Panel**
   - Current portfolio value: $X
   - YTD return: X%
   - Success probability: X%
   - Months until next update: X

5. **Update Your Information**
   - Link to edit profile inputs (age, savings, income, spending goals, risk tolerance)
   - "Recalculate" button to get updated recommendation

6. **Educational Content (Optional for MVP)**
   - "How we calculate your recommendations" (link to methodology)
   - Tips for optimizing retirement spending

**Technical Requirements:**
- Backend API (Node.js/Python) to generate recommendations
- AI model (simplified for MVP):
  - Rule-based system with dynamic adjustments
  - Inputs: user profile, current portfolio value, market returns, spending history
  - Output: recommended withdrawal amount + confidence + reasoning
- Database: Store user profiles and historical recommendations
- Authentication: Email/password login (via Stripe Customer Portal or simple JWT)
- Data refresh: Monthly (users can manually trigger update)

**Acceptance Criteria:**
- [ ] User can log in and see personalized dashboard
- [ ] Recommendation card displays current month's withdrawal amount
- [ ] AI reasoning is clear and specific to user's situation
- [ ] Chart renders correctly and shows 30-year projection
- [ ] User can update inputs and recalculate recommendation
- [ ] Dashboard loads in <3 seconds
- [ ] Mobile-responsive layout

---

### Feature 3: Stripe Payment Integration

**Purpose:** Enable seamless subscription signup and payment processing

**User Story:**
"As a prospective customer, I want to start a free trial and easily manage my subscription, so I can try RetireFree risk-free."

**Components:**

1. **Signup Flow**
   - Email capture form (email + password)
   - Redirect to Stripe Checkout for payment method
   - Trial details clearly displayed:
     - "7-day free trial"
     - "Then $15/month"
     - "Cancel anytime"

2. **Stripe Checkout Integration**
   - Use Stripe Checkout hosted page (not embedded)
   - Collect payment method (credit/debit card)
   - Create subscription with 7-day trial period
   - Webhook: Handle successful payment → create user account + send welcome email

3. **Subscription Management**
   - Link to Stripe Customer Portal (Settings page)
   - Customers can:
     - Update payment method
     - Cancel subscription
     - View billing history

4. **Trial Management**
   - Email reminders:
     - Day 3: "You're halfway through your trial"
     - Day 6: "Your trial ends tomorrow"
   - Grace period: 1 day after trial ends before access is restricted
   - Dunning: Stripe handles failed payment retries

**Technical Requirements:**
- Stripe API integration (Checkout, Subscriptions, Customer Portal)
- Webhook endpoint to handle:
  - `checkout.session.completed` → Create user account
  - `invoice.payment_succeeded` → Confirm subscription
  - `customer.subscription.deleted` → Revoke dashboard access
- Environment variables for Stripe keys (test + live)
- Database: Store Stripe customer ID + subscription status per user

**Acceptance Criteria:**
- [ ] User can complete signup and reach Stripe Checkout
- [ ] Payment method is collected successfully
- [ ] 7-day trial is applied (no charge until day 8)
- [ ] User receives welcome email after signup
- [ ] User can access dashboard immediately after signup
- [ ] Webhooks correctly update user subscription status
- [ ] User can cancel via Stripe Customer Portal
- [ ] Trial reminder emails are sent on schedule
- [ ] Failed payments trigger dunning process (Stripe handles)

---

## 5. Success Metrics & KPIs

### 5.1 Launch Criteria (MVP Ready to Launch)
- [ ] Landing page live and accessible via custom domain
- [ ] Calculator returns accurate results for 10 test cases
- [ ] Stripe test mode transactions complete successfully
- [ ] Dashboard displays recommendations for 5 test users
- [ ] All acceptance criteria met for 3 MVP features
- [ ] Privacy policy and terms of service published
- [ ] Analytics tracking installed (Google Analytics or Plausible)

---

### 5.2 First 30 Days Metrics

**Primary Metric:**
- **Paid subscribers:** 10+ (validates product-market fit)

**Acquisition Metrics:**
- Landing page visitors: 500+
- Calculator completions: 100+ (20% conversion from visitors)
- Trial signups: 20+ (20% conversion from calculator users)
- Trial-to-paid conversion: 50% (10 paid subscribers from 20 trials)

**Engagement Metrics:**
- Dashboard logins per user: 4+ per month
- Average session duration: 3+ minutes
- Recommendation recalculations: 1+ per user per month

**Financial Metrics:**
- Revenue: $150 MRR (10 subscribers × $15)
- Customer Acquisition Cost (CAC): <$20 per customer
- Churn rate: <10% monthly

---

### 5.3 First 60 Days Metrics

**Growth:**
- Paid subscribers: 30+ (3x month 1)
- MRR: $450+
- Trial signups: 60+ (cumulative)

**Product Quality:**
- Customer satisfaction: 4+ stars (in-app survey)
- Support tickets: <5 per week
- Feature requests logged: 20+ (validates engagement)

**Virality:**
- Referral signups: 5+ (organic word-of-mouth)

---

### 5.4 First 90 Days Metrics

**Scale:**
- Paid subscribers: 60+ (2x month 2)
- MRR: $900+
- Cohort retention: 80%+ after 3 months

**Product-Market Fit Indicators:**
- Net Promoter Score (NPS): 40+ (survey sent at end of month 3)
- Customer testimonials: 5+ usable quotes
- Organic traffic: 30%+ of new visitors

**Profitability:**
- Customer Lifetime Value (LTV): $180+ (assuming 12-month retention)
- LTV:CAC ratio: 5:1 or better

---

## 6. Future Roadmap (Post-MVP)

### Phase 2: Enhanced Intelligence (Months 2-3)
**Goal:** Improve recommendation accuracy and add scenario planning

**Features:**
- **Spending tracker integration:** Connect bank accounts to track actual spending vs. recommendations
- **Market condition alerts:** Notify users when market changes warrant spending adjustments
- **Scenario modeling tool:** "What if I want to spend $5K on a vacation next month?"
- **Historical tracking:** Show how recommendations have changed over time

**Success Metric:** Increase engagement (dashboard visits) by 50%

---

### Phase 3: Personalization & Automation (Months 4-6)
**Goal:** Reduce manual input and increase personalization

**Features:**
- **Portfolio sync:** Integrate with Fidelity, Vanguard, Schwab to auto-update portfolio values
- **Automated monthly updates:** Email users their new recommendation each month
- **Tax-efficient withdrawal planning:** Suggest which accounts to draw from (Roth vs. Traditional IRA vs. taxable)
- **Longevity planning:** Incorporate life expectancy and health factors

**Success Metric:** Reduce churn to <5% monthly

---

### Phase 4: Premium Tier (Months 6-9)
**Goal:** Introduce higher-priced tier for advanced users

**Features:**
- **RetireFree Pro ($49/month):**
  - One-on-one consultation with CFP (quarterly)
  - Estate planning guidance
  - Advanced tax optimization
  - Multi-household planning (couples with separate accounts)

**Success Metric:** 10% of base users upgrade to Pro

---

### Phase 5: Community & Content (Months 9-12)
**Goal:** Build moat through community and education

**Features:**
- **RetireFree Community:** Forum for users to discuss strategies
- **Educational content hub:** Articles, videos, webinars on retirement topics
- **Retirement coaching:** Group coaching sessions (upsell opportunity)

**Success Metric:** Increase NPS to 60+, reduce CAC by 30% through organic growth

---

## 7. Technical Architecture (MVP)

### 7.1 Frontend
- **Landing page:** Static HTML/CSS/JS (hosted on Vercel or Netlify)
- **Dashboard:** React or Next.js SPA
- **Styling:** Tailwind CSS or similar

### 7.2 Backend
- **API:** Node.js (Express) or Python (FastAPI)
- **Database:** PostgreSQL (hosted on Railway or Supabase)
- **Authentication:** JWT or Supabase Auth

### 7.3 AI/Algorithm
- **MVP approach:** Rule-based engine with dynamic adjustments
  - Inputs: age, portfolio value, desired spending, risk tolerance, market returns (last 30 days)
  - Logic: Calculate safe withdrawal rate using simplified Monte Carlo or percentage-based rules
  - Adjustments: Increase/decrease recommendation based on market performance and spending patterns
- **Post-MVP:** Integrate actual ML model or third-party API (e.g., Income Lab)

### 7.4 Payments
- **Stripe Checkout:** Hosted payment page
- **Stripe Subscriptions:** Manage recurring billing
- **Stripe Customer Portal:** Self-service subscription management

### 7.5 Infrastructure
- **Hosting:** Vercel (frontend), Railway/Render (backend)
- **Domain:** retirefree.app (check availability)
- **Email:** SendGrid or Resend for transactional emails
- **Analytics:** Plausible or Google Analytics

---

## 8. Launch Plan

### Week 1: Foundation
- [ ] Set up domain and hosting
- [ ] Design landing page wireframes
- [ ] Write landing page copy
- [ ] Build calculator logic (client-side)

### Week 2: Core Development
- [ ] Build landing page + calculator (frontend)
- [ ] Set up backend API + database
- [ ] Integrate Stripe (Checkout + webhooks)
- [ ] Build dashboard UI (basic version)
- [ ] Implement AI recommendation engine (MVP rules)

### Day 14: Launch
- [ ] Test end-to-end user flow (signup → payment → dashboard)
- [ ] Switch Stripe to live mode
- [ ] Publish landing page
- [ ] Launch on Product Hunt or HackerNews
- [ ] Share with personal network

### Post-Launch (Days 15-30)
- [ ] Monitor analytics daily
- [ ] Respond to user feedback
- [ ] Fix bugs and iterate on UX
- [ ] Send trial reminder emails
- [ ] Conduct user interviews with first 10 customers

---

## 9. Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Low trial-to-paid conversion (<30%) | High | Medium | Improve trial experience; add onboarding emails; offer extended trial |
| AI recommendations feel generic | High | Medium | Add more personalization inputs; show reasoning clearly; iterate based on feedback |
| Payment processing issues (Stripe) | High | Low | Test thoroughly in Stripe test mode; monitor webhooks closely; have support process ready |
| Competitor launches similar product | Medium | Low | Focus on superior UX and customer support; build community moat |
| Regulatory/compliance issues (financial advice) | High | Low | Add disclaimers that RetireFree is educational, not financial advice; consult lawyer if needed |
| Low organic traffic | Medium | High | Invest in SEO content; run small paid ads ($50-100); leverage word-of-mouth |

---

## 10. Assumptions & Open Questions

### Assumptions
1. Target users are comfortable with online payments and web apps
2. $15/month is affordable for target demographic (validated through market research)
3. AI-powered recommendations provide enough value over free calculators to justify subscription
4. Users will check dashboard monthly (not daily)
5. Stripe handles all payment complexity (PCI compliance, fraud, etc.)

### Open Questions
1. What level of accuracy is "good enough" for MVP recommendations?
2. Should we allow annual payment option ($150/year = 2 months free)?
3. Do we need mobile apps, or is responsive web sufficient?
4. Should we offer a money-back guarantee?
5. How do we handle users with very complex financial situations (trusts, multiple income sources)?

---

## Appendix

### A. Competitive Analysis
- **Personal Capital:** Free portfolio tracking, paid advisory services ($100K+ minimum). Not focused on withdrawal strategy.
- **NewRetirement:** Comprehensive planning tool ($120/year). Complex interface, steep learning curve.
- **MaxiFi:** Academic-grade planning tool ($99/year). Too technical for average user.
- **RetireFree advantage:** Simpler, AI-powered, affordable, focused on one job (spending guidance).

### B. Legal/Compliance
- Add disclaimer: "RetireFree provides educational information only. This is not financial advice. Consult a licensed advisor for personalized recommendations."
- Privacy policy: Required for data collection (email, financial inputs)
- Terms of service: Standard SaaS terms

### C. Marketing Copy Examples

**Landing Page Headline Options:**
1. "Never worry about running out of money in retirement"
2. "Know exactly how much you can spend this month"
3. "Retire with confidence: AI-powered spending guidance"

**CTA Button Options:**
1. "Try Our Free Calculator"
2. "Start Your Free Trial"
3. "Get My Spending Plan"

---

**End of PRD**