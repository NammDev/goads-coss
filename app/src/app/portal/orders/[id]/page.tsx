'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon } from 'lucide-react'

import { StatusBadge } from '@/components/dashboard/status-badge'
import { OrderTimeline } from '@/components/dashboard/order-timeline'
import { CopyButton } from '@/components/dashboard/copy-button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockOrders } from '@/data/mock-orders'
import { mockDeliveredItems } from '@/data/mock-delivered-items'
import { format } from 'date-fns'

const CURRENT_CUSTOMER_ID = 'cust-001'

const formatVND = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)

import { use } from 'react'

export default function PortalOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const order = mockOrders.find(o => o.id === id && o.customerId === CURRENT_CUSTOMER_ID)

  if (!order) notFound()

  const deliveredItems = mockDeliveredItems.filter(d => d.orderId === order.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/portal/orders" className="text-muted-foreground hover:text-foreground">
          <ArrowLeftIcon className="size-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold">{order.id}</h1>
          <p className="text-muted-foreground text-sm">
            {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}
          </p>
        </div>
        <StatusBadge status={order.status} className="ml-auto" />
      </div>

      {/* Timeline */}
      <Card className="shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Order Status</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto pb-4">
          <OrderTimeline status={order.status} />
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card className="shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Ordered Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4 rounded-md border p-3">
              <div className="space-y-0.5">
                <p className="font-medium">{item.productName}</p>
                <Badge variant="secondary" className="text-xs">{item.productType}</Badge>
              </div>
              <div className="text-right">
                <p className="text-sm">x{item.quantity}</p>
                <p className="font-medium">{formatVND(item.unitPrice * item.quantity)}</p>
              </div>
            </div>
          ))}
          <div className="flex justify-between border-t pt-3">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">{formatVND(order.totalAmount)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Delivered Items */}
      {deliveredItems.length > 0 && (
        <Card className="shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Delivered Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {deliveredItems.map(item => (
              <div key={item.id} className="rounded-md border p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{item.productName}</p>
                  <Badge variant="secondary" className="text-xs">{item.productType}</Badge>
                </div>
                {item.bmId && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground min-w-20">BM ID:</span>
                    <code className="bg-muted rounded px-1.5 py-0.5 text-xs font-mono flex-1 truncate">
                      {item.bmId}
                    </code>
                    <CopyButton value={item.bmId} />
                  </div>
                )}
                {item.inviteLink && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground min-w-20">Invite Link:</span>
                    <code className="bg-muted rounded px-1.5 py-0.5 text-xs font-mono flex-1 truncate">
                      {item.inviteLink}
                    </code>
                    <CopyButton value={item.inviteLink} />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
