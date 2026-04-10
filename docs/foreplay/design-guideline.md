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

### Header DOM hierarchy (100% source-matched)

```
header.navigation                     sticky top-0 z-[100] bg-[var(--fp-nav-bg)] backdrop-blur-[24px]
└─ div.container.navbar-container     max-w-[1440px] mx-auto flex items-center justify-between px-10
   └─ div.nav-stack                   relative flex w-full items-center justify-between gap-9 p-4
      │                                (positioning context for dropdown navs — see below)
      ├─ a.nav-brand                  z-[5] rounded-[10px] p-1 → .u-nav-brand-logo (h-8)
      ├─ ForeplayHeaderMobileMenu     max-md:flex lg:hidden (hamburger, ≤991px)
      └─ nav.nav-menu                 static flex-1 (hidden max-md lg:block)
         └─ div.nav-menu-inner        flex justify-between
            ├─ div.navmenu-links      flex items-center gap-3 justify-start
            │  ├─ ForeplayHeaderProductMenu     (Product dropdown — .nav-dropdown.w-dropdown)
            │  ├─ ForeplayHeaderSolutionsMenu   (Solutions dropdown)
            │  ├─ ForeplayHeaderResourcesMenu   (Resources dropdown)
            │  ├─ ForeplayNavLink href=/pricing
            │  └─ ForeplayNavLink href=/book-demo
            └─ div.navmenu-cta        flex items-center gap-2 justify-end
               ├─ ForeplayNavLink href=/sign-in (Sign in)
               └─ ForeplayCtaButton href=/sign-up (Start free trial, new-button-navbar)
```

### ⭐ Dropdown positioning context escape

**Critical mechanism:** `.nav-dropdown` is `position: static` (Foreplay override of Webflow's `.w-dropdown` default relative). The absolute `nav.nav-dropdown-menu { top:100% left:0% right:0% min-w-full }` therefore anchors to `.nav-stack` (nearest positioned ancestor), NOT the button wrapper.

Result: dropdown appears below the ENTIRE header row and spans full nav-stack width (1360px on 1440 container), not just under the small button.

**Clone implementation:** `ForeplayHeaderDropdownBase` wrapper uses `className="static p-0"` on `.nav-dropdown` (never `relative`). `.nav-stack` in `foreplay-header.tsx` uses `className="relative ..."` as the positioning context.

### Dropdown shell (ForeplayHeaderDropdownBase)

All 3 dropdowns (Product/Solutions/Resources) share this base for DRY. It owns:
- State: `open` / `setOpen`, outside-click + ESC handling
- DOM: `.nav-dropdown.w-dropdown > button.nav-dropdown-toggle + nav.nav-dropdown-menu`
- Animations: transform-none/scale-[0.96] + opacity, transition 500ms cubic-bezier(.19,1,.22,1)

Each dropdown component only provides its own `.nav-dropdown-menu-inner` content (Product grid, Solutions grid, Resources grid).

### Responsive breakpoints in dropdowns

| Breakpoint | Behavior |
|---|---|
| `< 992px` | Navbar-container padding 8px (tight), nav-stack padding 12px 16px + h-72, dropdowns hidden (mobile menu) |
| `992-1279px` | Desktop layout, but `.nav-product-menu-banner { display: none }` (Product video banner hidden) |
| `≥ 1280px` (Tailwind `xl:`) | Full desktop — banner visible (`display: flex`), border-l + pt-20 + h-[150px] video thumb |

**Bug preventer:** Product dropdown content needs ≥1040px min-width. When banner is correctly hidden `<1280px`, links fit in ~818px nav-stack width. Previously showed banner at all widths → layout collapsed.

## Container System

| Class | Max-width | Padding | Usage |
|-------|-----------|---------|-------|
| `.container` | 1440px | px-10 (40px) | Header, Hero, FAQ, Final CTA — `variant="wide"` |
| `.container.section-container` | 1216px | px-10 | Feature grids, Core features — `variant="section"` (default) |
| `.container.footer-container` | 1216px | px-10 | Footer — `variant="footer"` |
| `.container.w-container` | 940px (overridden by .container → 1440px) | px-10 | Testimonials inside section-container |

**CRITICAL:** `.w-container { max-width: 940px }` is **overridden** by `.container { max-width: 1440px }` (higher specificity). Testimonials inside `.container.section-container` inherit parent width (1136px content at typical viewport). Use `px-10` wrapper inside section-container, NOT a separate wide container.

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

## Product Hero (`.product-hero`)

```
.product-hero: flex col, center, pt-[10px] pb-0 (desktop), pt-16 (tablet), pt-6 pb-6 (mobile)
.product-hero-animation-trigger: absolute, h-screen, inset -72px 0 auto (scroll trigger)
.product-hero-sticky: sticky top-[100px], scroll-animated (opacity/scale/translateY same as home hero)
.product-hero-icon: 256x256, mt-[-40px] mb-[-24px] (desktop), p-8 (tablet), p-6 (mobile)
  - icon-image: 128x128 (tablet), 108x108 (mobile), hidden on desktop when video plays
  - icon-video: fills 256x256 parent
.product-hero-content: flex col, gap-7 (28px desktop), gap-6 + pb-6 (tablet)
  - hero-text: flex col, gap-4, max-w-[900px], items-center. Tablet: gap-3
  - hero-title: gradient radial-gradient(circle at 50% -100%, #fff, #ffffffe0), text-wrap balance
    Responsive: 3.75rem → 3.25rem (tablet) → 2.375rem (mobile)
.product-hero-preview: aspect-16/10, perspective-1000, transform-origin 50%, mt-52px mb-[-48px], overflow-clip
  - product-hero-video: absolute, z-1, top 6.6%, left 11%, w 77.8%, rotateX(7deg), bg background
  - preview-image: z-2, relative, aspect 16/10, w-full, pointer-events-none
  - preview-underlay: hidden on desktop (gradient on tablet/mobile)
```

## Footer Product Icons (sprite system)

```
.footer-product-icon: 44x44
  - Uses div + background-image (NOT <img>)
  - Each icon has unique backgroundSize (sprite sheet width varies per product)
  - backgroundPosition: 0px 0px (first frame)
  - bg-no-repeat
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

## Webflow Global Defaults

Foreplay uses Webflow — these global defaults apply to ALL elements:

```
ul { margin-top: 0; margin-bottom: 10px; padding-left: 40px; }
```

All `.text-*` classes in Webflow include:
```
margin-top: 0; margin-bottom: 0; text-decoration: none;
```
→ Always add `m-0 no-underline` to fpText constants. Without this, text inside `<a>` tags gets browser-default underline and margins that break spacing.

### Webflow Utility Classes with Hidden Properties

**CRITICAL:** Webflow utility classes often contain extra CSS beyond what their name suggests. Always extract CSS, never assume.

| Class | Expected | **Actual** |
|-------|----------|-----------|
| `.text-white` | `color: #fff` | `color: #fff; **flex: 1;**` |
| `.text-alpha-100` | `color: #ffffffad` | `color: #ffffffad; **flex: 1;**` |
| `.flex-1` | `flex: 1` | `flex: 1` (as expected) |
| `.w-inline-block` | `display: inline-block` | `display: inline-block; max-width: 100%` |
| `.nav-dropdown` (Foreplay override of `.w-dropdown`) | relative (Webflow default) | **`position: static`** (escapes positioning context — see Header section) |

**Lesson:** `.text-white { flex: 1 }` caused numbers in footer ad count to split equal space with text labels. Without extracting CSS, this is invisible.

**Rule:** Before using ANY Webflow utility class, run `extract-css.sh` to check for hidden properties.

When cloning `<ul>`, always add:
- `mb-2.5` (margin-bottom: 10px) — Webflow default
- `pl-0` — override padding-left when `.w-list-unstyled` is present
- `list-none` — override list-style when `.w-list-unstyled` is present

### ⭐ CSS Cascade with Media Queries (critical for extraction)

**Lesson learned during header refactor:** naive CSS extraction without media query context causes WRONG desktop values.

**Example — `.navbar-container` max-width:**
```
.navbar-container       { max-width: 1340px }  [DESKTOP, pos 59341]
.container              { max-width: 1440px }  [DESKTOP, pos 183560]  ← LAST wins
.container.navbar-container { padding: 0 8px }  [@media ≤991px MOBILE ONLY]
```

On desktop: `.container` (1440) wins over `.navbar-container` (1340) because both have same specificity (0,1,0) and `.container` comes AFTER in source order. The combined-selector `.container.navbar-container` rule is inside `@media ≤991px` — mobile only. **Do NOT apply to desktop clone.**

**Rule:** When extracting CSS, always track the media query context of each rule:
```python
# Walk backward through braces to find containing @media
def find_context(css, pos):
    depth = 0
    i = pos
    while i > 0:
        i -= 1
        if css[i] == '}': depth += 1
        elif css[i] == '{':
            if depth == 0:
                start = css.rfind('@media', 0, i)
                if start > 0 and start > css.rfind('}', 0, i):
                    return css[start:css.find('{', start)].strip()
                return 'DESKTOP'
            depth -= 1
    return 'DESKTOP'
```

**Lesson applied:** Header refactor originally used `max-w-[1340px] + px-2 + py-3 px-4 h-[72px]` (all mobile-only values). Correct desktop: `max-w-[1440px] + px-10 + p-4` (no explicit height).

## CSS Token Standards (for 10+ future routes)

### Goal: Zero `[]` arbitrary values in new code

**Step 1:** Register Foreplay tokens in `globals.css` under `.foreplay`:
```css
.foreplay {
  /* Container */
  --fp-w-wide: 1440px;
  --fp-w-section: 1216px;
  --fp-px: 40px;    /* container padding = px-10 */

  /* Section vertical padding (responsive) */
  --fp-py-section: 108px;   /* desktop — foreplay section standard py */
  --fp-py-section-md: 96px;  /* tablet (≤991px) */
  --fp-py-section-sm: 80px;  /* mobile (≤767px) */

  /* Border radius (project --radius: 1rem breaks rounded-lg/xl) */
  --fp-r-sm: 8px;   /* tab links, badges */
  --fp-r-md: 12px;  /* tab menu, tooltip */
  --fp-r-lg: 16px;  /* comparison grid */
  --fp-r-xl: 20px;  /* pricing cards, footer */
  --fp-r-2xl: 36px; /* section-white-block */

  /* Borders — use box-shadow for 1px rings */
  --fp-ring-subtle: 0 0 0 1px #ffffff29;   /* neutral-600 */
  --fp-ring-card: 0 0 0 1px #ffffff1a;     /* neutral-700 */
  --fp-ring-highlight: 0 0 0 1px #ffffffad; /* neutral-100 */
}
```

**Usage example (responsive section padding):**
```tsx
// ❌ BAD — hardcoded arbitrary values (19+ occurrences across codebase)
<div className="py-[108px] max-md:py-24 max-sm:py-20">

// ✅ GOOD — use registered tokens
<div className="py-(--fp-py-section) max-md:py-(--fp-py-section-md) max-sm:py-(--fp-py-section-sm)">
```

**Step 2:** Use CSS variables via Tailwind:
```
max-w-(--fp-w-wide)     instead of  max-w-[1440px]
rounded-(--fp-r-md)     instead of  rounded-[12px]
shadow-(--fp-ring-subtle) instead of shadow-[0_0_0_1px_#ffffff29]
```

### Color Rules
| Context | Use | NOT |
|---------|-----|-----|
| Dark bg (`.foreplay` scope) | `var(--fp-alpha-*)` or `var(--fp-solid-*)` | Raw hex |
| Light bg (white block) | `var(--fp-solid-*)` | Raw hex |
| Radix Portal (outside scope) | Inline hex + `font-sans antialiased` | CSS vars (won't resolve) |

### Radix Portal Rule
Radix Portals render OUTSIDE `.foreplay` scope. Always add to portal content:
```
font-sans antialiased [font-optical-sizing:none]
```
And use raw hex for colors (e.g. `bg-[#343642]` not `bg-[var(--fp-solid-500)]`).

### Responsive Strategy
Source CSS has 3 breakpoints — extract from `foreplay-source.css`:
- Desktop: default (no prefix)
- Tablet: `max-md:` (≤991px in source)
- Mobile: `max-sm:` (≤767px in source)

**Current state:** Desktop-only. Mobile will be done AFTER all routes cloned.
**Rule:** When cloning, note responsive CSS values in comments but DON'T implement yet:
```tsx
// .pricing: pt-72px (desktop), pt-40px (tablet), pt-24px (mobile)
<div className="pt-[72px]">
```

### Reuse Checklist (before creating new component)
1. Check `ForeplaySectionHead` — most section headers use this
2. Check `ForeplayCtaButton` — all CTA buttons (5 variants)
3. Check `ForeplaySectionContainer` — all containers (4 variants)
4. Check `ForeplaySectionWhiteBlock` — all white sections
5. Check `ForeplayFaqAccordion` — all FAQ sections (pass different items)
6. Check `ForeplayHomeCta` — all final CTA sections (same component)
7. Check `fpText.*` constants — all typography (13 styles)
8. Check `ForeplayHomeHeroBottom` — logo grid (trust badges)
9. Check `SenjaReviewCard` — review card (avatar, stars, content, date, platform icon)
10. Check `SenjaReviewMasonryGrid` — masonry grid with Load More (initialCount, loadMoreCount)
11. Check `ForeplayDemoHero` — demo/booking hero with Cal.com embed
12. Check `ForeplayDemoSocialProof` — social proof badges (G2, Chrome, Capterra)
13. Check `ForeplayCalEmbed` — Cal.com inline embed (dark theme, month_view)
14. Check `ForeplayUniversityHero` — university hero with logo + bg image + carousel slot
15. Check `ForeplayUniversityCourseCarousel` — horizontal course cards with opacity variants
16. Check `ForeplayUniversityFeatureRow` — alternating image+text rows with optional CTA
17. Check `BlogCard` — shared blog card (listing grid + related carousel)
18. Check `BlogFeaturedCard` — large hero featured post card
19. Check `BlogRelatedCarousel` — horizontal scroll blog carousel with arrows
20. Check `BlogCategoryBar` — horizontal category filter pills
21. Check `GoadsProductCatalogTable` — multi-category product catalog with expandable rows

### File Size Rules
- Atoms: < 100 lines
- Organisms: < 150 lines
- Data: separate file in `data/foreplay-*.ts`
- Icons: shared SVG components, not inline duplicates
- If component > 150 lines → split (data out, icons out, sub-components out)

## Blog Page Patterns

### Blog Card (`.blog-list-card`)
```
bg: background, shadow ring neutral-700, rounded-[20px], transition
hover: bg neutral-900, ring neutral-500
cover: aspect-[465/264], gradient placeholder bg
content: flex col, gap-4, p-[32px_24px_24px] desktop → p-[20px_20px_16px] mobile
author: 28px avatar circle + text-label-m name
title: text-label-l line-clamp-2 (NOT display-h5 as initially guessed)
excerpt: text-body-m inside text-alpha-100 inside line-clamp-2
```

### Blog Category Bar (`.blog-categories`)
```
border-y: 1px neutral-700, py-9, flex gap-[15px]
.blog-tag: shadow ring neutral-700, rounded-[10px], py-1.5 px-3, text neutral-25
.blog-tag:hover: bg neutral-800
active: bg foreground, text background (invert)
```

### Blog Detail Layout (`.blog-main-wrapper`)
```
grid 3-col: [1fr minmax(752px,1fr) 1fr] → [200px 1fr 200px] adapted
TOC: sticky top-[120px], border-left #ffffff1f
TOC active: border-left white, color neutral-0
body: prose styling, pb-10
blog-line: h-px, bg neutral-700
```

### Blog Author (`.blog-author`)
```
flex, gap-4, items-center, py-10
avatar: 48px circle + border overlay (neutral-600)
name: text-label-m
title: text-body-s text-alpha-100
social links: p-1, color white, hover #fffc
```

## University Page Patterns

### University Hero (`.fireside-hero`)
```
Parent section MUST have `isolate` (isolation:isolate) to create stacking context for bg z-index:-1
DOM nesting (EXACT):
  section.section.relative.isolate
    div.container (max-w-1440)
      div.fireside-hero (flex col center pt-20 pb-20)
        div.fireside-hero-logo-wrapper (pb-10)
          img.fu-logo (191x51px EXACT)
        div.university-hero-content (flex col center gap-7)
          div.hero-text (flex col items-center justify-start gap-4 max-w-900px)
            div.text-white
              h2.text-display-h2
        div.container.section-container (max-w-1216) ← SIBLING of university-hero-content
          div.university-classes-carousel
    div.foreplay-university-hero-brackground (absolute -z-[1] h-50vh opacity-.56)
```

### Course Card (`.course-card`)
```
250x375, bg-cover, rounded-10px, overflow-hidden
shadow: 0 0 0 1px #ffffff26
.coming-soon: bg #ffffff1f, dimmed avatar bg
.fu-card-shine: 125x125 circle, blur(70px), opacity 0.31 (active) / 0.09 (coming-soon)
Opacity variants: ._2 = 50%, ._3 = 25%
.text-block-95 (Coming Soon text): opacity:.2 ONLY (inherits font-size/color from body)
```

### Left-Right Feature Row (`.left-right-section`)
```
Source CSS is DISPLAY:FLEX (not grid despite grid-template-columns defined)
.left-right-section-wrapper: flex col, gap-80px
.left-right-section: flex, gap-24px, items-center
.left-right-section-content: flex col, gap-32px, items-start, justify-center
  ⚠️ NO flex:1 on content → natural content width
.left-right-section-image-wrapper: flex:1, w-full, px-16px
  ⚠️ YES flex:1 on image → fills remaining space
.left-right-section-image: border-radius 20px
  ⚠️ img has width="560" attribute → use max-w-[560px] w-full to match

Inner structure (EXACT DOM):
  .section-head.is-align-left (flex col gap-12 items-start max-w-720 text-left)
    .left-right-product-icon-wrapper (row 1 only, h-50 mb-10)
    .text-alpha-300 (empty overline placeholder)
    .section-head_title (text-foreground text-wrap:balance)
      .text-white (flex:1 hidden prop!)
        h2.text-display-h3
    .section-head_paragraph (max-w-512 text-wrap:pretty)
      .text-alpha-100 (flex:1 hidden prop!)
        p.text-body-l
  (div wrapper for CTA button, row 2 only)
    a.button-dark.button-secondary
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
