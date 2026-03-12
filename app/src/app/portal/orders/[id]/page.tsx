import { redirect } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowLeftIcon } from 'lucide-react'

import { StatusBadge } from '@/components/dashboard/status-badge'
import { OrderTimeline } from '@/components/dashboard/order-timeline'
import { CredentialFields } from '@/components/dashboard/credential-fields'
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
import { requireRole } from '@/lib/auth/require-role'
import { getOrderById } from '@/lib/db/queries'
import { decrypt } from '@/lib/db/encryption'
import { formatUSD } from '@/lib/format-currency'
import { productTypeLabels } from '@/data/mock-products'
import type { ProductType } from '@/lib/validators/credential-schemas'

function safeDecrypt(encrypted: string | null): Record<string, string> | undefined {
  if (!encrypted) return undefined
  try {
    return JSON.parse(decrypt(encrypted)) as Record<string, string>
  } catch {
    return undefined
  }
}

export default async function PortalOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await requireRole('customer')
  const { id } = await params
  const detail = await getOrderById(id)

  if (!detail || detail.customerId !== session.user.id) {
    redirect('/portal/orders')
  }

  const { items, deliveredItems, ...order } = detail

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/portal/orders">
            <ArrowLeftIcon className="mr-1 size-4" />Back
          </Link>
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
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.productName}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{formatUSD(item.unitPrice)}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatUSD(parseFloat(item.unitPrice) * item.quantity)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} className="text-right font-semibold">Total</TableCell>
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
            {deliveredItems.map((item) => {
              const credentials = safeDecrypt(item.credentials)
              const typeLabel = productTypeLabels[item.productType as ProductType] ?? item.productType
              return (
                <div key={item.id} className="rounded-md border p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.uid ?? item.id}</span>
                    <Badge variant="secondary" className="text-xs">{typeLabel}</Badge>
                  </div>
                  <CredentialFields
                    productType={item.productType as ProductType}
                    credentials={credentials}
                    uid={item.uid ?? undefined}
                    compact
                  />
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
