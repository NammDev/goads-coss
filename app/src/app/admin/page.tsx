'use client'

import Link from 'next/link'
import { ShoppingCartIcon, WalletIcon, ClockIcon, PackageIcon } from 'lucide-react'

import { StatsCard } from '@/components/dashboard/stats-card'
import { StatusBadge } from '@/components/dashboard/status-badge'
import WeeklyOverviewCard from '@/components/shadcn-studio/blocks/chart-weekly-overview'
import PerformanceCard from '@/components/shadcn-studio/blocks/chart-performance'
import { mockOrders } from '@/data/mock-orders'
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

const formatVND = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)

const recentOrders = mockOrders.slice(0, 5)

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Overview</h1>

      {/* Stats row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="New Orders"
          value="12"
          icon={ShoppingCartIcon}
          trend="up"
          trendValue="12%"
        />
        <StatsCard
          title="Revenue"
          value="45M ₫"
          icon={WalletIcon}
          trend="up"
          trendValue="8%"
        />
        <StatsCard
          title="Pending"
          value="5"
          icon={ClockIcon}
          trend="down"
          trendValue="3%"
        />
        <StatsCard
          title="Total Products"
          value="128"
          icon={PackageIcon}
          trend="up"
          trendValue="15%"
        />
      </div>

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
                <TableHead>Products</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
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
                  <TableCell>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</TableCell>
                  <TableCell>{formatVND(order.totalAmount)}</TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
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
