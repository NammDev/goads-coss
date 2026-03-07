import {
  Rocket,
  Globe,
  CreditCard,
  Music,
  type LucideIcon,
} from "lucide-react"

// Using a simple SVG component for Meta icon since lucide doesn't have one
export { Rocket, Globe, CreditCard, Music }

export type DocsNavItem = {
  title: string
  slug: string
  items?: DocsNavItem[]
}

export type DocsTab = {
  title: string
  slug: string
  icon: LucideIcon
  items: DocsNavItem[]
}

export const docsTabs: DocsTab[] = [
  {
    title: "Getting Started",
    slug: "getting-started",
    icon: Rocket,
    items: [
      { title: "What is an Agency Account?", slug: "what-is-agency-account" },
      { title: "How GoAds Works", slug: "how-goads-works" },
      { title: "First Purchase Guide", slug: "first-purchase-guide" },
    ],
  },
  {
    title: "Meta / Facebook",
    slug: "meta",
    icon: Globe,
    items: [
      {
        title: "Ad Accounts",
        slug: "ad-accounts",
        items: [
          { title: "Setup Guide", slug: "setup-guide" },
          { title: "Spending Limits", slug: "spending-limits" },
        ],
      },
      {
        title: "Business Manager",
        slug: "business-manager",
        items: [
          { title: "BM Overview", slug: "overview" },
          { title: "Adding Assets", slug: "adding-assets" },
        ],
      },
      {
        title: "Troubleshooting",
        slug: "troubleshooting",
        items: [
          { title: "Account Disabled", slug: "account-disabled" },
          { title: "Policy Violations", slug: "policy-violations" },
        ],
      },
    ],
  },
  {
    title: "Google Ads",
    slug: "google",
    icon: Globe,
    items: [
      {
        title: "Whitelisted Accounts",
        slug: "whitelisted-accounts",
        items: [
          { title: "What is Whitelisting?", slug: "what-is-whitelisting" },
          { title: "Setup Guide", slug: "setup-guide" },
        ],
      },
      {
        title: "Troubleshooting",
        slug: "troubleshooting",
        items: [
          { title: "Suspension Issues", slug: "suspension-issues" },
        ],
      },
    ],
  },
  {
    title: "TikTok Ads",
    slug: "tiktok",
    icon: Music,
    items: [
      {
        title: "Verified Accounts",
        slug: "verified-accounts",
        items: [
          { title: "Account Types", slug: "account-types" },
          { title: "Setup Guide", slug: "setup-guide" },
        ],
      },
    ],
  },
  {
    title: "Billing & Support",
    slug: "billing",
    icon: CreditCard,
    items: [
      { title: "Warranty Policy", slug: "warranty-policy" },
      { title: "Payment Methods", slug: "payment-methods" },
      { title: "Contact Support", slug: "contact-support" },
    ],
  },
]

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
