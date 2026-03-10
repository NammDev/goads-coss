# Project Overview — Product Development Requirements

> GoAds marketing website replacing goads.shop. Static Next.js site with product pages, tools, blog, and future customer portal.

---

## Product Identity

| Field | Value |
|-------|-------|
| Name | GoAds |
| Domain | goads.shop |
| Tagline | "Stop Losing Accounts. Start Scaling." |
| Type | B2B SaaS marketing site (Meta/Facebook ad infrastructure) |
| Target | Media buyers, affiliate marketers, e-commerce advertisers |

## Core Products

| Product | Route | Description |
|---------|-------|-------------|
| Meta Agency Accounts | `/agency-ad-account` | Whitelisted ad accounts with spending limits |
| Facebook Profiles | `/profiles` | Verified profiles for ad management |
| Business Managers | `/bm` | Pre-configured BM setups |
| Google Whitelisted | `/google-agency` | Google Ads agency accounts |
| TikTok Verified | `/tiktok-accounts` | Verified TikTok ad accounts |
| TikTok Agency | `/tiktok-agency` | TikTok agency accounts |
| Blue Verification | `/blue-verification` | Meta verified badge service |
| Facebook Pages | `/pages` | Pre-built pages for ad campaigns |
| Unban Service | `/unban` | Account recovery service |

## Key Differentiators

- 7-day warranty on all products
- <2h support response time
- 5+ years in business
- 500+ active clients
- Telegram-first support + cal.com booking

## Business Model

- Direct sales via Telegram redirect (Phase 1)
- Self-serve portal with payment integration (Phase 2 — planned)
- SePay (VietQR) for Vietnam + Stripe for international (planned)

## User Personas

| Persona | Description | Needs |
|---------|-------------|-------|
| Solo media buyer | Individual running Facebook ads | Quick account purchase, reliability |
| Agency owner | Managing multiple client accounts | Bulk orders, BM management, warranty |
| E-commerce seller | Running product ads at scale | Verified accounts, spending limits |
| Affiliate marketer | Performance marketing campaigns | Multiple profiles, quick replacement |

## Success Metrics (Phase 1 MVP)

- Lighthouse score > 90 (performance, accessibility, SEO)
- All product pages with working order flow
- Search modal functional (cmd+K)
- SEO: sitemap.xml, robots.txt, OG meta tags
- Legal pages: ToS, Privacy, Refund
- Mobile responsive: 375px, 768px, 1024px, 1440px

## Phase Summary

| Phase | Goal | Status |
|-------|------|--------|
| Phase 1 — MVP | Replace goads.shop with feature-complete marketing site | In Progress |
| Phase 2 — Portal | Self-serve customer portal replacing Google Sheets | Planned |
| Phase 3 — Growth | AI features, analytics dashboard, referral system | Planned |

See `development-roadmap.md` for detailed feature breakdown per phase.

## Constraints

- No backend/database in Phase 1 — fully static
- Orders redirect to Telegram (no in-app checkout yet)
- Content managed in code (no CMS yet)
- Single-language: English
- Hosting: Vercel (free tier compatible)
