'use client'

import type { ReactNode } from 'react'

import { ToolContextProvider } from '@/lib/tool-context'

/** Wraps portal tool pages so ToolPageShell/ToolsSidebarMobile render in portal mode */
export default function PortalToolsLayout({ children }: { children: ReactNode }) {
  return <ToolContextProvider value="portal">{children}</ToolContextProvider>
}
