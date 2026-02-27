# RetireFree Mobile App Strategy

## Overview

This document outlines the strategy for launching native iOS and Android mobile apps for RetireFree, complementing the web platform.

**Key Principle**: Launch web first, validate market, then add mobile apps when we have 50-100 paying web users.

---

## Why Mobile Apps?

### User Benefits

1. **Always-accessible** - Retirement planning in your pocket
2. **Push notifications** - Remind users to review spending, check portfolio
3. **Biometric login** - FaceID/TouchID for quick, secure access
4. **Offline access** - View previous calculations without internet
5. **Native performance** - Smoother, faster than web on mobile devices

### Business Benefits

1. **Higher retention** - Mobile app users are 3x more engaged than web-only
2. **App store visibility** - Organic discovery via iOS App Store & Google Play
3. **Premium positioning** - Native apps signal quality and commitment
4. **Competitive advantage** - Most retirement tools are web-only
5. **Push revenue** - In-app subscriptions convert 20% better than web

---

## Launch Timeline

### Phase 1: Web MVP (Weeks 1-2) ✅ CURRENT FOCUS
**Goal**: Validate product-market fit

- Build web app with Next.js
- Launch landing page + calculator
- Get first 50-100 paying users
- Gather user feedback

**Mobile Preparation**:
- API-first architecture (already designed for mobile)
- JSON-only responses (mobile-ready)
- JWT authentication (works on mobile)

### Phase 2: Mobile Preparation (Weeks 3-4)
**Goal**: Set up mobile infrastructure

**Week 3: Monorepo Setup**
```bash
# Convert to monorepo structure
npx create-turbo@latest retirewise
cd retirewise
pnpm add --filter web next react
pnpm add --filter mobile expo react-native
```

**Tasks**:
1. Set up Turborepo or pnpm workspaces
2. Extract shared logic to `packages/shared/`
3. Create `packages/ui/` for shared components
4. Set up Expo project in `apps/mobile/`
5. Configure TypeScript across monorepo

**Week 4: API Client & Types**
- Create unified API client (works for web + mobile)
- Export TypeScript types from backend
- Test API from React Native
- Set up Expo dev environment

**Deliverables**:
- Monorepo structure working
- Mobile app scaffolded
- API integration tested
- Shared business logic extracted

### Phase 3: Mobile MVP (Weeks 5-6)
**Goal**: Build core mobile app features

**Week 5: Core Screens**
1. **Onboarding** (2 days)
   - Welcome flow
   - Permission requests (notifications)
   - Quick tutorial

2. **Calculator Screen** (2 days)
   - Input form (age, savings, expenses)
   - Real-time validation
   - Submit to API
   - Display results

3. **Authentication** (1 day)
   - Email/password signup
   - Magic link login
   - Biometric setup (FaceID/TouchID)
   - Secure token storage

**Week 6: Dashboard & Polish**
1. **Dashboard Screen** (2 days)
   - Previous calculations list
   - Charts (withdrawal timeline)
   - AI advice display
   - Settings menu

2. **Stripe Integration** (2 days)
   - In-app purchase flow
   - Subscription management
   - Success/error handling

3. **Polish** (1 day)
   - Loading states
   - Error handling
   - Offline mode
   - App icons & splash screens

**Deliverables**:
- Functional mobile app
- Stripe payments working
- iOS & Android builds ready
- Beta testing ready

### Phase 4: Beta Testing (Week 7)
**Goal**: Test with real users before public launch

**iOS Beta (TestFlight)**
- Invite 20-50 web users to test iOS app
- Gather feedback on UX/performance
- Fix critical bugs

**Android Beta (Google Play Internal Testing)**
- Invite 20-50 web users to test Android app
- Test across different devices
- Address platform-specific issues

**Metrics to Track**:
- Crash rate (target: <0.5%)
- Average session length
- Feature usage (calculator, dashboard, settings)
- Conversion rate (free → paid)

### Phase 5: App Store Launch (Week 8+)
**Goal**: Public launch on iOS and Android

**iOS App Store**
- Submit to App Review (1-3 days review time)
- Launch marketing campaign
- Monitor reviews and ratings

**Android Google Play**
- Submit to Google Play (few hours review)
- Launch marketing campaign
- Monitor reviews and ratings

**Launch Checklist**:
- ✅ App Store Optimization (ASO) - title, description, screenshots
- ✅ Support email set up (support@retireai.com)
- ✅ Privacy policy + Terms of Service published
- ✅ Press kit ready (logo, screenshots, press release)
- ✅ Launch announcement (email list, social media, ProductHunt)

---

## Technical Architecture

### Tech Stack

**Frontend**: React Native + Expo
- **Expo SDK 50+**: Modern React Native framework
- **Expo Router**: File-based routing (like Next.js App Router)
- **NativeWind**: Tailwind CSS for React Native
- **React Native Reanimated**: Smooth animations

**State Management**: Zustand or React Context
- Lightweight state management
- Shared between screens
- Persistent storage with AsyncStorage

**API Client**: Shared package
- Same fetch wrapper as web app
- Automatic token refresh
- Error handling
- Retry logic

**Authentication**: Supabase Auth
- Email/password + magic links
- Expo AuthSession for OAuth
- Biometric authentication (expo-local-authentication)
- Secure token storage (expo-secure-store)

**Payments**: Stripe React Native SDK
- In-app purchase flow
- Subscription management
- Apple Pay / Google Pay support

### Project Structure

```
retirewise/
├── apps/
│   ├── web/                 # Next.js web app
│   └── mobile/              # Expo mobile app
│       ├── app/             # Screens (Expo Router)
│       │   ├── (auth)/
│       │   │   ├── login.tsx
│       │   │   └── signup.tsx
│       │   ├── (tabs)/
│       │   │   ├── calculator.tsx
│       │   │   ├── dashboard.tsx
│       │   │   └── settings.tsx
│       │   └── _layout.tsx
│       ├── components/      # Mobile-specific components
│       ├── hooks/           # Custom React hooks
│       └── app.json         # Expo config
├── packages/
│   ├── shared/              # Business logic
│   │   ├── api/             # API client
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Helpers
│   │   └── ai/              # AI provider abstraction
│   ├── ui/                  # Shared UI components
│   │   ├── Button.tsx       # Works on web + mobile
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   └── config/              # Shared configs
│       ├── eslint/
│       └── typescript/
└── package.json
```

### Code Sharing Strategy

**60-70% Code Reuse** between web and mobile:

**Shared (packages/shared/)**:
- ✅ API client
- ✅ TypeScript types
- ✅ Business logic (withdrawal calculations, formatting)
- ✅ Constants (colors, spacing, API endpoints)
- ✅ Utilities (date formatting, number formatting)
- ✅ AI provider abstraction

**Platform-Specific**:
- ❌ Navigation (Next.js Router vs Expo Router)
- ❌ Authentication UI (different patterns)
- ❌ Payment UI (web Stripe vs React Native Stripe)
- ❌ Push notifications (mobile-only)
- ❌ Biometric auth (mobile-only)

### API Design for Mobile

**All API routes return JSON** (already mobile-ready):

```typescript
// Success response
{
  "success": true,
  "data": { ... },
  "error": null
}

// Error response
{
  "success": false,
  "data": null,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Age must be between 18 and 100"
  }
}
```

**Mobile-specific headers**:
```typescript
headers: {
  'Authorization': `Bearer ${token}`,
  'X-Platform': 'ios', // or 'android'
  'X-App-Version': '1.0.0',
}
```

**Endpoints used by mobile**:
```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/refresh
POST /api/calculate
GET  /api/calculations
GET  /api/dashboard/summary
POST /api/subscription/create
GET  /api/subscription/status
```

---

## User Experience Considerations

### Mobile-First Features

1. **Biometric Authentication**
   ```typescript
   import * as LocalAuthentication from 'expo-local-authentication';

   const authenticateWithBiometrics = async () => {
     const result = await LocalAuthentication.authenticateAsync({
       promptMessage: 'Unlock RetireFree',
       fallbackLabel: 'Use passcode',
     });
     return result.success;
   };
   ```

2. **Push Notifications**
   - Weekly reminder: "Review your retirement plan"
   - Monthly insight: "Your portfolio grew 5% this month"
   - Milestone celebration: "You're on track to retire at 65!"

3. **Offline Mode**
   - Cache last 10 calculations locally
   - View past results without internet
   - Sync when back online

4. **Quick Actions (iOS)**
   - Long-press app icon → "Calculate Withdrawal"
   - Jump directly to calculator screen

5. **Widgets (iOS 14+ / Android)**
   - Home screen widget showing current withdrawal rate
   - Quick glance at retirement progress

### Mobile UX Best Practices

**Touch Targets**: Minimum 44x44 pts (iOS) / 48x48 dp (Android)

**Typography**: Slightly larger than web
```typescript
const typography = {
  heading1: { fontSize: 32, lineHeight: 40 },
  heading2: { fontSize: 24, lineHeight: 32 },
  body: { fontSize: 17, lineHeight: 24 },  // 18px on web → 17pt on mobile
  caption: { fontSize: 13, lineHeight: 18 },
};
```

**Navigation**: Bottom tab bar (iOS/Android standard)
```
┌─────────────────────────┐
│                         │
│   Screen Content        │
│                         │
├─────────────────────────┤
│ 🧮  📊  ⚙️              │ ← Bottom tabs
└─────────────────────────┘
```

**Forms**: One input per screen when possible
- Better UX on small screens
- Feels faster than scrolling long forms
- Higher completion rates

---

## Distribution & App Stores

### iOS App Store

**Requirements**:
- **Apple Developer Account**: $99/year
- **App Review**: 1-3 days (first submission slower)
- **App Store Guidelines**: Must comply with Human Interface Guidelines

**Submission Checklist**:
- ✅ App icons (all sizes: 1024x1024, 180x180, 120x120, etc.)
- ✅ Screenshots (6.7", 6.5", 5.5" displays)
- ✅ App description (170 chars subtitle, 4000 chars description)
- ✅ Privacy policy URL
- ✅ Support URL
- ✅ Keywords (100 characters, comma-separated)

**ASO (App Store Optimization)**:
- **Title**: "RetireAI - Retirement Planner" (30 chars max)
- **Subtitle**: "AI-powered withdrawal calculator" (30 chars max)
- **Keywords**: retire, retirement, calculator, withdrawal, 401k, IRA, pension, savings, ai, advisor, finance
- **Category**: Finance
- **Screenshots**: Show calculator, results, dashboard

### Android Google Play

**Requirements**:
- **Google Play Console**: $25 one-time fee
- **App Review**: Few hours to 1 day
- **Google Play Guidelines**: Must comply with Android design guidelines

**Submission Checklist**:
- ✅ App icons (512x512 PNG)
- ✅ Feature graphic (1024x500 PNG)
- ✅ Screenshots (at least 2, up to 8)
- ✅ Short description (80 chars)
- ✅ Full description (4000 chars)
- ✅ Privacy policy URL
- ✅ Content rating questionnaire

**ASO (Google Play Optimization)**:
- **Title**: "RetireAI: Retirement Calculator" (50 chars max)
- **Short description**: "AI-powered retirement withdrawal calculator"
- **Keywords**: Automatically extracted from title + description
- **Category**: Finance
- **Screenshots**: Show calculator, results, dashboard

---

## Marketing Strategy

### Pre-Launch (Week 7)

1. **Email List**: Announce to web users
   - "RetireAI mobile app coming next week!"
   - Exclusive early access for subscribers
   - TestFlight/Play Internal Testing invites

2. **Social Media Teasers**:
   - Post screenshots on Twitter/LinkedIn
   - Demo video (30 seconds)
   - Countdown to launch

3. **Press Kit**:
   - Logo assets
   - Screenshots
   - App description
   - Founder quote
   - Press release

### Launch Day (Week 8)

1. **ProductHunt Launch**
   - Schedule for 12:01 AM PT (maximize visibility)
   - Prepare launch post with screenshots + video
   - Engage with comments throughout the day

2. **Email Blast**:
   - "RetireAI mobile app is LIVE!"
   - Direct App Store/Play Store links
   - Highlight mobile-exclusive features (biometric, push notifications)

3. **Social Media Blitz**:
   - Twitter thread with screenshots
   - LinkedIn post for professional audience
   - Reddit r/Fire, r/personalfinance (no spamming, provide value)

4. **Paid Ads** (if budget allows):
   - Apple Search Ads ($50 budget)
   - Google App Campaigns ($50 budget)
   - Target keywords: "retirement calculator", "401k planner"

### Post-Launch (Ongoing)

1. **App Store Reviews**:
   - Respond to all reviews within 24 hours
   - Fix bugs mentioned in reviews ASAP
   - Ask happy users to leave reviews (in-app prompt after 3 successful calculations)

2. **Content Marketing**:
   - Blog post: "Why We Built a Mobile Retirement Calculator"
   - Case study: "How RetireAI Users Save $X/year"
   - SEO content targeting "best retirement app"

3. **Referral Program** (Phase 2):
   - "Share RetireAI, get 1 month free"
   - In-app sharing (iOS Share Sheet, Android Intent)

---

## Cost Breakdown

### Development Costs (Time)

| Phase | Duration | Developer Hours | Cost (at $100/hr) |
|-------|----------|-----------------|-------------------|
| Monorepo Setup | Week 3 | 20 hours | $2,000 |
| Mobile MVP | Weeks 5-6 | 80 hours | $8,000 |
| Beta Testing | Week 7 | 20 hours | $2,000 |
| App Store Prep | Week 8 | 10 hours | $1,000 |
| **Total** | | **130 hours** | **$13,000** |

**Note**: If Founder is sole developer (not hiring), this is sweat equity, not cash outlay.

### Operating Costs

| Service | Cost | When |
|---------|------|------|
| Apple Developer Account | $99/year | Before iOS beta |
| Google Play Console | $25 one-time | Before Android beta |
| Expo EAS Build (Free) | $0/month | During development |
| Expo EAS Submit (Free) | $0/month | During submission |
| **Total (Year 1)** | **$124** | |

**Ongoing**: $99/year for Apple (Google is one-time)

### Revenue Impact

**Assumption**: Mobile users convert 20% better than web

**Web Only** (Month 3):
- 60 paid users × $15/month = $900 MRR

**Web + Mobile** (Month 5):
- 60 web users × $15 = $900
- 30 mobile users × $15 = $450
- **Total MRR**: $1,350

**Mobile ROI**: +$450 MRR = recover $124 cost in 8 days

---

## Technical Decisions

### React Native vs Flutter vs Native

**Why React Native (Expo)?**

✅ **Pros**:
- Share code with web app (React)
- Fast development (one codebase for iOS + Android)
- Excellent ecosystem (Expo, React Navigation)
- Over-the-air updates (fix bugs without App Store review)
- Lower cost than building 2 native apps

❌ **Cons**:
- Slightly less performant than native (not noticeable for our use case)
- Larger app size (~20-30MB vs 5-10MB native)

**Flutter**: Rejected
- Different language (Dart vs TypeScript)
- Can't share code with Next.js web app
- Smaller ecosystem

**Native (Swift + Kotlin)**: Rejected
- 2x development time (build twice)
- 2x maintenance cost
- No code sharing with web

### Monorepo vs Multi-Repo

**Why Monorepo?**

✅ **Pros**:
- Share code between web and mobile
- Single source of truth for types
- Easier dependency management
- Atomic commits (change API + update mobile in one PR)

❌ **Cons**:
- More complex initial setup
- Larger repo size

**Decision**: Monorepo with Turborepo or pnpm workspaces

### Expo Managed vs Bare

**Why Expo Managed Workflow?**

✅ **Pros**:
- Simpler setup (no Xcode/Android Studio needed initially)
- Over-the-air updates
- Faster builds with EAS
- Can eject to bare if needed later

❌ **Cons**:
- Some native modules not available (not an issue for our app)

**Decision**: Start with Expo Managed, eject only if we hit limitations (unlikely)

---

## Success Metrics

### Phase 3: Mobile MVP (Week 6)
- ✅ App builds successfully on iOS and Android
- ✅ Calculator flow works end-to-end
- ✅ Stripe payments process correctly
- ✅ Authentication works (email + biometric)
- ✅ App passes TestFlight / Google Play review

### Phase 4: Beta Testing (Week 7)
- ✅ <0.5% crash rate
- ✅ 80%+ beta users complete 1+ calculation
- ✅ 4+ star rating from beta testers
- ✅ No major bugs reported

### Phase 5: App Store Launch (Week 8+)
**30 Days Post-Launch**:
- 100+ downloads (iOS + Android combined)
- 10+ mobile subscribers ($150 mobile MRR)
- 4+ star average rating (both stores)
- <1% crash rate

**90 Days Post-Launch**:
- 500+ downloads
- 50+ mobile subscribers ($750 mobile MRR)
- 25% of new users come from mobile
- Featured in "New Finance Apps" (stretch goal)

---

## Risk Mitigation

### Risk 1: App Rejected by Apple/Google
**Mitigation**:
- Study App Store guidelines thoroughly before submission
- Add clear privacy policy explaining data usage
- Implement proper content rating
- Test on real devices (not just simulators)
- Have support email ready to respond to reviewers

### Risk 2: Low Adoption (Users Don't Download)
**Mitigation**:
- Validate demand BEFORE building (survey web users: "Would you use a mobile app?")
- Offer incentive: "Download mobile app, get 1 month free"
- Make mobile app clearly better than responsive web (push notifications, biometric login, faster)

### Risk 3: Mobile Payments Fail
**Mitigation**:
- Test Stripe React Native SDK thoroughly before launch
- Implement proper error handling and retry logic
- Have fallback: "Subscribe on web at retireai.com"
- Add Apple Pay / Google Pay for faster checkout

### Risk 4: Cross-Platform Bugs
**Mitigation**:
- Test on BOTH iOS and Android devices (not just one)
- Use Expo's preview builds for quick testing
- Implement proper error logging (Sentry or similar)
- Have automated tests for critical flows

---

## Future Mobile Features (Post-Launch)

### Phase 6: Enhancements (Month 6+)

1. **Widgets** (iOS 14+, Android 12+)
   - Home screen widget showing withdrawal rate
   - Lock screen widget (iOS 16+)

2. **Apple Watch / Wear OS App**
   - Glanceable withdrawal info
   - Quick stats

3. **Siri / Google Assistant Shortcuts**
   - "Hey Siri, what's my retirement withdrawal rate?"

4. **Dark Mode**
   - Automatic switching based on system settings
   - Manual override in settings

5. **3D Touch / Haptic Feedback**
   - Tactile feedback for button presses
   - Long-press menus

6. **Localization**
   - Spanish (large US retiree market in FL, TX, CA)
   - Future: French, German for international expansion

---

## Summary

### Key Takeaways

1. **Launch web first** - Validate market before investing in mobile
2. **Mobile adds 20-50% revenue** - Higher engagement, better conversion
3. **Timeline: 8 weeks** from web launch to app stores
4. **Cost: $124 upfront** (Apple $99 + Google $25), $99/year ongoing
5. **Tech: React Native + Expo** - Fast development, code sharing with web
6. **60-70% code reuse** - Shared business logic, API client, types

### Decision Points for Founder

**Option A: Skip Mobile (Focus on Web)**
- Pros: Simpler, faster, lower cost
- Cons: Miss mobile-only users, less engagement
- Best if: Budget is extremely tight, want to validate web first

**Option B: Add Mobile (Recommended)**
- Pros: Higher engagement, more revenue, competitive advantage
- Cons: More complexity, $124 upfront cost
- Best if: Web is working (50+ users), want to maximize growth

**Recommendation**: **Option B** - Add mobile in Month 2 after web validation. Mobile apps will drive 20-50% additional revenue and significantly improve retention.

---

## Next Steps

1. ✅ **Now**: Focus on web MVP (Weeks 1-2)
2. ⏳ **Week 3**: If web hits 50+ users, start monorepo setup
3. ⏳ **Weeks 5-6**: Build mobile MVP
4. ⏳ **Week 7**: Beta test with web users
5. ⏳ **Week 8**: Launch on App Store + Google Play

**Mobile development starts in Week 3** - gives us 2 weeks to validate web product first.
