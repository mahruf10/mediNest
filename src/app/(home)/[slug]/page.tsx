
import ProductList from "@/src/app/components/ProductCard";
import service from "@/src/productService/service";


const page = async({params}:{ params: Promise<{ slug: string }> }) => {
    const {slug} =await params;
    const product=await service.getproductbySlug(slug);
    
    const products=product[0].products
    console.log(products);
 
    return (
      <ProductList products={products}></ProductList>
    );
};

export default page;