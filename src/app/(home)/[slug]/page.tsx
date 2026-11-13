
import ProductList from "@/src/app/components/ProductCard";
import service from "@/src/productService/service";
import { session } from "@/src/productService/session";
import { notFound } from "next/navigation";
const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const {slug} =await params;
    
    const categories = await service.getproductbySlug(slug);
    const category = categories?.[0];
     const {data}=await session()
    if (!category) {
      notFound();
    }
    const products = category.products;
    
    return (
      <ProductList products={products} role={data.user.role}></ProductList>
    );
};

export default Page;