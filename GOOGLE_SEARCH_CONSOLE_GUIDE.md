# Google Search Console Setup Guide for RetireFree

## Step 1: Add Property to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property"
3. Choose "URL prefix" and enter: `https://retirefree.app`
4. Verify ownership using one of these methods:

### Recommended: HTML Tag Method
Add this meta tag to your site's `<head>` section:
```html
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
```

**Where to add it:**
- File: `/app/app/layout.tsx`
- Location: Inside the `<head>` tag in the metadata

### Alternative: DNS Verification
Add a TXT record to your domain's DNS settings:
- Record type: TXT
- Name: @
- Value: google-site-verification=YOUR_CODE

---

## Step 2: Submit Sitemap

1. Once verified, go to "Sitemaps" in the left sidebar
2. Enter: `sitemap.xml`
3. Click "Submit"

Your sitemap includes:
- Homepage (priority 1.0)
- Blog index (priority 0.9)
- 3 blog articles (priority 0.8 each)
- Pricing, Privacy, Terms pages

---

## Step 3: Request Indexing for Blog Pages

### Manual Indexing Request:
1. Go to "URL Inspection" tool
2. Enter each URL and click "Request Indexing":
   - `https://retirefree.app/blog`
   - `https://retirefree.app/blog/4-percent-rule-2026`
   - `https://retirefree.app/blog/safe-withdrawal-rate-calculator`
   - `https://retirefree.app/blog/retirement-withdrawal-mistakes`

### Expected Timeline:
- Google typically indexes new pages within 1-7 days
- Blog pages may appear in search results within 2-4 weeks
- Rankings improve over time (3-6 months for competitive keywords)

---

## Step 4: Monitor Performance

After 1-2 weeks, check:
1. **Coverage Report**: Ensure all pages are indexed
2. **Performance Report**: Track clicks, impressions, CTR
3. **Search Queries**: See which keywords drive traffic

---

## Target Keywords (Already Optimized)

Your blog posts target these high-traffic keywords:
- "4% rule 2026" (2,400 searches/month)
- "safe withdrawal rate calculator" (8,100 searches/month)
- "retirement withdrawal mistakes" (3,600 searches/month)
- "retirement planning 2026"
- "is 4% rule still safe"

---

## Next Steps After Setup

1. **Wait 2-4 weeks** for initial indexing
2. **Check rankings** for target keywords
3. **Monitor traffic** in Google Analytics
4. **Create more content** if certain keywords perform well
5. **Build backlinks** to boost authority (see BACKLINKS_STRATEGY.md)

---

## Troubleshooting

### If pages aren't indexing:
- Check robots.txt isn't blocking pages
- Verify sitemap.xml is accessible at https://retirefree.app/sitemap.xml
- Ensure pages return HTTP 200 status
- Check for "noindex" meta tags (there shouldn't be any)

### If you get errors:
- "Submitted URL not found (404)" → Wait for Vercel deployment
- "Server error (5xx)" → Check Vercel deployment logs
- "Crawled - currently not indexed" → Normal, give it time

---

## Status Checklist

- [x] Sitemap.xml created and includes blog pages
- [x] Sitemap.xml deployed to production
- [ ] Domain verified in Google Search Console
- [ ] Sitemap submitted to Google Search Console
- [ ] Individual blog pages requested for indexing
- [ ] Monitoring set up (check weekly)

