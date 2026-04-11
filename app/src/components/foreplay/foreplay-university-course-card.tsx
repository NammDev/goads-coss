// Foreplay University course card — .course-card
// .course-card: bg cover, rounded-[10px], 250x375, flex col center, relative, overflow-hidden, box-shadow
// .course-card.coming-soon: bg #ffffff1f overlay, dimmed
// .course-title-wrapper: gradient overlay bottom, flex, items-end, w-full h-full, p-25px
// .fu-card-shine: absolute white blur circle (hover glow)
// .image-155: mix-blend-overlay, w-20px, absolute top-15px right-15px
//
// 3D Tilt Effect (active cards only):
//   Source uses `transform-style: preserve-3d` + `rotateX/rotateY` driven by mouse
//   position. We track mouse via onMouseMove and mutate the element's transform
//   directly via ref (no React state → 60fps, no re-renders).
//   Parent `.cards-wrapper-new` provides `perspective: 1000px` context.

"use client"

import { useRef } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { CourseCardData } from "@/data/foreplay-university-classes-page-data"
import { fuLogoIcon } from "@/data/foreplay-university-classes-page-data"

// Max tilt in degrees at card edges
const TILT_MAX_DEG = 12

export function ForeplayUniversityCourseCard({
  href,
  bgImage,
  wordmarkSrc,
  isComingSoon,
}: CourseCardData) {
  const cardRef = useRef<HTMLAnchorElement | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    // Normalised mouse position relative to card center (-1..1)
    const dx = (e.clientX - rect.left) / rect.width - 0.5
    const dy = (e.clientY - rect.top) / rect.height - 0.5
    // Invert Y so moving cursor UP tilts card TOWARDS viewer (standard tilt)
    const rotateY = dx * 2 * TILT_MAX_DEG
    const rotateX = -dy * 2 * TILT_MAX_DEG
    el.style.transform = `translate3d(0,0,0) scale3d(1,1,1) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`
  }

  const handleMouseLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.transform =
      "translate3d(0,0,0) scale3d(1,1,1) rotateX(0deg) rotateY(0deg)"
  }

  const cardClassName = cn(
    "group relative flex size-full flex-col items-center justify-center",
    "overflow-hidden rounded-[10px]",
    "h-[375px] w-[250px]",
    "bg-cover bg-center",
    "shadow-[0_0_0_1px_#ffffff26]",
    // 3D tilt layer — transform-style preserves 3D for children, will-change hints GPU
    !isComingSoon && "[transform-style:preserve-3d] [will-change:transform] transition-transform duration-200 ease-out",
    isComingSoon && "bg-[#ffffff1f]",
  )
  const cardStyle = { backgroundImage: `url(${bgImage})` }

  const content = (
    <>
      {/* .video-coming-soon-button-copy — "Watch Now" pill (active cards only)
          Source CSS:
            display:flex; gap:10px; padding:10px 15px; border-radius:100px;
            background-color:#000c; backdrop-filter:blur(5px); color:var(--body);
            position:absolute; overflow:hidden;
          Source inline `style="opacity:0"` — hidden by default, animated to 1
          on card hover. We use group-hover on the parent .course-card. */}
      {!isComingSoon && (
        <div className={cn(
          "absolute z-10 flex items-center gap-2.5 overflow-hidden rounded-full",
          "bg-[#000000cc] px-[15px] py-2.5 backdrop-blur-[5px]",
          "text-foreground",
          "opacity-0 transition-opacity duration-300 group-hover:opacity-100",
        )}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/foreplay/university_watchnow.svg"
            alt="play icon"
            className="size-5"
            loading="lazy"
          />
          <div className="font-sans text-base">Watch Now</div>
        </div>
      )}

      {/* .course-title-wrapper: gradient bottom overlay */}
      <div className={cn(
        "absolute inset-0 z-[2] flex w-full items-end justify-center",
        "px-6 pb-6",
        isComingSoon
          ? "bg-gradient-to-b from-transparent via-transparent to-[#0000008a]"
          : "bg-gradient-to-b from-transparent via-transparent to-black",
      )}>
        {isComingSoon ? (
          // .text-block-95: opacity .2 only (inherits font-size/color from body)
          <div className="opacity-20">Coming Soon</div>
        ) : wordmarkSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={wordmarkSrc} alt="course wordmark" className="mx-auto" loading="lazy" />
        ) : null}
      </div>

      {/* .image-155: FU logo icon top-right */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={fuLogoIcon}
        alt="foreplay university icon"
        className={cn(
          "absolute right-[15px] top-[15px] z-[3] w-5 mix-blend-overlay",
          isComingSoon && "opacity-10",
        )}
      />

      {/* .fu-card-shine: glowing circle */}
      <div className={cn(
        "pointer-events-none absolute z-[1] size-[125px] rounded-full bg-white",
        isComingSoon
          ? "hidden opacity-[0.09] blur-[50px]"
          : "opacity-[0.31] blur-[70px] transition-opacity group-hover:opacity-50",
      )} />
    </>
  )

  if (isComingSoon) {
    return <div className={cardClassName} style={cardStyle}>{content}</div>
  }

  return (
    <Link
      ref={cardRef}
      href={href}
      className={cardClassName}
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {content}
    </Link>
  )
}
