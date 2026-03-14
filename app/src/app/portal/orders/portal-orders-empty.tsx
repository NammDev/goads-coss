'use client'

import { ShoppingBagIcon } from 'lucide-react'
import { EmptyState } from '@/components/dashboard/empty-state'

export function PortalOrdersEmptyState() {
  return (
    <EmptyState
      icon={ShoppingBagIcon}
      title="No orders yet"
      description="Your orders will appear here once your account manager creates one for you."
    />
  )
}
