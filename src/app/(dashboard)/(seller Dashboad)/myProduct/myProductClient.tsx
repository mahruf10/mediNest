
"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { SquarePen, Trash } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { service } from '@/src/app/components/sellerComp/seller.service';
import Link from 'next/link';
// import { Props } from '../../../components/ProductCard';

const MyProductClient = ({ products }) => {
   
console.log(products);

    const handleDelete = async(id: number) => {
    
     const res=await service.deleteProduct(id)
     console.log(res);
     if(res.success){
        alert('done')
     }
    }
    return (
        <div className="mt-20 grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.data?.map((product) => (
                <Card
                    key={product.id}
                    className="relative w-full max-w-sm overflow-hidden pt-0"
                >
                    <img
                        src={typeof product.imageUrl === "string" ? product.imageUrl : product.imageUrl.src}
                        alt={product.name}
                        className="aspect-video w-full object-cover"
                    />


                    <Button
                        className="absolute right-4 top-4 z-10 flex size-12 items-center justify-center rounded-full bg-white shadow-md"
                        onClick={() => handleDelete(product.id)}
                    >
                        <Trash color="#b0251c" />

                    </Button>

             <Link href={`/update/${product.id}` }> 
              <button
                        type="button"
                     
                        className="absolute left-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white shadow-md"
                      
                    >
                        <SquarePen color="#1f5132" />
                    </button>
             </Link>
                   

                    <CardHeader>
                        <CardTitle>{product.name}</CardTitle>
                        <div className="flex  gap-30">
                            <p>${product.price}</p>
                            <p>Stock:{product.stock}</p>
                        </div>

                    </CardHeader>
                </Card>
            ))}
        </div>
    );
};

export default MyProductClient;