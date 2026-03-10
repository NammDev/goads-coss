# GoAds — goads.shop

Marketing website for GoAds, a Meta/Facebook ad infrastructure provider. Replaces the original goads.shop.

## Quick Start

```bash
cd app
npm install
npm run dev      # http://localhost:3000
```

## Tech Stack

- **Next.js 16** (App Router, React 19, TypeScript 5.9)
- **Tailwind CSS 4** (oklch tokens, `globals.css` as single source)
- **shadcn/ui + shadcn-studio** (UI primitives + adapted blocks)
- **motion** (Framer Motion v12 — `MotionPreset` wrapper)
- **Vercel** (hosting, analytics, speed insights)

## Project Structure

```
app/src/
├── app/                          # Routes
│   ├── (marketing)/              #   21 marketing pages
│   ├── tools/                    #   20+ utility tools
│   ├── docs/                     #   Knowledge base (Fumadocs)
│   ├── layout.tsx                #   Root layout (header + footer + providers)
│   └── globals.css               #   All design tokens + custom CSS
├── components/
│   ├── ui/                       #   45 shadcn primitives
│   ├── shadcn-studio/blocks/     #   25+ adapted studio blocks
│   └── *.tsx                     #   50+ shared components
├── data/                         #   31 static data files (no backend)
├── lib/                          #   Utilities (cart-context, cn)
└── hooks/                        #   Custom hooks
```

## Documentation

All docs in `docs/` — **read these before adding features**:

| Doc | What it covers |
|-----|---------------|
| **[project-overview-pdr.md](docs/project-overview-pdr.md)** | Business context, products, personas, success metrics |
| **[code-standards.md](docs/code-standards.md)** | Tech stack, naming, TypeScript, styling rules, anti-patterns |
| **[design-guidelines.md](docs/design-guidelines.md)** | Full design system: colors, typography, layout, buttons, animations, dark mode, block adaptation, data patterns |
| **[system-architecture.md](docs/system-architecture.md)** | Rendering strategy, component layers, state, SEO |
| **[codebase-summary.md](docs/codebase-summary.md)** | Quick reference: stats, key files, data flow, build commands |
| **[component-catalog.md](docs/component-catalog.md)** | All UI primitives, blocks, shared components with imports |
| **[routing-map.md](docs/routing-map.md)** | All routes, hero types, block composition per page |
| **[development-roadmap.md](docs/development-roadmap.md)** | 3-phase feature plan: MVP → Portal → Growth |
| **[deployment-guide.md](docs/deployment-guide.md)** | Vercel setup, env vars, build, troubleshooting |
| **[project-changelog.md](docs/project-changelog.md)** | Change history |

## Key Rules

- **Container**: `mx-auto max-w-[1416px] px-4 lg:px-6` (never `max-w-7xl`)
- **Colors**: CSS variables only (oklch in `globals.css`), never hardcode
- **Pages**: `PageHero → SectionDivider → Blocks → SectionDivider → CTASection`
- **Data**: Static files in `src/data/`, pass to blocks as props
- **Buttons**: 4-tier hierarchy — CraftButton (CTA), secondary, tertiary, tertiary-sweep
- **Animation**: `<MotionPreset>` wrapper, never raw `motion.div`
- **Dark mode**: Semantic tokens auto-switch, no `dark:bg-[#xxx]`
- **File size**: Max 200 lines per code file

## Products

Meta Agency Accounts · Facebook Profiles · Business Managers · Google Whitelisted · TikTok Verified · Blue Verification · Facebook Pages · Unban Service

## License

Private. All rights reserved.
