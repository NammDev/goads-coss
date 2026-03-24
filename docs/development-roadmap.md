# GoAds Development Roadmap

> 12 phases: MVP ✅ → Auth ✅ → Security ✅ → Analytics ✅ → Extension ✅ → Community V1 ✅ → Bugs ✅ → Extension V2 ✅ → Community V2 ✅ → CMS → Deploy → UI

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

## Phase 7 — Bug Fixes & Quick Wins ✅

Goal: Fix bugs từ manual testing, polish trước khi tiếp tục.

**Status: DONE** | **Completed: Mar 22–24**

| # | Task | Priority | Status | Notes |
|---|------|----------|--------|-------|
| 1 | Export CSV: fix Forbidden (403) | Medium | ✅ | `window.open()` → `fetch()` + blob download + loading state + toast |
| 2 | Cmd+K duplicate dialog (admin/portal) | Medium | ✅ | Disable `CommandMenu` on `/admin` + `/portal` routes via `usePathname()` |
| 3 | `/keystatic` auth guard | High | ✅ | Middleware restricts `/keystatic(.*)` to `super_admin` / `staff` roles |
| 4 | Cal.com CSP fix | Medium | ✅ | Thêm `app.cal.com` vào script-src + connect-src |
| 5 | Floating chat button che nút | Low | ✅ | `pointer-events-none` on container |

---

## Phase 8 — Extension V2 (Clerk Auth + Distribution) ✅

Goal: Chuyển extension từ token auth sang Clerk session, hoàn thiện distribution.

**Status: DONE** | **Completed: Mar 24** | **Branch: `feature/extension-v2`**

| # | Task | Status | Highlights |
|---|------|--------|------------|
| 1 | Extension auth: Clerk session cookie | ✅ | Đọc `__session` cookie từ goads.shop → verify qua `/api/extension/verify` → cache user. Auto re-verify mỗi 30 phút via `chrome.alarms`. Offline fallback dùng cached user |
| 2 | Extension download/install flow | ✅ | `build-zip.sh` (dev/prod flag) → output `app/public/downloads/goads-bm-invite-v2.zip` |
| 3 | Extension "View Guide" docs | ✅ | Markdoc guide tại `src/content/docs/bm-invite-extension-guide/` |
| 4 | Extension config: env-based | ✅ | `config.js` (localhost) + `config.prod.js` (goads.shop), swap khi build zip |
| 5 | Portal UI update | ✅ | Bỏ token generate/copy UI, thay bằng "Sign in with GoAds" flow hướng dẫn |
| 6 | Verify API endpoint | ✅ | `POST /api/extension/verify` — Clerk `verifyToken()` + lookup user in DB |
| 7 | Content.js v2 auth flow | ✅ | Bỏ token input, thêm "Sign in with GoAds" button + `visibilitychange` auto re-check |

**Key changes vs V1:**
- Auth: token-based → Clerk session cookie (không share được, bound to browser)
- UX: paste token → 1-click "Sign in with GoAds" → auto-connect khi quay lại tab
- Manifest v2.0.0, thêm permission `alarms`
- Legacy v1 token API giữ lại cho backward compat

### Manual UI Testing

**Prerequisite:** Load extension vào Chrome (`chrome://extensions` → Load unpacked → chọn `extension/`)

| # | Test | Steps | Expected |
|---|------|-------|----------|
| 1 | Extension chỉ chạy trên Facebook | Click icon trên google.com | Không có gì xảy ra (chỉ inject trên `business/www/adsmanager/m.facebook.com`) |
| 2 | Auth screen hiển thị khi chưa login | Mở `business.facebook.com` → click extension icon | Hiện overlay → Auth screen với nút "Sign in with GoAds" |
| 3 | Sign in flow | Click "Sign in with GoAds" | Mở tab mới → `localhost:3000/sign-in` (dev) hoặc `goads.shop/sign-in` (prod) |
| 4 | Auto-connect sau sign in | Sign in ở tab GoAds → quay lại tab Facebook | Extension tự detect session cookie → hiện connected state (tên + role) |
| 5 | Connected state UI | Sau khi auth thành công | Hiện tên user, GoAds pill badge, nút Disconnect |
| 6 | Disconnect | Click "Disconnect" | Clear cached user, quay về Auth screen |
| 7 | Offline fallback | Tắt mạng → click extension icon (đã login trước đó) | Hiện cached user với `offline: true` |
| 8 | Session expired | Xóa cookie `__session` từ goads.shop → click icon | Quay về Auth screen, cached user bị xóa |
| 9 | Portal extensions page | Mở `/portal/tools/extensions` | Hiện hướng dẫn 4 bước sign-in flow (không còn token input) |
| 10 | Download zip | Chạy `./extension/build-zip.sh` | File `app/public/downloads/goads-bm-invite-v2.zip` được tạo |
| 11 | Prod build zip | Chạy `./extension/build-zip.sh --prod` | Zip chứa `config.js` với `API_URL: "https://goads.shop/api/extension"` |

---

## Phase 9 — Community V2 (Public + SEO) ✅

Goal: Rebuild community thành public-first, SEO-driven (Vercel Community model).

**Status: DONE** | **Completed: Mar 24** | **Branch: `feature/community-v2`**

> Community chuyển từ `/portal/community` (auth-gated) → `/community` (public marketing layout).
> Mọi người đều xem được posts + replies. Login chỉ cần để post/reply/vote.

| # | Task | Status | Highlights |
|---|------|--------|------------|
| 1 | Nghiên cứu Vercel Community | ✅ | Research report: `plans/reports/researcher-260321-0102-featurebase-research.md` |
| 2 | Public routes `/community` (marketing layout) | ✅ | 7 new pages: listing, `[slug]`, `create`, `c/[category]`, `user/[username]`, layout, loading |
| 3 | Portal → public redirects | ✅ | All 4 portal community routes redirect to `/community/*` |
| 4 | Public reading (no login required) | ✅ | Posts + replies + categories visible to everyone + Google |
| 5 | Auth-gated interactions | ✅ | Login required to post/reply/vote/subscribe/report |
| 6 | SEO: meta tags, JSON-LD, sitemap | ✅ | OG meta per post, DiscussionForumPosting JSON-LD, dynamic sitemap (posts + categories) |
| 7 | Public user profiles `/community/user/[username]` | ✅ | User stats + post history, Google-indexable |
| 8 | Search + sort + pagination | ✅ | Full-text search (300ms debounce), sort by recent/top/trending, 20/page |
| 9 | Category pages `/community/c/[category]` | ✅ | Category-filtered listing with metadata + breadcrumbs |
| 10 | Responsive UI | ✅ | Desktop sidebar (categories + leaderboard), mobile category buttons |

**Key files:** `app/src/app/(marketing)/community/` (7 pages), 7 modified components, `community-queries.ts` (9 queries), `sitemap.ts`

### 9A — Manual UI Test Checklist

| # | Test Case | Route | Expected | Status |
|---|-----------|-------|----------|--------|
| 1 | Community listing loads (logged out) | `/community` | Posts visible, no auth required | ⏳ |
| 2 | Search posts | `/community?q=keyword` | Filtered results, 300ms debounce | ⏳ |
| 3 | Sort: recent / top / trending | `/community?sort=top` | Order changes correctly | ⏳ |
| 4 | Pagination | `/community?page=2` | Next/prev buttons, 20/page | ⏳ |
| 5 | Category filter | `/community/c/q-and-a` | Category-specific posts + breadcrumbs | ⏳ |
| 6 | Mobile categories | `/community` (< 1024px) | Horizontal category buttons visible | ⏳ |
| 7 | Post detail (logged out) | `/community/[slug]` | Full post + replies visible, no auth needed | ⏳ |
| 8 | Post detail SEO | `/community/[slug]` | OG meta + JSON-LD DiscussionForumPosting in source | ⏳ |
| 9 | Upvote requires login | `/community/[slug]` | Click upvote → redirect to sign-in | ⏳ |
| 10 | Reply requires login | `/community/[slug]` | Reply form shows sign-in prompt | ⏳ |
| 11 | Create post (logged in) | `/community/create` | Form renders, category select, submit works | ⏳ |
| 12 | Create post (logged out) | `/community/create` | Redirect to sign-in | ⏳ |
| 13 | Subscribe/Unsubscribe | `/community/[slug]` | Toggle works, toast notification | ⏳ |
| 14 | Report content | `/community/[slug]` | Report dialog opens, submit works | ⏳ |
| 15 | User profile (public) | `/community/user/[username]` | Stats + post history visible without login | ⏳ |
| 16 | Portal redirect → `/community` | `/portal/community` | 302 redirect to `/community` | ⏳ |
| 17 | Portal redirect → post detail | `/portal/community/[slug]` | 302 redirect to `/community/[slug]` | ⏳ |
| 18 | Portal redirect → create | `/portal/community/create` | 302 redirect to `/community/create` | ⏳ |
| 19 | Portal redirect → user profile | `/portal/community/user/[username]` | 302 redirect to `/community/user/[username]` | ⏳ |
| 20 | Sitemap includes community | `/sitemap.xml` | `/community`, `/community/[slug]`, `/community/c/[cat]` entries | ⏳ |
| 21 | Sidebar: categories + leaderboard | `/community` (desktop) | Sticky sidebar, active category highlight, top 5 contributors | ⏳ |
| 22 | Dark mode | All `/community/*` | No broken colors, proper contrast | ⏳ |
| 23 | Mobile responsive (375px) | All `/community/*` | No overflow, sidebar hidden, mobile categories visible | ⏳ |

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

## Manual UI Testing Guide

> Test at 4 breakpoints: **375px** (mobile), **768px** (tablet), **1024px** (laptop), **1440px** (desktop).
> Toggle **dark mode** on every page. Check `Cmd+K` search on marketing vs dashboard.

### A. Marketing Pages (Public — No Login)

| # | Route | What to Check |
|---|-------|---------------|
| 1 | `/` (Home) | Hero, product cards, CTA buttons, footer links |
| 2 | `/agency-ad-account` | Product detail, pricing table, Add to Cart |
| 3 | `/bm` | Same as above — BM product page |
| 4 | `/google-agency` | Google product page |
| 5 | `/tiktok-agency` | TikTok product page |
| 6 | `/tiktok-accounts` | TikTok accounts page |
| 7 | `/blue-verification` | Blue tick product page |
| 8 | `/unban` | Unban service page |
| 9 | `/profiles` | Profiles product page |
| 10 | `/pricing` | Pricing overview |
| 11 | `/payment` | Bank + crypto payment flow |
| 12 | `/blog` | Blog listing, category sidebar, pagination |
| 13 | `/blog/[slug]` | Blog detail, TOC sidebar, prose rendering |
| 14 | `/docs` | Knowledge base, Fumadocs/Markdoc rendering |
| 15 | `/tools` | 19 free tools listing |
| 16 | `/tools/2fa` | Sample tool — check each tool loads |
| 17 | `/about` | About page, milestones |
| 18 | `/milestones` | Timeline |
| 19 | `/reviews` | Customer reviews |
| 20 | `/partners` | Partner logos |
| 21 | `/help` | Help/FAQ |
| 22 | `/talk-to-sales` | Cal.com embed loads in iframe |
| 23 | `/pages` | Pages directory |
| 24 | `/terms-of-service` | Legal page |
| 25 | `/privacy-policy` | Legal page |
| 26 | `/refund-policy` | Legal page |
| 27 | `Cmd+K` | Search opens, results navigate correctly |
| 28 | Cart | Add items → cart icon → `/payment` |
| 29 | Floating chat | Telegram + WhatsApp buttons, not blocking content |

### B. Auth Pages

| # | Route | What to Check |
|---|-------|---------------|
| 1 | `/sign-in` | Clerk SignIn loads, email/password + social |
| 2 | `/sign-up` | Clerk SignUp loads |
| 3 | `/unauthorized` | Shows for wrong-role access |
| 4 | `/keystatic` | Redirects non-admin to `/` (middleware guard) |

### C. Admin Panel (Login as `super_admin` or `staff`)

| # | Route | What to Check |
|---|-------|---------------|
| 1 | `/admin` | Dashboard stats, date range filter (7d/30d/90d), charts |
| 2 | `/admin/customers` | Table loads, search, Create Customer dialog |
| 3 | `/admin/customers/[id]` | Balance card, Topup dialog, order history |
| 4 | `/admin/orders` | Table loads, search, filters, Export CSV button |
| 5 | `/admin/orders/new` | Create order form — customer select, line items, balance check |
| 6 | `/admin/orders/[id]` | Order detail, Deliver dialog, share link generation |
| 7 | `/admin/products` | Product type tabs |
| 8 | `/admin/products/[type]` | Products table for specific type |
| 9 | `/admin/products/new` | Create product form |
| 10 | `/admin/finance` | Revenue by type, top customers, charts, Export CSV |
| 11 | `/admin/staff` | Staff list |
| 12 | `/admin/community` | Moderation — pin/hide/status, report queue |
| 13 | `/admin/settings` | Settings page (deferred) |
| 14 | Sidebar | All nav items active-state highlight correctly |
| 15 | `Cmd+K` (admin) | SearchDialog opens (NOT CommandMenu duplicate) |
| 16 | Notification bell | Shows unread, mark-as-read |
| 17 | Export CSV | Click → file downloads (no 403), loading spinner, toast |
| 18 | Warranty claims | Create claim on delivered item → admin approve/reject |

### D. Customer Portal (Login as `customer`)

| # | Route | What to Check |
|---|-------|---------------|
| 1 | `/portal` | Dashboard stats, recent orders |
| 2 | `/portal/orders` | Orders table, empty state if no orders |
| 3 | `/portal/orders/[id]` | Order detail, delivered items with credentials |
| 4 | `/portal/products` | Shop catalog, category pills, search, Buy Now → cart |
| 5 | `/portal/products/[type]` | Products by type table |
| 6 | `/portal/products/[type]/[id]` | Single product view |
| 7 | `/portal/wallet` | Transaction history, empty state |
| 8 | `/portal/profile` | Clerk UserProfile (avatar, name, email, MFA) |
| 9 | `/portal/tools` | 20 tools, categorized sidebar |
| 10 | `/portal/tools/extensions` | Generate/copy/revoke extension token |
| 11 | `/portal/community` | Discussion board, create post |
| 12 | `/portal/community/create` | New post form |
| 13 | `/portal/community/[slug]` | Post detail, replies, upvotes |
| 14 | `/portal/community/user/[username]` | Public user profile |
| 15 | Cart (portal) | Buy Now adds to cart, cart icon in header |
| 16 | `Cmd+K` (portal) | SearchDialog — orders, products, wallet search |
| 17 | Notification bell | Shows portal-specific notifications |

### E. Cross-Cutting Checks

| # | Check | Details |
|---|-------|---------|
| 1 | Dark mode toggle | Every page — colors, borders, text contrast |
| 2 | Mobile responsive | 375px — sidebar collapses, tables scroll horizontal, no overflow |
| 3 | Loading states | Navigate between pages — skeletons show briefly |
| 4 | Error boundary | Go to `/admin/nonexistent` — error page shows |
| 5 | Share link | `/share/[token]` — marketing layout + conversion CTAs |
| 6 | SEO | Check `<title>`, OG meta on marketing pages |
| 7 | Grid frame lines | Vertical borders at container edges on marketing pages |

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
Phase 7   ✅  Bug fixes & quick wins (CSV export, Cmd+K, Keystatic guard)
Phase 8   ✅  Extension V2 — Clerk session auth + build zip + guide docs
Phase 9   ✅  Community V2 — public routes, SEO, JSON-LD, sitemap, portal redirects
Phase 10  ⏳  CMS & content workflow for Thành
Phase 11  ⏳  Deploy & Go Live
Phase 12  ⏳  UI Redesign from Figma
Backlog   📋  Payments, email, AI, Telegram Bot (2027+)
```

```
Phase 7 (Bugs) → 8 (Extension V2) → 10 (CMS) → 11 (Deploy) → 12 (UI)
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
