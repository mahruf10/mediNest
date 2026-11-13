"use client";
import type { Product } from "@/src/productService/service";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import service from "@/src/productService/service";
import { useState } from "react";
import { toast } from "@/components/ui/toast";

export type Props = {
  products: Product[];
  role?:string
};

export default  function ProductList({ products,role }: Props) {
const [pendingAction,setPendingAction]=useState<{type:"cart"|"wishlist";productId:number}|null>(null)

const handleWishlist = async (productId: number) => {
  setPendingAction({type:"wishlist",productId})
  try {
    await service.postWishlist(productId)
    toast.add({type:"success",title:"Product added to your wishlist"})
  } catch (error) {
    toast.add({
      type:"error",
      title:error instanceof Error ? error.message : "Could not add product to wishlist"
    })
  } finally {
    setPendingAction(null)
  }
};


  const handleCart = async(product: Product) => {
    setPendingAction({type:"cart",productId:product.id})
    try {
      await service.createCart(product.id)
      toast.add({type:"success",title:"Product added to cart"})
    } catch (error) {
      toast.add({
        type:"error",
        title:error instanceof Error ? error.message : "Could not add product to cart"
      })
    } finally {
      setPendingAction(null)
    }
  };
  const canShop = !role || role === "USER"
//console.log('role',role);
//console.log('canshop',canShop);
  return (
    <div className="mt-20 grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <Card
          key={product.id}
          className="relative w-full max-w-sm overflow-hidden pt-0"
        >
          <img
            src={typeof product.imageUrl === "string" ? product.imageUrl : product.imageUrl.src}
            alt={product.name}
            className="aspect-video w-full object-cover"
          />

{canShop && (
  <button
    type="button"
    onClick={() => handleWishlist(product.id)}
    disabled={
      pendingAction?.type === "wishlist" &&
      pendingAction.productId === product.id
    }
    className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white shadow-md"
    aria-label="Add to wishlist"
  >
    <Heart className="size-4" />
  </button>
)}
     

          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <div className="flex  gap-30">
              <p>${product.price}</p>
              <p>Stock:{product.stock}</p>
            </div>
            
          </CardHeader>

          <CardFooter>
            {
              canShop &&(<Button
              className="w-full"
              onClick={() => handleCart(product)}
              disabled={product.stock===0 || (pendingAction?.type==="cart" && pendingAction.productId===product.id)}
            >
              <ShoppingCart />
              Add to cart
            </Button>)
            }
            
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
