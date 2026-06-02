// Foreplay header — Product mega-menu dropdown (100% nested DOM clone)
//
// Source DOM:
//   nav.nav-dropdown-menu.w-dropdown-list
//     div.nav-dropdown-menu-inner
//       div.nav-product-menu                         ← flex justify-between
//         div.nav-product-menu-links                 ← grid flex-1 grid-cols-10 grid-rows-[auto_auto]
//           div.nav-product-menu-links-research     ← col-span-6 row-1, flex-col items-start p-[16_16_0]
//             div.nav-overline-title > div.text-overline "Research"
//             ul.nav-badge-list.w-list-unstyled    ← flex gap-3 flex-1 items-stretch list-none
//               li.nav-badge (×3)
//                 a.nav-badge-link                  ← flex-col flex-1 items-center pt-2 px-2 relative
//                   div.nav-badge-text              ← flex-col flex-1 items-center
//                     div.text-white                ← color:#fff + flex:1
//                       div.text-label-s            ← title
//                     div.nav-text-link-description ← flex:1 color:alpha-100
//                       div.text-body-s             ← description
//                   div.nav-badge-icon              ← z-2 w-88 h-88 mt-4 mb-[-20] relative
//                     (source uses CSS sprite — we use <img> instead)
//                   div.nav-badge-gradient          ← absolute glow, variants .discovery/.spyder/.lens/.briefs
//           div.nav-product-menu-links-analytics   ← col-span-4 row-1, border-l, flex-col p-[16_16_0]
//             (same structure, 2 badges)
//           div.nav-product-menu-links-sub         ← col-span-10 row-2, border-t, p-4
//             div.nav-overline-title > div.text-overline "Extend"
//             ul.u-nav-product-menu-links-sub-list ← flex gap-3 items-center list-none
//               li.u-nav-product-menu-links-sub-list-item (×3)
//                 a.u-nav-sub-link                  ← flex gap-3 p-2
//                   div.u-nav-icon-box              ← 44x44 bg alpha-700 rounded-12 center
//                     div.icon-24 > div.svg.w-embed > svg
//                   div.u-nav-content               ← flex-col justify-center items-start
//                     div.text-white > div.text-label-s
//                     div.nav-text-link-description.u-nav-text-secondary (desktop: visible) > div.text-body-s
//         div.nav-product-menu-banner              ← HIDDEN ≤1279px, display:flex ≥1280px
//                                                    w-[384px] max-w-[364px] flex-col flex-none
//           div.nav-product-banner-video           ← contains ONLY title (not video!)
//             div.nav-banner-content
//               div.text-white
//                 div.u-nav-banner-title
//                   div.icon-20 > div.svg.w-embed > svg (play-in-circle)
//                   div.text-label-s "What is Foreplay?"
//           a.nav-lightbox.w-lightbox              ← SIBLING of .nav-product-banner-video, contains video
//             div.hero-video-thumb                 ← relative z-3 h-150 (≥1280)
//               video (autoplay loop muted playsInline)
//               div.div-block-356                  ← play button overlay 50px circle
//                 div.icon-20.w-embed > svg
//
// CRITICAL: .nav-product-menu-banner { display:none } on DESKTOP base, only { display:flex } at min-width:1280px
//           → Tailwind: `hidden xl:flex` (xl = 1280px default)
//           This is WHY the Product dropdown broke on narrow viewport — banner was showing when it shouldn't.
//
// Shell (dropdown wrapper + toggle button + nav animation) is DELEGATED to HeaderDropdownBase
// for DRY consistency with Solutions + Resources dropdowns.

"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"
import { HeaderDropdownBase } from "@/components/layout/header-dropdown-base"
import { NavBanner3dLogo } from "@/components/layout/nav-banner-3d-logo"

// ── Product data (matches source order + content) ──
// Sprite mapping verified via frame-count matching source CSS:
//   Source: swipe-file=54f (bg 4752px), discovery=62f (5456px), spyder=31f (2728px),
//           lens=21f (1848px), briefs=55f (4840px). Each frame = 88px wide.
//   Our sprites (W×160): footer_1=9920 (62f=Discovery), footer_2=8640 (54f=Swipe File),
//                        footer_3=4960 (31f=Spyder), footer_4=3360 (21f=Lens), footer_5=8800 (55f=Briefs)
//   Note: footer_1 and footer_2 SWAPPED from previous (wrong) mapping.
// GoAds content — text + hrefs swapped, visual assets (sprites + icons) kept
// PRODUCTS — all core assets & ad-account channels in one row (5 items)
// Static SVG icons replace the sprite-based animations (frames/gradient props no longer used).
// Gradient key matches the icon's brand color (sampled from each SVG's primary stop-color)
// so the hover glow reads as "this product's accent" rather than the original Foreplay sprites.
const products = [
  { label: "Business Manager", desc: "BM1–BM10, verified & aged tiers.", href: "/bm", icon: "/assets/BM.svg", gradient: "blue" },
  { label: "Facebook Profile", desc: "Aged profiles, ready to run.", href: "/profiles", icon: "/assets/PROFILES.svg", gradient: "green" },
  { label: "Facebook Pages", desc: "Verified fan pages with real reach.", href: "/pages", icon: "/navbar/pages.svg", gradient: "purple" },
  { label: "Agency Ad Account", desc: "Verified Meta accounts with higher daily caps.", href: "/agency-ad-account", icon: "/assets/META.svg", gradient: "meta" },
  { label: "TikTok Assets", desc: "Shop, Channel, Business Center.", href: "/tiktok-accounts", icon: "/navbar/tiktok.svg", gradient: "tiktok" },
]

// SERVICES — value-added recovery & verification offerings
const extend = [
  { label: "Unban Service", desc: "Recover disabled BMs, profiles & pages.", href: "/unban", icon: ChromeIcon },
  { label: "Blue Verification", desc: "Verified badge for Pages & Instagram.", href: "/blue-verification", icon: MobileIcon },
]

// Glow gradients (linear-gradient bottom-up). Each color sampled from the matching icon SVG:
// - blue:  BM briefcase (#5B9CFF → bright Foreplay blue)
// - green: Profiles person (#00924B → Foreplay's brand green)
// - purple: Pages document (#7540B7 → brand purple glow)
// - meta:  Agency Ad Account (#0050E4 — actual Meta blue, distinct from BM's lighter blue)
// - tiktok: TikTok signature gradient (cyan #25F4EE → pink #FE2C55) — TikTok icon is gray
//           so the glow uses brand color recognition instead of icon-color match.
const gradientMap: Record<string, string> = {
  blue: "linear-gradient(#1f69ff00, #1f69ff 70%)",
  green: "linear-gradient(#00a87900, #00a879 70%)",
  purple: "linear-gradient(#7540b700, #7540b7 70%)",
  meta: "linear-gradient(#0050e400, #0050e4 70%)",
  tiktok: "linear-gradient(#25f4ee00, #25f4ee4d 30%, #fe2c5599 60%, #fe2c55 80%)",
}

export function HeaderProductMenu() {
  return (
    <HeaderDropdownBase label="Product">
      {/* .nav-dropdown-menu-inner — source: background, border 1px, rounded-28, width:100% (stretch to nav-stack), overflow-hidden */}
      <div className="w-full overflow-hidden rounded-[28px] border border-[var(--border-nav)] bg-background">
        {/* .nav-product-menu — flex justify-between (banner hidden below xl, so on narrow viewport only links shown) */}
        <div className="flex justify-between">
          {/* .nav-product-menu-links — source: display:grid, flex:1, grid-cols-10, grid-rows-[auto_auto] */}
          <div className="grid flex-1 grid-cols-10 grid-rows-[auto_auto]">
            {/* Single full-width product section (5 items combined — no divider) */}
            <ProductSection className="col-span-10 row-start-1 overflow-hidden" title="Products">
              {/* ul.nav-badge-list.w-list-unstyled — flex gap-3 flex-1 items-stretch list-none */}
              <ul className="m-0 flex flex-1 list-none items-stretch gap-3 p-0">
                {products.map((item) => (
                  <ProductBadge key={item.label} {...item} />
                ))}
              </ul>
            </ProductSection>

            {/* .nav-product-menu-links-sub — col-span-10 row-2, border-t, flex-col items-start p-4 */}
            <div className="col-span-10 row-start-2 flex flex-col items-start border-t border-[var(--border-nav)] p-4">
              <SectionLabel>Services</SectionLabel>
              {/* ul.u-nav-product-menu-links-sub-list.w-list-unstyled — flex gap-3 items-center list-none */}
              <ul className="m-0 flex list-none items-center gap-3 p-0">
                {extend.map((item) => {
                  const Icon = item.icon
                  return (
                    // li.u-nav-product-menu-links-sub-list-item
                    <li key={item.label} className="list-none">
                      {/* a.u-nav-sub-link.w-inline-block — flex gap-3 p-2 transition-opacity */}
                      <Link
                        href={item.href}
                        className="flex gap-3 p-2 no-underline transition-opacity hover:opacity-80"
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                      >
                        {/* .u-nav-icon-box — 44x44 bg alpha-700 rounded-12 p-2.5 center */}
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-[12px] bg-[var(--alpha-700)] p-2.5">
                          {/* .icon-24 */}
                          <div className="flex size-6 items-center justify-center">
                            {/* .svg.w-embed (Webflow wrapper — just renders child SVG) */}
                            <Icon />
                          </div>
                        </div>
                        {/* .u-nav-content — flex-col justify-center items-start color:alpha-100 */}
                        <div className="flex flex-col items-start justify-center text-[var(--alpha-100)]">
                          {/* .text-white — color:#fff (source has flex:1 but we OMIT it here because
                                in flex-col parent with icon-box 44px tall, flex:1 on BOTH children spreads
                                the text — causing ~4px extra vertical gap between label and description.
                                User requested: line-height=20px only, no extra spread. */}
                          <div className="text-foreground">
                            {/* .text-label-s — leading-5 (20px) from siteText.labelS */}
                            <div className={cn(siteText.labelS, "leading-5")}>{item.label}</div>
                          </div>
                          {/* .nav-text-link-description.u-nav-text-secondary
                                Source: display:none ONLY in @media ≤991px. Desktop shows it.
                                flex:1 also omitted — same reason as .text-white above. */}
                          <div className="text-[var(--alpha-100)]">
                            {/* .text-body-s — leading-5 (20px) from siteText.bodyS */}
                            <div className={cn(siteText.bodyS, "leading-5")}>{item.desc}</div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* .nav-product-menu-banner — source CSS (desktop base, ≥1280px):
                width:384px; max-width:364px; flex-flow:column; flex:none;
                display:none (base) → display:flex (@media min-width:1280px)
                → Tailwind: `hidden xl:flex` */}
          <div className="hidden w-[384px] max-w-[364px] flex-none flex-col xl:flex">
            {/* .nav-product-banner-video — CONTAINER for BOTH .nav-banner-content + a.nav-lightbox
                  Source CSS (base desktop): flex flex-col flex:1 gap:20px min-h-[204px] px-6
                  Source CSS (≥1280px merged): border-l justify-start items-center pt-20
                  → Verified DOM: .nav-product-banner-video has TWO children: .nav-banner-content AND a.nav-lightbox */}
            <div className="flex min-h-[204px] flex-1 flex-col items-center justify-start gap-5 border-l border-[var(--border-nav)] px-6 pt-20">
              {/* Shared 3D spinning-logo banner (label + mark) */}
              <NavBanner3dLogo />
            </div>
          </div>
        </div>
      </div>
    </HeaderDropdownBase>
  )
}

// ── Sub-components ──

function ProductSection({ className, title, children }: { className?: string; title: string; children: React.ReactNode }) {
  return (
    // .nav-product-menu-links-research / -analytics — flex-col items-start p-[16px_16px_0] (no bottom)
    <div className={cn("flex flex-col items-start px-4 pt-4", className)}>
      <SectionLabel>{title}</SectionLabel>
      {children}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    // .nav-overline-title — rounded-[6px] p-2 mb-2 w-full color:alpha-50 flex items-center
    <div className="mb-2 flex w-full items-center rounded-[6px] p-2 text-[var(--alpha-50)]">
      {/* .text-overline */}
      <div className={siteText.overline}>{children}</div>
    </div>
  )
}

function ProductBadge({
  label,
  desc,
  href,
  icon,
  gradient,
}: {
  label: string
  desc: string
  href: string
  icon: string
  gradient: string
}) {
  return (
    // li.nav-badge — flex flex-1 flex-col items-center list-none
    <li className="flex flex-1 list-none flex-col items-center">
      <Link
        href={href}
        className="group relative flex flex-1 flex-col items-center px-2 pt-2 text-center no-underline transition-all duration-200"
      >
        {/* .nav-badge-text — flex-col flex-1 items-center */}
        <div className="flex flex-1 flex-col items-center">
          <div className="flex-1 text-foreground">
            <div className={siteText.labelS}>{label}</div>
          </div>
          <div className="flex-1 text-[var(--alpha-100)]">
            <div className={siteText.bodyS}>{desc}</div>
          </div>
        </div>
        {/* Static SVG icon — 88×88, z-2, mt-4 mb-[-20px], relative */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={icon}
          alt={label}
          className="relative z-[2] mt-4 mb-[-20px] size-[88px] object-contain"
          loading="lazy"
        />
        {/* .nav-badge-gradient — blurred glow that rises on hover (visual flourish kept). */}
        <div
          className="pointer-events-none absolute bottom-[-40%] aspect-square h-[116px] w-[116px] translate-y-1/2 rounded-[16%] opacity-0 blur-[28px] transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0 group-hover:opacity-100"
          style={{ backgroundImage: gradientMap[gradient] || gradientMap.blue }}
        />
      </Link>
    </li>
  )
}

// ── Inline icons for Extend section ──
function ChromeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M10.53 19.05 12.26 16.04c-.09.01-.17.01-.26.01a4.05 4.05 0 0 1-3.55-2.09L5.52 8.87A7.21 7.21 0 0 0 4.8 12c0 3.47 2.46 6.37 5.73 7.05ZM12.53 19.18A7.2 7.2 0 0 0 19.2 12c0-.79-.13-1.54-.36-2.25h-3.47c.43.64.68 1.42.68 2.25a4.05 4.05 0 0 1-.58 2.09L12.53 19.18ZM13.93 13.16l.02-.04c.19-.33.3-.71.3-1.12a2.25 2.25 0 1 0-4.21 1.13l.02.04A2.25 2.25 0 0 0 13.93 13.16ZM6.63 7.2 8.37 10.21A4.05 4.05 0 0 1 12 7.95h5.95A7.2 7.2 0 0 0 6.63 7.2ZM12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z"
        fill="white"
        fillOpacity="0.68"
      />
    </svg>
  )
}

function MobileIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.7 4.8A2.7 2.7 0 0 1 8.4 2.1h7.2a2.7 2.7 0 0 1 2.7 2.7v14.4a2.7 2.7 0 0 1-2.7 2.7H8.4a2.7 2.7 0 0 1-2.7-2.7V4.8Zm2.7-.9a.9.9 0 0 0-.9.9v14.4c0 .5.4.9.9.9h7.2c.5 0 .9-.4.9-.9V4.8a.9.9 0 0 0-.9-.9H8.4Zm1.8 1.8c0-.5.4-.9.9-.9h1.8c.5 0 .9.4.9.9s-.4.9-.9.9h-1.8a.9.9 0 0 1-.9-.9Z"
        fill="white"
        fillOpacity="0.68"
      />
    </svg>
  )
}

function ApiIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="3.76" cy="3.76" r="1.76" fill="white" fillOpacity="0.68" />
      <circle cx="20.23" cy="3.76" r="1.76" fill="white" fillOpacity="0.68" />
      <circle cx="3.76" cy="20.23" r="1.76" fill="white" fillOpacity="0.68" />
      <circle cx="12" cy="20.23" r="1.76" fill="white" fillOpacity="0.68" />
      <circle cx="20.23" cy="20.23" r="1.76" fill="white" fillOpacity="0.68" />
      <circle cx="12" cy="12" r="1.76" fill="white" fillOpacity="0.68" />
      <circle cx="20.23" cy="12" r="1.76" fill="white" fillOpacity="0.68" />
      <circle cx="3.76" cy="12" r="1.76" fill="white" fillOpacity="0.68" />
    </svg>
  )
}
