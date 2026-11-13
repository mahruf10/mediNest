"use client"

import { useState, useTransition } from "react"
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
import { addCategoryAction } from "./action"
import { toast } from "@/components/ui/toast"

export type Category = {
  id: number
  name: string,
  slug:string,
  createdAt:Date
}

export default function CategoryManager({ categories = [] }: { categories?: Category[] }) {
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return setError("Category name is required")
    setError("")

    startTransition(async () => {
      try {
        await addCategoryAction(name.trim())
        setName("")
        toast.add({
            type:'success',
            title:'category successfully added!!..'
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not add category")
      }
    })
  }

  return (
    <div className="space-y-6 p-5">
      <form onSubmit={handleAdd} className="flex max-w-md gap-2">
        <Input
          placeholder="New category name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add"}
        </Button>
      </form>
      {error && <p className="text-sm text-red-600">{error}</p>}

      {categories.length === 0 ? (
        <h2 className="text-center text-2xl">No categories yet.</h2>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">#</TableHead>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((c, i) => (
                <TableRow key={c.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell className="font-medium">{c.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}