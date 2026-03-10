# Code Standards

> Coding conventions, patterns, and rules for the GoAds codebase.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.1.6 |
| Language | TypeScript (strict) | 5.9.3 |
| Runtime | React | 19.2.3 |
| Styling | Tailwind CSS | 4.0 |
| UI Library | shadcn/ui + shadcn-studio | latest |
| Animation | motion (Framer Motion) | 12.34.5 |
| Icons | Lucide React | 0.577.0 |
| Fonts | Geist (npm) | 1.7.0 |
| Analytics | Vercel Analytics + Speed Insights | latest |
| Compiler | React Compiler (babel plugin) | 1.0.0 |

## File Naming

- **kebab-case** for all files: `product-catalog-grid.tsx`, `landing-faq.ts`
- Component files: `.tsx`
- Data/utility files: `.ts`
- Never `.js` or `.jsx`
- Name files descriptively — LLMs should understand purpose from filename alone

## File Size

- Max 200 lines per code file
- Split large components into sub-modules
- Extract utilities into separate files
- Co-locate related sub-components in block directories

## Directory Structure

```
app/src/
├── app/                          # Next.js routes
│   ├── (marketing)/              # Marketing pages route group
│   │   ├── page.tsx              # Landing page
│   │   └── [route]/page.tsx      # Inner pages
│   ├── tools/                    # Utility tools
│   ├── docs/                     # Documentation (Fumadocs)
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # All design tokens + custom CSS
│   ├── robots.ts                 # SEO robots
│   └── sitemap.ts                # Dynamic sitemap
├── components/
│   ├── ui/                       # shadcn primitives (45+ files)
│   ├── shadcn-studio/blocks/     # Adapted studio blocks (25+ dirs)
│   └── *.tsx                     # Shared page components
├── data/                         # Static data files (31 files)
├── lib/                          # Utilities (cart-context, utils)
├── hooks/                        # Custom hooks
├── fonts/                        # Font config
└── assets/                       # SVG assets
```

## Component Patterns

### Naming
- Components: `PascalCase` (e.g., `ProductCatalog`)
- Files: `kebab-case.tsx` (e.g., `product-catalog.tsx`)
- Block dirs: match registry name (e.g., `bento-grid-19/`)

### Imports
```tsx
// UI primitives
import { Button } from '@/components/ui/button'
// Shared components
import { SectionHeader } from '@/components/section-header'
// Blocks (main export only)
import BentoGrid19 from '@/components/shadcn-studio/blocks/bento-grid-19/bento-grid-19'
// Data (import in page, pass as props)
import { faqTabsData } from '@/data/landing-faq'
```

### Page Structure
```tsx
export default function SomePage() {
  return (
    <main className="flex-1">
      <PageHero label="..." heading={...} description="..." />
      <SectionDivider />
      <ContentBlock data={data} />
      <SectionDivider />
      <CTASection />
    </main>
  )
}
```

## TypeScript

- Strict mode enabled
- Path alias: `@/*` → `./src/*`
- Target: ES2017
- Export interfaces alongside data in the same file
- Use `interface` over `type` for object shapes
- No `any` — define proper types

## Styling Rules

- **Tailwind utilities first** — 90% of styling
- **CSS variables** for design tokens — defined in `globals.css`
- **Semantic classes**: `bg-primary`, `text-foreground`, `border-border`
- **Never** hardcode colors in components
- **Never** create `.module.css` or styled-components
- **Never** use `!important`
- Dark mode handled by CSS variable override — no `dark:bg-[#xxx]`
- See `design-guidelines.md` for full design system

## Data Layer

- All static content in `src/data/[page]-[section].ts`
- Arrays: `UPPER_CASE` exports
- Objects: `camelCase` exports
- Interfaces: `PascalCase`, co-located with data
- Data flows: data file → page → block props (never import data inside blocks)
- See `data-patterns.md` for details

## Error Handling

- Use try-catch for async operations
- Validate at system boundaries (user input, external APIs)
- Don't over-validate internal code paths
- Use Sonner for user-facing error toasts

## SEO

- `robots.ts`: Allow all except `/api/` and `/shopping-cart-02`
- `sitemap.ts`: Dynamic generation from routes + blog posts + tools
- OG metadata in root layout
- Semantic HTML: proper heading hierarchy, landmarks

## Linting

- ESLint 9 with `next/core-web-vitals` + TypeScript config
- Ignores: `.next/`, `out/`, `build/`
- Run `pnpm lint` (or `npm run lint`) before commits
- Prioritize functionality over strict style enforcement

## Anti-Patterns

| Don't | Do Instead |
|-------|-----------|
| Create `enhanced-*.tsx` variants | Edit existing files directly |
| Use raw `motion.div` | Use `<MotionPreset>` wrapper |
| Import data inside blocks | Import in page, pass as props |
| Add `border-b` between sections | Use `<SectionDivider />` |
| Include nav/footer in page components | Layout handles these |
| Use `max-w-7xl` container | Use `container` utility |
