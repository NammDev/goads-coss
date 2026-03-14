'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

type DataItem = {
  productType: string
  itemCount: number
  revenue: string
}

type Props = {
  data: DataItem[]
}

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

function formatProductType(type: string): string {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export function RevenueByTypeChart({ data }: Props) {
  const chartData = data.map((d) => ({
    type: formatProductType(d.productType),
    revenue: parseFloat(d.revenue),
  }))

  return (
    <Card className="shadow-none">
      <CardHeader className="pb-3">
        <h2 className="text-base font-semibold">Revenue by Product Type</h2>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
            No data yet
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="min-h-48 w-full">
            <BarChart data={chartData} margin={{ left: -16 }}>
              <CartesianGrid strokeDasharray="4" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="type"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                tickMargin={8}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                tickMargin={4}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value) =>
                      `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                    }
                  />
                }
              />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={6} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
