# GoAds × Foreplay — Route Mapping

## GoAds Marketing Routes (by priority)

### P0 — Done

| GoAds Route | Foreplay Match | Status | Note |
|-------------|---------------|--------|------|
| `/` | `/` | ✅ Cloned | Home + GoAds content |
| `/agency-ad-account`, `/google-agency`, `/tiktok-agency` | `/swipe-file` (Product template) | ✅ Template done | Platform products — 3 routes, 1 UI |
| `/pricing` | `/pricing` | ✅ Cloned | — |
| `/reviews` | `/reviews` | ✅ Cloned | Native review cards (Senja clone) + Load More |
| `/talk-to-sales` | `/book-demo` | ✅ Cloned | Cal.com embed + social proof + reviews |

### P1 — Next up (marketing core)

| GoAds Route | Foreplay Match | Status | Note |
|-------------|---------------|--------|------|
| `/blog`, `/blog/[slug]` | `/blog`, `/post/[slug]`, `/category/[slug]`, `/authors/[slug]` | 🔜 Clone next | Restyle to Foreplay layout |
| `/profiles` | Mix: `/swipe-file` hero + product catalog table (3-col) + feature grids + FAQ | ✅ Cloned | Template for asset products — reusable for /bm, /pages, /tiktok-accounts |
| `/bm`, `/pages`, `/tiktok-accounts` | Same layout as `/profiles` — swap data + `defaultExpanded` | TODO | 3 routes remaining — use `/profiles` template, swap content brief from Justin |
| `/unban`, `/blue-verification` | Product template | TODO | Service products — 2 routes, swap content |
| `/help` | TBD | Backlog | Dub.co style 2x2 grid or FAQ accordion — decide later |
| `/contact` | TBD | Backlog | Dub.co style 2x2 grid (Sales/Support/FAQ/Community) — decide later |
| `404` (not-found) | Custom 404 | TODO | Foreplay-style 404 page |

### P2 — Growth pages

| GoAds Route | Foreplay Match | Status | Note |
|-------------|---------------|--------|------|
| `/about` | Mix: `/experts` (hero + team grid) + `/industries/ecommerce` (testimonials, products, examples) | TODO | Needs 2 new clones: experts hero + team card grid. Rest reuse existing. |
| `/partners` | `/affiliates` layout (hero, benefits, commission table, FAQ) | TODO | 100% reuse existing components, 0 new clones needed |
| `/privacy-policy`, `/terms-of-service`, `/refund-policy` | Legal template | TODO | 3 routes, 1 UI |
| `/milestones` | ❌ No match | TODO | GoAds unique — restyle to Foreplay layout |
| `/payment` | `/affiliates` layout (hero, payment methods grid/table, steps, FAQ) | TODO | Reuse existing components, 0 new clones needed |
| `/community/*` (5 routes) | ❌ No match | TODO | GoAds forum — restyle to Foreplay layout |
| `/docs/*` | `help.foreplay.co/en/help` | TODO | Fumadocs — restyle to Foreplay layout |
| Auth (`/sign-in`, `/sign-up`, `/unauthorized`) | `app.foreplay.co/sign-up` | TODO | Clerk auth — restyle to Foreplay layout |

### Skip

| GoAds Route | Note |
|-------------|------|
| `/share/[token]` | Portal/dashboard feature, not marketing |


## Foreplay Routes — Chưa match GoAds

| Foreplay Route Group | Số routes | GoAds Idea | Priority |
|---------------------|-----------|-----------|----------|
| Solutions (`/industries/*`) — ecommerce, agencies, mobile-apps, b2b-saas, freelancers | 5+ | 💡 `/solutions/*` — vertical landing pages | P1 |
| Comparison (`/comparison/*`) — vs motion, atria, superads... | 9 | 💡 GoAds vs competitors (SEO) | P1 |
| Affiliates (`/affiliates`) | 1 | 💡 Affiliate program | P2 |
| University (`/university/[slug]`) | 1 | 💡 Knowledge base | P2 |
| Watch Demo (`/watch-demo`) | 1 | 💡 Product demo video | P2 |
| Changelog (`/ships`) | 1 | 💡 GoAds changelog | P3 |
| Careers (`/careers/*`) | 2 | 💡 Hiring page | P3 |
| Media Kit (`/media-kit`) | 1 | 💡 Press / brand assets | P3 |
| Experts (`/experts`, `/experts/[slug]`) | 2 | 💡 GoAds certified partners? | P3 |
| Events (`/fireside`, `/events/[slug]`) | 2 | 💡 Webinar / event landing | P3 |
| Agency Directory (`/agency-directory`, `/agencies/[slug]`) | 2 | 💡 Partner agency listing | P3 |
| Chrome Extension (`/chrome-extension`) | 1 | ❌ GoAds ko có extension | — |
| Mobile App (`/mobile-app`) | 1 | ❌ GoAds ko có app | — |
| API (`/api`) | 1 | ❌ Dùng `/docs` thay | — |
| Bounties (`/bounties`) | 1 | ❌ Community bounty program | — |
| Work With Brands (`/work-with-brands`) | 1 | ❌ Brand partnership apply | — |
| **EXTERNAL (subdomain / 3rd party)** |
| Feature Requests (`featurebase.app/en`) | 1 | 💡 GoAds feature voting board | P2 |
| Public Roadmap (`featurebase.app/en/roadmap`) | 1 | 💡 GoAds product roadmap | P2 |
| Changelog (`featurebase.app/en/changelog`) | 1 | 💡 GoAds changelog (= `/ships`) | P3 |
| Knowledge Base (`help.foreplay.co/en/help`) | 1 | ✅ Đã match → `/docs/*` | — |


## GoAds App Routes (không liên quan Foreplay)

| Route Group | Count |
|------------|-------|
| `/portal/*` | 15 routes |
| `/admin/*` | 10 routes |
| `/tools/*` | 15 routes |


## Clone Prerequisites

Before building more pages, clone these 2 Foreplay pages first (new reusable components):

| # | Clone Task | Foreplay URL | New Components | Used By |
|---|-----------|-------------|----------------|---------|
| 1 | `/experts` | `foreplay.co/experts` | Hero 2-col (text + image), Team card grid (3-col) | `/about` |
| 2 | `/industries/ecommerce` | `foreplay.co/industries/ecommerce` | ✅ Already cloned (`ForeplaySolutionTestimonialCard`, `ForeplaySolutionExamplesGrid`, `ForeplaySolutionLogoCarousel`) | `/about`, future `/solutions/*` |

## Clone Waves

**Wave 1 — Blog + remaining products + about** (🔜 current)
- Clone `/experts` hero + team grid → build `/about`
- `/blog`, `/blog/[slug]` — restyle to Foreplay layout
- `/bm`, `/pages`, `/tiktok-accounts` — swap content from `/profiles` template

**Wave 2 — Support pages**
- Legal (3 routes), `/partners`, `/payment`
- `/help`, `/contact` — backlog, decide later

**Wave 3 — Growth (new routes)**
- `solutions/*`, `comparison/*`

**Wave 4 — Nice to have**
- Affiliates, changelog, careers, media kit
