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
// Shell (dropdown wrapper + toggle button + nav animation) is DELEGATED to ForeplayHeaderDropdownBase
// for DRY consistency with Solutions + Resources dropdowns.

"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplayHeaderDropdownBase } from "@/components/foreplay/foreplay-header-dropdown-base"

// ── Product data (matches source order + content) ──
// Sprite mapping verified via frame-count matching source CSS:
//   Source: swipe-file=54f (bg 4752px), discovery=62f (5456px), spyder=31f (2728px),
//           lens=21f (1848px), briefs=55f (4840px). Each frame = 88px wide.
//   Our sprites (W×160): footer_1=9920 (62f=Discovery), footer_2=8640 (54f=Swipe File),
//                        footer_3=4960 (31f=Spyder), footer_4=3360 (21f=Lens), footer_5=8800 (55f=Briefs)
//   Note: footer_1 and footer_2 SWAPPED from previous (wrong) mapping.
// GoAds content — text + hrefs swapped, visual assets (sprites + icons) kept
const research = [
  { label: "Business Managers", desc: "BM1–BM10, verified & standard.", href: "/foreplay/bm", icon: "/foreplay/footer_2.webp", frames: 54, gradient: "" },
  { label: "Facebook Assets", desc: "Profiles & Pages — aged, verified.", href: "/foreplay/profiles", icon: "/foreplay/footer_1.webp", frames: 62, gradient: "discovery" },
  { label: "TikTok Assets", desc: "Shop, Channel, Business Center.", href: "/foreplay/tiktok-accounts", icon: "/foreplay/footer_3.webp", frames: 31, gradient: "spyder" },
]

const analytics = [
  { label: "Unban Meta Assets", desc: "Recover disabled BMs, profiles & pages.", href: "/foreplay/unban", icon: "/foreplay/footer_4.webp", frames: 21, gradient: "lens" },
  { label: "Blue Verification", desc: "Verified badge for Pages & Instagram.", href: "/foreplay/blue-verification", icon: "/foreplay/footer_5.webp", frames: 55, gradient: "briefs" },
]

const extend = [
  { label: "Facebook Agency", desc: "Verified FB ad accounts.", href: "/foreplay/agency-ad-account", icon: ChromeIcon },
  { label: "Google Agency", desc: "Whitelisted Google Ads billing.", href: "/foreplay/google-agency", icon: MobileIcon },
  { label: "TikTok Agency", desc: "Verified TikTok ads accounts.", href: "/foreplay/tiktok-agency", icon: ApiIcon },
]

// Map gradient name to source colors (linear-gradient bottom-up)
const gradientMap: Record<string, string> = {
  "": "linear-gradient(#1f69ff00, #1f69ff 70%)",
  discovery: "linear-gradient(#7540b700, #7540b7 70%)",
  spyder: "linear-gradient(#ed615a00, #ed615a 70%)",
  lens: "linear-gradient(#e77e6e00, #e77e6e4d 12%, #e9d46899 31%, #73d3c3bf 52%, #5d78e4 70%)",
  briefs: "linear-gradient(#00a87900, #00a879 70%)",
}

export function ForeplayHeaderProductMenu() {
  return (
    <ForeplayHeaderDropdownBase label="Product">
      {/* .nav-dropdown-menu-inner — source: background, border 1px, rounded-28, width:100% (stretch to nav-stack), overflow-hidden */}
      <div className="w-full overflow-hidden rounded-[28px] border border-[var(--fp-border-nav)] bg-background">
          {/* .nav-product-menu — flex justify-between (banner hidden below xl, so on narrow viewport only links shown) */}
          <div className="flex justify-between">
            {/* .nav-product-menu-links — source: display:grid, flex:1, grid-cols-10, grid-rows-[auto_auto] */}
            <div className="grid flex-1 grid-cols-10 grid-rows-[auto_auto]">
              {/* .nav-product-menu-links-research — col-span-6 row-1, flex-col items-start p-[16px_16px_0] overflow-hidden */}
              <ProductSection className="col-span-6 row-start-1 overflow-hidden" title="Research">
                {/* ul.nav-badge-list.w-list-unstyled — flex gap-3 flex-1 items-stretch list-none */}
                <ul className="m-0 flex flex-1 list-none items-stretch gap-3 p-0">
                  {research.map((item) => (
                    <ProductBadge key={item.label} {...item} />
                  ))}
                </ul>
              </ProductSection>

              {/* .nav-product-menu-links-analytics — col-span-4 row-1, border-l, p-[16px_16px_0] overflow-hidden */}
              <ProductSection
                className="col-span-4 row-start-1 overflow-hidden border-l border-[var(--fp-border-nav)]"
                title="Analytics & Production"
              >
                {/* ul.nav-badge-list */}
                <ul className="m-0 flex flex-1 list-none items-stretch gap-3 p-0">
                  {analytics.map((item) => (
                    <ProductBadge key={item.label} {...item} />
                  ))}
                </ul>
              </ProductSection>

              {/* .nav-product-menu-links-sub — col-span-10 row-2, border-t, flex-col items-start p-4 */}
              <div className="col-span-10 row-start-2 flex flex-col items-start border-t border-[var(--fp-border-nav)] p-4">
                <SectionLabel>Extend</SectionLabel>
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
                          <div className="flex size-11 shrink-0 items-center justify-center rounded-[12px] bg-[var(--fp-alpha-700)] p-2.5">
                            {/* .icon-24 */}
                            <div className="flex size-6 items-center justify-center">
                              {/* .svg.w-embed (Webflow wrapper — just renders child SVG) */}
                              <Icon />
                            </div>
                          </div>
                          {/* .u-nav-content — flex-col justify-center items-start color:alpha-100 */}
                          <div className="flex flex-col items-start justify-center text-[var(--fp-alpha-100)]">
                            {/* .text-white — color:#fff (source has flex:1 but we OMIT it here because
                                in flex-col parent with icon-box 44px tall, flex:1 on BOTH children spreads
                                the text — causing ~4px extra vertical gap between label and description.
                                User requested: line-height=20px only, no extra spread. */}
                            <div className="text-foreground">
                              {/* .text-label-s — leading-5 (20px) from fpText.labelS */}
                              <div className={cn(fpText.labelS, "leading-5")}>{item.label}</div>
                            </div>
                            {/* .nav-text-link-description.u-nav-text-secondary
                                Source: display:none ONLY in @media ≤991px. Desktop shows it.
                                flex:1 also omitted — same reason as .text-white above. */}
                            <div className="text-[var(--fp-alpha-100)]">
                              {/* .text-body-s — leading-5 (20px) from fpText.bodyS */}
                              <div className={cn(fpText.bodyS, "leading-5")}>{item.desc}</div>
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
              <div className="flex min-h-[204px] flex-1 flex-col items-center justify-start gap-5 border-l border-[var(--fp-border-nav)] px-6 pt-20">
                {/* .nav-banner-content — source: z-index:2 gap:4px color:#ffffffad text-align:center
                    flex-col justify-content:flex-start align-items:center max-width:200px
                    display:flex position:relative */}
                <div className="relative z-[2] flex max-w-[200px] flex-col items-center justify-start gap-1 text-center text-[var(--fp-alpha-100)]">
                  {/* .text-white — source: color:#fff, flex:1 (Webflow hidden CSS) */}
                  <div className="flex-1 text-foreground">
                    {/* .u-nav-banner-title — source: gap:5px, white-space:nowrap, align-items:center,
                        justify-content:flex-start, display:flex */}
                    <div className="flex items-center justify-start gap-[5px] whitespace-nowrap">
                      {/* .icon-20 — source: width:20px, height:20px */}
                      <div className="size-5">
                        {/* .svg.w-embed — Webflow SVG wrapper */}
                        <div className="w-embed">
                          <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.99609 12.0563V7.94385C8.99609 7.64927 9.32595 7.47495 9.56934 7.64091L12.5851 9.69713C12.7986 9.84269 12.7986 10.1574 12.5851 10.303L9.56934 12.3592C9.32595 12.5252 8.99609 12.3508 8.99609 12.0563Z" fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.5002 4.13301C7.26013 4.13301 4.63354 6.7596 4.63354 9.99968C4.63354 13.2398 7.26013 15.8663 10.5002 15.8663C13.7403 15.8663 16.3669 13.2398 16.3669 9.99968C16.3669 6.7596 13.7403 4.13301 10.5002 4.13301ZM3.16687 9.99968C3.16687 5.94959 6.45011 2.66634 10.5002 2.66634C14.5503 2.66634 17.8335 5.94959 17.8335 9.99968C17.8335 14.0497 14.5503 17.333 10.5002 17.333C6.45011 17.333 3.16687 14.0497 3.16687 9.99968Z" fill="white" />
                          </svg>
                        </div>
                      </div>
                      {/* .text-label-s */}
                      <div className={fpText.labelS}>What is GoAds?</div>
                    </div>
                  </div>
                </div>
                {/* a.nav-lightbox.w-inline-block.w-lightbox — CHILD of .nav-product-banner-video
                    (verified via closing-div count in source HTML — 4 closes before <a>: text-label-s,
                    u-nav-banner-title, text-white, nav-banner-content → remaining stack has banner-video)
                    Source CSS: width:100%, max-width:240px, position:relative
                    ≥1280px: border-radius:10px, overflow:hidden */}
                <a
                  href="#"
                  aria-label="open lightbox"
                  aria-haspopup="dialog"
                  className="relative w-full max-w-[240px] overflow-hidden rounded-[10px]"
                >
                  {/* .hero-video-thumb.w-background-video.w-background-video-atom
                      ≥1280px: z-index:3 height:150px position:relative flex center */}
                  <div className="relative z-[3] flex h-[150px] w-full items-center justify-center">
                    {/* <video> — autoplay loop muted playsinline (Webflow .w-background-video spec) */}
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="absolute inset-0 z-[-100] size-full object-cover"
                    >
                      <source
                        src="/video/62a4ed18ddad95dde8b8bfa4_69612b690e2aeb02841afc4f_FOREPLAY_V6_mp4.mp4"
                        type="video/mp4"
                      />
                    </video>
                    {/* .div-block-356 — backdrop-blur:10 bg:#ffffff80 rounded-100 50×50 flex center */}
                    <div className="flex size-[50px] items-center justify-center rounded-full bg-white/50 backdrop-blur-[10px]">
                      {/* .icon-20.w-embed — combined class (20×20 + Webflow SVG wrapper) */}
                      <div className="size-5 w-embed">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.1838 8.72416L6.78824 3.53868C5.78891 2.92144 4.5 3.64029 4.5 4.81488V15.1859C4.5 16.3604 5.7889 17.0792 6.78823 16.4621L15.1838 11.2766C16.1328 10.6904 16.1328 9.31028 15.1838 8.72416Z" fill="white" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
    </ForeplayHeaderDropdownBase>
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
    <div className="mb-2 flex w-full items-center rounded-[6px] p-2 text-[var(--fp-alpha-50)]">
      {/* .text-overline */}
      <div className={fpText.overline}>{children}</div>
    </div>
  )
}

function ProductBadge({
  label,
  desc,
  href,
  icon,
  frames,
  gradient,
}: {
  label: string
  desc: string
  href: string
  icon: string
  frames: number
  gradient: string
}) {
  // Sprite sheet: N frames × 88px wide, scaled to container height (100% = 88px)
  // background-size: (frames×88)px 100%; each frame = 88px wide.
  const spriteWidth = frames * 88
  const lastFrame = frames - 1
  const DURATION_MS = 1000 // full play duration

  // rAF-driven frame index (0..lastFrame). Using rAF (not CSS transition)
  // so that rapid hover-in/out doesn't cause `steps()` interruption jitter —
  // we always interpolate from the CURRENT frame proportionally.
  const [frame, setFrame] = useState(0)
  const frameRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const hoveredRef = useRef(false)

  const animate = useCallback(
    (target: number) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      const start = frameRef.current
      if (start === target) return
      // Proportional duration: moving 10/54 frames → only 10/54 of DURATION_MS.
      // Prevents speed scaling artifacts on rapid reverse.
      const distance = Math.abs(target - start)
      const duration = (distance / lastFrame) * DURATION_MS
      const t0 = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - t0) / duration, 1)
        const next = Math.round(start + (target - start) * progress)
        frameRef.current = next
        setFrame(next)
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          rafRef.current = null
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    },
    [lastFrame],
  )

  const onEnter = () => {
    hoveredRef.current = true
    animate(lastFrame)
  }
  const onLeave = () => {
    hoveredRef.current = false
    animate(0)
  }

  // Cleanup rAF on unmount
  useEffect(() => () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    // li.nav-badge — flex flex-1 flex-col items-center list-none
    <li className="flex flex-1 list-none flex-col items-center">
      {/* a.nav-badge-link.w-inline-block — flex-col flex-1 items-center pt-2 px-2 text-center transition
          Source color: #000000ad (overridden by .text-white child to #fff)
          onMouseEnter/Leave trigger sprite frame animation via React state. */}
      <Link
        href={href}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className="group relative flex flex-1 flex-col items-center px-2 pt-2 text-center no-underline transition-all duration-200"
      >
        {/* .nav-badge-text — flex-col flex-1 items-center */}
        <div className="flex flex-1 flex-col items-center">
          {/* .text-white — color:#fff + flex:1 (Webflow hidden CSS) */}
          <div className="flex-1 text-foreground">
            {/* .text-label-s */}
            <div className={fpText.labelS}>{label}</div>
          </div>
          {/* .nav-text-link-description — color:alpha-100 + flex:1 */}
          <div className="flex-1 text-[var(--fp-alpha-100)]">
            {/* .text-body-s */}
            <div className={fpText.bodyS}>{desc}</div>
          </div>
        </div>
        {/* .nav-badge-icon.sprite-image.sprite-{name} — 88×88, z-2, mt-4 mb-[-20px], relative
            Source: CSS background sprite with JS-driven frame animation on hover.
            Our clone: requestAnimationFrame loop manually driving frame index (0..lastFrame).
            - Not hovered: frame 0 (bg-pos 0)
            - Hovered: animates to lastFrame over 1s
            - Interruption: rAF cancels and interpolates from current frame proportionally,
              so rapid hover-in/out no longer causes `steps()` jitter. */}
        <div
          className="relative z-[2] mt-4 mb-[-20px] size-[88px] bg-no-repeat"
          style={{
            backgroundImage: `url(${icon})`,
            backgroundSize: `${spriteWidth}px 100%`,
            backgroundPosition: `${-frame * 88}px 0px`,
          }}
        />
        {/* .nav-badge-gradient (+ variant class .discovery/.spyder/.lens/.briefs)
            Source CSS:
              Base: opacity:0; transform:translateY(50%); filter:blur(28px); aspect-ratio:1;
                    width:116px; height:116px; border-radius:16%; bottom:-40%; position:absolute;
                    transition: all .8s cubic-bezier(.19,1,.22,1);
              Hover (@media ≥992px): .nav-badge-link:hover .nav-badge-gradient {
                    opacity:1; transform:translateY(0%);
              }
            Effect: base pushed down+invisible (translateY:50% + opacity:0), on hover moves UP
                    (translateY:0 → bottom:-40% position) and fades in (opacity:1), overlaying
                    the bottom half of the icon with blurred color glow.
            Tailwind: group-hover:translate-y-0 group-hover:opacity-100 */}
        <div
          className="pointer-events-none absolute bottom-[-40%] aspect-square h-[116px] w-[116px] translate-y-1/2 rounded-[16%] opacity-0 blur-[28px] transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0 group-hover:opacity-100"
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
