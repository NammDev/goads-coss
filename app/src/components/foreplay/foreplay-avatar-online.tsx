// Foreplay avatar with online-indicator dot — .calendar-pop-up-headshot + .calendar-pop-up-online
// CSS: 35x35 circle (background-image), online dot 7x7 lime-green, absolute top:1 right:1
// Used in both the collapsed trigger chip and the expanded popup header.

import { cn } from "@/lib/utils"

interface ForeplayAvatarOnlineProps {
  src: string
  alt: string
  /** Square size in px — Foreplay default is 35 */
  size?: number
  /** Show the lime-green online dot — Foreplay default is true */
  showOnline?: boolean
  className?: string
}

export function ForeplayAvatarOnline({
  src,
  alt,
  size = 35,
  showOnline = true,
  className,
}: ForeplayAvatarOnlineProps) {
  return (
    // Outer wrapper is positioning context only — NOT clipped, so the online
    // dot can sit at the edge of the avatar without being chopped off.
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size }}
    >
      {/* Inner circle clips the image to a round shape */}
      <div className="size-full overflow-hidden rounded-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="size-full object-cover"
          loading="lazy"
        />
      </div>
      {showOnline && (
        // .calendar-pop-up-online — 7x7 lime-green dot, absolute top:1 right:1
        <span className="pointer-events-none absolute top-px right-px block size-[7px] rounded-full bg-[var(--fp-lime-green)] ring-2 ring-white" />
      )}
    </div>
  )
}
