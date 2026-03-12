'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowLeftIcon } from 'lucide-react'
import { use } from 'react'

import { StatusBadge } from '@/components/dashboard/status-badge'
import { OrderTimeline } from '@/components/dashboard/order-timeline'
import { CredentialFields } from '@/components/dashboard/credential-fields'
import { mockOrders, mockOrderItems } from '@/data/mock-orders'
import { mockDeliveredItems, getProductNameForItem } from '@/data/mock-delivered-items'
import { productTypeLabels } from '@/data/mock-products'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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

const CURRENT_CUSTOMER_ID = 'cust-001'

export default function PortalOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const order = mockOrders.find((o) => o.id === id && o.customerId === CURRENT_CUSTOMER_ID)

  if (!order) notFound()

  const items = mockOrderItems.filter((i) => i.orderId === order.id)
  const deliveredItems = mockDeliveredItems.filter((d) => d.orderId === order.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/portal/orders"><ArrowLeftIcon className="mr-1 size-4" />Back</Link>
        </Button>
        <h1 className="text-2xl font-semibold">{order.id}</h1>
        <StatusBadge status={order.status} />
      </div>

      {/* Timeline */}
      <Card className="shadow-none">
        <CardContent className="pt-6">
          <OrderTimeline status={order.status} />
        </CardContent>
      </Card>

      {/* Order Details */}
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
              {items.map((item) => (
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

      {/* Delivered Items */}
      {deliveredItems.length > 0 && (
        <Card className="shadow-none">
          <CardHeader><span className="text-lg font-semibold">Delivered Items</span></CardHeader>
          <CardContent className="space-y-3">
            {deliveredItems.map((item) => (
              <div key={item.id} className="rounded-md border p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{getProductNameForItem(item)}</p>
                  <Badge variant="secondary" className="text-xs">
                    {productTypeLabels[item.productType] ?? item.productType}
                  </Badge>
                </div>
                <CredentialFields
                  productType={item.productType}
                  credentials={item.credentials}
                  uid={item.uid}
                  compact
                />
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
