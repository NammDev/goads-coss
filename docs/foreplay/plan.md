# GoAds Website Redesign — Master Plan

> Clone Foreplay.co design system → Build GoAds landing pages → Replace content → Go live.

## Phase 1: Design System Clone (DONE ✅)

### Foundation
- [x] Inter + Inter Display fonts (opsz axis)
- [x] `.foreplay` CSS scope: full neutral + solid palettes
- [x] `fpText` typography constants (13 text styles)
- [x] `--fp-alpha-*` + `--fp-solid-*` CSS variables
- [x] `font-optical-sizing: none` global, `auto` on display headings

### Reusable Atoms (9 components)
- [x] `ForeplayCtaButton` — 5 variants (nav, hero, secondary, ghost, light-primary)
- [x] `ForeplaySectionHead` — subtitle, title (h2/h3 size decoupled from tag), description
- [x] `ForeplaySectionContainer` — section/footer/navbar container variants
- [x] `ForeplaySectionWhiteBlock` — white rounded block wrapper
- [x] `ForeplayNavLink` — header nav links
- [x] `ForeplayDotBg` — dot grid background overlay
- [x] `ForeplayWinningCard` — light/dark card with children slot
- [x] `ForeplayHeroContent` — hero title + subtitle with gradient text
- [x] Barrel file `index.ts` — clean grouped exports

### Layout Components
- [x] `ForeplayHeader` — sticky, z-100, blur(24px), bg #020308eb
- [x] `ForeplayFooter` — 5-col link grid

## Phase 2: Home Page Clone (DONE ✅)

### Sections Built
- [x] Hero — scroll animation + video + logo bar (14 SVGs)
- [x] Before/After — winning cards + loader video
- [x] Product Showcase x5 — Swipe File, Spyder, Discovery, Lens, Briefs
- [x] Chrome Extension banner
- [x] Collaboration — section head + enrichment placeholder + sharing tabs
- [x] Features grid — 3-col cards
- [x] Final CTA — banner image
- [x] Dot grid background

### Assets Integrated
- [x] Hero video, After card video
- [x] Swipe File: sidebar video + 3 tab images
- [x] Spyder: sidebar video + tab image
- [x] Discovery: sidebar video + tab image
- [x] Features: 3 card images
- [x] CTA banner image
- [x] Sharing: tablet mockup image

## Phase 3: Product Routes (NEXT 🔜)

Clone 4 product pages from Foreplay. Each reuses existing atoms + adds ~3-4 new sections.

| Route | Foreplay URL | Est. New Sections |
|-------|-------------|-------------------|
| `/swipe-file` | foreplay.co/swipe-file | 3-4 |
| `/discovery` | foreplay.co/discovery | 3-4 |
| `/spyder` | foreplay.co/spyder-ad-spy | 3-4 |
| `/lens` | foreplay.co/lens-creative-analytics | 3-4 |

**Approach:**
1. Download each product page HTML: `curl -sL foreplay.co/swipe-file > docs/foreplay/html/swipe-file.html`
2. Identify reusable sections vs new sections
3. Build new atoms/organisms as needed
4. Compose page.tsx for each route

**Expected reuse:** ForeplaySectionHead, ForeplayCtaButton, ForeplaySectionContainer, ForeplaySectionWhiteBlock, ForeplayProductShowcase, fpText, all color tokens.

## Phase 4: Section Mixing & Content Swap

Once all unique sections are built:

1. **Map GoAds pages** — which Foreplay sections map to which GoAds pages
2. **Mix & match sections** — compose GoAds pages from the section library
3. **Trang designs** — designer creates illustrations, screenshots, icons for GoAds
4. **Content swap** — replace all Foreplay text with GoAds copy
5. **Replace assets** — swap placeholder images/videos with GoAds assets

### GoAds Pages to Build
- [ ] Home (goads.vn)
- [ ] Products/Services
- [ ] Pricing
- [ ] About
- [ ] Blog (already exists)
- [ ] Contact/Book Demo

## Phase 5: Migration & Cleanup

1. **Remove `foreplay` prefix** — rename folder, components, CSS scope
   - Folder: `components/foreplay/` → `components/landing/`
   - Components: `Foreplay*` → remove prefix or use `Landing*`
   - CSS: `.foreplay` → `.landing` or remove scope
   - Tokens: `--fp-*` → `--ga-*` or keep
2. **Move routes** — `(foreplay)/home` → main `/(marketing)/` routes
3. **Delete source files** — `docs/foreplay/html/`, `foreplay-source.css`
4. **Update layout** — merge foreplay layout into main layout or keep separate
5. **Responsive** — add mobile breakpoints (all current code is desktop-only)
6. **Convert tokens** — hex → oklch for consistency with existing GoAds theme
7. **SEO** — meta tags, OpenGraph, structured data
8. **Performance** — lazy loading, image optimization, Core Web Vitals

## Key Principles (from session learnings)

1. **Foreplay CSS class = component name** — 1:1 mapping
2. **Never interpret CSS** — copy exact values, trust source
3. **Inter Display ≠ Inter** — opsz axis, font-optical-sizing:auto
4. **titleTag ≠ titleSize** — visual size decoupled from HTML semantics
5. **grid-row-gap on flex WORKS** — browser aliases to row-gap
6. **`.container` (1440px) vs `.section-container` (1216px)** — check parent
7. **text-white-68 = --fp-alpha-300 (#ffffff5c)** — not fp-alpha-100
8. **Assets = placeholder** — respect container structure, user replaces later
9. **fpText constants** — centralized typography, zero inline duplication
10. **Barrel imports** — `@/components/foreplay` for clean page composition
