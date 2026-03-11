'use client'

import type { ComponentType } from 'react'

import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

type StatsCardProps = {
  title: string
  value: string | number
  icon: ComponentType<{ className?: string }>
  trend?: 'up' | 'down'
  trendValue?: string
  className?: string
}

export function StatsCard({ title, value, icon: Icon, trend, trendValue, className }: StatsCardProps) {
  return (
    <Card className={cn('shadow-none', className)}>
      <CardContent className="flex items-center gap-4 p-6">
        <div className="bg-primary/10 flex size-12 shrink-0 items-center justify-center rounded-lg">
          <Icon className="text-primary size-6" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-muted-foreground text-sm">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold">{value}</p>
            {trend && trendValue && (
              <span
                className={cn(
                  'flex items-center gap-0.5 text-xs font-medium',
                  trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                )}
              >
                {trend === 'up' ? <TrendingUpIcon className="size-3" /> : <TrendingDownIcon className="size-3" />}
                {trendValue}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
