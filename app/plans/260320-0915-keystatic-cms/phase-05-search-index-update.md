---
phase: 5
title: "Search Index Update"
status: pending
priority: P2
effort: 1h
depends_on: [phase-02, phase-03, phase-04]
---

## Context Links

- [plan.md](./plan.md)
- Current search index: `src/data/search-index.ts`
- Consumers: `cmdk` search dialog (Cmd+K)

## Overview

Update the search index to read blog, docs, and FAQ data from Keystatic content instead of hardcoded imports.

## Key Insights

- `search-index.ts` currently imports `blogPosts`, `docsTabs`, `FAQ_ITEMS` at module level (synchronous)
- Keystatic reader is async — search index must become async or use a build-time generation approach
- `docsTabs` (navigation) stays hardcoded — no change needed for docs search items
- Blog and FAQ items need Keystatic reader

## Requirements

### Functional
- Search index includes all blog posts from Keystatic
- Search index includes all FAQ items from Keystatic
- Docs search items continue to work (still from `docsTabs`)
- Cmd+K search returns correct results

### Non-functional
- Search index generated server-side (no client Keystatic reader)

## Architecture

### Approach: Server Component Data Loading

Since search is used in a client component (`cmdk`), the index needs to be passed as props or pre-built.

**Option A**: Generate search index at build time via `generateStaticParams` or layout server component, pass as context/props.

**Option B**: Create `src/lib/search-index.ts` as an async server function, called in layout and passed to client via context.

**Chosen: Option B** — simpler, works with SSR, Keystatic reader already server-side.

### Data Flow
```
Layout (Server) → getSearchIndex() → reads Keystatic blog + FAQ
  → passes to SearchProvider (Client Context)
  → CmdK dialog consumes from context
```

## Related Code Files

### Files to Create
- `src/lib/get-search-index.ts` — async server function building search index
- `src/components/search-provider.tsx` — client context provider (if not existing)

### Files to Modify
- `src/data/search-index.ts` — refactor to async or split into static + dynamic parts
- Root layout or marketing layout — call `getSearchIndex()` and pass to provider
- Cmd+K search component — consume from context instead of direct import

### Files to Eventually Remove
- Direct imports of `blogPosts` and `FAQ_ITEMS` in search-index.ts

## Implementation Steps

1. **Create `src/lib/get-search-index.ts`**:
   - Async function that reads blog posts via Keystatic reader (metadata only)
   - Reads FAQ items via Keystatic reader
   - Combines with static PAGES, TOOL_ITEMS, DOC_ITEMS (from docsTabs, unchanged)
   - Returns `SearchItem[]`

2. **Create or update search context provider**:
   - Check if CmdK already uses a provider pattern
   - If not, create `SearchProvider` that accepts `items` prop and provides via React context
   - CmdK dialog reads from context

3. **Update layout**:
   - Call `getSearchIndex()` in server layout
   - Pass result to `<SearchProvider items={searchIndex}>`

4. **Update search-index.ts**:
   - Keep `PAGES`, `TOOL_ITEMS`, `SEARCH_CATEGORIES` as static exports
   - Remove `BLOG_ITEMS`, `FAQ_SEARCH_ITEMS` from static file (now loaded dynamically)
   - Or: keep file as-is and just re-export from new async source

5. **Verify**: Cmd+K search returns blog posts, FAQ items, pages, tools, docs

## Todo List

- [ ] Create `src/lib/get-search-index.ts` with async Keystatic reads
- [ ] Update search data flow (provider pattern or server-passed props)
- [ ] Update layout to call async search index builder
- [ ] Update CmdK to consume from new source
- [ ] Verify search returns all content types
- [ ] Verify no hydration mismatches

## Success Criteria

- Cmd+K search returns blog posts from Keystatic content
- FAQ items searchable
- Docs and pages search unchanged
- No hydration errors
- Search works on all pages

## Risk Assessment

- **Hydration mismatch**: If search index differs between server/client render. Mitigate: load once in server layout, pass as serialized props.
- **Performance**: Reading all Keystatic content on every request. Mitigate: Next.js caches server component output; Keystatic reader reads local files (fast).
- **CmdK refactor scope**: May need significant changes if search dialog imports `SEARCH_INDEX` directly in many places. Audit all usages first.

## Unresolved Questions

- How does the current CmdK component receive the search index? Direct import or via props/context? Need to audit before implementing.
