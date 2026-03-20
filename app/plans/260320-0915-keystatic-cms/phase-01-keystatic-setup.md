---
phase: 1
title: "Keystatic Setup + Admin Route"
status: pending
priority: P1
effort: 1.5h
---

## Context Links

- [Keystatic Next.js docs](https://keystatic.com/docs/installation-next-js)
- [plan.md](./plan.md)

## Overview

Install Keystatic, create base config, set up `/keystatic` admin UI route and API route handler.

## Key Insights

- Keystatic needs 4 files: config, client page component, layout, catch-all page, and API route handler
- Local mode reads/writes files directly — no DB needed
- Admin UI is a full React SPA rendered at `/keystatic`
- CSP headers in `next.config.ts` may block Keystatic's inline scripts/styles — needs `'unsafe-inline'` (already set)

## Requirements

### Functional
- `/keystatic` renders Keystatic admin UI
- Collections visible (empty initially, populated in later phases)
- Local mode works in dev

### Non-functional
- No impact on existing pages/routes
- Keystatic routes excluded from search engine indexing (already handled by robots.ts pattern)

## Related Code Files

### Files to Create
- `keystatic.config.ts` (project root, i.e. `app/keystatic.config.ts`)
- `src/app/keystatic/keystatic.ts` (client component)
- `src/app/keystatic/layout.tsx`
- `src/app/keystatic/[[...params]]/page.tsx`
- `src/app/api/keystatic/[...params]/route.ts`

### Files to Modify
- `package.json` — add deps
- `next.config.ts` — may need `serverExternalPackages` for Markdoc if build errors

### Directories to Create
- `src/content/blog/`
- `src/content/docs/`
- `src/content/faq/`

## Implementation Steps

1. Install packages:
   ```bash
   npm install @keystatic/core @keystatic/next @markdoc/markdoc
   ```

2. Create `app/keystatic.config.ts` with skeleton collections (blog, docs, faq) — detailed schemas added in phases 2-4:
   ```ts
   import { config, fields, collection } from '@keystatic/core'

   export default config({
     storage: { kind: 'local' },
     collections: {
       blog: collection({
         label: 'Blog Posts',
         slugField: 'title',
         path: 'src/content/blog/*',
         format: { contentField: 'content' },
         schema: {
           title: fields.slug({ name: { label: 'Title' } }),
           content: fields.markdoc({ label: 'Content' }),
         },
       }),
       // docs and faq added in phases 3-4
     },
   })
   ```

3. Create admin UI files:
   - `src/app/keystatic/keystatic.ts` — `"use client"` + `makePage(config)`
   - `src/app/keystatic/layout.tsx` — renders `<KeystaticApp />`
   - `src/app/keystatic/[[...params]]/page.tsx` — returns `null`

4. Create API route:
   - `src/app/api/keystatic/[...params]/route.ts` — `makeRouteHandler({ config })`

5. Verify: run `npm run dev`, navigate to `http://localhost:3000/keystatic`

6. Create content directories: `src/content/blog/`, `src/content/docs/`, `src/content/faq/`

## Todo List

- [ ] Install `@keystatic/core`, `@keystatic/next`, `@markdoc/markdoc`
- [ ] Create `keystatic.config.ts` with skeleton blog collection
- [ ] Create admin UI route files (4 files)
- [ ] Create API route handler
- [ ] Create `src/content/` directories
- [ ] Verify admin UI loads at `/keystatic`
- [ ] Check CSP headers don't block Keystatic UI

## Success Criteria

- `/keystatic` renders admin dashboard
- Blog collection visible in admin (even if empty)
- No build errors, no CSP violations in console
- Existing routes unaffected

## Risk Assessment

- **Keystatic + Next.js 16 compatibility**: Keystatic may lag behind latest Next.js. If incompatible, pin to last working version.
- **CSP blocking**: Keystatic admin uses inline scripts. Current CSP already allows `'unsafe-inline'` — should be fine.
- **React Compiler conflict**: `reactCompiler: true` in next.config.ts — Keystatic client components may need `"use no memo"` directive if issues arise.

## Security Considerations

- `/keystatic` should only be accessible to staff. For now, local-only. In production with GitHub mode, Keystatic uses GitHub OAuth.
- Exclude `/keystatic` from sitemap and robots (already blocked by existing patterns).
