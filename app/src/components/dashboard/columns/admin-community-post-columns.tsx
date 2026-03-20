"use client"

import Link from "next/link"
import { format } from "date-fns"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

/** Serialized post row for admin table */
export type PostRow = {
  id: string
  title: string
  slug: string
  authorName: string
  categoryName: string
  status: string
  isPinned: boolean
  isHidden: boolean
  upvotesCount: number
  repliesCount: number
  viewsCount: number
  createdAt: string
}

const POST_STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  open: { label: "Open", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  solved: { label: "Solved", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
  closed: { label: "Closed", className: "bg-muted text-muted-foreground" },
  in_review: { label: "In Review", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
  planned: { label: "Planned", className: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" },
  in_progress: { label: "In Progress", className: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400" },
  completed: { label: "Completed", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
}

export const adminCommunityPostColumns: ColumnDef<PostRow, unknown>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/portal/community/${row.original.slug}`}
        className="max-w-[300px] truncate font-medium hover:text-primary hover:underline"
        onClick={(e) => e.stopPropagation()}
        target="_blank"
      >
        {row.original.title}
      </Link>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "authorName",
    header: "Author",
  },
  {
    accessorKey: "categoryName",
    header: "Category",
    meta: { filterVariant: "select" as const },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const config = POST_STATUS_CONFIG[row.original.status]
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
    id: "flags",
    header: "Flags",
    cell: ({ row }) => (
      <div className="flex gap-1">
        {row.original.isPinned && <Badge variant="outline" className="text-[10px]">Pinned</Badge>}
        {row.original.isHidden && <Badge variant="destructive" className="text-[10px]">Hidden</Badge>}
      </div>
    ),
  },
  {
    id: "engagement",
    header: "Engagement",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.upvotesCount}↑ {row.original.repliesCount}💬 {row.original.viewsCount}👁
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.original.createdAt), "dd/MM/yyyy")}
      </span>
    ),
  },
]
