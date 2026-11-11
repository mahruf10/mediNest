  type stockOut={
        stockOut?:boolean
    }

export const service={
  
    getSellerProduct:async(id:string,checkStockOut:stockOut,cookie:string)=>{
        if(checkStockOut){
               const res=await fetch(`http://localhost:5000/product/seller/${id}?stock=0`, {
            method: "GET",
            headers: { cookie },
            cache: "no-store",
        })
         if (!res.ok) {
            throw new Error(`Failed to fetch seller products (HTTP ${res.status})`)
        }
        return res.json()
        }
        const res=await fetch(`http://localhost:5000/product/seller/${id}`, {
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
const res=await fetch(`http://localhost:5000/product/seller/${id}`,{
    method:"DELETE",
    credentials:"include"
})
    const data=await res.json()
    return data;
}
catch(error){
    console.error(error);
}
}
}