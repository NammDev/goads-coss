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
      { label: "Business Managers", href: "/foreplay/bm" },
      { label: "Facebook Assets", href: "/foreplay/profiles" },
      { label: "TikTok Assets", href: "/foreplay/tiktok-accounts" },
      { label: "Unban Service", href: "/foreplay/unban" },
      { label: "Blue Verification", href: "/foreplay/blue-verification" },
      { label: "Facebook Agency", href: "/foreplay/agency-ad-account" },
      { label: "Google Agency", href: "/foreplay/google-agency" },
      { label: "TikTok Agency", href: "/foreplay/tiktok-agency" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/foreplay/blog" },
      { label: "Docs", href: "/foreplay/docs" },
      { label: "Help Center", href: "/foreplay/help" },
      { label: "Community", href: "/foreplay/community" },
      { label: "Reviews", href: "/foreplay/reviews" },
      { label: "Payment Methods", href: "/foreplay/payment" },
      { label: "Toolbox", href: "/foreplay/tools" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "2FA Generator", href: "/foreplay/tools/2fa" },
      { label: "Cookie Converter", href: "/foreplay/tools/cookie" },
      { label: "Account Filter", href: "/foreplay/tools/filter" },
      { label: "Split Data", href: "/foreplay/tools/split-data" },
      { label: "Filter & Merge", href: "/foreplay/tools/merge" },
      { label: "Online Notepad", href: "/foreplay/tools/notepad" },
      { label: "IP Checker", href: "/foreplay/tools/check-ip" },
      { label: "Remove Duplicates", href: "/foreplay/tools/remove-duplicates" },
    ],
  },
  // ── Double-category slot: Company stacked on top of Legal ──
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/foreplay/about" },
      { label: "Milestones", href: "/foreplay/milestones" },
      { label: "Partners", href: "/foreplay/partners" },
      { label: "Pricing", href: "/foreplay/pricing" },
      { label: "Book a Demo", href: "/foreplay/book-demo" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/foreplay/page/privacy-policy" },
      { label: "Terms of Service", href: "/foreplay/page/terms-of-service" },
      { label: "Refund Policy", href: "/foreplay/page/refund-policy" },
    ],
  },
]
