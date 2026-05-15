# Phase 01 — Pre-flight + Decisions

**Priority:** Critical · **Status:** pending · No code changes; produces a frozen decision sheet + full inventory.

## Goal
Lock every ambiguous mapping BEFORE moving files. A wrong mapping = broken prod URLs.

## Steps
1. Snapshot current routing: list every routable folder under `app/` (exclude `_`/`(group)` rules noted).
2. Build the authoritative route map table: `current path → action (promote/legacy/keep-demo/untouched) → target path → final URL`.
3. Resolve slug decisions:
   - `home/` → root index `app/(marketing)/page.tsx` (URL `/`).
   - `aboutus` keep slug `/aboutus` OR rename to `/about`? (old used `/about`). **Default: keep `/aboutus`** unless user wants `/about` for SEO continuity.
4. Decide R1 (tools collision): old `app/tools/` → `_legacy`; new `tools` → `/tools`. Confirm old `app/tools` is the legacy live tools (grep links to `/tools/*`).
5. Decide R2 (legal/sales/share): pick strategy in phase-06 (port vs keep-live exception). Mark which old routes are "keep live" carve-outs and must NOT go to `_legacy` in phase-02.
6. Confirm untouched sections: `(admin) (auth) (portal) admin portal api keystatic favicon globals robots sitemap not-found layout`.
7. Output `decision-sheet.md` in this plan dir (route map table + carve-out list + slug choices).

## Deliverable
`plans/260515-1631-marketing-promotion-restructure/decision-sheet.md` — single source of truth for phases 2–7.

## Success criteria
- Every folder in `app/(marketing)` (old), `app/foreplay/(marketing)` (new), `app/tools`, `app/foreplay/help` has an explicit action.
- Carve-out list finalized (no dangling links after legacy quarantine).

## Unresolved questions (ESCALATE before phase-02)
1. `aboutus` → keep `/aboutus` or rename `/about`? Other slug renames (e.g. `bm`, `tiktok-accounts`) kept as-is?
2. Legal pages (`privacy-policy`, `terms-of-service`, `refund-policy`) + `talk-to-sales` + `share`: PORT into new site, or KEEP old ones live as carve-out? New footer currently links `/foreplay/page/<legal>` (the demo `page` renderer) — is legal content meant to come from that `page` route? If so it stays under `/foreplay` (contradiction with root legal links).
3. 301 redirects from old root URLs to new (SEO) wanted, or hard cutover (old URLs 404)?
4. `reviews`, `tempmail` confirmed PROMOTE (not demo) — correct?
5. Old `(marketing)/page.tsx` (old homepage) — discard entirely (legacy) confirmed?
6. Does `app/tools/` have non-marketing consumers (portal/admin)? Verify before legacy.
