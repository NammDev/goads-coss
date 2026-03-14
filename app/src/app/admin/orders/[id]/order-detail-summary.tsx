import Link from 'next/link'
import { format } from 'date-fns'

import { StatusBadge } from '@/components/dashboard/status-badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
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
import type { OrderDetail } from '@/lib/db/queries/order-queries'
import type { ProductType } from '@/lib/validators/credential-schemas'

interface Props {
  order: OrderDetail
  deliveredItemIdSet: Set<string>
  deliveredCount: number
  totalItems: number
}

export function OrderDetailSummary({ order, deliveredItemIdSet, deliveredCount, totalItems }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* Left: Order Summary */}
      <Card className="shadow-none">
        <CardHeader><span className="text-lg font-semibold">Order Summary</span></CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Order ID</span>
            <span className="font-mono font-medium">{order.id}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-muted-foreground">Customer</span>
            <Link
              href={`/admin/customers/${order.customerId}`}
              className="font-medium hover:text-primary hover:underline"
            >
              {order.customerName}
            </Link>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status</span>
            <StatusBadge status={order.status} />
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total</span>
            <span className="font-bold">{formatUSD(order.totalAmount)}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-muted-foreground">Created</span>
            <span>{format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery progress</span>
            <span>{deliveredCount}/{totalItems} items</span>
          </div>
        </CardContent>
      </Card>

      {/* Right: Line Items */}
      <div className="overflow-hidden rounded-lg border">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <span className="text-lg font-semibold">Line Items</span>
          <Badge variant="outline" className="text-xs">
            {deliveredCount}/{totalItems} delivered
          </Badge>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Unit</TableHead>
              <TableHead className="text-right">Sub</TableHead>
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
      </div>
    </div>
  )
}
