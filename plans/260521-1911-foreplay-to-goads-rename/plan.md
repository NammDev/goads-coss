# Foreplay → GoAds Full Rename Audit

**Goal:** Purge every Foreplay reference from the codebase. Components, files, CSS tokens, public asset paths, user-facing strings. Replace with GoAds-native equivalents. No half-measures.

**Scope confirmed with user:**
- Order: rename first, then responsive audit (separate plan)
- Aggression: full rename — code + CSS + public assets + tokens (`--fp-*` → `--goads-*`, `fpText` → `goadsText`)
- Exclusions: legitimate third-party names (font family "Inter Display", lucide icons, Cal.com event slugs)

**Audit baseline (grep on `app/src`):**
- 1,138 `Foreplay*` PascalCase identifiers across 144 files
- 426 `--fp-*` CSS token references across 88 files
- 591 `/foreplay/` asset path references across 154 files
- 300 standalone `Foreplay` mentions across 147 files (some are font names — filter in phase 01)
- ~100 `foreplay-*.tsx` component files in `app/src/components/foreplay/`
- ~12 `foreplay-*.ts(x)` data files in `app/src/data/`
- `app/public/foreplay/` directory (incl. nested `/foreplay/goads/` subdir)
- `app/src/app/_legacy-foreplay/` directory (already marked legacy, candidate for deletion)
- `docs/foreplay/` reference source files (HTML/CSS clone targets)

## Phases

| # | Phase | Status | File |
|---|-------|--------|------|
| 01 | Decisions & exclusions table | TODO | [phase-01-decisions.md](phase-01-decisions.md) |
| 02 | CSS layer: tokens + `.foreplay` scope class | TODO | [phase-02-css-layer.md](phase-02-css-layer.md) |
| 03 | Code layer: file renames + identifiers + imports + typography export | TODO | [phase-03-code-layer.md](phase-03-code-layer.md) |
| 04 | Asset layer: `public/foreplay/` → `public/goads/` + all src refs | TODO | [phase-04-asset-layer.md](phase-04-asset-layer.md) |
| 05 | Copy + legacy cleanup: user strings, `_legacy-foreplay/`, `docs/foreplay/` | TODO | [phase-05-copy-and-cleanup.md](phase-05-copy-and-cleanup.md) |
| 06 | Verify: typecheck + build + visual smoke + zero-leftover grep | TODO | [phase-06-verify.md](phase-06-verify.md) |

## Execution strategy

- **One phase per commit** — each phase is large but mechanical; one commit per phase keeps diffs reviewable and reverts cheap
- **Run phases sequentially** — phase 02 (tokens) ships first because token refs are used inside files that get renamed in phase 03; if reversed, refs would break twice
- **No interleaved feature work** during the rename to avoid merge hell
- **Use search-and-replace per pattern** (not blanket global replace) — different patterns have different exclusion rules
- **Verify after every phase** (typecheck + dev server boot) — bail fast on a broken rename rather than chasing it through 5 phases

## Key dependencies between phases

```
phase-01 (decisions)
     ↓
phase-02 (CSS tokens) ─────────────┐
     ↓                              │
phase-03 (code renames) ──→ depends on phase-02 stable token names
     ↓
phase-04 (asset paths) ──→ depends on phase-03 stable file names (data files reference asset paths)
     ↓
phase-05 (copy + legacy cleanup)
     ↓
phase-06 (verify)
```

## Estimated effort

| Phase | Est. files touched | Risk |
|-------|--------------------|------|
| 01 | 0 (planning only) | low |
| 02 | ~90 (token consumers + globals.css) | medium — CSS scope class touches every layout wrapper |
| 03 | ~150 (file renames + imports + identifiers) | high — must update every import; one missed import = broken build |
| 04 | ~150 (src refs + folder rename) | high — external refs (CMS, OG images, hardcoded URLs in DB) may break silently |
| 05 | ~50 (metadata strings + legacy dir delete) | medium — care needed not to delete in-use stubs |
| 06 | 0 (verification) | low |

**Total realistic timeline:** 1 working day of focused execution + ~2 hours for verification, assuming clean phase isolation.

## Acceptance

- `grep -ri "foreplay" app/src` returns ZERO hits (excluding deliberate exclusions documented in phase-01)
- `grep -ri "foreplay" app/public` returns ZERO hits
- `grep -ri "\\-\\-fp\\-" app/src` returns ZERO hits
- `grep -ri "Foreplay" app/src` returns ZERO hits in user-facing strings (metadata, alt text)
- `npm run build` clean
- `npm run typecheck` (if present) clean
- Manual visual smoke: home, pricing, book-demo, free-action-plan render identically to pre-rename baseline
- Foreplay floating widget still expands on click

## Out of scope (deferred)

- Responsive audit — separate plan, post-rename
- Performance tuning
- Component API changes
- New features
