# GoAds × Foreplay — Route Mapping

## GoAds Marketing Routes

| GoAds Route | Foreplay Match | Status | Note |
|-------------|---------------|--------|------|
| `/` | `/` | ✅ Cloned | Home |
| `/agency-ad-account`, `/google-agency`, `/tiktok-agency` | `/swipe-file` (Product template) | ✅ Template done | Platform products — 3 routes, 1 UI |
| `/bm`, `/profiles`, `/pages`, `/tiktok-accounts` | Product template | TODO | Asset products — 4 routes, 1 UI |
| `/unban`, `/blue-verification` | Product template | TODO | Service products — 2 routes, 1 UI |
| `/pricing` | `/pricing` | ✅ Cloned | — |
| `/reviews` | `/reviews` | TODO | Wall of love |
| `/talk-to-sales` | `/book-demo` | TODO | Booking form |
| `/blog`, `/blog/[slug]` | `/blog`, `/post/[slug]` | ✅ GoAds design | Keep or restyle |
| `/help` | `/faq` | TODO | FAQ page |
| `/about` | ❌ No match | TODO | Custom design |
| `/partners` | ❌ No match | TODO | Custom design |
| `/milestones` | ❌ No match | ✅ Built | GoAds unique |
| `/privacy-policy`, `/terms-of-service`, `/refund-policy` | Legal template | TODO | 3 routes, 1 UI |
| `/payment` | ❌ No match | ✅ Built | GoAds unique |
| `/community/*` (5 routes) | ❌ No match | ✅ Built | GoAds unique forum |
| `/docs/*` | `help.foreplay.co/en/help` | ✅ Built | Fumadocs knowledge base |
| Auth (`/sign-in`, `/sign-up`, `/unauthorized`) | `app.foreplay.co/sign-up`, `/sign-in` | ✅ Built | Clerk auth |
| `/share/[token]` | ❌ No match | ✅ Built | Share links |

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
| Chrome Extension (`/chrome-extension`) | 1 | ❌ GoAds ko có extension | — |
| Mobile App (`/mobile-app`) | 1 | ❌ GoAds ko có app | — |
| API (`/api`) | 1 | ❌ Dùng `/docs` thay | — |
| Bounties (`/bounties`) | 1 | ❌ Community bounty program | — |
| Work With Brands (`/work-with-brands`) | 1 | ❌ Brand partnership apply | — |
| Experts (`/experts`, `/experts/[slug]`) | 2 | 💡 GoAds certified partners? | P3 |
| Events (`/fireside`, `/events/[slug]`) | 2 | 💡 Webinar / event landing | P3 |
| Agency Directory (`/agency-directory`, `/agencies/[slug]`) | 2 | 💡 Partner agency listing | P3 |
| Blog Categories (`/category/[slug]`, `/authors/[slug]`) | 2 | 💡 Blog taxonomy pages | P3 |
| **EXTERNAL (subdomain / 3rd party)** |
| Feature Requests (`featurebase.app/en`) | 1 | 💡 GoAds feature voting board | P2 |
| Public Roadmap (`featurebase.app/en/roadmap`) | 1 | 💡 GoAds product roadmap | P2 |
| Changelog (`featurebase.app/en/changelog`) | 1 | 💡 GoAds changelog (= `/ships`) | P3 |
| Knowledge Base (`help.foreplay.co/en/help`) | 1 | ✅ Đã match → bảng 1 `/docs/*` | — |

## GoAds App Routes (không liên quan Foreplay)

| Route Group | Count |
|------------|-------|
| `/portal/*` | 15 routes |
| `/admin/*` | 10 routes |
| `/tools/*` | 15 routes |

## Clone Waves

**Wave 1 — Product Pages (8 routes còn lại, 1 template)**
Reuse template từ `/agency-ad-account` → swap content

**Wave 2 — Core Marketing (3 routes)**
reviews, talk-to-sales, help

**Wave 3 — Growth (new routes)**
solutions/*, comparison/*

**Wave 4 — Support**
Legal (3), about, partners, affiliates
