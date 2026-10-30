import React from 'react';
import MediStoreFooter from '../components/medistore-footer';

const layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div>
            {children}
            <MediStoreFooter className='h-xl'></MediStoreFooter>
        </div>
    );
};

export default layout;