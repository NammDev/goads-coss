// Foreplay University hero — .fireside-hero
// DOM: section.section.relative > .container > .fireside-hero > .fireside-hero-logo-wrapper + .university-hero-content + .university-classes-carousel
// .fireside-hero: flex col, center, pt-80px pb-80px, relative, text-center
// .fireside-hero-logo-wrapper: pb-40px
// .fu-logo: h-40px
// .university-hero-content: flex col, gap-28px, center
// .foreplay-university-hero-brackground: absolute, top-0, inset-x-0, h-50vh, z--1, opacity-0.56, bg cover

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"

interface ForeplayUniversityHeroProps {
  logoSrc: string
  logoAlt: string
  title: string
  bgImage: string
  children?: ReactNode // carousel slot
}

export function ForeplayUniversityHero({
  logoSrc,
  logoAlt,
  title,
  bgImage,
  children,
}: ForeplayUniversityHeroProps) {
  return (
    <section className="section relative">
      <div className="container mx-auto w-full max-w-[1440px] px-10">
        {/* .fireside-hero */}
        <div className="relative flex flex-col items-center pt-20 pb-20 text-center">
          {/* .fireside-hero-logo-wrapper */}
          <div className="pb-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} alt={logoAlt} className="h-10" loading="lazy" />
          </div>

          {/* .university-hero-content */}
          <div className="relative flex flex-col items-center gap-7">
            {/* .hero-text */}
            <div className="text-foreground [text-wrap:balance]">
              <h2 className={cn(fpText.displayH2, "max-w-[720px]")}>{title}</h2>
            </div>

            {/* Carousel slot */}
            {children}
          </div>
        </div>
      </div>

      {/* .foreplay-university-hero-brackground */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-1 h-[50vh] opacity-[0.56]"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: "0 0",
          backgroundSize: "cover",
        }}
        aria-hidden="true"
      />
    </section>
  )
}
