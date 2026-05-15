# Phase 03 — Promote New Site to Root

**Priority:** Critical · **Status:** pending · **Risk:** R4 (homepage/SEO)

## Goal
Move the new "our" routes from `app/foreplay/(marketing)/` to top-level `app/(marketing)/`
so they serve at root URLs.

## Preconditions
Phase-02 done (old `app/(marketing)` vacated). Dev server stopped.

## Steps
1. Recreate `app/src/app/(marketing)/` with `layout.tsx` = current
   `app/foreplay/(marketing)/layout.tsx` (ForeplayHeader/Footer + `.foreplay` wrapper).
2. `git mv` each PROMOTE route from `app/foreplay/(marketing)/<r>` → `app/(marketing)/<r>`:
   bm, partners, pricing, aboutus, blog, agency-ad-account, google-agency, tiktok-agency,
   blue-verification, profiles, tiktok-accounts, unban, contact, payment, book-demo,
   community, reviews, tempmail, tools.
3. Homepage: `app/foreplay/(marketing)/home/page.tsx` → `app/(marketing)/page.tsx`
   (becomes `/`). Move any `home/`-local helpers alongside; fix relative imports.
4. Move shared support files in `foreplay/(marketing)/` (e.g. `swipe-file/tab-icons.tsx`
   only if a promoted route imports it — else leave with demo). Audit per-route local imports.
5. Leave demo routes in place (phase-04): industries, pages, page, university, swipe-file.
6. Delete now-empty `app/foreplay/(marketing)/` once only demo routes remain → restructure
   demo under `app/foreplay/` (phase-04).
7. Restart dev; smoke check promoted URLs (`/bm`, `/pricing`, `/`, `/partners`…).

## URL mapping (examples)
`/foreplay/bm` → `/bm` · `/foreplay/home` → `/` · `/foreplay/aboutus` → `/aboutus`
(slug per phase-01 decision) · `/foreplay/tools/2fa` → `/tools/2fa`.

## Related files
- New: `app/src/app/(marketing)/layout.tsx`, `app/src/app/(marketing)/page.tsx`
- Move: 19 promote folders + home contents.

## Success criteria
- Promoted URLs 200 at ROOT; `/` renders new homepage.
- `npx tsc --noEmit` 0 errors.
- No promoted route still reachable at `/foreplay/*` (will 404 until link rewrite phase-05).

## Risks
- R4: `/` changes content (old homepage gone). Coordinate redirects/SEO in phase-07.
- Local relative imports inside `home/` break on move — fix to `@/` alias.
- `tools` route: ensure new tools self-contained (no import from old `app/tools` now in `_legacy`).
