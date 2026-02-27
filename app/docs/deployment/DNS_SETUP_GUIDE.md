# DNS Setup Guide: retirefree.app → Vercel

**Domain**: retirefree.app
**Registrar**: GoDaddy
**Hosting**: Vercel
**Date**: February 23, 2026

---

## 🎯 Overview

You need to connect your GoDaddy domain (retirefree.app) to Vercel so that when people visit retirefree.app, they see your Next.js app hosted on Vercel.

**Time Required**: 5-10 minutes (DNS propagation can take 24-48 hours, but usually works in 1-2 hours)

---

## ✅ Prerequisites

Before starting:
- ✅ Domain registered at GoDaddy: retirefree.app
- ⏳ Vercel account created (we'll do this next)
- ⏳ Next.js project deployed to Vercel (we'll do this later)

---

## 📋 Step-by-Step Instructions

### Step 1: Create Vercel Account (5 minutes)

1. Go to https://vercel.com/signup
2. Click "Continue with GitHub" (recommended) or "Continue with Email"
3. Choose **Hobby (Free)** plan
4. Complete signup

**You now have a Vercel account!**

---

### Step 2: Add Domain to Vercel (2 minutes)

**IMPORTANT**: You can do this NOW before your project is built.

1. Go to https://vercel.com/dashboard
2. Click "Domains" in left sidebar
3. Click "Add" button
4. Enter: `retirefree.app`
5. Click "Add"

Vercel will give you DNS records to add. **Keep this page open** - you'll need these records.

You should see something like:

```
A Record:
Name: @
Value: 76.76.21.21

CNAME Record:
Name: www
Value: cname.vercel-dns.com
```

**Note**: The IP address might be different - use whatever Vercel shows you.

---

### Step 3: Configure DNS at GoDaddy (5 minutes)

1. Go to https://dcc.godaddy.com/domains
2. Find **retirefree.app** in your list
3. Click the three dots (⋯) next to it
4. Click "Manage DNS"

#### 3a. Update A Record (for root domain)

1. Find the existing **A** record with Name "@"
2. Click the pencil icon (Edit)
3. Change **Value** to the IP from Vercel (e.g., `76.76.21.21`)
4. Keep **TTL** at 600 seconds (or 1 hour)
5. Click "Save"

**If no A record exists:**
1. Click "Add" button
2. Type: **A**
3. Name: **@**
4. Value: **[IP from Vercel]**
5. TTL: **600 seconds**
6. Click "Save"

#### 3b. Add CNAME Record (for www subdomain)

1. Click "Add" button
2. Type: **CNAME**
3. Name: **www**
4. Value: **cname.vercel-dns.com**
5. TTL: **1 Hour**
6. Click "Save"

#### 3c. Remove Conflicting Records (if any)

GoDaddy sometimes adds default records that conflict:

1. Look for any **CNAME** records with Name "@" → **Delete these**
2. Look for any **A** records pointing to GoDaddy parking page → **Delete these**

**Keep only:**
- A record: @ → [Vercel IP]
- CNAME record: www → cname.vercel-dns.com

---

### Step 4: Verify in Vercel (1 minute)

1. Go back to Vercel dashboard → Domains
2. You should see `retirefree.app` with status:
   - ⏳ "Pending" (DNS not propagated yet) or
   - ✅ "Valid" (DNS is working!)

**If "Pending"**: Wait 10-60 minutes and refresh. DNS can take up to 48 hours but usually works within 1-2 hours.

**If "Invalid Configuration"**: Double-check your A and CNAME records match Vercel's instructions exactly.

---

### Step 5: Force HTTPS (Automatic)

Vercel automatically provisions SSL certificates (HTTPS) for .app domains. You don't need to do anything!

Once DNS propagates:
- `http://retirefree.app` → redirects to `https://retirefree.app` ✅
- `http://www.retirefree.app` → redirects to `https://retirefree.app` ✅

**Note**: .app domains REQUIRE HTTPS (Google enforces this). Vercel handles it automatically.

---

## 🧪 Testing Your DNS Setup

### Before Your App is Built

You can test if DNS is working even before deploying your app:

**Method 1: DNS Lookup**
```bash
dig retirefree.app

# Should show:
# retirefree.app.  600  IN  A  76.76.21.21
```

**Method 2: Browser**
1. Visit https://retirefree.app
2. If DNS is working, you'll see:
   - Vercel's 404 page (good! means DNS is pointing to Vercel)
   - OR your deployed app (if you already deployed)

**Method 3: Online Tools**
- Go to https://dnschecker.org/
- Enter: `retirefree.app`
- Should show Vercel's IP globally (green checkmarks)

---

## 🚨 Troubleshooting

### Problem: "Domain is not configured correctly"

**Solution**:
1. Go to GoDaddy DNS settings
2. Verify A record: @ → [Vercel IP]
3. Verify CNAME record: www → cname.vercel-dns.com
4. Delete any conflicting records
5. Wait 1 hour and check again

### Problem: "DNS not propagating"

**Solution**:
- DNS can take up to 48 hours (usually 1-2 hours)
- Check https://dnschecker.org/ to see global propagation
- Clear your browser cache (Cmd+Shift+R or Ctrl+F5)
- Try incognito/private browsing

### Problem: "SSL certificate not provisioned"

**Solution**:
- Wait 10-30 minutes after DNS propagates
- Vercel auto-provisions SSL (Let's Encrypt)
- Check Vercel dashboard → Domains → SSL status
- If stuck, click "Refresh" button in Vercel

### Problem: "www.retirefree.app works but retirefree.app doesn't"

**Solution**:
- Your A record is missing or incorrect
- Add/update A record: @ → [Vercel IP]
- Wait 10-60 minutes

### Problem: "retirefree.app works but www.retirefree.app doesn't"

**Solution**:
- Your CNAME record is missing
- Add CNAME record: www → cname.vercel-dns.com
- Wait 10-60 minutes

---

## 📧 Email Setup (Optional - Later)

You can set up email addresses like support@retirefree.app using:

**Option 1: Resend (Recommended for transactional emails)**
- Used for password reset, confirmations, receipts
- Free tier: 3,000 emails/month
- Set up later when building the app

**Option 2: Cloudflare Email Routing (For receiving emails)**
- Free email forwarding
- support@retirefree.app → your-personal-email@gmail.com
- Set up later if needed

**Option 3: Google Workspace (For professional email)**
- $6/month per user
- Full Gmail experience with custom domain
- Overkill for now - use Resend instead

---

## ✅ Checklist

### Initial Setup (Do Now)
- ✅ Domain registered: retirefree.app (GoDaddy)
- ⏳ Vercel account created
- ⏳ Domain added to Vercel
- ⏳ A record configured (@ → Vercel IP)
- ⏳ CNAME record configured (www → cname.vercel-dns.com)
- ⏳ DNS verified (wait 1-2 hours)

### After Building App (Do Later)
- ⏳ Next.js project deployed to Vercel
- ⏳ Custom domain connected to project
- ⏳ HTTPS working (automatic)
- ⏳ Email setup (Resend)

---

## 🔗 Quick Links

- **GoDaddy DNS Management**: https://dcc.godaddy.com/domains
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Domains**: https://vercel.com/dashboard/domains
- **DNS Checker**: https://dnschecker.org/
- **Vercel Docs**: https://vercel.com/docs/concepts/projects/custom-domains

---

## 💡 Pro Tips

1. **Use Vercel CLI**: Install with `npm i -g vercel`, makes deployment easier
2. **Preview Deployments**: Every git push creates a preview URL (e.g., retirefree-git-main-yourname.vercel.app)
3. **Production Branch**: Set `main` branch as production in Vercel settings
4. **Environment Variables**: Add in Vercel dashboard → Project Settings → Environment Variables

---

## ⏭️ What's Next?

After DNS is configured:

1. ✅ DNS setup complete
2. ⏳ Read `code/setup_instructions.md`
3. ⏳ Initialize Next.js project locally
4. ⏳ Deploy to Vercel
5. ⏳ Visit https://retirefree.app (see your app!)
6. ⏳ Start 14-day build sprint

---

**Need help?** Read Vercel's official guide:
https://vercel.com/docs/concepts/projects/custom-domains

**DNS should work within 1-2 hours!** 🚀
