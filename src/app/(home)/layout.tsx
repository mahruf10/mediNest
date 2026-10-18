import React from 'react';
import Navbar from '../components/navbar';

const HomeLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div>
            <Navbar></Navbar>
            {children}
        </div>
    );
};

export default HomeLayout;