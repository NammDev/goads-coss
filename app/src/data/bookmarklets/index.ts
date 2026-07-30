// GOADS Bookmark registry — metadata for every bookmarklet script rendered on
// /tools/bookmark. Mirrors the shape of data/tools-registry.ts so the two feel
// the same to work with.
//
// Adding a script:
//   1. Drop the single-line `javascript:` payload into its own
//      `{slug}-payload.ts` module (see bm-invite-payload.ts).
//   2. Append an entry below. Category chips + search + share links all derive
//      from this array — no component changes needed.

import { Link2, ShieldMinus, type LucideIcon } from "lucide-react"

import { BM_INVITE_PAYLOAD } from "./bm-invite-payload"
import { BM_REMOVE_ADMINS_PAYLOAD } from "./bm-remove-admins-payload"

export type BookmarkletCategory = "business-manager" | "fanpage" | "ads-account" | "utility"

export type Bookmarklet = {
  /** URL-safe id — also the ?script= share param */
  slug: string
  title: string
  /** Displayed in the version pill next to the title */
  version: string
  description: string
  icon: LucideIcon
  category: BookmarkletCategory
  /** The full `javascript:` URL dragged to the bookmark bar */
  payload: string
  /** Optional walkthrough (docs page or video) */
  guideUrl?: string
}

export type BookmarkletCategoryInfo = {
  id: BookmarkletCategory
  label: string
}

// Only categories that have at least one script are rendered as chips, so this
// list can hold the full taxonomy up front.
export const BOOKMARKLET_CATEGORIES: BookmarkletCategoryInfo[] = [
  { id: "business-manager", label: "Business Manager" },
  { id: "fanpage", label: "Fanpage" },
  { id: "ads-account", label: "Ads Accounts" },
  { id: "utility", label: "Utility" },
]

export const BOOKMARKLETS: Bookmarklet[] = [
  {
    slug: "bm-invite",
    title: "BM Invite TOOL",
    version: "v1.0",
    description:
      "Invite users to your Business Manager by email in one click — GOADS-built, runs on the BM page.",
    icon: Link2,
    category: "business-manager",
    payload: BM_INVITE_PAYLOAD,
  },
  {
    slug: "bm-remove-admins",
    title: "Remove BM Admins",
    version: "v1.1",
    description:
      "Review and bulk-remove admins or employees from a Facebook Business Manager, straight from the BM page.",
    icon: ShieldMinus,
    category: "business-manager",
    payload: BM_REMOVE_ADMINS_PAYLOAD,
  },
]

/** Categories that actually contain at least one script — drives the chip row */
export function getUsedBookmarkletCategories(): BookmarkletCategoryInfo[] {
  return BOOKMARKLET_CATEGORIES.filter((c) =>
    BOOKMARKLETS.some((b) => b.category === c.id),
  )
}

/** Find a script by its share slug */
export function getBookmarkletBySlug(slug: string): Bookmarklet | undefined {
  return BOOKMARKLETS.find((b) => b.slug === slug)
}

/** Human label for a category id */
export function getBookmarkletCategoryLabel(id: BookmarkletCategory): string {
  return BOOKMARKLET_CATEGORIES.find((c) => c.id === id)?.label ?? id
}
