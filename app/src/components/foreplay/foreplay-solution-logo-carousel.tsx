// Foreplay solution logo carousel — `.industries-carousel-container`
//
// Verbatim Foreplay CSS (source: foreplay-source.css):
//   .industries-carousel-container {
//     justify-content: space-between; padding: 64px 0 24px;
//     display: flex; position: relative; overflow: hidden;
//   }
//   .industries-carousel-logos {
//     justify-content: space-around; align-items: stretch;
//     min-width: 100%; display: flex;
//     /* animated via translate3d for infinite scroll */
//   }
//   .industry-carousel-image {
//     border: 1px solid var(--_lens---neutral-600); /* #ffffff29 */
//     border-radius: 20px; width: 100px; height: 100px;
//   }
//   .industries-carousel-fade {
//     background-image: linear-gradient(90deg, #020308, #02030800 15%,
//                                       #02030800 85%, #020308);
//     position: absolute; inset: 0%;
//   }
//
// Animation:
//   We duplicate `.industries-carousel-logos` (two side-by-side copies, each
//   min-w-full → container is 200% wide). Both copies share the same
//   `marquee-horizontal` keyframe which translates them by -100% in sync.
//   When copy 1 fully scrolls off-screen left, copy 2 has slid into copy 1's
//   slot — and because the content is identical, the loop restart (snap from
//   -100% back to 0%) is invisible → seamless infinite scroll.
//
//   `--marquee-duration` controls speed (40s ≈ Foreplay's pace). The keyframe
//   uses `var(--marquee-gap, 0px)` fallback so undefined gap doesn't break calc.
//
// Accessibility:
//   `prefers-reduced-motion: reduce` pauses the animation (covered by the
//   global motion-reduce rule in globals.css line 703–710).

import { cn } from "@/lib/utils"

interface ForeplaySolutionLogoCarouselProps {
  logos: { src: string; alt: string }[]
  className?: string
  /** Animation duration. Lower = faster scroll. Default 40s (Foreplay pace). */
  durationSeconds?: number
}

export function ForeplaySolutionLogoCarousel({
  logos,
  className,
  durationSeconds = 40,
}: ForeplaySolutionLogoCarouselProps) {
  return (
    // .industries-carousel-container
    <div
      className={cn(
        "relative flex justify-between overflow-hidden pt-16 pb-6",
        className,
      )}
      style={
        {
          "--marquee-duration": `${durationSeconds}s`,
          "--marquee-gap": "0px",
        } as React.CSSProperties
      }
    >
      {/* Duplicate the logo row twice for seamless infinite scroll.
          `aria-hidden` on the second copy so screen readers don't announce
          the same logos twice. */}
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1 ? "true" : undefined}
          className="flex min-w-full shrink-0 items-stretch justify-around motion-safe:[animation:marquee-horizontal_var(--marquee-duration)_linear_infinite]"
        >
          {logos.map((logo, j) => (
            // .industry-carousel-logo
            <div key={`${i}-${j}`} className="px-2">
              {/* .industry-carousel-image — 100×100 desktop, scales down on
                  smaller viewports (Foreplay tablet 65px / mobile 50px). */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={i === 0 ? logo.alt : ""}
                loading="lazy"
                className="size-[100px] rounded-[20px] border border-[#ffffff29] object-cover max-md:size-[65px] max-md:rounded-xl max-sm:size-[50px] max-sm:rounded-[10px]"
              />
            </div>
          ))}
        </div>
      ))}

      {/* .industries-carousel-fade — left/right gradient blends into bg.
          Verbatim from source: 15% fade in, 85% fade out, color is the
          .foreplay --background (#020308). pointer-events-none so the
          overlay never intercepts clicks (logos remain hoverable). */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--background), transparent 15%, transparent 85%, var(--background))",
        }}
      />
    </div>
  )
}
