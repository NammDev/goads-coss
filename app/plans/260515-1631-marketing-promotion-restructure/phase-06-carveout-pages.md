# Phase 06 — Carve-out: Legal / Sales / Share

**Priority:** Critical · **Status:** pending · **Risk:** R2 (dangling refs)

## Problem
New site lacks: `talk-to-sales`, `privacy-policy`, `terms-of-service`, `refund-policy`,
`share`. New CTAs/footers reference them. Old `(marketing)` provides them but is going
to `_legacy`. Footer also links `/foreplay/page/<legal>` (the demo `page` renderer that
STAYS under `/foreplay`). → Inconsistent legal URL strategy.

## Final resolution (all decided — see decision-sheet.md)
1. **Legal — flatten out of `page/`.** The new legal pages already exist at
   `foreplay/(marketing)/page/{privacy-policy,terms-of-service,refund-policy}/page.tsx`.
   On promote (phase-03), move EACH up one level:
   `app/(marketing)/privacy-policy/page.tsx`, `.../terms-of-service/page.tsx`,
   `.../refund-policy/page.tsx`. Delete the empty `page/` wrapper. `page` route ceases to exist.
2. **talk-to-sales — no port.** Repoint every `/talk-to-sales` reference → `/book-demo`
   (grep components + data; CTA props, footer, header).
3. **share — port.** `git mv` old `app/(marketing)/share` (the `[token]` dynamic route)
   → new `app/(marketing)/share` BEFORE old site goes `_legacy` (phase-02 carve-out).
   It renders with old components; verify imports resolve (no `_legacy` path) and it has
   its own needs met under the new `(marketing)/layout.tsx`.

## Link rewrites owned by this phase
- `/foreplay/page/privacy-policy` → `/privacy-policy`
- `/foreplay/page/terms-of-service` → `/terms-of-service`
- `/foreplay/page/refund-policy` → `/refund-policy`
- `/talk-to-sales` → `/book-demo` (ALL occurrences, incl. `foreplay-home-cta.tsx`,
  product CTA cards, `goads-*-page-data.ts`, footer)
- `/share/...` links unchanged (route ported, URL identical)

## Related files
- Move/restructure: 3 legal subfolders, old `share/[token]`
- Edit: `foreplay-footer-links-data.ts`, `foreplay-home-cta.tsx`,
  `foreplay-product-page-cta-card.tsx`, `goads-*-page-data.ts`, any `/talk-to-sales` ref

## Success criteria
- `/privacy-policy`, `/terms-of-service`, `/refund-policy`, `/share/<token>` → 200.
- `/page/*` and `/talk-to-sales` → 404 (gone); zero `/foreplay/page/` or `/talk-to-sales`
  links remain in `src/`.
- `npx tsc --noEmit` 0.

## Unresolved
- Visual QA: legal + share render acceptably under new foreplay `(marketing)/layout.tsx`
  (old components may assume old layout CSS — check, patch minimally if broken).
- Confirm `share/[token]` has no import from old-site-only modules headed to `_legacy`.
