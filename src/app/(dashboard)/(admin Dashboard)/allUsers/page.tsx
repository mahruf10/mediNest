import adminService from '@/src/app/components/adminComp/admin.service';
import UserTable from '@/src/app/components/adminComp/userTable';
import { cookies } from 'next/headers';
import React from 'react';

const AllUsersPage = async() => {
    const cookieHeader=(await cookies()).toString()
    const users=await adminService.getUser(cookieHeader)
    // console.log(users);
    return (
        <div>
          <UserTable data={users.data} />
        </div>
    );
};

export default AllUsersPage;