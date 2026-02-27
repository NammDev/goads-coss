---
title: "GoAds Landing Page - Core Conversion Template"
description: "7-section landing page using shadcn studio blocks with GoAds branding and content"
status: superseded
priority: P1
effort: 6h
branch: main
tags: [landing-page, shadcn-studio, conversion]
created: 2026-02-26
superseded_by: ../260226-1902-goads-landing-page-v2/plan.md
superseded_on: 2026-02-26
---

> **OUTDATED** — This plan is superseded by the v2 plan (11 sections, 3-phase structure).
> New plan: [`260226-1902-goads-landing-page-v2/plan.md`](../260226-1902-goads-landing-page-v2/plan.md)
> Do not implement from this file.

# GoAds Landing Page

Build a 7-section conversion-focused landing page using shadcn studio blocks.

## Architecture

- Blocks installed via `npx shadcn@latest add @ss-blocks/{name}`
- Each block lives in `src/components/shadcn-studio/blocks/`
- Content customized per migration docs
- **MANDATORY: Every block MUST match the existing goads layout system**
- Sections composed in `src/app/page.tsx`

## CRITICAL: Layout Matching Rules

Every shadcn studio block MUST be adapted to match the goads layout:

1. **Container**: Strip block's own `max-w-7xl border-x px-4 sm:px-6 lg:px-8` → use goads `container` (`mx-auto max-w-[1416px] px-4 lg:px-6`)
2. **Grid frame lines**: Layout has vertical border lines at container edges + corner dots at header/footer intersections. Blocks must align within these lines.
3. **Header**: SiteHeader is in layout.tsx (sticky, z-40, bg-sidebar/80, `--header-height:4rem`). Blocks must NOT include their own headers/navbars.
4. **Footer**: SiteFooter is in layout.tsx with corner dots. Footer block should either replace it or render above it.
5. **Border consistency**: Use `border-b` for section separators (matching `border-border/64` style from layout).
6. **Background**: Respect `bg-sidebar` body background. Use section-level backgrounds only where needed.
7. **Spacing**: No double-padding or nested containers. Each section gets one `container` wrapper max.

## Existing Infrastructure (Keep As-Is)

- `layout.tsx` - Container with vertical grid lines + corner dots
- `site-header.tsx` - Sticky header (needs nav link updates)
- `site-footer.tsx` - Simple copyright (replaced by phase-07 footer block)
- `globals.css` - Color tokens, container utility (`mx-auto max-w-[1416px] px-4 lg:px-6`)
- Fonts: CalSans heading, CalSansUI body, PaperMono mono

## Phases

| # | Phase | Status | File |
|---|-------|--------|------|
| 0 | Branding & Setup Prep | pending | [phase-00](phase-00-branding-setup.md) |
| 1 | Hero Section | pending | [phase-01](phase-01-hero-section.md) |
| 2 | Features Section | pending | [phase-02](phase-02-features-section.md) |
| 3 | Pricing Section | pending | [phase-03](phase-03-pricing-section.md) |
| 4 | Testimonials Section | pending | [phase-04](phase-04-testimonials-section.md) |
| 5 | FAQ Section | pending | [phase-05](phase-05-faq-section.md) |
| 6 | CTA Banner Section | pending | [phase-06](phase-06-cta-banner-section.md) |
| 7 | Footer Section | pending | [phase-07](phase-07-footer-section.md) |
| 8 | Final Composition & QA | pending | [phase-08](phase-08-final-composition.md) |

## Key Dependencies

- shadcn studio MCP tools for block discovery (get-blocks-metadata, collect_selected_blocks)
- `components.json` registries already configured with auth
- Hero-section-40 installed but has Orion AI content -- needs replacement or full content swap
- User picks specific block variants before each phase

## Content Sources

- Brand identity: `migration-docs/01-brand-identity.md`
- Homepage content: `migration-docs/02-homepage-content.md`
- Product catalog: `migration-docs/04-product-catalog.md`
- Navigation: `migration-docs/06-navigation-structure.md`
- SEO: `migration-docs/05-seo-metadata.md`
