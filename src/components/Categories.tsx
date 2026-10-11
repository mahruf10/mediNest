

import Category from "@/lib/category";
import Link from "next/link";
// import { useEffect,useState } from "react";

const Categories = async () => {
   const response = await fetch(
    'http://localhost:5000/category',
    {
      cache: "no-store",
    }
  );
  const categories= await response.json();

    return (
        <div >
            <h1 className="text-4xl font-bold my-10 text-center underline">Our Categories</h1>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {categories.data.map((category:Category) => (
                <div
                    key={category.id}
                    className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-200 cursor-pointer"
                >
                   <Link href={`/${category.slug}`}>
                        <h2 className="text-lg font-semibold text-gray-800 text-center">
                            {category.name}
                        </h2>
                    </Link>
                </div>
            ))}
        </div>   
        </div>
    
    );
};

export default Categories;
