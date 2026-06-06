// Foreplay header — Resources mega-menu dropdown (100% nested DOM, pixel-perfect)
// Source HTML nesting (foreplay-source.html):
//   nav.nav-dropdown-menu
//     div.nav-dropdown-menu-inner
//       div.nav-resources-menu                       (grid-cols-12, rows: auto auto)
//         div.u-nav-resources-learn                  (col-span 9 / row 1)
//           div.nav-overline-title > div.text-overline "Learn"
//           ul.u-nav-resources-list                  (grid-cols-5, gap-3)
//             li.u-nav-resources-list-item (×5)
//               a.u-nav-link-content                 (flex-col, gap-1, p-2, justify-center, items-start)
//                 div.text-white                     (color:#fff + flex:1 — hidden webflow CSS)
//                   div.u-nav-banner-title           (flex, gap-[5px], nowrap)
//                     div.icon-20 > svg
//                     div.text-label-s
//                 div.nav-text-link-description      (color:alpha-100, flex:1)
//                   div.text-body-s
//         a.u-nav-resources-banner                   (row-span 2, col-span 3, justify-self-end)
//           div.nav-banner-content                   (z-2, flex-col, gap-1, items-center, max-w-[200px])
//             div.text-solid-900                     (color:solid-900 = dark)
//               div.u-nav-banner-title (icon + "Merch")
//             div.u-nav-merch-link-description       (color:solid-900, flex:1, text-left)
//               div.text-body-s
//           div.merch-video                          (absolute, 112%×115%, inset:-1% 0 0 -7%)
//             video
//         div.u-nav-resources-earn                   (col-span 9 / row 2, border-t)
//           div.nav-overline-title > div.text-overline "Earn"
//           ul.u-nav-resources-list                  (ALSO grid-cols-5 — source is identical to Learn)

import type { ReactElement } from "react"
import Link from "next/link"
import { siteText } from "@/components/atoms/typography"
import { HeaderDropdownBase } from "@/components/layout/header-dropdown-base"

interface ResourceItem {
  label: string
  desc: string
  href: string
  icon: () => ReactElement
}

// GoAds content — text + hrefs swapped, icons (SVG) kept unchanged
const learnItems: ResourceItem[] = [
  { label: "Blog", desc: "Tips & guides for media buyers", href: "/blog", icon: UniversityIcon },
  { label: "Docs", desc: "Setup docs & API references", href: "/docs", icon: EventsIcon },
  { label: "Community", desc: "Join discussions", href: "/community", icon: BookIcon },
  { label: "Help Center", desc: "FAQs & support guides", href: "/help", icon: ExpertIcon },
  { label: "Payment Methods", desc: "Accepted payment options", href: "/payment", icon: BlogIcon },
]

const earnItems: ResourceItem[] = [
  { label: "About Us", desc: "5+ yrs in ad infrastructure", href: "/about", icon: AffiliateIcon },
  { label: "Partners", desc: "Exclusive deals from our partners", href: "/partners", icon: DirectoryIcon },
  { label: "Contact", desc: "Real people, fast answers, 24/7", href: "/contact", icon: ContactIcon },
]

export function HeaderResourcesMenu() {
  return (
    <HeaderDropdownBase label="Resources">
      {/* .nav-dropdown-menu-inner — source: width:100% (full nav-stack width), border, rounded-28, overflow-hidden */}
      <div className="w-full overflow-hidden rounded-[28px] border border-[var(--border-nav)] bg-background">
        {/* .nav-resources-menu — grid-cols-12, rows:auto auto */}
        <div className="grid grid-cols-12 grid-rows-[auto_auto]">
          {/* .u-nav-resources-learn — col-span 9 row 1, flex-col gap-4, p-[16px_16px_20px] */}
          <div className="col-span-9 row-start-1 flex flex-col items-start gap-4 px-4 pt-4 pb-5">
            <NavOverlineTitle>Learn</NavOverlineTitle>
            <ResourcesList items={learnItems} />
          </div>

          {/* .u-nav-resources-banner — row-span 2, col-span 3, justify-self-end.
              Text-free mood visual (avatars + stars) so it never pixelates when
              scaled down; ALL copy is crisp HTML overlaid on top. Click →
              Wall of Love (/reviews). Foreplay nav-banner language. */}
          <a
            href="/reviews"
            className="group col-span-3 row-span-2 row-start-1 relative m-2.5 flex w-full max-w-[275px] flex-col items-center justify-end justify-self-end overflow-hidden rounded-[18px] border-l border-[var(--border-nav)] bg-background pb-6 no-underline transition-all duration-200 hover:opacity-95"
          >
            {/* Decorative mood image — fills card, behind content (no text in it) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/wall-of-love.webp"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 size-full scale-105 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {/* Compact bottom scrim — just enough for the single CTA line, so the
                lower avatars stay bright (no big dark band) */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/4 bg-gradient-to-t from-background via-background/70 to-transparent" />

            {/* Crisp HTML copy — single CTA only (heading/subtitle removed per request) */}
            <div className="relative z-[2] flex items-center gap-1 px-4 text-foreground">
              <div className={siteText.labelS}>Read all reviews</div>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
                <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </a>

          {/* .u-nav-resources-earn — col-span 9 row 2, flex-col gap-4, p-[16px_16px_20px]
              (horizontal divider removed per design request) */}
          <div className="col-span-9 row-start-2 flex flex-col items-start gap-4 px-4 pt-4 pb-5">
            <NavOverlineTitle>Company</NavOverlineTitle>
            <ResourcesList items={earnItems} />
          </div>
        </div>
      </div>
    </HeaderDropdownBase>
  )
}

// ── Sub-components mirroring source class names ──

// .nav-overline-title — rounded-[6px], w-full, items-center, p-2, color alpha-50
// Source also has margin-bottom:8px but parent's gap-4 supersedes visual spacing
function NavOverlineTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center rounded-[6px] p-2 text-[var(--alpha-50)]">
      {/* .text-overline */}
      <div className={siteText.overline}>{children}</div>
    </div>
  )
}

// .u-nav-resources-list — ALWAYS grid-cols-5 per source CSS (both Learn and Earn)
// Source: grid-template-columns: 1fr 1fr 1fr 1fr 1fr; gap: 12px; self-stretch
function ResourcesList({ items }: { items: ResourceItem[] }) {
  return (
    <ul className="m-0 grid w-full grid-cols-5 gap-3 self-stretch p-0">
      {items.map((item) => (
        <ResourcesListItem key={item.label} item={item} />
      ))}
    </ul>
  )
}

// .u-nav-resources-list-item — flex:1, items-start, list-none, display:flex
function ResourcesListItem({ item }: { item: ResourceItem }) {
  const Icon = item.icon
  const external = item.href.startsWith("http")
  return (
    <li className="flex flex-1 list-none items-start">
      {/* .u-nav-link-content — flex-col, gap-1, justify-center, items-start, p-2, color alpha-100 */}
      <Link
        href={item.href}
        target={external ? "_blank" : undefined}
        className="flex flex-1 flex-col items-start justify-center gap-1 p-2 text-left text-[var(--alpha-100)] no-underline transition-all duration-200 hover:opacity-80"
      >
        {/* .text-white — color:#fff + flex:1 (hidden webflow CSS) */}
        <div className="flex-1 text-foreground">
          {/* .u-nav-banner-title — flex, gap-[5px], items-center, whitespace-nowrap */}
          <div className="flex items-center gap-[5px] whitespace-nowrap">
            {/* .icon-20 */}
            <div className="flex size-5 items-center justify-center">
              <Icon />
            </div>
            {/* .text-label-s */}
            <div className={siteText.labelS}>{item.label}</div>
          </div>
        </div>
        {/* .nav-text-link-description — color alpha-100, flex:1, text-left */}
        <div className="flex-1 text-left text-[var(--alpha-100)]">
          {/* .text-body-s */}
          <div className={siteText.bodyS}>{item.desc}</div>
        </div>
      </Link>
    </li>
  )
}

// ── Inline icons (white stroke) ──
function UniversityIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M18.25 7.75 10 11.5 1.75 7.75 10 4l8.25 3.75ZM18.25 7.75V13M4.75 9.25v3.23c0 .55.3 1.06.79 1.32L9.29 15.8c.44.24.97.24 1.42 0l3.75-2.01c.49-.26.79-.77.79-1.32V9.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function EventsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="4" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 13h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 8.5V7h1.5v1.5H7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function BookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M6.25 4h7.5a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V4.75A.75.75 0 0 1 6.25 4Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.75 6.25h4.5M7.75 9.25H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function ExpertIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M12.25 14.88 13.75 16 16 12.25M12.25 11.19A6 6 0 0 0 10 10.75c-2.54 0-4.47 1.51-5.26 3.65-.31.83.4 1.6 1.28 1.6h3.23M12.63 5.88a2.63 2.63 0 1 1-5.26 0 2.63 2.63 0 0 1 5.26 0Z" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function BlogIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M8.5 16.75H6.25a1.5 1.5 0 0 1-1.5-1.5V4.75a1.5 1.5 0 0 1 1.5-1.5h7.5a1.5 1.5 0 0 1 1.5 1.5v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.5 16.75V15l2.63-2.63a1.24 1.24 0 0 1 1.75 1.75L13.25 16.75H11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M7.75 6.25h4.5M7.75 9.25h1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function AffiliateIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 16.75a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 6.63v-.75m0 7.5v.74m1.5-6.37c-.75-1.5-3.38-1.09-3.38.58 0 2.18 3.76 1.15 3.76 3.28 0 1.68-3 2.14-3.76.64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function DirectoryIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M16 10v4.5c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 0 1 4 14.5V10m4.13-6h3.75M8.13 4 7.7 7.4a2.32 2.32 0 1 0 4.6 0L11.88 4M8.13 4H5.48a1.5 1.5 0 0 0-1.43 1.05l-.67 2.13a2.17 2.17 0 1 0 4.23.92L8.13 4Zm3.75 0h2.64c.66 0 1.24.43 1.43 1.05l.67 2.13a2.17 2.17 0 1 1-4.23.92L11.88 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ContactIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3.25" y="5" width="13.5" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m4 6 6 4.5L16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
