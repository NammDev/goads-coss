'use client'

import { createContext, useContext, type ReactNode } from 'react'

type ToolVariant = 'marketing' | 'portal'

const ToolContext = createContext<ToolVariant>('marketing')

export function ToolContextProvider({
  value,
  children,
}: {
  value: ToolVariant
  children: ReactNode
}) {
  return <ToolContext.Provider value={value}>{children}</ToolContext.Provider>
}

export function useToolVariant(): ToolVariant {
  return useContext(ToolContext)
}
