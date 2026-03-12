'use client'

import { cn } from '@/lib/utils'
import type { OrderStatus } from '@/data/mock-orders'

/** Timeline steps matching DB orderStatusEnum (excludes cancelled) */
const TIMELINE_STEPS = [
  { key: 'pending', label: 'Placed' },
  { key: 'paid', label: 'Paid' },
  { key: 'processing', label: 'Processing' },
  { key: 'delivered', label: 'Delivered' },
  { key: 'completed', label: 'Completed' },
] as const

/** Map order status to the highest completed step index */
const STATUS_TO_STEP: Record<OrderStatus, number> = {
  pending: 0,
  paid: 1,
  processing: 2,
  delivered: 3,
  completed: 4,
  cancelled: -1,
}

type OrderTimelineProps = {
  status: OrderStatus
  className?: string
  /** Compact mode hides labels */
  compact?: boolean
}

export function OrderTimeline({ status, className, compact = false }: OrderTimelineProps) {
  const activeStep = STATUS_TO_STEP[status]

  if (activeStep === -1) return null

  return (
    <div className={cn('flex items-center gap-0', className)}>
      {TIMELINE_STEPS.map((step, index) => {
        const isCompleted = index <= activeStep
        const isLast = index === TIMELINE_STEPS.length - 1

        return (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  'flex size-3 shrink-0 rounded-full border-2',
                  isCompleted
                    ? 'border-primary bg-primary'
                    : 'border-muted-foreground/30 bg-transparent'
                )}
              />
              {!compact && (
                <span
                  className={cn(
                    'text-[10px] leading-tight whitespace-nowrap',
                    isCompleted ? 'text-foreground font-medium' : 'text-muted-foreground'
                  )}
                >
                  {step.label}
                </span>
              )}
            </div>

            {!isLast && (
              <div
                className={cn(
                  'mx-0.5 h-0.5 w-4 sm:w-6',
                  index < activeStep ? 'bg-primary' : 'bg-muted-foreground/20'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
