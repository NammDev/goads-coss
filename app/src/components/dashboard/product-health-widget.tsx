import { ShieldCheck, ShieldAlert, ShieldX, ShieldOff } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getProductHealthOverview } from "@/lib/db/queries/delivered-item-queries"

const STATUS_CONFIG: Record<string, {
  label: string
  icon: typeof ShieldCheck
  color: string
}> = {
  active: { label: "Active", icon: ShieldCheck, color: "text-green-600 dark:text-green-400" },
  inactive: { label: "Inactive", icon: ShieldOff, color: "text-muted-foreground" },
  banned: { label: "Banned", icon: ShieldX, color: "text-red-600 dark:text-red-400" },
  expired: { label: "Expired", icon: ShieldAlert, color: "text-amber-600 dark:text-amber-400" },
}

/** Admin dashboard widget showing delivered item health counts */
export async function ProductHealthWidget() {
  const healthData = await getProductHealthOverview()
  const total = healthData.reduce((sum, h) => sum + h.count, 0)

  if (total === 0) return null

  // Ensure all statuses appear even if count is 0
  const allStatuses = ["active", "inactive", "banned", "expired"]
  const statusMap = Object.fromEntries(healthData.map((h) => [h.status, h.count]))

  return (
    <Card className="shadow-none">
      <CardHeader className="pb-3">
        <h2 className="text-base font-semibold">Product Health</h2>
        <p className="text-muted-foreground text-xs">{total} delivered items total</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {allStatuses.map((status) => {
            const config = STATUS_CONFIG[status]!
            const count = statusMap[status] ?? 0
            const Icon = config.icon

            return (
              <div key={status} className="flex items-center gap-3">
                <div className={`rounded-lg bg-muted p-2 ${config.color}`}>
                  <Icon className="size-4" />
                </div>
                <div>
                  <p className="text-xl font-semibold">{count}</p>
                  <p className="text-muted-foreground text-xs">{config.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
