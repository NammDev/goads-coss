// Foreplay home hero bottom — .home-hero-bottom
// Sibling of .home-hero-top inside .home-hero-sticky
// DOM: .home-hero-bottom > [platform strip] + [KPI grid]
// .home-hero-bottom: flex col, gap-10 (40px), text-center, text-wrap balance, relative
//
// Platform strip — follows Foreplay's overline+row pattern (replaces original logo-grid)
//   .text-alpha-100 > .text-overline label + horizontal row of 3 colored brand SVGs
//   Logos sized h-9 (36px), gap-10 horizontal spacing
//
// KPI grid: 6 KPIs total — 2 cols mobile / 3 cols tablet / 6 cols desktop single row
//   gap-4 (16px) matches Foreplay's original logo grid gap exactly
//   KPI value: displayH4 (Inter Display, 1.75rem/2.25rem, 600)
//   KPI label: bodyS (Inter, 0.875rem/1.25rem) in alpha-50

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { MetaLogo, FacebookLogo, InstagramLogo } from "@/components/foreplay/foreplay-platform-logos"

interface ForeplayHomeHeroBottomProps {
  className?: string
}

interface Kpi {
  value: string
  label: string
}

const HERO_KPIS: readonly Kpi[] = [
  { value: "$50M+", label: "Ad spend powered" },
  { value: "99.8%", label: "Account uptime" },
  { value: "<2hr", label: "Account delivery" },
  { value: "1000+", label: "Active agencies" },
  { value: "24/7", label: "Live support" },
  { value: "47", label: "Countries served" },
] as const

export function ForeplayHomeHeroBottom({ className }: ForeplayHomeHeroBottomProps) {
  return (
    <div
      className={cn(
        // .home-hero-bottom — gap reduced from Foreplay's 40px → 24px to tighten logo↔KPI ratio
        "relative flex flex-col gap-6 text-center [text-wrap:balance]",
        className,
      )}
    >
      {/* Platform logos — Foreplay .home-hero-logo-grid spec + medium logos:
          - grid gap-4 (16px) between cells, 3 equal 1fr columns, max-w 560px centered
          - wrapper: p-3 + flex col center + transition all 200ms (matches .home-hero-logo-wrapper)
          - image: h-10 (40px) — scaled up from Foreplay's h-7 base, balanced prominence */}
      <div className="mx-auto grid w-full max-w-[560px] grid-cols-3 gap-4">
        {[
          { Logo: MetaLogo, glow: "rgba(0,130,251,0.45)" },
          { Logo: FacebookLogo, glow: "rgba(24,119,242,0.45)" },
          { Logo: InstagramLogo, glow: "rgba(214,41,118,0.5)" },
        ].map(({ Logo, glow }, i) => (
          <div
            key={i}
            className="group flex flex-col items-center justify-center p-3 transition-all duration-300"
          >
            <div
              className="flex h-10 items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110"
              style={{ filter: `drop-shadow(0 0 14px ${glow}) saturate(1.25)` }}
            >
              <Logo className="h-full w-auto" />
            </div>
          </div>
        ))}
      </div>

      {/* KPI grid: 2 cols mobile → 3 cols tablet → 6 cols desktop. Gap-4 matches Foreplay logo grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {HERO_KPIS.map((kpi) => (
          <div
            key={kpi.label}
            className={cn(
              // mirrors .home-hero-logo-wrapper: flex col center, p-3
              "flex flex-col items-center justify-center gap-0.5 p-3",
              "transition-all duration-200",
            )}
          >
            {/* KPI value — Foreplay display-h5 (1.5rem/2rem, 600) for refined SaaS feel */}
            <span className={cn(fpText.displayH5, "text-foreground")}>
              {kpi.value}
            </span>
            {/* Label — refined small caption: 0.8125rem (13px), alpha-50 muted */}
            <span className="font-sans text-[0.8125rem] font-normal leading-5 tracking-[-0.005em] text-[var(--fp-alpha-50)]">
              {kpi.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
