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
    links: [
      { label: "Business Managers", href: "/bm" },
      { label: "Facebook Assets", href: "/profiles" },
      { label: "TikTok Assets", href: "/tiktok-accounts" },
      { label: "Unban Service", href: "/unban" },
      { label: "Blue Verification", href: "/blue-verification" },
      { label: "Facebook Agency", href: "/agency-ad-account" },
      { label: "Google Agency", href: "/google-agency" },
      { label: "TikTok Agency", href: "/tiktok-agency" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Docs", href: "/docs" },
      { label: "Help Center", href: "/help" },
      { label: "Community", href: "/community" },
      { label: "Reviews", href: "/reviews" },
      { label: "Payment Methods", href: "/payment" },
      { label: "Toolbox", href: "/tools" },
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
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
]
