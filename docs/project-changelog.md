# Project Changelog

> Record of significant changes, features, and fixes.

---

## [2026-07-31] — Fix: bookmarklet header title rendered near-black on Facebook

### Symptom
On every tool except BM Invite, the modal's header title ("GOADS Remove BM Admins", …) came out
dark grey on the dark chrome — effectively invisible. The subtitle underneath was fine.

### Root cause
The title is an `<h2>`, and its rule only set typography — the colour came from inheriting
`color:var(--fg)` off the root. Facebook's own stylesheet has a rule for bare `h2`, and **a direct
rule always beats an inherited value**, so FB's near-black won on every one of our headings. BM Invite
escaped it purely because its `.gbmi-title` happened to carry an explicit `color:var(--fg)`.

### Fix
- Explicit `color:var(--fg)` on the title in the shared stylesheet and in Remove BM Admins.
- Plus a defensive `color:inherit` reset for `h1 h2 h3 p span div label li a` scoped under each tool's
  root, so nothing else of ours can be repainted by a bare-tag rule on the host page. Our class rules
  are more specific and still win where they apply.
- Applied to all five tools, including BM Invite, so the whole library is protected by the same rule.

### Also fixed while in here
- **Two GOADS modals could stack.** The older tools use their own root ids, so opening a new tool over
  one of them left both on screen. Every tool now sweeps all known GOADS roots on launch.
- **The Escape-handler retirement didn't work across tools.** The previous fix tracked the live handler
  in a module variable — but each payload bundles its own copy of the shared module, so Check Live's
  variable and Approve's were different variables and the stale handler survived a tool switch anyway.
  The handle now lives on `window`, which is the only thing two separately-bundled payloads share.
  (The regression test for this was timing-dependent and had been passing by luck; its stub delay was
  raised so the switch always happens mid-run.)

### Verified
- New check: each tool mounted on a page carrying Facebook-style bare-tag CSS, then the header title's
  **computed** colour read back — all 5 now resolve to our own declaration instead of FB's `#1c1e21`.
- Behaviour harness 52/52, fix regressions 5/5, old-tool regression, `tsc` clean, `next build` OK.

---

## [2026-07-31] — Three new GOADS bookmarklets + a shared shell for the library

Adds **Approve BM Requests**, **Check Live BM** and **Enable 2FA** to `/tools/bookmark`,
taking the library from 2 tools to 5. Sources supplied as partner-built obfuscated payloads
(`docs/bookmark/BM-approve.md`, `BM-checklive.md`, `BM-2fa.md`); all three were reverse-engineered
to a spec (`plans/reports/analysis-260731-1823-*.md`) and **rewritten as first-party readable code**
on a shared GOADS shell. No obfuscated third-party payload ships.

### Why a rewrite rather than a re-brand
Two of the three payloads carry a tamper kill-switch — `if (BRAND !== atob('ZWFzeW1lLnBybw==')) return`
— so patching the brand string would have made the tool **silently do nothing**. Rewriting was the
only way to get GOADS UI at all.

### Added — shared library (`bookmarklets/shared/`)
- `goads-shell.js` — the dark modal + white card stage, header/logo/close/brand strip, plus
  `esc` / `$` / `toast` / `copyText` / `downloadText` / `timeoutSignal` / `relTime` and the
  loading / error / empty screens. One shared root id, so launching a second tool replaces the first.
- `goads-shell-css.js` — the whole stylesheet, scoped under the root id, class prefix `gbk-`.
  Lifted from the design language of the first two tools and extended (tiles, progress bar,
  info/mute badges, small buttons).
- `goads-icons.js` — GOADS mark + line icons, exported one const each so a tool only carries what it imports.
- `goads-fb-session.js` — token / uid / businessId / fb_dtsg / lsd readers, `window.require` first with
  DOM + cookie fallbacks.
- `goads-totp.js` — RFC 4226/6238 TOTP (base32 → WebCrypto HMAC-SHA1 → dynamic truncation).
- `build-bookmarklets.mjs` now runs esbuild with `--bundle` so tools can import the shared modules
  while each payload stays standalone.

### Added — tools
- **Approve BM Requests** (`bm-approve`, v1.0, Business Manager) — lists PENDING requests the BM has
  RECEIVED, search + select-all, sequential bulk approve with a 500 ms gap, per-row Pending/Approving/
  Approved/Failed state. Queries: `BusinessCometBizSuiteSettingsBusinessRequestsViewContainerQuery`
  (doc_id 24355280274092427) first page, `BizKitSettingsBusinessUnifiedRequestListPaginationQuery`
  (24388768410825768) for paging, `BizKitSettingsSensitiveActionReviewDetailPanelApproveModalMutation`
  (30932400626405115) to approve.
- **Check Live BM** (`bm-checklive`, v1.0, Business Manager) — paste BM IDs (optional `|note`), chunked
  concurrent Graph checks, Live/Disabled/Error tiles, result table, copy-per-bucket in the original
  line formats, CSV export, Stop button.
- **Enable 2FA** (`bm-2fa`, v1.0, Utility) — authenticator 2FA for the signed-in account via Account
  Center. `useFXSettingsTwoFactorGenerateTOTPKeyMutation` (9837172312995248) then
  `useFXSettingsTwoFactorEnableTOTPMutation` (29164158613231327); code computed locally, one clock-resync
  retry off the `Date` header. Shows the secret with copy / save-to-file and a live code preview.

### Fixed while porting (bugs in the source payloads, not reproduced)
- Approve shipped a **hardcoded `cursor:"19"`**, so its list was an arbitrary slice, not the first page;
  `has_next_page` was computed then ignored. Now: no cursor on page 1, real `end_cursor` paging (10 pages max).
- Approve had a second, cleaner list query that was dead code (duplicate function name shadowing).
- Check Live sent `fields=%5B%22allow_page_management_in_www,name%22%5D` — a double-encoded array wrapping
  one bogus field name — and pinned the long-deprecated `v11.0`. Now a clean `fields=` list, unversioned endpoint.
- Both list/approve paths now check HTTP status and surface Facebook's real error text instead of a generic string.

### Changed deliberately
- Bulk approve and 2FA-enable now **ask for confirmation first** — both grant real, irreversible access.
  The originals fired on the first click.
- 2FA warns that the secret key is the only copy before it is generated.
- All UI in English, GOADS branding only (Telegram + goadsagency.com), matching the existing two tools.
- `require(...)` → `window.require(...)` in the two existing tools, so `--bundle` doesn't try to resolve
  Facebook's internal module names. No behaviour change.

### Verified
- `tsc --noEmit` clean · `next build` OK, `/tools/bookmark` prerendered static.
- All 5 payloads survive URL decoding and parse as JS; zero `easyme` references.
- TOTP matches all 6 RFC 6238 test vectors, including the >32-bit counter case.
- jsdom behaviour harness, 52 assertions, stubbed `fetch`/`require`, no real Facebook call:
  request de-duplication, correct `fields` param, tile counts, table rows, exact copy line formats;
  approve pagination with the real cursor, mutation payloads, approved rows dropping out and a
  rejected one staying Failed; 2FA doc_ids/variables/6-digit code/secret display; and guard rails —
  no request before the user clicks, declining the confirm fires nothing, wrong host and missing
  session produce the right screens.
- Regression: both pre-existing tools still mount cleanly after the `--bundle` switch.

### Found in code review, fixed before shipping
- **Cross-tool DOM bleed (the serious one).** All five tools share element ids by design — only one
  modal is ever mounted. But an *async continuation* from tool A could still land after the user
  launched tool B: `$("gbk-tablewrap")` then happily resolved to **tool B's** node, so an in-flight
  Check Live run would scribble its rows into the Approve tool's UI (or crash on an id tool B lacks).
  `openShell()` now returns an `alive()` based on `root.isConnected`, and every tool guards its
  renders with it — checking our own root, not an id, is what makes it correct. The same guard covers
  the user force-closing mid-run.
- **Stale Escape handler.** `openShell()` removed the previous modal's DOM but never its `keydown`
  listener, so handlers accumulated across tool switches and a later Escape could pop an orphaned
  "still running, close anyway?" confirm from a tool that was no longer on screen. The live handler is
  now tracked and retired on both mount and close.
- **CSV formula injection.** Check Live's export wrote FB-controlled BM names straight into cells, so a
  BM named `=HYPERLINK(...)` would execute on open in Excel/Sheets. Cells starting with `= + - @` are
  now prefixed with `'`.
- Reviewed clean: no XSS (every FB-derived value reaches `innerHTML` through `esc()`), no stale-closure
  or index-capture races in the chunked/sequential loops, no double-click re-entrancy, both destructive
  actions properly confirm-gated.

Each fix has its own regression test (orphaned-confirm count after a tool switch, CSV cell contents
captured via a Blob stub, force-close mid-run with no write into a dead DOM).

### Known risks
- The five `doc_id`s are Facebook persisted-query ids and will rot when FB rotates them; the failure
  shows up as "couldn't load" / "wouldn't turn 2FA on". Re-capture from a live session when that happens.
- Check Live at high concurrency can trip Facebook rate limits; throttled responses land in the Error bucket.
- None of the three has been run against a live Facebook session yet — only the stubbed harness.

---

## [2026-07-31] — Fix: Remove BM Admins bookmarklet did nothing when clicked

### Symptom
Dragging `Remove BM Admins` to the bookmarks bar and clicking it on a Business
Manager page opened no UI at all — no modal, no error. BM Invite worked fine.

### Root cause
The browser percent-**decodes** a `javascript:` URL before executing it. The
remove-admins source embeds Facebook's GraphQL variables pre-encoded
(`variables=%7B%22asset_types%22%3Anull…`, 68 valid `%XX` sequences). On click
those decoded back into raw `{`, `"`, `:`, `,` **inside the string literals**,
producing `SyntaxError: Unexpected identifier 'cursor'` — the script died before
its first statement, so nothing rendered. BM Invite escaped this only by luck:
its 9 `%` chars (CSS `100%`) are never followed by two hex digits.

### Fix
- `build-bookmarklets.mjs` now escapes `%` → `%25` in the payload, so decoding
  returns the script byte-for-byte, plus a build-time assertion
  (`decodeURIComponent(payload) === minified`) that fails the build for any
  future tool with the same hazard. Other URL-sensitive chars (`#`, `&`, `?`,
  spaces, quotes) survive decoding untouched and are left alone.
- Both payloads regenerated: invite 19.0 KB, remove-admins 22.4 KB.

### Verified
- Emulated the browser's lenient decode on the pre-fix payload → reproduced
  `SyntaxError: Unexpected identifier 'cursor'`; same emulation on the new
  payload parses clean. Both payloads: decode → `new Function(src)` OK.
- `tsc --noEmit` clean.

---

## [2026-07-30] — Remove BM Admins rebuilt as GOADS-owned code

### Why
Same as the BM Invite rebuild: the shipped `bm-remove-admins` payload was the
third-party obfuscated `easyme.pro` tool. Replaced with a first-party build so
the whole GOADS Bookmark library is GOADS-owned.

### Added
- **`bookmarklets/goads-bm-remove-admins.js`** — readable, first-party tool matching the invite tool's design language (dark shell + white B/W card, inline GOADS logo, green/amber status badges, red destructive action). Lists BM admins in a searchable/filterable table with per-row checkboxes and bulk removal.
- Registered a second build job in `build-bookmarklets.mjs`; `bm-remove-admins-payload.ts` regenerated from the GOADS source. Registry entry → **v1.0**, GOADS description.

### Network layer (faithfully reproduced from Facebook's own internal GraphQL)
Persisted-query `doc_id`s + variable blobs are facts of FB's Business-settings API, not third-party IP. All GET with `credentials:"include"` (runs on the user's own session); session read via `require("BusinessUnifiedNavigationContext").businessID` + `require("WebApiApplication").getAccessToken()`, DOM/cookie fallback.
- list: `BizKitSettingsPeopleTableListPaginationQuery` doc_id 9371006629693295 (paginated, 25/page ×4)
- remove confirmed user: `BizKitSettingsRemoveBusinessUserMutation` doc_id 24401670346098526
- remove pending invite: `BizKitSettingsRemovePendingUserMutation` doc_id 6587364614658388
- Dispatch by status: PENDING → pending mutation (businessRoleRequestID); CONFIRMED → user mutation (businessID + businessUserID). The current viewer's row is detected and its checkbox disabled (can't accidentally remove yourself).

### Verified
- `tsc` clean · `next build` OK, `/tools/bookmark` prerendered static · payload has zero `easyme` references.
- Behaviour harness (stubbed `fetch`/`require`, faked FB page — no real Facebook call): session detect, table renders 3 seeded admins (you + confirmed + pending) with correct green/amber badges, viewer row checkbox disabled, Select-all skips the disabled row (picks 2), bulk Remove dispatches user-222 via RemoveBusinessUser and req-333 via RemovePendingUser, count updates 3 → 1, 0 console errors.
- Live `/tools/bookmark`: both drag anchors now carry GOADS payloads (goadsagency.com + t.me/goadsagency, no easyme).

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
