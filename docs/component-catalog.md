# Component Catalog
> Inventory of all UI primitives, shadcn-studio blocks, and shared page components with import paths.

---

## Overview

Components are organized into three layers: UI primitives in `src/components/ui/` (shadcn-based + custom), shadcn-studio blocks in `src/components/shadcn-studio/blocks/` (adapted full-section components), and shared page components in `src/components/` (GoAds-specific, reused across pages). Blocks are always full-width sections with their own padding. Primitives are composable atoms. Shared components bridge the two layers (e.g. `SectionHeader` is used inside blocks and pages).

## Rules (MANDATORY)

- DO import UI primitives from `@/components/ui/[name]`
- DO import blocks from `@/components/shadcn-studio/blocks/[block-dir]/[block-file]`
- DO import shared components from `@/components/[name]`
- NEVER import a block's internal sub-component directly from outside the block directory
- NEVER duplicate logic that already exists in a shared component — reuse `SectionHeader`, `PageHero`, `SectionDivider`
- DO wrap all entrance animations in `<MotionPreset>` — never use raw `motion.div`

---

## UI Primitives (`src/components/ui/`)

| Component | Purpose | Import |
|-----------|---------|--------|
| `accordion` | Collapsible Q&A panels | `@/components/ui/accordion` |
| `alert` | Inline status messages | `@/components/ui/alert` |
| `animated-beam` | Animated connection beam between elements | `@/components/ui/animated-beam` |
| `avatar` | User avatar with fallback initials | `@/components/ui/avatar` |
| `background-ripple-effect` | Radial ripple bg animation | `@/components/ui/background-ripple-effect` |
| `badge` | Inline label chip | `@/components/ui/badge` |
| `border-beam` | Animated border highlight | `@/components/ui/border-beam` |
| `breadcrumb` | Page breadcrumb trail | `@/components/ui/breadcrumb` |
| `button` | Base button with CVA variants | `@/components/ui/button` |
| `card` | Surface card with header/content/footer | `@/components/ui/card` |
| `carousel` | Embla-powered item carousel | `@/components/ui/carousel` |
| `chart` | Recharts wrapper | `@/components/ui/chart` |
| `collapsible` | Show/hide content region | `@/components/ui/collapsible` |
| `command` | Command palette / search | `@/components/ui/command` |
| `copy-code` | Code block with copy button | `@/components/ui/copy-code` |
| `craft-button` | Tier-1 CTA compound component | `@/components/ui/craft-button` |
| `dialog` | Modal dialog | `@/components/ui/dialog` |
| `dropdown-menu` | Radix dropdown | `@/components/ui/dropdown-menu` |
| `flow-button` | Animated flow-style button | `@/components/ui/flow-button` |
| `input` | Text input field | `@/components/ui/input` |
| `label` | Form label | `@/components/ui/label` |
| `magnet-effect` | Cursor-magnet hover wrapper | `@/components/ui/magnet-effect` |
| `marquee` | Auto-scrolling logo/card strip | `@/components/ui/marquee` |
| `motion-preset` | Framer-motion animation wrapper | `@/components/ui/motion-preset` |
| `navigation-menu` | Radix nav menu | `@/components/ui/navigation-menu` |
| `number-ticker` | Animated number count-up | `@/components/ui/number-ticker` |
| `orbiting` | Orbiting icon animation | `@/components/ui/orbiting` |
| `particles` | Canvas particle background | `@/components/ui/particles` |
| `rating` | Star rating display | `@/components/ui/rating` |
| `scroll-area` | Custom scrollbar container | `@/components/ui/scroll-area` |
| `separator` | Horizontal/vertical rule | `@/components/ui/separator` |
| `sheet` | Slide-out panel | `@/components/ui/sheet` |
| `sidebar` | App sidebar layout primitive | `@/components/ui/sidebar` |
| `skeleton` | Loading placeholder | `@/components/ui/skeleton` |
| `slider` | Range input slider | `@/components/ui/slider` |
| `switch` | Toggle switch | `@/components/ui/switch` |
| `table` | Data table | `@/components/ui/table` |
| `tabs` | Tab panel | `@/components/ui/tabs` |
| `tooltip` | Hover tooltip | `@/components/ui/tooltip` |
| `word-rotate` | Cycling word animation | `@/components/ui/word-rotate` |
| `wrapper` | Generic layout wrapper | `@/components/ui/wrapper` |

---

## Shadcn-Studio Blocks (`src/components/shadcn-studio/blocks/`)

| Block | Purpose | Used On |
|-------|---------|---------|
| `about-us-page-03` | About page full layout | `/about` |
| `bento-grid-01` | Bento grid variant 1 | — |
| `bento-grid-10` | Bento grid with icon cards | `/` |
| `bento-grid-13` | Bento grid variant 13 | — |
| `bento-grid-19` | Full-feature bento grid | `/` |
| `bm-hierarchy-card.tsx` | Business Manager hierarchy visual | `/bm` |
| `cta-section-05` | Full-width CTA with dark card | All pages (last section) |
| `error-page-04` | 404 / error page layout | Error routes |
| `faq-component-08` | Tabbed FAQ accordion | `/`, `/pricing` |
| `footer-component-02` | Site footer | `layout.tsx` |
| `hero-clone` | Landing hero with grid bg + animations | `/` |
| `hero-navigation-01.tsx` | Navbar variant 1 | — |
| `hero-navigation-02.tsx` | Navbar variant 2 | — |
| `hero-section-23` | Secondary hero with word-rotate | — |
| `logo-cloud-04` | Logo marquee strip | — |
| `page-hero-card.tsx` | Compact page hero card | Inner pages |
| `pricing-component-01` | Pricing table variant 1 | — |
| `pricing-component-09` | Pricing table with catalog grid | `/pricing` |
| `pricing-component-13` | Pricing cards with toggle | `/` |
| `profile-hero-card.tsx` | Profile product hero card | `/profiles` |
| `statistics-card-03.tsx` | Individual stat card | Stats sections |
| `statistics-card-04.tsx` | Individual stat card variant | Stats sections |
| `stats-section` | Stats row section | `/` |
| `team-section-05` | Team member grid | `/about` |
| `testimonials-component-01` | Testimonials variant 1 | — |
| `testimonials-component-02` | Testimonials variant 2 | — |
| `testimonials-component-03` | Testimonials variant 3 | — |
| `testimonials-component-06` | Testimonials variant 6 | — |
| `testimonials-component-18` | Testimonials variant 18 | — |
| `testimonials-component-22` | Review stack with ratings | `/` |
| `tiktok-hero-card.tsx` | TikTok product hero card | `/tiktok-accounts` |
| `timeline-component-05` | Vertical timeline | — |
| `unban-hero-card.tsx` | Unban service hero card | `/unban` |
| `verification-hero-card.tsx` | Verification hero card | `/blue-verification` |
| `widget-product-insights.tsx` | Product insights widget | — |

---

## Shared Page Components (`src/components/`)

| Component | Purpose | Props Summary |
|-----------|---------|---------------|
| `SectionHeader` | Label + heading + description with animations | `label`, `labelVariant`, `heading`, `description`, `align`, `inView` |
| `WavyUnderline` | SVG wavy underline for heading emphasis | `className` |
| `SectionDivider` | Border line + diamond dots between sections | none |
| `PageHero` | Inner-page hero with HeroGridBg | `label`, `heading`, `description`, `children` |
| `page-hero-big` | Larger hero variant | — |
| `MotionPreset` | Framer-motion animation wrapper (re-exported) | `fade`, `slide`, `blur`, `zoom`, `inView`, `delay`, `transition` |
| `site-header` | Sticky top nav with mega menu | none |
| `site-footer` | Site-wide footer | none |
| `mode-switcher` | Light/dark theme toggle | none |
| `nav-mega-menu` | Mega menu for desktop nav | — |
| `nav-mobile-drawer` | Mobile nav drawer | — |
| `coming-soon-hero` | Coming soon placeholder hero | `platformIcon`, `badge`, `heading`, `description`, `features` |
| `product-catalog` | Product catalog layout | — |
| `product-catalog-grid` | Product catalog with categories | `heading`, `subheading`, `categories`, `upsells` |
| `blog-hero` | Blog index hero | — |
| `blog-listing` | Blog index listing with sidebar | — |
| `blog-detail-header` | Blog post header | — |
| `blog-detail-content` | Blog post content + TOC | — |

## Anti-Patterns

| Anti-Pattern | Fix |
|---|---|
| Duplicating heading+description markup in a block | Use `<SectionHeader>` |
| Adding `border-b` directly to a block's bottom | Wrap with `<SectionDivider>` in the page |
| Importing block sub-files outside the block dir | Import only the block's main export |
| Using raw `motion.div` for entrance animation | Use `<MotionPreset fade slide={{ direction: 'down' }}>` |

## See Also

- `docs/block-adaptation.md` — how to adapt new blocks
- `docs/routing-map.md` — which blocks appear on which pages
- `docs/button-system.md` — CraftButton and Button usage
