// Footer link categories for Foreplay footer
// 5 columns: Product, Resources, Solutions, Company, Community

export interface FooterLinkCategory {
  title: string
  links: { label: string; href: string; external?: boolean }[]
}

export const footerLinkCategories: FooterLinkCategory[] = [
  {
    title: "Product",
    links: [
      { label: "Swipe File", href: "/swipe-file" },
      { label: "Discovery", href: "/discovery" },
      { label: "Spyder", href: "/spyder" },
      { label: "Lens", href: "/lens" },
      { label: "Briefs", href: "/briefs" },
      { label: "Chrome Extension", href: "#", external: true },
      { label: "Mobile App", href: "/mobile-app" },
      { label: "API", href: "/api" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "University", href: "/university" },
      { label: "Knowledge Base", href: "#", external: true },
      { label: "API Docs", href: "#", external: true },
      { label: "Blog", href: "/blog" },
      { label: "Bounties", href: "/bounties" },
      { label: "Events & Webinars", href: "/fireside" },
      { label: "Agency Directory", href: "/agency-directory" },
      { label: "Experts", href: "/experts" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "E-Commerce & Retail", href: "/industries/ecommerce" },
      { label: "Agencies", href: "/industries/agencies" },
      { label: "Mobile Apps & Gaming", href: "/industries/mobile-apps" },
      { label: "B2B & SaaS", href: "/industries/b2b-saas" },
      { label: "Info, Education & Community", href: "/industries/info-education-community" },
      { label: "Freelancers & Creators", href: "/industries/freelancers-creators" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Book a Demo", href: "/book-demo" },
      { label: "Careers", href: "/careers" },
      { label: "Public Library", href: "/adlibrary" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Affiliate Program", href: "/affiliates" },
      { label: "Wall of Love", href: "/reviews" },
      { label: "Feature Requests", href: "#", external: true },
      { label: "Public Road Map", href: "#", external: true },
      { label: "Merch Store", href: "#", external: true },
    ],
  },
]
