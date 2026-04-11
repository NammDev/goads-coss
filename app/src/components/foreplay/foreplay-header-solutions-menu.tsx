// Foreplay header — Solutions mega-menu dropdown
// Source DOM:
//   nav.nav-dropdown-menu > .nav-dropdown-menu-inner > .nav-solutions (12-col grid)
//     .u-nav-solutions (padding, label + 4-col grid of items)
//       .nav-overline-title "Foreplay is For;"
//       ul.u-nav-solitions-list (grid 4 cols)
//         li.u-nav-solutions-list-item > a.u-nav-link-solutions-content
//           .industries-icon.small (48x48, rounded-12)
//           .text-label-s (item name)

import Link from "next/link"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplayHeaderDropdownBase } from "@/components/foreplay/foreplay-header-dropdown-base"

// 6 solutions — GoAds target industries (labels kept same, hrefs → /foreplay/industries/*)
const solutions = [
  { label: "E-Commerce & Retail", href: "/foreplay/industries/ecommerce", icon: EcommerceIcon },
  { label: "Agencies", href: "/foreplay/industries/agencies", icon: AgencyIcon },
  { label: "Mobile Apps & Gaming", href: "/foreplay/industries/mobile-apps", icon: MobileIcon },
  { label: "B2B & SaaS", href: "/foreplay/industries/b2b-saas", icon: B2bIcon },
  { label: "Info, Education & Community", href: "/foreplay/industries/info-education-community", icon: EducationIcon },
  { label: "Freelancers & Creators", href: "/foreplay/industries/freelancers-creators", icon: CreatorIcon },
]

export function ForeplayHeaderSolutionsMenu() {
  return (
    <ForeplayHeaderDropdownBase label="Solutions">
      {/* .nav-dropdown-menu-inner: border, rounded-28, bg */}
      <div className="w-full overflow-hidden rounded-[28px] border border-[var(--fp-border-nav)] bg-background">
        {/* .nav-solutions: 12-col grid (source) → use flex col for simpler layout */}
        <div className="flex flex-col">
          {/* .u-nav-solutions: p-4 px-4 pb-5, flex col, gap-4 */}
          <div className="flex flex-col items-start gap-4 px-4 pt-4 pb-5">
            {/* .nav-overline-title */}
            <div className="flex w-full items-center rounded-[6px] p-2 text-[var(--fp-alpha-50)]">
              <div className={fpText.overline}>GoAds is For;</div>
            </div>
            {/* .u-nav-solitions-list: grid 4 cols, gap-3 (actually source uses 4 cols but we have 6 items → use 3 cols) */}
            <ul className="m-0 grid w-full grid-cols-3 gap-3 p-0">
              {solutions.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.label} className="flex list-none items-center">
                    {/* .u-nav-link-solutions-content: flex row, gap-3, p-2, items-center */}
                    <Link
                      href={item.href}
                      className="flex flex-1 items-center gap-3 p-2 text-left text-[var(--fp-alpha-100)] no-underline transition-all duration-200 hover:text-foreground"
                    >
                      {/* .industries-icon.small: 48x48, rounded-12, border 1px neutral-600, center */}
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-[12px] border border-[#ffffff29]">
                        <div className="flex size-6 items-center justify-center">
                          <Icon />
                        </div>
                      </div>
                      <div className="text-foreground">
                        <div className="flex items-center gap-[5px] whitespace-nowrap">
                          <div className={fpText.labelS}>{item.label}</div>
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </ForeplayHeaderDropdownBase>
  )
}

// ── Inline icons ──
function EcommerceIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15 8a3 3 0 0 1-6 0M4.88 5.88l-.75 12a2 2 0 0 0 2 2.12h11.74a2 2 0 0 0 2-2.12l-.75-12a2 2 0 0 0-2-1.88H6.88a2 2 0 0 0-2 1.88Z" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
function AgencyIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 11h18v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 11V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7M13 7h2M5 11V6.2c0-.45.15-.9.44-1.25L6.69 3.4a.99.99 0 0 1 1.62 0l1.25 1.56c.28.35.44.8.44 1.25V11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function MobileIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M8 10v4M8 12h2M8 12H6M6 6h12a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-4a4 4 0 0 1 4-4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14.75" cy="13.5" r="0.875" fill="white" stroke="white" strokeWidth="0.75" />
      <circle cx="17.75" cy="10.5" r="0.875" fill="white" stroke="white" strokeWidth="0.75" />
    </svg>
  )
}
function B2bIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="7" width="18" height="13" rx="2" stroke="white" strokeWidth="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="white" strokeWidth="2" />
    </svg>
  )
}
function EducationIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 8.5 10 12 2 8.5 10 5l8 3.5Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M18 8.5v5M5 10v3.25c0 .55.3 1.06.79 1.32l3.75 2.01c.44.24.97.24 1.42 0l3.75-2.01c.49-.26.79-.77.79-1.32V10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function CreatorIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2" />
      <path d="M4 21v-1a7 7 0 0 1 14 0v1" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
