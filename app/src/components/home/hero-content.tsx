// Foreplay hero content — pixel-perfect from source CSS
// DOM: .home-hero-content > (.text-white > h1.text-display-h1.hero-title) + (.text-alpha-50 > .text-body-l)
// .home-hero-content: flex col, gap-3 (12px), text-center, text-wrap balance, items-center, max-w-[960px]
// .text-display-h1: Inter Display, 3.75rem/4.25rem, font-semibold (600), tracking-[-0.0075em]
// .text-display-h1.hero-title: radial-gradient text fill, text-wrap balance
// .text-body-l: Inter, 1.125rem/1.75rem, font-normal, tracking-[-0.0144444em]
// .text-alpha-50: color var(--_lens---neutral-50) = #ffffffd6

import { Fragment, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { SITE_HERO_GRADIENT } from "@/components/atoms/typography"

interface HeroContentProps {
  title: ReactNode
  description?: string
  className?: string
}

// String titles may carry "\n" for an intentional hard line break.
// HTML collapses raw "\n" to a space, so split → <br/> to preserve the break.
function renderTitle(title: ReactNode): ReactNode {
  if (typeof title !== "string" || !title.includes("\n")) return title
  const lines = title.split("\n")
  return lines.map((line, i) => (
    <Fragment key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </Fragment>
  ))
}

export function HeroContent({
  title,
  description,
  className,
}: HeroContentProps) {
  return (
    <div
      className={cn(
        // .home-hero-content
        "flex flex-col items-center gap-3 text-center",
        "max-w-[960px] [text-wrap:balance]",
        className,
      )}
    >
      {/* .text-white > h1.text-display-h1.hero-title */}
      <div className="text-foreground">
        <h1
          className={cn(
            // .text-display-h1.hero-title — responsive cascade matching Foreplay exactly:
            //   ≤479px: 2.375rem/3rem (38/48)  ·  480–767px: 3.25rem/3.75rem (52/60)  ·  ≥768px: 3.75rem/4.25rem (60/68)
            // (goads previously hardcoded 60px at all widths → oversized on mobile.)
            "font-display font-semibold tracking-[-0.0075em] [font-optical-sizing:auto]",
            "text-[2.375rem] leading-[3rem]",
            "min-[480px]:text-[3.25rem] min-[480px]:leading-[3.75rem]",
            "md:text-[3.75rem] md:leading-[4.25rem]",
            // .hero-title: gradient text fill + text-wrap balance
            "[text-wrap:balance]",
            SITE_HERO_GRADIENT,
          )}
        >
          {renderTitle(title)}
        </h1>
      </div>

      {/* .text-alpha-50 > .text-body-l */}
      {description && (
        <div className="text-[var(--alpha-50)]">
          <p
            className={cn(
              // .text-body-l: Inter, 1.125rem/1.75rem, 400, tracking -0.0144444em
              "font-sans text-[1.125rem] font-normal leading-7 tracking-[-0.0144em]",
            )}
          >
            {description}
          </p>
        </div>
      )}
    </div>
  )
}
