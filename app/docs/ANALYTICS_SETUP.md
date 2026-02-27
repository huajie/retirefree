# Analytics Setup Guide

**Last Updated**: February 27, 2026

## 🎯 What This Does

Tracks all user interactions on RetireFree:
- **Page views** - Which pages users visit
- **Affiliate clicks** - Which tools users click (track affiliate conversions!)
- **Calculator uses** - How often calculator is used
- **Signups & subscriptions** - Full conversion funnel

## 📊 Features

### 1. **Affiliate Click Tracking**
- Tracks every affiliate link click
- Shows which tools convert best
- Includes user ID (if logged in)
- Location tracking (dashboard, blog, etc.)

### 2. **Analytics Dashboard**
- View at: `/dashboard/analytics`
- Shows:
  - Total page views (last 30 days)
  - Affiliate click rate
  - Top performing affiliate links
  - Top pages
  - Recent affiliate clicks

### 3. **Automatic Tracking**
- No manual tracking needed
- Works for authenticated and anonymous users
- Privacy-friendly (GDPR compliant)

---

## 🚀 Setup Instructions

### **Step 1: Run the SQL Migration**

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: **RetireFree**
3. Click **SQL Editor** in the left sidebar
4. Click **"New query"**
5. Copy the entire contents of `supabase-analytics-schema.sql`
6. Paste into the SQL editor
7. Click **"Run"** or press `Cmd+Enter`

**Expected result**: ✅ Success (0.XX seconds)

---

### **Step 2: Verify Table Created**

1. In Supabase, click **Table Editor** in left sidebar
2. You should see new table: **analytics_events**
3. Click on it to verify columns exist:
   - id
   - event_type
   - page_url
   - referrer
   - user_id
   - metadata
   - timestamp
   - user_agent
   - ip_address
   - created_at

---

### **Step 3: Test Tracking** (After Deployment)

1. Visit your site: https://retirefree.app
2. Log in to your dashboard
3. Click an affiliate link in "Recommended Tools"
4. Go to: https://retirefree.app/dashboard/analytics
5. You should see:
   - 1+ page view
   - 1+ affiliate click
   - Tool name shown

---

## 📈 Using the Analytics Dashboard

### **Access**
- URL: `/dashboard/analytics`
- Requires login
- Shows last 30 days of data

### **Key Metrics**

**Total Page Views**
- How many times your site was viewed
- Includes anonymous and logged-in users

**Affiliate Clicks**
- Total clicks on affiliate links
- Click rate = (Clicks / Page Views) × 100%
- **Target**: 2-5% click rate is good

**Calculator Uses**
- How many times calculator was used
- Conversion rate = (Calculator Uses / Page Views) × 100%
- **Target**: 10-20% conversion is excellent

**Top Affiliate Clicks**
- Ranks tools by number of clicks
- **Use this to**:
  - See which tools to promote more
  - Remove tools that don't convert
  - Optimize placement

**Top Pages**
- Which pages get most traffic
- **Use this to**:
  - Create more content like top pages
  - Add affiliate links to popular pages
  - Optimize high-traffic pages

---

## 🎯 How to Use This Data

### **For Affiliate Optimization**

1. **Identify Top Performers**
   - Check "Top Affiliate Clicks"
   - Promote winners more heavily
   - Create dedicated content for them

2. **Remove Low Performers**
   - If a tool has 0 clicks after 30 days → remove it
   - Replace with better alternatives

3. **Test Placement**
   - Add affiliate links to top pages
   - Track if click rate improves

4. **Calculate ROI**
   - Clicks × Conversion Rate × Commission = Expected Revenue
   - Example: 100 clicks × 4% × $100 = $400/month

### **For Content Strategy**

1. **Double Down on Winners**
   - Top pages → create similar content
   - Write more about topics that convert

2. **Fix Low Performers**
   - Low traffic pages → improve SEO
   - High traffic, low clicks → add better CTAs

3. **Content Calendar**
   - Create content for tools with high clicks
   - Target keywords from top pages

---

## 🔍 Advanced Queries

### **Get Affiliate Performance (Last 7 Days)**

```sql
SELECT
  metadata->>'tool_name' as tool,
  COUNT(*) as clicks,
  COUNT(DISTINCT user_id) as unique_users
FROM analytics_events
WHERE event_type = 'affiliate_click'
  AND timestamp >= NOW() - INTERVAL '7 days'
GROUP BY metadata->>'tool_name'
ORDER BY clicks DESC;
```

### **Get Conversion Funnel**

```sql
SELECT * FROM get_conversion_funnel(30);
```

Returns:
- page_views
- calculator_uses
- signups
- subscriptions

### **Get Top Pages with Details**

```sql
SELECT * FROM get_page_views_summary(30);
```

---

## 📊 Expected Performance Benchmarks

### **Good Numbers (After 1 Month)**

| Metric | Target | Excellent |
|--------|--------|-----------|
| Page Views | 1,000+ | 5,000+ |
| Affiliate Click Rate | 2-3% | 5%+ |
| Calculator Conversion | 10% | 20%+ |
| Affiliate Clicks | 20+ | 100+ |

### **Revenue Estimates**

With 1,000 page views/month:
- 3% click rate = 30 affiliate clicks
- 4% conversion = ~1 signup
- $100 commission = **$100/month**

With 5,000 page views/month:
- 3% click rate = 150 clicks
- 4% conversion = ~6 signups
- $100 commission = **$600/month**

---

## 🔐 Privacy & Compliance

### **What We Track**
- ✅ Page URLs (public pages)
- ✅ Timestamps
- ✅ User IDs (only if logged in)
- ✅ Referrer (where user came from)
- ✅ IP addresses (for analytics only)

### **What We DON'T Track**
- ❌ No cookies for anonymous users
- ❌ No personal identifying info
- ❌ No tracking across sites
- ❌ No selling of data

### **GDPR Compliant**
- Users can delete their account (deletes all analytics)
- No third-party tracking
- Data stored in your Supabase (you own it)
- Privacy policy discloses tracking

---

## 🛠️ Troubleshooting

### **"No data showing in dashboard"**

1. Check if SQL migration ran successfully
2. Verify table exists in Supabase
3. Check browser console for errors
4. Make sure you're logged in

### **"Affiliate clicks not tracking"**

1. Check if tracking API route exists: `/api/analytics/track`
2. Verify clicks are being sent (check browser network tab)
3. Check Supabase RLS policies allow inserts

### **"Can't see analytics dashboard"**

1. Make sure you're logged in
2. Try: https://retirefree.app/dashboard/analytics
3. Check if page file exists: `app/dashboard/analytics/page.tsx`

---

## 📈 Next Steps

After setup:

1. **Week 1**: Monitor daily, ensure tracking works
2. **Week 2**: Identify top affiliate links
3. **Week 3**: Create content for top performers
4. **Week 4**: Review and optimize

**Monthly Review**:
- Export analytics data
- Calculate affiliate ROI
- Adjust strategy based on data
- Remove non-performers
- Double down on winners

---

## 🎯 Quick Wins

1. **Add tracking to blog posts** when you create them
2. **Test different placements** for affiliate links
3. **Monitor weekly** to spot trends early
4. **Create content** around top-performing tools

**Goal**: Use data to 2x your affiliate revenue every month!

---

**Questions?** Check `/docs/MONETIZATION_STRATEGY.md` for affiliate strategy.
