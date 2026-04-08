// Foreplay University course card — .course-card
// .course-card: bg cover, rounded-[10px], 250x375, flex col center, relative, overflow-hidden, box-shadow
// .course-card.coming-soon: bg #ffffff1f overlay, dimmed
// .course-title-wrapper: gradient overlay bottom, flex, items-end, w-full h-full, p-25px
// .fu-card-shine: absolute white blur circle (hover glow)
// .image-155: mix-blend-overlay, w-20px, absolute top-15px right-15px

import Link from "next/link"
import { cn } from "@/lib/utils"
import type { CourseCardData } from "@/data/foreplay-university-classes-page-data"
import { fuLogoIcon } from "@/data/foreplay-university-classes-page-data"

export function ForeplayUniversityCourseCard({
  href,
  bgImage,
  wordmarkSrc,
  isComingSoon,
}: CourseCardData) {
  const cardClassName = cn(
    "group relative flex size-full flex-col items-center justify-center",
    "overflow-hidden rounded-[10px]",
    "h-[375px] w-[250px]",
    "bg-cover bg-center",
    "shadow-[0_0_0_1px_#ffffff26]",
    isComingSoon && "bg-[#ffffff1f]",
  )
  const cardStyle = { backgroundImage: `url(${bgImage})` }

  const content = (
    <>
      {/* "Watch Now" hover overlay (active cards only) */}
      {!isComingSoon && (
        <div className={cn(
          "absolute z-10 flex items-center gap-2.5 rounded-full",
          "bg-[#000000cc] px-[15px] py-2.5 backdrop-blur-[5px]",
          "opacity-0 transition-opacity duration-300 group-hover:opacity-100",
        )}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.prod.website-files.com/62a4ed18ddad95dde8b8bfa4/6716b43bc943259847c9212a_play-icon-blue.svg"
            alt="play icon"
            className="size-5"
          />
          <div className="text-sm font-medium text-foreground">Watch Now</div>
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
          <div className="text-sm font-medium text-[var(--fp-alpha-300)]">Coming Soon</div>
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
    <Link href={href} className={cardClassName} style={cardStyle}>
      {content}
    </Link>
  )
}
