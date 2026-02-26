# Quick DNS Setup - retirefree.app

**Time Required**: 10 minutes + 1-2 hours propagation

---

## Step 1: Get Vercel DNS Values (5 min)

1. Go to https://vercel.com/dashboard
2. Click "Domains" → "Add"
3. Enter: `retirefree.app`
4. **Write down the DNS records Vercel shows**

Expected format:
```
A Record: @ → 76.76.21.21 (or similar)
CNAME Record: www → cname.vercel-dns.com (or similar)
```

---

## Step 2: Configure GoDaddy DNS (5 min)

1. Go to https://dcc.godaddy.com/domains
2. Find **retirefree.app** → Click ⋯ → "Manage DNS"

### Add/Update A Record:
- Type: **A**
- Name: **@**
- Value: **[IP from Vercel]**
- TTL: **600 seconds**
- Click "Save"

### Add CNAME Record:
- Type: **CNAME**
- Name: **www**
- Value: **cname.vercel-dns.com** (or value from Vercel)
- TTL: **1 Hour**
- Click "Save"

### Remove Conflicts:
- Delete any CNAME with Name "@"
- Delete any old A records pointing to parking pages

---

## Step 3: Verify (1-2 hours)

### Check DNS propagation:
```bash
dig retirefree.app
dig www.retirefree.app
```

### Check online:
- https://dnschecker.org/ (enter: retirefree.app)

### Check Vercel:
- Vercel Dashboard → Domains → Status should be "Valid" ✅

### Check browser:
- https://retirefree.app (after 1-2 hours)
- Should show Vercel 404 page or your deployed app

---

## That's it!

Once DNS propagates (1-2 hours):
- ✅ retirefree.app → points to Vercel
- ✅ www.retirefree.app → points to Vercel
- ✅ HTTPS works automatically
- ✅ SSL certificate issued by Let's Encrypt

**Next**: Deploy your Next.js app to Vercel!
