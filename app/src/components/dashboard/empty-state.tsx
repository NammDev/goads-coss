'use client'

import type { ComponentType, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type EmptyStateProps = {
  icon: ComponentType<{ className?: string }>
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4 py-16 text-center', className)}>
      <div className="bg-muted flex size-16 items-center justify-center rounded-full">
        <Icon className="text-muted-foreground size-8" />
      </div>
      <div className="space-y-1">
        <p className="text-lg font-semibold">{title}</p>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </div>
      {action}
    </div>
  )
}
