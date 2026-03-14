"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, Users, Target, ArrowUpIcon } from "lucide-react"

const customerGrowthData = [
  { month: "Jan", new: 245, returning: 890, churn: 45 },
  { month: "Feb", new: 312, returning: 934, churn: 52 },
  { month: "Mar", new: 289, returning: 1023, churn: 38 },
  { month: "Apr", new: 456, returning: 1156, churn: 61 },
  { month: "May", new: 523, returning: 1298, churn: 47 },
  { month: "Jun", new: 634, returning: 1445, churn: 55 },
]

const chartConfig = {
  new: {
    label: "New Customers",
    color: "var(--chart-1)",
  },
  returning: {
    label: "Returning",
    color: "var(--chart-2)",
  },
  churn: {
    label: "Churned",
    color: "var(--chart-3)",
  },
}

export function CustomerInsightsGrowth() {
  return (
    <div className="grid grid-cols-10 gap-6">
      {/* Chart Area - 70% */}
      <div className="col-span-10 xl:col-span-7">
        <h3 className="text-sm font-medium text-muted-foreground mb-6">Customer Growth Trends</h3>
        <ChartContainer config={chartConfig} className="h-[375px] w-full">
          <BarChart data={customerGrowthData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="month"
              className="text-xs"
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: 'var(--border)' }}
              axisLine={{ stroke: 'var(--border)' }}
            />
            <YAxis
              className="text-xs"
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: 'var(--border)' }}
              axisLine={{ stroke: 'var(--border)' }}
              domain={[0, 'dataMax']}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="new" fill="var(--color-new)" radius={[2, 2, 0, 0]} />
            <Bar dataKey="returning" fill="var(--color-returning)" radius={[2, 2, 0, 0]} />
            <Bar dataKey="churn" fill="var(--color-churn)" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </div>

      {/* Key Metrics - 30% */}
      <div className="col-span-10 xl:col-span-3 space-y-5">
        <h3 className="text-sm font-medium text-muted-foreground mb-6">Key Metrics</h3>
        <div className="grid grid-cols-3 gap-5">
          <div className="p-4 rounded-lg max-lg:col-span-3 xl:col-span-3 border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Total Customers</span>
            </div>
            <div className="text-2xl font-bold">15,847</div>
            <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <ArrowUpIcon className="h-3 w-3" />
              +12.5% from last month
            </div>
          </div>

          <div className="p-4 rounded-lg max-lg:col-span-3 xl:col-span-3 border">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Retention Rate</span>
            </div>
            <div className="text-2xl font-bold">92.4%</div>
            <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <ArrowUpIcon className="h-3 w-3" />
              +2.1% improvement
            </div>
          </div>

          <div className="p-4 rounded-lg max-lg:col-span-3 xl:col-span-3 border">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Avg. LTV</span>
            </div>
            <div className="text-2xl font-bold">$2,847</div>
            <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <ArrowUpIcon className="h-3 w-3" />
              +8.3% growth
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
