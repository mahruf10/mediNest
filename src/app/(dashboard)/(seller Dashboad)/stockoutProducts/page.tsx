import ProductList from '@/src/app/components/ProductCard';
import { service } from '@/src/app/components/sellerComp/seller.service';
import { session } from '@/src/productService/session';
import { cookies } from 'next/headers';
import React from 'react';

const StockOutProductPage = async() => {
    const {data}=await session()
       const sellerId=data?.user?.id
       if (!sellerId) {
           throw new Error('Cannot fetch seller products without an authenticated seller.')
       }
       const cookieHeader=(await cookies()).toString()
       const checkStockOut=true
       const products=await service.getSellerProduct(sellerId,checkStockOut,cookieHeader)
      //(products.data);
    return (
        <div>
            <ProductList products={products.data} role={data.user.role}></ProductList>
        </div>
    );
};

export default StockOutProductPage;