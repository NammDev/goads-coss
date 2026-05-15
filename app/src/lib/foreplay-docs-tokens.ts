// Shared Foreplay docs/help token palette (single mode — no light/dark toggle).
// Inline CSS-var overrides so every utility class resolves to Foreplay's exact
// help-center values. Used by the (documentation) route-group layout that wraps
// both /docs and /help so the surface is defined in one place (DRY).

import type { CSSProperties } from "react"

export const foreplayDocsTokens = {
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
  backgroundColor: "hsl(225 40% 1.96%)",
  color: "hsl(226.67 21.26% 75.1%)",
  minHeight: "100svh",
} as CSSProperties
