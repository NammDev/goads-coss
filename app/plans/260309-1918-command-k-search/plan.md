---
title: "Command+K Search Palette"
description: "Global command menu for searching pages, tools, blog, docs, and FAQ"
status: pending
priority: P1
effort: 3h
branch: feat/tools
tags: [search, ux, navigation, command-palette]
created: 2026-03-09
---

# Command+K Search Palette

## Overview

Add a global Cmd+K / Ctrl+K command palette to GoAds website. Users can search across all site content (pages, tools, blog, docs, FAQ) and navigate instantly via keyboard.

## Architecture

- **Static client-side search** — no API, no server calls
- Unified search index built at module level from existing data files
- `cmdk` + shadcn `CommandDialog` (already installed)
- Mounted in root layout, available on every page

## Phases

| # | Phase | Status | File | Effort |
|---|-------|--------|------|--------|
| 1 | Search Data Index | pending | [phase-01](./phase-01-search-data-index.md) | 1h |
| 2 | Command Menu Component | pending | [phase-02](./phase-02-command-menu-component.md) | 1.5h |
| 3 | Header + Layout Integration | pending | [phase-03](./phase-03-header-integration.md) | 30m |

## Dependencies

- `cmdk@^1.1.1` — already installed
- `@/components/ui/command.tsx` — already exists
- `@/components/ui/dialog.tsx` — already exists
- No new packages needed

## Files

| Action | Path |
|--------|------|
| CREATE | `src/data/search-index.ts` |
| CREATE | `src/components/command-menu.tsx` |
| MODIFY | `src/components/site-header.tsx` |
| MODIFY | `src/app/layout.tsx` |

## Key Decisions

1. **cmdk handles filtering** — no custom search logic needed; pass `value` prop with searchable text
2. **5 search groups**: Pages, Tools, Blog, Docs, FAQ
3. **Icons per group**: lucide icons matching existing data (tools already have icons)
4. **Navigation via Next.js router** on item select
5. **No search history or analytics** — YAGNI
6. **No API/dynamic content** — all data is static TS files
