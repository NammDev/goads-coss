'use client'

import type { ReactNode } from 'react'
import { Card3D, Card3DGrid } from '@/components/card-3d'

/* ---------- info card (used on /help, /payment, /partners) ---------- */

export function InfoCard({ index = 0, children }: { index?: number; children: ReactNode }) {
  return (
    <Card3D index={index}>
      {children}
    </Card3D>
  )
}

/* ---------- grid container ---------- */

export function InfoCardGrid({ children }: { children: ReactNode }) {
  return <Card3DGrid>{children}</Card3DGrid>
}
