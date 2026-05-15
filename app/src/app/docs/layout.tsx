// Docs layout — scoped to Foreplay's `.dark` token palette (the single mode).
// goads docs has no light/dark toggle: we override CSS variables inline on the
// layout wrapper so every utility class (`bg-secondary`, `text-foreground`,
// `border-border`, etc.) resolves to Foreplay's exact help-center values.
//
// Source: Foreplay docs `.dark` rule (user-provided), reproduced verbatim.

import type { CSSProperties } from "react"
import { fontInter } from "@/fonts"
import { DocsShell } from "@/components/docs-shell"

const foreplayDocsTokens = {
  "--primary": "hsl(0 0% 100%)",
  "--primary-foreground": "hsl(0 0% 0%)",
  "--accent": "hsl(0 0% 58.43%)",
  "--accent-foreground": "hsl(0 0% 82.75%)",
  "--background": "hsl(225 40% 1.96%)",
  "--foreground": "hsl(226.67 21.26% 75.1%)",
  "--background-accent": "hsl(220 1.59% 37.06%)",
  "--muted": "hsl(240 2.44% 16.08%)",
  "--muted-foreground": "hsl(226.67 21.26% 75.1%)",
  "--dark-accent": "hsl(220 3.9% 15.1%)",
  "--dark-accent-foreground": "hsl(225 21.43% 89.02%)",
  "--popover": "hsl(220 12% 4.9%)",
  "--popover-foreground": "hsl(226.67 21.26% 75.1%)",
  "--border": "hsl(210 2.86% 13.73%)",
  "--input": "hsl(220 5.26% 11.18%)",
  "--card": "hsl(210 4.55% 8.63%)",
  "--card-foreground": "hsl(226.67 21.26% 75.1%)",
  "--secondary": "hsl(210 3.85% 10.2%)",
  "--secondary-foreground": "hsl(226.67 21.26% 75.1%)",
  "--destructive": "hsl(220 5.26% 11.18%)",
  "--destructive-foreground": "hsl(210 40% 98.04%)",
  // Page background propagates to body via the wrapper so the docs surface
  // matches Foreplay's near-black blue-tint instead of the root .light theme.
  backgroundColor: "hsl(225 40% 1.96%)",
  color: "hsl(226.67 21.26% 75.1%)",
  minHeight: "100svh",
} as CSSProperties

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`foreplay ${fontInter.variable} font-sans`}
      style={foreplayDocsTokens}
    >
      <DocsShell>{children}</DocsShell>
    </div>
  )
}
