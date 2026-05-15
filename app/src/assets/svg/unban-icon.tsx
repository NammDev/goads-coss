// Unban service 3D icon — rounded-square app-icon style (matches BM/profile product-hero icons)
// Visual: blue 3D gradient base (#5EB9FF → #0095F6 → #0066CC) + white open-padlock glyph
// Open padlock semantic: "unlocked" = unbanned / restored access
// 3D effects: linear gradient depth, white sheen on upper half, dark inner shade on lower half
// Padlock path adapted from Heroicons "lock-open" solid (MIT license)

import type { CSSProperties } from "react"

interface UnbanIconProps {
  className?: string
  style?: CSSProperties
}

export function UnbanIcon({ className, style }: UnbanIconProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Unban service"
    >
      <defs>
        {/* 3D fill gradient: lighter top → base → darker bottom */}
        <linearGradient id="unban-base" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5EB9FF" />
          <stop offset="0.45" stopColor="#0095F6" />
          <stop offset="1" stopColor="#0066CC" />
        </linearGradient>
        {/* Top highlight sheen — convex 3D feel */}
        <linearGradient id="unban-shine" x1="12" y1="2" x2="12" y2="13" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="white" stopOpacity="0.45" />
          <stop offset="0.6" stopColor="white" stopOpacity="0.1" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        {/* Bottom inner shade — depth at base */}
        <linearGradient id="unban-shade" x1="12" y1="14" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#003366" stopOpacity="0" />
          <stop offset="1" stopColor="#003366" stopOpacity="0.22" />
        </linearGradient>
      </defs>

      {/* Layer 1 — Rounded-square base with 3D gradient */}
      <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#unban-base)" />

      {/* Layer 2 — Top sheen overlay */}
      <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#unban-shine)" />

      {/* Layer 3 — Bottom shade overlay */}
      <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#unban-shade)" />

      {/* Layer 4 — Subtle drop-shadow under padlock for inner depth */}
      <g transform="translate(5.05 5.2) scale(0.575)" opacity="0.25">
        <path
          fill="#003366"
          d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 0 1-1.5 0V6.75a3.75 3.75 0 1 0-7.5 0v3a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H3.75a3 3 0 0 1-3-3v-6.75a3 3 0 0 1 3-3h9V6.75c0-2.9 2.35-5.25 5.25-5.25Z"
        />
      </g>

      {/* Layer 5 — White open-padlock glyph centered */}
      <g transform="translate(5 5) scale(0.575)">
        <path
          fill="white"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 0 1-1.5 0V6.75a3.75 3.75 0 1 0-7.5 0v3a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H3.75a3 3 0 0 1-3-3v-6.75a3 3 0 0 1 3-3h9V6.75c0-2.9 2.35-5.25 5.25-5.25Z"
        />
      </g>
    </svg>
  )
}
