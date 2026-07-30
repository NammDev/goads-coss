# Project Changelog

> Record of significant changes, features, and fixes.

---

## [2026-07-30] — BM Invite bookmarklet rebuilt as GOADS-owned code

### Why
The shipped `bm-invite` payload was a third-party obfuscated tool (`easyme.pro`)
with a hard brand-lock (`if (CONFIG.BRAND !== atob("ZWFzeW1lLnBybw==")) return`)
where `CONFIG.BRAND` doubled as the temp-mail domain — so rebranding it to GOADS
meant defeating the author's tamper check. Replaced it wholesale with a
first-party build instead.

### Added
- **`bookmarklets/goads-bm-invite.js`** — readable, first-party BM Invite tool. Logic ported verbatim from **this repo's own extension**: session/token/bmId extraction from `extension/background.js` `initFromBMTab` (its `world:"MAIN"` injected fn — a bookmarklet already runs in that world), invite request + Facebook response handling (reauth / checkpoint / batch-error) from `inviteBM`, role sets + mail domain + tempmail deep-link from `content.js`. UI reuses the extension's design language (dark shell `#020308` + white B/W cards) from `content.css`.
- **`bookmarklets/build-bookmarklets.mjs`** — minifies the readable source into the one-line `javascript:` payload via the app's existing esbuild (invoked as `node esbuild/bin/esbuild`, not the `.cmd` shim which can't spawn without a shell on Windows). Source 27.4 KB → payload 18.8 KB.
- **GOADS logo as inline SVG** inside the tool — cropped G+panda mark from `footer/logo-svg.tsx`. Inline (not `<img>`) so facebook.com's CSP `img-src` can't block it.

### Changed
- `bm-invite-payload.ts` regenerated from the GOADS source (was the easyme payload). `bm-invite` registry entry → **v1.0**, GOADS-owned description.
- Brand throughout the tool: email `@goadsagency.com`, inbox button → `https://goadsagency.com/tempmail` (deep-links `#mailbox=<localpart>` for GOADS addresses), Telegram → `https://t.me/goadsagency`, website `goadsagency.com`. Confirmed live: the tempmail worker returns `"domains":["goadsagency.com"]`, so generated addresses actually receive mail.

### Verified
- `tsc` clean · `next build` OK, `/tools/bookmark` prerendered static · payload contains zero `easyme` references.
- Behaviour harness (stubbed `fetch`, faked FB page — no real Facebook call): session detection (token Valid, bmId shown), Generate email → `<10 rand>@goadsagency.com`, role default Admin, Send → single POST to `graph.facebook.com/v24.0` with `access_token`, bmId in body, `credentials:"include"`; success banner renders; 0 console errors.
- Live `/tools/bookmark`: BM Invite drag anchor carries the 19 KB GOADS `javascript:` payload (goadsagency.com + t.me/goadsagency, no easyme); Remove BM Admins left untouched per scope.

### Not done (out of scope, by request)
- **Remove BM Admins** still runs the original easyme payload — user asked to do BM Invite first.

---

## [2026-07-30] — GOADS Bookmark (bookmarklet library) at /tools/bookmark

### Added
- **New tool page `/tools/bookmark`** — bookmarklet script library. Sections: "How to Use" (3 steps + Bookmark-Bar shortcut tip) → category chips → card grid. Reuses `ToolShell`/`ToolHeader`/`ToolBody`, `siteText.*`, `--solid-*` tokens. Statically prerendered. — `app/(marketing)/tools/(panel)/bookmark/page.tsx`, `components/tools/bookmark.tsx`, `components/tools/bookmark-card.tsx`
- **Card accent treatment** — the flat `--solid-25` well with a muted `--solid-400` icon read as washed out, so focal points use the brand accent `--accent` (#1c9cf0) / `--accent-soft` (12%) that `globals.css` reserves for this purpose: accent-wash preview well + radial glow, white icon tile (lifts + scales on hover), accent category and version pills, accent hover border with a soft blue shadow. Body copy, borders and the primary button stay monochrome.
- **Category chips auto-hide** while only one category is in use — with a single category every chip returns the same grid, so the row is skipped and reappears on its own once a second category exists.
- **Bookmarklet registry** (`data/bookmarklets/index.ts`) — metadata (slug, title, version, description, icon, category) + payload wiring. Adding a script = 1 payload module + 1 array entry; search, chips and share links derive from it. Ships with **BM Invite TOOL v2.7** and **Remove BM Admins v1.1**.
- **Payload modules** — `bm-invite-payload.ts` (32,663 chars) / `bm-remove-admins-payload.ts` (37,753 chars), generated verbatim from `docs/BM-invite.md` / `docs/BM-remove.md`. One module per script so payloads stay independent of the registry metadata; the combined 92 KB chunk is loaded **only** by `/tools/bookmark`.
- **`BookmarkletDragAnchor` atom** — drag-to-Bookmark-Bar anchor. React 19 **blocks `javascript:` URLs in `href`**, so the attribute is set imperatively in an effect; clicks are swallowed (a `javascript:` href fired on our own origin would run the payload against goads.* instead of Facebook) and replaced with an inline "drag me instead" hint. Paint reuses `CTA_VARIANT_STYLES["light-primary"]`. — `components/atoms/bookmarklet-drag-anchor.tsx`
- **Per-card actions** — drag anchor + Copy share link (`?script={slug}`), both sitting above the card's overlay link.
- **Card → detail view** — the whole card is clickable (`cursor-pointer`) and opens `?script={slug}`. Implemented as an **overlay `<a>`** covering the card at `z-10`, a *sibling* of the drag anchor (nested `<a>` is invalid HTML), with the actions row raised to `z-20` so the drag anchor and share button stay usable. Plain left-click is intercepted for a client-side open; Cmd/Ctrl/Shift/middle-click fall through to native new-tab behaviour, and the overlay is Tab-focusable with an accent focus ring.
- **Deep links** — `?script={slug}` renders a "Viewing {title}" banner with a single card and an "All scripts" back action. The URL is the **single source of truth** (no mirrored local state): read via `useSyncExternalStore` (not `useSearchParams`, which would force the whole tool behind a Suspense boundary and lose static prerendering), with the `null` server snapshot keeping first client render identical to server HTML. Because `pushState` fires no native event, `navigate()` dispatches a `goads:bookmark-nav` event that the store also subscribes to alongside `popstate`. The card already on its own detail view gets no link.
- **Registered in the tools sidebar** under **Utilities** (last item, after GOADS Extension). Also added to the `/tools` landing grid, header Tools mega-menu ("More" row) and footer Tools column.

### Changed
- `CtaButton` — `variantStyles` exported as `CTA_VARIANT_STYLES` so non-`<Link>` anchors can reuse variant paint instead of duplicating it. No behaviour change.
- `LightGhostAction` — additive `hideLabel` prop for icon-only square buttons (label kept as `aria-label` + `sr-only`). Used by the card's Copy/Share actions.

### Verified
- `tsc --noEmit` clean · eslint clean on all new/changed files · `next build` OK, `/tools/bookmark` prerendered static.
- Browser: both anchors carry full `javascript:` hrefs (32,663 / 37,753 chars, `draggable=true`); search filter, no-match empty state, clear button, category chips, copy-code (payload verified), copy-share-link, and "View all scripts" (param stripped from URL) all exercised end-to-end.
- Zero console errors and **no hydration warnings** on `/tools/bookmark` and `?script=bm-invite`.
- Viewports 390/768/1024/1440 — no horizontal body overflow; cards 1-up at 390, 2-up ≥768, 3-up at `xl`.

### Known (pre-existing, out of scope)
- Site **footer product strip** (`footer-product-nav.tsx`) overflows its container at 768–1024px (last 2 items extend past the viewport edge). Present on every page, unrelated to this change; body itself does not scroll sideways.

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
