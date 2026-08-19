// Footer link categories for GoAds footer (Foreplay 5-column layout preserved)
// Columns: Products and services, Resources, Free Tools, Company, Legal
//
// Column titles deliberately mirror the header nav labels one-for-one. When a
// nav item is renamed, rename it here too — a footer that says "Product" under
// a header that says "Products and services" reads as two different sites.
// Source structure uses .footer-double-category to stack the 5th column (Company + Legal)

export interface FooterLinkCategory {
  title: string
  links: { label: string; href: string; external?: boolean }[]
}

export const footerLinkCategories: FooterLinkCategory[] = [
  {
    title: "Products and services",
    // Matches the navbar "Products and services" mega-menu (Products + Services),
    // exact labels + hrefs + order.
    links: [
      { label: "Business Manager", href: "/bm" },
      { label: "Facebook Profile", href: "/profiles" },
      { label: "Facebook Pages", href: "/pages" },
      { label: "Agency Ad Account", href: "/agency-ad-account" },
      { label: "TikTok Assets", href: "/tiktok-accounts" },
      // Deliberately NOT the mega-menu's "Meta Asset Rental" wording: the
      // footer is a dense link list, and "Renter" is the shorter handle the
      // client wants for /rental here. Same destination.
      { label: "Renter", href: "/rental" },
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
    title: "Free Tools",
    links: [
      { label: "2FA Generator", href: "/tools/2fa" },
      { label: "Check Live UID", href: "/tools/check-uid" },
      { label: "Split Data Profile", href: "/tools/split-data" },
      { label: "IP Checker", href: "/tools/check-ip" },
      { label: "GOADS Extension", href: "/tools/chrome-extension" },
      { label: "GOADS Bookmark", href: "/tools/bookmark" },
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
