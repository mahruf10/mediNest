
import service from '@/src/productService/service';
import React from 'react';
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

import { Card, CardContent} from "@/components/ui/card"
import { Heart } from 'lucide-react';
import NewarrivalWishlist from './NewarrivalWishlist';
const NewArrival = async() => {
    const categories=await service.getAllProduct()
      const allProducts = categories.flatMap(
        (category) => category.products
    );
    // console.log(allProducts);
        const latestProducts = allProducts
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        )
        .slice(0, 10);

    // console.log(latestProducts);
 
   return (
     <main className="container mx-auto px-4 py-8">
        <div className='text-center my-5'>
            <h1 className="mb-2 text-3xl font-bold">New Arrivals</h1>
            <p className='text-gray-500 ml-3'> Grave your favourite One....</p>
        </div>
       
 
       <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
         {latestProducts.map((p) => (
           <div key={p.id}>
             <Card className="relative overflow-hidden">
               <div className="relative aspect-[4/5] bg-muted">
       
                 <Image
                   src={p.imageUrl  || "/placeholder.png"}
                   alt={p.name}
                   fill
                   sizes="(max-width: 768px) 50vw, 25vw"
                   className="object-cover"
                 />
                {/* <button
            type="button"
            // onClick={() => handleWishlist((product.id))}
            className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white shadow-md"
            aria-label="Add to wishlist"
          >
            <Heart className="size-4" />
          </button> */}

          <NewarrivalWishlist productId={p.id}></NewarrivalWishlist>

                 <Badge className="absolute left-2 top-2">New</Badge>
               </div>
               <CardContent className="p-4">
                 <h2 className="font-medium">{p.name}</h2>
                 <p className="text-sm text-muted-foreground">৳{p.price.toLocaleString("en-US")}</p>
               </CardContent>
             </Card>
           </div>
         ))}
       </div>
     </main>
   )
};

export default NewArrival;