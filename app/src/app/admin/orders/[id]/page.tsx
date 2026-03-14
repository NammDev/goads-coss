import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowLeftIcon } from 'lucide-react'

import { StatusBadge } from '@/components/dashboard/status-badge'
import { OrderTimeline } from '@/components/dashboard/order-timeline'
import { getOrderById } from '@/lib/db/queries'
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
import { DeliverDialog } from './deliver-dialog'
import { DeliveredItemsSection } from './delivered-items-section'
import { ShareLinkSection } from '@/components/dashboard/share-link-section'
import type { ProductType } from '@/lib/validators/credential-schemas'

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = await getOrderById(id)

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

  // Build a set of delivered orderItemIds for quick lookup
  const deliveredItemIdSet = new Set(
    order.deliveredItems.map((d) => d.orderItemId).filter(Boolean)
  )

  const totalItems = order.items.length
  const deliveredCount = order.deliveredItems.length

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
              <span className="text-muted-foreground">Delivery</span>
              <span className="text-sm">{deliveredCount}/{totalItems} items</span>
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
              <Link
                href={`/admin/customers/${order.customerId}`}
                className="hover:text-primary font-medium hover:underline"
              >
                {order.customerName}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products table with delivery actions */}
      <Card className="shadow-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Products</span>
            <Badge variant="outline" className="text-xs">
              {deliveredCount}/{totalItems} delivered
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
                <TableHead className="text-right">Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => {
                const isDelivered = deliveredItemIdSet.has(item.id)
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.productName}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">{formatUSD(item.unitPrice)}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatUSD(parseFloat(item.unitPrice) * item.quantity)}
                    </TableCell>
                    <TableCell className="text-right">
                      {isDelivered ? (
                        <Badge variant="default" className="text-xs">Delivered</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">Pending</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {!isDelivered && (
                        <DeliverDialog
                          orderId={order.id}
                          orderItemId={item.id}
                          productType={item.productType as ProductType}
                          productName={item.productName}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
              <TableRow>
                <TableCell colSpan={3} className="text-right font-semibold">Total</TableCell>
                <TableCell className="text-right font-bold">{formatUSD(order.totalAmount)}</TableCell>
                <TableCell colSpan={2} />
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delivered credentials */}
      <DeliveredItemsSection items={order.deliveredItems} />

      {/* Share link */}
      <ShareLinkSection orderId={order.id} shareToken={order.shareToken} />

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
