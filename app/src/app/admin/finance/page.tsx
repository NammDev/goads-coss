import { Badge } from '@/components/ui/badge'
import { FinanceStats } from './finance-stats'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  getAdminStats,
  getRevenueByProductType,
  getTopCustomers,
  getOrderStatusBreakdown,
  getRevenueByMonth,
} from '@/lib/db/queries'
import { formatUSD } from '@/lib/format-currency'
import { RevenueByTypeChart } from './revenue-by-type-chart'
import { OrderStatusChart } from './order-status-chart'
import { RevenueOverTimeChart } from './revenue-over-time-chart'

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  paid: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  processing: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  completed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
}

function formatProductType(type: string): string {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export default async function FinancePage() {
  const [stats, revenueByType, topCustomers, statusBreakdown, revenueByMonth] = await Promise.all([
    getAdminStats(),
    getRevenueByProductType(),
    getTopCustomers(10),
    getOrderStatusBreakdown(),
    getRevenueByMonth(),
  ])

  const avgPerOrder =
    stats.totalOrders > 0
      ? parseFloat(stats.totalRevenue) / stats.totalOrders
      : 0

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold">Finance</h1>
        <Badge variant="outline" className="bg-primary/10 text-primary border-transparent text-xs">
          Super Admin
        </Badge>
        <div className="ml-auto flex flex-wrap gap-2">
          {statusBreakdown.map((s) => (
            <span
              key={s.status}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[s.status] ?? 'bg-muted text-muted-foreground'}`}
            >
              {formatProductType(s.status)}: {s.count}
            </span>
          ))}
        </div>
      </div>

      <FinanceStats
        revenue={formatUSD(stats.totalRevenue)}
        totalOrders={String(stats.totalOrders)}
        avgPerOrder={formatUSD(avgPerOrder)}
        totalCustomers={String(stats.totalCustomers)}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueByTypeChart data={revenueByType} />
        <OrderStatusChart data={statusBreakdown} />
      </div>

      <RevenueOverTimeChart data={revenueByMonth} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="shadow-none">
          <CardHeader className="pb-3">
            <h2 className="text-base font-semibold">Revenue by Product Type</h2>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Type</TableHead>
                  <TableHead className="text-right">Items</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {revenueByType.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-muted-foreground text-center py-6 text-sm">
                      No data yet
                    </TableCell>
                  </TableRow>
                ) : (
                  revenueByType.map((row) => (
                    <TableRow key={row.productType}>
                      <TableCell className="font-medium">
                        {formatProductType(row.productType)}
                      </TableCell>
                      <TableCell className="text-right">{row.itemCount}</TableCell>
                      <TableCell className="text-right">{formatUSD(row.revenue)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader className="pb-3">
            <h2 className="text-base font-semibold">Top Customers</h2>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Orders</TableHead>
                  <TableHead className="text-right">Total Spent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-muted-foreground text-center py-6 text-sm">
                      No data yet
                    </TableCell>
                  </TableRow>
                ) : (
                  topCustomers.map((customer, idx) => (
                    <TableRow key={customer.id}>
                      <TableCell className="text-muted-foreground w-8">{idx + 1}</TableCell>
                      <TableCell>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-muted-foreground text-xs">{customer.email}</div>
                      </TableCell>
                      <TableCell className="text-right">{customer.orderCount}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatUSD(customer.totalSpent)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
