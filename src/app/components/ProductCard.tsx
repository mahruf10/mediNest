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

type Props = {
  products: Product[];
};

export default  function ProductList({ products }: Props) {

const handleWishlist = async (productId: number) => {
  try {
    const result = await service.postWishlist(productId);

    if (result.success) {
      alert("Wishlist saved successfully");
    }
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("Something went wrong");
    }
  }
};


  const handleCart = async(product: Product) => {
     
    const res=await service.createCart(product)
   
    if(res){
      alert("Product added to cart")
    }

  };

  return (
    <div className="mt-20 grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <Card
          key={product.id}
          className="relative w-full max-w-sm overflow-hidden pt-0"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="aspect-video w-full object-cover"
          />

          <button
            type="button"
            onClick={() => handleWishlist((product.id))}
            className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white shadow-md"
            aria-label="Add to wishlist"
          >
            <Heart className="size-4" />
          </button>

          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <div className="flex  gap-30">
              <p>${product.price}</p>
              <p>Stock:{product.stock}</p>
            </div>
            
          </CardHeader>

          <CardFooter>
            <Button
              className="w-full"
              onClick={() => handleCart(product)}
              disabled={product.stock===0}
            >
              <ShoppingCart />
              Add to cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
