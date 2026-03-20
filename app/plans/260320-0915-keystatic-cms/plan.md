---
title: "Keystatic CMS for Staff Content Management"
description: "Git-based CMS at /keystatic for staff to manage blog, docs, and FAQ without coding"
status: pending
priority: P2
effort: 8h
branch: ui-playground
tags: [cms, keystatic, content, blog, docs, faq]
created: 2026-03-20
---

# Keystatic CMS Integration

## Goal

Replace hardcoded TypeScript content (blog posts, docs articles, FAQ) with file-based MDX/Markdoc content managed via Keystatic admin UI at `/keystatic`.

## Current State

- **Blog**: 5 posts in `src/data/blog-posts.ts` — TS objects with HTML string sections
- **Docs**: 3 articles in `src/data/docs-articles.tsx` — JSX ReactNode content, nav in `docs-navigation.ts`
- **FAQ**: `src/data/landing-faq.ts` — flat array of `{question, answer}` + tabbed FAQ data
- **Search**: `src/data/search-index.ts` aggregates all content for Cmd+K

## Architecture Decision

- **Keystatic local mode** for dev, GitHub mode configurable later
- Content stored as **Markdoc** files in `src/content/{blog,docs,faq}/`
- Keystatic config at project root: `keystatic.config.ts`
- Admin UI route: `src/app/keystatic/`
- API route: `src/app/api/keystatic/`

## Phases

| # | Phase | Status | Effort | File |
|---|-------|--------|--------|------|
| 1 | Keystatic setup + `/keystatic` route | Pending | 1.5h | [phase-01](./phase-01-keystatic-setup.md) |
| 2 | Blog collection + migration | Pending | 2.5h | [phase-02](./phase-02-blog-collection.md) |
| 3 | Docs collection + migration | Pending | 2h | [phase-03](./phase-03-docs-collection.md) |
| 4 | FAQ collection | Pending | 1h | [phase-04](./phase-04-faq-collection.md) |
| 5 | Search index update | Pending | 1h | [phase-05](./phase-05-search-index-update.md) |

## Key Dependencies

- `@keystatic/core`, `@keystatic/next`, `@markdoc/markdoc`
- Next.js 16+ App Router (already in use)
- CSP headers may need update for Keystatic admin UI

## Migration Strategy

1. Install Keystatic, create collections, set up admin route
2. Convert existing hardcoded content to Markdoc files in `src/content/`
3. Create reader utilities to load Keystatic content
4. Update page components to read from Keystatic instead of TS data files
5. Keep old data files until migration verified, then remove

## Risk

- Blog uses HTML sections with `dangerouslySetInnerHTML` — Markdoc output needs to produce equivalent HTML
- Docs uses JSX with custom `<DocsCallout>` component — need Markdoc component registration
- Next.js 16 + Keystatic compatibility (verify during setup)
