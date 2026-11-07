
import { cookies } from 'next/headers';
import { service } from '@/src/app/components/sellerComp/seller.service';
import { session } from '@/src/productService/session';
import MyProductClient from './myProductClient';

const MyProductPage = async() => {
    const {data}=await session()
    const sellerId=data?.user?.id
    if (!sellerId) {
        throw new Error('Cannot fetch seller products without an authenticated seller.')
    }
    const cookieHeader=(await cookies()).toString()
    const products=await service.getSellerProduct(sellerId,cookieHeader)
   
    return (
        <div>
           <MyProductClient products={products}></MyProductClient>
        </div>
    );
};

export default MyProductPage;