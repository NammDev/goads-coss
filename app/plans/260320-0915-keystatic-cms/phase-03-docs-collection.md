---
phase: 3
title: "Docs Collection + Migration"
status: pending
priority: P1
effort: 2h
depends_on: [phase-01, phase-02]
---

## Context Links

- [plan.md](./plan.md)
- Current docs data: `src/data/docs-articles.tsx` (3 JSX articles)
- Navigation: `src/data/docs-navigation.ts` (5 tabs, nested items)
- Docs page: `src/app/docs/[[...slug]]/page.tsx`
- Custom component: `src/components/docs-callout.tsx`

## Overview

Add docs collection to Keystatic, migrate 3 existing docs articles from JSX to Markdoc, register `DocsCallout` as Markdoc component. Keep navigation structure in Keystatic or as a separate singleton.

## Key Insights

- Docs articles use JSX with custom `<DocsCallout>` component — needs Markdoc tag registration
- Only 3 articles exist but navigation defines ~15 leaf pages — most are empty/404
- Navigation is hierarchical (tabs → groups → items) — could be a Keystatic singleton or stay as TS
- Docs slug pattern: `{tab}/{group?}/{article}` e.g. `getting-started/what-is-agency-account`

## Requirements

### Functional
- Docs collection in Keystatic with fields: title, description, lastUpdated, tab (category), content (Markdoc)
- 3 existing articles migrated to `src/content/docs/{slug}/index.mdoc`
- `<DocsCallout>` registered as Markdoc tag ({% callout variant="info" title="..." %})
- Navigation stays in `docs-navigation.ts` (KISS — no need to CMS-ify navigation structure)
- `/docs/[...slug]` renders Markdoc content

### Non-functional
- DocsCallout renders same visual as current JSX version
- Table content in docs preserves formatting

## Architecture

### Content Structure
```
src/content/docs/
  getting-started--what-is-agency-account/
    index.mdoc
  meta--ad-accounts--setup-guide/
    index.mdoc
  billing--warranty-policy/
    index.mdoc
```

Note: Keystatic path uses `*` glob so slug is directory name. Use `--` delimiter for nested slugs (converted to `/` at read time), OR use `path` field in schema.

**Alternative (simpler):** Use a `slug` text field that maps to the navigation path:
```ts
docs: collection({
  label: 'Docs Articles',
  slugField: 'title',
  path: 'src/content/docs/*',
  format: { contentField: 'content' },
  schema: {
    title: fields.slug({ name: { label: 'Title' } }),
    navSlug: fields.text({ label: 'Navigation Slug', description: 'e.g. getting-started/what-is-agency-account' }),
    description: fields.text({ label: 'Description', multiline: true }),
    lastUpdated: fields.text({ label: 'Last Updated', description: 'e.g. March 2026' }),
    tab: fields.select({
      label: 'Tab/Category',
      options: [
        { label: 'Getting Started', value: 'getting-started' },
        { label: 'Meta / Facebook', value: 'meta' },
        { label: 'Google Ads', value: 'google' },
        { label: 'TikTok Ads', value: 'tiktok' },
        { label: 'Billing & Support', value: 'billing' },
      ],
      defaultValue: 'getting-started',
    }),
    content: fields.markdoc({
      label: 'Content',
      options: {
        // Register custom Markdoc tags here
      },
    }),
  },
})
```

### Markdoc DocsCallout Tag

Register `callout` tag in Markdoc config:
```markdoc
{% callout variant="info" title="Why Agency Accounts?" %}
Agency accounts are pre-approved by ad platforms...
{% /callout %}
```

Renders to existing `<DocsCallout>` component.

## Related Code Files

### Files to Create
- `src/content/docs/{slug}/index.mdoc` (3 files)
- `src/lib/markdoc-tags.ts` — custom Markdoc tag definitions (callout)

### Files to Modify
- `keystatic.config.ts` — add docs collection
- `src/app/docs/[[...slug]]/page.tsx` — read from Keystatic
- `src/lib/markdoc-renderer.tsx` — register callout tag
- `src/data/docs-articles.tsx` — eventually remove

### Files to Keep As-Is
- `src/data/docs-navigation.ts` — navigation structure stays hardcoded (simple, rarely changes)
- `src/components/docs-callout.tsx` — reused as Markdoc component

## Implementation Steps

1. **Add docs collection** to `keystatic.config.ts` with schema above

2. **Create Markdoc callout tag** in `src/lib/markdoc-tags.ts`:
   - Define `callout` tag with `variant` and `title` attributes
   - Map to `DocsCallout` React component in renderer

3. **Migrate 3 docs articles** to Markdoc:
   - Convert JSX `<h2>`, `<p>`, `<ul>`, `<ol>`, `<table>` to Markdoc
   - Convert `<DocsCallout>` to `{% callout %}` tag
   - Frontmatter: title, description, lastUpdated, navSlug, tab

4. **Update Markdoc renderer** to include callout component mapping

5. **Update docs page** (`src/app/docs/[[...slug]]/page.tsx`):
   - Read article from Keystatic by matching `navSlug` field to URL slug
   - Render Markdoc content instead of JSX `article.content`
   - Keep DocsArticle wrapper, DocsArticleNav, DocsBreadcrumb

6. **Create lookup function**: given URL slug like `getting-started/what-is-agency-account`, find matching Keystatic doc by `navSlug` field

7. **Test**: all 3 articles render, callout components display, table renders, navigation works

## Todo List

- [ ] Add docs collection to `keystatic.config.ts`
- [ ] Create Markdoc callout tag definition
- [ ] Migrate 3 articles to Markdoc files
- [ ] Update Markdoc renderer with callout component
- [ ] Update docs page to read from Keystatic
- [ ] Create slug lookup function
- [ ] Verify all 3 articles render correctly
- [ ] Verify DocsCallout renders (info, tip, warning variants)
- [ ] Verify table renders in warranty article
- [ ] Verify navigation + breadcrumbs still work

## Success Criteria

- All 3 docs articles render at same URLs
- `<DocsCallout>` renders with correct variant styling
- Tables render correctly
- Navigation and breadcrumbs unaffected
- Staff can create/edit docs via `/keystatic`

## Risk Assessment

- **Table rendering**: Markdoc supports tables natively. Verify complex tables (with thead/tbody) render correctly.
- **DocsCallout variants**: Must handle `info`, `tip`, `warning` variants. Test each.
- **Slug mapping**: `navSlug` field must match URL structure exactly. Mismatch = 404.

## Security Considerations

- Same as blog: Markdoc renderer is safe, no `dangerouslySetInnerHTML`
- Staff-only access via Keystatic admin
