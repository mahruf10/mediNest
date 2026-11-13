import adminService from '@/src/app/components/adminComp/admin.service';
import AdminOrderTable from '@/src/app/components/adminComp/adminOrdertable';
import { cookies } from 'next/headers';

import React from 'react';
const AllOrders = async() => {
    const cookieStore=(await cookies()).toString()
    const orders=await adminService.getOrders(cookieStore)
    console.log(orders);
    return (
        <div>
            <AdminOrderTable orders={orders.data}></AdminOrderTable>
        </div>
    );
};

export default AllOrders;