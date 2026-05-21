# Phase 03 — Code Layer

**Status:** TODO
**Priority:** Largest mechanical phase — execute carefully, verify after each sub-step
**Estimated files touched:** ~150 (file renames + import rewrites + identifier renames)

## Overview

Three coupled sub-steps that MUST execute in order:
1. **Rename the directory + all files inside** (`components/foreplay/` → `components/goads/`, `foreplay-*.tsx` → `goads-*.tsx`)
2. **Rename all PascalCase identifiers** (`Foreplay*` → `Goads*`, `fpText` → `goadsText`, `FP_HERO_GRADIENT` → `GOADS_HERO_GRADIENT`)
3. **Update every import path** (`@/components/foreplay/foreplay-x` → `@/components/goads/goads-x`)

These cannot be split into 3 commits without leaving the build broken between them. Treat as ONE commit. Verify with typecheck before commit.

## Sub-step 3.1 — File + directory renames

### Directory
- `app/src/components/foreplay/` → `app/src/components/goads/`
- `app/src/components/foreplay/footer/` → `app/src/components/goads/footer/` (sub-dir)
- `app/src/components/foreplay/blog/` → `app/src/components/goads/blog/` (sub-dir)

### Component files (~100 files)
Pattern: `foreplay-X.tsx` → `goads-X.tsx`

Examples:
| Before | After |
|--------|-------|
| `foreplay-header.tsx` | `goads-header.tsx` |
| `foreplay-footer.tsx` | `goads-footer.tsx` |
| `foreplay-calendar-popup.tsx` | `goads-calendar-popup.tsx` |
| `foreplay-action-plan-card.tsx` | `goads-action-plan-card.tsx` |
| `foreplay-cta-button.tsx` | `goads-cta-button.tsx` |
| `foreplay-typography.ts` | `goads-typography.ts` |
| `foreplay-pricing-card.tsx` | `goads-pricing-card.tsx` |
| ... (~95 more — see `git ls-files 'app/src/components/foreplay/'` for full list) | ... |

Edge case — **already-mixed names**:
| Before | After |
|--------|-------|
| `foreplay-goads-extension-tool.tsx` | `goads-extension-tool.tsx` (drop redundant prefix) |
| `goads-product-catalog-table.tsx` | stays (already correct) |

### Lib file
- `app/src/lib/foreplay-docs-tokens.ts` → `app/src/lib/goads-docs-tokens.ts`

## Sub-step 3.2 — Identifier renames

### Exports
| Old | New |
|-----|-----|
| `fpText` (in `goads-typography.ts`) | `goadsText` |
| `FP_HERO_GRADIENT` | `GOADS_HERO_GRADIENT` |
| `function ForeplayHeader()` → `function GoadsHeader()` | (1,138 hits across 144 files) |
| `interface ForeplaySectionContainerProps` → `interface GoadsSectionContainerProps` | (every interface, type, function, class) |
| `export function ForeplayCalendarPopup` → `export function GoadsCalendarPopup` | same |

### Search/replace patterns (mechanical)
- `\bForeplay([A-Z]\w*)` → `Goads$1` (regex — case-sensitive word boundary + captured suffix)
- `\bfpText\b` → `goadsText`
- `\bFP_HERO_GRADIENT\b` → `GOADS_HERO_GRADIENT`

## Sub-step 3.3 — Import path rewrites

Every import that references `@/components/foreplay/...` or `@/data/foreplay-...` or `@/lib/foreplay-docs-tokens`:

```ts
// before
import { ForeplayHeader, ForeplayFooter } from "@/components/foreplay"
import { ForeplayCalEmbed } from "@/components/foreplay/foreplay-cal-embed"
import { fpText, FP_HERO_GRADIENT } from "@/components/foreplay/foreplay-typography"

// after
import { GoadsHeader, GoadsFooter } from "@/components/goads"
import { GoadsCalEmbed } from "@/components/goads/goads-cal-embed"
import { goadsText, GOADS_HERO_GRADIENT } from "@/components/goads/goads-typography"
```

### Barrel file
- `app/src/components/foreplay/index.ts` → `app/src/components/goads/index.ts`
- Re-export every renamed component with the new identifier name

## Execution order

```bash
# 1. git mv the directory (preserves history)
git mv app/src/components/foreplay app/src/components/goads

# 2. Rename each file inside (script or one-by-one)
for f in app/src/components/goads/foreplay-*; do
  git mv "$f" "${f//foreplay-/goads-}"
done
# Same for sub-dirs (footer/, blog/)

# 3. Rename data files
for f in app/src/data/foreplay-*; do
  git mv "$f" "${f//foreplay-/goads-}"
done

# 4. Rename lib file
git mv app/src/lib/foreplay-docs-tokens.ts app/src/lib/goads-docs-tokens.ts

# 5. Mass-rewrite identifiers in every TS/TSX
git ls-files 'app/src/**/*.{ts,tsx}' | xargs sed -i 's/\bForeplay\([A-Z]\)/Goads\1/g'
git ls-files 'app/src/**/*.{ts,tsx}' | xargs sed -i 's/\bfpText\b/goadsText/g'
git ls-files 'app/src/**/*.{ts,tsx}' | xargs sed -i 's/\bFP_HERO_GRADIENT\b/GOADS_HERO_GRADIENT/g'

# 6. Mass-rewrite import paths
git ls-files 'app/src/**/*.{ts,tsx}' | xargs sed -i 's|@/components/foreplay|@/components/goads|g'
git ls-files 'app/src/**/*.{ts,tsx}' | xargs sed -i 's|/data/foreplay-|/data/goads-|g'
git ls-files 'app/src/**/*.{ts,tsx}' | xargs sed -i 's|/lib/foreplay-docs-tokens|/lib/goads-docs-tokens|g'

# 7. Typecheck
cd app && npx tsc --noEmit
```

**Note on Windows + sed:** Bash sed via Git for Windows handles forward-slash paths fine. If `sed -i` complains about extension, use `sed -i ''` (BSD) or run via `git bash`.

## Files to read for context

- `app/src/components/foreplay/index.ts` — barrel of all atoms (every export needs new name)
- `app/src/data/foreplay-*` (~12 files) — confirm each is still in use; some may be dead

## Todo

- [ ] git mv directory and all files (~115 git mv operations)
- [ ] Run identifier sed sweeps (3 patterns)
- [ ] Run import path sed sweeps (3 patterns)
- [ ] Update barrel `index.ts` exports
- [ ] Typecheck — fix any leftover identifier or import that sed missed
- [ ] Run `grep -rn "Foreplay" app/src` — verify only intentional matches remain (font names, comments)
- [ ] Run `grep -rn "from \"@/components/foreplay" app/src` → 0 hits
- [ ] Commit: `refactor: rename foreplay/ component dir + identifiers to goads/`

## Success criteria

- Typecheck clean
- Dev server boots
- All marketing routes render identically to pre-rename
- Zero `Foreplay` PascalCase identifiers in code (only allowed: comments explaining clone provenance, and font name "Inter Display")
- Zero imports from `@/components/foreplay/*` or `@/data/foreplay-*`

## Risks

- **Sed regex on Windows** — line endings (CRLF) can break some patterns. Use Git for Windows bash, NOT PowerShell sed substitute
- **Mixed-prefix files** — `foreplay-goads-extension-tool.tsx` rename needs manual step (not just `foreplay-` → `goads-`)
- **Type imports** that use the old name — `import type { ForeplaySectionContainerProps }` — sed catches these
- **Comments referencing old class names** — leave as breadcrumbs unless they confuse readers
- **Dynamic strings** (e.g. `"foreplay-x".concat(...)`) — sed misses these; grep for any leftover

## Next

→ phase-04-asset-layer.md
