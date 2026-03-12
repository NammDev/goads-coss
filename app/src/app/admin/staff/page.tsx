'use client'

import { useState } from 'react'
import { UserPlusIcon } from 'lucide-react'

import { AdminDataTable } from '@/components/dashboard/admin-data-table'
import { staffColumns, type StaffMember } from '@/components/dashboard/columns/staff-columns'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const STAFF_DATA: StaffMember[] = [
  { id: 's-001', name: 'nammdev', email: 'nammdev@goads.shop', role: 'super_admin', online: true },
  { id: 's-002', name: 'justin', email: 'justin@goads.shop', role: 'super_admin', online: true },
  { id: 's-003', name: 'Staff A', email: 'staffa@goads.shop', role: 'staff', online: false },
  { id: 's-004', name: 'Staff B', email: 'staffb@goads.shop', role: 'staff', online: false },
]

export default function StaffPage() {
  const [open, setOpen] = useState(false)

  function handleInvite(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Staff</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlusIcon className="mr-1 size-4" />
              Invite Staff
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New Staff Member</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleInvite} className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="invite-email">Email</Label>
                <Input id="invite-email" type="email" placeholder="email@goads.shop" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invite-role">Role</Label>
                <Select required>
                  <SelectTrigger id="invite-role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Send Invite</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <AdminDataTable
        data={STAFF_DATA}
        columns={staffColumns}
        searchPlaceholder="Search staff..."
      />
    </div>
  )
}
