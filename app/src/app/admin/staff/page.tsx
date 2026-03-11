'use client'

import { useState } from 'react'
import { UserPlusIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type StaffRole = 'super_admin' | 'admin' | 'staff'

type StaffMember = {
  id: string
  name: string
  email: string
  role: StaffRole
  online: boolean
}

const STAFF_DATA: StaffMember[] = [
  { id: 's-001', name: 'nammdev', email: 'nammdev@goads.shop', role: 'super_admin', online: true },
  { id: 's-002', name: 'justin', email: 'justin@goads.shop', role: 'super_admin', online: true },
  { id: 's-003', name: 'Staff A', email: 'staffa@goads.shop', role: 'staff', online: false },
  { id: 's-004', name: 'Staff B', email: 'staffb@goads.shop', role: 'staff', online: false },
]

const ROLE_LABELS: Record<StaffRole, string> = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  staff: 'Staff',
}

const ROLE_BADGE_CLASS: Record<StaffRole, string> = {
  super_admin: 'bg-primary/10 text-primary border-transparent',
  admin: 'bg-blue-100 text-blue-800 border-transparent dark:bg-blue-900/30 dark:text-blue-400',
  staff: 'bg-gray-100 text-gray-700 border-transparent dark:bg-gray-900/30 dark:text-gray-400',
}

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
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit">Send Invite</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-none">
        <CardHeader>
          <span className="text-lg font-semibold">Staff Members ({STAFF_DATA.length})</span>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Member</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {STAFF_DATA.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8 rounded-md">
                        <AvatarFallback className="rounded-md text-xs">
                          {member.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{member.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{member.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={ROLE_BADGE_CLASS[member.role]}>
                      {ROLE_LABELS[member.role]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className={`size-2 rounded-full ${member.online ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                      />
                      <span className="text-sm">
                        {member.online ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
