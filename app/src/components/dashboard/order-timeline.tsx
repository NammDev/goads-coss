'use client'

import { cn } from '@/lib/utils'
import type { OrderStatus } from '@/data/mock-orders'

/** Timeline steps in sequential order */
const TIMELINE_STEPS = [
  { key: 'pending', label: 'Placed' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'paid', label: 'Paid' },
  { key: 'processing', label: 'Processing' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'completed', label: 'Completed' },
] as const

/** Map order status to the highest completed step index */
const STATUS_TO_STEP: Record<OrderStatus, number> = {
  pending: 0,
  confirmed: 1,
  paid: 2,
  processing: 3,
  shipped: 4,
  completed: 5,
  cancelled: -1,
  refunded: -1,
}

type OrderTimelineProps = {
  status: OrderStatus
  className?: string
  /** Compact mode hides labels */
  compact?: boolean
}

export function OrderTimeline({ status, className, compact = false }: OrderTimelineProps) {
  const activeStep = STATUS_TO_STEP[status]

  // Don't show timeline for cancelled/refunded
  if (activeStep === -1) return null

  return (
    <div className={cn('flex items-center gap-0', className)}>
      {TIMELINE_STEPS.map((step, index) => {
        const isCompleted = index <= activeStep
        const isLast = index === TIMELINE_STEPS.length - 1

        return (
          <div key={step.key} className="flex items-center">
            {/* Step dot + label */}
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

            {/* Connector line */}
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
