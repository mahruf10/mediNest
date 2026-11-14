import { API_URL } from "@/src/lib/config";
import { UpdatableStatus } from "./ordertable"

  type stockOut={
        stockOut?:boolean
    }

export const service={
  
    getSellerProduct:async(id:string,checkStockOut:stockOut,cookie:string)=>{
        if(checkStockOut){
               const res=await fetch(`${API_URL}/product/seller/${id}?stock=0`, {
            method: "GET",
            headers: { cookie },
            cache: "no-store",
        })
         if (!res.ok) {
            throw new Error(`Failed to fetch seller products (HTTP ${res.status})`)
        }
        return res.json()
        }
        const res=await fetch(`${API_URL}/product/seller/${id}`, {
            method: "GET",
            headers: { cookie },
            cache: "no-store",
        })
        if (!res.ok) {
            throw new Error(`Failed to fetch seller products (HTTP ${res.status})`)
        }
        return res.json()
    },
deleteProduct:async(id:number)=>{
     try {
const res=await fetch(`${API_URL}/product/seller/${id}`,{
    method:"DELETE",
    credentials:"include"
})
    const data=await res.json()
    return data;
}
catch(error){
    console.error(error);
}
},
updateStatus:async(id: string, status:UpdatableStatus)=>{
      const res = await fetch(`${API_URL}/orders/seller/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  })
//console.log(res);
  if (!res.ok) {
    alert("Status update failed")
    
  }
  const data=await res.json()
    return data
}
}