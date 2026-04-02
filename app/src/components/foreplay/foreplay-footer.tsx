// Foreplay footer — footer.u-footer > .container.footer-container > .u-footer-block
// .u-footer: mt-10 (40px), pt-24 (96px, mobile override), pb-10 (40px)
// .u-footer-block: flex col, gap-11 (44px via grid-row-gap), pb-[60px]
// .footer-products: flex, justify-between, gap-4
// .footer-divider: bg neutral-600, h-px
// .footer-company: flex, gap-[60px], items-center
// .footer-links: grid 5 cols, gap-4
// .footer-bottom: flex between

import Link from "next/link"
import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplaySectionContainer } from "@/components/foreplay/foreplay-section-container"

const footerLinks = [
  {
    category: "Product",
    links: [
      { label: "Swipe File", href: "/swipe-file" },
      { label: "Discovery", href: "/discovery" },
      { label: "Spyder", href: "/spyder" },
      { label: "Lens", href: "/lens" },
      { label: "Briefs", href: "/briefs" },
      { label: "Chrome Extension", href: "#" },
      { label: "Mobile App", href: "/mobile-app" },
      { label: "API", href: "/api" },
    ],
  },
  {
    category: "Resources",
    links: [
      { label: "University", href: "/university" },
      { label: "Knowledge Base", href: "/knowledge-base" },
      { label: "API Docs", href: "/api-docs" },
      { label: "Blog", href: "/blog" },
      { label: "Events & Webinars", href: "/events" },
      { label: "Experts", href: "/experts" },
    ],
  },
  {
    category: "Solutions",
    links: [
      { label: "Agencies", href: "/agencies" },
      { label: "Brands", href: "/brands" },
      { label: "E-commerce", href: "/ecommerce" },
    ],
  },
  {
    category: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Careers", href: "/careers" },
      { label: "Book a Demo", href: "/book-demo" },
    ],
  },
  {
    category: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
]

export function ForeplayFooter() {
  return (
    <footer className="mt-10 pt-24 pb-10">
      <ForeplaySectionContainer variant="footer">
        {/* .u-footer-block */}
        <div className="flex flex-col gap-11 pb-[60px]">
          {/* .footer-divider */}
          <div className="h-px w-full bg-border" />

          {/* .footer-links: 5 col grid */}
          <div className="grid grid-cols-5 gap-4">
            {footerLinks.map((col) => (
              <div key={col.category}>
                {/* .text-overline (category header) */}
                <div className={cn(fpText.overline, "mb-4 text-[var(--fp-alpha-100)]")}>
                  {col.category}
                </div>
                {/* .u-footer-link-list */}
                <ul className="flex flex-col gap-1">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={cn(fpText.bodyS, "block py-0.5 text-[var(--fp-alpha-100)] transition-colors duration-200 hover:text-foreground")}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* .footer-bottom */}
          <div className="flex w-full justify-between">
            <div className={cn(fpText.bodyS, "text-[var(--fp-alpha-100)]")}>
              &copy; {new Date().getFullYear()} GoAds. All rights reserved.
            </div>
          </div>
        </div>
      </ForeplaySectionContainer>
    </footer>
  )
}
