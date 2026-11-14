"use server"


import { API_URL } from "@/src/lib/config";
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import adminService from "./admin.service"

export async function updateUserRoleAction(id: string, role: string) {
  const cookieHeader = (await cookies()).toString()
  await adminService.updateUserRole(id, role, cookieHeader)
  revalidatePath("/allUsers") // change to your users page path
}
export async function addCategoryAction(name: string) {
  const cookieHeader = (await cookies()).toString()

  const res = await fetch(`${API_URL}/category`, {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: cookieHeader },
    body: JSON.stringify({ name }),
  })

  if (!res.ok) throw new Error(`Could not add category (${res.status})`)
 
 const data=await res.json()
 return data
}