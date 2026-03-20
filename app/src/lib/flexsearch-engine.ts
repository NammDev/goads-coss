"use client"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
import FlexSearch from "flexsearch"
import { SEARCH_INDEX, type SearchItem } from "@/data/search-index"

// FlexSearch Document index
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const index = new (FlexSearch as any).Document({
  tokenize: "forward",
  document: {
    id: "id",
    field: ["title", "description", "keywords"],
  },
})

// Build index at module load
for (const item of SEARCH_INDEX) {
  index.add(item)
}

// Map for O(1) item lookup
const itemMap = new Map<string, SearchItem>(
  SEARCH_INDEX.map((item) => [item.id, item]),
)

/**
 * Search the index and return deduplicated results.
 */
export function search(query: string, limit = 20): SearchItem[] {
  if (!query.trim()) return []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw: Array<{ field: string; result: string[] }> = index.search(query, {
    limit,
    enrich: false,
  })

  const seen = new Set<string>()
  const results: SearchItem[] = []

  for (const fieldResult of raw) {
    for (const id of fieldResult.result) {
      if (!seen.has(id)) {
        seen.add(id)
        const item = itemMap.get(id)
        if (item) results.push(item)
      }
    }
  }

  return results.slice(0, limit)
}
