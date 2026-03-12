# GoAds Development Roadmap

> 4 phases: MVP (done) → Auth + Dashboard (in progress) → Extension + Community → Growth & AI

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

## Phase 2 — Auth + Dashboard 🔄

Goal: Auth system + admin panel + customer portal. Foundation for everything else.

**Status: In Progress** — Infrastructure + Dashboard UI done, wiring + integration pending

### 2A — Infrastructure ✅

| Area | Reference |
|------|-----------|
| PostgreSQL (Supabase) + Drizzle ORM | `docs/auth-infrastructure.md` |
| Better Auth v1.5 (email/password) | `src/lib/auth/` |
| RBAC proxy (super_admin / staff / customer) | `src/proxy.ts`, `src/lib/auth/require-role.ts` |
| Sensitive field encryption (BM ID, invite links) | `src/lib/db/encryption.ts` |
| Login + unauthorized pages | `src/app/(auth)/` |

### 2B — Dashboard UI ✅

| Area | Routes | Reference |
|------|--------|-----------|
| Admin Panel | 11 routes (`/admin/*`) | `docs/dashboard-design/` |
| Admin DataTables | Orders, Customers, Products, Staff | `plans/260312-1616-admin-dashboard-datatable/` (sorting, search, pagination, expansion) |
| Customer Portal | 7 routes (`/portal/*`) | `docs/dashboard-design/` |
| Shared components | sidebar, header, stats, status badge, timeline, admin-data-table | `src/components/dashboard/` |

### 2C — Remaining Tasks

| # | Task | Priority | Notes |
|---|------|----------|-------|
| 1 | Wire dashboard → real DB | Critical | Replace mock data with Drizzle queries (admin + portal) |
| 2 | Order flow (end-to-end) | Critical | Cart → Admin confirm payment → Ship → Customer sees order |
| 3 | Cross-role E2E testing | High | Verify permissions: super_admin, staff, customer |
| 4 | Cal.com embed `/talk-to-sales` | Medium | Scheduling widget for sales consultations |

### RBAC

| Role | Who | Access |
|------|-----|--------|
| Super Admin | nammdev, justin | Full: finance, staff, settings, all CRUD |
| Staff | ~3 employees | Orders, customers, ship. No finance/staff/settings |
| Customer | buyers | Own orders, delivered products, tools, profile |

### Data Security

- Sensitive fields encrypted at rest (PostgreSQL)
- Google Sheets: internal admin only (1-way DB → Sheet sync)
- Customer data visible only after authentication

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
Phase 2  🔄  Auth ✅ + Dashboard UI ✅ + DB wiring + Telegram bot (pending)
Phase 3  ⏳  Extension Platform + Community + Search (needs Phase 2)
Phase 4  ⏳  Payments + Automation + Analytics + Growth
```

```
Dependency:  Phase 2 (Auth) ──► Phase 3A (Extension)
                             ──► Phase 3B (Community)
                             ──► Phase 3C (Search/AI)
                             ──► Phase 4  (all)
```
