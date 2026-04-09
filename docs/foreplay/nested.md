# Route Tracker — Marketing + Foreplay

> Track tất cả routes: marketing (GoAds hiện tại) + foreplay (clone từ foreplay.co)

---

## Marketing Routes (GoAds — Production)

> Sắp xếp theo thứ tự ưu tiên: 🚧 WIP → 🎯 Target (cần clone) → ✅ Done → — (chưa biết)

| Route | Purpose | Foreplay Clone |
|-------|---------|----------------|
| `/unban` + `/blue-verification` | Services (Unban Meta Assets, Blue Verification) | ✅ `/foreplay/blue-verification` (composed: university hero + feature rows + ecommerce examples + FAQ + CTA) |
| `/docs/[[...slug]]` | Documentation (Fumadocs) | 🎯 target: `help.foreplay.co/en/help` |
| `/community/*` | Community (listing, post, category, create, user profile) | 🎯 target: `featurebase.app/en` |
| `/milestones` | Milestones page | 🎯 target: `featurebase.app/en/roadmap` |
| `/privacy-policy` + `/terms-of-service` + `/refund-policy` | Legal pages | 🎯 target: `foreplay.co/page/privacy-policy` |
| `/` | Home | ✅ `/foreplay/home` |
| `/agency-ad-account` + `/google-agency` + `/tiktok-agency` | Agency Accounts (by platform: Facebook, Google, TikTok) | ✅ `/foreplay/swipe-file` |
| `/bm` + `/profiles` + `/pages` + `/tiktok-accounts` | Assets (Business Managers, FB Profiles, FB Pages, TikTok Assets) | ✅ `/foreplay/profiles` |
| `/blog` + `/blog/[slug]` | Blog (Keystatic CMS) | ✅ `/foreplay/blog` + `/foreplay/blog/[slug]` |
| `/pricing` | Pricing | ✅ `/foreplay/pricing` |
| `/reviews` | Customer reviews | ✅ `/foreplay/reviews` |
| `/talk-to-sales` | Contact sales | ✅ `/foreplay/book-demo` |
| `/about` | About page | — |
| `/tools` | Free tools hub | — |
| `/tools/[slug]` | Individual tool pages (19 tools: 2fa, check-uid, fake-id, notepad, etc.) | — |
| `/help` | Help center | — |
| `/partners` | Partners page | — |
| `/payment` | Payment page | — |
| `/sign-in` + `/sign-up` + `/unauthorized` | Auth (Clerk) | — |
| `/keystatic/[[...params]]` | Keystatic CMS admin | — |

---

## Foreplay Routes (`/foreplay/*`) — Done / WIP / Cần clone

| Route | Status | Phase / Source |
|-------|--------|----------------|
| `/foreplay/home` | ✅ Done | 1-2 |
| `/foreplay/swipe-file` | ✅ Done | 3 |
| `/foreplay/pricing` | ✅ Done | 3c |
| `/foreplay/reviews` | ✅ Done | 4a |
| `/foreplay/book-demo` | ✅ Done | 4b |
| `/foreplay/profiles` | ✅ Done | 4d |
| `/foreplay/industries/ecommerce` | ⚠️ 90% — cần thêm ảnh | 3b |
| `/foreplay/blog` | ⚠️ 90% — cần thêm ảnh | 5 |
| `/foreplay/blog/[slug]` | ⚠️ 90% — cần thêm ảnh | 5 |
| `/foreplay/university/classes` | ✅ Done (100% pixel-perfect) | 5 |
| `/foreplay/blue-verification` | ✅ Done (composed page) | 6 — reuses university hero/rows + ecommerce examples + reviews + FAQ + CTA |
| `/foreplay/page/privacy-policy` | 📝 Cần clone | source: `foreplay.co/page/privacy-policy` |
| `/foreplay/help` | 📝 Cần clone | source: `help.foreplay.co/en/help` |
| `/foreplay/roadmap` | 📝 Cần clone | source: `featurebase.app/en/roadmap` |

---

## Foreplay Routes — Chưa quyết (không biết có nên clone không)

| Foreplay Route Group | Số routes | GoAds Idea | Priority |
|---------------------|-----------|-----------|----------|
| Industries verticals (`/industries/agencies`, `/mobile-apps`, `/b2b-saas`, `/freelancers`) | 4 | 💡 `/solutions/*` — vertical landing pages | P1 |
| Comparison (`/comparison/*`) — vs motion, atria, superads... | 9 | 💡 GoAds vs competitors (SEO) | P1 |
| Affiliates (`/affiliates`) | 1 | 💡 Affiliate program | P2 |
| Watch Demo (`/watch-demo`) | 1 | 💡 Product demo video | P2 |
| Changelog (`/ships`) | 1 | 💡 GoAds changelog | P3 |
| Careers (`/careers/*`) | 2 | 💡 Hiring page | P3 |
| Media Kit (`/media-kit`) | 1 | 💡 Press / brand assets | P3 |
| Experts (`/experts`, `/experts/[slug]`) | 2 | 💡 GoAds certified partners? | P3 |
| University class detail (`/university/[slug]`) — e.g. `psychology-in-advertising` | N | 💡 Course detail pages | P3 |
| Events (`/fireside`, `/events/[slug]`) | 2 | 💡 Webinar / event landing | P3 |
| Agency Directory (`/agency-directory`, `/agencies/[slug]`) | 2 | 💡 Partner agency listing | P3 |
| Chrome Extension (`/chrome-extension`) | 1 | ❌ GoAds ko có extension | — |
| Mobile App (`/mobile-app`) | 1 | ❌ GoAds ko có app | — |
| API (`/api`) | 1 | ❌ Dùng `/docs` thay | — |
| Bounties (`/bounties`) | 1 | ❌ Community bounty program | — |
| Work With Brands (`/work-with-brands`) | 1 | ❌ Brand partnership apply | — |

### External (subdomain / 3rd party)

| Foreplay Link | GoAds Idea | Priority |
|--------------|-----------|----------|
| `featurebase.app/en` — Feature Requests | 💡 GoAds feature voting board | P2 |
| `featurebase.app/en/roadmap` — Public Roadmap | 💡 GoAds product roadmap | P2 |
| `featurebase.app/en/changelog` — Changelog | 💡 GoAds changelog (= `/ships`) | P3 |
| `help.foreplay.co/en/help` — Knowledge Base | ✅ Đã match → `/docs/*` | — |
