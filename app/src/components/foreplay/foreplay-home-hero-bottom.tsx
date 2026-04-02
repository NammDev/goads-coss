// Foreplay home hero bottom — .home-hero-bottom
// Sibling of .home-hero-top inside .home-hero-sticky
// DOM: .home-hero-bottom > (.text-alpha-100 > .text-overline) + .home-hero-logo-grid > .home-hero-logo-wrapper[]
// .home-hero-bottom: flex col, gap-10 (40px), text-center, text-wrap balance, relative
// .text-overline: 0.75rem/1rem, font-[550], tracking-[0.166667em], uppercase, Inter
// .text-alpha-100: color var(--fp-alpha-100) = #ffffffad
// .home-hero-logo-grid: grid, 7 cols (desktop), gap-4, 2 rows
// .home-hero-logo-wrapper: flex col center, p-3, color muted-foreground, hover fp-alpha-100, transition 200ms
// .home-hero-logo-image: flex center, h-7 (28px)

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { HeroLogo, HERO_LOGO_COUNT } from "@/data/foreplay-hero-logos"

interface ForeplayHomeHeroBottomProps {
  className?: string
}

export function ForeplayHomeHeroBottom({ className }: ForeplayHomeHeroBottomProps) {
  return (
    <div
      className={cn(
        // .home-hero-bottom
        "relative flex flex-col gap-10 text-center [text-wrap:balance]",
        className,
      )}
    >
      {/* .text-alpha-100 > .text-overline */}
      <div className="flex-1 text-[var(--fp-alpha-100)]">
        <p className={fpText.overline}>
          Powering +10,000 Social Ad Teams &amp; Agencies
        </p>
      </div>

      {/* .home-hero-logo-grid: 7 cols desktop, gap-4, 2 rows */}
      <div className="grid auto-cols-fr grid-cols-7 grid-rows-[auto_auto] gap-4">
        {Array.from({ length: HERO_LOGO_COUNT }, (_, i) => (
          <div
            key={i}
            className={cn(
              // .home-hero-logo-wrapper
              "flex flex-col items-center justify-center p-3",
              "text-muted-foreground transition-all duration-200",
              "hover:text-[var(--fp-alpha-100)]",
            )}
          >
            {/* .home-hero-logo-image: h-7 (28px), flex center */}
            <div className="flex h-7 items-center justify-center">
              <HeroLogo index={i} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
