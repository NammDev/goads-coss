// Foreplay tool page shell — page wrapper for /tools/{slug}.
// Provides: section padding + wide container + sidebar (lg+) + content slot
//           + promo rail (xl+, GOADS builds only).
// On mobile: mobile drawer trigger renders above content, promo moves below it.
// Spec: see docs/foreplay/tool-design-language.md → Layout pattern.

import type { ReactNode } from "react"

import { SectionContainer } from "@/components/atoms/section-container"
import {
  ToolsSidebar,
  ToolsSidebarMobile,
} from "@/components/tools/sidebar"
import { ToolsPromoRail, ToolsPromoRow } from "@/components/tools/promo-rail"

interface ToolShellProps {
  children: ReactNode
}

export function ToolShell({ children }: ToolShellProps) {
  return (
    <section className="py-10 max-md:py-8">
      <SectionContainer variant="wide">
        <div className="flex gap-8 max-lg:flex-col max-lg:gap-4">
          <ToolsSidebar />

          <div className="flex min-w-0 flex-1 flex-col gap-6 max-md:gap-5">
            <div className="lg:hidden">
              <ToolsSidebarMobile />
            </div>
            {children}
            {/* Below xl the rail has nowhere to sit, so the same offers follow
                the tool instead of disappearing — a reader who scrolled the
                whole tool is the one most likely to want them. */}
            <ToolsPromoRow className="xl:hidden" />
          </div>

          <ToolsPromoRail />
        </div>
      </SectionContainer>
    </section>
  )
}
