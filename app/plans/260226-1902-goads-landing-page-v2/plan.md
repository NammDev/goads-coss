---
title: "GoAds Landing Page v2 - 11-Section Full Build"
status: active
priority: P1
effort: 8h
created: 2026-02-26
supersedes: ../260226-1646-goads-landing-page/plan.md
---

# GoAds Landing Page v2

Full 11-section landing page. Expands v1 (7 sections) with Logo Marquee, Bento Grid, How It Works, and Stats sections informed by competitor analysis.

## Architecture

- Blocks installed via `npx shadcn@latest add @ss-blocks/{name}` (shadcn studio MCP)
- Blocks live in `src/components/shadcn-studio/blocks/`
- Composed in `src/app/page.tsx`
- Layout (`layout.tsx`): SiteHeader + SiteFooter + vertical grid lines + corner dots

## Layout Matching Rules (MANDATORY)

1. **Container**: Strip block's `max-w-7xl border-x px-4 sm:px-6 lg:px-8` → use `mx-auto max-w-[1416px] px-4 lg:px-6`
2. **Header**: SiteHeader in layout.tsx (sticky, z-40). Blocks MUST NOT include their own nav
3. **Footer**: Footer block replaces SiteFooter or renders above it
4. **Borders**: Use `border-b` for section separators
5. **Background**: Respect `bg-sidebar` body; use section-level bg only where needed
6. **No double-padding**: One `container` per section max

## Phases

| # | Phase | Status | Effort | File |
|---|-------|--------|--------|------|
| 1 | Branding & Setup | pending | 30m | [phase-01](phase-01-branding-setup.md) |
| 2 | Section Blocks (11) | pending | 6h | [phase-02](phase-02-section-blocks.md) |
| 3 | Final Polish & QA | pending | 1h | [phase-03-final-polish.md](phase-03-final-polish.md) |

## Content Sources

- Brand identity: `migration-docs/01-brand-identity.md`
- Homepage content: `migration-docs/02-homepage-content.md`
- Product catalog: `migration-docs/04-product-catalog.md`
- SEO: `migration-docs/05-seo-metadata.md`
- Navigation: `migration-docs/06-navigation-structure.md`
- Competitor analysis: `plans/reports/competitor-hero-analysis-260226-1708-goads-hero-research.md`

## Key Dependencies

- shadcn studio MCP: `get-blocks-metadata`, `collect_selected_blocks` tools required
- `components.json` registries configured with auth
- hero-section-40 currently installed → will be REPLACED in Phase 2, Section 1
