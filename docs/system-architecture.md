# System Architecture

> Technical architecture of the GoAds marketing website — rendering strategy, component system, and data flow.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────┐
│                    Vercel CDN                    │
│              (Edge + Static Assets)              │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│              Next.js 16 App Router               │
│  ┌─────────────┬──────────────┬───────────────┐ │
│  │ (marketing) │    tools     │     docs      │ │
│  │  21 pages   │   20+ tools  │  catch-all    │ │
│  └─────────────┴──────────────┴───────────────┘ │
│  ┌──────────────────────────────────────────────┐│
│  │         Static Data Layer (src/data/)        ││
│  │         31 TypeScript data files             ││
│  └──────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
```

## Rendering Strategy

| Route Group | Strategy | Notes |
|-------------|----------|-------|
| `(marketing)/*` | Static (SSG) | All pages pre-rendered at build time |
| `tools/*` | Client-side | Interactive tools run in browser |
| `docs/[[...slug]]` | Static (SSG) | MDX content pre-rendered |
| `blog/[slug]` | Static (SSG) | Blog posts from data file |

- No SSR — all pages are statically generated
- No ISR — content changes require rebuild
- No API routes (except `robots.ts`, `sitemap.ts` which are build-time)
- React Compiler enabled for automatic memoization

## Component Architecture

### Layer Hierarchy

| Layer | Location | Count | Responsibility |
|-------|----------|-------|---------------|
| Pages | `app/src/app/` | 40+ | Route composition, data import |
| Shared | `components/*.tsx` | 50+ | GoAds-specific reusable components |
| Blocks | `shadcn-studio/blocks/` | 25+ | Full-section adapted components |
| Primitives | `components/ui/` | 45 | Atomic UI components (shadcn) |

### Key Shared Components

| Component | Type | Usage |
|-----------|------|-------|
| `SiteHeader` | Layout | Sticky nav, mega menu (desktop), drawer (mobile) |
| `SectionHeader` | Content | Label + heading + description with MotionPreset |
| `SectionDivider` | Layout | Border line + diamond dots between sections |
| `PageHero` | Content | Inner page hero with HeroGridBg |
| `ProductPageTemplate` | Template | Shared product page layout |
| `ComingSoonHero` | Content | Placeholder for unreleased products |
| `CTASection` | Content | cta-section-05 block, used on all pages |

## Layout System

### Root Layout Structure

```tsx
<html>
  <body className={fontVars}>
    <ThemeProvider>
      <CartProvider>
        <TooltipProvider>
          <div className="layout-wrapper">
            {/* Grid frame: vertical borders + corner dots */}
            <SiteHeader />      {/* sticky, z-40, blur backdrop */}
            {children}          {/* page content */}
            <SiteFooter />      {/* footer-component-02 */}
          </div>
          <CommandMenu />       {/* cmd+K search */}
          <FloatingContactButton />
          <ScrollToTop />
          <Sonner />
        </TooltipProvider>
      </CartProvider>
    </ThemeProvider>
  </body>
</html>
```

### Container System

```
Viewport width
├── Grid frame borders (1px, bg-border/64)
├── Container: max-w-[1416px], mx-auto, px-4 lg:px-6
│   └── Content area
└── Corner dots at header/footer intersections
```

## State Management

| State | Mechanism | Scope |
|-------|-----------|-------|
| Theme (dark/light) | `next-themes` (class strategy) | Global, persisted in localStorage |
| Cart | React Context (`CartProvider`) | Global, client-side only, no persistence |
| Search | `cmdk` command palette | Global, triggered by cmd+K |
| Tool state | Component-local `useState` | Per-tool page |

No external state management library (no Redux, Zustand, Jotai).

## Styling Architecture

```
globals.css (single source of truth)
├── @theme inline { ... }         # Tailwind v4 token mapping
├── :root { ... }                 # Light mode CSS variables (oklch)
├── :root.dark, .dark { ... }     # Dark mode overrides
├── @utility container { ... }    # GoAds container
├── .btn-* { ... }                # Button system classes
├── .link-animated { ... }        # Hover underline animation
└── @keyframes { ... }            # Marquee, ripple, orbit
```

- No component-scoped CSS files
- No CSS-in-JS (no styled-components)
- Tailwind utilities for 90% of styling
- CSS variables for design tokens
- Custom CSS classes only for reusable patterns

## Animation System

| Layer | Technology | Usage |
|-------|-----------|-------|
| Entrance | `MotionPreset` (motion library) | Fade, slide, zoom, blur on scroll |
| Micro | CSS transitions | Hover effects, button states |
| Decorative | CSS @keyframes | Marquee, orbit, ripple |
| Reduced motion | `prefers-reduced-motion` | Respects OS setting |

## SEO & Metadata

- `robots.ts`: Allow all, disallow `/api/`, `/shopping-cart-02`
- `sitemap.ts`: Dynamic from routes + blog + tools
- OG image in root layout metadata
- Semantic HTML throughout
- `@tailwindcss/typography` for blog prose

## Security Considerations

- No user input persisted (Phase 1)
- HTML sanitized via `isomorphic-dompurify` for blog content
- No API keys exposed in client code
- External links use `rel="noopener noreferrer"`
- CSP headers managed by Vercel

## Performance Optimizations

- React Compiler for automatic memoization
- Static generation (no server runtime)
- Image optimization via `next/image` with remote patterns
- Font loading via `geist` npm package (no FOUT)
- Vercel CDN edge caching
- Bundle analysis available via `@next/bundle-analyzer`

## Future Architecture (Phase 2)

```
┌──────────────────────────────────────┐
│          Next.js App Router          │
│  ┌──────────┐  ┌──────────────────┐ │
│  │ Marketing │  │ Customer Portal  │ │
│  │  (static) │  │  (SSR + auth)   │ │
│  └──────────┘  └────────┬─────────┘ │
│                         │            │
│  ┌──────────────────────▼──────────┐ │
│  │    API Routes / Server Actions  │ │
│  └──────────────────────┬──────────┘ │
└─────────────────────────┼────────────┘
                          │
┌─────────────────────────▼────────────┐
│  Database (PostgreSQL)               │
│  Auth (Better Auth / Clerk)          │
│  Payments (SePay + Stripe)           │
└──────────────────────────────────────┘
```
