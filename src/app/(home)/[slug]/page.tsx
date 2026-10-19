
import ProductList from "@/src/app/components/ProductCard";
import service from "@/src/productService/service";
const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const {slug} =await params;
    let products = [];
    try {
      const product=await service.getproductbySlug(slug);
      products = product[0]?.products ?? [];
    } catch (error) {
      products = [];
    }
    
 
    return (
      <ProductList products={products}></ProductList>
    );
};

export default Page;