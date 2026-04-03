# Foreplay Design Guideline

> Source of truth for pixel-perfect clone. All values from `foreplay-source.css` + `foreplay-homepage-latest.html`.

## Body

```
bg: var(--background) = #020308 (near-black with blue tint)
color: var(--neutral-300) = #ffffff5c (white 36%)
font: Inter, 1rem/1.5rem, weight 400, tracking -.01125em
overflow-x: clip, antialiased, font-optical-sizing: none (global)
```

## Header (.navigation)

```
z-index: 100, sticky top-0
backdrop-filter: blur(24px)
background-color: #020308eb (~92% opacity)
color: var(--neutral-100) = #ffffffad
```

Always semi-transparent + blur. No transparent-to-blur scroll toggle.

## Container System

| Class | Max-width | Padding | Usage |
|-------|-----------|---------|-------|
| `.container` | 1440px | px-10 (40px) | Header, Features grid |
| `.container.section-container` | 1216px | px-10 | Most sections |
| `.container.footer-container` | 1216px | px-10 | Footer |

## Typography

### Font Families — CRITICAL

| Font | CSS | Tailwind | Elements |
|------|-----|----------|----------|
| **Inter** | `Inter, sans-serif` | `font-sans` | Body, navlinks, buttons, heading-s/m/l, labels |
| **Inter Display** | `Inter Display, Arial, sans-serif` | `font-display [font-optical-sizing:auto]` | `.text-display-h1` through `.text-display-h6` |

Implementation: `next/font/google` Inter with `axes: ["opsz"]`, layout has `font-optical-sizing: none` (global), display headings override with `[font-optical-sizing:auto]`.

### Text Scale

| Class | Font | Size | Weight | Line-height | Tracking |
|-------|------|------|--------|-------------|----------|
| text-display-h1 | Inter Display | 3.75rem | 600 | 4.25rem | -0.0075em |
| text-display-h2 | Inter Display | 2.75rem | 600 | 3.36rem | -0.0075em |
| text-display-h3 | Inter Display | 2.25rem | 600 | 2.75rem | -0.00722em |
| text-display-h4 | Inter Display | 1.75rem | 600 | 2.25rem | -0.00714em |
| text-heading-m | Inter | 1rem | 550 | 1.5rem | -0.01125em |
| text-label-m | Inter | 1rem | 500 | 1.5rem | -0.01125em |
| text-label-s | Inter | 0.875rem | 500 | 1.25rem | -0.00643em |
| text-body-m | Inter | 1rem | 400 | 1.5rem | -0.01125em |
| text-body-l | Inter | 1.125rem | 400 | 1.75rem | -0.01444em |
| text-body-s | Inter | 0.875rem | 400 | 1.25rem | -0.00643em |
| text-overline | Inter | 0.75rem | 550 | 1rem | 0.166667em (uppercase) |
| text-navlink | Inter | 0.9375rem | inherit | 1.25rem | — |

## Buttons (`ForeplayCtaButton`)

| Variant | Class | BG | Text | Hover | Context |
|---------|-------|-----|------|-------|---------|
| nav | `.new-button.new-button-navbar` | white | solid-900 | primary/90 | Header |
| hero | `.button-dark.button-primary` | white | solid-900 | #ffffffd6 | Hero, CTA |
| secondary | `.button-dark.button-secondary` | neutral-700 | white | border | Product sidebar |
| ghost | `.button-dark.button-ghost` | background | white | neutral-700 | Product sidebar |
| light-primary | `.button-light.button-primary` | background | white | solid-600 | White section CTAs |

All: p-2, rounded-[10px], z-5, `.text-heading-m` (except nav uses `.text-navlink`)

## Color Palettes

### Neutral (dark bg — white at various opacities)

| Token | Value | Usage |
|-------|-------|-------|
| --fp-alpha-0 | #ffffff | foreground |
| --fp-alpha-50 | #ffffffd6 (84%) | muted-foreground, logo wrapper |
| --fp-alpha-100 | #ffffffad (68%) | description text (dark bg), hover |
| --fp-alpha-200 | #ffffff70 (44%) | inactive tab links |
| --fp-alpha-300 | #ffffff5c (36%) | section subtitle (text-white-68) |
| --fp-alpha-700 | #ffffff1a (10%) | card/secondary bg |

### Solid (light bg — dark grays)

| Token | Value | Usage |
|-------|-------|-------|
| --fp-solid-25 | #f9f9fa | Tab CTA bg, hover bg |
| --fp-solid-50 | #e9eaef | Card border ring |
| --fp-solid-400 | #4c505f | Subtitle on white bg |
| --fp-solid-500 | #343642 | Body text on white bg |
| --fp-solid-600 | #24262e | Description on white bg |
| --fp-solid-700 | #171920 | Title on white bg, border |
| --fp-solid-900 | #090a0e | Primary-foreground |

## Component Architecture

```
page.tsx (composition)
  <section> + <ForeplaySectionContainer>  ← page owns these
    <Organism>                             ← .home-hero, .home-winning, etc.
      <Atom>                               ← .home-hero-content, .button-dark, etc.
```

Rules:
- Component name = Foreplay CSS class name
- Page owns `<section>` + container wrapper
- Organism = everything inside container
- Never put `<section>` or container inside organism
- Every named class → component or commented div
- Reuse components across sections (ForeplaySectionHead used 6x)

## Footer

```
footer.u-footer: mt-10, pt-10, pb-10
.u-footer-block: flex col, gap-11 (44px), pb-[60px]
.footer-divider: bg #ffffff29, h-px, w-full
.footer-products: flex, justify-between, gap-4
.footer-company: flex, gap-[60px], items-center (mobile: flex-col, gap-6)
.footer-links: grid 5col, gap-4 (tablet: 3col, mobile: 2col)
.footer-foot: flex, gap-4, items-center (mobile: flex-col)
.footer-social-links-item: opacity 0.68, 28x28, hover opacity 1
.ai-button: 35x35, border 1.5px #ffffff29, rounded-[9px]
```

## Solution/Industry Pages

```
.industries-icon: border 1px #ffffff29, rounded-[15px], 60x60, my-5
.industries-carousel-container: flex, justify-between, pt-16 pb-6, relative, overflow-hidden
.industries-carousel-fade: absolute inset-0, linear-gradient(90deg, bg→transparent→transparent→bg)
.industry-carousel-image: border 1px #ffffff29, rounded-[20px], 100x100 (tablet 65, mobile 50)
.industries-testimonial: border 1px #ffffff1a, rounded-[20px], flex col, p-12, relative, overflow-hidden
.industries-testimonial-content: z-1, flex col, gap-[74px], relative
.industries-testimonial-copy: max-w-[60%] (mobile: max-w-none)
.industires-testimonial-headshot: rounded-[10px], 64x64
.industry-testimonial-image-holder: absolute inset-y-0 right-0 (mobile: static)
.industry-testimonial-image-fade: absolute inset-0, gradient left fade (mobile: none)
.industries-examples-grid: grid 3col, gap-4 (tablet: 2col, mobile: flex-col)
.industries-examples-card: bg neutral-700, rounded-2xl
.comparison-tabs-menu: grid 5col, gap-4, p-1
.comparison-product-tab: border 1px neutral-500, opacity 0.44, rounded-[15px], p-2.5, current: opacity 1
.comparison-product-icon: w-10 (mobile: w-[30px])
```

## Pixel-Perfect Rules

1. HTML nesting first — check DOM structure before CSS
2. Extract exact CSS — use `extract-css.sh`, never guess
3. Never round values — `0.9375rem` not `15px`, `font-[550]` not `font-medium`
4. CSS cascade — last definition at same specificity wins
5. Semantic tokens only — zero hex in JSX, use `var(--fp-*)` tokens
6. Inter Display for display headings — `font-display [font-optical-sizing:auto]`
7. Never interpret CSS — copy exact values, trust source over CSS spec knowledge
8. titleTag ≠ titleSize — `<h2 class="text-display-h3">` = tag h2, visual h3
9. Images/videos — respect container structure, user replaces assets later
10. `.container` (1440px) vs `.container.section-container` (1216px) — check which parent wraps the element
