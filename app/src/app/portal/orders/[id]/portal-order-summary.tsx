import { format, addDays, differenceInDays } from 'date-fns'
import { CalendarIcon, UserIcon, ShieldCheckIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { formatUSD } from '@/lib/format-currency'
import type { OrderDetail } from '@/lib/db/queries/order-queries'

interface Props {
  order: OrderDetail
  deliveredItemIdSet: Set<string>
  deliveredCount: number
  totalItems: number
}

/** Small uppercase section label (matches the custom-setup builder's overlines). */
function Overline({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
      {children}
    </span>
  )
}

/** One labelled info row with a green icon tile. */
function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-xl">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-muted-foreground text-xs">{label}</p>
        <div className="text-sm font-medium">{children}</div>
      </div>
    </div>
  )
}

/**
 * Portal order summary — customer-facing, polished to match the pricing
 * custom-setup builder (overline sections, generous rounding, clean info rows).
 * No admin links or deliver actions (that's the admin variant's job).
 */
export function PortalOrderSummary({ order, deliveredItemIdSet, deliveredCount, totalItems }: Props) {
  // Warranty: 7 days from the latest delivery.
  const latestDelivery =
    order.deliveredItems.length > 0
      ? new Date(Math.max(...order.deliveredItems.map((d) => d.deliveredAt.getTime())))
      : null
  const warrantyEnd = latestDelivery ? addDays(latestDelivery, 7) : null
  const warrantyDaysLeft = warrantyEnd ? differenceInDays(warrantyEnd, new Date()) : null

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
      {/* Left: items */}
      <Card className="rounded-2xl lg:col-span-8">
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Overline>Order summary</Overline>
            <Badge variant="outline" className="rounded-full text-xs font-medium">
              {deliveredCount}/{totalItems} delivered
            </Badge>
          </div>

          <div className="flex flex-col gap-2.5">
            {order.items.map((item, index) => {
              const isDelivered = deliveredItemIdSet.has(item.id)
              const subtotal = parseFloat(item.unitPrice) * item.quantity
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl border p-3"
                >
                  <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="truncate text-sm font-medium">{item.productName}</span>
                      <Badge
                        variant="outline"
                        className="rounded-full text-[11px] font-medium capitalize"
                      >
                        {item.productType}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-xs">
                      <span>Qty {item.quantity}</span>
                      <span>·</span>
                      <span>{formatUSD(item.unitPrice)} each</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <Badge
                      variant="outline"
                      className={
                        isDelivered
                          ? 'bg-foreground text-background rounded-full border-transparent'
                          : 'bg-muted text-muted-foreground rounded-full border-transparent'
                      }
                    >
                      {isDelivered ? 'Delivered' : 'Pending'}
                    </Badge>
                    <span className="text-sm font-semibold tabular-nums">{formatUSD(subtotal)}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Total */}
          <div className="mt-1 flex items-center justify-between border-t pt-4">
            <span className="text-muted-foreground text-sm">Total paid</span>
            <span className="text-xl font-bold tracking-tight tabular-nums">
              {formatUSD(order.totalAmount)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Right: billing */}
      <Card className="rounded-2xl lg:col-span-4">
        <CardContent className="flex flex-col gap-5">
          <InfoRow icon={<UserIcon className="size-4" />} label="Customer">
            {order.customerName}
          </InfoRow>
          <InfoRow icon={<CalendarIcon className="size-4" />} label="Placed">
            {format(new Date(order.createdAt), 'MMM d, yyyy · HH:mm')}
          </InfoRow>
          <InfoRow icon={<ShieldCheckIcon className="size-4" />} label="Warranty">
            {warrantyEnd ? (
              <span>
                {warrantyDaysLeft !== null && warrantyDaysLeft > 0
                  ? `${warrantyDaysLeft} days left`
                  : warrantyDaysLeft === 0
                    ? 'Expires today'
                    : 'Expired'}
                <span className="text-muted-foreground ml-1.5 text-xs font-normal">
                  ({format(warrantyEnd, 'MMM d, yyyy')})
                </span>
              </span>
            ) : (
              <span className="text-muted-foreground">Starts on delivery</span>
            )}
          </InfoRow>
        </CardContent>
      </Card>
    </div>
  )
}
