import CategoryManager from '@/src/app/components/adminComp/CategoryManage';
import { cookies } from 'next/headers';
import React from 'react';

const AdminCategory = async() => {
     const cookieHeader = (await cookies()).toString()

  const data = await fetch("https://medi-nest-server-ten.vercel.app/category", {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  })
  const category=await data.json()
    return (
        <div>
            <CategoryManager categories={category.data}></CategoryManager>
        </div>
    );
};

export default AdminCategory;