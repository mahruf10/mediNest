import { API_URL } from "@/src/lib/config";
import { cookies } from "next/headers"

export const session=async()=>{
    const cookieStore=await cookies()
    const res=await fetch(`${API_URL}/api/auth/get-session`,{
        headers:{
            cookie:cookieStore.toString()
        },
        cache:"no-store"
    })
    const session=await res.json()
    if(session==null){
        return {data:null,message:"No session found"}
    }
    return {data:session,message:null}
}