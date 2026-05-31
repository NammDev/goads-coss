// Foreplay tool page shell — page wrapper for /tools/{slug}.
// Provides: section padding + wide container + sidebar (lg+) + content slot.
// On mobile: mobile drawer trigger renders above content.
// Spec: see docs/foreplay/tool-design-language.md → Layout pattern.

import type { ReactNode } from "react"

import { SectionContainer } from "@/components/atoms/section-container"
import {
  ToolsSidebar,
  ToolsSidebarMobile,
} from "@/components/tools/sidebar"

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
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
