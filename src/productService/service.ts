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
    
}

}
export default service