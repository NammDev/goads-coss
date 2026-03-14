"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { RiDownloadLine } from "@remixicon/react"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const chartData = [
  { date: "2024-04-01", actual: 18200, target: 20000 },
  { date: "2024-04-08", actual: 24100, target: 22000 },
  { date: "2024-04-15", actual: 19800, target: 22000 },
  { date: "2024-04-22", actual: 27300, target: 24000 },
  { date: "2024-04-29", actual: 31400, target: 26000 },
  { date: "2024-05-06", actual: 29800, target: 28000 },
  { date: "2024-05-13", actual: 34200, target: 30000 },
  { date: "2024-05-20", actual: 28900, target: 30000 },
  { date: "2024-05-27", actual: 37600, target: 32000 },
  { date: "2024-06-03", actual: 33100, target: 34000 },
  { date: "2024-06-10", actual: 41800, target: 36000 },
  { date: "2024-06-17", actual: 38500, target: 36000 },
  { date: "2024-06-24", actual: 44600, target: 38000 },
]

const chartConfig = {
  actual: {
    label: "Actual Revenue",
    color: "var(--primary)",
  },
  target: {
    label: "Target Revenue",
    color: "var(--muted-foreground)",
  },
} satisfies ChartConfig

function formatUSDAxis(value: number) {
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`
  return `$${value}`
}

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Sales Performance</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Actual vs Target revenue over time
          </span>
          <span className="@[540px]/card:hidden">Revenue performance</span>
        </CardDescription>
        <CardAction className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-1.5">
            <RiDownloadLine className="size-4" />
            Export
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillActual" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-actual)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-actual)"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatUSDAxis}
              width={48}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value as string | number | Date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="actual"
              type="natural"
              fill="url(#fillActual)"
              stroke="var(--color-actual)"
              strokeWidth={2}
            />
            <Area
              dataKey="target"
              type="natural"
              fill="none"
              stroke="var(--color-target)"
              strokeWidth={2}
              strokeDasharray="4 4"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
