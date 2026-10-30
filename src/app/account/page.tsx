"use client"

import * as React from "react"
import {
  FileText,
  Home,
  KeyRound,
  MapPin,
  Package,
  Plus,
  RotateCcw,
  Trash2,
  Upload,
  User,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { authClient } from "@/src/lib/auth-client"

/* ---------------- Types & mock data (replace with your API/DB) ---------------- */

type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled"
type Order = { id: string; date: string; items: string; total: number; status: OrderStatus }
// type Prescription = { id: string; name: string; date: string; status: "verified" | "pending" | "rejected" }
type Address = { id: string; label: string; name: string; phone: string; line: string; isDefault: boolean }




// const user = {
//   name: "Rahim Uddin",
//   email: "rahim@example.com",
//   phone: "+880 1700-000000",
//   dob: "1995-04-12",
//   avatar: "",
//   memberSince: "Jan 2026",
// }

const orders: Order[] = [
  { id: "MS-10245", date: "15 Oct 2026", items: "Napa Extra x2, Vitamin C 500mg", total: 640, status: "delivered" },
  { id: "MS-10231", date: "08 Oct 2026", items: "Digital thermometer", total: 450, status: "shipped" },
  { id: "MS-10198", date: "30 Sep 2026", items: "Ace Plus x3, Seclo 20mg", total: 385, status: "processing" },
  { id: "MS-10120", date: "12 Sep 2026", items: "Baby lotion, Diaper (M)", total: 1250, status: "cancelled" },
]

// const prescriptions: Prescription[] = [
//   { id: "RX-301", name: "Dr. Karim - Fever and cold", date: "14 Oct 2026", status: "verified" },
//   { id: "RX-298", name: "Dr. Sultana - Gastric", date: "02 Oct 2026", status: "pending" },
// ]

const addresses: Address[] = [
  { id: "a1", label: "Home", name: "Rahim Uddin", phone: "+880 1700-000000", line: "House 12, Road 4, Agrabad, Chattogram", isDefault: true },
  { id: "a2", label: "Office", name: "Rahim Uddin", phone: "+880 1800-000000", line: "Level 5, GEC Circle, Chattogram", isDefault: false },
]

const statusStyle: Record<OrderStatus, { label: string; className: string }> = {
  processing: { label: "Processing", className: "bg-amber-100 text-amber-800 hover:bg-amber-100" },
  shipped: { label: "Shipped", className: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
  delivered: { label: "Delivered", className: "bg-green-100 text-green-800 hover:bg-green-100" },
  cancelled: { label: "Cancelled", className: "bg-red-100 text-red-800 hover:bg-red-100" },
}

const rxStyle = {
  verified: "bg-green-100 text-green-800 hover:bg-green-100",
  pending: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  rejected: "bg-red-100 text-red-800 hover:bg-red-100",
}

/* ----------------------------------- Page ----------------------------------- */

export default function AccountPage() {

    const {data,isPending}=authClient.useSession()
    const user=data?.user
 if(isPending){
        return <p>Please wait</p>
    }
  const initials = user?.name.split(" ").map((n) => n[0]).join("").slice(0, 2)

  return (
    <div className="container mx-auto max-w-5xl space-y-6 px-4 py-8">
      <Card>
        <CardContent className="flex flex-col items-center gap-4 p-6 sm:flex-row">
          {/* <Avatar className="size-20">
            <AvatarImage src={user?.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-xl font-semibold text-primary">{initials}</AvatarFallback>
          </Avatar> */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold tracking-tight">{user?.name}</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            {/* <p className="text-xs text-muted-foreground">Member since {user?.createdAt}</p> */}
          </div>
          <div className="grid grid-cols-3 gap-6 text-center">
            <Stat value={orders.length} label="Orders" />
            {/* <Stat value={prescriptions.length} label="Prescriptions" /> */}
            <Stat value={addresses.length} label="Addresses" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="h-auto w-full flex-wrap justify-start gap-1 sm:w-auto">
          <TabsTrigger value="profile" className="gap-2"><User className="size-4" />Profile</TabsTrigger>
          <TabsTrigger value="orders" className="gap-2"><Package className="size-4" />Orders</TabsTrigger>
          {/* <TabsTrigger value="prescriptions" className="gap-2"><FileText className="size-4" />Prescriptions</TabsTrigger> */}
          <TabsTrigger value="addresses" className="gap-2"><MapPin className="size-4" />Addresses</TabsTrigger>
          <TabsTrigger value="security" className="gap-2"><KeyRound className="size-4" />Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile"><ProfileTab /></TabsContent>
        <TabsContent value="orders"><OrdersTab /></TabsContent>
        {/* <TabsContent value="prescriptions"><PrescriptionsTab /></TabsContent> */}
        <TabsContent value="addresses"><AddressesTab /></TabsContent>
        <TabsContent value="security"><SecurityTab /></TabsContent>
      </Tabs>
    </div>
  )
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

/* ---------------------------------- Tabs ---------------------------------- */

function ProfileTab() {
    const {data}=authClient.useSession()
   
    const user=data?.user
  const [form, setForm] = React.useState({ name: user?.name, email: user?.email, phone: user?.phone, dob: user?.dob })
  const [saved, setSaved] = React.useState(false)


  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [k]: e.target.value })
    setSaved(false)
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: call your update-profile API
    setSaved(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal information</CardTitle>
        <CardDescription>Update your details used for orders and delivery.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="name" label="Full name"><Input id="name" value={form.name} onChange={update("name")} required /></Field>
            <Field id="email" label="Email"><Input id="email" type="email" value={form.email} onChange={update("email")} required /></Field>
            <Field id="phone" label="Phone"><Input id="phone" value={form.phone} onChange={update("phone")} /></Field>
            <Field id="dob" label="Date of birth"><Input id="dob" type="date" value={form.dob} onChange={update("dob")} /></Field>
          </div>
          <div className="flex items-center gap-3">
            <Button type="submit">Save changes</Button>
            {saved && <span className="text-sm text-green-600">Saved</span>}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function OrdersTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order history</CardTitle>
        <CardDescription>Track and reorder your past purchases.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {orders.map((o, i) => (
          <React.Fragment key={o.id}>
            {i > 0 && <Separator />}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">#{o.id}</span>
                  <Badge className={cn("border-0", statusStyle[o.status].className)}>{statusStyle[o.status].label}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{o.items}</p>
                <p className="text-xs text-muted-foreground">{o.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold">৳{o.total.toLocaleString()}</span>
                <Button variant="outline" size="sm" className="gap-2"><RotateCcw className="size-3.5" />Reorder</Button>
              </div>
            </div>
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  )
}

// function PrescriptionsTab() {
//   return (
//     <Card>
//       <CardHeader className="flex-row items-start justify-between space-y-0">
//         <div className="space-y-1.5">
//           <CardTitle>Prescriptions</CardTitle>
//           <CardDescription>Upload prescriptions for medicines that require one.</CardDescription>
//         </div>
//         <Button className="gap-2"><Upload className="size-4" />Upload</Button>
//       </CardHeader>
//       <CardContent className="space-y-3">
//         {prescriptions.map((p) => (
//           <div key={p.id} className="flex items-center justify-between rounded-lg border p-3">
//             <div className="flex items-center gap-3">
//               <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
//                 <FileText className="size-5" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium">{p.name}</p>
//                 <p className="text-xs text-muted-foreground">{p.id} · {p.date}</p>
//               </div>
//             </div>
//             <Badge className={cn("border-0 capitalize", rxStyle[p.status])}>{p.status}</Badge>
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   )
// }

function AddressesTab() {
  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between space-y-0">
        <div className="space-y-1.5">
          <CardTitle>Saved addresses</CardTitle>
          <CardDescription>Manage where your medicines get delivered.</CardDescription>
        </div>
        <Button variant="outline" className="gap-2"><Plus className="size-4" />Add new</Button>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        {addresses.map((a) => (
          <div key={a.id} className={cn("space-y-2 rounded-lg border p-4", a.isDefault && "border-primary")}>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-medium"><Home className="size-4 text-primary" />{a.label}</span>
              {a.isDefault && <Badge variant="secondary">Default</Badge>}
            </div>
            <p className="text-sm">{a.name} · {a.phone}</p>
            <p className="text-sm text-muted-foreground">{a.line}</p>
            <div className="flex gap-2 pt-1">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="ghost" size="sm" className="gap-1 text-destructive hover:text-destructive">
                <Trash2 className="size-3.5" />Remove
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function SecurityTab() {
  const [msg, setMsg] = React.useState<string | null>(null)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    if (fd.get("new") !== fd.get("confirm")) return setMsg("Passwords do not match")
    if (String(fd.get("new")).length < 8) return setMsg("Use at least 8 characters")
    // TODO: call your change-password API
    setMsg("Password updated")
    form.reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change password</CardTitle>
        <CardDescription>Use a strong password you do not use elsewhere.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="max-w-md space-y-4">
          <Field id="current" label="Current password"><Input id="current" name="current" type="password" required /></Field>
          <Field id="new" label="New password"><Input id="new" name="new" type="password" required /></Field>
          <Field id="confirm" label="Confirm new password"><Input id="confirm" name="confirm" type="password" required /></Field>
          <div className="flex items-center gap-3">
            <Button type="submit">Update password</Button>
            {msg && <span className="text-sm text-muted-foreground">{msg}</span>}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  )
}