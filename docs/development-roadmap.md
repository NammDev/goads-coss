# GoAds Development Roadmap

> Feature roadmap across 3 phases: MVP Release → Self-serve Portal → Growth & Intelligence

---

## Phase 1 — MVP Release (Replace goads.shop)

Goal: Feature-complete marketing site with order flow, ready to replace goads.shop.

### Core Features (Must-have)

| Feature | Status | Priority | Notes |
|---------|--------|----------|-------|
| Search modal (cmd+K) | Planned | Critical | Global search across products, tools, docs, blog |
| Talk to Sales (cal.com) | Planned | Critical | Embed cal.com scheduling widget |
| Order flow (Add to Cart modal) | Planned | Critical | Product → Cart → Telegram/payment link redirect |
| Tools — new tools + UI polish | Planned | High | Expand from 9 tools, polish existing UI |
| Resources pages — UI polish | Planned | High | About, milestones, reviews, partners, help |
| Community — UI shell only | Planned | Medium | Discussion board UI, no auth yet |
| /docs Knowledge Base — UI shell | Planned | Medium | Fumadocs + MDX, content later |

### Missing Features (Add to Phase 1)

| Feature | Priority | Notes |
|---------|----------|-------|
| SEO basics | Critical | Meta tags, OG images, sitemap.xml, robots.txt |
| Legal pages | Critical | Terms of Service, Privacy Policy, Refund Policy |
| Analytics setup | High | Google Analytics or Plausible — track conversion |
| 404 page | High | Custom 404 matching GoAds design |
| Trust signals on product pages | High | Reviews/ratings near buy button, social proof |
| Order confirmation flow | High | After cart → confirmation page + Telegram redirect |
| Contact entry points | Medium | Structured: Telegram + Email + cal.com links |
| Loading/skeleton states | Medium | UX polish for slow connections |

### Release Checklist

- [ ] All product pages have working order flow
- [ ] Search modal functional
- [ ] Talk to Sales booking works
- [ ] SEO: sitemap.xml, robots.txt, OG meta tags
- [ ] Legal: ToS, Privacy, Refund pages
- [ ] Analytics tracking conversion funnel
- [ ] 404 page
- [ ] Mobile responsive audit (375px, 768px, 1024px, 1440px)
- [ ] Dark mode audit — all pages
- [ ] Performance: Lighthouse score > 90

---

## Phase 2 — Self-serve & Customer Portal

Goal: Customers can buy, manage orders, and get support without manual Google Sheets or Telegram.

### Auth & Payment

| Feature | Priority | Notes |
|---------|----------|-------|
| Auth system (Better Auth / Clerk) | Critical | Email + Google OAuth, role-based (customer/admin) |
| Payment integration | Critical | SePay (VietQR) for VN + Stripe for international |
| Auto-delivery pipeline | High | Payment confirmed → assign credentials → push to portal |

### Customer Portal (Replace Google Sheet)

| Feature | Priority | Notes |
|---------|----------|-------|
| Order history dashboard | Critical | Replaces Table2 (Orders tab) |
| Credentials vault | Critical | Replaces Table1 — secure UID/pass/2FA/cookie display |
| BM management dashboard | Critical | Replaces BM tab — ID, business info, invitation links |
| Live status monitoring | High | Auto-check profile/BM live status |
| Warranty tracking | High | 7-day warranty countdown, 1-click claim |
| Restock/re-order | Medium | "Profile died" → 1-click replacement |

### Content & Support

| Feature | Priority | Notes |
|---------|----------|-------|
| CMS admin panel | High | Employees manage blog/docs content without code |
| Ticket system | High | Categories: warranty/technical/billing, SLA tracking |
| Community + auth | Medium | Login, create discussions, comment |
| Doc search | Medium | Algolia or Pagefind for content search |
| Email notifications | Medium | Order confirmed, delivered, warranty expiring |
| Tool tiers (free/basic/pro) | Medium | Gate advanced tools behind login |

---

## Phase 3 — Growth & Intelligence

Goal: Data-driven growth, AI features, automation.

| Feature | Priority | Notes |
|---------|----------|-------|
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
├── Products: manual         →  Product pages + order flow
├── Orders: Google Sheet     →  Customer portal (Phase 2)
├── Support: Telegram only   →  Ticket system + cal.com (Phase 1-2)
├── Content: none            →  Blog + Docs + Community
├── Tools: none              →  9+ free tools
└── Analytics: none          →  Full funnel tracking
```
