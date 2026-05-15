# Phase 04 — Promote Help; Keep Demo under /foreplay

**Priority:** High · **Status:** pending

## Goal
`/foreplay/help` → `/help` (root). Demo routes remain at `/foreplay/*` with their layout.

## A. Help promotion
1. `git mv app/src/app/foreplay/help app/src/app/help` → URL `/help`.
2. Help has its own `layout.tsx` (docs-style tokens + HelpShell) — self-contained, moves cleanly.
3. `docs/` already at root `/docs` — NO move.
4. Update sidebar footer links (Docs/Help/Contact) in `docs-sidebar.tsx` + `help/...help-sidebar.tsx`:
   `/foreplay/help` → `/help`, `/foreplay/contact` → `/contact` (root after phase-03), `/docs` stays.
5. Old `_legacy` had `/help` — now free; new `/help` owns it.

## B. Demo routes restructure
After phase-03, `app/foreplay/(marketing)/` holds only: industries, pages, page,
university, swipe-file (+ `layout.tsx`).
1. Decide final demo home: keep group `app/foreplay/(marketing)/` (URL still `/foreplay/*`)
   OR flatten to `app/foreplay/<demo>/` + `app/foreplay/layout.tsx`. **Recommended: flatten**
   (mirrors pre-restructure simplicity; one `app/foreplay/layout.tsx` = ForeplayHeader/Footer).
2. If flatten: `git mv app/foreplay/(marketing)/<demo>` → `app/foreplay/<demo>`; move
   `(marketing)/layout.tsx` → `app/foreplay/layout.tsx`; delete empty `(marketing)`.
3. Demo URLs unchanged: `/foreplay/pages`, `/foreplay/university`, `/foreplay/swipe-file`,
   `/foreplay/industries`, `/foreplay/page/<slug>`.

## Related files
- Move: `app/src/app/foreplay/help/**` → `app/src/app/help/**`
- Edit: `docs-sidebar.tsx`, `help-sidebar.tsx` footer links
- Move: demo folders + foreplay layout

## Success criteria
- `/help`, `/help/getting-started`, `/help/<cat>/<article>` → 200; no foreplay header chrome.
- `/foreplay/pages`, `/foreplay/university`, `/foreplay/swipe-file`, `/foreplay/industries`,
  `/foreplay/page/<slug>` → 200 with foreplay chrome.
- Sidebar footer active highlight still works at `/help` and `/docs`.
- `npx tsc --noEmit` 0 errors.

## Risks
- `page` demo route is the legal-content renderer referenced by footers — interacts with
  phase-06 R2. Confirm legal links target before finalizing.
