# WT2: Dark Mode + Lighthouse

> Branch: `phase-1a/dark-mode-lighthouse`

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

### Pages to Audit (All)

Audit every page in dark mode — check for:
- Missing dark variants (white text on white bg, invisible borders)
- Hardcoded colors not using CSS variables
- Image contrast on dark backgrounds
- Shadow visibility
- Form inputs (borders, focus rings, placeholder text)
- Status badges and tags readability

### Priority Order

1. [ ] Homepage — hero, features, CTA, product catalog
2. [ ] Product pages — ProductPageTemplate, pricing
3. [ ] Payment page — forms, cart summary
4. [ ] Blog — listing, detail, prose content
5. [ ] Docs — 3-panel layout, article content, sidebar
6. [ ] Tools — input/output areas, tool cards
7. [ ] Resources — about, reviews, partners, milestones
8. [ ] Legal pages — prose content
9. [ ] Navigation — header, mega menu, mobile drawer, command menu
10. [ ] Footer — links, social icons
11. [ ] Floating contact button, scroll-to-top, toaster

### Common Issues to Fix

- [ ] Borders using hardcoded colors → switch to `border-border`
- [ ] Text using hardcoded colors → switch to `text-foreground`, `text-muted-foreground`
- [ ] Backgrounds not adapting → use `bg-background`, `bg-card`, `bg-muted`
- [ ] Images without dark-mode treatment (too bright on dark bg)
- [ ] Shadows invisible in dark mode → adjust or use border fallback
- [ ] Code blocks / pre elements contrast

## Lighthouse Optimization

### Target Scores (All key pages)

| Category | Target |
|----------|--------|
| Performance | > 90 |
| Accessibility | > 90 |
| Best Practices | > 90 |
| SEO | > 95 |

### Pages to Test

1. `/` (homepage)
2. `/agency-ad-account` (product)
3. `/blog` (listing)
4. `/blog/[slug]` (detail)
5. `/docs` (knowledge base)
6. `/tools/2fa` (tool sample)
7. `/pricing`

### Performance Tasks

- [ ] Images: convert to WebP/AVIF, add explicit `width`/`height`, use `next/image`
- [ ] Lazy load below-fold images and components
- [ ] Check bundle size — identify large imports
- [ ] Font loading: ensure `font-display: swap` on Geist + JetBrains Mono
- [ ] Reduce CLS: set explicit dimensions on dynamic content
- [ ] Preload critical assets (hero image, above-fold fonts)
- [ ] Check for unused CSS/JS in bundle

### Accessibility Tasks

- [ ] Color contrast ratio >= 4.5:1 (text) and 3:1 (large text) in both themes
- [ ] All images have meaningful alt text
- [ ] Form labels associated with inputs
- [ ] Focus indicators visible on all interactive elements
- [ ] Skip-to-content link
- [ ] ARIA landmarks (main, nav, footer)
- [ ] Keyboard navigation works (tab order, escape closes modals)
- [ ] `prefers-reduced-motion` respected (already partially done)

### SEO Tasks

- [ ] Verify structured data (JSON-LD) on product pages
- [ ] Check canonical URLs
- [ ] Verify Open Graph + Twitter card meta on all pages
- [ ] Heading hierarchy (h1 → h2 → h3, no skips)

## Success Criteria

- [ ] All pages render correctly in dark mode — no visual bugs
- [ ] No hardcoded colors remaining (all use CSS variable tokens)
- [ ] Lighthouse > 90 on all 4 categories for key pages
- [ ] WCAG 2.1 AA color contrast compliance
- [ ] All images optimized (WebP, sized, lazy loaded)
