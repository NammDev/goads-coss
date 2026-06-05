// Footer link categories for GoAds footer (Foreplay 5-column layout preserved)
// Columns: Product, Resources, Tools, Company, Legal
// Source structure uses .footer-double-category to stack the 5th column (Company + Legal)

export interface FooterLinkCategory {
  title: string
  links: { label: string; href: string; external?: boolean }[]
}

export const footerLinkCategories: FooterLinkCategory[] = [
  {
    title: "Product",
    // Matches the navbar Product mega-menu (Products + Services), exact labels + hrefs + order.
    links: [
      { label: "Business Manager", href: "/bm" },
      { label: "Facebook Profile", href: "/profiles" },
      { label: "Facebook Pages", href: "/pages" },
      { label: "Agency Ad Account", href: "/agency-ad-account" },
      { label: "TikTok Assets", href: "/tiktok-accounts" },
      { label: "Unban Service", href: "/unban" },
      { label: "Blue Verification", href: "/blue-verification" },
    ],
  },
  {
    title: "Resources",
    // Matches the navbar Resources mega-menu (Learn items + Reviews). Order follows the menu.
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Docs", href: "/docs" },
      { label: "Community", href: "/community" },
      { label: "Help Center", href: "/help" },
      { label: "Payment Methods", href: "/payment" },
      { label: "Reviews", href: "/reviews" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "2FA Generator", href: "/tools/2fa" },
      { label: "Check Live UID", href: "/tools/check-uid" },
      { label: "Split Data Profile", href: "/tools/split-data" },
      { label: "IP Checker", href: "/tools/check-ip" },
      { label: "GOADS Extension", href: "/tools/goads-extension" },
      { label: "Temp Mail", href: "/tempmail" },
    ],
  },
  // ── Double-category slot: Company stacked on top of Legal ──
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Partners", href: "/partners" },
      { label: "Pricing", href: "/pricing" },
      { label: "Book a Demo", href: "/book-demo" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
]
