# Phase 1: Search Data Index

## Context Links
- [Research: shadcn Command docs](../reports/researcher-260309-1916-shadcn-command-docs.md)
- [Research: Data sources catalog](../reports/Explore-260309-search-palette-datasources.md)

## Overview
- **Priority:** P1
- **Status:** pending
- **Description:** Create a unified search index file that aggregates all searchable content into a flat array of `SearchItem` objects, grouped by category.

## Key Insights
- cmdk filters by `value` prop — each item needs a concatenated searchable string (title + description + keywords)
- All data sources are static TS exports — no async loading needed
- Tools already have icons (LucideIcon); pages/blog/docs need category-level icons
- `getFlatDocs()` from `docs-navigation.ts` flattens the docs hierarchy for us

## Requirements

### Functional
- Export a `SearchItem` type and a `searchIndex` array
- Each item: `id`, `title`, `description`, `href`, `category`, `icon`, `keywords` (for search matching)
- 5 categories: `pages`, `tools`, `blog`, `docs`, `faq`

### Non-functional
- File under 200 lines
- No runtime computation — index built at module evaluation time
- Tree-shakeable: only import what's needed from data files

## Architecture

```
search-index.ts
├── imports from tools-registry.ts (19 tools)
├── imports from blog-posts.ts (5 posts)
├── imports from docs-navigation.ts (getFlatDocs → ~28 pages)
├── imports from landing-faq.ts (FAQ_ITEMS → 9 questions)
├── hardcoded PAGES array (~15 key marketing routes)
└── exports: SearchItem type + SEARCH_INDEX constant
```

## Related Code Files
- **Read:** `src/data/tools-registry.ts` — `toolsRegistry: ToolItem[]`, `getToolsByCategory()`
- **Read:** `src/data/blog-posts.ts` — `blogPosts: BlogPost[]`
- **Read:** `src/data/docs-navigation.ts` — `docsTabs: DocsTab[]`, `getFlatDocs()`
- **Read:** `src/data/landing-faq.ts` — `FAQ_ITEMS: FAQItem[]`
- **Read:** `src/components/nav-mega-menu-data.tsx` — route definitions (reference only)
- **Create:** `src/data/search-index.ts`

## Implementation Steps

1. Define `SearchCategory` type: `"pages" | "tools" | "blog" | "docs" | "faq"`
2. Define `SearchItem` interface:
   ```typescript
   export interface SearchItem {
     id: string
     title: string
     description: string
     href: string
     category: SearchCategory
     icon: LucideIcon
     keywords: string // concatenated searchable text
   }
   ```
3. Create `PAGES` constant — hardcoded array of ~15 key marketing routes:
   - Home, Agency Ad Account, BM, Google Agency, TikTok Agency, Pricing, About, FAQ, Blog, Docs, Reviews, Partners, Payment, Help, Tools Hub
   - Each with title, description, href, and a relevant lucide icon
4. Map `toolsRegistry` → `SearchItem[]` (use each tool's own icon, href = `/tools/${slug}`)
5. Map `blogPosts` → `SearchItem[]` (use `FileText` icon, href = `/blog/${slug}`)
6. Map `getFlatDocs()` → `SearchItem[]` (use `BookOpen` icon, href = `/docs/${path}`)
   - If `getFlatDocs` doesn't exist, flatten `docsTabs` manually
7. Map `FAQ_ITEMS` → `SearchItem[]` (use `CircleHelp` icon, href = `/faq`)
   - Use question as title, truncated answer as description
8. Combine all arrays into `SEARCH_INDEX` export, organized by category
9. Export a `SEARCH_CATEGORIES` map for group headings + icons:
   ```typescript
   export const SEARCH_CATEGORIES: Record<SearchCategory, { label: string; icon: LucideIcon }> = {
     pages: { label: "Pages", icon: FileIcon },
     tools: { label: "Tools", icon: WrenchIcon },
     blog: { label: "Blog", icon: FileTextIcon },
     docs: { label: "Documentation", icon: BookOpenIcon },
     faq: { label: "FAQ", icon: CircleHelpIcon },
   }
   ```

## Todo List
- [ ] Define SearchItem type and SearchCategory
- [ ] Create hardcoded PAGES array with key marketing routes
- [ ] Map tools-registry to SearchItem[]
- [ ] Map blog-posts to SearchItem[]
- [ ] Map docs-navigation to SearchItem[]
- [ ] Map FAQ_ITEMS to SearchItem[]
- [ ] Export SEARCH_INDEX and SEARCH_CATEGORIES
- [ ] Verify file stays under 200 lines

## Success Criteria
- `SEARCH_INDEX` contains 60+ items across all 5 categories
- Each item has valid `href`, `title`, and `keywords`
- File compiles without errors
- No runtime side effects — pure module-level constants

## Risk Assessment
- **getFlatDocs may not exist** — fallback: manually flatten `docsTabs` with a simple recursive fn
- **File may exceed 200 lines** — mitigation: keep PAGES array compact, use `.map()` for transforms
