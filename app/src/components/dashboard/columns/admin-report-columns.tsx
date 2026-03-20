"use client"

import { format } from "date-fns"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

/** Serialized report row for the admin table */
export type ReportRow = {
  id: string
  reporterName: string
  reason: string
  details: string | null
  postId: string | null
  replyId: string | null
  status: string
  createdAt: string
}

const REASON_LABELS: Record<string, string> = {
  spam: "Spam",
  inappropriate: "Inappropriate",
  offtopic: "Off-topic",
  other: "Other",
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  open: {
    label: "Open",
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  reviewed: {
    label: "Reviewed",
    className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  dismissed: {
    label: "Dismissed",
    className: "bg-muted text-muted-foreground",
  },
}

export const adminReportColumns: ColumnDef<ReportRow, unknown>[] = [
  {
    accessorKey: "id",
    header: "Report ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.original.id.slice(0, 8)}...</span>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "reporterName",
    header: "Reporter",
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => (
      <span className="text-sm">{REASON_LABELS[row.original.reason] ?? row.original.reason}</span>
    ),
    meta: { filterVariant: "select" as const },
  },
  {
    id: "target",
    header: "Target",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.postId ? "Post" : "Reply"}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const config = STATUS_CONFIG[row.original.status]
      return config ? (
        <Badge variant="outline" className={cn("border-transparent", config.className)}>
          {config.label}
        </Badge>
      ) : (
        <span>{row.original.status}</span>
      )
    },
    meta: { filterVariant: "select" as const },
  },
  {
    accessorKey: "createdAt",
    header: "Reported",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.original.createdAt), "dd/MM/yyyy")}
      </span>
    ),
  },
]
