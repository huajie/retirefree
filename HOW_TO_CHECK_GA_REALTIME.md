# How to Check Google Analytics Realtime (Step-by-Step)

**Issue:** "Not seeing realtime traffic"
**Date:** March 4, 2026

---

## IMPORTANT: Where to Look

### ✅ CORRECT: Realtime Reports
1. Go to https://analytics.google.com
2. Click **"Reports"** in left sidebar
3. Click **"Realtime"** (should be first option)
4. Click **"Overview"**

**You should see:** A map and "Active users right now" number

### ❌ WRONG: Other Reports
Do NOT check these (they won't show current traffic):
- Traffic acquisition (historical only)
- User acquisition (historical only)
- Pages and screens (historical only)
- Engagement (historical only)

---

## Step-by-Step Verification

### Step 1: Open Realtime Report
1. Log into https://analytics.google.com
2. Make sure you're viewing property **526700510**
3. Navigate to: **Reports → Realtime → Overview**
4. Leave this tab open

### Step 2: Visit Your Site
1. Open a NEW Incognito/Private window
2. Go to: https://retirefree.app
3. DO NOT close this tab - keep it open!

### Step 3: Check Realtime (within 10 seconds)
1. Switch back to Google Analytics tab
2. Look at "Active users right now"
3. You should see: **1** (or more if others are visiting)

### Step 4: Verify It's You
1. In the Realtime report, scroll down
2. Look at "Users by page title and screen name"
3. You should see: "AI-Powered Retirement Withdrawal Calculator"
4. Look at "Views by page title and screen name"
5. Should show: "/" or the page you're on

---

## What You Should See

### If Working Correctly:
```
Active users right now: 1

Users by Page:
- AI-Powered Retirement... : 1 user

Event count by Event name:
- page_view : 1
- session_start : 1
```

### If NOT Working:
```
Active users right now: 0

No data to display
```

---

## Common Mistakes

### Mistake #1: Looking at Historical Reports
**Wrong:** Traffic acquisition, User acquisition
**Right:** Realtime → Overview

### Mistake #2: Closing the Site Tab
- Realtime shows CURRENT visitors only
- If you close the tab, you disappear
- Keep the site tab open while checking

### Mistake #3: Ad Blocker Enabled
- Ad blockers prevent GA tracking
- Use Incognito mode
- Disable all extensions

### Mistake #4: Wrong Property
- Make sure you're viewing property 526700510
- Not a different property

### Mistake #5: Waiting Too Long
- Realtime shows last 30 minutes only
- If you wait too long, you disappear
- Check within 10-30 seconds of visiting

---

## Troubleshooting

### "I don't see myself in Realtime"

**Check #1: Are you in the right report?**
- Must be: Reports → Realtime → Overview
- NOT: Reports → Traffic acquisition

**Check #2: Is the site tab still open?**
- Keep the retirefree.app tab open
- Don't close it before checking

**Check #3: Ad blocker?**
- Disable all extensions
- Use Incognito/Private mode
- Try different browser

**Check #4: Check browser console**
1. On retirefree.app, press F12
2. Go to Console tab
3. Look for: "✅ GA initialized: G-WRFN778Y9W"
4. If you DON'T see this, scripts aren't loading

**Check #5: Check Network tab**
1. On retirefree.app, press F12
2. Go to Network tab
3. Reload page
4. Filter for: "gtag" or "collect"
5. Should see requests to googletagmanager.com
6. Should see requests to google-analytics.com/g/collect

---

## Testing Script (Do This Now)

### Complete Test Process:

**1. Open Two Tabs:**
- Tab 1: https://analytics.google.com (Realtime)
- Tab 2: Incognito window with https://retirefree.app

**2. In Tab 2 (retirefree.app):**
- Press F12 (open dev tools)
- Go to Console tab
- Look for: "✅ GA initialized"

**3. Switch to Tab 1 (Analytics):**
- Look at "Active users right now"
- Should show: 1

**4. In Tab 2 again:**
- Go to Network tab
- Look for "collect" requests
- Should see green 200 status

**5. Result:**
- ✅ See yourself in Realtime = GA WORKING
- ❌ Don't see yourself = Scripts not loading

---

## What "Historical Data Works" Means

If you said you CAN see historical data, that means:
- Data from YESTERDAY or earlier is showing
- But CURRENT visitors (Realtime) are not showing

This indicates:
- GA was working before
- Something broke recently
- Scripts not loading NOW

---

## Current Status (After Latest Fix)

**Deployment:** Just pushed (waiting for Vercel)

**What I Changed:**
- Moved GA scripts from client component to server component
- Scripts now in <head> using Next.js Script
- Should render properly in SSR HTML

**When to Test:**
- Wait 2-3 minutes for deployment
- Then follow "Testing Script" above

---

## Expected Timeline

### Right After Deployment:
- Visit site
- Should see yourself in Realtime immediately
- Should see console message: "✅ GA initialized"

### Within 24 Hours:
- Historical reports will populate
- Will see yesterday's traffic
- Reports will show trends

### Within 48 Hours:
- All reports fully populated
- Can see week-over-week trends
- Full analytics available

---

## What to Report Back

Please tell me:

1. **Console message:** Do you see "✅ GA initialized: G-WRFN778Y9W"?
   - YES / NO

2. **Network requests:** Do you see "collect" requests to google-analytics.com?
   - YES / NO

3. **Realtime count:** What number shows under "Active users right now"?
   - 0 / 1 / Other: ___

4. **Which report are you checking:**
   - Realtime → Overview
   - OR Traffic acquisition
   - OR Other: ___

5. **Screenshot** (if possible):
   - Take screenshot of Realtime report
   - And browser console on retirefree.app

---

## Next Steps

**After deployment finishes (2-3 mins):**

1. Clear browser cache (Ctrl+Shift+Del)
2. Open new Incognito window
3. Visit https://retirefree.app
4. Check console for "✅ GA initialized"
5. Check Realtime immediately
6. Report back what you see

If it STILL doesn't work after this fix:
- I'll need to try a completely different approach
- May need to use Google Tag Manager instead
- Or check if there's an account/property issue

---

**The deployment should complete in ~2 minutes. Then test and let me know!**
