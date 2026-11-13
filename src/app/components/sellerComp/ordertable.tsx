"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { service } from "./seller.service"
import { toast } from "@/components/ui/toast"

/* ----------------------------- Types & helpers ---------------------------- */

export type OrderItemStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned"

/** Table er bhetore use howa (mapped) row type */
export type SellerOrderItem = {
  id: string
  orderId:string
  orderNumber: string
  productName: string

  productImage?: string
  sku: string
  variant?: string
  quantity: number
  unitPrice: number
  customerName: string
  status: OrderItemStatus
  orderedAt: string // ISO date
}

/** API theke asha raw item (orders.data[i]) */
export type ApiOrderItem = {
  id: string
  orderId?: string
  productId?: number | string
  productName: string
  productImage?: string
  variant?: string
  quantity: number
  price: string | number
  subtotal?: string | number
  status?: string // item level status thakle
  createdAt: string
  order?: {
    id?: string
    orderNumber?: string
    status?: string
    customerName?: string
    user?: { name?: string }
    [key: string]: any
  }
  product?: { sku?: string; [key: string]: any }
}

const statusStyles: Record<OrderItemStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  processing: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  shipped: "bg-purple-100 text-purple-800 hover:bg-purple-100",
  delivered: "bg-green-100 text-green-800 hover:bg-green-100",
  cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
  returned: "bg-gray-200 text-gray-800 hover:bg-gray-200",
}

const PLACEHOLDER_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><rect width='40' height='40' fill='#e5e7eb'/></svg>`
  )

const formatMoney = (value: number, currency = "BDT") =>
  new Intl.NumberFormat("en-BD", { style: "currency", currency }).format(value)

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
export type UpdatableStatus = "PROCESSING" | "CANCELLED" | "SHIPPED" | "DELIVERED"

const updateStatus = async (id: string, status: UpdatableStatus) => {
  try {
    const res = await service.updateStatus(id, status)

    toast.add({
      type:'success',
      title:"Status updated"
    })
    setTimeout(() => window.location.reload(), 800)
  } catch (error) {
    //console.log("ERROR:", error)
    toast.add({
      type:'error',
      title:"Something went wrong. Please try again."
    })
  }
}



/** API item -> table row */
const mapApiItem = (i: ApiOrderItem): SellerOrderItem => {
  const rawStatus = String(i.status ?? i.order?.status ?? "pending").toLowerCase()
  const status = (
    rawStatus in statusStyles ? rawStatus : "pending"
  ) as OrderItemStatus

  return {
    id: i.id,
    orderNumber: i.order?.orderNumber ?? "",
      orderId: i.orderId ?? "", 
    productName: i.productName,
    productImage: i.productImage,
    sku: i.product?.sku ?? String(i.productId ?? ""),
    variant: i.variant,
    quantity: Number(i.quantity),
    unitPrice: Number(i.price),
    customerName: i.order?.customerName ?? i.order?.user?.name ?? "N/A",
    status,
    orderedAt: i.createdAt,
  }
}

/* --------------------------------- Columns -------------------------------- */

type ColumnActions = {
  onView?: (item: SellerOrderItem) => void
  onUpdateStatus?: (item: SellerOrderItem, status: OrderItemStatus) => void
}

export const getColumns = ({
  onView,
  onUpdateStatus,
}: ColumnActions = {}): ColumnDef<SellerOrderItem>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderNumber",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-3"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Order
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("orderNumber")}</span>
    ),
  },
  {
    accessorKey: "productName",
    header: "Product",
    cell: ({ row }) => {
      const item = row.original
      return (
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.productImage || PLACEHOLDER_IMG}
            alt={item.productName}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={(e) => {
              const img = e.currentTarget
              img.onerror = null // infinite loop atkate
              img.src = PLACEHOLDER_IMG
            }}
            className="h-10 w-10 rounded-md border object-cover"
          />
          <div className="flex flex-col">
            <span className="line-clamp-1 font-medium">{item.productName}</span>
            <span className="text-xs text-muted-foreground">
              SKU: {item.sku}
              {item.variant ? ` · ${item.variant}` : ""}
            </span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "customerName",
    header: "Customer",
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Qty
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("quantity")}</div>
    ),
  },
  {
    id: "total",
    accessorFn: (row) => row.quantity * row.unitPrice,
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {formatMoney(row.getValue("total"))}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: (row, id, value) => value === "all" || row.getValue(id) === value,
    cell: ({ row }) => {
      const status = row.getValue<OrderItemStatus>("status")
      return (
        <Badge variant="secondary" className={`capitalize ${statusStyles[status]}`}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "orderedAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-3"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => formatDate(row.getValue("orderedAt")),
  },
{
  id: "actions",
  enableHiding: false,
  cell: ({ row }) => {
    const item = row.original

    if (item.status === "pending") {
      return (
        <div className="flex gap-2">
          <Button size="sm" onClick={() => updateStatus(item.orderId, "PROCESSING")}>
            Accept
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => updateStatus(item.orderId, "CANCELLED")}
          >
            Reject
          </Button>
        </div>
      )
    }

    if (item.status === "processing") {
      return (
        <Button
          size="sm"
          variant="outline"
          onClick={() => updateStatus(item.orderId, "SHIPPED")}
        >
          Mark as shipped
        </Button>
      )
    }

    if (item.status === "shipped") {
      return (
        <Button
          size="sm"
          variant="outline"
          onClick={() => updateStatus(item.orderId, "DELIVERED")}
        >
          Mark as delivered
        </Button>
      )
    }

    return null
  },
},
]

/* ---------------------------------- Table --------------------------------- */

type Prop = {
  /** parent theke `orders.data` pathaw (raw API array) */
  data?: ApiOrderItem[]
  onView?: (item: SellerOrderItem) => void
  onUpdateStatus?: (item: SellerOrderItem, status: OrderItemStatus) => void
}

export function SellerOrderItemsTable({
  data: apiData,
  onView,
  onUpdateStatus,
}: Prop) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  // API data -> table data
  const data = React.useMemo<SellerOrderItem[]>(
    () => (apiData ?? []).map(mapApiItem),
    [apiData]
  )

  const columns = React.useMemo(
    () => getColumns({ onView, onUpdateStatus }),
    [onView, onUpdateStatus]
  )

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    initialState: { pagination: { pageSize: 10 } },
  })

  return (
    <div className="w-full space-y-4 p-5">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder="Search product..."
          value={(table.getColumn("productName")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("productName")?.setFilterValue(e.target.value)}
          className="max-w-xs"
        />
        <Input
          placeholder="Search customer..."
          value={(table.getColumn("customerName")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("customerName")?.setFilterValue(e.target.value)}
          className="max-w-xs"
        />
        <Select
          value={(table.getColumn("status")?.getFilterValue() as string) ?? "all"}
          onValueChange={(v) => table.getColumn("status")?.setFilterValue(v)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {Object.keys(statusStyles).map((s) => (
              <SelectItem key={s} value={s} className="capitalize">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((c) => c.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(v) => column.toggleVisibility(!!v)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel()?.rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No order items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer / pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}