// Shared layout for the documentation surface (/docs + /help).
// Route group — does NOT affect URLs. Provides the Foreplay docs token palette
// once; each child (docs/help) only supplies its own shell. (DRY)

import { fontInter } from "@/fonts"
import { foreplayDocsTokens } from "@/lib/foreplay-docs-tokens"

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`foreplay ${fontInter.variable} font-sans`}
      style={foreplayDocsTokens}
    >
      {children}
    </div>
  )
}
