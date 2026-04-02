# Foreplay Redesign — Changelog

## Foundation

| File | Change |
|------|--------|
| `fonts/index.ts` | Inter with `axes: ["opsz"]` — enables optical size for Inter Display |
| `globals.css` | `.foreplay` scope: full neutral + solid palettes, `--font-display`, `--fp-alpha-*`, `--fp-solid-*` |
| `(foreplay)/layout.tsx` | Body wrapper, font-optical-sizing:none (global), header + footer |

## Reusable Atoms

| Component | Foreplay Class | Variants | Used In |
|-----------|---------------|----------|---------|
| `foreplay-cta-button.tsx` | `.button-dark`, `.button-light` | nav, hero, secondary, ghost, light-primary | Header, Hero, Product, CTA, Sharing |
| `foreplay-nav-link.tsx` | `.navlink` | — | Header |
| `foreplay-hero-content.tsx` | `.home-hero-content` | — | Hero |
| `foreplay-section-head.tsx` | `.section-head` | dark/light variant, h2/h3 titleSize, m/l descSize, subtitle | Winning, Product x5, Collab, Features, CTA |
| `foreplay-section-container.tsx` | `.container.section-container` | section/footer/navbar | Every section |
| `foreplay-section-white-block.tsx` | `.section-white-block` | — | Winning, Collab |
| `foreplay-dot-bg.tsx` | `.dot-bg` | — | Hero |
| `foreplay-winning-card.tsx` | `.home-winning-card` | light/dark (isDark) | Before/After |
| `foreplay-footer.tsx` | `footer.u-footer` | — | Layout |

## Organisms

| Component | Foreplay Class | Description |
|-----------|---------------|-------------|
| `foreplay-header.tsx` | `.navigation` | Sticky, z-100, blur(24px), bg #020308eb |
| `foreplay-home-hero.tsx` | `.home-hero` | Scroll animation + sticky + video |
| `foreplay-home-hero-bottom.tsx` | `.home-hero-bottom` | Overline + 14 logo grid |
| `foreplay-home-hero-video.tsx` | `.home-hero-middle` | Video + gradient overlays |
| `foreplay-home-winning.tsx` | `.home-winning` | Section head + Before/After cards |
| `foreplay-home-product-showcase.tsx` | `.home-product` | **REUSABLE** — sidebar + tabs + figure. Used 5x |
| `foreplay-home-chrome-extension.tsx` | `.home-extension` | Chrome logo + stats + CTA |
| `foreplay-home-collab.tsx` | `.home-collab` | Section head + enrichment placeholder + sharing |
| `foreplay-home-sharing.tsx` | `.home-sharing` | Tabs + CTA cards + image pane |
| `foreplay-home-features-grid.tsx` | `.lens-security` | 3-col card grid with images + CTAs |
| `foreplay-home-cta.tsx` | `.home-cta` | Final CTA + banner image |

## Data Files

| File | Content |
|------|---------|
| `data/foreplay-hero-logos.tsx` | 14 SVG client logos |
| `data/foreplay-product-tabs.tsx` | Tab data: swipeFile, spyder, discovery, lens, briefs |

## Source Files

| File | Purpose |
|------|---------|
| `docs/foreplay/html/foreplay-homepage-latest.html` | Full homepage HTML (338KB, latest) |
| `docs/foreplay/foreplay-source.css` | Full CSS (483KB) |
| `docs/foreplay/extract-css.sh` | Extract CSS by class name |

## Page Composition (`(foreplay)/home/page.tsx`)

```
Section 0: Hero (dark + dot grid + scroll animation + video)
Section 1: Winning (white) + Swipe File + Spyder + Discovery + Chrome Extension
Section 2: Collab (white) + enrichment + sharing tabs
Section 3: Features grid (dark) — 3 cards
Final CTA: "Ready to ship more winning ads?" + banner image
Footer (in layout)
```

## Remaining TODO

- [ ] Lens + Briefs product showcase images/videos
- [ ] Enrichment illustration (Venn diagram SVG)
- [ ] Convert content from Foreplay to GoAds
- [ ] Responsive breakpoints
- [ ] Convert .foreplay hex tokens to oklch
