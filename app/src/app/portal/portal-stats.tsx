import { formatUSD } from '@/lib/format-currency'

interface PortalStatsProps {
  totalOrders: number
  pendingOrders: number
  activeItems: number
  totalSpent: string
}

/** Clean Foreplay-style stat tile — label, big number, caption. No trend arrows
 *  or gradient badges (that template look reads as generic dashboard filler). */
function StatTile({
  label,
  value,
  caption,
}: {
  label: string
  value: string | number
  caption: string
}) {
  return (
    <div className="bg-card rounded-2xl border p-5">
      <p className="text-muted-foreground text-xs font-medium">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
      <p className="text-muted-foreground mt-1 text-xs">{caption}</p>
    </div>
  )
}

export function PortalStats({
  totalOrders,
  pendingOrders,
  activeItems,
  totalSpent,
}: PortalStatsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <StatTile label="Total orders" value={totalOrders} caption="All-time order history" />
      <StatTile
        label="Pending orders"
        value={pendingOrders}
        caption={pendingOrders > 0 ? 'Awaiting delivery' : 'All caught up'}
      />
      <StatTile label="Active items" value={activeItems} caption="Available in your account" />
      <StatTile label="Total spent" value={formatUSD(totalSpent)} caption="Across every paid order" />
    </div>
  )
}
