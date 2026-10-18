
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Eye,
  Trash2,
  ArrowRight,
  Loader2,
  PackageOpen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import service from "@/src/productService/service";

type Product = {
  id: number;
  name: string;
  price: string | number;
  imageUrl: string | null;
  stock: number;
  manufacturer: string | null;
};

type WishlistItem = {
  id: number;
  productId: number;
  product: Product;
};

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<number | null>(null);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const result = await service.getWishlistData()
        
        setItems(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, []);

  const removeWishlist = async (wishlistId: number) => {
    try {
      setRemovingId(wishlistId);
   const res=await service.removewishlist(wishlistId)
  
    if(res.success){
      alert('item is removed from wishlist')
    }
      setItems((prev) => prev.filter((item) => item.productId !== wishlistId));
    } catch (error) {
      console.log(error.message);
      alert("Could not remove item from wishlist");
    } finally {
      setRemovingId(null);
    }
  };

  const addToCart = async (productId) => {
    try {
      const res=await service.createCart(productId)

      if (!res.ok) throw new Error("Failed to add to cart");

      alert("Product added to cart!");
    } catch (error) {
      console.error(error);
      alert("Could not add product to cart");
    }
  };

  const formatPrice = (price: string | number) =>
    `৳${Number(price).toLocaleString("en-BD", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  if (loading) {
    return (
      <main className="min-h-screen bg-muted/30 px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <Skeleton className="mb-8 h-10 w-56" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <Skeleton key={n} className="h-[390px] rounded-2xl" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="mb-3 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Wishlist</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <Heart className="h-7 w-7 fill-rose-500 text-rose-500" />
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  My Wishlist
                </h1>
              </div>
              <p className="mt-2 text-muted-foreground">
                Your favorite products, saved for later.
              </p>
            </div>

            <Badge variant="secondary" className="rounded-full px-4 py-2">
              {items.length} {items.length === 1 ? "item" : "items"}
            </Badge>
          </div>
        </div>

        {items.length === 0 ? (
          <Card className="rounded-2xl border-dashed shadow-sm">
            <CardContent className="flex min-h-[380px] flex-col items-center justify-center px-6 text-center">
              <div className="mb-5 rounded-full bg-rose-100 p-5">
                <PackageOpen className="h-10 w-10 text-rose-500" />
              </div>

              <h2 className="text-2xl font-semibold">
                Your wishlist is empty
              </h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Save products you love and find them here whenever you need.
              </p>

              <Button asChild className="mt-6 rounded-xl">
                <Link href="/products">
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => {
              const product = item.product;
              const outOfStock = product.stock <= 0;

              return (
                <Card
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border-border/70 bg-background shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative m-3 flex h-52 items-center justify-center overflow-hidden rounded-xl bg-muted/40">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <PackageOpen className="h-12 w-12 text-muted-foreground/40" />
                    )}

                    <Badge
                      variant={outOfStock ? "destructive" : "secondary"}
                      className="absolute left-2 top-1"
                    >
                      {outOfStock ? "Out of stock" : "In stock"}
                    </Badge>

                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-3 top-3 rounded-full bg-background shadow-sm hover:bg-rose-50 hover:text-rose-600"
                      aria-label="Remove from wishlist"
                      disabled={removingId === item.productId}
                      onClick={() => removeWishlist(item.productId)}
                    >
                      {removingId === item.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
                      )}
                    </Button>
                  </div>

                  <CardContent className="px-4 pb-4 pt-1">
                    {product.manufacturer && (
                      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {product.manufacturer}
                      </p>
                    )}

                    <Link
                      href={`/products/${product.id}`}
                      className="line-clamp-2 min-h-12 font-semibold hover:text-primary"
                    >
                      {product.name}
                    </Link>

                    <p className="mt-2 text-xl font-bold">
                      {formatPrice(product.price)}
                    </p>

                    <div className="mt-4 flex gap-2">
                      <Button
                        className="flex-1 rounded-xl"
                        disabled={outOfStock}
                        onClick={() => addToCart(product.id)}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>

                      
                    </div>

                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
