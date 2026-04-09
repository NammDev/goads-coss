// Foreplay University hero — .fireside-hero
// Source DOM (exact from foreplay.co/university/classes):
// section.section.relative
//   div.container                                  ← wide 1440px
//     div.fireside-hero
//       div.fireside-hero-logo-wrapper
//         img.fu-logo
//       div.university-hero-content
//         div.hero-text
//           div.text-white
//             h2.text-display-h2
//       div.container.section-container           ← SIBLING of .university-hero-content (1216px)
//         div.university-classes-carousel
//   div.foreplay-university-hero-brackground     ← sibling of .container, inside section

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"

interface ForeplayUniversityHeroProps {
  logoSrc: string
  logoAlt: string
  title: string
  bgImage: string
  children?: ReactNode // carousel slot — rendered as sibling of .university-hero-content
}

export function ForeplayUniversityHero({
  logoSrc,
  logoAlt,
  title,
  bgImage,
  children,
}: ForeplayUniversityHeroProps) {
  return (
    <section className="section relative isolate">
      {/* .container (wide 1440px) */}
      <div className="container mx-auto w-full max-w-[1440px] px-10">
        {/* .fireside-hero */}
        <div className="relative flex flex-col items-center pt-20 pb-20 text-center">
          {/* .fireside-hero-logo-wrapper */}
          <div className="pb-10">
            {/* .fu-logo — 191x51px exact */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt={logoAlt}
              width={191}
              height={51}
              className="h-[51px] w-[191px]"
              loading="lazy"
            />
          </div>

          {/* .university-hero-content */}
          <div className="relative flex flex-col items-center gap-7">
            {/* .hero-text: flex col, items-center, justify-start, gap-16px, max-w-900px */}
            <div className="flex max-w-[900px] flex-col items-center justify-start gap-4">
              {/* .text-white */}
              <div className="text-foreground [text-wrap:balance]">
                <h2 className={fpText.displayH2}>{title}</h2>
              </div>
            </div>
          </div>

          {/* .container.section-container — SIBLING of .university-hero-content (1216px) */}
          <div className="mx-auto w-full max-w-[1216px] px-10">
            {children}
          </div>
        </div>
      </div>

      {/* .foreplay-university-hero-brackground
          z-index:-1; opacity:.56; bg cover 0 0; h-50vh; absolute; top:0 left:0 right:0 */}
      <div
        className="absolute inset-x-0 top-0 -z-[1] h-[50vh] opacity-[0.56]"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: "0 0",
          backgroundSize: "cover",
        }}
      />
    </section>
  )
}
