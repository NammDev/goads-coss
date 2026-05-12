// Blog detail CTA sidebar — .blog-cta (right rail)
//
// Foreplay DOM (from live page foreplay.co/post/api-launch):
// <div class="blog-cta">                            sticky top-120, bg neutral-700, rounded-12
//   <div class="blog-cta-content">                  flex col, p-1 (4px), text-center, rounded-12
//     <a class="blog-cta-lightbox-link">            VIDEO THUMBNAIL — aspect 260/144, rounded-8,
//                                                   bg neutral-800, relative, overflow-hidden
//       <img class="blog-cta-lightbox-thumbnail" /> absolute inset-0 (cover)
//       <div class="blog-cta-lightbox-play">        36px round play btn — bg neutral-800,
//                                                   backdrop-blur-12, centered (abs)
//         <svg play icon />
//     </a>
//     <div class="blog-cta-text">                   flex col, p-3 (12px), items-center
//       <div class="text-white"><div class="text-heading-l">Start your free trial</div></div>
//       <div class="text-alpha-100"><div class="text-body-m">Save, organize...</div></div>
//     </div>
//     <a class="button-dark button-secondary">Start free trial</a>
//   </div>
// </div>

import Image from "next/image"

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplayCtaButton } from "@/components/foreplay/foreplay-cta-button"

interface BlogDetailCtaSidebarProps {
  title: string
  description: string
  ctaHref: string
  ctaLabel: string
  /** Optional thumbnail image (for video CTA card). If omitted, no thumbnail rendered. */
  thumbnail?: { src: string; alt: string }
  /** href the thumbnail click should open (e.g. YouTube watch URL) */
  thumbnailHref?: string
  className?: string
}

// Exact Foreplay play icon — 16×16 viewBox
function PlayIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5.36053 1.54839C4.47202 1.00696 3.33337 1.6465 3.33337 2.68698V13.3131C3.33337 14.3536 4.47203 14.9931 5.36053 14.4517L14.0794 9.1386C14.932 8.619 14.932 7.38107 14.0794 6.86147L5.36053 1.54839Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function BlogDetailCtaSidebar({
  title,
  description,
  ctaHref,
  ctaLabel,
  thumbnail,
  thumbnailHref,
  className,
}: BlogDetailCtaSidebarProps) {
  return (
    // .blog-cta: bg neutral-700 (#ffffff1a), rounded-12
    // (sticky positioning applied by parent grid-item wrapper — same pattern as TOC)
    <div
      className={cn(
        "overflow-hidden rounded-[12px] bg-[#ffffff1a]",
        className,
      )}
    >
      {/* .blog-cta-content: flex col, p-1, text-center, rounded-12 */}
      <div className="flex flex-col gap-0 rounded-[12px] p-1 text-center">
        {/* .blog-cta-lightbox-link — aspect 260/144 video thumbnail, rounded-8, bg neutral-800 */}
        {thumbnail && (
          <a
            href={thumbnailHref ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex aspect-[260/144] w-full cursor-pointer items-center justify-center overflow-hidden rounded-[8px] bg-[#ffffff0f]"
            aria-label={`Watch: ${title}`}
          >
            {/* .blog-cta-lightbox-thumbnail: absolute inset-0 */}
            <Image
              src={thumbnail.src}
              alt={thumbnail.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1279px) 100vw, 280px"
            />
            {/* .blog-cta-lightbox-play: 36px round, bg neutral-800, backdrop-blur-12 */}
            <div className="relative z-[2] flex size-9 items-center justify-center rounded-full bg-[#ffffff0f] text-foreground backdrop-blur-[12px]">
              <PlayIcon />
            </div>
          </a>
        )}

        {/* .blog-cta-text: flex col, p-3, items-center */}
        <div className="flex flex-col items-center gap-2 p-3">
          <div className="text-foreground">
            <div className={fpText.headingL}>{title}</div>
          </div>
          <div className="text-[var(--fp-alpha-100,#ffffffad)]">
            <p className={fpText.bodyM}>{description}</p>
          </div>
        </div>

        {/* .button-dark.button-secondary: CTA button with chevron-right (rotated -90deg) icon */}
        <div className="flex justify-center p-1 pb-2">
          <ForeplayCtaButton href={ctaHref} variant="secondary" showIcon>
            {ctaLabel}
          </ForeplayCtaButton>
        </div>
      </div>
    </div>
  )
}
