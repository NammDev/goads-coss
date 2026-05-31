# Phase 01 — Decisions & Exclusions

**Status:** TODO
**Priority:** Foundation — every later phase consults this table

## Overview

Lock down what gets renamed and what stays before any code moves. The 300-hit grep for "Foreplay" mixes real branding leaks with legitimate third-party names (the font "Inter Display", Cal.com slugs, etc.). Categorize first.

## Renames (DRY-applied — namespace-aware)

**Rule:** Inside a folder already named `goads/` (or `/public/goads/`, `lib/`, `data/`), drop the `foreplay-` prefix entirely instead of replacing with `goads-`. Outside namespaces (global CSS, PascalCase identifiers used across the codebase), keep the `goads-`/`Goads*` prefix to prevent collisions.

### CSS — keep `goads-` prefix (global namespace, anti-collision)

| Pattern | New value | Where it lives |
|---------|-----------|----------------|
| `--fp-*` CSS tokens (e.g. `--fp-solid-900`) | `--goads-*` | `globals.css`, every consumer |
| `--fp-alpha-*` | `--goads-alpha-*` | same |
| `--fp-solid-*` | `--goads-solid-*` | same |
| `--fp-lime-green` | `--goads-lime-green` | same |
| `--fp-nav-bg`, `--fp-border-nav` | `--goads-nav-bg`, `--goads-border-nav` | same |
| `.foreplay` CSS scope class | `.goads` | `globals.css:122`, every layout wrapper |

### Identifiers — keep `Goads*` / `goadsText` (PascalCase used across codebase)

| Pattern | New value | Where it lives |
|---------|-----------|----------------|
| `Foreplay*` PascalCase component names (1,138 hits) | `Goads*` (e.g. `ForeplayHeader` → `GoadsHeader`) | every consumer |
| `fpText` TS export | `goadsText` | `typography.ts` + every consumer |
| `FP_HERO_GRADIENT` export | `GOADS_HERO_GRADIENT` | same |

### Filenames — DROP prefix (already inside `goads/` namespace)

| Pattern | New value | Where it lives |
|---------|-----------|----------------|
| `foreplay-header.tsx` | **`header.tsx`** | `app/src/components/goads/` |
| `foreplay-footer.tsx` | **`footer.tsx`** | same |
| `foreplay-calendar-popup.tsx` | **`calendar-popup.tsx`** | same |
| `foreplay-typography.ts` | **`typography.ts`** | same |
| `foreplay-pricing-card.tsx` | **`pricing-card.tsx`** | same |
| `foreplay-*.tsx` (~100 total) | **drop `foreplay-` prefix** | same |
| `foreplay-*.ts` data files (~12) | **drop `foreplay-` prefix** (e.g. `foreplay-swipe-file-page-data.ts` → `swipe-file-page-data.ts`) | `app/src/data/` |
| `app/src/lib/foreplay-docs-tokens.ts` | **`app/src/lib/docs-tokens.ts`** | filesystem + import |

### Filesystem directories — rename to `goads/`

| Pattern | New value |
|---------|-----------|
| Component dir `app/src/components/foreplay/` | `app/src/components/goads/` |
| `/public/foreplay/` folder | `/public/goads/` |

### Public assets — DROP prefix (already inside `/public/goads/` namespace)

| Pattern | New value | Where it lives |
|---------|-----------|----------------|
| `/foreplay/goads/goads-meta-assets.webp` | **`/goads/meta-assets.webp`** | flatten + strip (phase 04) |
| `/foreplay/goads/goads-unban-extension.webp` | **`/goads/unban-extension.webp`** | same |
| ... (~12 nested files) | drop `goads-` prefix | same |
| `src="/foreplay/..."` references (591) | `src="/goads/..."` (+ prefix-strip where applicable) | every consumer |

### User-facing strings — replace with "GoAds"

| Pattern | New value |
|---------|-----------|
| User-facing "Foreplay" strings (metadata, alt text, copy) | "GoAds" (match case: "Foreplay" → "GoAds", "foreplay" → "goads") |

## Exclusions (no — keep as-is)

| Pattern | Why kept |
|---------|----------|
| `font-family: "Inter Display"` and `font-display` Tailwind class | Font name is published by rsms.me, not Foreplay branding |
| `font-display: var(--font-inter)` | CSS property, same reason |
| Cal.com event slugs (`team/foreplay/foreplay-demo-action-plan` if any in code) | External system identifier — only changeable in Cal.com dashboard |
| `docs/foreplay/` reference HTML/CSS | Internal reference for the `/clone-foreplay` skill — addressed in phase 05 (move or delete) |
| Comments that explain Foreplay-clone provenance (e.g. "// Source: foreplay-homepage-latest.html") | Useful breadcrumb for future maintainers; keep but reword to "// Source: Foreplay.co (cloned)" |
| `_legacy-foreplay/` directory contents | Decide in phase 05 — delete entirely if unused, otherwise rename |
| Git history / commit messages | Immutable history; future commits will say goads |
| Existing `goads-*.ts` data files | Already correctly named — touch only for import-path updates |

## Edge cases — resolved

- ✅ **Existing mixed files** (e.g. `foreplay-goads-extension-tool.tsx`, `goads-product-catalog-table.tsx`): under DRY rule, both lose any `foreplay-`/`goads-` prefix since they live in `components/goads/`. So `foreplay-goads-extension-tool.tsx` → `extension-tool.tsx`, `goads-product-catalog-table.tsx` → `product-catalog-table.tsx`.
- ✅ **`docs/foreplay/` folder fate** — **keep as-is** (internal reference source for `/clone-foreplay` skill, no runtime impact).
- ✅ **`docs/foreplay/changelog.md`** — stays with the dir.
- [ ] **`app/src/data/foreplay-*` files that have a corresponding `goads-*` file** — check for duplicates before renaming; one may already be the canonical version. Resolve during phase 03 execution.

## Todo

- [ ] Walk the renames table — flag any item the user wants to keep
- [ ] Walk the exclusions table — flag any item the user wants to rename anyway
- [ ] Resolve each edge case above with a definitive decision
- [ ] Commit phase-01 (this file) as the source of truth for later phases

## Success criteria

- Every later phase can answer "should I rename X?" by checking this file
- No surprises mid-execution about scope

## Risks

- **Half-applied decisions** — if a teammate touches the codebase mid-rename without consulting this doc, they may reintroduce old names. Mitigation: do the rename in a single focused PR window.

## Next

→ phase-02-css-layer.md
