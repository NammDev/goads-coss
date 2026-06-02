# Project Changelog

> Record of significant changes, features, and fixes.

---

## [2026-06-01] — Responsive audit (Foreplay parity)

### Fixed
- **Navbar dead zone (P0)**: 768–1023px showed no navigation (hamburger `<768`, desktop nav `≥1024`). Unified switch at **992px** (`min-[992px]`), matching Foreplay's `@media (max-width:991px)`. — `header.tsx`, `header-mobile-menu.tsx`
- **Mobile drawer light-leak**: Radix Sheet portals outside `.site` dark scope → rendered white. Added `site` class to SheetContent so dark tokens resolve. — `header-mobile-menu.tsx`
- **Drawer parity**: added missing Tools accordion, z-[120] over sticky header, built-in X close, prominent Start-free-trial CTA, KPI trust strip. — `header-mobile-menu.tsx`
- **Section padding**: fixed `px-10` → responsive `px-6 md:px-8 min-[992px]:px-10` (24→32→40), matching Foreplay `.container` cascade. — `section-container.tsx`
- **Cart tab mobile**: hide closed pill `max-[991px]` when cart empty (no longer overlaps hero). — `cart-popover.tsx`
- **Support card overflow**: width `min(360px,100vw-2.5rem)` so it fits at 375px. — `action-plan-card.tsx`
- **Display headings not responsive (D6)**: h1/h2 were hardcoded desktop sizes (oversized on mobile — wrapped, so probes didn't flag). Added Foreplay's per-breakpoint cascade — H1: 38/52/60px (≤479/≤767/≥768), H2: 36/40/44px (≤479/≤991/≥992). Site-wide via `typography.ts` (used by all `SectionHeader`s + page heroes). — `typography.ts`, `home/hero-content.tsx`

### Verified
- 28 routes × {375,768} = 56 overflow probes → **0 horizontal overflow, all 200**.
- Home, 7 product, 9 conversion/info, blog (2), legal (3), tools (6) — responsive-clean, no code changes needed.

### Docs
- `design-guidelines.md` §12 Navigation → breakpoint corrected to 992 (was stale 1440).

### Deferred
- `/free-action-plan` — unfinished page (404/placeholder), build issue not responsive; owner: user.

---

## [2026-03-19] — Phase 6 Community Foundation (DB + API)

### Added
- **Community DB schema** — 7 new tables: `community_category`, `community_post`, `community_reply`, `community_upvote`, `community_report`, `community_view`, `community_subscription`
- **2 new enums**: `community_post_status` (8 values: open/solved/closed/in_review/planned/in_progress/completed/rejected), `community_report_reason` (spam/inappropriate/offtopic/other)
- **Extended `notification_type`** with `community_reply` + `community_solution`
- **9 query functions** (`community-queries.ts`): getCategories, getPosts (paginated), getPostBySlug, getPostsByAuthor, getMostHelpful (leaderboard), getPostStats, getReports, searchPosts
- **12 server actions** (`community-actions.ts` + `community-admin-actions.ts`): createPost, updatePost, deletePost, createReply, markSolution, toggleUpvote, toggleSubscription, recordView, reportContent, reviewReport, togglePin, updatePostStatus
- **8 default categories seeded**: Announcements, Q&A, Tips & Strategies, Showcase, Feedback, Troubleshooting, General, Introductions
- **Auto-subscribe**: post authors + repliers auto-subscribed for notifications
- **Notification integration**: subscribers notified on new replies, reply authors notified on solution mark

### Design Decisions
- Foreplay FeatureBase style: upvote-only (no downvotes), status badges, post card with vote count
- Vercel Community style: flat replies (no nesting), open/solved/closed lifecycle, minimal layout
- Denormalized counts (upvotesCount, repliesCount, viewsCount) for performance
- Separate admin actions file to keep files under 200 LOC

---

## [2026-03-11] — WT2 Dark Mode + Lighthouse Audit Complete

### Completed
- **WT2 Dark Mode Audit** (`phase-1a/dark` branch)
  - All hardcoded colors replaced with CSS variable tokens
  - Canvas components (particles, ripple) made theme-aware
  - External SVG images fixed with `unoptimized` prop in Next.js Image
  - CTA section dark mode text visibility corrected
  - 18 files modified across 5 implementation phases

- **Lighthouse Audit**
  - Accessibility: 100
  - Best Practices: 96-100
  - SEO: 100

- **ARIA Accessibility Fixes**
  - Rating component accessibility improved
  - Skip-to-content navigation added
  - Logo aria-label added
  - `prefers-reduced-motion` media query support added

---

## [Unreleased] — Phase 1 MVP Complete

### Added
- Landing page with hero, bento grids, stats, pricing, testimonials, FAQ, CTA
- 9 product pages (BM, profiles, pages, TikTok, Google, blue verification, unban, agency accounts)
- Pricing page with catalog grid + FAQ
- Blog system with 5 posts, category sidebar, TOC
- 20+ utility tools (2FA, cookie parser, IP checker, data filter, watermark, etc.)
- Docs section with Fumadocs-style shell (UI only)
- About page with team section
- Resources pages: reviews, partners, milestones, help, payment, talk-to-sales
- Legal pages: Terms of Service, Privacy Policy, Refund Policy
- Dark mode with neutral grayscale palette (oklch, 0 chroma)
- 4-tier button hierarchy (CraftButton CTA, secondary, tertiary, tertiary-sweep)
- Grid frame layout system (vertical borders + corner dots)
- SectionHeader + SectionDivider + PageHero shared components
- MotionPreset animation system (Framer Motion v12 wrapper)
- Global search modal (cmd+K) with cmdk
- Cart system (React Context, UI only — no payment integration)
- Floating contact button (Telegram)
- ScrollToTop component
- SEO: robots.ts, sitemap.ts, OG metadata
- Vercel Analytics + Speed Insights integration
- React Compiler enabled for auto-memoization

### Refactored
- Split 3 large components into sub-modules (Plan 10)
- Added accessibility aria-labels and prefers-reduced-motion support (Plan 9)
- Replaced hardcoded colors with semantic CSS tokens (Plan 8)
- DRY marketing pages — CTA to layout + product page template (Plan 7)
- Removed unnecessary `use client` directives + fixed simpleicons remotePattern (Plan 6)

### Architecture Decisions
- Tailwind CSS v4 with oklch color tokens (over v3 hex)
- shadcn/ui + shadcn-studio blocks (over custom components)
- Static generation (over SSR) — no runtime server needed
- Single `globals.css` for all tokens (over component-scoped CSS)
- Data layer in `src/data/*.ts` (over CMS or API) for Phase 1

---

## Versioning

This project does not use semantic versioning yet. Changes tracked by development phase and plan number. Will adopt semver when Phase 2 (customer portal) begins.
