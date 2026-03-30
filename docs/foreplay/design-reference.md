# Foreplay Design Reference

> Design spec cho GoAds website redesign. Copy layout/style từ Foreplay.co, thay content + hình ảnh GoAds.

## Design Philosophy

Full dark SaaS aesthetic. Pure black background, white text, subtle dot grid pattern. Clean, minimal, premium feel.

## Color System

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `--background` | `#000000` | `bg-background` | Page background |
| `--foreground` | `#FFFFFF` | `text-foreground` | Primary text, headings |
| `--muted` | `#18181b` | `bg-muted` | Card surfaces, elevated bg |
| `--muted-foreground` | `#CACACE` | `text-muted-foreground` | Secondary text, descriptions |
| `--border` | `#3f3f46` | `border-border` | Borders, dividers |
| `--card` | `#18181b` | `bg-card` | Card backgrounds |
| `--card-foreground` | `#FFFFFF` | `text-card-foreground` | Card text |
| `--primary` | `#FFFFFF` | `bg-primary` | CTA buttons (white bg) |
| `--primary-foreground` | `#000000` | `text-primary-foreground` | CTA button text (black) |
| `--secondary` | `#27272a` | `bg-secondary` | Secondary buttons, tags |
| `--secondary-foreground` | `#FFFFFF` | `text-secondary-foreground` | Secondary button text |
| `--accent` | `#27272a` | `bg-accent` | Hover states, subtle highlights |
| `--accent-foreground` | `#FFFFFF` | `text-accent-foreground` | Accent text |
| `--ring` | `#FFFFFF` | `ring-ring` | Focus rings |
| `--input` | `#3f3f46` | `bg-input` | Input borders |

### Dark Mode
Foreplay IS dark mode. Không cần dark mode toggle — toàn bộ site dark by default.

## Typography

### Fonts
| Role | Font | CSS Variable | Tailwind |
|------|------|-------------|----------|
| **Headings** | Inter Display | `--font-display` | `font-display` |
| **Body/UI** | Inter | `--font-sans` | `font-sans` |

> Inter Display = Inter nhưng optimized cho large sizes (headings). Available via `@fontsource/inter` hoặc `next/font/google` với `Inter` font (display optical size).

### Type Scale
| Level | Size | Weight | Leading | Usage |
|-------|------|--------|---------|-------|
| Hero | 48-56px | 600 | 110% | Homepage hero headline |
| H2 | 28-36px | 600 | 120% | Section titles |
| H3 | 24px | 600 | 130% | Card titles |
| H4 | 20px | 500 | 140% | Subsection |
| Body LG | 18px | 400 | 160% | Lead paragraphs |
| Body | 16px | 400 | 150% | Paragraph text |
| Small | 14px | 400 | 140% | Captions, meta |
| Overline | 12-13px | 500 | 150% | Labels, uppercase tracking-wider |

## Layout

### Container
- Max width: ~1200px (estimate from screenshots)
- Padding: `px-4` mobile, `px-6` desktop

### Section Spacing
- Between sections: `py-20 lg:py-32`
- Inner gaps: `gap-6` to `gap-12`

### Border Radius
- Cards: `rounded-2xl` (16px) to `rounded-3xl` (24px)
- Buttons: `rounded-full` (pill shape) for CTA, `rounded-lg` for secondary
- Images/screenshots: `rounded-2xl` with subtle border

## Dot Grid Pattern

Subtle dot pattern overlay on dark background:

```css
.dot-pattern {
  background-image: radial-gradient(circle, #ffffff08 1px, transparent 1px);
  background-size: 24px 24px;
}
```

Masked with gradient fade at top/bottom edges.

## Navigation

- **Position**: Fixed/sticky top
- **Background**: Transparent on hero → slightly blurred bg on scroll
- **Structure**: Logo left | Nav center (Product, Solutions, Resources, Pricing, Book a Demo) | CTA right (Sign in, Start free trial)
- **CTA button**: White bg, black text, pill shape (`rounded-full`)
- **Sign in**: Ghost/text style
- **Mobile**: Hamburger menu

## Button Hierarchy

| Tier | Style | Usage |
|------|-------|-------|
| **Primary CTA** | White bg, black text, `rounded-full`, `px-6 py-3` | "Start Free Trial", main actions |
| **Secondary** | Border white/gray, transparent bg, `rounded-full` | "Book a Demo", alt actions |
| **Ghost/Link** | No bg, white text, underline on hover | "Sign in", "Learn More" |
| **Tag/Badge** | `bg-secondary`, `rounded-full`, small | Category labels |

## Homepage Sections (in order)

1. **Hero** — Large headline, subtext, CTA button, dot pattern bg
2. **Logo Bar** — "Powering +10,000 Social Ad Teams & Agencies" + brand logos
3. **Before/After** — Problem (chaos) → Solution (organized workflow loop)
4. **Product Features** — Split sections: text left + screenshot right (alternating)
5. **Chrome Extension** — CTA for free chrome extension + stats
6. **Analytics Section** — Lens/analytics product showcase
7. **Testimonials** — Client quotes with avatars in grid
8. **Collaboration** — Sharing & presenting features (3 columns)
9. **Features Grid** — Expert Swipe Files, Mobile App, API (bento grid)
10. **Final CTA** — "Ready to ship more winning ads?" + CTA buttons
11. **Footer** — Links, social, stats

## Animation Guidelines

- Scroll reveal: subtle fade-up on viewport enter
- Hover: cards slightly elevate + border brighten
- Smooth transitions: `transition-all duration-300`
- Dot pattern: subtle parallax or static
- No flashy animations — everything minimal and smooth

## Component File Naming

All in `src/components/foreplay/`:
```
foreplay-header.tsx
foreplay-hero-section.tsx
foreplay-logo-bar-section.tsx
foreplay-before-after-section.tsx
foreplay-product-feature-section.tsx
foreplay-stats-section.tsx
foreplay-testimonials-section.tsx
foreplay-features-grid-section.tsx
foreplay-final-cta-section.tsx
foreplay-footer.tsx
```

## What GoAds Replaces

| Foreplay | GoAds |
|----------|-------|
| "The Complete Winning Ad Workflow" | GoAds headline (TBD) |
| Foreplay product screenshots | GoAds product screenshots (Trang vẽ) |
| Foreplay logo + brand logos | GoAds logo + client logos |
| Foreplay features | GoAds features (Agency Accounts, BMs, etc.) |
| Foreplay testimonials | GoAds client testimonials |
| Foreplay pricing | GoAds pricing tiers |
| All images/illustrations | Trang creates new ones |
