// Foreplay header — Product mega-menu dropdown
// Source DOM (from foreplay.co/):
//   div.nav-dropdown
//     div.nav-dropdown-toggle (button: "Product" + chevron)
//     nav.nav-dropdown-menu (absolute, hidden by default)
//       div.nav-dropdown-menu-inner (bg, border, rounded-28)
//         div.nav-product-menu (flex)
//           div.nav-product-menu-links (10-col grid)
//             div.nav-product-menu-links-research (col-span 6) — Swipe File, Discovery, Spyder
//             div.nav-product-menu-links-analytics (col-span 4) — Lens, Briefs
//             div.nav-product-menu-links-sub (col-span 10) — Chrome Extension, Mobile App, API
//           div.nav-product-menu-banner (384px) — "What is Foreplay?" video card
//
// Hover behavior: show on hover button OR menu (no flicker), close on outside click + ESC

"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"

// ── Product data (matches source order + content) ──
const research = [
  { label: "Swipe File", desc: "Save & share creative inspiration.", href: "/swipe-file", icon: "/foreplay/footer_1.webp", gradient: "" },
  { label: "Discovery", desc: "Ad search engine with over 100M ads.", href: "/discovery", icon: "/foreplay/footer_2.webp", gradient: "discovery" },
  { label: "Spyder", desc: "Track and analyze competitor advertising 24/7", href: "/spyder", icon: "/foreplay/footer_3.webp", gradient: "spyder" },
]

const analytics = [
  { label: "Lens", desc: "Advertising analytics for creative teams.", href: "/lens", icon: "/foreplay/footer_4.webp", gradient: "lens" },
  { label: "Briefs", desc: "Turn inspiration into actionable briefs.", href: "/briefs", icon: "/foreplay/footer_5.webp", gradient: "briefs" },
]

const extend = [
  { label: "Chrome Extension", desc: "Save ads from anywhere.", href: "https://chromewebstore.google.com/", icon: ChromeIcon },
  { label: "Mobile App", desc: "Save ads from your phone.", href: "/mobile-app", icon: MobileIcon },
  { label: "API", desc: "Leverage Foreplay data.", href: "/api", icon: ApiIcon },
]

// Map gradient name to source colors (linear-gradient bottom-up)
const gradientMap: Record<string, string> = {
  "": "linear-gradient(#1f69ff00, #1f69ff 70%)",
  discovery: "linear-gradient(#7540b700, #7540b7 70%)",
  spyder: "linear-gradient(#ed615a00, #ed615a 70%)",
  lens: "linear-gradient(#e77e6e00, #e77e6e4d 12%, #e9d46899 31%, #73d3c3bf 52%, #5d78e4 70%)",
  briefs: "linear-gradient(#00a87900, #00a879 70%)",
}

interface ForeplayHeaderProductMenuProps {
  /** Render trigger button (controlled by parent for keyboard/aria) */
  triggerLabel?: string
}

export function ForeplayHeaderProductMenu({ triggerLabel = "Product" }: ForeplayHeaderProductMenuProps) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<NodeJS.Timeout | null>(null)

  // Open/close with delay to prevent flicker between button and menu
  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 100)
  }

  // ESC key + outside click
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    const onClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("mousedown", onClick)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("mousedown", onClick)
    }
  }, [open])

  return (
    // .nav-dropdown — relative wrapper
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      {/* .nav-dropdown-toggle */}
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onFocus={openMenu}
        className={cn(
          "flex items-center gap-1 rounded-[10px] py-1.5 pl-2.5 pr-1.5",
          "font-sans text-[0.9375rem] leading-[1.25rem] text-foreground/50",
          "transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
          "hover:text-foreground focus-visible:outline-none focus-visible:shadow-[0_0_0_3px] focus-visible:shadow-secondary",
          open && "text-foreground",
        )}
      >
        {triggerLabel}
        <span className={cn("flex size-5 items-center justify-center transition-transform duration-300", open && "rotate-180")}>
          <svg viewBox="0 0 20 20" width="20" height="20" fill="none">
            <path d="M7 8.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {/* .nav-dropdown-menu — absolute, top-full, anim opacity + translate + scale */}
      <nav
        className={cn(
          "absolute left-0 right-0 top-full mt-[-5px]",
          "transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-[0.96] opacity-0",
        )}
        aria-hidden={!open}
      >
        {/* .nav-dropdown-menu-inner: bg background, border 1px #2a2b30, rounded-28, overflow-hidden */}
        <div className="overflow-hidden rounded-[28px] border border-[#2a2b30] bg-background">
          {/* .nav-product-menu: flex */}
          <div className="flex">
            {/* .nav-product-menu-links: 10-col grid, flex-1 */}
            <div className="grid flex-1 grid-cols-10">
              {/* RESEARCH — col-span 6, p-4, no padding-bottom */}
              <ProductSection className="col-span-6 overflow-hidden" title="Research">
                <ul className="m-0 flex flex-1 list-none gap-3 p-0">
                  {research.map((item) => (
                    <ProductBadge key={item.label} {...item} />
                  ))}
                </ul>
              </ProductSection>

              {/* ANALYTICS & PRODUCTION — col-span 4, border-l, p-4, no padding-bottom */}
              <ProductSection
                className="col-span-4 overflow-hidden border-l border-[#2a2b30]"
                title="Analytics & Production"
              >
                <ul className="m-0 flex flex-1 list-none gap-3 p-0">
                  {analytics.map((item) => (
                    <ProductBadge key={item.label} {...item} />
                  ))}
                </ul>
              </ProductSection>

              {/* EXTEND — col-span 10 (full row), border-t, p-4 */}
              <div className="col-span-10 flex flex-col items-start border-t border-[#2a2b30] p-4">
                <SectionLabel>Extend</SectionLabel>
                <ul className="m-0 flex list-none items-center gap-3 p-0">
                  {extend.map((item) => {
                    const Icon = item.icon
                    return (
                      <li key={item.label}>
                        {/* .u-nav-sub-link: flex gap-3, p-2 */}
                        <Link
                          href={item.href}
                          className="flex gap-3 p-2 no-underline transition-opacity hover:opacity-80"
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                        >
                          {/* .u-nav-icon-box: 44x44, bg #ffffff1a, rounded-12, p-2.5, center */}
                          <div className="flex size-11 shrink-0 items-center justify-center rounded-[12px] bg-[var(--fp-alpha-700)] p-2.5">
                            <div className="flex size-6 items-center justify-center">
                              <Icon />
                            </div>
                          </div>
                          {/* .u-nav-content */}
                          <div className="flex flex-col items-start justify-center text-[var(--fp-alpha-100)]">
                            <div className="text-foreground">
                              <div className={fpText.labelS}>{item.label}</div>
                            </div>
                            {/* .nav-text-link-description.u-nav-text-secondary — display:none in source */}
                            <div className="hidden flex-1 text-[var(--fp-alpha-100)]">
                              <div className={fpText.bodyS}>{item.desc}</div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>

            {/* .nav-product-menu-banner: 384px (max 364px), flex col, "What is Foreplay?" video */}
            <div className="flex w-96 max-w-[364px] flex-none flex-col">
              {/* .nav-product-banner-video: flex col, end, p-6, gap-5, min-h-[204px] */}
              <div className="flex flex-1 flex-col items-center justify-end gap-5 px-6 pt-6 pb-0 min-h-[204px]">
                {/* .nav-banner-content */}
                <div className="relative z-[2] flex max-w-[200px] flex-col items-center gap-1 text-center text-[var(--fp-alpha-100)]">
                  <div className="text-foreground">
                    {/* .u-nav-banner-title */}
                    <div className="flex items-center gap-[5px] whitespace-nowrap">
                      <span className="flex size-5 items-center justify-center">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                          <path d="M9 12.06V7.94c0-.3.33-.47.57-.3l3.02 2.05c.21.15.21.46 0 .61l-3.02 2.06c-.24.16-.57-.01-.57-.3Z" fill="currentColor" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M10.5 4.13a5.87 5.87 0 1 0 0 11.74 5.87 5.87 0 0 0 0-11.74ZM3.17 10a7.33 7.33 0 1 1 14.67 0 7.33 7.33 0 0 1-14.67 0Z" fill="currentColor" />
                        </svg>
                      </span>
                      <div className={fpText.labelS}>What is Foreplay?</div>
                    </div>
                  </div>
                </div>
                {/* .nav-lightbox — placeholder for video thumbnail (240px max) */}
                <div className="relative w-full max-w-[240px]">
                  <div className="relative aspect-video w-full overflow-hidden rounded-[20px] bg-[var(--fp-alpha-700)]">
                    {/* Play button overlay — .div-block-356: 50x50 backdrop-blur, rounded-full, bg white/50 */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex size-[50px] items-center justify-center rounded-full bg-white/50 backdrop-blur-[10px]">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M15.18 8.72 6.79 3.54c-1-.62-2.29.1-2.29 1.27v10.37c0 1.18 1.29 1.9 2.29 1.28l8.4-5.18c.95-.59.95-1.97 0-2.56Z" fill="white" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

// ── Sub-components ──

function ProductSection({ className, title, children }: { className?: string; title: string; children: React.ReactNode }) {
  return (
    // .nav-product-menu-links-research / -analytics: flex col, items-start, p-4 (no bottom)
    <div className={cn("flex flex-col items-start px-4 pt-4", className)}>
      <SectionLabel>{title}</SectionLabel>
      {children}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    // .nav-overline-title: rounded-6, p-2, mb-2, w-full, color neutral-50
    <div className="mb-2 flex w-full items-center rounded-[6px] p-2 text-[var(--fp-alpha-50)]">
      <div className={fpText.overline}>{children}</div>
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
    // .nav-badge: flex col, items-center, flex-1
    <li className="flex flex-1 list-none flex-col items-center">
      {/* .nav-badge-link: flex col, items-center, pt-2 px-2, transition group */}
      <Link
        href={href}
        className="group relative flex flex-1 flex-col items-center px-2 pt-2 text-center no-underline transition-all duration-200"
      >
        {/* .nav-badge-text */}
        <div className="flex flex-1 flex-col items-center">
          <div className="text-foreground">
            <div className={fpText.labelS}>{label}</div>
          </div>
          {/* .nav-text-link-description: color alpha-100, flex:1 */}
          <div className="flex-1 text-[var(--fp-alpha-100)]">
            <div className={fpText.bodyS}>{desc}</div>
          </div>
        </div>
        {/* .nav-badge-icon: 88x88, mt-4, mb-[-20px], z-2 */}
        <div className="relative z-[2] mt-4 mb-[-20px] size-[88px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={icon} alt={label} className="size-full object-contain" loading="lazy" />
        </div>
        {/* .nav-badge-gradient: glow on hover, blur(28), 116x116, bottom-[-40%] */}
        <div
          className="pointer-events-none absolute bottom-[-40%] aspect-square h-[116px] w-[116px] translate-y-1/2 rounded-[16%] opacity-0 blur-[28px] transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:opacity-60"
          style={{ backgroundImage: gradientMap[gradient] || gradientMap[""] }}
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
