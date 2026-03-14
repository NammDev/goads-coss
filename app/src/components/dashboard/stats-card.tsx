import { TrendingDown, TrendingUp } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type StatsCardProps = {
  title: string
  value: string | number
  badge: string
  trend: 'up' | 'down'
  trendLabel: string
  trendDescription: string
}

export function StatsCard({
  title,
  value,
  badge,
  trend,
  trendLabel,
  trendDescription,
}: StatsCardProps) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            {trend === 'up' ? <TrendingUp /> : <TrendingDown />}
            {badge}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {trendLabel}{' '}
          {trend === 'up' ? (
            <TrendingUp className="size-4" />
          ) : (
            <TrendingDown className="size-4" />
          )}
        </div>
        <div className="text-muted-foreground">{trendDescription}</div>
      </CardFooter>
    </Card>
  )
}

/** Grid wrapper with the template's gradient card styling */
export function StatsGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {children}
    </div>
  )
}
