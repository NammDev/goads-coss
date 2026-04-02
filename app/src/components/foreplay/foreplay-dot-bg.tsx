// Foreplay dot grid background — .dot-bg
// Absolute overlay, sibling of .home-hero inside section
// .dot-bg: absolute, inset-0, w-full, h-full, pointer-events-none, opacity-0.66
// background: dot-grid.webp, 380x380, repeat, centered
// mask: linear-gradient(transparent 0%, black 20% 75%, transparent 100%) — fade top/bottom

import Image from "next/image"
import { cn } from "@/lib/utils"
import dotGrid from "@/assets/68331d86cf0a6a7db433a56d_dot-grid.webp"

interface ForeplayDotBgProps {
  className?: string
}

export function ForeplayDotBg({ className }: ForeplayDotBgProps) {
  return (
    <div
      className={cn(
        // .dot-bg: absolute overlay
        "pointer-events-none absolute inset-0 size-full",
        "opacity-[0.66]",
        // mask: fade top/bottom edges
        "[mask-image:linear-gradient(transparent_0%,#000_20%_75%,transparent_100%)]",
        "[-webkit-mask-image:linear-gradient(transparent_0%,#000_20%_75%,transparent_100%)]",
        className,
      )}
      style={{
        backgroundImage: `url(${dotGrid.src})`,
        backgroundPosition: "50% 0",
        backgroundRepeat: "repeat",
        backgroundSize: "380px 380px",
      }}
      aria-hidden="true"
    />
  )
}
