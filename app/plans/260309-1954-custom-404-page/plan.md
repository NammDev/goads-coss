---
title: "Customize 404 Page to GoAds Design"
description: "Adapt error-page-04 block to use GoAds button hierarchy, oklch tokens, and design language"
status: pending
priority: P2
effort: 30m
branch: feat/tools
tags: [ui, 404, design]
created: 2026-03-09
---

# Custom 404 Page Plan

## Goal
Customize existing 404 page (`error-page-04` block) to match GoAds design guidelines: button hierarchy, typography, spacing, dark mode.

## Current State
- `src/app/not-found.tsx` — wrapper page with SiteHeader, Footer, grid frame lines (already correct)
- `src/components/shadcn-studio/blocks/error-page-04/error-page-04.tsx` — 31-line block with illustration + two plain `Button` components
- `src/assets/svg/error-04-illustration.tsx` — SVG illustration already uses CSS variables (`var(--foreground)`, `var(--primary)`, etc.) -- no changes needed

## Phases

| # | Phase | Status | File |
|---|-------|--------|------|
| 1 | Customize 404 page block | pending | [phase-01](./phase-01-customize-404-page.md) |

## Key Dependencies
- `CraftButton` from `@/components/ui/craft-button`
- `Button` from `@/components/ui/button`
- GoAds CSS classes: `btn-mirror-sweep`, `btn-secondary`, `btn-tertiary-sweep`
- SVG illustration already theme-aware -- no changes needed
