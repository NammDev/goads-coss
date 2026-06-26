import {
  Rocket,
  Globe,
  CreditCard,
  Music,
  FileText,
  type LucideIcon,
} from "lucide-react"

// Using a simple SVG component for Meta icon since lucide doesn't have one
export { Rocket, Globe, CreditCard, Music, FileText }

export type DocsNavItem = {
  title: string
  slug: string
  /** Optional custom icon image src (16×16). When omitted, the default
   *  Foreplay F-block placeholder SVG renders inside the article list. */
  iconSrc?: string
  /** Optional Lucide icon for the sidebar article row (defaults to FileText). */
  icon?: LucideIcon
  items?: DocsNavItem[]
}

/** Flatten nested DocsNavItem[] into a single list of leaf articles with
 *  full hrefs — used by the sidebar to render a 1-level collapsible
 *  (section → flat article list, matching Foreplay's docs sidebar pattern). */
export type FlatLeaf = {
  title: string
  href: string
  icon?: LucideIcon
}
export function flattenLeafItems(
  items: DocsNavItem[],
  basePath: string,
): FlatLeaf[] {
  const out: FlatLeaf[] = []
  for (const item of items) {
    const fullPath = `${basePath}/${item.slug}`
    if (item.items && item.items.length > 0) {
      out.push(...flattenLeafItems(item.items, fullPath))
    } else {
      out.push({ title: item.title, href: fullPath, icon: item.icon })
    }
  }
  return out
}

export type DocsTab = {
  title: string
  slug: string
  icon: LucideIcon
  items: DocsNavItem[]
}

export const docsTabs: DocsTab[] = []

export function getTabBySlug(slug: string): DocsTab | undefined {
  return docsTabs.find((t) => t.slug === slug)
}

/** Flatten all articles into a list with full slugs for search + prev/next */
export type FlatDocItem = {
  title: string
  slug: string
  tabTitle: string
  tabSlug: string
}

export function getFlatDocs(): FlatDocItem[] {
  const result: FlatDocItem[] = []
  for (const tab of docsTabs) {
    function walk(items: DocsNavItem[], prefix: string) {
      for (const item of items) {
        const fullSlug = prefix ? `${prefix}/${item.slug}` : item.slug
        if (item.items) {
          walk(item.items, fullSlug)
        } else {
          result.push({
            title: item.title,
            slug: `${tab.slug}/${fullSlug}`,
            tabTitle: tab.title,
            tabSlug: tab.slug,
          })
        }
      }
    }
    walk(tab.items, "")
  }
  return result
}
