"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { reviewReport } from "@/lib/actions/community-admin-actions"
import { toast } from "sonner"
import type { ReportRow } from "@/components/dashboard/columns/admin-report-columns"

interface AdminReportActionsProps {
  report: ReportRow
}

export function AdminReportActions({ report }: AdminReportActionsProps) {
  const [isPending, startTransition] = useTransition()

  function handleAction(action: "approve" | "hide" | "dismiss") {
    startTransition(async () => {
      const result = await reviewReport(report.id, action)
      if (result.success) {
        toast.success(`Report ${action === "dismiss" ? "dismissed" : action === "hide" ? "hidden" : "approved"}`)
      } else {
        toast.error(result.error ?? "Failed")
      }
    })
  }

  if (report.status !== "open") {
    return <span className="text-sm text-muted-foreground">Already {report.status}</span>
  }

  return (
    <div className="flex flex-col gap-3 p-4">
      {report.details && (
        <p className="text-sm text-muted-foreground">
          <strong>Details:</strong> {report.details}
        </p>
      )}
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => handleAction("approve")} disabled={isPending}>
          Approve (Keep)
        </Button>
        <Button size="sm" variant="destructive" onClick={() => handleAction("hide")} disabled={isPending}>
          Hide Content
        </Button>
        <Button size="sm" variant="ghost" onClick={() => handleAction("dismiss")} disabled={isPending}>
          Dismiss
        </Button>
      </div>
    </div>
  )
}
