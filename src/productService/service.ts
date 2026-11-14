import { API_URL } from "@/src/lib/config";
import type { StaticImageData } from "next/image";

const API_BASE = `${API_URL}`;

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

type CartProduct = {
  id: number;
  name: string;
  description: string | null;
  price: string | number;
  stock: number;
  imageUrl: string | null;
  manufacturer: string | null;
  categoryId: number;
};

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: CartProduct;
}

export interface WishlistItem {
  id: number;
  productId: number;
  createdAt: string;
  product: CartProduct;
}

async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...init.headers,
    },
  });
  const data = await response.json() as { message?: string; error?: string } & T;
  if (!response.ok) {
    throw new Error(data.message ?? data.error ?? `Request failed (HTTP ${response.status})`);
  }
  return data;
}

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
export interface ProductCategory {
  id: number;
  slug: string;
  products: Product[];
}
const service={
  getproductbySlug: async(slug:string): Promise<ProductCategory[] | null> => {
   const endpoint = `${API_URL}/product/${encodeURIComponent(slug)}`;

   try {
    console.info(`[product-service] Fetching category "${slug}" from ${endpoint}`);
    const res=await fetch(endpoint, { cache: "no-store" });
  
    if (res.status === 404) {
        return null;
    }
    if (!res.ok) {
        throw new Error(`Failed to fetch category "${slug}" (HTTP ${res.status})`);
    }
    const data: ProductCategory[] = await res.json();
    const category = data[0];
    if (category && category.slug !== slug) {
        throw new Error(`Requested category "${slug}" but API returned "${category.slug}"`);
    }
    // console.info("[product-service] Category response", {
    //     requestedSlug: slug,
    //     returnedSlug: category?.slug ?? null,
    //     categoryId: category?.id ?? null,
    //     productCount: category?.products.length ?? 0,
    // });
    return data;
}
catch(error){
    console.error(error);
    throw error;
}
    
},
  


getAllProduct: async() => {
   try {
const res=await fetch(`${API_URL}/product`,{
    })
    const data=await res.json()
    return data;
}
catch(error){
    console.error(error);
}
    
},
createCart: async (productId:number) => {
    return apiRequest<ApiResponse<CartItem>>("/cart", {
        method:"POST",
        body:JSON.stringify({productId})
    });
},
getCartData:async()=>{
    return apiRequest<ApiResponse<CartItem[]>>("/cart");
},
deleteCartData:async(cartItemId:number)=>{
    return apiRequest<ApiResponse<{count:number}>>(`/cart/${cartItemId}`, {
        method:"DELETE"
    });
},
// deleteAllCartData:async()=>{
//     const res=
// }

postWishlist:async(id:number)=>{
    return apiRequest<ApiResponse<WishlistItem>>("/wishlist", {
        method:"POST",
        body:JSON.stringify({productId:id})
    });
},
getWishlistData:async()=>{
    return apiRequest<ApiResponse<WishlistItem[]>>("/wishlist");
},
removewishlist:async(wishlistId:number)=>{
    return apiRequest<ApiResponse<{count:number}>>(`/wishlist/${wishlistId}`, {
        method:"DELETE"
    });
},

cancelOrder:async(id:string)=>{
const res=await fetch(`${API_URL}/orders/${id}`,{
    method:'DELETE'
})

if(!res.ok){
    throw new Error('could not delete order.try again.....')
}
const data=await res.json()
return data
}
}

export default service