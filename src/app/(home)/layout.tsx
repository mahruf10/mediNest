import React from 'react';
import Navbar from '../components/navbar';
import MediStoreFooter from '../components/medistore-footer';

const HomeLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div>
            <Navbar></Navbar>
            {children}
            <MediStoreFooter></MediStoreFooter>
        </div>
    );
};

export default HomeLayout;