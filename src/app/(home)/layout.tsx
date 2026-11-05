import React from 'react';
import Navbar from '../components/navbar';
import MediStoreFooter from '../components/medistore-footer';
import { session } from '@/src/productService/session';

const HomeLayout = async({children}: {children: React.ReactNode}) => {
    const {data}=await session()
    console.log(data.user)
    return (
        <div>
            <Navbar user={data.user}></Navbar>
            {children}
            <MediStoreFooter></MediStoreFooter>
        </div>
    );
};

export default HomeLayout;