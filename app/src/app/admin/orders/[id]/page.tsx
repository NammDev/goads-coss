'use client'

import { use } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowLeftIcon } from 'lucide-react'

import { StatusBadge } from '@/components/dashboard/status-badge'
import { OrderTimeline } from '@/components/dashboard/order-timeline'
import { mockOrders, mockOrderItems } from '@/data/mock-orders'
import { mockCustomers } from '@/data/mock-customers'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { formatUSD } from '@/lib/format-currency'

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const order = mockOrders.find((o) => o.id === id)
  const customer = order ? mockCustomers.find((c) => c.id === order.customerId) : null

  if (!order) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/orders"><ArrowLeftIcon className="mr-1 size-4" />Back</Link>
        </Button>
        <p className="text-muted-foreground">Order not found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/orders"><ArrowLeftIcon className="mr-1 size-4" />Back</Link>
        </Button>
        <h1 className="text-2xl font-semibold">{order.id}</h1>
        <StatusBadge status={order.status} />
      </div>

      {/* Order timeline */}
      <Card className="shadow-none">
        <CardContent className="pt-6">
          <OrderTimeline status={order.status} />
        </CardContent>
      </Card>

      {/* Info cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="shadow-none">
          <CardHeader><span className="text-lg font-semibold">Order Details</span></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-mono font-medium">{order.id}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <StatusBadge status={order.status} />
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created</span>
              <span>{format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Updated</span>
              <span>{format(new Date(order.updatedAt), 'dd/MM/yyyy HH:mm')}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="font-semibold">{formatUSD(order.totalAmount)}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader><span className="text-lg font-semibold">Customer Details</span></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <Link href={`/admin/customers/${order.customerId}`} className="hover:text-primary font-medium hover:underline">
                {order.customerName}
              </Link>
            </div>
            {customer && (
              <>
                <Separator />
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
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Products table */}
      <Card className="shadow-none">
        <CardHeader><span className="text-lg font-semibold">Products</span></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrderItems.filter(i => i.orderId === order.id).map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.productName}</TableCell>
                  <TableCell className="text-muted-foreground capitalize">{item.productType}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{formatUSD(item.unitPrice)}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatUSD(parseFloat(item.unitPrice) * item.quantity)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} className="text-right font-semibold">Total</TableCell>
                <TableCell className="text-right font-bold">{formatUSD(order.totalAmount)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Notes */}
      {order.notes && (
        <Card className="shadow-none">
          <CardHeader><span className="text-lg font-semibold">Notes</span></CardHeader>
          <CardContent>
            <p className="text-sm">{order.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
