# Phase 2 — Auth Migration + Core Business Flow

> Goal: Smooth, clean admin→customer flow. No more, no less.

**Core flow:** Super admin creates user → topup → create order → deliver → Customer logs in, sees balance, orders, products, can purchase from portal.

---

## Execution Strategy

**Step 1:** Clerk migration on main branch (Critical Path — blocks profile, performance, E2E)
**Step 2:** After Clerk merged, split remaining work into 3 parallel worktrees
**Step 3:** E2E testing after all worktrees merged

```
Phase 1: [████████ Clerk migration ████████]  ✅ DONE (main branch)
                                              ↓ merge
Phase 2: WT-A: [██ Tables + Toast + Polish ██]     (parallel)
          WT-B: [██ Portal catalog + Profile ██]    (parallel)
          WT-C: [██ Perf + DX + Admin pages ██]     (parallel)
                                              ↓ merge all
Phase 3: [██ E2E testing ██]
```

---

## Tasks Overview

### Step 1 — Clerk Migration (main branch, sequential)

| # | Task | Priority | Status | Description |
|---|------|----------|--------|-------------|
| 1 | Clerk migration | Critical | ✅ | Thay Better Auth bằng Clerk — ClerkProvider, sign-in/sign-up pages, requireRole(), server actions, webhook sync, edge middleware |

### Step 2 — Parallel Worktrees (after Clerk merged)

#### WT-A: `ui-tables-toast-polish`

| # | Task | Priority | Status | Description |
|---|------|----------|--------|-------------|
| 10 | Pixel-perfect shadcn studio tables | Medium | ⏳ | Refactor AdminDataTable dùng trực tiếp code shadcn studio — chỉ swap data/columns, giữ nguyên UI gốc |
| 5 | Error handling UX | Medium | ✅ | Thêm toast cho tất cả actions (thành công/thất bại). Hiện im lặng khi lỗi |
| 16 | Notification center | Medium | ✅ | In-app notification center: DB table, bell icon dropdown với real data, mark-as-read, auto-create on actions |
| 7 | Flow polish | Medium | ⏳ | Xử lý edge cases: balance=0, stock=0, duplicate delivery, empty states |
| 8 | Cal.com embed | Low | ⏳ | Gắn widget đặt lịch gọi vào `/talk-to-sales` |

**File ownership:** `components/dashboard/admin-data-table.tsx`, `*-table.tsx` wrappers, column defs, toast components, empty state components, `/talk-to-sales`, `lib/db/schema/notification-tables.ts`, `lib/db/queries/notification-queries.ts`, `lib/actions/notification-actions.ts`, `components/shadcn-studio/blocks/dropdown-notification.tsx`

#### WT-B: `portal-catalog-profile`

| # | Task | Priority | Status | Description |
|---|------|----------|--------|-------------|
| 3 | Portal product catalog | High | ⏳ | Khách hàng xem sản phẩm trong portal → thêm giỏ hàng → gửi order qua Telegram |
| 4 | Portal profile | Medium | ⏳ | Khách hàng xem/sửa thông tin cá nhân (name, telegramId). Hiện page trống |
| 13 | Portal tools integration | Medium | ⏳ | Wire portal tools page to actual tool pages |
| 14 | Portal search | Medium | ⏳ | Khách hàng search được các route/content trong portal (orders, products, wallet...) |
| 15 | Public share links | High | ⏳ | Admin share link public cho khách xem order/product mà không cần login. Token-based hoặc signed URL |

**File ownership:** `portal/products/*` (catalog view), `portal/profile/*`, `portal/tools/*`, `portal/search/*`, `app/share/[token]/*`, cart logic

#### WT-C: `perf-dx-admin-pages`

| # | Task | Priority | Status | Description |
|---|------|----------|--------|-------------|
| 6 | Dashboard performance | High | ⏳ | Giảm latency dashboard routes (2s→500ms): parallel queries, loading.tsx, prefetch, client cache |
| 2 | drizzle-kit push fix | High | ⏳ | Fix bug CHECK constraint trong drizzle-kit để push schema không cần SQL thủ công |
| 11 | Admin finance page | Medium | ⏳ | Wire real revenue/stats queries to admin finance page |
| 12 | Admin settings page | Medium | ⏳ | Wire real settings CRUD to admin settings page |

**File ownership:** `loading.tsx` files, `page.tsx` query optimization, `drizzle.config.ts`, `admin/finance/*`, `admin/settings/*`

### Step 3 — E2E Testing (after all worktrees merged)

| # | Task | Priority | Status | Description |
|---|------|----------|--------|-------------|
| 9 | E2E testing | Low | ⏳ | Test toàn bộ flow 2 role (super_admin + customer) sau khi mọi thứ xong |

---

## Dependencies

```
Task 1 (Clerk)  ──BLOCKS──→ Task 4 (Profile needs Clerk user object)
                            Task 6 (Performance: edge middleware)
                            Task 9 (E2E needs stable auth)

WT-A (UI)       ──NO DEPS── can start immediately after Clerk merge
WT-B (Portal)   ──NO DEPS── can start immediately after Clerk merge
WT-C (Perf/DX)  ──NO DEPS── can start immediately after Clerk merge

All WTs merged  ──BLOCKS──→ Task 9 (E2E runs last)
```

---

## What's Already Working

- Admin: create customer, topup, create order, deliver ✅
- Portal: dashboard, orders, delivered products, wallet ✅
- Auth: Clerk fully integrated (ClerkProvider, edge middleware, webhook sync, role guards) ✅
- Products: ~8 types, ~5-6 variants each — managed directly in DB, no admin UI needed ✅

## What's Missing (this plan covers all)

- ~~Auth: Clerk migration~~ ✅ Done
- Portal: no product catalog in dashboard (customer can't browse, must go to marketing site)
- Portal: profile page incomplete
- Portal: tools page not wired
- Admin: finance + settings pages empty
- ~~UX: no toast notifications on actions~~ ✅ Done
- ~~UX: no notification center~~ ✅ Done (DB-backed bell icon dropdown, auto-notify on order/topup/delivery)
- DX: drizzle-kit CHECK constraint bug blocking schema push
- Performance: dashboard routes lag 1-2s do sequential DB queries + auth check mỗi navigation
- Portal: no search across portal routes/content
- Portal: no public share links (customer phải login mới xem được)
