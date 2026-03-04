# Google Analytics Troubleshooting Guide

## Current Setup
- **Property ID:** 526700510
- **Measurement ID:** G-WRFN778Y9W
- **Domain:** retirefree.app
- **Issue:** Data collection not active despite correct implementation

## Step-by-Step Fix

### 1. Check Data Stream Configuration

1. Go to https://analytics.google.com
2. Click **Admin** (gear icon, bottom left)
3. Under **Property** column → **Data Streams**
4. Click on your **retirefree.app** Web stream
5. Verify these settings:

#### Required Settings:
- **Stream status:** Should show "Collecting data" or "Collecting data recently"
- **Enhanced measurement:** Should be **ON** (toggle switch)
  - If OFF, click it to turn ON
  - This enables automatic page view tracking

#### Enhanced Measurement Events (should all be ON):
- ✓ Page views
- ✓ Scrolls
- ✓ Outbound clicks
- ✓ Site search
- ✓ Form interactions
- ✓ Video engagement
- ✓ File downloads

### 2. Verify Domain Configuration

In the Data Stream settings:

1. Check **Website URL** field shows: `https://retirefree.app`
2. If it shows a different domain, update it
3. Save changes

### 3. Check Data Collection Status

1. In Data Stream settings, look for "Data collection status"
2. Should say: **"Collecting data"** with a green checkmark
3. If it says **"Not collecting data"**:
   - The tag might not be firing
   - Domain might be misconfigured
   - Enhanced measurement might be off

### 4. Test with the Test Page

1. Deploy the updated test page (deploying now)
2. Visit: https://retirefree.app/test-ga.html
3. Open browser console (F12)
4. Should see "Google Analytics is loaded and working!"
5. Immediately check GA Realtime → Overview
6. You should see yourself as 1 active user

### 5. Check for Ad Blockers

Ad blockers can prevent GA from working:
1. Disable any ad blockers (uBlock Origin, AdBlock Plus, etc.)
2. Try in an Incognito/Private window
3. Test again

### 6. Verify Data Retention

1. In Google Analytics Admin → **Data Settings** → **Data Retention**
2. Should be set to at least **2 months**
3. If it's "Do not retain", change it to "2 months" or longer

### 7. Check Reporting Identity

1. Admin → **Data Settings** → **Reporting Identity**
2. Should be set to **"Blended"** or **"Observed"**
3. If set to "Device-based only", it might not track properly

## Common Issues

### Issue: "Data collection isn't active"

**Cause:** Enhanced measurement is OFF

**Solution:**
1. Admin → Data Streams → Click stream
2. Toggle "Enhanced measurement" to ON
3. Wait 30 minutes for data to flow

### Issue: Scripts load but no data in GA

**Cause:** Domain mismatch or referrer exclusions

**Solution:**
1. Check Data Stream URL matches `https://retirefree.app`
2. Check no referral exclusions are blocking your domain
3. Admin → Data Settings → Data Filters (should have no filters blocking retirefree.app)

### Issue: Test page doesn't show in Realtime

**Cause:** Ad blocker or incorrect measurement ID

**Solution:**
1. Disable all browser extensions
2. Test in Incognito mode
3. Verify measurement ID in Data Stream matches G-WRFN778Y9W exactly

## What I've Implemented

### Current Implementation:
```javascript
// GoogleAnalytics.tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=G-WRFN778Y9W" />
<Script dangerouslySetInnerHTML={{
  __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-WRFN778Y9W', {
      page_path: window.location.pathname,
    });
  `
}} />
```

This is the **correct, standard implementation** recommended by Google.

## Next Steps

1. **Check Enhanced Measurement** - This is the #1 most common issue
2. **Test with test-ga.html page** once deployment finishes
3. **Verify in Incognito mode** (no ad blockers)
4. **Check Realtime reports immediately** after visiting the test page

## If Still Not Working

Please check and tell me:
1. Is Enhanced Measurement ON or OFF?
2. What does "Data collection status" say in the Data Stream settings?
3. Do you see any errors in the browser console on test-ga.html?
4. What browser and any extensions are you using?
