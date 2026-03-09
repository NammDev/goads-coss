# Block Adaptation
> 5-step process for installing a shadcn-studio block and adapting it to GoAds standards.

---

## Overview

Shadcn-studio blocks are installed via CLI into `src/components/shadcn-studio/blocks/[block-name]/`. Every block needs adaptation before use: layout must use the GoAds container utility, design tokens must map to CSS variables, any embedded navigation or footer must be removed, data must be extracted to `src/data/`, and entrance animations must wrap key elements in `MotionPreset`. Never use a block as-is — the adaptation step is mandatory.

## Rules (MANDATORY)

- DO install blocks via the shadcn-studio CLI — never copy-paste manually
- DO adapt layout immediately after install — do not commit unadapted blocks
- NEVER let a block define its own `max-w-7xl`, `px-4 sm:px-6 lg:px-8`, or `border-x` — strip them
- NEVER keep embedded `<header>`, `<nav>`, or `<footer>` inside a block — remove entirely
- DO extract all copy (headings, descriptions, feature lists) to `src/data/`
- DO replace all hardcoded colors with semantic Tailwind token classes
- DO wrap entrance elements with `<MotionPreset>` using `fade` + `slide` props

---

## 5-Step Adaptation Process

### Step 1 — Install via CLI

```bash
npx shadcn@latest add [block-name]
# Files land in src/components/shadcn-studio/blocks/[block-name]/
```

### Step 2 — Adapt Layout

Remove the block's own container and replace with the GoAds container utility.

```tsx
// BEFORE (block default)
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-x">

// AFTER (GoAds standard)
<div className="container">
```

- Strip `border-x` from the outer wrapper
- Strip `max-w-*` from the section element if it conflicts
- Ensure the section has its own vertical padding: `py-12 md:py-16 lg:py-24`
- Remove any sticky `<header>` or `<nav>` elements — `SiteHeader` handles navigation

### Step 3 — Adapt Styling

| Item | Action |
|------|--------|
| Hardcoded colors (`#fff`, `gray-900`, etc.) | Replace with `bg-background`, `text-foreground`, semantic tokens |
| Font classes (`font-heading`, `font-display`) | Replace with `font-semibold` — no `--font-heading` token exists |
| Shadow literals (`shadow-[0_4px_...]`) | Replace with `shadow-md`, `shadow-lg`, etc. |
| Border radius (`rounded-2xl` on buttons) | Replace with `rounded-lg` for buttons |
| Hover states on nav items | Use `hover:bg-primary/15` for consistency |

### Step 4 — Extract Data to `src/data/`

Move all static content out of the block file.

```ts
// src/data/[page]-[section].ts
export const FEATURE_LIST: FeatureItem[] = [
  { title: '...', description: '...' },
]
```

- File naming: `[page]-[section].ts` (e.g. `landing-faq.ts`, `landing-stats.ts`)
- Arrays: UPPER_CASE identifiers
- Objects: camelCase identifiers
- Export TypeScript interfaces alongside data
- Pass data as props from the page file, not imported directly inside the block

### Step 5 — Add MotionPreset Animations

```tsx
import { MotionPreset } from '@/components/ui/motion-preset'

// Section heading
<MotionPreset fade slide={{ direction: 'down' }} transition={{ duration: 0.5 }} inView>
  <SectionHeader label="..." heading={...} />
</MotionPreset>

// Card grid — stagger with delay
{items.map((item, i) => (
  <MotionPreset key={item.id} fade zoom={{ initialScale: 0.95 }} delay={i * 0.1} inView>
    <Card>...</Card>
  </MotionPreset>
))}
```

- Always set `inView` on scroll-triggered animations
- Stagger card grids with `delay={index * 0.1}`
- Hero elements: use `slide={{ direction: 'down' }}` + `fade` + optional `blur`

---

## Verification Checklist

Before committing an adapted block, confirm all 10 items:

- [ ] No `max-w-7xl` in block wrapper
- [ ] No `border-x` in block wrapper
- [ ] No `px-4 sm:px-6 lg:px-8` — uses `container` utility instead
- [ ] No `<header>`, `<nav>`, `<footer>` inside block
- [ ] No hardcoded color values (`#`, `rgb()`, raw `oklch()`)
- [ ] No `font-heading` or `font-display` class
- [ ] All static copy extracted to `src/data/`
- [ ] Data passed as props from the page file
- [ ] Key elements wrapped in `<MotionPreset>`
- [ ] Block renders correctly in both light and dark mode

---

## Common Gotchas

| Gotcha | Description | Fix |
|--------|-------------|-----|
| `dark:` overrides fighting tokens | Block uses `dark:bg-gray-900` etc. | Remove; let semantic tokens handle dark mode |
| Double container padding | Block has `px-*` AND page wraps in `container` | Remove block's own padding |
| Embedded hero nav | Block includes sticky nav in section | Strip nav — never needed inside a block |
| `font-heading` class | Doesn't exist in this project | Replace with `font-semibold` |
| Static images in block | Block imports local images | Move to `/public/images/` or use CDN URLs |
| `z-index` conflicts | Block's sticky element fights SiteHeader (z-40) | Use `z-10` or lower for block elements |
| Framer motion direct usage | Block uses `motion.div` directly | Wrap with `<MotionPreset>` instead |

---

## Code Example — Adapted Section Shell

```tsx
// src/components/shadcn-studio/blocks/my-block/my-block.tsx
import { SectionHeader } from '@/components/section-header'
import { MotionPreset } from '@/components/ui/motion-preset'

interface MyBlockProps {
  items: MyBlockItem[]
}

export default function MyBlock({ items }: MyBlockProps) {
  return (
    <section className="py-12 md:py-16 lg:py-24">
      <div className="container">
        <MotionPreset fade slide={{ direction: 'down' }} transition={{ duration: 0.5 }} inView>
          <SectionHeader label="Section Label" heading="Section Heading" />
        </MotionPreset>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <MotionPreset key={item.id} fade zoom={{ initialScale: 0.95 }} delay={i * 0.1} inView>
              {/* card content */}
            </MotionPreset>
          ))}
        </div>
      </div>
    </section>
  )
}
```

## Anti-Patterns

| Anti-Pattern | Fix |
|---|---|
| Adapting directly in the installed file before reading it | Read full file first, plan all changes, then edit |
| Leaving TODO comments in adapted blocks | Complete adaptation before committing |
| Importing data inside the block file | Data flows page → block via props only |
| Adding `SectionDivider` inside the block | `SectionDivider` goes in the page file between blocks |

## See Also

- `docs/component-catalog.md` — block inventory
- `docs/routing-map.md` — which page each block belongs to
- `docs/data-patterns.md` — data file conventions
- `docs/color-system.md` — token reference for styling adaptation
