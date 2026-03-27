# Phase 11: Deploy & Go Live — Checklist

> Domain: goadsagency.com | Vercel: goads-coss.vercel.app | Clerk: Goads (Production)

---

## Step 1: Clerk Production Instance ✅
- [x] Tạo Production instance trên clerk.com
- [x] Copy API Keys (Configure → API Keys):
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` = `pk_live_...` ✅
  - `CLERK_SECRET_KEY` = `sk_live_...` ✅
  - (Values in Clerk dashboard + Vercel env vars)

## Step 2: Clerk Production Domain ✅
- [x] Configure → Domains → Add `goadsagency.com`
- [x] 5 CNAME records cần thêm vào GoDaddy:

| # | Type | Name | Value |
|---|------|------|-------|
| 1 | CNAME | `clerk` | `frontend-api.clerk.services` |
| 2 | CNAME | `accounts` | `accounts.clerk.services` |
| 3 | CNAME | `clkmail` | `mail.3ix6tsds1bjb.clerk.services` |
| 4 | CNAME | `clk._domainkey` | `dkim1.3ix6tsds1bjb.clerk.services` |
| 5 | CNAME | `clk2._domainkey` | `dkim2.3ix6tsds1bjb.clerk.services` |

## Step 3: Clerk Production Webhook ✅
- [x] Configure → Webhooks → Add Endpoint
- [x] URL: `https://goadsagency.com/api/webhooks/clerk`
- [x] Events: `user.created`, `user.updated`, `user.deleted`
- [x] `CLERK_WEBHOOK_SECRET` = `whsec_...` ✅
  - (Value in Clerk dashboard + Vercel env vars)

## Step 4: Clerk Social Connection ⏳
- [x] Google Cloud Console → OAuth 2.0 Client ID created
  - Project: `goads`
  - Client ID: `519166...` (in Google Cloud Console)
  - Client Secret: `GOCSPX-...` (in Google Cloud Console)
  - Redirect URI: `https://accounts.goadsagency.com/v1/oauth_callback`
  - ⚠️ XÓA CREDENTIALS TRƯỚC KHI COMMIT
- [ ] Paste Client ID + Secret vào Clerk → Google connection → Save
- [ ] Facebook: tạm disable (setup sau nếu cần)
  - ⚠️ XÓA CREDENTIALS TRƯỚC KHI COMMIT

## Step 5: Vercel Env Vars
- [ ] vercel.com → Project → Settings → Environment Variables
- [ ] Update cho **Production** environment:

| Variable | Value | Source |
|----------|-------|--------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_live_...` | Step 1 |
| `CLERK_SECRET_KEY` | `sk_live_...` | Step 1 |
| `CLERK_WEBHOOK_SECRET` | signing secret | Step 3 |
| `DATABASE_URL` | (giữ nguyên) | Supabase |
| `ENCRYPTION_KEY` | (giữ nguyên) | existing |
| `NEXT_PUBLIC_APP_URL` | `https://goadsagency.com` | new |

## Step 6: Vercel Custom Domain
- [ ] vercel.com → Project → Settings → Domains → Add `goadsagency.com`
- [ ] Ghi lại DNS records Vercel yêu cầu:
  - A: `@` → `76.76.21.21`
  - CNAME: `www` → `cname.vercel-dns.com`

## Step 7: GoDaddy DNS (Thêm tất cả 1 lần)
- [ ] Vào GoDaddy → DNS Management → goadsagency.com
- [ ] Xóa A record cũ (parking page)
- [ ] Thêm records:

**Vercel:**
| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | 600 |
| CNAME | www | cname.vercel-dns.com | 600 |

**Clerk (copy chính xác từ Step 2):**
| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | accounts | (from Clerk) | 600 |
| CNAME | clerk | (from Clerk) | 600 |

## Step 8: Verify (đợi 5-30 phút DNS propagate)
- [ ] `goadsagency.com` hiện site
- [ ] HTTPS/SSL hoạt động
- [ ] `www.goadsagency.com` redirect về `goadsagency.com`
- [ ] Clerk domain verified (check Clerk dashboard)
- [ ] Đăng ký account mới → vào portal được (auto role=customer)
- [ ] Đăng nhập admin → hoạt động
- [ ] Webhook test: tạo user mới → check DB có record

## Step 9: Redeploy
- [ ] Vercel → Deployments → Redeploy (hoặc push commit)
- [ ] Verify lần cuối sau redeploy

## Step 10: Post-deploy cleanup
- [ ] Update `NEXT_PUBLIC_APP_URL` nếu có trong code
- [ ] Verify robots.txt cho phép indexing (bỏ noindex)
- [ ] Test Vercel Analytics + Speed Insights
- [ ] Update roadmap status: Phase 11 Task 1 → Done

---

## Notes
- Clerk Production = free tier (10,000 MAU)
- Webhook đã fix auto-assign role=customer (commit pending)
- Social login (Google) cần setup riêng nếu dùng
