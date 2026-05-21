# Phase 01 — Decisions & Exclusions

**Status:** TODO
**Priority:** Foundation — every later phase consults this table

## Overview

Lock down what gets renamed and what stays before any code moves. The 300-hit grep for "Foreplay" mixes real branding leaks with legitimate third-party names (the font "Inter Display", Cal.com slugs, etc.). Categorize first.

## Renames (yes — purge)

| Pattern | New value | Where it lives |
|---------|-----------|----------------|
| `--fp-*` CSS tokens (e.g. `--fp-solid-900`) | `--goads-*` | `globals.css`, every consumer |
| `--fp-alpha-*` | `--goads-alpha-*` | same |
| `--fp-solid-*` | `--goads-solid-*` | same |
| `--fp-lime-green` | `--goads-lime-green` | same |
| `--fp-nav-bg`, `--fp-border-nav` | `--goads-nav-bg`, `--goads-border-nav` | same |
| `.foreplay` CSS scope class | `.goads` | `globals.css:122`, every layout wrapper |
| `fpText` TS export | `goadsText` | `foreplay-typography.ts`, every consumer |
| `FP_HERO_GRADIENT` export | `GOADS_HERO_GRADIENT` | same |
| `Foreplay*` PascalCase component names (1,138 hits) | `Goads*` | every `foreplay-*.tsx` + every import |
| `foreplay-*.tsx` file names (~100) | `goads-*.tsx` | `app/src/components/foreplay/` (also rename dir → `goads/`) |
| `foreplay-*.ts` data files (~12) | `goads-*.ts` | `app/src/data/` |
| `/public/foreplay/` folder | `/public/goads/` | filesystem rename |
| `src="/foreplay/..."` references (591) | `src="/goads/..."` | every consumer |
| Component dir `app/src/components/foreplay/` | `app/src/components/goads/` | filesystem + every import alias |
| User-facing "Foreplay" strings (metadata, alt text, copy) | "GoAds" | match case (e.g. "Foreplay" → "GoAds", "foreplay" → "goads") |
| `app/src/lib/foreplay-docs-tokens.ts` | `goads-docs-tokens.ts` | filesystem + import |

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

## Edge cases requiring decision

- [ ] **Existing mixed files** (e.g. `foreplay-goads-extension-tool.tsx`, `goads-product-catalog-table.tsx` already living in the `foreplay/` dir): rename pattern is `foreplay-X.tsx` → `goads-X.tsx`. For `foreplay-goads-extension-tool.tsx` → drop the `foreplay-` prefix → `goads-extension-tool.tsx` (already mentions goads).
- [ ] **`docs/foreplay/` folder fate** — three options:
   1. Keep as-is (it's a reference source, not runtime — pragmatic)
   2. Rename to `docs/foreplay-source-reference/` (clearer purpose)
   3. Move to `docs/clone-source/` (purpose-named, no Foreplay in the path)
   → **Default: option 1** unless user prefers option 3 (most aggressive purge)
- [ ] **`docs/foreplay/changelog.md`** — atom changelog from the clone skill. Move with the dir, or split (rename atom-changelog topic).
- [ ] **`app/src/data/foreplay-*` files that have a corresponding `goads-*` file** — check for duplicates before renaming; one may already be the canonical version.

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
