'use client'

import type { ReactNode } from 'react'

import { ToolsSidebar } from '@/components/tools-sidebar'
import { useToolVariant } from '@/lib/tool-context'

/**
 * Wrapper for individual tool pages.
 * Marketing: renders sidebar + content in a section with padding.
 * Portal: renders children directly (dashboard sidebar handles nav).
 */
export function ToolPageShell({ children }: { children: ReactNode }) {
  const variant = useToolVariant()

  if (variant === 'portal') {
    return <>{children}</>
  }

  return (
    <section className="py-6 sm:py-10 lg:py-14">
      <div className="container flex gap-8">
        <ToolsSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </section>
  )
}
