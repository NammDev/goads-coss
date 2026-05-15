import {
  Rocket,
  CreditCard,
  Wrench,
  FileText,
  type LucideIcon,
} from "lucide-react"

export { Rocket, CreditCard, Wrench, FileText }

export type HelpNavItem = {
  title: string
  slug: string
  /** Optional custom icon image src (16×16). */
  iconSrc?: string
  /** Optional Lucide icon for the sidebar article row (defaults to FileText). */
  icon?: LucideIcon
  items?: HelpNavItem[]
}

/** Flatten nested HelpNavItem[] into a single list of leaf articles with
 *  full hrefs — used by the sidebar to render a 1-level collapsible. */
export type FlatLeaf = {
  title: string
  href: string
  icon?: LucideIcon
}

export function flattenLeafItems(
  items: HelpNavItem[],
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

export type HelpTab = {
  title: string
  slug: string
  icon: LucideIcon
  items: HelpNavItem[]
}

export const helpTabs: HelpTab[] = [
  {
    title: "Getting Started",
    slug: "getting-started",
    icon: Rocket,
    items: [
      { title: "Welcome to GoAds Help", slug: "welcome" },
      { title: "Creating Your Account", slug: "create-account" },
      { title: "Navigating the Dashboard", slug: "dashboard-overview" },
    ],
  },
  {
    title: "Account & Billing",
    slug: "billing",
    icon: CreditCard,
    items: [
      { title: "Managing Your Subscription", slug: "manage-subscription" },
      { title: "Accepted Payment Methods", slug: "payment-methods" },
      { title: "Invoices & Receipts", slug: "invoices" },
      { title: "Cancellation Policy", slug: "cancellation" },
    ],
  },
  {
    title: "Troubleshooting",
    slug: "troubleshooting",
    icon: Wrench,
    items: [
      { title: "Login & Access Issues", slug: "login-issues" },
      { title: "Ad Account Not Connecting", slug: "ad-account-connection" },
      { title: "Billing Errors", slug: "billing-errors" },
      { title: "Report a Bug", slug: "report-bug" },
    ],
  },
]

export function getHelpTabBySlug(slug: string): HelpTab | undefined {
  return helpTabs.find((t) => t.slug === slug)
}

/** Flatten all articles into a list with full slugs for search + prev/next */
export type FlatHelpItem = {
  title: string
  slug: string
  tabTitle: string
  tabSlug: string
}

export function getFlatHelp(): FlatHelpItem[] {
  const result: FlatHelpItem[] = []
  for (const tab of helpTabs) {
    function walk(items: HelpNavItem[], prefix: string) {
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
