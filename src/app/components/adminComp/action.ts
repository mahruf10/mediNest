"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import adminService from "./admin.service"

export async function updateUserRoleAction(id: string, role: string) {
  const cookieHeader = (await cookies()).toString()
  await adminService.updateUserRole(id, role, cookieHeader)
  revalidatePath("/allUsers") // change to your users page path
}