# GoAds Development Roadmap

> 12 phases: MVP ✅ → Auth ✅ → Security ✅ → Analytics ✅ → Extension ✅ → Community V1 ✅ → Bugs 🔄 → Extension V2 → Community V2 → CMS → Deploy → UI

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
| Mobile responsive audit (375/768/1024/1440px) | ✅ Done |
| Dark mode audit (all pages + blocks) | ✅ Done |
| Lighthouse audit (target > 90) | ✅ Done — A11y 100, BP 96-100, SEO 100 |
| Cart mobile UI fix | ✅ Done |
| Cal.com embed on `/talk-to-sales` | ✅ Done (Phase 6) |

---

## Phase 2 — Auth + Admin + Portal ✅

Goal: Auth system + admin panel + customer portal with full CRUD business flow.

**Status: DONE** — All core features + UI polish complete

### 2A — Auth Infrastructure ✅

| Area | Status | Reference |
|------|--------|-----------|
| PostgreSQL (Supabase) + Drizzle ORM | ✅ Done | `src/lib/db/` |
| Clerk auth (email/password, social, MFA) | ✅ Done | Migrated from Better Auth (2026-03-13) |
| Role-based access (super_admin / staff / customer) | ✅ Done | Clerk session claims + `requireRole()` |
| Field encryption (BM ID, invite links) | ✅ Done | `src/lib/db/encryption.ts` |
| Clerk `<SignIn/>` / `<SignUp/>` pages | ✅ Done | `/sign-in`, `/sign-up` |
| Edge middleware for route protection | ✅ Done | `middleware.ts` |
| Webhook sync (Clerk → DB) | ✅ Done | User metadata synced to local `user` table |

### 2B — Admin Panel ✅

25+ files across `/admin/*`. All wired to real DB.

| Feature | Route | Key Components |
|---------|-------|----------------|
| Dashboard | `/admin` | `admin-stats.tsx` — real DB stats |
| Customers list | `/admin/customers` | `customers-table.tsx` + Create Customer dialog |
| Customer detail | `/admin/customers/[id]` | Balance card + Topup dialog + order history |
| Orders list | `/admin/orders` | `orders-table.tsx` (DT5 shadcn studio layout) |
| Create Order | `/admin/orders/new` | `create-order-form.tsx` — customer select, line items, balance check |
| Order detail | `/admin/orders/[id]` | Deliver dialog + delivered items + share link generation |
| Products by type | `/admin/products/[type]` | `products-table.tsx` |
| Staff | `/admin/staff` | `staff-client.tsx` |
| Finance | `/admin/finance` | ✅ Revenue by type, top customers, order status, 3 charts |
| Settings | `/admin/settings` | ➡️ Deferred to Phase 3 |

**Server Actions:** `customer-actions.ts`, `order-actions.ts`, `delivery-actions.ts`, `wallet-actions.ts`, `notification-actions.ts`

### 2C — Customer Portal ✅

20+ files across `/portal/*`. All wired to real DB.

| Feature | Route | Key Components |
|---------|-------|----------------|
| Dashboard | `/portal` | `portal-stats.tsx` — customer-specific stats |
| Orders | `/portal/orders` | `portal-orders-table.tsx` + empty states |
| Order detail | `/portal/orders/[id]` | Delivered items with credentials |
| Product catalog (Shop) | `/portal/products` | ProductCard + Card3D, category filter tabs, customer pricing |
| Products by type | `/portal/products/[type]` | `portal-products-table.tsx` |
| Product detail | `/portal/products/[type]/[id]` | Single product view |
| Wallet | `/portal/wallet` | `wallet-table.tsx` — transaction history |
| Profile | `/portal/profile` | Clerk `<UserProfile />` (avatar, name, email, MFA, sessions) |
| Tools | `/portal/tools` | 20 tools + extensions, categorized sidebar |
| Search (Cmd+K) | Portal-wide | Real DB search — orders, products, wallet via ILIKE |

### 2D — Data Layer ✅

| Layer | Files | Coverage |
|-------|-------|----------|
| DB Schema | 6 files: auth, products, orders, wallet, enums, notifications | 11 tables + 6 enums |
| Queries | 8 files: customer, order, product, wallet, dashboard, delivered-item, finance, notification | All CRUD reads |
| Actions | 5 files: customer, order, delivery, wallet, notification | All CRUD writes |
| Validators | 4 files: customer, order, wallet, credential schemas | Zod schemas + dynamic per-product-type fields |

### 2E — UX & Performance ✅

| Feature | Status | Details |
|---------|--------|---------|
| Toast notifications | ✅ Done | All actions (success/failure) show toast |
| Notification center | ✅ Done | DB-backed bell dropdown, auto-notify on order/topup/delivery, mark-as-read |
| Loading skeletons | ✅ Done | All admin + portal routes have `loading.tsx` |
| Dashboard performance | ✅ Done | Parallel queries, auth cache(), all routes < 100ms DB |
| Pixel-perfect tables | ✅ Done | DT5 shadcn studio layout — search, column filters, pagination |
| Empty states | ✅ Done | Portal + admin empty state components |
| Public share links | ✅ Done | Token-based `/share/[token]` with marketing layout + conversion CTAs |

### 2F — Polish & Launch-Ready ✅

UI/UX polish sprint (2026-03-14 ~ 2026-03-16).

| Feature | Status | Details |
|---------|--------|---------|
| Dashboard shell overhaul | ✅ Done | Ported shell from shadcnstore (sidebar, header, footer, nav, charts) |
| Table UI overhaul | ✅ Done | Column visibility, template pagination, row actions, rounded borders |
| Order detail redesign | ✅ Done | 2-col layout, delivered items tabs, share link / view all products |
| Portal shop redesign | ✅ Done | StatsCard-style cards, 4-col grid, search, category pills |
| Portal cart integration | ✅ Done | Buy Now → add-to-cart, cart icon in portal header, same cart as marketing |
| Products sync | ✅ Done | Shared ProductTypeTabs (admin + portal), Badge counts |
| Sidebar polish | ✅ Done | Admin flat Products link, Portal grouped nav, Tools popular/all split |
| Skeletons | ✅ Done | All routes: admin (7) + portal (6) + marketing (1) |
| Bug fixes | ✅ Done | Sign In route, NavUser SSR, EmptyState serialization, active states, borders |

---

## Phase 3 — Security & Hardening ✅

Goal: Security headers, error boundaries, auth polish.

**Status: DONE**

| Task | Status |
|------|--------|
| Clerk webhook publicMetadata | ✅ |
| Username+password login | ✅ |
| Global error boundary (`global-error.tsx` + `error.tsx`) | ✅ |
| Mock data cleanup (RecentTransactions uses real DB) | ✅ |
| CSP + security headers | ✅ |
| robots noindex admin/portal | ✅ |

---

## Phase 4 — Analytics & Monitoring ✅

Goal: Business intelligence, warranty system, product health monitoring.

**Status: DONE** | **Completed: Mar 20** | **Branch: `ui-playground` → merged**

| # | Task | Status | Highlights |
|---|------|--------|------------|
| 1 | Dashboard date range filter | ✅ | Presets (7d/30d/90d) + custom calendar, URL params, server-side |
| 2 | Warranty tracking system | ✅ | `warranty_claims` table, WarrantyBadge, 1-click claim, admin approve/reject |
| 3 | Export CSV | ✅ | 4 endpoints (orders/customers/finance/delivered-items), reusable button |
| 4 | Product health monitoring | ✅ | Manual status update, auto-warranty-claim on ban, health widget |
| 5 | Flexsearch + unified Cmd+K | ✅ | Replaced Pagefind with Flexsearch, unified search palette |
| 6 | Keystatic CMS | ✅ | Blog + Docs CMS at `/keystatic`, Markdoc rendering |

---

## Phase 5 — BM Extension ✅

Goal: Chrome extension for BM invite link management on Facebook.

**Status: DONE** | **Completed: Mar 19** | **Branch: `feature/bm-extension` → merged**

| # | Task | Status | Highlights |
|---|------|--------|------------|
| 1 | Extension structure | ✅ | MV3 Chrome extension in `/extension/`, content script overlay |
| 2 | Auth integration | ✅ | `extension_token` table, 90-day expiry, 4 API endpoints |
| 3 | Portal token management | ✅ | Generate/copy/revoke UI in `/portal/tools/extensions` |
| 4 | UI/UX | ✅ | 660px 2-col overlay, 4-step loading, GoAds branding |

**Key files:** `extension/` (popup, content script, background), `src/lib/db/schema/extension-tables.ts`, `src/app/api/extension/`

---

## Phase 6 — Community ✅ (V1 — cần rebuild)

Goal: Community discussion board + customer segmentation + Cal.com embed.

**Status: V1 DONE** | **Completed: Mar 20** | **Branch: `feature/community` → merged**

> ⚠️ **V1 cần rebuild thành public community (Vercel Community model).**
> Hiện tại community đóng trong `/portal/` → không SEO, không kéo traffic.
> Mục tiêu: cộng đồng mở, ai cũng xem được, SEO-driven content, kéo organic traffic.
> Nghiên cứu kỹ Vercel Community trước khi rebuild. Xem report: `plans/reports/researcher-260321-0102-featurebase-research.md`

| # | Task | Status | Highlights |
|---|------|--------|------------|
| 1 | Discussion board (DB + API + UI) | ✅ | 7 tables, 9 queries, 12 actions, 16 components |
| 2 | Portal integration | ✅ | Nav item, auth-gated posting, `/portal/community` |
| 3 | Public user profiles | ✅ | username/bio/avatar, `/portal/community/user/[username]` |
| 4 | Admin moderation + reports | ✅ | `/admin/community` — pin/hide/status + report queue |
| 5 | Customer segmentation | ✅ | Auto-computed tags (whale/regular/casual/new) |
| 6 | Cal.com embed | ✅ | Inline on `/talk-to-sales` (CSP fixed) |

---

## Phase 7 — Bug Fixes & Quick Wins 🔄

Goal: Fix bugs từ manual testing, polish trước khi tiếp tục.

**Status: In Progress** | **Timeline: Mar 21–22**

| # | Task | Priority | Status | Notes |
|---|------|----------|--------|-------|
| 1 | Export CSV: fix Forbidden (403) | Medium | ⏳ | `window.open()` → đổi sang `fetch()` + blob download |
| 2 | Cmd+K duplicate dialog (admin/portal) | Medium | ⏳ | Bỏ `SearchDialog` hoặc disable `CommandMenu` theo route |
| 3 | `/keystatic` auth guard | High | ⏳ | Restrict admin/staff only |
| 4 | Cal.com CSP fix | Medium | ✅ | Thêm `app.cal.com` vào script-src + connect-src |
| 5 | Floating chat button che nút | Low | ✅ | `pointer-events-none` on container |

---

## Phase 8 — Extension V2 (Clerk Auth + Distribution) ⏳

Goal: Chuyển extension từ token auth sang Clerk session, hoàn thiện distribution.

**Status: Not started** | **Timeline: Mar 22–24**

| # | Task | Priority | Notes |
|---|------|----------|-------|
| 1 | Extension auth: đổi sang Clerk session login | High | Token share được = dùng miễn phí. Cần OAuth popup → Clerk login → session bind browser |
| 2 | Extension download/install flow | High | Build zip + host static, hoặc publish Chrome Web Store |
| 3 | Extension "View Guide" docs | Medium | Viết docs hướng dẫn cài + sử dụng extension cho customer |
| 4 | Extension API URL: env-based | Low | Hiện hardcode localhost/goads.shop, cần config theo env |

---

## Phase 9 — Community V2 (Public + SEO) ⏳

Goal: Rebuild community thành public-first, SEO-driven (Vercel Community model).

**Status: Not started** | **Timeline: Mar 24–28** | **Requires: nghiên cứu Vercel Community**

> Hiện tại community đóng trong `/portal/` → không SEO, không kéo traffic.
> Mục tiêu: cộng đồng mở, ai cũng xem được, SEO-driven content, kéo organic traffic.

| # | Task | Priority | Notes |
|---|------|----------|-------|
| 1 | Nghiên cứu Vercel Community (routes, SSR, auth, SEO) | High | Deep dive trước khi code |
| 2 | Di chuyển `/portal/community` → `/community` (public route) | High | Marketing layout, SSR |
| 3 | Public reading (không cần login) | High | Posts + replies visible to everyone + Google |
| 4 | Login required để post/reply/vote (Vercel model) | High | Clerk auth, không anonymous |
| 5 | SEO: meta tags, sitemap cho mỗi post | High | Mỗi post = 1 indexable page |
| 6 | Public user profiles `/community/user/[username]` | Medium | Cũng public, Google index |

---

## Phase 10 — CMS & Content Workflow ⏳

Goal: Hoàn thiện CMS workflow cho Thành quản lý blog/docs content.

**Status: Not started** | **Timeline: Mar 25–26**

| # | Task | Priority | Notes |
|---|------|----------|-------|
| 1 | Keystatic content branch workflow | High | Thành push branch riêng, Nam duyệt merge mỗi sáng |
| 2 | Protected main branch + PR review | High | GitHub branch protection rules |
| 3 | Content guidelines cho Thành | Medium | Template bài viết, quy chuẩn format, SEO checklist |

---

## Phase 11 — Deploy & Go Live ⏳

Goal: Deploy to production sau khi hoàn thiện tất cả features.

**Status: Blocked** | **Timeline: Sau Phase 10**

| # | Task | Priority | Status | Notes |
|---|------|----------|--------|-------|
| 1 | Vercel deploy + Clerk Production | Critical | ⏳ | Custom domain → Clerk Prod → env vars |
| 2 | Rate limiting server actions | High | ⏳ | Prevent abuse on cart/order/wallet actions |
| 3 | Cross-role E2E testing | Medium | ⏳ | Needs production deploy |
| 4 | Logging/monitoring (Sentry) | Medium | ⏳ | Production error tracking |

**Already completed:**
- ✅ Clerk webhook, username/password login, error boundaries
- ✅ Mock data cleanup, CSP + security headers, robots noindex

---

## Phase 12 — UI Redesign from Figma ⏳

Goal: Implement Trang's new UI designs.

**Status: Not started** | **Timeline: After deploy + Trang delivers Figma**

> Trang (intern designer) redesigning full UI on Figma — delivers end of March.

| # | Task | Priority | Notes |
|---|------|----------|-------|
| 1 | Figma handoff review | Critical | Audit all screens, component inventory |
| 2 | Design system setup | Critical | New tokens, colors, typography |
| 3 | Marketing pages rebuild | High | Home, products, blog, about |
| 4 | Portal UI rebuild | High | Shop, orders, dashboard, profile |
| 5 | Admin UI rebuild | High | Dashboard, tables, forms, dialogs |
| 6 | Responsive + dark mode audit | Medium | 375/768/1024/1440px |

---

## Backlog (2027+)

| Feature | Reason |
|---------|--------|
| Telegram Bot | 1-on-1 chat works fine at current scale |
| Payment integration (SePay/Stripe) | Manual flow for now |
| Auto-delivery pipeline | Depends on payments |
| AI Ask (RAG) | Manual support preferred |
| Email notifications (Resend) | Needs provider setup |
| Admin analytics (MRR/LTV) | Finance page covers basics |
| DB indexes audit | When data grows |
| Vercel cron (warranty expiry) | Needs Vercel Pro plan |

---

## Summary

```
Phase 1   ✅  Marketing site + cart + tools + blog + docs + SEO
Phase 1A  ✅  Dark mode + mobile responsive + Lighthouse audits
Phase 2   ✅  Auth + Admin + Portal + CRUD + UX + Perf + Polish
Phase 3   ✅  Security headers, error boundaries, mock cleanup
Phase 4   ✅  Analytics, warranty, CSV export, Flexsearch, Keystatic CMS
Phase 5   ✅  Chrome extension for BM invite management
Phase 6   ✅  Community V1, moderation, user profiles, segmentation
Phase 7   🔄  Bug fixes & quick wins (3 remaining)
Phase 8   ⏳  Extension V2 — Clerk auth + distribution
Phase 9   ⏳  Community V2 — public + SEO (Vercel model)
Phase 10  ⏳  CMS & content workflow for Thành
Phase 11  ⏳  Deploy & Go Live
Phase 12  ⏳  UI Redesign from Figma
Backlog   📋  Payments, email, AI, Telegram Bot (2027+)
```

```
Phase 7 (Bugs) → 8 (Extension V2) → 9 (Community V2) → 10 (CMS) → 11 (Deploy) → 12 (UI)
```

## DB Schema (17 tables)

After merging all branches, the combined schema has 17 tables:

| Table | Source | Purpose |
|-------|--------|---------|
| user | Phase 2 | Auth + profile (username/bio/avatar added Phase 6) |
| product | Phase 2 | Product catalog |
| customer_price | Phase 2 | Per-customer pricing |
| delivered_item | Phase 2 | Delivered credentials |
| order / order_item | Phase 2 | Order management |
| wallet_transaction | Phase 2 | Balance transactions |
| notification | Phase 2 | In-app notifications |
| extension_token | Phase 5 | Chrome extension auth tokens |
| community_category | Phase 6 | Discussion board categories |
| community_post | Phase 6 | Discussion posts |
| community_reply | Phase 6 | Post replies |
| community_report | Phase 6 | Content reports |
| community_subscription | Phase 6 | Post subscriptions |
| community_upvote | Phase 6 | Post/reply upvotes |
| community_view | Phase 6 | Post view tracking |
| warranty_claim | Phase 4 | Warranty claim management |
