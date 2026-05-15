// About us 3D icon — rounded-square app-icon style matching BM/profile/unban product-hero icons
// Visual: blue 3D gradient base + white "sparkles" glyph centered
// Sparkles semantic: "premium service / shine / quality" — fits About Us context
// 3D effects: linear gradient depth, white top sheen, dark inner shade at base
// Sparkles glyph from Heroicons "sparkles" solid (MIT license)

import type { CSSProperties } from "react"

interface AboutIconProps {
  className?: string
  style?: CSSProperties
}

export function AboutIcon({ className, style }: AboutIconProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="About GOADS"
    >
      <defs>
        <linearGradient id="about-base" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5EB9FF" />
          <stop offset="0.45" stopColor="#0095F6" />
          <stop offset="1" stopColor="#0066CC" />
        </linearGradient>
        <linearGradient id="about-shine" x1="12" y1="2" x2="12" y2="13" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="white" stopOpacity="0.45" />
          <stop offset="0.6" stopColor="white" stopOpacity="0.1" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="about-shade" x1="12" y1="14" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#003366" stopOpacity="0" />
          <stop offset="1" stopColor="#003366" stopOpacity="0.22" />
        </linearGradient>
      </defs>

      {/* Layer 1 — Base rounded square */}
      <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#about-base)" />
      {/* Layer 2 — Top sheen */}
      <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#about-shine)" />
      {/* Layer 3 — Bottom shade */}
      <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#about-shade)" />

      {/* Layer 4 — Subtle drop-shadow under sparkles */}
      <g transform="translate(4.05 4.2) scale(0.65)" opacity="0.22">
        <path
          fill="#003366"
          d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 8.28 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
        />
      </g>

      {/* Layer 5 — White sparkles glyph centered */}
      <g transform="translate(4 4) scale(0.65)">
        <path
          fill="white"
          d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 8.28 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
        />
      </g>
    </svg>
  )
}
