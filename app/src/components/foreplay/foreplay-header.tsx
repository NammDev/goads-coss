// Foreplay header — 100% nested DOM clone from foreplay-source.html + source.css
//
// Source DOM chain (desktop):
//   header.navigation                         ← sticky top-0 z-100 backdrop-blur bg-[#020308eb]
//     div.container.navbar-container          ← max-w-1440 mx-auto flex items-center justify-between px-10 (40px)
//       div.nav-stack                         ← flex gap-9 items-center justify-between w-full p-4 relative
//         a.nav-brand.w-nav-brand             ← z-5 p-1 rounded-10
//           div.u-nav-brand-logo              ← h-8 transition
//             div.svg.w-embed > svg (logo)
//           div.sr-only "Foreplay"
//         nav.nav-menu.w-nav-menu             ← flex-1 position:static (hidden on mobile)
//           div.nav-menu-inner                ← flex justify-between
//             div.navmenu-links               ← flex items-center gap-3 justify-start
//               div.nav-dropdown.w-dropdown (Product)    ← padding-0 position:static
//               div.nav-dropdown.w-dropdown (Solutions)
//               div.nav-dropdown.w-dropdown (Resources)
//               a.navlink (Pricing) > div.text-navlink
//               a.navlink (Book a Demo) > div.text-navlink
//             div.navmenu-cta                 ← flex items-center gap-2 justify-end
//               a.navlink.u-navlink-signin (Sign in)
//               a.new-button.new-button-navbar (Start free trial)
//
// DESKTOP CSS cascade (verified via media-query-aware extraction):
//   .container           { max-width:1440px; padding: 0 40px }  ← wins over .navbar-container{max-width:1340px}
//   .container.navbar-container { padding: 0 8px }              ← MOBILE ONLY (@media ≤991px), NOT desktop
//   .nav-stack           { padding: 16px; position:relative }   ← p-4 (desktop)
//   .nav-stack           { padding-top/bottom:12px; height:72px } ← MOBILE ONLY, NOT desktop
//   .navbar-container    { position:relative }                  ← MOBILE ONLY
//
// Box model at 1800px viewport:
//   .container.navbar-container content = 1440 - 80 = 1360px (matches DevTools 1360×72)
//   .nav-stack padding-box  = 1360px → dropdown nav absolute left:0 right:0 width = 1360px

import Link from "next/link"
import { cn } from "@/lib/utils"
import { ForeplayNavLink } from "@/components/foreplay/foreplay-nav-link"
import { ForeplayCtaButton } from "@/components/foreplay/foreplay-cta-button"
import { ForeplayHeaderProductMenu } from "@/components/foreplay/foreplay-header-product-menu"
import { ForeplayHeaderSolutionsMenu } from "@/components/foreplay/foreplay-header-solutions-menu"
import { ForeplayHeaderResourcesMenu } from "@/components/foreplay/foreplay-header-resources-menu"
import { ForeplayHeaderMobileMenu } from "@/components/foreplay/foreplay-header-mobile-menu"

export function ForeplayHeader() {
  return (
    // .navigation — source: sticky top-0 z-100 backdrop-blur-24 bg-[#020308eb] color:alpha-100
    <header
      className={cn(
        "sticky top-0 z-[100] text-[var(--fp-alpha-100)]",
        "bg-[var(--fp-nav-bg)] backdrop-blur-[24px]",
      )}
    >
      {/* .container.navbar-container — DESKTOP computed:
          .container wins for max-width:1440px + padding:0 40px (comes later in CSS than .navbar-container)
          .navbar-container adds: display:flex, justify-content:space-between, align-items:center
          position:relative + px-2 (8px) + z-5 are MOBILE ONLY (.container.navbar-container inside @media ≤991px) */}
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-10">
        {/* .nav-stack — DESKTOP: flex gap-9 items-center justify-between w-full p-4 relative
            (py-3 and h-[72px] are MOBILE ONLY overrides)
            CRITICAL: position:relative here is the positioning context for child nav.nav-dropdown-menu
            which uses position:absolute top:100% left:0% right:0% — escaping through .nav-dropdown (static). */}
        <div className="relative flex w-full items-center justify-between gap-9 p-4">
          {/* .nav-brand.w-nav-brand — source: z-5 rounded-10 p-1 (custom .nav-brand adds rounded-10 + p-1) */}
          <Link
            href="/home"
            aria-label="GoAds home"
            className="z-[5] rounded-[10px] p-1 focus-visible:shadow-[0_0_0_3px] focus-visible:shadow-secondary focus-visible:outline-none"
          >
            {/* .u-nav-brand-logo — source: h-8 transition hover:opacity-80 */}
            <div className="h-8 transition-all duration-200 hover:opacity-80">
              {/* .svg.w-embed — Webflow SVG wrapper (no styles) */}
              <div className="flex h-full items-center">
                <GoAdsLogo />
              </div>
            </div>
            <span className="sr-only">Foreplay</span>
          </Link>

          {/* Mobile hamburger — sibling of .nav-brand in our React implementation (shown only ≤991px) */}
          <ForeplayHeaderMobileMenu />

          {/* nav.nav-menu.w-nav-menu — source: flex-1 position:static (desktop only) */}
          <nav
            role="navigation"
            className="static hidden flex-1 max-md:hidden lg:block"
          >
            {/* .nav-menu-inner — source: flex justify-between (NO gap, NO items-center) */}
            <div className="flex justify-between">
              {/* .navmenu-links — source: flex items-center gap-3 justify-start */}
              <div className="flex items-center justify-start gap-3">
                {/* .nav-dropdown.w-dropdown (Product) */}
                <ForeplayHeaderProductMenu />
                {/* .nav-dropdown.w-dropdown (Solutions) */}
                <ForeplayHeaderSolutionsMenu />
                {/* .nav-dropdown.w-dropdown (Resources) */}
                <ForeplayHeaderResourcesMenu />
                {/* a.navlink (Tools) — plain link to /foreplay/tools hub */}
                <ForeplayNavLink href="/foreplay/tools">Tools</ForeplayNavLink>
                {/* a.navlink (Pricing) */}
                <ForeplayNavLink href="/foreplay/pricing">Pricing</ForeplayNavLink>
                {/* a.navlink (Book a Demo) */}
                <ForeplayNavLink href="/foreplay/book-demo">Book a Demo</ForeplayNavLink>
              </div>

              {/* .navmenu-cta — source: flex items-center gap-2 justify-end */}
              <div className="flex items-center justify-end gap-2">
                {/* a.navlink.u-navlink-signin */}
                <ForeplayNavLink href="/sign-in">Sign in</ForeplayNavLink>
                {/* a.new-button.new-button-navbar */}
                <ForeplayCtaButton href="/sign-up">Start free trial</ForeplayCtaButton>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
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
