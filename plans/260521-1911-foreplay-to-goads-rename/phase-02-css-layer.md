# Phase 02 — CSS Layer

**Status:** TODO
**Priority:** Must complete before phase 03 — token names must be stable before file rewrites
**Estimated files touched:** ~90 (1 globals.css + ~88 token consumers + every layout wrapper)

## Overview

Rename every CSS token (`--fp-*` → `--goads-*`) and the scope class (`.foreplay` → `.goads`). Pure mechanical search-and-replace, but the scope class touches every marketing/documentation layout wrapper.

## What changes

### globals.css

| Line range | Change |
|------------|--------|
| `:root { --fp-alpha-0 ... }` block (~147–158) | Replace prefix `--fp-` → `--goads-` |
| `--fp-solid-*` block (~161–172) | Same |
| `--fp-lime-green` (~175) | Same |
| `--fp-nav-bg`, `--fp-border-nav` (~177–178) | Same |
| `.foreplay { ... }` selector (line 122) | Rename to `.goads { ... }` |
| `.foreplay .secondary-svg { ... }` (line 208) | Rename to `.goads .secondary-svg { ... }` |
| Any other `.foreplay *` descendant selector | Rename all |

### Token consumers (88 files, 426 hits)

Pattern in every TS/CSS file:
- `var(--fp-alpha-50)` → `var(--goads-alpha-50)`
- `var(--fp-solid-900)` → `var(--goads-solid-900)`
- `var(--fp-lime-green)` → `var(--goads-lime-green)`
- Inline Tailwind: `text-[var(--fp-solid-400)]` → `text-[var(--goads-solid-400)]`
- Arbitrary borders: `border-[var(--fp-solid-100)]` → `border-[var(--goads-solid-100)]`
- Box-shadows: `shadow-[0_0_0_1px_var(--fp-solid-50)]` → `shadow-[0_0_0_1px_var(--goads-solid-50)]`

### Scope class consumers

Every component that mounts `.foreplay` wrapper:
- `app/src/app/(marketing)/layout.tsx` — `className={["foreplay", ...]}` → `["goads", ...]`
- `app/src/components/foreplay/foreplay-calendar-popup.tsx` — same
- Any documentation layout that scopes Foreplay typography (check `(documentation)/layout.tsx`)

## Execution

1. **Edit `globals.css`** — single file, ~30 token renames + 2 scope class renames
2. **Sed-style replace across `app/src`** — two patterns:
   - `--fp-` → `--goads-` (mechanical, no false positives since no other tokens use `--fp-` prefix)
   - `"foreplay"` (as a className value) → `"goads"` (careful — must NOT replace import paths `from "@/components/foreplay/..."` — those rename in phase 03)
3. **Verify** — `grep -ri "\\-\\-fp\\-" app/src` returns ZERO; `grep -rn "className.*foreplay" app/src` returns ZERO

## Suggested commands (run, don't trust blindly)

```bash
# Dry-run preview
grep -rln '\-\-fp\-' app/src/

# Apply (Windows-aware — use git ls-files to avoid touching .next, node_modules)
git ls-files 'app/src/**/*.{ts,tsx,css}' | xargs sed -i 's/--fp-/--goads-/g'

# Scope class — restrict to className context to avoid false positives
git ls-files 'app/src/**/*.{ts,tsx}' | xargs sed -i 's/"foreplay"/"goads"/g'
git ls-files 'app/src/**/*.{ts,tsx}' | xargs sed -i "s/'foreplay'/'goads'/g"

# globals.css — manual edit recommended (the selector rename is one-off)
```

## Files to read for context

- `app/src/app/globals.css` — token + scope class declarations
- `app/src/app/(marketing)/layout.tsx` — primary scope wrapper
- `app/src/components/foreplay/foreplay-calendar-popup.tsx` — secondary scope wrapper (root-layout-mounted)

## Todo

- [ ] Rename tokens in `globals.css`
- [ ] Rename `.foreplay` scope selector + descendants in `globals.css`
- [ ] Apply `--fp- → --goads-` mass replace across `app/src/**/*.{ts,tsx,css}`
- [ ] Replace `className="foreplay"` → `"goads"` everywhere (single + double quotes + template literals + array entries)
- [ ] Verify token grep returns zero hits
- [ ] Run dev server — visual smoke test: home page renders, calendar popup chip shows colors correctly
- [ ] Typecheck clean
- [ ] Commit: `refactor(theme): rename --fp-* tokens to --goads-* + .foreplay scope to .goads`

## Success criteria

- `grep -rn "\-\-fp\-" app/src` → 0 hits
- `grep -rn "\"foreplay\"" app/src` → 0 hits in className context
- All pages render with identical colors to pre-rename baseline
- Calendar popup chip colors still resolve correctly

## Risks

- **Template literals using `--fp-*` inside backticks** — sed catches these too, but verify
- **Test/storybook files** referencing tokens — sweep includes them
- **Dev tools / browser cache** showing old class names — hard refresh after deploy
- **CSS-in-JS strings** in shadcn blocks (`shadcn-studio/blocks/`) — those are vendor code; if any reference `--fp-*`, decide on a case-by-case basis (likely none, but verify)

## Next

→ phase-03-code-layer.md
