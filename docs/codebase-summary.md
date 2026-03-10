# Codebase Summary

> Quick reference for the GoAds codebase — structure, counts, and key files.

---

## Overview

GoAds is a static Next.js 16 marketing website for a Meta/Facebook ad infrastructure provider. No backend or database — all content is static TypeScript data files. Hosted on Vercel.

## Stats

| Metric | Count |
|--------|-------|
| Marketing pages | 21 |
| Tool pages | 20+ |
| Blog posts | 5 |
| UI components (`ui/`) | 45 |
| Shadcn-studio blocks | 25+ dirs |
| Shared components | 50+ |
| Data files | 31 |
| Documentation files | 14 |

## Key Files

| File | Purpose |
|------|---------|
| `app/src/app/layout.tsx` | Root layout — providers, header, footer, grid frame |
| `app/src/app/globals.css` | All design tokens, custom CSS, Tailwind config |
| `app/src/app/(marketing)/page.tsx` | Landing page |
| `app/src/components/site-header.tsx` | Sticky navigation |
| `app/src/components/section-header.tsx` | Reusable section header + WavyUnderline |
| `app/src/components/section-divider.tsx` | Border + diamond dots divider |
| `app/src/components/page-hero.tsx` | Inner page hero with grid bg |
| `app/src/components/ui/button.tsx` | CVA button with variants |
| `app/src/components/ui/craft-button.tsx` | Tier-1 CTA compound component |
| `app/src/components/ui/motion-preset.tsx` | Framer Motion animation wrapper |
| `app/src/lib/utils.ts` | `cn()` utility (clsx + tailwind-merge) |
| `app/src/lib/cart-context.tsx` | Shopping cart state provider |
| `app/next.config.ts` | React compiler + image domains |
| `app/components.json` | shadcn/shadcn-studio registry config |

## Route Groups

| Group | Path | Layout |
|-------|------|--------|
| `(marketing)` | `/`, `/about`, `/pricing`, `/blog`, etc. | SiteHeader + Footer + grid frame |
| `tools` | `/tools/*` | ToolsSidebar + ToolsHubContent |
| `docs` | `/docs/[[...slug]]` | DocsShell + DocsSidebar + DocsArticle |

## Component Layers

```
┌──────────────────────────────────────┐
│  Pages (app/src/app/)                │  Route-level, compose blocks
├──────────────────────────────────────┤
│  Shared Components (components/)     │  GoAds-specific, reused across pages
├──────────────────────────────────────┤
│  Blocks (shadcn-studio/blocks/)      │  Full-section components, adapted
├──────────────────────────────────────┤
│  UI Primitives (components/ui/)      │  Atoms: button, card, badge, etc.
└──────────────────────────────────────┘
```

## Data Flow

```
src/data/*.ts  →  page.tsx (import)  →  Block (props)  →  UI render
```

- No API calls, no database queries
- All content is compile-time static
- Cart state via React Context (client-side only, no persistence)

## Provider Hierarchy (layout.tsx)

```
ThemeProvider → CartProvider → TooltipProvider
  ├── CommandMenu (global search, cmd+K)
  ├── FloatingContactButton
  ├── ScrollToTop
  └── Sonner (toasts)
```

## External Integrations

| Service | Usage | Status |
|---------|-------|--------|
| Vercel | Hosting + analytics | Active |
| Telegram | Order redirect + support | Active |
| Cal.com | Sales booking (planned) | Planned |
| SePay | VietQR payments (planned) | Planned |
| Stripe | International payments (planned) | Planned |

## Build Commands

```bash
cd app
npm run dev      # Dev server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```
