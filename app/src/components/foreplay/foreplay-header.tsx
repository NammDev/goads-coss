// Foreplay header — pixel-perfect from foreplay-source.css + foreplay-source.html
// Structure: .container.navbar-container > .nav-stack > .nav-brand | nav > .nav-menu-inner > .navmenu-links | .navmenu-cta

import Link from "next/link"
import { cn } from "@/lib/utils"
import { ForeplayNavLink } from "@/components/foreplay/foreplay-nav-link"
import { ForeplayCtaButton } from "@/components/foreplay/foreplay-cta-button"

const dropdownLinks = [
  { label: "Product", href: "#" },
  { label: "Solutions", href: "#" },
  { label: "Resources", href: "#" },
]

const plainLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "Book a Demo", href: "/book-demo" },
]

export function ForeplayHeader() {
  return (
    <header
      className={cn(
        "sticky top-0 z-[100] text-[var(--fp-alpha-100)]",
        // .navigation: always blur + semi-transparent bg, z-100
        "bg-[var(--fp-nav-bg)] backdrop-blur-[24px]",
      )}
    >
      {/* .container.navbar-container: max-w-1440, mx-auto, px-10 */}
      <div className="relative z-[5] mx-auto flex max-w-[1440px] items-center justify-between px-10">
        {/* .nav-stack: h-[72px], py-3, px-4, gap-9, flex between */}
        <div className="flex h-[72px] w-full items-center justify-between gap-9 p-4">
          {/* .nav-brand: p-1, rounded-[10px], z-[5] */}
          <Link
            href="/home"
            aria-label="GoAds home"
            className="z-[5] rounded-[10px] p-1 focus-visible:shadow-[0_0_0_3px] focus-visible:shadow-secondary focus-visible:outline-none"
          >
            <GoAdsLogo />
          </Link>

          {/* nav > .nav-menu-inner: flex between, gap-10 */}
          <nav className="hidden flex-1 lg:block">
            <div className="flex items-center justify-between gap-10">
              {/* .navmenu-links: flex, gap-3, items-center */}
              <div className="flex items-center gap-3">
                {dropdownLinks.map((link) => (
                  <NavDropdownToggle key={link.label} label={link.label} />
                ))}
                {plainLinks.map((link) => (
                  <ForeplayNavLink key={link.label} href={link.href}>
                    {link.label}
                  </ForeplayNavLink>
                ))}
              </div>

              {/* .navmenu-cta: flex, gap-2, items-center, justify-end */}
              <div className="flex items-center justify-end gap-2">
                <ForeplayNavLink href="/sign-in">Sign in</ForeplayNavLink>
                <ForeplayCtaButton href="/sign-up">Start free trial</ForeplayCtaButton>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

// .nav-dropdown-toggle: flex items-center, gap-1, color #ffffff85
// padding: 6px 6px 6px 10px → py-1.5 pr-1.5 pl-2.5
// .icon-20: size-5
function NavDropdownToggle({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-1 rounded-[10px] py-1.5 pl-2.5 pr-1.5 font-sans text-[0.9375rem] leading-[1.25rem] text-foreground/50 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] hover:text-muted-foreground focus-visible:shadow-[0_0_0_3px] focus-visible:shadow-secondary focus-visible:outline-none"
    >
      {label}
      <span className="flex size-5 items-center justify-center">
        <svg viewBox="0 0 20 20" width="20" height="20" fill="none">
          <path d="M7 8.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  )
}

// Logo SVG 108x32 — Foreplay grid icon + wordmark (replace with GoAds when ready)
function GoAdsLogo() {
  return (
    <svg width="108" height="32" viewBox="0 0 108 32" fill="none" className="text-foreground">
      <path fill="currentColor" d="M4.38 3.43h2.2v6.86H0V8a4.48 4.48 0 0 1 4.38-4.57Z" />
      <path fill="currentColor" d="M17.52 3.43H8.76v6.86h8.76V3.43Z" opacity=".85" />
      <path fill="currentColor" d="M16.43 12.57H8.76v6.86h5.48c1.2 0 2.19-.98 2.19-2.2v-4.66Z" opacity=".7" />
      <path fill="currentColor" d="M24.1 12.57h-5.48v4.67a2.2 2.2 0 0 0 2.19 2.19h3.29v-6.86Z" opacity=".2" />
      <path fill="currentColor" d="M17.52 21.71h6.58v2.3a4.48 4.48 0 0 1-4.39 4.56h-2.19v-6.86Z" opacity=".1" />
      <path fill="currentColor" d="M13.14 21.71H8.76v6.86h6.57v-4.66a2.2 2.2 0 0 0-2.19-2.2Z" opacity=".2" />
      <path fill="currentColor" d="M19.71 3.43A4.48 4.48 0 0 1 24.1 8v2.29H19.7V3.43Z" opacity=".6" />
      <path fill="currentColor" d="M6.57 12.57H0v6.86h6.57v-6.86Z" opacity=".85" />
      <path fill="currentColor" d="M0 21.71h6.57v6.86H4.38A4.48 4.48 0 0 1 0 24v-2.29Z" opacity=".6" />
      <path fill="currentColor" d="M35.07 13.28h1.75v8.58h2.15v-8.58h2.7v-1.96h-2.74v-.88c0-.72.3-1.03.99-1.03h1.75V7.46h-2.03c-1.95 0-2.82.98-2.82 2.88v.98h-1.75v1.96Z" />
      <path fill="currentColor" d="M47.12 21.98c3.08 0 5.15-2.16 5.15-5.39 0-3.2-2.07-5.39-5.15-5.39-3.08 0-5.15 2.18-5.15 5.4s2.07 5.38 5.15 5.38Zm0-1.9c-1.8 0-2.96-1.45-2.96-3.49s1.17-3.5 2.96-3.5c1.8 0 2.98 1.46 2.98 3.5s-1.19 3.5-2.98 3.5Z" />
      <path fill="currentColor" d="M59.08 11.32c-1.65 0-2.46.7-2.97 1.59l-.24-1.59h-1.9v10.54h2.14v-5.29c0-1.63.6-3.17 2.5-3.17h.95v-2.08h-.48Z" />
      <path fill="currentColor" d="M65.18 21.98c2.5 0 4.2-1.58 4.55-3.66H67.6c-.3 1.17-1.24 1.85-2.54 1.85-1.67 0-2.76-1.17-2.82-2.96v-.15h7.61c.04-.28.06-.57.06-.84-.06-3.09-2.01-5.02-4.93-5.02-2.97 0-4.97 2.16-4.97 5.41 0 3.23 2 5.37 5.17 5.37Zm-2.86-6.54A2.65 2.65 0 0 1 65 12.99c1.48 0 2.53.89 2.7 2.45h-5.38Z" />
      <path fill="currentColor" d="M77.03 11.2a3.9 3.9 0 0 0-3.29 1.69l-.25-1.57h-1.86v14.65h2.13v-5.6c.63.95 1.72 1.61 3.27 1.61 2.76 0 4.77-2.14 4.77-5.39 0-3.37-2-5.39-4.77-5.39Zm-.35 8.9c-1.78 0-2.94-1.45-2.94-3.55 0-2.04 1.16-3.46 2.94-3.46 1.77 0 2.96 1.42 2.96 3.5 0 2.06-1.19 3.52-2.96 3.52Z" />
      <path fill="currentColor" d="M83.51 21.86h2.13V7.46h-2.13v14.4Z" />
      <path fill="currentColor" d="M96.95 19.92c-.43 0-.65-.14-.65-.68v-4.21c0-2.5-1.53-3.83-4.22-3.83-2.54 0-4.23 1.28-4.45 3.33h2.09c.16-.92 1-1.54 2.27-1.54 1.4 0 2.2.72 2.2 1.9v.63h-2.54c-2.82 0-4.32 1.21-4.32 3.37 0 1.96 1.54 3.09 3.75 3.09 1.63 0 2.66-.74 3.33-1.81 0 1.05.47 1.69 1.85 1.69h1.13v-1.94h-.44Zm-2.76-2.38c-.02 1.62-1.04 2.71-2.82 2.71-1.16 0-1.87-.61-1.87-1.5 0-1.07.73-1.58 2.05-1.58h2.64v.37Z" />
      <path fill="currentColor" d="m101.04 21.92-.4 1.03c-.3.86-.5 1.07-1.33 1.07h-1.5v1.95h2.28c1.48 0 1.92-.76 2.55-2.47l4.57-12.18h-2.27l-2.74 8-2.82-8h-2.26l3.92 10.6Z" />
    </svg>
  )
}
