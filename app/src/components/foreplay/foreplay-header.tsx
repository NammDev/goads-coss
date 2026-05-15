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
import { ForeplayHeaderResourcesMenu } from "@/components/foreplay/foreplay-header-resources-menu"
import { ForeplayHeaderToolsMenu } from "@/components/foreplay/foreplay-header-tools-menu"
import { ForeplayHeaderMobileMenu } from "@/components/foreplay/foreplay-header-mobile-menu"
import { ForeplayLogoSvg } from "@/components/foreplay/footer/foreplay-logo-svg"

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
            href="/"
            aria-label="GoAds home"
            className="z-[5] rounded-[10px] p-1 focus-visible:shadow-[0_0_0_3px] focus-visible:shadow-secondary focus-visible:outline-none"
          >
            {/* .u-nav-brand-logo — h-10 (40px). Inline SVG so panda silhouette
                uses `currentColor` and blends with the navbar bg (no opaque black box).
                Wrapper's text color is set to var(--fp-nav-bg) so the panda body fills
                with the navbar's painted color, reproducing the original punch-through. */}
            <div className="h-10 text-[var(--fp-nav-bg)] transition-all duration-200 hover:opacity-80">
              <div className="flex h-full items-center">
                <ForeplayLogoSvg />
              </div>
            </div>
            <span className="sr-only">GoAds</span>
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
                {/* .nav-dropdown.w-dropdown (Tools) — GoAds Toolbox mega-menu */}
                <ForeplayHeaderToolsMenu />
                {/* .nav-dropdown.w-dropdown (Resources) */}
                <ForeplayHeaderResourcesMenu />
                {/* a.navlink (Pricing) */}
                <ForeplayNavLink href="/pricing">Pricing</ForeplayNavLink>
                {/* a.navlink (Book a Demo) */}
                <ForeplayNavLink href="/book-demo">Book a Demo</ForeplayNavLink>
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

