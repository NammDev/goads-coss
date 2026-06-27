import {
  Rocket,
  FileText,
  Settings,
  ShieldCheck,
  PocketKnife,
  HelpCircle,
  type LucideIcon,
} from "lucide-react"

export { Rocket, FileText, Settings, ShieldCheck, PocketKnife, HelpCircle }

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

// Seven-category GOADS Meta Assets Knowledge Base. Phase C: each category
// ships ONE representative sample article (real content) so the help-center UI
// can be reviewed end-to-end (landing grid → category list → article page)
// without any dead links. Remaining articles get added once the UI is approved.
export const docsTabs: DocsTab[] = [
  {
    title: "Getting Started",
    slug: "getting-started",
    icon: Rocket,
    items: [
      { title: "Welcome to GOADS", slug: "welcome" },
    ],
  },
  {
    title: "Asset Overview",
    slug: "asset-overview",
    icon: FileText,
    items: [
      { title: "Facebook Profile", slug: "facebook-profile" },
      { title: "Business Manager", slug: "business-manager" },
      { title: "Facebook Fanpage", slug: "facebook-fanpage" },
      { title: "Agency Ad Account", slug: "agency-ad-account" },
      { title: "Verification BADGE", slug: "verification-badge" },
      { title: "Instagram Account", slug: "instagram-account" },
      { title: "Unbanned Service", slug: "unbanned-service" },
    ],
  },
  {
    title: "Setup Assets",
    slug: "setup-configuration",
    icon: Settings,
    items: [
      { title: "Setup Asset", slug: "setup-asset" },
      { title: "Hotmail Login", slug: "hotmail-login" },
    ],
  },
  {
    title: "Security & solutions",
    slug: "security-best-practices",
    icon: ShieldCheck,
    items: [
      { title: "Platform Disablement", slug: "platform-disablement" },
      { title: "Account Hacking", slug: "account-hacking" },
      { title: "General Protection", slug: "general-protection" },
    ],
  },
  {
    title: "GOADS Tools",
    slug: "goads-tools",
    icon: PocketKnife,
    items: [
      { title: "Overview", slug: "tools-overview" },
      { title: "GOADS BM Invite & Cookie Login Extension", slug: "bm-invite-cookie-extension" },
      { title: "UID Checker", slug: "uid-checker" },
      { title: "GOADS Tempmail", slug: "goads-tempmail" },
      { title: "2FA Generator", slug: "2fa-generator" },
    ],
  },
  {
    title: "Questions Bank",
    slug: "questions-bank",
    icon: HelpCircle,
    items: [
      { title: "General & Ordering", slug: "general-ordering" },
      { title: "Aged Profiles", slug: "aged-profiles" },
      { title: "Business Managers", slug: "business-managers" },
      { title: "Agency Ad Accounts", slug: "agency-ad-accounts" },
      { title: "Aged Pages", slug: "aged-pages" },
      { title: "Setup Guide", slug: "setup-guide" },
      { title: "Security Tips", slug: "security-tips" },
      { title: "Warranty", slug: "warranty" },
      { title: "Support", slug: "support" },
      { title: "News & Tips", slug: "news-tips" },
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
