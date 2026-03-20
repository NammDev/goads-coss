# Phase 4 — Analytics & Monitoring

> Goal: Business intelligence, warranty system, product health monitoring.
> Timeline: Mar 19–23 | Branch: `ui-playground`

---

## Task List

| # | Task | Priority | Status | Estimated | Notes |
|---|------|----------|--------|-----------|-------|
| 1 | [Admin analytics dashboard](#task-1) | High | ⏳ | 1d | Revenue, MRR, ARPU, LTV |
| 2 | [Dashboard date range filter](#task-2) | High | ✅ | 0.5d | Presets + custom calendar, URL params, server-side filtering |
| 3 | [Warranty tracking system](#task-3) | High | ✅ | 1d | Schema + queries + actions + portal/admin UI. Cron deferred. |
| 4 | [Export CSV/PDF](#task-4) | Medium | ✅ | 0.5d | CSV export via Route Handlers, 4 endpoints, reusable button |
| 5 | [Live product monitoring](#task-5) | Medium | ✅ | 0.5d | Manual health status + auto-warranty-claim on ban |
| 6 | [DB indexes audit](#task-6) | Medium | ⏳ | 0.5d | Query performance optimization |
| 7 | [Doc search (Flexsearch)](#task-7) | Medium | ✅ | 0.5d | Flexsearch in CommandMenu, unified Cmd+K |
| 8 | [Keystatic CMS for staff](#task-8) | Medium | ✅ | 1d | Blog + Docs CMS at /keystatic, Markdoc content |

---

## Task Details

### Task 1: Admin Analytics Dashboard {#task-1}

**Priority:** High

**Description:** Build comprehensive analytics views in admin panel.

**Metrics to track:**
- Revenue: total, by product type, by period
- MRR (Monthly Recurring Revenue) — if applicable
- ARPU (Average Revenue Per User)
- LTV (Lifetime Value) per customer
- Order conversion rates
- Top products by revenue/volume
- Customer growth trend

**Implementation:**
- New route: `/admin/analytics` or enhance existing `/admin/finance`
- Charts: line (revenue trend), bar (by product type), pie (revenue share)
- Summary cards: total revenue, orders, customers, avg order value

**Dependencies:** None (Phase 2 finance page exists as foundation)

---

### Task 2: Dashboard Date Range Filter {#task-2}

**Priority:** High | **Status:** ✅ Complete (Mar 20)

**Description:** Add date range selector to admin dashboard and analytics.

**Features:**
- Preset ranges: Today, 7d, 30d, 90d, This month, Last month, All time
- Custom date range picker (2-month calendar popover via shadcn/ui)
- Apply to all dashboard stats + charts
- URL query params for shareability (`?preset=30d` or `?from=2026-03-01&to=2026-03-19`)

**Affected routes:** `/admin`, `/admin/finance`

**Implementation:**
- `src/components/dashboard/date-range-filter.tsx` — reusable client component
- `src/lib/db/queries/date-range-utils.ts` — shared `dateRangeWhere()` for Drizzle WHERE clauses
- `src/lib/date-range-presets.ts` — server-side preset resolver
- All dashboard/finance queries updated with optional `dateRange` param (backward compatible)

**Dependencies:** None

---

### Task 3: Warranty Tracking System {#task-3}

**Priority:** High | **Status:** ✅ Complete (Mar 20) — DB migration pending

**Description:** Track 7-day warranty for delivered items. GoAds promises 7-day warranty on all products.

**Features:**
- Warranty status derived from `warrantyUntil` + claim existence (no extra columns on deliveredItems)
- Color-coded WarrantyBadge: active (green), expiring (amber), expired (gray), claimed (blue), replaced (emerald)
- 1-click warranty claim dialog in customer portal
- Admin: claims section in order detail with approve/reject/link-replacement flow
- Notification types added: `warranty_expiring`, `warranty_claimed`

**DB changes:**
- New `warranty_claims` table: id, deliveredItemId, customerId, reason, status, adminNote, replacementItemId, createdAt, updatedAt
- New `warranty_claim_status` enum: pending, approved, rejected, replaced
- **Pending:** Run `npx drizzle-kit generate && npx drizzle-kit push`

**Key files:**
- Schema: `src/lib/db/schema/warranty-tables.ts`
- Queries: `src/lib/db/queries/warranty-queries.ts` (5 functions)
- Actions: `src/lib/actions/warranty-actions.ts` (submit/approve/reject/link)
- Utils: `src/lib/utils/warranty-utils.ts`
- UI: `warranty-badge.tsx`, `warranty-claim-dialog.tsx`, `warranty-claims-section.tsx`, `warranty-claim-actions.tsx`

**Deferred:** Phase 5 (Vercel cron for expiry notifications) — needs Vercel Pro plan

**Dependencies:** None

---

### Task 4: Export CSV/PDF {#task-4}

**Priority:** Medium | **Status:** ✅ Complete (Mar 20)

**Description:** Export data for offline analysis/accounting.

**Exports:**
| Export | Route | Columns |
|--------|-------|---------|
| Orders | `/api/admin/export/orders` | orderNumber, customer, email, status, amount, currency, paymentMethod, createdAt |
| Customers | `/api/admin/export/customers` | name, email, role, balance, orderCount, totalSpent, createdAt |
| Finance | `/api/admin/export/finance` | productType, itemCount, revenue |
| Delivered Items | `/api/admin/export/delivered-items` | orderId, productType, uid, status, warrantyUntil, deliveredAt |

**Format:** CSV only (PDF deferred — YAGNI). No new deps — manual CSV generation.

**Implementation:**
- `src/lib/csv-utils.ts` — escapeCSV, generateCSV, csvResponse utilities
- Route Handlers with Clerk auth + role check (super_admin/staff only)
- `src/components/dashboard/export-csv-button.tsx` — reusable button, forwards URL search params
- Export buttons added to orders, customers, finance admin pages
- Credentials excluded from delivered items export (security)
- Orders route supports `?status=` filter

**Dependencies:** Task 2 (date filter) ✅

---

### Task 5: Live Product Monitoring {#task-5}

**Priority:** Medium | **Status:** ✅ Complete (Mar 20)

**Description:** Manual product health monitoring with auto-warranty integration.

**Approach:** Manual status update by admin (no Meta API available for ban detection).

**Features:**
- Admin changes item status via inline dropdown (active/inactive/banned/expired)
- Auto-creates warranty claim when item marked "banned" within warranty period
- Dashboard widget showing health overview (counts by status)

**Implementation:**
- `src/lib/actions/product-health-actions.ts` — `updateDeliveredItemStatus()` with auto-claim logic
- `src/components/dashboard/product-health-widget.tsx` — dashboard health overview card
- `src/app/admin/orders/[id]/item-status-select.tsx` — inline status dropdown
- Modified `delivered-items-section.tsx` — replaced static badge with dropdown
- Modified `admin/page.tsx` — added health widget

**Future:** Semi-auto detection via Chrome extension or cron scraping (Phase 5+)

**Dependencies:** Task 3 (warranty system) ✅

---

### Task 6: DB Indexes Audit {#task-6}

**Priority:** Medium

**Description:** Add proper indexes for growing data.

**Areas to audit:**
- `orders` table: customer_id, status, created_at
- `delivered_items` table: order_id, product_type
- `wallet_transactions` table: customer_id, created_at
- `notifications` table: user_id, is_read
- Full-text search columns (if using ILIKE)

**Action:** Run `EXPLAIN ANALYZE` on frequent queries, add missing indexes via Drizzle migration.

**Dependencies:** None

---

### Task 7: Doc Search (Pagefind/Algolia) {#task-7}

**Priority:** Medium

**Description:** Full-text search across knowledge base / docs pages.

**Options:**
- **Pagefind** — static, zero-cost, runs at build time
- **Algolia** — hosted, fast, free tier available
- **Flexsearch** — client-side, lightweight

**Scope:** Knowledge base articles, blog posts, help pages.

**Dependencies:** None

---

### Task 8: Keystatic CMS for Staff {#task-8}

**Priority:** Medium

**Description:** Git-based CMS for staff to maintain blog posts, docs articles, and FAQ without coding. Admin UI at `/keystatic`.

**Features:**
- WYSIWYG MDX editor for blog/docs/FAQ
- Media upload (drag & drop)
- GitHub mode: commits to `content` branch, owner merges daily
- Collections: Blog Posts, Docs Articles, FAQ

**Implementation:** Keystatic + Next.js App Router integration

**Dependencies:** None

---

## Execution Order (suggested)

```
Task 6 (DB indexes) → Task 2 (date filter) → Task 1 (analytics)
                                             → Task 3 (warranty) → Task 5 (monitoring)
Task 4 (export) — after Task 2
Task 7 (doc search) — independent
Task 8 (Cal.com) — independent, lowest priority
```

Start with Task 6 (quick win, foundation) → Task 2 + 1 (analytics core) → Task 3 (warranty).
