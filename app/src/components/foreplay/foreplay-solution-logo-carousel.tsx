// Foreplay solution logo carousel — .industries-carousel-container
// Infinite scroll brand logos with fade overlay
// .industries-carousel-container: flex, justify-between, pt-16 pb-6, relative, overflow-hidden
// .industries-carousel-logos: flex, justify-around, items-stretch, min-w-full (duplicated for infinite)
// .industry-carousel-image: border 1px neutral-600, rounded-[20px], 100x100 (desktop), 65x65 (tablet), 50x50 (mobile)
// .industries-carousel-fade: absolute inset-0, gradient left/right fade to background

import { cn } from "@/lib/utils"

interface ForeplaySolutionLogoCarouselProps {
  logos: { src: string; alt: string }[]
  className?: string
}

export function ForeplaySolutionLogoCarousel({ logos, className }: ForeplaySolutionLogoCarouselProps) {
  return (
    // .industries-carousel-container
    <div className={cn("relative flex justify-between overflow-hidden pt-16 pb-6", className)}>
      {/* Duplicate logos for infinite scroll effect */}
      {[0, 1].map(i => (
        // .industries-carousel-logos
        <div
          key={i}
          className="flex min-w-full items-stretch justify-around [--marquee-duration:30s] [animation:marquee-horizontal_var(--marquee-duration)_linear_infinite]"
        >
          {logos.map((logo, j) => (
            // .industry-carousel-logo > .industry-carousel-image
            <div key={j} className="px-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className="size-[100px] rounded-[20px] border border-[#ffffff29] object-cover max-md:size-[65px] max-md:rounded-xl max-sm:size-[50px] max-sm:rounded-[10px]"
              />
            </div>
          ))}
        </div>
      ))}

      {/* .industries-carousel-fade — gradient fade left/right */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(90deg, var(--background), transparent 15%, transparent 85%, var(--background))",
        }}
      />
    </div>
  )
}
