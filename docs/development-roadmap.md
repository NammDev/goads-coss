# GoAds Development Roadmap

> 4 phases: MVP (done) → Auth + Dashboard (nearly complete) → Extension + Community → Growth & AI

---

## Phase 1 — MVP Release ✅

Goal: Marketing site with order flow, replacing goads.shop.

**Status: DONE**

| Area | Status | Highlights |
|------|--------|------------|
| Products + Cart | Done | All product pages, cart → `/payment` (bank/crypto) |
| Search (cmd+K) | Done | Index-based, cross-category |
| Tools | Done | 19 free tools |
| Knowledge Base | Done | 3-tier hierarchy, custom routing |
| Resources | Done | About, milestones, reviews, partners, help |
| Blog | Done | 5 posts, category sidebar, TOC |
| SEO | Done | sitemap, robots, OG meta, Twitter cards |
| Legal | Done | ToS, Privacy, Refund — shared layout |
| Analytics | Done | Vercel Analytics + Speed Insights |
| Contact | Done | Floating button (Telegram + WhatsApp), `/talk-to-sales` |

---

## Phase 1A — Polish & Audits ✅

Goal: Quality audit before Phase 2.

**Status: DONE** — All tasks completed (2026-03-11)

| Task | Status |
|------|--------|
| Mobile responsive audit (375/768/1024/1440px) | ✅ Done — `phase-1a/mobile` |
| Dark mode audit (all pages + blocks) | ✅ Done — `phase-1a/dark` |
| Lighthouse audit (target > 90) | ✅ Done — A11y 100, BP 96-100, SEO 100 |
| Cart mobile UI fix | ✅ Done — included in mobile audit |
| Cal.com embed on `/talk-to-sales` | Deferred to Phase 2 |

---

## Phase 2 — Auth + Admin + Portal 🔄

Goal: Auth system + admin panel + customer portal with full CRUD business flow.

**Status: 80% Complete** — Core features built, testing + auth stability pending

### 2A — Auth Infrastructure 🔄 (migrating to Clerk)

| Area | Status | Reference |
|------|--------|-----------|
| PostgreSQL (Supabase) + Drizzle ORM | ✅ Done | `src/lib/db/` |
| ~~Better Auth v1.5 (email/password)~~ | 🔄 Replacing | Migrating to Clerk |
| Role-based access (super_admin / staff / customer) | 🔄 Migrating | Moving to Clerk session claims |
| Field encryption (BM ID, invite links) | ✅ Done | `src/lib/db/encryption.ts` |
| Login + unauthorized pages | 🔄 Replacing | Will use Clerk `<SignIn/>` components |
| Clerk setup + middleware | ⏳ Pending | Edge middleware for route protection |
| Webhook sync (Clerk → DB) | ⏳ Pending | Sync user metadata to local `user` table |

**Decision (2026-03-13):** Migrate from Better Auth to Clerk. Rationale: auth stability issues, missing features (password reset, social login, MFA, edge middleware) would take ~7-10 days to build vs ~6-8 days to migrate with all features included out-of-box. Trade-off accepted: vendor lock-in in exchange for zero auth maintenance.

### 2B — Admin Panel ✅

25 files across `/admin/*`. All wired to real DB.

| Feature | Route | Key Components |
|---------|-------|----------------|
| Dashboard | `/admin` | `admin-stats.tsx` — real DB stats |
| Customers list | `/admin/customers` | `customers-table.tsx` + Create Customer dialog |
| Customer detail | `/admin/customers/[id]` | Balance card + Topup dialog + order history |
| Orders list | `/admin/orders` | `orders-table.tsx` |
| Create Order | `/admin/orders/new` | `create-order-form.tsx` — customer select, line items, balance check |
| Order detail | `/admin/orders/[id]` | Deliver dialog (dynamic credential fields per product type) + delivered items |
| Products by type | `/admin/products/[type]` | `products-table.tsx` |
| Staff | `/admin/staff` | `staff-client.tsx` |
| Finance | `/admin/finance` | Revenue overview |
| Settings | `/admin/settings` | App settings |

**Server Actions:** `customer-actions.ts`, `order-actions.ts`, `delivery-actions.ts`, `wallet-actions.ts`

### 2C — Customer Portal ✅

16 files across `/portal/*`. All wired to real DB.

| Feature | Route | Key Components |
|---------|-------|----------------|
| Dashboard | `/portal` | `portal-stats.tsx` — customer-specific stats |
| Orders | `/portal/orders` | `portal-orders-table.tsx` |
| Order detail | `/portal/orders/[id]` | Delivered items with credentials |
| Products by type | `/portal/products/[type]` | `portal-products-table.tsx` |
| Product detail | `/portal/products/[type]/[id]` | Single product view |
| Wallet | `/portal/wallet` | `wallet-table.tsx` — transaction history |
| Profile | `/portal/profile` | `profile-form.tsx` |
| Tools | `/portal/tools` | Free tools page |

### 2D — Data Layer ✅

| Layer | Files | Coverage |
|-------|-------|----------|
| DB Schema | 5 files: auth, products, orders, wallet, enums | 10 tables + 6 enums |
| Queries | 7 files: customer, order, product, wallet, dashboard, delivered-item | All CRUD reads |
| Actions | 4 files: customer, order, delivery, wallet | All CRUD writes |
| Validators | 4 files: customer, order, wallet, credential schemas | Zod schemas + dynamic per-product-type fields |

### 2E — Known Issues & Remaining Work

| # | Task | Priority | Status | Notes |
|---|------|----------|--------|-------|
| 1 | Clerk migration | Critical | 🔄 | Decision: migrate to Clerk (2026-03-13). Replace Better Auth, add edge middleware, webhook sync |
| 2 | `drizzle-kit push` broken | High | 🔴 | CHECK constraint bug in drizzle-kit 0.31.9 — manual SQL required |
| 3 | Cal.com embed `/talk-to-sales` | Low | ⏳ | Scheduling widget |
| 4 | Cross-role E2E testing | Low | ⏳ | Verify 2 roles (super_admin, customer) after all issues resolved |

### 2F — Polish & Enhancements

| # | Task | Priority | Status | Notes |
|---|------|----------|--------|-------|
| 1 | Admin finance page | Medium | ⏳ | Needs real revenue/stats queries |
| 2 | Admin settings page | Medium | ⏳ | Needs real settings CRUD |
| 3 | Portal tools integration | Medium | ⏳ | Wire to actual tool pages |
| 4 | Error handling UX | Medium | ⏳ | Toast notifications for all actions (currently text-only) |

---

## Phase 3 — Extension + Community + Search

Goal: Extension platform, community forum, advanced search. All depend on Phase 2 auth.

**Status: Not started**

### 3A — BM Invite Extension (Chrome)

| Feature | Priority | Notes |
|---------|----------|-------|
| Extension API endpoints | Critical | JWT auth, BM invite link CRUD |
| Chrome extension | Critical | Login via portal → JWT → fetch BM invites → inject to browser |
| Extension access control | High | Admin toggles access per customer (qualifying purchases) |
| Extension infrastructure | High | Designed for future tool extensions |

```
Portal login → JWT stored → Extension reads token → GoAds API → BM invite links
```

Distribution: Chrome Web Store or manual .crx from portal.

### 3B — Telegram Bot

| Feature | Priority | Notes |
|---------|----------|-------|
| Receive cart forms | High | Cart submission → Telegram notification to admin |
| Order status notifications | High | Auto-notify customer on status change |

### 3C — Community

| Feature | Priority | Notes |
|---------|----------|-------|
| Discussion board | Medium | Requires auth from Phase 2 |
| Public user profiles | Medium | Activity, reputation |
| Moderation tools | Medium | Admin/staff moderation |

### 3D — Search & Docs Enhancement

| Feature | Priority | Notes |
|---------|----------|-------|
| Doc search (Pagefind / Algolia) | Medium | Full-text across knowledge base |
| AI Ask (RAG) | Medium | Chat with docs, answer customer questions |
| Cross-content search | Low | Search across community + docs + blog |

---

## Phase 4 — Growth & Intelligence

Goal: Automation, payments, analytics, scaling.

**Status: Not started**

| Feature | Priority | Notes |
|---------|----------|-------|
| Payment integration | High | SePay (VietQR) VN + Stripe international |
| Auto-delivery pipeline | High | Payment confirmed → assign → push to portal |
| CMS for blog/docs | High | Staff manages content without code |
| Admin analytics | High | Revenue, MRR, ARPU, LTV |
| Warranty tracking | High | 7-day countdown, 1-click claim |
| Email notifications | High | Order confirmed, delivered, warranty expiring |
| Live product monitoring | Medium | Auto-check BMs/profiles, ban alerts |
| Referral/Affiliate | Medium | Invite link + commission tracking |
| Customer segmentation | Medium | Whale vs casual, targeted marketing |
| Tool tiers (free/pro) | Medium | Gate advanced tools behind login |
| Bulk order API | Low | Enterprise integration |

---

## Summary

```
Phase 1  ✅  Marketing site + cart + tools + blog + docs + SEO
Phase 1A ✅  Dark mode + mobile responsive + Lighthouse audits
Phase 2  🔄  Admin ✅ + Portal ✅ + CRUD ✅ + Auth migrating to Clerk (pending)
Phase 3  ⏳  Extension Platform + Community + Search (needs Phase 2)
Phase 4  ⏳  Payments + Automation + Analytics + Growth
```

```
Dependency:  Phase 2 (Auth) ──► Phase 3A (Extension)
                             ──► Phase 3B (Community)
                             ──► Phase 3C (Search/AI)
                             ──► Phase 4  (all)
```
