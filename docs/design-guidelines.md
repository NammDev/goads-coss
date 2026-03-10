# GoAds Design Guidelines

> Canonical reference for every page and component. All new pages (blog, resources, milestone, docs, etc.) MUST follow these rules.

---

## 1. Design Philosophy

### Source Hierarchy

| Priority | Source | Usage |
|----------|--------|-------|
| **60%** | shadcn studio blocks (`@ss-blocks`) | Install via CLI, adapt to goads layout |
| **20%** | shadcnstudio.com HTML patterns | Copy HTML structure, restyle with goads tokens |
| **10%** | Inspired sites (shadcn ecosystem) | magicui.design, ui.shadcn.com — extract patterns only |
| **10%** | Custom components | Only when no block/pattern exists |

### Core Principles

- **CSS Variables First**: Never hardcode colors, fonts, shadows. Always reference `globals.css` tokens
- **Adapt Blocks to GoAds**: Strip block's own container/padding, inject goads `container` utility
- **Single Source of Truth**: `globals.css` owns all design tokens. Changing theme = changing one file
- **Minimal Custom CSS**: Prefer Tailwind utilities. Custom CSS only in `globals.css` for reusable patterns

---

## 2. Color System

### Token Architecture (oklch)

All colors live in `globals.css` as CSS custom properties. Components reference semantic tokens, never raw values.

```
--background / --foreground       → Page bg/text
--card / --card-foreground        → Card surfaces
--primary / --primary-foreground  → CTAs, links, active states
--secondary / --secondary-foreground → Secondary buttons, subtle bg
--muted / --muted-foreground      → Disabled, placeholder, descriptions
--accent / --accent-foreground    → Highlights, hover states
--destructive                     → Error states
--border / --input / --ring       → Borders, inputs, focus rings
--chart-1 through --chart-5       → Data visualization
```

### Rules

- **NEVER** use raw hex/rgb/oklch values in components — always `text-primary`, `bg-muted`, `border-border`, etc.
- **NEVER** create component-scoped CSS variables — all tokens go in `globals.css`
- Dark mode handled by `.dark` class override in `globals.css` — components don't need conditional styling
- Current primary (light): deep blue-purple `oklch(0.19 0.11 270.80)`
- Current primary (dark): near-white `oklch(0.92 0 0)` — for text contrast on dark bg

---

## 3. Typography

### Font Stack

```
Sans:  Geist (--font-sans) → body text, headings, UI
Mono:  JetBrains Mono (--font-mono) → code, badges, technical labels
```

- Loaded via `geist` npm package in `src/fonts/index.ts`
- Applied as CSS variable `--font-sans` on `<body>`
- **NO** `--font-heading` variable — use `font-semibold` or `font-bold` on headings

### Type Scale

| Element | Classes | Usage |
|---------|---------|-------|
| Page H1 (hero) | `text-3xl sm:text-4xl lg:text-5xl font-bold` | Landing hero, page hero — ONE per page |
| Section H2 | `text-2xl font-semibold sm:text-3xl lg:text-4xl` | Section headers via `SectionHeader` component |
| Section description | `text-lg text-muted-foreground max-w-2xl` | Below section headers |
| Card title | `text-lg font-semibold` or `text-xl font-semibold` | Card headers |
| Card description | `text-sm text-muted-foreground` | Card body text |
| Body text | `text-base text-foreground` | Default paragraph |
| Small/label | `text-sm text-muted-foreground` | Labels, captions, metadata |
| Badge/tag | `text-xs` or `text-sm font-normal` | Badge component |

### Rules

- Always use responsive text sizes: `text-2xl sm:text-3xl lg:text-4xl`
- Use `font-semibold` for headings, never `font-heading` class
- Descriptions always use `text-muted-foreground`
- Max width for readable text: `max-w-2xl` (centered) or `max-w-3xl`

---

## 4. Layout System

### Container

```css
@utility container {
  @apply mx-auto max-w-[1416px] px-4 lg:px-6;
}
```

- **Every section** uses `container` or manually: `mx-auto max-w-[1416px] px-4 lg:px-6`
- **NEVER** use `max-w-7xl`, `max-w-6xl`, `px-8`, or other container widths
- When adapting shadcn blocks: **strip** their `max-w-7xl border-x px-4 sm:px-6 lg:px-8`

### Page Structure

```tsx
// Every page follows this pattern
export default function Page() {
  return (
    <main className="flex-1">
      <HeroSection />       {/* First section — no divider above */}
      <SectionDivider />
      <Section2 />
      <SectionDivider />
      <Section3 />
      <SectionDivider />
      <CTASection />         {/* Last section — no divider below */}
    </main>
  )
}
```

- `<main className="flex-1">` wraps all page content
- `SectionDivider` between every section (except above first, below last)
- SiteHeader + Footer are in `layout.tsx` — pages MUST NOT include their own nav/footer

### Grid Frame System

The layout has decorative vertical border lines at container edges + corner dots:

```
┌─ ● ─────────────── header ─────────────── ● ─┐
│  │                                         │  │
│  │         content area (container)        │  │
│  │                                         │  │
│  ● ─────── section divider ──────────────  ●  │
│  │                                         │  │
│  │         next section                    │  │
│  │                                         │  │
└──│─────────────── footer ──────────────────│──┘
```

- Vertical lines: pseudo-elements on layout wrapper, `bg-border/64`, 1px wide
- Corner dots: `size-2 rounded-[2px] border border-border bg-background shadow-xs`
- `SectionDivider`: `border-b border-border/60` + diamond dots at container edges
- These are handled by `layout.tsx` and `SectionDivider` — pages don't recreate them

### Section Padding Standard

```
Section:     py-8 sm:py-16 lg:py-24
Internal:    space-y-12 sm:space-y-16
Gap:         gap-6 sm:gap-8
```

### Header Height

- CSS variable: `--header-height: 4rem` (set on layout wrapper)
- Header: `sticky top-0 z-40`, `backdrop-blur-[8px] bg-background/60 border-b border-dashed`
- Content below header must account for this when using anchors or scroll offsets

---

## 5. Section Anatomy

Every content section follows the same recipe:

### Structure

```tsx
<section className="py-8 sm:py-16 lg:py-24">
  <div className="container space-y-12 sm:space-y-16">
    {/* 1. Section Header */}
    <SectionHeader
      label="Features"                    // Short label
      labelVariant="underline"            // or "badge" or "uppercase"
      heading={<>Your <span className="relative text-primary">Heading<WavyUnderline /></span></>}
      description="Optional description text"
    />

    {/* 2. Content Block */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Cards, bento grids, lists, etc. */}
    </div>
  </div>
</section>
```

### SectionHeader Label Variants

| Variant | Appearance | When to Use |
|---------|------------|-------------|
| `underline` | Underlined text span | Default, most sections |
| `badge` | `<Badge variant="outline">` pill | Feature highlights, special sections |
| `uppercase` | Uppercase colored text (`text-primary text-sm`) | Bold, action-oriented sections |

### WavyUnderline

- SVG underline decoration on accent words in headings
- Wrap the accent word: `<span className="relative text-primary">Word<WavyUnderline /></span>`
- Only use on ONE word/phrase per heading

### PageHero (for inner pages)

```tsx
<PageHero
  label="About Us"
  heading={<>Our <span className="relative text-primary">Story<WavyUnderline /></span></>}
  description="Optional description"
>
  {/* Optional children with motion animation */}
</PageHero>
```

- Uses `HeroGridBg` background (dot grid pattern)
- Built-in `SectionHeader` + `MotionPreset` animations
- Use for: `/about`, `/resources`, `/milestone`, `/blog`, etc.
- Do NOT use for landing page (landing has its own custom hero)

---

## 6. Component Architecture

### File Organization

```
src/components/
├── site-header.tsx            # Global header (in layout)
├── site-footer.tsx            # Minimal footer (backup)
├── section-header.tsx         # Reusable section header (SectionHeader + WavyUnderline)
├── section-divider.tsx        # Border + diamond dots divider
├── page-hero.tsx              # Inner page hero (HeroGridBg + SectionHeader)
├── page-header.tsx            # Simple centered header (minimal usage)
├── nav-mega-menu.tsx          # Desktop mega menu
├── nav-mega-menu-data.tsx     # Navigation link data
├── nav-mobile-drawer.tsx      # Mobile navigation drawer
├── mode-switcher.tsx          # Dark/light toggle
├── theme-provider.tsx         # next-themes wrapper
├── [feature]-*.tsx            # Feature-specific components (blog-hero, product-catalog, etc.)
├── ui/                        # shadcn UI primitives (button, card, badge, etc.)
└── shadcn-studio/blocks/      # Installed shadcn studio blocks
    ├── hero-clone/
    ├── bento-grid-19/
    ├── cta-section-05/
    └── ...
```

### Naming Conventions

- Files: `kebab-case.tsx`
- Components: `PascalCase`
- Block folders: match shadcn studio registry name (e.g., `bento-grid-19/`)
- Data files: `kebab-case.ts` in `src/data/`

### Shared vs Block Components

| Type | Location | Editable? |
|------|----------|-----------|
| Shared components | `src/components/*.tsx` | Yes — project-owned |
| UI primitives | `src/components/ui/*.tsx` | Cautious — shadcn managed |
| Studio blocks | `src/components/shadcn-studio/blocks/` | Yes — adapt to goads layout after install |

### Reusable Components (USE these, don't recreate)

| Component | Purpose | Import |
|-----------|---------|--------|
| `SectionHeader` | Section label + heading + description with motion | `@/components/section-header` |
| `SectionDivider` | Border line + diamond dots between sections | `@/components/section-divider` |
| `PageHero` | Inner page hero with grid background | `@/components/page-hero` |
| `MotionPreset` | Framer Motion wrapper (fade/slide/blur/zoom) | `@/components/ui/motion-preset` |
| `WavyUnderline` | SVG underline for accent words | `@/components/section-header` |
| `Badge` | Small label/tag pill | `@/components/ui/badge` |

---

## 7. Animation & Motion

### MotionPreset System

All animations use `MotionPreset` wrapper (Framer Motion v12):

```tsx
<MotionPreset
  fade                           // Fade in
  slide={{ direction: 'up' }}    // Slide direction: up/down/left/right
  blur                           // Optional blur-in effect
  transition={{ duration: 0.5 }} // Animation timing
  delay={0.3}                    // Stagger delay
  inView                         // Trigger on scroll into view
>
  {children}
</MotionPreset>
```

### Standard Animation Patterns

| Context | Direction | Delays | Blur |
|---------|-----------|--------|------|
| Section headers | `down` | 0 → 0.1 → 0.2 | No |
| Content grids | `up` | Stagger 0.15s increments | Optional |
| Hero elements | `down` | 0 → 0.15 → 0.3 → 0.45 | No |
| Cards in grid | `up` | 0 → 0.1 → 0.2 → 0.3 | Yes (uppercase variant) |

### Built-in Animations (globals.css)

| Animation | CSS Class/Variable | Purpose |
|-----------|--------------------|---------|
| Marquee | `--animate-marquee-horizontal/vertical` | Infinite scroll (logos, testimonials) |
| Cell ripple | `--animate-cell-ripple` | Pulsing opacity for decorative cells |
| Orbit | `--animate-orbit` | Circular motion for floating elements |

### Rules

- Always use `inView` for sections below the fold
- Stagger delays: 0.1-0.15s between sibling elements
- Duration: 0.5s standard, 0.3s for micro-interactions
- Do NOT add new keyframe animations unless absolutely necessary — use `MotionPreset` first

---

## 8. Custom CSS Patterns

### Button System (4 Tiers)

| Tier | Component/Class | Appearance | Usage Rule |
|------|----------------|------------|------------|
| **CTA (Tier 1)** | `<CraftButton>` + `btn-mirror-sweep btn-secondary` | Primary bg, icon circle, sweep | Max 1 per section. Hero, CTA banner only. |
| **Secondary (Tier 2)** | `<Button>` + `btn-secondary btn-mirror-sweep` | Primary bg, sweep (no icon circle) | Pricing highlights, card actions. |
| **Tertiary (Tier 3)** | `<Button>` + `btn-tertiary` | White bg, border, hover bg-primary/15 | Low-emphasis: "Learn more", secondary nav. |
| **Tertiary-Sweep (Tier 4)** | `<Button>` + `btn-tertiary-sweep btn-mirror-sweep` | White bg, border, primary-tinted sweep | Paired with CTA in hero sections. |

### Other Custom Classes

| Class | Purpose |
|-------|---------|
| `container` | Layout container utility |
| `.link-animated` | Hover underline animation (scaleX) |

- All buttons use `rounded-lg` (set in button.tsx base)
- All buttons default to `size="lg"` in marketing sections
- CraftButton is compound: `CraftButton > CraftButtonLabel + CraftButtonIcon`
- See `docs/button-system.md` for full spec with code examples

### Rules for Adding Custom CSS

1. **Try Tailwind first** — 90% of styling should be Tailwind utilities
2. **If reusable pattern** → add to `globals.css` as utility or class
3. **If one-off** → inline Tailwind, never create a separate CSS file
4. **NEVER** create component-scoped `.module.css` or `styled-components`
5. **NEVER** use `!important`
6. **NEVER** add `@font-face` outside `globals.css`

---

## 9. Dark Mode

### How It Works

- `next-themes` with `attribute="class"`, `defaultTheme="system"`
- `.dark` class toggles in `globals.css` — overrides all CSS variables
- Components use semantic tokens (`bg-background`, `text-foreground`) — auto-switch

### Rules

- **NEVER** use conditional dark mode classes in components (`dark:bg-gray-900`)
- **ALWAYS** use semantic tokens: `bg-background`, `text-foreground`, `border-border`
- If a component needs dark-mode-specific styling, add a new CSS variable in `globals.css`
- `ModeSwitcher` component handles the toggle — don't recreate

### Exceptions (allowed dark: prefix)

- Opacity adjustments: `dark:opacity-80` when a decorative element needs subtle change
- SVG fills that reference non-token colors (rare)

### Dark Theme Palette

The dark theme uses a **neutral palette** (0 chroma on all colors):

| Token | Light Value | Dark Value | Notes |
|-------|------------|------------|-------|
| `--background` | `oklch(1.00 0 0)` white | `oklch(0.14 0 0)` near-black | Page bg |
| `--foreground` | `oklch(0.32 0 0)` dark gray | `oklch(0.99 0 0)` near-white | Body text |
| `--card` | `oklch(1.00 0 0)` white | `oklch(0.20 0 0)` dark gray | Card surfaces |
| `--primary` | `oklch(0.19 0.11 270.80)` blue-purple | `oklch(0.92 0 0)` near-white | CTAs, links |
| `--secondary` | `oklch(0.97 0 0)` near-white | `oklch(0.27 0 0)` muted dark | Secondary surfaces |
| `--muted` | `oklch(0.98 0 0)` | `oklch(0.27 0 0)` | Disabled, placeholder |
| `--accent` | primary at 15% | `oklch(0.27 0 0)` | Hover states |
| `--border` | `oklch(0.93 0.01 261.82)` | `oklch(1.00 0 0 / 10%)` | White at 10% opacity |

Key: Dark theme has NO color saturation. All values use chroma `0` (pure grayscale) except light-mode primary/accent which retain blue-purple hue.

---

## 10. Block Adaptation Protocol

When installing a new shadcn studio block:

### Step 1: Install

```bash
npx shadcn@latest add "@ss-blocks/block-name"
```

### Step 2: Adapt Layout (MANDATORY)

1. **Remove** block's own container: `max-w-7xl`, `max-w-6xl`, `mx-auto px-4 sm:px-6 lg:px-8`
2. **Replace** with goads container: `<div className="container">`
3. **Remove** block's own nav/header/footer if present
4. **Remove** `border-x` if block has side borders (layout handles this)

### Step 3: Adapt Styling

1. **Replace** hardcoded colors with CSS variable tokens
2. **Replace** custom fonts with `font-sans` / `font-mono`
3. **Replace** custom shadows with `shadow-xs` through `shadow-2xl`
4. **Replace** custom border-radius with `rounded-sm/md/lg/xl`
5. **Verify** responsive breakpoints match goads patterns

### Step 4: Integrate Data

1. **Extract** static data to `src/data/[page]-[section].ts`
2. **Type** all data with TypeScript interfaces
3. **Pass** data as props, not hardcoded in the block

### Step 5: Add Motion

1. Wrap with `MotionPreset` if block lacks animation
2. Use `inView` for below-fold sections
3. Follow stagger delay patterns from section 7

### Checklist

- [ ] Container is `container` or `mx-auto max-w-[1416px] px-4 lg:px-6`
- [ ] No hardcoded colors (all use CSS variable tokens)
- [ ] No custom fonts (uses `--font-sans` / `--font-mono`)
- [ ] No block-owned nav/header/footer
- [ ] No `border-x` on the block itself
- [ ] Responsive: works at 375px, 768px, 1024px, 1440px+
- [ ] Dark mode: all colors auto-switch via tokens
- [ ] Data extracted to `src/data/` if applicable
- [ ] Animations use `MotionPreset` with `inView`

---

## 11. Page Templates

### Landing Page (`/`)

```
Hero (custom) → SectionDivider
Features Bento → SectionDivider
Stats → SectionDivider
Features Bento 2 → SectionDivider
Pricing → SectionDivider
Testimonials → SectionDivider
FAQ → SectionDivider
CTA Banner
```

### Inner Page (about, resources, milestone, etc.)

```
PageHero (label + heading + description + HeroGridBg)
SectionDivider
Content Section 1 → SectionDivider
Content Section 2 → SectionDivider
...
CTA Banner (cta-section-05)
```

### Blog Page

```
PageHero (with search input as children)
SectionDivider
Blog Grid/List
SectionDivider
CTA Banner
```

### Rules

- Every page ends with `CTASection` (cta-section-05) — no divider after it
- Every page starts with a hero — no divider before it
- Inner pages use `PageHero`, landing page uses custom hero
- Consistent `<main className="flex-1">` wrapper

---

## 12. Responsive Breakpoints

### Standard Breakpoints

```
sm:  640px   → Mobile landscape
md:  768px   → Tablet
lg:  1024px  → Desktop
xl:  1280px  → Wide desktop
2xl: 1536px  → Ultra wide
```

### Grid Patterns

| Context | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Feature cards | `grid-cols-1` | `md:grid-cols-2` | `lg:grid-cols-3` |
| Bento grid | `grid-cols-1` | `md:grid-cols-2` | `lg:grid-cols-3` |
| Pricing cards | `grid-cols-1` | `md:grid-cols-2` | `lg:grid-cols-3` |
| Two-column layout | `grid-cols-1` | `md:grid-cols-2` | `md:grid-cols-2` |
| Stats row | `grid-cols-2` | `grid-cols-2` | `grid-cols-4` |

### Navigation

- Desktop mega menu: `>= 1440px` (uses `min-[1440px]:` or custom breakpoint)
- Mobile drawer: `< 1440px`

---

## 13. Data Management

### Static Data Files

```
src/data/
├── landing-hero.ts              # Landing hero content
├── landing-stats.ts             # Stats section data
├── landing-bento.ts             # Bento grid content
├── landing-faq.ts               # FAQ tabs data
├── landing-reviews-pricing-faq.ts  # Reviews + pricing plans
└── [page]-[section].ts          # Pattern: page name + section name
```

### Rules

- All static content in `src/data/`, typed with TypeScript
- File naming: `[page]-[section].ts` (kebab-case)
- Export named constants (UPPER_CASE for arrays, camelCase for objects)
- Components receive data via props — never import data directly inside block components
- Page-colocated data OK for page-specific content (e.g., `app/bm/bm-page-data.tsx`)

---

## 14. Icon System

- **Primary**: Lucide React (`lucide-react`) — all UI icons
- **Custom SVGs**: `src/assets/svg/` — brand-specific graphics only
- Icon size defaults: `size-4` (16px) for inline, `size-5` (20px) for buttons, `size-6` (24px) for cards
- Always use `aria-hidden="true"` on decorative icons

---

## 15. Glossary

| Term | Meaning |
|------|---------|
| Block | A shadcn studio pre-built section (hero, pricing, FAQ, etc.) |
| Container | `mx-auto max-w-[1416px] px-4 lg:px-6` — the goads content width |
| Grid frame | Decorative vertical border lines at container edges |
| Corner dots | Diamond-shaped dots at grid frame intersections |
| Section divider | `SectionDivider` component — border + corner dots |
| Token | CSS custom property in `globals.css` (e.g., `--primary`) |
| Adapt | Process of modifying a shadcn block to match goads layout/tokens |

---

## Related Documents

| Doc | Purpose |
|-----|---------|
| [component-catalog.md](component-catalog.md) | UI primitives + blocks inventory |
| [routing-map.md](routing-map.md) | All routes with block composition |
| `app/src/app/globals.css` | Token source of truth (all CSS variables) |

---

## Appendix: Quick Reference Card

```
CONTAINER:     container  OR  mx-auto max-w-[1416px] px-4 lg:px-6
SECTION PAD:   py-8 sm:py-16 lg:py-24
SECTION GAP:   space-y-12 sm:space-y-16
HEADING:       text-2xl font-semibold sm:text-3xl lg:text-4xl
DESCRIPTION:   text-lg text-muted-foreground max-w-2xl
CARD GAP:      gap-6 sm:gap-8
DIVIDER:       <SectionDivider />
ANIMATION:     <MotionPreset fade slide={{ direction: 'up' }} inView>
HERO (inner):  <PageHero label="..." heading={...} description="..." />
CTA (all):     <CTASection /> (cta-section-05 — always last)
```
