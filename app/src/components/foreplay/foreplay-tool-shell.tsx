// Foreplay tool page shell — page wrapper for /tools/{slug}.
// Provides: section padding + wide container + sidebar (lg+) + content slot.
// On mobile: mobile drawer trigger renders above content.
// Spec: see docs/foreplay/tool-design-language.md → Layout pattern.

import type { ReactNode } from "react"

import { ForeplaySectionContainer } from "@/components/foreplay/foreplay-section-container"
import {
  ForeplayToolsSidebar,
  ForeplayToolsSidebarMobile,
} from "@/components/foreplay/foreplay-tools-sidebar"

interface ForeplayToolShellProps {
  children: ReactNode
}

export function ForeplayToolShell({ children }: ForeplayToolShellProps) {
  return (
    <section className="py-10 max-md:py-8">
      <ForeplaySectionContainer variant="wide">
        <div className="flex gap-8 max-lg:flex-col max-lg:gap-4">
          <ForeplayToolsSidebar />

          <div className="flex min-w-0 flex-1 flex-col gap-6 max-md:gap-5">
            <div className="lg:hidden">
              <ForeplayToolsSidebarMobile />
            </div>
            {children}
          </div>
        </div>
      </ForeplaySectionContainer>
    </section>
  )
}
