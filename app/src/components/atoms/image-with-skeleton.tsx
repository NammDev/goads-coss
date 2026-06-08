"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"

interface ImageWithSkeletonProps {
  src: string
  alt?: string
  /** Tailwind sizing for the wrapper box, e.g. "size-9 shrink-0". */
  className?: string
  /** Extra classes for the <img> itself (object-fit, opacity, radius…). */
  imgClassName?: string
}

/**
 * Plain <img> with a pulsing skeleton placeholder shown until the image loads,
 * then a soft fade-in. For icon/menu images that mount on demand (e.g. the mobile
 * nav submenu) so they don't "pop" in on slower connections. The loading opacity
 * is set inline so it never conflicts with a final opacity utility in imgClassName.
 */
export function ImageWithSkeleton({ src, alt = "", className, imgClassName }: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <span className={cn("relative inline-block overflow-hidden", className)}>
      {!loaded && (
        <span
          className="absolute inset-0 animate-pulse rounded-[8px] bg-[var(--alpha-700)]"
          aria-hidden
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        aria-hidden={alt === "" ? true : undefined}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        style={{ opacity: loaded ? undefined : 0 }}
        className={cn("size-full object-contain transition-opacity duration-300", imgClassName)}
      />
    </span>
  )
}
