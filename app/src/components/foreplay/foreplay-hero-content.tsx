// Foreplay hero content — pixel-perfect from source CSS
// DOM: .home-hero-content > (.text-white > h1.text-display-h1.hero-title) + (.text-alpha-50 > .text-body-l)
// .home-hero-content: flex col, gap-3 (12px), text-center, text-wrap balance, items-center, max-w-[960px]
// .text-display-h1: Inter Display, 3.75rem/4.25rem, font-semibold (600), tracking-[-0.0075em]
// .text-display-h1.hero-title: radial-gradient text fill, text-wrap balance
// .text-body-l: Inter, 1.125rem/1.75rem, font-normal, tracking-[-0.0144444em]
// .text-alpha-50: color var(--_lens---neutral-50) = #ffffffd6

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ForeplayHeroContentProps {
  title: ReactNode
  description?: string
  className?: string
}

export function ForeplayHeroContent({
  title,
  description,
  className,
}: ForeplayHeroContentProps) {
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
            // .text-display-h1: Inter Display, 3.75rem/4.25rem, 600, tracking -0.0075em
            // font-optical-sizing:auto activates Inter's display optical size at 60px
            "font-display text-[3.75rem] font-semibold leading-[4.25rem] tracking-[-0.0075em]",
            "[font-optical-sizing:auto]",
            // .hero-title: gradient text fill + text-wrap balance
            "[text-wrap:balance]",
            "[background-image:radial-gradient(circle_at_50%_-100%,#fff,#ffffffe0)]",
            "bg-clip-text [-webkit-text-fill-color:transparent]",
          )}
        >
          {title}
        </h1>
      </div>

      {/* .text-alpha-50 > .text-body-l */}
      {description && (
        <div className="text-[var(--fp-alpha-50)]">
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
