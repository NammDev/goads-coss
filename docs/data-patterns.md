# Data Patterns
> Conventions for static data files in `src/data/` — naming, structure, TypeScript interfaces, and props flow.

---

## Overview

All static page content (copy, lists, config arrays) lives in `src/data/` as TypeScript modules. Data is never hardcoded inside block components or page files — it is defined in a data file, imported into the page, and passed to blocks as props. This separation keeps blocks reusable and content editable without touching component logic. Every data file exports typed interfaces alongside the data so consumers get full type safety.

## Rules (MANDATORY)

- DO place all static content in `src/data/[page]-[section].ts`
- DO export TypeScript interfaces from the same file as the data
- DO use UPPER_CASE for exported arrays, camelCase for exported objects
- DO import data in the page file and pass to block via props — never import inside a block
- NEVER hardcode copy (strings, arrays) directly inside a block component
- NEVER use `.js` — all data files must be `.ts` (or `.tsx` if they contain JSX)
- DO co-locate the interface definition with the data it describes

---

## File Inventory (`src/data/`)

| File | Contents | Used By |
|------|---------|---------|
| `blog-posts.ts` | Blog post array with slug, title, content, metadata | `/blog`, `/blog/[slug]` |
| `docs-articles.tsx` | Docs article definitions (may contain JSX) | `/docs/[[...slug]]` |
| `docs-navigation.ts` | Docs sidebar navigation tree | `/docs` DocsShell |
| `landing-bento.ts` | Bento grid card data | `/` BentoGrid19 |
| `landing-faq.ts` | FAQ tabs data array | `/`, `/pricing`, `/faq` |
| `landing-hero.ts` | Hero rotating words, avatar list, platform logos | `/` HeroClone |
| `landing-reviews-pricing-faq.ts` | Reviews array + pricing plans | `/` TestimonialsComponent22, PricingComponent13 |
| `landing-stats.ts` | Stats section numbers and labels | `/` StatsSection |
| `tools-registry.ts` | Tool definitions (name, route, icon, description) | `/tools` ToolsHubContent |

---

## File Location Rule

```
src/data/[page]-[section].ts
```

| Segment | Rule | Example |
|---------|------|---------|
| `[page]` | Lowercase page name or `landing` for homepage | `landing`, `blog`, `docs`, `tools` |
| `[section]` | Kebab-case block/section name | `hero`, `faq`, `stats`, `bento`, `reviews-pricing-faq` |

If data is shared across multiple pages (e.g. FAQ), name by content — not page: `landing-faq.ts` is imported by `/`, `/pricing`, `/faq`.

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Exported array | UPPER_CASE | `ROTATE_WORDS`, `AVATARS`, `PLATFORM_LOGOS` |
| Exported object | camelCase | `faqTabsData`, `pricingPlans` |
| TypeScript interface | PascalCase | `AvatarItem`, `PlatformLogo`, `ReviewCard` |
| Array item type | PascalCase singular | `BrandLogo` (not `BrandLogos`) |

---

## TypeScript Interface Patterns

### Simple item interface

```ts
// src/data/landing-hero.ts
export interface AvatarItem {
  id: string
  alt: string
  fallback: string
}

export const AVATARS: AvatarItem[] = [
  { id: 'avatar-38', alt: 'client', fallback: 'C1' },
]
```

### Nested / union interfaces

```ts
// src/data/landing-faq.ts
export interface FaqItem {
  question: string
  answer: string
}

export interface FaqTab {
  label: string
  value: string
  items: FaqItem[]
}

export const faqTabsData: FaqTab[] = [
  {
    label: 'General',
    value: 'general',
    items: [
      { question: '...', answer: '...' },
    ],
  },
]
```

### Importing a type from a block

When a data file needs a type defined by a block component, import the type from the block:

```ts
// src/data/landing-reviews-pricing-faq.ts
import type { ReviewCard } from '@/components/shadcn-studio/blocks/testimonials-component-22/review-stack'

export const reviews: ReviewCard[] = [...]
```

---

## Props Passing Rule

Data always flows: **data file → page → block props**. Never import data directly inside a block.

```tsx
// src/app/(marketing)/page.tsx  ← CORRECT
import { reviews, pricingPlans } from '@/data/landing-reviews-pricing-faq'
import { faqTabsData } from '@/data/landing-faq'

export default function Page() {
  return (
    <main className="flex-1">
      <Pricing plans={pricingPlans} />
      <TestimonialsComponent reviews={reviews} />
      <FAQ tabsData={faqTabsData} />
    </main>
  )
}
```

```tsx
// src/components/shadcn-studio/blocks/pricing-component-13/pricing-component-13.tsx  ← CORRECT
interface Props {
  plans: PricingPlan[]
}
export default function Pricing({ plans }: Props) { ... }
```

---

## Anti-Patterns

| Anti-Pattern | Fix |
|---|---|
| `import { AVATARS } from '@/data/landing-hero'` inside a block | Import in page, pass as prop |
| Hardcoded array inside block: `const features = ['...', '...']` | Extract to `src/data/[page]-[section].ts` |
| Data file named `data.ts` or `constants.ts` | Use `[page]-[section].ts` naming |
| Using `any` type for data arrays | Define and export a TypeScript interface |
| `.js` extension for data file | Always use `.ts` (or `.tsx` for JSX content) |
| Mutating exported arrays in components | Treat all exported data as readonly |

## See Also

- `docs/block-adaptation.md` — Step 4 (extract data) in adaptation process
- `docs/routing-map.md` — which data files are consumed by which pages
- `app/src/data/` — all data files source
