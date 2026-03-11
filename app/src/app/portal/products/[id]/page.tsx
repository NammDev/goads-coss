'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon, AlertTriangleIcon } from 'lucide-react'
import { differenceInDays, format } from 'date-fns'

import { CopyButton } from '@/components/dashboard/copy-button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockDeliveredItems } from '@/data/mock-delivered-items'
import { productTypeLabels } from '@/data/mock-products'
import type { ProductType } from '@/data/mock-products'
import type { DeliveredItemStatus } from '@/data/mock-delivered-items'

const STATUS_LABELS: Record<DeliveredItemStatus, { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
  inactive: { label: 'Inactive', className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400' },
  suspended: { label: 'Suspended', className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
  warranty_expired: { label: 'Warranty Expired', className: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' },
}

const USAGE_GUIDE = [
  'Log in to Facebook Business Manager at business.facebook.com',
  'Go to "Business Settings" > "Requests" to accept the invitation',
  'After accepting, verify the BM ID under "Business Info"',
  'Create an ad account and link it to the BM you received',
  'Contact support via Telegram if you encounter any issues during setup',
]

import { use } from 'react'

export default function PortalProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const item = mockDeliveredItems.find(d => d.id === id)

  if (!item) notFound()

  const statusConfig = STATUS_LABELS[item.status]
  const typeLabel = productTypeLabels[item.productType as ProductType] ?? item.productType
  const warrantyDaysLeft = differenceInDays(new Date(item.warrantyUntil), new Date())
  const isWarrantyExpiringSoon = warrantyDaysLeft <= 3 && warrantyDaysLeft >= 0
  const isWarrantyExpired = warrantyDaysLeft < 0

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/portal/products" className="text-muted-foreground hover:text-foreground">
          <ArrowLeftIcon className="size-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold">{item.productName}</h1>
          <p className="text-muted-foreground text-sm">#{item.id}</p>
        </div>
      </div>

      {/* Product Info */}
      <Card className="shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Product Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{typeLabel}</Badge>
            <Badge variant="outline" className={`border-transparent ${statusConfig.className}`}>
              {statusConfig.label}
            </Badge>
          </div>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order</span>
              <Link href={`/portal/orders/${item.orderId}`} className="text-primary hover:underline">
                {item.orderId}
              </Link>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivered</span>
              <span>{format(new Date(item.deliveredAt), 'dd/MM/yyyy HH:mm')}</span>
            </div>
          </div>

          {/* BM ID */}
          {item.bmId && (
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">BM ID</p>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <code className="font-mono text-sm flex-1 truncate">{item.bmId}</code>
                <CopyButton value={item.bmId} />
              </div>
            </div>
          )}

          {/* Invite Link */}
          {item.inviteLink && (
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">Invite Link</p>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <code className="font-mono text-xs flex-1 truncate">{item.inviteLink}</code>
                <CopyButton value={item.inviteLink} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Warranty */}
      <Card className="shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Warranty</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Warranty Expires</span>
            <span>{format(new Date(item.warrantyUntil), 'dd/MM/yyyy')}</span>
          </div>
          {isWarrantyExpired ? (
            <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
              <AlertTriangleIcon className="size-4 shrink-0" />
              <span>Warranty has expired. Contact admin to renew.</span>
            </div>
          ) : isWarrantyExpiringSoon ? (
            <div className="flex items-center gap-2 rounded-md bg-orange-50 p-3 text-sm text-orange-700 dark:bg-orange-900/20 dark:text-orange-400">
              <AlertTriangleIcon className="size-4 shrink-0" />
              <span>{warrantyDaysLeft} day{warrantyDaysLeft !== 1 ? 's' : ''} left on warranty. Contact admin soon!</span>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">{warrantyDaysLeft} day{warrantyDaysLeft !== 1 ? 's' : ''} of warranty remaining.</p>
          )}
        </CardContent>
      </Card>

      {/* Usage Guide */}
      <Card className="shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Usage Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2">
            {USAGE_GUIDE.map((step, idx) => (
              <li key={idx} className="flex gap-3 text-sm">
                <span className="bg-primary/10 text-primary flex size-5 shrink-0 items-center justify-center rounded-full text-xs font-medium">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
