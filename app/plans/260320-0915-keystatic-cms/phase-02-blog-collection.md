---
phase: 2
title: "Blog Collection + Migration"
status: pending
priority: P1
effort: 2.5h
depends_on: [phase-01]
---

## Context Links

- [plan.md](./plan.md)
- Current blog data: `src/data/blog-posts.ts`
- Blog detail component: `src/components/blog-detail-content.tsx`
- Blog listing component: `src/components/blog-listing.tsx`

## Overview

Define full blog collection schema in Keystatic, migrate 5 existing blog posts from TS/HTML to Markdoc files, update page components to read from Keystatic content.

## Key Insights

- Current blog uses `sections[]` array with `{id, title, content: HTML_string}` — Markdoc replaces this with a single content body using `## Headings` for sections
- `dangerouslySetInnerHTML` + DOMPurify currently renders sections — Markdoc renderer replaces this
- `BlogDetailContent` component has TOC sidebar built from `sections[]` — need to extract headings from Markdoc AST instead
- `BlogListing` component imports `blogPosts` directly — needs a server-side reader function

## Requirements

### Functional
- Blog collection in Keystatic with fields: title, slug, category, description, author, authorAvatar, date, readTime, content (Markdoc)
- 5 existing posts migrated to `src/content/blog/{slug}/index.mdoc`
- `/blog` listing page reads from Keystatic content
- `/blog/[slug]` detail page renders Markdoc content
- TOC sidebar still works (extracted from Markdoc headings)

### Non-functional
- Build-time static generation preserved (`generateStaticParams`)
- No visual regression on blog pages

## Architecture

### Content Structure
```
src/content/blog/
  how-to-scale-facebook-ads-with-agency-accounts/
    index.mdoc          # Markdoc content (sections become ## headings)
  understanding-meta-business-manager-limits/
    index.mdoc
  ...
```

### Schema Fields (keystatic.config.ts)
```ts
blog: collection({
  label: 'Blog Posts',
  slugField: 'title',
  path: 'src/content/blog/*',
  format: { contentField: 'content' },
  schema: {
    title: fields.slug({ name: { label: 'Title' } }),
    category: fields.select({
      label: 'Category',
      options: [
        { label: 'Facebook Ads', value: 'Facebook Ads' },
        { label: 'Google Ads', value: 'Google Ads' },
        { label: 'TikTok Ads', value: 'TikTok Ads' },
        { label: 'Agency Accounts', value: 'Agency Accounts' },
      ],
      defaultValue: 'Facebook Ads',
    }),
    description: fields.text({ label: 'Description', multiline: true }),
    author: fields.text({ label: 'Author', defaultValue: 'GoAds Team' }),
    authorAvatar: fields.text({ label: 'Author Avatar URL', defaultValue: '/avatars/goads-team.webp' }),
    date: fields.text({ label: 'Date', description: 'e.g. March 5, 2026' }),
    readTime: fields.text({ label: 'Read Time', description: 'e.g. 8 min. read' }),
    content: fields.markdoc({ label: 'Content' }),
  },
})
```

### Data Flow
```
Keystatic Reader → reads src/content/blog/ → returns typed blog data
  → BlogListing reads all posts (metadata only)
  → BlogDetailContent reads single post (full content + renders Markdoc)
```

## Related Code Files

### Files to Create
- `src/content/blog/{slug}/index.mdoc` (5 files — migrated content)
- `src/lib/keystatic-reader.ts` — server-side Keystatic reader utility
- `src/lib/markdoc-renderer.tsx` — Markdoc to React renderer

### Files to Modify
- `keystatic.config.ts` — add full blog schema
- `src/app/(marketing)/blog/page.tsx` — read from Keystatic
- `src/app/(marketing)/blog/[slug]/page.tsx` — read from Keystatic + render Markdoc
- `src/components/blog-listing.tsx` — accept props instead of importing `blogPosts` directly
- `src/components/blog-detail-content.tsx` — render Markdoc instead of HTML sections
- `src/components/blog-detail-header.tsx` — accept new post type

### Files to Eventually Remove (after migration verified)
- `src/data/blog-posts.ts`

## Implementation Steps

1. **Update `keystatic.config.ts`** with full blog collection schema (fields above)

2. **Create reader utility** `src/lib/keystatic-reader.ts`:
   ```ts
   import { createReader } from '@keystatic/core/reader'
   import config from '../../keystatic.config'

   export const reader = createReader(process.cwd(), config)
   ```

3. **Migrate 5 blog posts to Markdoc files**:
   - Convert each post's `sections[]` HTML into Markdoc format
   - Each section becomes `## Section Title` followed by Markdoc content
   - HTML `<ul><li>`, `<blockquote>`, `<strong>` → Markdoc equivalents
   - Frontmatter handled by Keystatic YAML files alongside `.mdoc`

4. **Create Markdoc renderer** `src/lib/markdoc-renderer.tsx`:
   - Parse Markdoc content → AST
   - Extract headings for TOC
   - Render to React components

5. **Update blog listing page** (`src/app/(marketing)/blog/page.tsx`):
   - Use `reader.collections.blog.all()` to get posts
   - Pass data as props to `<BlogListing posts={posts} />`

6. **Update blog detail page** (`src/app/(marketing)/blog/[slug]/page.tsx`):
   - Use `reader.collections.blog.read(slug)` to get single post
   - Render Markdoc content instead of HTML sections
   - Extract headings from Markdoc AST for TOC

7. **Update `BlogListing`** component:
   - Change from `import { blogPosts }` to accepting `posts` prop
   - Keep category filtering client-side

8. **Update `BlogDetailContent`** component:
   - Replace `dangerouslySetInnerHTML` with Markdoc rendered output
   - Build TOC from Markdoc heading nodes instead of `sections[]`
   - Keep intersection observer for active TOC item

9. **Update `generateStaticParams`** to use Keystatic reader

10. **Test**: verify all 5 blog posts render correctly, TOC works, category filter works

## Todo List

- [ ] Update `keystatic.config.ts` with full blog schema
- [ ] Create `src/lib/keystatic-reader.ts`
- [ ] Migrate 5 blog posts to `src/content/blog/` as Markdoc
- [ ] Create Markdoc renderer with heading extraction
- [ ] Update blog listing page to use Keystatic reader
- [ ] Update blog detail page to use Keystatic reader + Markdoc
- [ ] Update `BlogListing` to accept posts prop
- [ ] Update `BlogDetailContent` to render Markdoc
- [ ] Update `generateStaticParams`
- [ ] Verify all 5 posts render correctly
- [ ] Verify TOC sidebar works
- [ ] Verify category filtering works

## Success Criteria

- All 5 blog posts accessible at same URLs
- Content renders identically (headings, lists, blockquotes, bold text)
- TOC sidebar functional with intersection observer
- Category filtering on listing page works
- `generateStaticParams` generates correct slugs
- Staff can create/edit blog posts via `/keystatic`

## Risk Assessment

- **HTML → Markdoc fidelity**: Some inline HTML may not have Markdoc equivalents. Use Markdoc `{% tag %}` syntax for custom elements if needed.
- **TOC extraction**: Need reliable heading extraction from Markdoc AST. Markdoc has `Markdoc.transform()` which provides node tree.
- **Component imports break**: `blog-listing.tsx` directly imports `blogPosts` — must change to prop-based. Check all consumers.

## Security Considerations

- Remove `dangerouslySetInnerHTML` — Markdoc renderer is inherently safe
- No user-generated content risk since Keystatic is staff-only
