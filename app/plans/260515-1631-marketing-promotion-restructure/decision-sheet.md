# Decision Sheet (frozen) — source of truth for phases 2–8

User-confirmed 2026-05-15.

## Global
- New site → root URLs; `/foreplay` prefix dropped for promoted routes.
- Old site → `app/src/app/_legacy-marketing/` + `_legacy-tools/` (unrouted, kept in repo).
- Cutover: **HARD**. Old/promoted-`/foreplay/*` URLs → **404**. No 301s. Update sitemap/robots only.
- portal/admin coupling to old `app/tools`: user resolves later — do NOT block; note any breakage.

## Slug renames
| From | To (root URL) |
|------|---------------|
| `foreplay/(marketing)/aboutus` | `/about` |
| `foreplay/(marketing)/home` | `/` (→ `(marketing)/page.tsx`) |
| `foreplay/(marketing)/page/<slug>` | `/page/<slug>` (legal; keep `page/` segment, no flatten) |
| all other promoted | same slug, root |

## Route classification
**PROMOTE → `app/(marketing)/`** (root):
home(`/`), bm, partners, pricing, about, blog, agency-ad-account, google-agency,
tiktok-agency, blue-verification, profiles, tiktok-accounts, unban, contact, payment,
book-demo, community, reviews, tempmail, tools, page.

**PROMOTE (own top-level):** `foreplay/help` → `app/help` (`/help`). `docs` unchanged (`/docs`).

**DEMO — stay `/foreplay/*`:** industries, pages, university, swipe-file.

**LEGACY (unrouted):** entire current `app/(marketing)/*` + `app/tools/*`.

**UNTOUCHED:** `(admin) (auth) (portal) admin portal api keystatic favicon globals
robots sitemap not-found layout`.

## R2 carve-out resolution (FINAL)
- **Legal → flattened pretty URLs.** Promote each legal page out of the `page/` segment:
  `foreplay/(marketing)/page/privacy-policy/page.tsx` → `app/(marketing)/privacy-policy/page.tsx`
  (same for `terms-of-service`, `refund-policy`). Drop the `page/` wrapper entirely.
  Rewrite all `/foreplay/page/<slug>` links → `/<slug>`. `page` route no longer exists.
- **`/talk-to-sales` → repoint ALL links to `/book-demo`.** Do not port old talk-to-sales.
- **`share/[token]` → PORT** old `app/(marketing)/share` → `app/(marketing)/share`
  (root carve-out); `/share/<token>` keeps working. Verify no `_legacy` coupling.

## Net effect on classification
- `page` is NO LONGER a route — its 3 children become standalone root routes
  (`/privacy-policy`, `/terms-of-service`, `/refund-policy`). Remove `page` from PROMOTE list;
  add the 3 legal slugs instead.
- Demo-stay unchanged: industries, pages, university, swipe-file.
- `share` added to PROMOTE (ported from old site, not new).

All micro-decisions resolved — plan is COOK-READY.

## EXECUTION AMENDMENT (2026-05-15, discovered phase-01)
`src/app/portal/tools/*` imports content components from `src/app/tools/*` (shared lib,
not just old-site route). Moving `app/tools` → `_legacy` would break the portal build.
User pre-accepted "handle portal later / don't block".

### tools promotion — DONE (follow-up, same session 2026-05-15)
User requested promoting tools after all. Executed:
- Old `app/tools/` → `app/_legacy-tools/` (unrouted). All `@/app/tools/*` imports
  (19 portal pages + tool-page-skeleton + internal `_legacy-tools` cross-refs) rewired
  → `@/app/_legacy-tools/*`. Portal still builds (build exit 0, /portal/tools/* emitted).
- New `app/foreplay/tools/` (5 tools) → `app/(marketing)/tools/` → `/tools/*`.
- Link rewrite `/foreplay/tools` → `/tools` (nav, footer).
- Header Tools mega-menu + footer Tools section rebuilt from canonical `tools-registry`
  (2fa, check-uid, split-data, check-ip, goads-extension) + Temp Mail (`/tempmail`) added
  to fill the short nav row.
- Verified: new `/tools/*` 200; old `/tools/cookie|notepad|...` + `/foreplay/tools` 404;
  tsc 0; eslint clean; build exit 0.
