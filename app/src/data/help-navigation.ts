// Help center navigation — now mirrors the docs Questions Bank (single source of
// truth). /help renders the same Questions Bank content as
// /docs/questions-bank, so there is no separate help dataset to maintain.

import {
  docsTabs,
  flattenLeafItems as docsFlattenLeafItems,
  type DocsTab,
  type DocsNavItem,
  type FlatLeaf,
} from "@/data/docs-navigation"

export type HelpTab = DocsTab
export type HelpNavItem = DocsNavItem
export type { FlatLeaf }

export const flattenLeafItems = docsFlattenLeafItems

// /help surfaces only the Questions Bank tab from the docs catalog.
export const helpTabs: HelpTab[] = docsTabs.filter(
  (t) => t.slug === "questions-bank",
)

export function getHelpTabBySlug(slug: string): HelpTab | undefined {
  return helpTabs.find((t) => t.slug === slug)
}
