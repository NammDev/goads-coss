'use client'

import { Cell, Pie, PieChart } from 'recharts'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

type DataItem = {
  status: string
  count: number
}

type Props = {
  data: DataItem[]
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'var(--chart-4)',
  paid: 'var(--chart-2)',
  processing: 'var(--chart-5)',
  delivered: 'var(--chart-3)',
  completed: 'var(--chart-1)',
  cancelled: 'var(--destructive)',
}

function formatStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export function OrderStatusChart({ data }: Props) {
  const chartConfig = data.reduce<ChartConfig>((acc, d) => {
    acc[d.status] = {
      label: formatStatus(d.status),
      color: STATUS_COLORS[d.status] ?? 'var(--chart-1)',
    }
    return acc
  }, {})

  const chartData = data.map((d) => ({
    status: d.status,
    count: d.count,
    fill: STATUS_COLORS[d.status] ?? 'var(--chart-1)',
  }))

  const total = data.reduce((sum, d) => sum + d.count, 0)

  return (
    <Card className="shadow-none">
      <CardHeader className="pb-3">
        <h2 className="text-base font-semibold">Order Status Breakdown</h2>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
            No data yet
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <ChartContainer config={chartConfig} className="h-48 min-w-48">
              <PieChart>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      nameKey="status"
                      formatter={(value) => `${value} orders`}
                    />
                  }
                />
                <Pie
                  data={chartData}
                  dataKey="count"
                  nameKey="status"
                  innerRadius={52}
                  outerRadius={80}
                  strokeWidth={2}
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.status} fill={entry.fill} stroke="var(--background)" />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="flex flex-col gap-2 text-sm">
              <p className="text-muted-foreground text-xs mb-1">{total} total orders</p>
              {data.map((d) => (
                <div key={d.status} className="flex items-center gap-2">
                  <div
                    className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                    style={{ backgroundColor: STATUS_COLORS[d.status] ?? 'var(--chart-1)' }}
                  />
                  <span className="text-muted-foreground">{formatStatus(d.status)}</span>
                  <span className="ml-auto font-medium tabular-nums">{d.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
