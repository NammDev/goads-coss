"use client"

import { useTransition } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateDeliveredItemStatus } from "@/lib/actions/product-health-actions"

const STATUSES = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "banned", label: "Banned" },
  { value: "expired", label: "Expired" },
] as const

type Props = {
  itemId: string
  currentStatus: string
}

/** Dropdown to change delivered item health status (admin only) */
export function ItemStatusSelect({ itemId, currentStatus }: Props) {
  const [isPending, startTransition] = useTransition()

  function handleChange(newStatus: string) {
    if (newStatus === currentStatus) return
    startTransition(async () => {
      const result = await updateDeliveredItemStatus(
        itemId,
        newStatus as "active" | "inactive" | "banned" | "expired",
      )
      if (!result.success) {
        console.error("Failed to update status:", result.error)
      }
    })
  }

  return (
    <Select value={currentStatus} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className="h-7 w-[110px] text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STATUSES.map((s) => (
          <SelectItem key={s.value} value={s.value} className="text-xs">
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
