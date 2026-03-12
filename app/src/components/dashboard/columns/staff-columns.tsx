'use client'

import type { ColumnDef } from '@tanstack/react-table'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export type StaffMember = {
  id: string
  name: string
  email: string
  role: 'super_admin' | 'admin' | 'staff'
  online: boolean
}

const ROLE_LABELS: Record<StaffMember['role'], string> = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  staff: 'Staff',
}

const ROLE_BADGE_CLASS: Record<StaffMember['role'], string> = {
  super_admin: 'bg-primary/10 text-primary border-transparent',
  admin: 'bg-blue-100 text-blue-800 border-transparent dark:bg-blue-900/30 dark:text-blue-400',
  staff: 'bg-gray-100 text-gray-700 border-transparent dark:bg-gray-900/30 dark:text-gray-400',
}

export const staffColumns: ColumnDef<StaffMember, unknown>[] = [
  {
    accessorKey: 'name',
    header: 'Staff Member',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="size-8 rounded-md">
          <AvatarFallback className="rounded-md text-xs">
            {row.original.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.email}</span>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <Badge variant="outline" className={ROLE_BADGE_CLASS[row.original.role]}>
        {ROLE_LABELS[row.original.role]}
      </Badge>
    ),
    enableSorting: false,
  },
  {
    id: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span
          className={`size-2 rounded-full ${
            row.original.online
              ? 'bg-emerald-500'
              : 'bg-gray-300 dark:bg-gray-600'
          }`}
        />
        <span className="text-sm">{row.original.online ? 'Online' : 'Offline'}</span>
      </div>
    ),
    enableSorting: false,
  },
]
