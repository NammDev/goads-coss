import Link from 'next/link'

import { StatusBadge } from '@/components/dashboard/status-badge'
import WeeklyOverviewCard from '@/components/shadcn-studio/blocks/chart-weekly-overview'
import PerformanceCard from '@/components/shadcn-studio/blocks/chart-performance'
import { getAdminStats, getRecentOrders } from '@/lib/db/queries'
import { formatUSD } from '@/lib/format-currency'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { format } from 'date-fns'
import { AdminStats } from './admin-stats'

export default async function AdminDashboardPage() {
  const [stats, recentOrders] = await Promise.all([
    getAdminStats(),
    getRecentOrders(5),
  ])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Overview</h1>

      {/* Stats row */}
      <AdminStats
        totalOrders={String(stats.totalOrders)}
        revenue={formatUSD(stats.totalRevenue)}
        pendingOrders={String(stats.pendingOrders)}
        totalProducts={String(stats.totalProducts)}
      />

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WeeklyOverviewCard />
        <PerformanceCard />
      </div>

      {/* Recent orders */}
      <Card className="shadow-none">
        <CardHeader className="flex items-center justify-between">
          <span className="text-lg font-semibold">Recent Orders</span>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/orders">View all</Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm">
                    <Link href={`/admin/orders/${order.id}`} className="hover:underline">
                      {order.id}
                    </Link>
                  </TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{formatUSD(order.totalAmount)}</TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {format(new Date(order.createdAt), 'dd/MM/yyyy')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
