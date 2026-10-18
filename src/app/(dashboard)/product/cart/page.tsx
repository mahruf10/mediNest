
"use client";
import Link from "next/link";
import {
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  ArrowRight,
  Tag,
  Truck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import service from "@/src/productService/service";

type Product = {
  id: number;
  name: string;
  description: string | null;
  price: string;
  stock: number;
  imageUrl: string | null;
  manufacturer: string | null;
  categoryId: number;
};

type CartItem = {
  id: number;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
};

const formatPrice = (value: number) =>
  `৳${value.toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export default function CartPage() {
  
  const [cartItems,setCartItem]= useState<CartItem[]>([])
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    fetch('http://localhost:5000/cart')
    .then(res=>res.json())
    .then(data=>{
      setCartItem(data.data)
      setLoading(false)
    })
},[])
  const items = cartItems;
 
const totalItems = items.reduce(
  (sum, item) => sum + Number(item.quantity),
  0
);
  const subtotal = items.reduce(
    (sum, item) =>
      sum + Number(item.product.price) * item.quantity,
    0
  );

  const hasOutOfStock = items.some(
    (item) => item.product.stock <= 0
  );

if(loading){
  return <CartSkeleton></CartSkeleton>
}

const increaseQuantity = (itemId: number) => {
  setCartItem((prev) =>
    prev.map((item) =>
      item.id === itemId &&
      item.quantity < item.product.stock
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

const decreaseQuantity = (itemId: number) => {
  setCartItem((prev) =>
    prev.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  );
};
const handleDelete=async(id:number)=>{
const result=await service.deleteCartData(id)
console.log(result);

    if (result) {
      setCartItem((prev) =>
        prev.filter((item) => item.id !== id)
      );

      alert("Item deleted successfully");
    }
}
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-muted/30 px-4 py-16 sm:py-24">
        <div className="mx-auto flex max-w-lg flex-col items-center rounded-2xl border bg-background px-6 py-12 text-center shadow-sm sm:px-10">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <ShoppingCart className="h-9 w-9 text-primary" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            Your cart is empty
          </h1>

          <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
            Looks like you haven't added anything to your cart yet.
            Explore our collection and find something you love.
          </p>

          <Button asChild className="mt-7 rounded-xl">
            <Link href="/products">
              Explore Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Page heading */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Shopping Cart</span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Shopping Cart
              </h1>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Review your items before checking out.
              </p>
            </div>

            <Badge variant="secondary" className="rounded-full px-4 py-2">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </Badge>
          </div>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-3">
          {/* Cart items */}
          <section className="space-y-4 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Cart Items
              </h2>
              <span className="text-sm text-muted-foreground">
                {items.length} products
              </span>
            </div>

            {items.map((item) => {
              const product = item.product;
              const unitPrice = Number(product.price);
              const outOfStock = product.stock <= 0;

              return (
                <Card
                  key={item.id}
                  className="overflow-hidden rounded-2xl border-border/70 shadow-sm transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex flex-col gap-4 sm:flex-row">
                      {/* Product image */}
                      <Link
                        href={`/products/${product.id}`}
                        className="group relative flex h-40 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-muted/50 sm:h-36 sm:w-36"
                      >
                        {product.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <ShoppingCart className="h-12 w-12 text-muted-foreground/40" />
                        )}
                      </Link>

                      {/* Product details */}
                      <div className="flex min-w-0 flex-1 flex-col justify-between gap-5">
                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              {product.manufacturer && (
                                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                  {product.manufacturer}
                                </p>
                              )}

                              <Link
                                href={`/products/${product.id}`}
                                className="line-clamp-2 font-semibold leading-6 transition-colors hover:text-primary"
                              >
                                {product.name}
                              </Link>
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 shrink-0 rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                              aria-label={`Remove ${product.name}`}
                              onClick={()=>handleDelete(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          {product.description && (
                            <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted-foreground">
                              {product.description}
                            </p>
                          )}

                          {outOfStock && (
                            <Badge
                              variant="destructive"
                              className="mt-3"
                            >
                              Out of stock
                            </Badge>
                          )}
                        </div>

                        <div className="flex flex-wrap items-end justify-between gap-4">
                          {/* Quantity selector UI */}
                          <div>
                            <p className="mb-2 text-xs text-muted-foreground">
                              Quantity
                            </p>

                            <div className="flex h-10 items-center rounded-xl border bg-background">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 rounded-r-none"
                                aria-label="Decrease quantity"
                                onClick={()=>decreaseQuantity(item.id)}
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </Button>

                              <span className="min-w-9 text-center text-sm font-semibold">
                                {item.quantity}
                              </span>

                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 rounded-l-none"
                                onClick={()=>increaseQuantity(item.id)}
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>

                          {/* Product price */}
                          <div className="text-right">
                            <p className="text-lg font-bold">
                              {formatPrice(unitPrice * item.quantity)}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                              {formatPrice(unitPrice)} per item
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            <Button
              asChild
              variant="outline"
              className="rounded-xl w-32 h-12 bg-black text-white"
            >
              <Link href="/diabetic">
                <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                Continue Shopping
              </Link>
            </Button>
          </section>

          {/* Order summary */}
          <aside className="lg:sticky lg:top-6">
            <Card className="overflow-hidden rounded-2xl border-border/70 shadow-sm">
              <CardHeader className="border-b bg-background px-5 py-5">
                <CardTitle className="text-xl">
                  Order Summary
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Review your order details.
                </p>
              </CardHeader>

              <CardContent className="space-y-5 p-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Subtotal ({totalItems} items)
                  </span>
                  <span className="font-medium">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Truck className="h-4 w-4" />
                    Shipping
                  </span>
                  <span className="text-right text-xs text-muted-foreground">
                    Calculated at checkout
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Tag className="h-4 w-4" />
                    Discount
                  </span>
                  <span className="font-medium">৳0.00</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-2xl font-bold tracking-tight">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <p className="text-xs leading-5 text-muted-foreground">
                  Taxes and shipping charges will be confirmed during
                  checkout.
                </p>

                <Button
                  className="h-12 w-full rounded-xl text-base font-semibold"
                  size="lg"
                  disabled={hasOutOfStock}
                  asChild={!hasOutOfStock}
                >
                  {hasOutOfStock ? (
                    <span>Proceed to Checkout</span>
                  ) : (
                    <Link href="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  )}
                </Button>

                {hasOutOfStock && (
                  <p className="text-xs text-destructive">
                    Remove out-of-stock products to continue.
                  </p>
                )}

            
              </CardContent>
            </Card>

            
          </aside>
        </div>
      </div>
    </main>
  );
}
function CartSkeleton() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <Skeleton className="mb-6 h-8 w-48" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {[0, 1].map((i) => (
            <Skeleton key={i} className="h-36 w-full" />
          ))}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}
