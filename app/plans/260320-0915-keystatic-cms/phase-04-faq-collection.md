---
phase: 4
title: "FAQ Collection"
status: pending
priority: P2
effort: 1h
depends_on: [phase-01]
---

## Context Links

- [plan.md](./plan.md)
- Current FAQ data: `src/data/landing-faq.ts`
- Consumers: landing page, help page, pricing page, search index

## Overview

Add FAQ collection to Keystatic for managing Q&A items. FAQ is simpler than blog/docs — plain text, no Markdoc needed.

## Key Insights

- Two data structures in `landing-faq.ts`:
  1. `FAQ_ITEMS` — flat array of `{question, answer}` used in search index and generic FAQ
  2. `faqTabsData` — tabbed FAQ with categories (Products, Warranty, Billing, Support) used on landing page
- FAQ content is plain text with `\n` line breaks, no HTML/Markdoc
- Tabbed FAQ has different structure: `{value, label, icon, faqs[]}`
- KISS approach: only CMS-ify the simple `FAQ_ITEMS` list. Tabbed FAQ data is more structural (has icons, tabs) — keep hardcoded.

## Requirements

### Functional
- FAQ collection in Keystatic: question, answer, sortOrder fields
- Existing 9 FAQ items migrated to `src/content/faq/`
- Search index reads from Keystatic FAQ collection
- Landing page tabbed FAQ stays hardcoded (structural data with icons)

### Non-functional
- No visual changes to FAQ display

## Architecture

### Schema
```ts
faq: collection({
  label: 'FAQ',
  slugField: 'question',
  path: 'src/content/faq/*',
  format: { data: 'json' },
  schema: {
    question: fields.slug({ name: { label: 'Question' } }),
    answer: fields.text({ label: 'Answer', multiline: true }),
    sortOrder: fields.integer({ label: 'Sort Order', defaultValue: 0 }),
  },
})
```

### Content Structure
```
src/content/faq/
  what-is-an-agency-ad-account/
    index.json    # { question, answer, sortOrder }
  how-does-the-7-day-warranty-work/
    index.json
  ...
```

## Related Code Files

### Files to Create
- `src/content/faq/{slug}/index.json` (9 files)

### Files to Modify
- `keystatic.config.ts` — add FAQ collection
- `src/data/landing-faq.ts` — update `FAQ_ITEMS` to read from Keystatic (or create bridge)

### Files to Keep As-Is
- `faqTabsData` in `landing-faq.ts` — stays hardcoded (structural + icons)

## Implementation Steps

1. **Add FAQ collection** to `keystatic.config.ts`

2. **Migrate 9 FAQ items** to JSON files in `src/content/faq/`

3. **Create FAQ reader function** in `src/lib/keystatic-reader.ts`:
   ```ts
   export async function getAllFAQ() {
     const slugs = await reader.collections.faq.list()
     const items = await Promise.all(
       slugs.map(async (slug) => {
         const item = await reader.collections.faq.read(slug)
         return item ? { question: item.question, answer: item.answer, sortOrder: item.sortOrder } : null
       })
     )
     return items.filter(Boolean).sort((a, b) => a.sortOrder - b.sortOrder)
   }
   ```

4. **Update consumers**: The `FAQ_ITEMS` export is used by search-index.ts (server-side). Replace with async reader call OR keep a sync bridge that reads at build time.

5. **Decision**: Since `FAQ_ITEMS` is imported synchronously in search-index.ts, the simplest approach is to keep `landing-faq.ts` as the sync export and update it from Keystatic content at build time. OR restructure search index to be async.
   - **Chosen approach**: Make search index async (covered in phase 5)

## Todo List

- [ ] Add FAQ collection to `keystatic.config.ts`
- [ ] Migrate 9 FAQ items to `src/content/faq/`
- [ ] Create FAQ reader function
- [ ] Verify FAQ items visible in `/keystatic` admin
- [ ] Test creating/editing FAQ via admin UI

## Success Criteria

- 9 FAQ items manageable via `/keystatic`
- FAQ data readable via Keystatic reader
- No visual changes to landing page

## Risk Assessment

- **Sync vs async**: `FAQ_ITEMS` used synchronously in imports. May need build-time generation or restructure. Addressed in phase 5.
- Low risk overall — FAQ is simple key-value data.
