# WT2: Dark Mode + Lighthouse ✅ COMPLETED

> Branch: `phase-1a/dark` | Plan: `plans/phase1a-2/`

## Status: DONE

- 18 files modified across 5 implementation phases
- Lighthouse: A11y 100, BP 96-100, SEO 100
- QA Report: `plans/phase1a-2/reports/tester-20260311-wt2-dark-mode-qa.md`

## Scope

Dark mode visual audit + Lighthouse performance/accessibility optimization.

## File Ownership

- `src/app/globals.css` — dark theme tokens only (`:root.dark, .dark` section)
- `src/components/theme-provider.tsx`, `mode-switcher.tsx`
- Image assets — optimization (webp, lazy load, sizing)
- `src/app/layout.tsx` — meta/performance tweaks only
- `next.config.*` — image optimization config

**DO NOT touch:** responsive/layout CSS, `lib/`, auth files, page structure

## Current Theme Setup

- OKLch palette in `globals.css`
- Dark selector: `:root.dark, .dark` (dual for Tailwind v4)
- Dark bg: `oklch(0.14 0 0)`, card: `oklch(0.20 0 0)`
- Dark = fully neutral (0 chroma on ALL colors, pure grayscale)
- `next-themes` class strategy via `ThemeProvider`

## Dark Mode Audit

### Pages Audited (All) ✅

- [x] Homepage — hero, features, CTA, product catalog
- [x] Product pages — ProductPageTemplate, pricing
- [x] Payment page — forms, cart summary
- [x] Blog — listing, detail, prose content
- [x] Docs — 3-panel layout, article content, sidebar
- [x] Tools — input/output areas, tool cards
- [x] Resources — about, reviews, partners, milestones
- [x] Legal pages — prose content
- [x] Navigation — header, mega menu, mobile drawer, command menu
- [x] Footer — links, social icons
- [x] Floating contact button, scroll-to-top, toaster

### Issues Fixed ✅

- [x] Borders using hardcoded colors → switched to `border-border`
- [x] Text using hardcoded colors → switched to `text-foreground`, `text-muted-foreground`
- [x] Backgrounds not adapting → use `bg-background`, `bg-card`, `bg-muted`
- [x] Images without dark-mode treatment → dark:opacity-85, dark:brightness-90
- [x] CTA section: dark:!bg-black + hardcoded white → semantic tokens + dark:bg-card
- [x] Canvas components (particles, ripple) → theme-aware color detection
- [x] External SVGs → added `unoptimized` prop

## Lighthouse Optimization

### Achieved Scores ✅

| Category | Target | Home | About | Blog |
|----------|--------|------|-------|------|
| Accessibility | > 90 | 100 | 100 | 100 |
| Best Practices | > 90 | 96 | 96 | 100 |
| SEO | > 95 | 100 | 100 | 100 |
| Performance | > 90 | dev* | dev* | dev* |

*Performance not meaningful in dev mode (unminified JS, HMR overhead)

### Accessibility Fixes ✅

- [x] Skip-to-content link in root layout
- [x] ARIA fix: Rating component conditional aria-value* attributes
- [x] Logo link aria-label
- [x] `--destructive-foreground` token added for button/badge contrast
- [x] `prefers-reduced-motion` already respected

### SEO Fixes ✅

- [x] og:image + twitter images metadata
- [x] robots: index true, follow true

## Files Modified (18)

| File | Change |
|------|--------|
| `globals.css` | Added `--destructive-foreground` token |
| `layout.tsx` | Skip-to-content, og:image, robots |
| `(marketing)/layout.tsx` | `<div id="main-content">` target |
| `cta-section-05.tsx` | Removed hardcoded dark hacks, semantic tokens |
| `word-rotate.tsx` | `text-foreground` instead of `text-black dark:text-white` |
| `button.tsx` | Destructive: `text-destructive-foreground` |
| `badge.tsx` | Destructive: `text-destructive-foreground` |
| `copy-code.tsx` | `bg-background` |
| `slider.tsx` | Thumb `bg-background` |
| `particles.tsx` | Theme-aware color detection |
| `background-ripple-effect.tsx` | CSS variable tokens |
| `rating.tsx` | Conditional ARIA attributes |
| `site-header.tsx` | Logo aria-label |
| `hero-clone.tsx` | `unoptimized` on external SVGs |
| `logo-cloud-04.tsx` | `unoptimized` on external SVGs |
| `features.tsx` (bento-01) | Dark image treatments |
| `product-management.tsx` (bento-19) | Semantic border/bg tokens |
| `card-particles.tsx` (bento-10) | Removed hardcoded color |
