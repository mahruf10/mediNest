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
import Image from "next/image"

export type AppUser = {
  id: string
  name: string
  email: string
  role: string
}
const PAGE_SIZE = 10
type Props = {
  data?: AppUser[],

}
export default function AdminOrderTable({orders}) {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const filtered = orders.filter((u) =>
    `${u.name} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const order = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)



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

      {order.length === 0 ? (
  <h2 className="text-3xl text-center">No users found.</h2>
) : (
  <div className="rounded-md border">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>OrderNumber</TableHead>
          <TableHead>SellerId</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {order.map((u) => (
          <TableRow key={u.id}>
            <TableCell className="font-medium">{u.orderId}</TableCell>
            <TableCell>{u.product.selleId}</TableCell>
            <TableCell>
            <img src={u.productImage} alt="product-img" className="size-10" />
              {/* <Image src={u.productImage} alt="product-img" width={20} height={20}></Image> */}
            </TableCell>
            <TableCell>{u.order.status}</TableCell>
           

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