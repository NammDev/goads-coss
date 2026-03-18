---
task: 1
title: Vercel Deploy — Clerk Auth on Production
priority: Critical
status: in-progress
created: 2026-03-18
---

# Task 1 — Vercel Deploy & Clerk Auth

## Bug

`/sign-in` on Vercel (`goads-coss.vercel.app`) redirects immediately — cannot access auth pages.

## Root Cause

Clerk **Development instance** keys (`pk_test_*`, `sk_test_*`) only work on `localhost`. Vercel domain is not localhost → Clerk rejects and redirects.

Additionally, Clerk **Production instance** does not accept `*.vercel.app` (provider/shared domain). A custom domain is required.

---

## Fix — Step by Step

### Step 1: Buy Custom Domain

- Purchase a domain (e.g., `goads.shop`)
- Add domain to Vercel project: **Vercel Dashboard → Settings → Domains**
- Configure DNS records as Vercel instructs (A record / CNAME)
- Verify domain is working (site loads on custom domain)

### Step 2: Create Clerk Production Instance

- Clerk Dashboard → dropdown **"Development"** (top header) → **"Production"**
- Enter custom domain (e.g., `goads.shop`) as Application Domain
- Clerk will provide DNS records for auth subdomain (e.g., `clerk.goads.shop`)
- Add those DNS records in domain registrar
- Wait for Clerk to verify DNS

### Step 3: Get Production Keys

From Clerk **Production** instance:

- **Developers → API Keys** → copy:
  - `pk_live_*` (Publishable Key)
  - `sk_live_*` (Secret Key)
- **Developers → Webhooks** → create endpoint:
  - URL: `https://goads.shop/api/webhooks/clerk`
  - Copy new `whsec_*` (Signing Secret)

### Step 4: Update Vercel Env Vars

Update these 3 keys in **Vercel Dashboard → Settings → Environment Variables**:

| Variable | Old (Dev) | New (Prod) |
|----------|-----------|------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_*` | `pk_live_*` |
| `CLERK_SECRET_KEY` | `sk_test_*` | `sk_live_*` |
| `CLERK_WEBHOOK_SECRET` | `whsec_*` (dev) | `whsec_*` (prod) |

Keep unchanged:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` |
| `NEXT_PUBLIC_APP_URL` | `https://goads.shop` |
| `DATABASE_URL` | (keep current) |
| `SHADCN_STUDIO_EMAIL` | (keep current) |
| `SHADCN_STUDIO_LICENSE_KEY` | (keep current) |

### Step 5: Update App Config

- Update `metadataBase` in `app/src/app/layout.tsx` if domain changes
- Update `NEXT_PUBLIC_APP_URL` on Vercel to match custom domain

### Step 6: Redeploy & Verify

- Trigger redeploy on Vercel (or push a commit)
- Test `/sign-in` on custom domain
- Test `/sign-up` on custom domain
- Test `/admin` and `/portal` redirect to sign-in when not authenticated
- Test webhook by creating a new user

---

## Local Development

**No changes needed.** `.env.local` keeps `pk_test_*` / `sk_test_*` keys. Localhost continues using Clerk Development instance independently.

Dev and Prod instances have **separate user databases** — users created on localhost won't appear on production and vice versa.

---

## Checklist

- [ ] Custom domain purchased and added to Vercel
- [ ] DNS verified on Vercel
- [ ] Clerk Production instance created with custom domain
- [ ] Clerk DNS records added and verified
- [ ] `pk_live_*` + `sk_live_*` copied to Vercel env vars
- [ ] Webhook endpoint created in Clerk Prod, `whsec_*` updated on Vercel
- [ ] `NEXT_PUBLIC_APP_URL` updated to custom domain
- [ ] Redeployed on Vercel
- [ ] `/sign-in` works on production
- [ ] `/sign-up` works on production
- [ ] Protected routes (`/admin`, `/portal`) redirect correctly
- [ ] Webhook fires on user creation
