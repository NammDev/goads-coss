// Verified badge SVG — scalloped 8-bump burst with 3D treatment
// Path data adapted from Heroicons "check-badge" solid (MIT license)
// Color: Meta verified blue (#0095F6 base) with gradient depth + top highlight
// 3D effects: linear gradient (light top → dark bottom), white highlight overlay
// on upper half, drop-shadow glow handled via parent className

import type { CSSProperties } from "react"

interface VerifiedBadgeProps {
  className?: string
  style?: CSSProperties
}

export function VerifiedBadge({ className, style }: VerifiedBadgeProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Verified badge"
    >
      <defs>
        {/* 3D fill gradient: lighter top → base → darker bottom */}
        <linearGradient id="vbadge-burst" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5EB9FF" />
          <stop offset="0.45" stopColor="#0095F6" />
          <stop offset="1" stopColor="#0066CC" />
        </linearGradient>
        {/* Top highlight — soft white sheen on upper half for convex 3D feel */}
        <linearGradient id="vbadge-shine" x1="12" y1="2" x2="12" y2="13" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="white" stopOpacity="0.45" />
          <stop offset="0.6" stopColor="white" stopOpacity="0.1" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        {/* Bottom inner shadow — subtle darkening at base for depth */}
        <linearGradient id="vbadge-base-shade" x1="12" y1="14" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#003366" stopOpacity="0" />
          <stop offset="1" stopColor="#003366" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      {/* Layer 1 — Scalloped burst with main 3D gradient */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="url(#vbadge-burst)"
        d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Z"
      />

      {/* Layer 2 — Top highlight sheen (clipped to burst shape) */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="url(#vbadge-shine)"
        d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Z"
      />

      {/* Layer 3 — Bottom inner shade (clipped to burst, deepens base) */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="url(#vbadge-base-shade)"
        d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Z"
      />

      {/* Layer 4 — White checkmark with subtle drop-shadow for depth */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="rgba(0, 51, 102, 0.25)"
        d="M15.61 10.286a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.32a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="white"
        d="M15.61 10.186a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
      />
    </svg>
  )
}
