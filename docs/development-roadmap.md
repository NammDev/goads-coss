# GoAds Development Roadmap

> Feature roadmap across 3 phases: MVP Release → Self-serve Portal → Growth & Intelligence

---

## Phase 1 — MVP Release (Replace goads.shop)

Goal: Feature-complete marketing site with order flow, ready to replace goads.shop.

**Status: DONE**

### Core Features

| Feature | Status | Priority | Notes |
|---------|--------|----------|-------|
| Search modal (cmd+K) | **Done** | Critical | Global search across products, tools, docs, blog. Index-based with categories. |
| Talk to Sales | **Partial** | Critical | Telegram + Email buttons only. Cal.com embed not yet integrated. |
| Order flow (Cart) | **Done** | Critical | Cart context + localStorage. Redirects to `/payment` page (bank transfer, crypto). No Stripe yet. |
| Tools | **Done** | High | 19 tools (2FA, watermark, IP checker, cookie, filter, merge, notepad, etc.) |
| Resources pages | **Done** | High | About (team section), milestones (timeline), reviews, partners, help — all with content. |
| Community — UI shell | **Not started** | Medium | No `/community` route exists. Deferred. |
| /docs Knowledge Base | **Done** | Medium | Custom routing with 3-tier hierarchy (welcome → tab → articles). Functional, not Fumadocs. |

### Infrastructure & Polish

| Feature | Status | Priority | Notes |
|---------|--------|----------|-------|
| SEO basics | **Done** | Critical | `robots.ts`, `sitemap.ts` (30+ routes), OG meta, Twitter card in layout |
| Legal pages | **Done** | Critical | ToS, Privacy Policy, Refund Policy — shared `LegalPageLayout` component |
| Analytics | **Done** | High | Vercel Analytics + Speed Insights active |
| 404 page | **Done** | High | Custom `not-found.tsx` with ErrorPage04 block |
| Trust signals on products | **Done** | High | `ProductPageTemplate` with avatars, catalog. Reviews page exists. |
| Contact entry points | **Done** | Medium | Floating contact button (Telegram + WhatsApp), `/talk-to-sales`, `contact-info.ts` |
| Loading/skeleton states | **Done** | Medium | `loading.tsx` in `(marketing)` and `tools` route groups |

### Release Checklist

- [x] All product pages with order flow (cart → payment)
- [x] Search modal functional (cmd+K)
- [x] SEO: sitemap.xml, robots.txt, OG meta tags
- [x] Legal: ToS, Privacy, Refund pages
- [x] Analytics tracking (Vercel)
- [x] 404 page
- [x] Trust signals on product pages
- [x] Contact entry points (floating button, talk-to-sales)
- [x] Loading/skeleton states

**Phase 1 — DONE**

---

## Phase 1A — Polish & Audits

Goal: Quality audit + remaining UI polish before moving to Phase 2.

**Status: Not started**

| Feature | Priority | Notes |
|---------|----------|-------|
| Mobile responsive audit | High | Full audit at 375px, 768px, 1024px, 1440px |
| Dark mode audit | High | Verify all pages + blocks render correctly |
| Lighthouse audit | High | Target > 90 on performance, accessibility, SEO |
| Cart mobile UI fix | High | Fix cart UI/UX on mobile viewports |
| Cal.com embed (Talk to Sales) | Medium | Embed scheduling widget on `/talk-to-sales` page |
| Community UI shell | Medium | Discussion board UI placeholder (no auth) |

---

## Phase 2 — Customer Portal & Auth-Gated Tools

Goal: Customers sign in to access portal (view orders, credentials, BM links) and auth-gated tools (BM invite extension). Orders & payments still processed manually via Telegram.

**Status: Not started**

### How It Works (Phase 2)

```
Order flow (unchanged):  Customer → Telegram → Manual payment → Staff processes
Portal flow (new):       Staff assigns order → DB → Customer sees in portal
Extension flow (new):    Customer signs in → Portal → Download/use BM invite extension
```

### Infrastructure (Must-have first)

| Feature | Priority | Notes |
|---------|----------|-------|
| Database setup (PostgreSQL) | Critical | Orders, credentials, BM data, user accounts |
| Auth system (Better Auth / Clerk) | Critical | Email + Google OAuth, role-based (customer/admin) |
| Admin panel (internal) | Critical | Staff inputs orders, credentials, BM info after Telegram processing |

### Customer Portal

| Feature | Priority | Notes |
|---------|----------|-------|
| Order history dashboard | Critical | Customer views their orders (staff-entered data) |
| Credentials vault | Critical | Secure UID/pass/2FA/cookie display |
| BM management + invite links | Critical | View BM info, generate/use invitation links |
| **Auth-gated BM invite extension** | **Critical** | Chrome extension that requires sign-in to use. Delivers BM invite links to customer's browser. |
| Warranty tracking | High | 7-day countdown, 1-click claim via Telegram |
| Live status monitoring | High | Auto-check profile/BM live status |

### BM Invite Extension — Chrome Extension + API Auth

Extension authenticates via GoAds API token from portal sign-in. User signs in on portal → extension receives JWT → calls API to fetch BM invite links → injects into browser.

```
User signs in (portal) → JWT token stored → Extension reads token
→ Calls GoAds API → Fetches BM invite links → Delivers to browser
```

- Distribution: Chrome Web Store (preferred) or manual .crx
- Auth: Extension opens portal login if no token → receives token via message passing
- Fallback: License key from portal (paste into extension) if auth flow too complex

### Deferred to Phase 3

| Feature | Notes |
|---------|-------|
| Ticket system | warranty/technical/billing categories |
| Community + auth | Discussion board |
| Doc search | Algolia or Pagefind |
| Email notifications | Order confirmed, delivered, warranty expiring |
| Tool tiers (free/basic/pro) | Gate advanced tools behind login |
| Restock/re-order | 1-click replacement |

---

## Phase 3 — Growth & Intelligence

Goal: Data-driven growth, AI features, automation.

**Status: Not started**

| Feature | Priority | Notes |
|---------|----------|-------|
| Payment integration | High | SePay (VietQR) for VN + Stripe for international |
| Auto-delivery pipeline | High | Payment confirmed → assign credentials → push to portal |
| CMS admin panel | High | Employees manage blog/docs content without code |
| AI Ask (RAG on docs) | High | Chat with knowledge base, answer customer questions |
| Admin analytics dashboard | High | Revenue, MRR, ARPU, LTV, churn prediction |
| Referral/Affiliate system | Medium | Invite link + commission tracking |
| Product health monitoring | Medium | Auto-check all BMs/profiles, ban alerts |
| Customer segmentation | Medium | Whale vs casual, targeted email marketing |
| Bulk order API | Low | Enterprise customers integrate via API |
| Advanced notification system | Low | Telegram bot + email + in-app notifications |

---

## Current State Summary

```
goads.shop (current)        →  goads-coss (replacement)
├── Products: manual         →  Product pages + cart + payment     ✅
├── Orders: Google Sheet     →  Customer portal (Phase 2)          ⏳
├── Support: Telegram only   →  Telegram + Email + floating btn    ✅
├── Content: none            →  Blog (5 posts) + Docs + Tools     ✅
├── Tools: none              →  19 free tools                      ✅
├── Legal: none              →  ToS + Privacy + Refund             ✅
├── SEO: none                →  Sitemap + robots + OG meta         ✅
└── Analytics: none          →  Vercel Analytics + Speed Insights  ✅
```
