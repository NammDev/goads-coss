# Phase 05 — Copy + Legacy Cleanup

**Status:** TODO
**Priority:** User-visible polish + dead code removal
**Estimated files touched:** ~50

## Overview

Final sweep for:
1. User-facing "Foreplay" strings (metadata, alt text, copy)
2. The `_legacy-foreplay/` directory (decide: delete or rename)
3. The `docs/foreplay/` reference dir (decide per phase 01: keep, rename, or move)
4. Comments that reference Foreplay-clone provenance (preserve as useful breadcrumbs; reword if confusing)

## What changes

### Sub-step 5.1 — User-facing strings

Search for `Foreplay` (case-sensitive whole word) in:
- `metadata.title` / `metadata.description` in every page
- `alt="..."` attributes
- Hard-coded copy in TSX (rare — most copy lives in `goads-*.ts` data files)
- Email templates (if any)
- Error messages

| Old | New |
|-----|-----|
| `title: "Community | Foreplay"` | `title: "Community | GoAds"` |
| `alt="Foreplay dashboard screenshot"` | `alt="GoAds dashboard screenshot"` |
| `description: "Foreplay helps you..."` | `description: "GoAds helps you..."` |
| Open Graph `siteName: "Foreplay"` | `siteName: "GoAds"` |

**Exclusions:**
- Comments explaining clone provenance (`// Source: Foreplay.co (cloned)`) — keep as breadcrumb
- Cal.com event slugs — external system, only changeable in Cal.com dashboard
- Font name "Inter Display" — third-party, not Foreplay branding

### Sub-step 5.2 — `_legacy-foreplay/` directory

Current contents (need verification):
```
app/src/app/_legacy-foreplay/
  ├── layout.tsx
  ├── university/classes/page.tsx
  ├── swipe-file/page.tsx
  └── industries/ecommerce/page.tsx
```

Underscore prefix means Next.js IGNORES the directory for routing — pages here are dead code, not exposed via URLs. Options:

| Option | Pros | Cons |
|--------|------|------|
| **Delete entirely** (Recommended) | Cleanest; removes ~4 dead files + their data deps | Lose reference patterns if needed later |
| Rename to `_legacy-goads/` | Preserves reference | Still dead code, still 4 unused files |
| Convert to live routes | Adds value | Out of scope for rename |

**Recommendation:** Delete. Files are not routed, not imported elsewhere (verify with grep before deleting).

Related data files that may become dead after delete:
- `app/src/data/foreplay-swipe-file-page-data.ts`
- `app/src/data/foreplay-ecommerce-solution-page-data.ts`
- `app/src/data/foreplay-university-classes-page-data.ts`

→ Confirm these aren't imported elsewhere, then delete.

### Sub-step 5.3 — `docs/foreplay/` directory

Per phase-01 decision (default: keep as-is):
- Contains `foreplay-source.css`, `html/foreplay-homepage-latest.html` — reference source for the `/clone-foreplay` skill
- Internal-only, not part of runtime
- **Default: leave untouched** — no user impact, useful for future clone work
- **If user picked option 3 in phase-01:** rename to `docs/clone-source/` and update `docs/foreplay/extract-css.sh` accordingly

Also: `docs/foreplay/changelog.md` — the atom changelog written by the clone skill. Stays with the dir wherever it ends up.

### Sub-step 5.4 — Comment reword

Pattern: comments that say things like `// Foreplay home hero — .hero-text class` should keep the structural reference (`.hero-text`) but reword the lead-in:
- `// Foreplay home hero — .hero-text class` → `// Goads home hero (cloned from Foreplay) — .hero-text class`
- `// Foreplay CTA button — multiple variants from source CSS` → `// CTA button — multiple variants (cloned from Foreplay source CSS)`

Or simpler: just delete the `// Foreplay X — ` prefix entirely since the file name now communicates the component identity.

**Decision in phase-01:** likely "delete the prefix" for brevity.

## Execution

```bash
# 5.1 — Replace "Foreplay" → "GoAds" in user-facing strings only
# (Manual review required — sed could break the comment exclusions above)
# Recommended: open each file via grep -ln and edit selectively

grep -rln '"Foreplay"' app/src/        # title strings
grep -rln 'alt=".*Foreplay' app/src/    # alt text
grep -rln 'Foreplay\.' app/src/         # FQDN refs in copy

# 5.2 — Verify _legacy-foreplay dead code, then delete
grep -rn "_legacy-foreplay" app/src/    # confirm zero imports
git rm -r app/src/app/_legacy-foreplay/

# Delete dead data files
git rm app/src/data/foreplay-swipe-file-page-data.ts
git rm app/src/data/foreplay-ecommerce-solution-page-data.ts
git rm app/src/data/foreplay-university-classes-page-data.ts

# 5.3 — docs/foreplay/ — only if phase-01 chose to rename
# (default: skip)
# git mv docs/foreplay docs/clone-source

# 5.4 — Comment reword (manual; sed risk too high)
```

## Files to read for context

- Every `app/src/app/(marketing)/*/page.tsx` — check `metadata` exports
- `app/src/app/layout.tsx` — root metadata
- `app/src/components/goads/*` (post phase-03) — first few lines often have a `// Foreplay X` comment

## Todo

- [ ] Replace user-facing "Foreplay" strings (case-sensitive, whole word)
- [ ] Verify `_legacy-foreplay/` has no incoming imports
- [ ] Delete `_legacy-foreplay/` directory
- [ ] Delete corresponding dead data files (3 files)
- [ ] Decide on `docs/foreplay/` (rename or keep per phase-01)
- [ ] Reword leading `// Foreplay X` comments in atom files (delete prefix or add "cloned from Foreplay" disclaimer)
- [ ] Run final grep `grep -rn "Foreplay" app/src/` — remaining hits should only be deliberate comment breadcrumbs
- [ ] Commit: `refactor: replace user-facing Foreplay strings + delete legacy stubs`

## Success criteria

- No "Foreplay" in any page title, description, or alt text
- `app/src/app/_legacy-foreplay/` deleted
- All remaining "Foreplay" mentions in code are deliberate provenance comments
- Build clean, dev server boots, all routes render

## Risks

- **Deleting `_legacy-foreplay/`** — if those files ARE imported somewhere (despite the underscore prefix), build breaks. Run grep first.
- **Sed on user-facing strings** — could break comments. Prefer manual review per file.
- **Cal.com event title** — `🚀 Foreplay Demo & Action Plan` still shown by the embed (configured in Cal.com dashboard). Already flagged earlier; cannot be changed from code.

## Next

→ phase-06-verify.md
