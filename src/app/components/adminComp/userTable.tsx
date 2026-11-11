"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Settings } from "lucide-react"

export type AppUser = {
  id: string
  name: string
  email: string
  role: string
}
  import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import adminService from "./admin.service"
import { updateUserRoleAction } from "./action"
import { toast } from "@/components/ui/toast"
const PAGE_SIZE = 10
type Props = {
  data?: AppUser[],

}
export default function UserTable({ data = [] }: Props) {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const filtered = data.filter((u) =>
    `${u.name} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const users = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)


const items = [
  { label: "USER", value: "USER" },
  { label: "SELLER", value: "SELLER" },
  { label: "ADMIN", value: "ADMIN" },
]


  const editRole = async (id: string, role: string) => {
   await updateUserRoleAction(id, role)
  toast.add({
    type:'success',
    title:'Role updated Successfully'
  })
  }

  return (
    <div className="space-y-4 p-5">
      <Input
        placeholder="Search name or email..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          setPage(1) // go back to the first page when searching
        }}
        className="max-w-xs"
      />

      {users.length === 0 ? (
  <h2 className="text-3xl text-center">No users found.</h2>
) : (
  <div className="rounded-md border">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead><Settings color="#473e3e" /></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((u) => (
          <TableRow key={u.id}>
            <TableCell className="font-medium">{u.name}</TableCell>
            <TableCell>{u.email}</TableCell>
            <TableCell>{u.role}</TableCell>
            <TableCell>
              <Select items={items}
              defaultValue={u.role}
               onValueChange={(role) => editRole(u.id, role as string)}
              >
      <SelectTrigger className="w-full max-w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Roles</SelectLabel>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
            </TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
)}

      <div className="flex items-center justify-end gap-2">
        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}