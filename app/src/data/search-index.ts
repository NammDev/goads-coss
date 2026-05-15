import {
  BookOpen,
  CircleHelp,
  FileText,
  Home,
  LayoutGrid,
  MessageSquare,
  ShoppingCart,
  Wrench,
  type LucideIcon,
} from "lucide-react"

import { TOOLS } from "@/data/tools-registry"
import { blogPosts } from "@/data/blog-posts"
import { docsTabs, type DocsNavItem } from "@/data/docs-navigation"
import { FAQ_ITEMS } from "@/data/landing-faq"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SearchCategory = "pages" | "tools" | "blog" | "docs" | "faq"

export interface SearchItem {
  id: string
  title: string
  description: string
  href: string
  category: SearchCategory
  icon: LucideIcon
  keywords: string
}

export const SEARCH_CATEGORIES: Record<
  SearchCategory,
  { label: string; icon: LucideIcon }
> = {
  pages: { label: "Pages", icon: Home },
  tools: { label: "Tools", icon: Wrench },
  blog: { label: "Blog", icon: FileText },
  docs: { label: "Documentation", icon: BookOpen },
  faq: { label: "FAQ", icon: CircleHelp },
}

// ---------------------------------------------------------------------------
// Pages — hardcoded key marketing routes
// ---------------------------------------------------------------------------

const PAGES: SearchItem[] = [
  { id: "p-home", title: "Home", description: "GoAds homepage", href: "/", category: "pages", icon: Home, keywords: "home landing goads" },
  { id: "p-bm", title: "Business Manager", description: "Buy Meta Business Manager accounts", href: "/bm", category: "pages", icon: ShoppingCart, keywords: "bm business manager meta facebook" },
  { id: "p-agency", title: "Agency Ad Account", description: "Meta agency ad accounts for scaling", href: "/agency", category: "pages", icon: ShoppingCart, keywords: "agency ad account meta facebook" },
  { id: "p-google", title: "Google Agency", description: "Google whitelisted agency accounts", href: "/google-agency", category: "pages", icon: ShoppingCart, keywords: "google ads agency whitelisted" },
  { id: "p-tiktok-agency", title: "TikTok Agency", description: "TikTok verified agency accounts", href: "/tiktok-agency", category: "pages", icon: ShoppingCart, keywords: "tiktok agency verified" },
  { id: "p-tiktok-accounts", title: "TikTok Accounts", description: "TikTok ad accounts", href: "/tiktok-accounts", category: "pages", icon: ShoppingCart, keywords: "tiktok accounts ads" },
  { id: "p-profiles", title: "Profiles", description: "Facebook profiles for advertising", href: "/profiles", category: "pages", icon: ShoppingCart, keywords: "profiles facebook" },
  { id: "p-pages", title: "Pages & Assets", description: "Facebook pages and ad assets", href: "/pages", category: "pages", icon: ShoppingCart, keywords: "pages assets facebook" },
  { id: "p-blue", title: "Blue Verification", description: "Meta blue badge verification", href: "/blue-verification", category: "pages", icon: ShoppingCart, keywords: "blue verification badge meta" },
  { id: "p-unban", title: "Unban Service", description: "Account recovery and unban service", href: "/unban", category: "pages", icon: ShoppingCart, keywords: "unban recovery disabled account" },
  { id: "p-tools", title: "Free Tools", description: "Essential toolkit for ads management", href: "/tools", category: "pages", icon: LayoutGrid, keywords: "tools free utilities" },
  { id: "p-blog", title: "Blog", description: "Guides and tutorials for advertisers", href: "/blog", category: "pages", icon: FileText, keywords: "blog articles guides" },
  { id: "p-docs", title: "Documentation", description: "Knowledge base and help center", href: "/docs", category: "pages", icon: BookOpen, keywords: "docs documentation help" },
  { id: "p-sales", title: "Talk to Sales", description: "Contact our sales team", href: "/book-demo", category: "pages", icon: MessageSquare, keywords: "contact sales support telegram" },
]

// ---------------------------------------------------------------------------
// Tools — from tools registry
// ---------------------------------------------------------------------------

const TOOL_ITEMS: SearchItem[] = TOOLS.map((t) => ({
  id: `tool-${t.slug}`,
  title: t.title,
  description: t.description,
  href: `/tools/${t.slug}`,
  category: "tools" as const,
  icon: t.icon,
  keywords: `${t.title} ${t.description} ${t.slug} ${t.category}`,
}))

// ---------------------------------------------------------------------------
// Blog posts
// ---------------------------------------------------------------------------

const BLOG_ITEMS: SearchItem[] = blogPosts.map((p) => ({
  id: `blog-${p.slug}`,
  title: p.title,
  description: p.description.slice(0, 120),
  href: `/blog/${p.slug}`,
  category: "blog" as const,
  icon: FileText,
  keywords: `${p.title} ${p.category} ${p.description.slice(0, 80)}`,
}))

// ---------------------------------------------------------------------------
// Docs — flatten nested navigation
// ---------------------------------------------------------------------------

function flattenDocs(
  items: DocsNavItem[],
  parentPath: string,
): SearchItem[] {
  const result: SearchItem[] = []
  for (const item of items) {
    const path = `${parentPath}/${item.slug}`
    if (item.items?.length) {
      result.push(...flattenDocs(item.items, path))
    } else {
      result.push({
        id: `doc-${path}`,
        title: item.title,
        description: `Documentation: ${item.title}`,
        href: `/docs${path}`,
        category: "docs",
        icon: BookOpen,
        keywords: `${item.title} docs documentation`,
      })
    }
  }
  return result
}

const DOC_ITEMS: SearchItem[] = docsTabs.flatMap((tab) =>
  flattenDocs(tab.items, `/${tab.slug}`),
)

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

const FAQ_SEARCH_ITEMS: SearchItem[] = FAQ_ITEMS.map((f, i) => ({
  id: `faq-${i}`,
  title: f.question,
  description: f.answer.slice(0, 100),
  href: "/#faq",
  category: "faq" as const,
  icon: CircleHelp,
  keywords: `${f.question} ${f.answer.slice(0, 60)}`,
}))

// ---------------------------------------------------------------------------
// Combined index
// ---------------------------------------------------------------------------

export const SEARCH_INDEX: SearchItem[] = [
  ...PAGES,
  ...TOOL_ITEMS,
  ...BLOG_ITEMS,
  ...DOC_ITEMS,
  ...FAQ_SEARCH_ITEMS,
]
