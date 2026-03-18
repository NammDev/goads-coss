# GoAds Development Roadmap

> 7 phases: MVP ✅ → Auth ✅ → Deploy → Analytics → Extension → Community → UI Redesign

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
| Cal.com embed on `/talk-to-sales` | Deferred to Phase 2 |

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
| `drizzle-kit push` fix | ⚠️ Upstream | Workaround: `generate` + `migrate` instead of `push` |

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

## Phase 3 — Deploy & Go Live 🔄

Goal: Deploy to production, finalize auth config.

**Status: In Progress** | **Timeline: Mar 16–19**

| # | Task | Priority | Status | Notes |
|---|------|----------|--------|-------|
| 1 | Vercel deploy + Clerk Production | Critical | ⏳ | Need custom domain → Clerk Prod instance → env vars. See `docs/phase3/task-01-vercel-deploy.md` |
| 2 | ~~Clerk webhook publicMetadata~~ | Critical | ✅ | Merged into Task 1 (webhook setup) |
| 3 | ~~Username+password login~~ | Critical | ✅ | Done — Clerk Dashboard already requires username |
| 4 | ~~Global error boundary~~ | Critical | ✅ | `global-error.tsx` + `error.tsx` at root, auth, admin, portal |
| 5 | Rate limiting server actions | High | ⏳ | Prevent abuse on cart/order/wallet actions |
| 6 | ~~Mock data cleanup~~ | High | ✅ | RecentTransactions now uses `getRecentOrders()` from DB |
| 7 | ~~CSP headers~~ | High | ✅ | CSP + X-Frame-Options + X-XSS + Referrer-Policy + Permissions-Policy |
| 8 | ~~robots noindex admin/portal~~ | High | ✅ | `robots.ts` disallow + metadata `noindex` on admin/portal layouts |
| 9 | Cross-role E2E testing | Medium | ⏳ | Blocked by Task 1 (needs production deploy) |
| 10 | Logging/monitoring (Sentry) | Medium | ⏳ | Production error tracking |

---

## Phase 4 — Analytics & Monitoring

Goal: Business intelligence, warranty system, product health monitoring.

**Status: Not started** | **Timeline: Mar 19–23**

| # | Task | Priority | Status | Notes |
|---|------|----------|--------|-------|
| 1 | Admin analytics | High | ⏳ | Revenue, MRR, ARPU, LTV dashboards |
| 2 | Dashboard date range filter | High | ⏳ | Filter analytics by period (7d/30d/90d/custom) |
| 3 | Warranty tracking | High | ⏳ | 7-day countdown, 1-click claim |
| 4 | Export CSV/PDF | Medium | ⏳ | Orders, customers, finance reports for offline use |
| 5 | Live product monitoring | Medium | ⏳ | Auto-check BMs/profiles, ban alerts |
| 6 | DB indexes audit | Medium | ⏳ | Optimize query performance for growing data |
| 7 | Doc search (Pagefind/Algolia) | Medium | ⏳ | Full-text across knowledge base |
| 8 | Cal.com embed `/talk-to-sales` | Low | ⏳ | |

---

## Phase 5 — BM Invite Extension

Goal: Chrome extension for BM invite link management.

**Status: Not started** | **Timeline: Mar 23–25**

| # | Task | Priority | Status | Notes |
|---|------|----------|--------|-------|
| 1 | BM Invite Extension API | High | ⏳ | JWT auth, BM invite link CRUD endpoints |
| 2 | Chrome extension | High | ⏳ | Portal JWT → fetch BM invites → inject to browser |
| 3 | Extension access control | Medium | ⏳ | Admin toggles access per customer |

---

## Phase 6 — Community

Goal: Community features for customer engagement.

**Status: Not started** | **Timeline: After Phase 5**

| # | Task | Priority | Notes |
|---|------|----------|-------|
| 1 | Discussion board | Medium | Requires auth |
| 2 | Public user profiles | Medium | Activity, reputation |
| 3 | Moderation tools | Medium | Admin/staff moderation |
| 4 | CMS for blog/docs | High | Staff manages content without code |
| 5 | Email notifications | High | Order confirmed, delivered, warranty expiring |
| 6 | Customer segmentation | Medium | Whale vs casual, targeted marketing |

---

## Phase 7 — UI Redesign from Figma

Goal: Implement Trang's new UI designs. May replace current shadcn-based style entirely.

**Status: Not started** | **Timeline: End of Mar (after Trang delivers Figma)**

> Trang (intern designer) is redesigning the full UI on Figma — delivers end of March. Final design may diverge from current shadcn style.

| # | Task | Priority | Notes |
|---|------|----------|-------|
| 1 | Figma handoff review | Critical | Audit all screens, create component inventory |
| 2 | Design system setup | Critical | New tokens, colors, typography from Figma |
| 3 | Marketing pages rebuild | High | Home, product pages, blog, about, etc. |
| 4 | Portal UI rebuild | High | Shop, orders, dashboard, profile |
| 5 | Admin UI rebuild | High | Dashboard, tables, forms, dialogs |
| 6 | Responsive + dark mode audit | Medium | Verify on 375/768/1024/1440px |

---

## Backlog (2027+)

Deferred features — revisit when business scale requires them.

| Feature | Reason for deferral |
|---------|---------------------|
| Telegram Bot (notifications) | 1-on-1 chat with customers works fine at current scale |
| Payment integration (SePay/Stripe) | 1-on-1 customer care for now, manual flow |
| Auto-delivery pipeline | Depends on payment integration |
| AI Ask (RAG) | Future — manual support preferred currently |
| Tool tiers (free/pro) | Not needed at current scale |
| Bulk order API | Enterprise feature, no demand yet |
| Referral/Affiliate | Growth feature, premature at this stage |

---

## Summary

```
Phase 1  ✅  Marketing site + cart + tools + blog + docs + SEO
Phase 1A ✅  Dark mode + mobile responsive + Lighthouse audits
Phase 2  ✅  Auth + Admin + Portal + CRUD + UX + Perf + Polish
Phase 3  🔄  Deploy & Go Live (Mar 16–19)
Phase 4  ⏳  Analytics & Monitoring (Mar 19–23)
Phase 5  ⏳  BM Invite Extension (Mar 23–25)
Phase 6  ⏳  Community + CMS + Email
Phase 7  ⏳  UI Redesign from Figma (end of Mar, after Trang delivers)
Backlog  📋  Telegram Bot, Payments, auto-delivery, AI, referral (2027+)
```

```
Phase 2 ──► Phase 3 (Deploy) ──► Phase 4 (Analytics) ──► Phase 5 (Extension) ──► Phase 6 (Community)
Figma   ──► Phase 7 (UI Rebuild)
```
