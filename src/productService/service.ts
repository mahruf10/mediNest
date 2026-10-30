// import { cookies } from "next/headers";

import { error } from "console";
import type { StaticImageData } from "next/image";

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  imageUrl: string | StaticImageData;
  manufacturer: string | null;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}
const service={
    getproductbySlug: async(slug:string) => {
   try {
const res=await fetch(`http://localhost:5000/product/${slug}`,{
    })
    const data=await res.json()
    return data;
}
catch(error){
    console.error(error);
}
    
},
    getAllProduct: async() => {
   try {
const res=await fetch('http://localhost:5000/product',{
    })
    const data=await res.json()
    return data;
}
catch(error){
    console.error(error);
}
    
},
createCart: async (product:Product) => {
  
    // const cookieStore=await cookies()
    try {
        const res=await fetch("http://localhost:5000/cart",{
            method:"POST",
            headers:{
                "content-type":"application/json",
                // cookie:cookieStore.toString()
            },
            body:JSON.stringify({productId:product.id})
        })
        console.log(res);
        const data=await res.json()
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
},
getCartData:async()=>{
    // const cookieStore=await cookies()
try {
    const res=await fetch('http://localhost:5000/cart',{
        method:'GET',
        headers:{
            "content-type":"application/json",
            // cookie:cookieStore.toString()
        },
      
        })
        const data=await res.json()
        console.log(data)
        return data
} catch (error) {
    console.log(error);
}
},
deleteCartData:async(id:number)=>{
 try {
    const res=await fetch(`http://localhost:5000/cart/${id}`,{
        method:'DELETE',
    })
     if (!res.ok) {
    throw new Error("Failed to delete cart item");
  }

  return await res.json();
 } catch (error) {
    console.log(error);
 }
}
,
postWishlist:async(id:number)=>{
    
        const result=await fetch('http://localhost:5000/wishlist',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({id})
        })
        const data=await result.json()
        if(!result.ok){
            throw new Error(data.message ||"something went wrong")
        }
        
        return data
   
},
getWishlistData:async()=>{
const result=await fetch('http://localhost:5000/wishlist',{
    method:"GET"
})
const data=await result.json()
if(!result.ok){
    throw new Error(data.message || 'something went wrong')
}
return data
},
removewishlist:async(wishlistId:number)=>{
      const res = await fetch(
        `http://localhost:5000/wishlist/${wishlistId}`,
        { method: "DELETE" }
      );
      const data=await res.json()
      if(!res.ok){
        throw new Error(data.message || 'something went wrong')
      }
return data
}
}

export default service