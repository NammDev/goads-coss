"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const demographicsData = [
  { ageGroup: "18-24", customers: 2847, percentage: "18.0%", growth: "+15.2%", growthColor: "text-green-600" },
  { ageGroup: "25-34", customers: 4521, percentage: "28.5%", growth: "+8.7%", growthColor: "text-green-600" },
  { ageGroup: "35-44", customers: 3982, percentage: "25.1%", growth: "+3.4%", growthColor: "text-blue-600" },
  { ageGroup: "45-54", customers: 2734, percentage: "17.2%", growth: "+1.2%", growthColor: "text-orange-600" },
  { ageGroup: "55+", customers: 1763, percentage: "11.2%", growth: "-2.1%", growthColor: "text-red-600" },
]

const regionsData = [
  { region: "North America", customers: 6847, revenue: "$847,523", growth: "+12.3%", growthColor: "text-green-600" },
  { region: "Europe", customers: 4521, revenue: "$563,891", growth: "+9.7%", growthColor: "text-green-600" },
  { region: "Asia Pacific", customers: 2892, revenue: "$321,456", growth: "+18.4%", growthColor: "text-blue-600" },
  { region: "Latin America", customers: 1123, revenue: "$187,234", growth: "+15.8%", growthColor: "text-green-600" },
  { region: "Others", customers: 464, revenue: "$67,891", growth: "+5.2%", growthColor: "text-orange-600" },
]

export function CustomerInsightsDemographics() {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="border-b">
            <TableHead className="py-5 px-6 font-semibold">Age Group</TableHead>
            <TableHead className="text-right py-5 px-6 font-semibold">Customers</TableHead>
            <TableHead className="text-right py-5 px-6 font-semibold">Percentage</TableHead>
            <TableHead className="text-right py-5 px-6 font-semibold">Growth</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {demographicsData.map((row, index) => (
            <TableRow key={index} className="hover:bg-muted/30 transition-colors">
              <TableCell className="font-medium py-5 px-6">{row.ageGroup}</TableCell>
              <TableCell className="text-right py-5 px-6">{row.customers.toLocaleString()}</TableCell>
              <TableCell className="text-right py-5 px-6">{row.percentage}</TableCell>
              <TableCell className="text-right py-5 px-6">
                <span className={`font-medium ${row.growthColor}`}>{row.growth}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function CustomerInsightsRegions() {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="border-b">
            <TableHead className="py-5 px-6 font-semibold">Region</TableHead>
            <TableHead className="text-right py-5 px-6 font-semibold">Customers</TableHead>
            <TableHead className="text-right py-5 px-6 font-semibold">Revenue</TableHead>
            <TableHead className="text-right py-5 px-6 font-semibold">Growth</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {regionsData.map((row, index) => (
            <TableRow key={index} className="hover:bg-muted/30 transition-colors">
              <TableCell className="font-medium py-5 px-6">{row.region}</TableCell>
              <TableCell className="text-right py-5 px-6">{row.customers.toLocaleString()}</TableCell>
              <TableCell className="text-right py-5 px-6">{row.revenue}</TableCell>
              <TableCell className="text-right py-5 px-6">
                <span className={`font-medium ${row.growthColor}`}>{row.growth}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function TablePagination({ count }: { count: number }) {
  return (
    <div className="flex items-center justify-end space-x-2 py-6">
      <div className="text-muted-foreground text-sm hidden sm:block">
        0 of {count} row(s) selected.
      </div>
      <div className="space-x-2 space-y-2">
        <Button variant="outline" size="sm" disabled>Previous</Button>
        <Button variant="outline" size="sm" disabled>Next</Button>
      </div>
    </div>
  )
}
