'use client'

import { use } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowLeftIcon } from 'lucide-react'

import { StatusBadge } from '@/components/dashboard/status-badge'
import { mockCustomers } from '@/data/mock-customers'
import { mockOrders } from '@/data/mock-orders'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
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

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const customer = mockCustomers.find((c) => c.id === id)
  const customerOrders = mockOrders.filter((o) => o.customerId === id)

  if (!customer) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/customers"><ArrowLeftIcon className="mr-1 size-4" />Back</Link>
        </Button>
        <p className="text-muted-foreground">Customer not found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/customers"><ArrowLeftIcon className="mr-1 size-4" />Back</Link>
        </Button>
        <h1 className="text-2xl font-semibold">{customer.name}</h1>
        <Badge
          variant="outline"
          className={
            customer.status === 'active'
              ? 'border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
              : 'border-transparent bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400'
          }
        >
          {customer.status === 'active' ? 'Active' : 'Inactive'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Profile card */}
        <Card className="shadow-none">
          <CardHeader className="flex items-center gap-4">
            <Avatar className="size-12 rounded-lg">
              <AvatarFallback className="rounded-lg text-sm font-medium">
                {customer.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{customer.name}</p>
              <p className="text-muted-foreground text-sm">
                Joined {format(new Date(customer.joinedAt), 'dd/MM/yyyy')}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span>{customer.email}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone</span>
              <span>{customer.phone}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Telegram</span>
              <span>{customer.telegram}</span>
            </div>
            {customer.notes && (
              <>
                <Separator />
                <div>
                  <span className="text-muted-foreground">Notes</span>
                  <p className="mt-1">{customer.notes}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Stats card */}
        <Card className="shadow-none">
          <CardHeader><span className="text-lg font-semibold">Stats</span></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Orders</span>
              <span className="font-semibold">{customer.totalOrders}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Spent</span>
              <span className="font-semibold">{formatVND(customer.totalSpent)}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Active Products</span>
              <span className="font-semibold">{customer.activeProducts}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order history */}
      <Card className="shadow-none">
        <CardHeader>
          <span className="text-lg font-semibold">Order History ({customerOrders.length})</span>
        </CardHeader>
        <CardContent className="p-0">
          {customerOrders.length === 0 ? (
            <p className="text-muted-foreground px-6 py-8 text-center text-sm">No orders yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-sm font-medium">
                      <Link href={`/admin/orders/${order.id}`} className="hover:text-primary hover:underline">
                        {order.id}
                      </Link>
                    </TableCell>
                    <TableCell>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</TableCell>
                    <TableCell>{formatVND(order.totalAmount)}</TableCell>
                    <TableCell><StatusBadge status={order.status} /></TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {format(new Date(order.createdAt), 'dd/MM/yyyy')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
