
import ProductList from "@/src/app/components/ProductCard";
import service from "@/src/productService/service";
import { notFound } from "next/navigation";
const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const {slug} =await params;
    
    const categories = await service.getproductbySlug(slug);
    const category = categories?.[0];
   
    if (!category) {
      notFound();
    }
    const products = category.products;
    
    return (
      <ProductList products={products}></ProductList>
    );
};

export default Page;