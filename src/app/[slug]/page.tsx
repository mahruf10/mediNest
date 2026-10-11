import service, { Product } from "@/src/productService/service";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
const page = async({params}:{ params: Promise<{ slug: string }> }) => {
    const {slug} =await params;
    const product=await service.getproductbySlug(slug);
    
    const products=product[0].products
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 mt-20">
          {
            products.map((product:Product)=>(
                
          <Card key={product.id} className="relative  w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={product.imageUrl}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover "
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{product.manufacturer}</Badge>
        </CardAction>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">Buy Now</Button>
      </CardFooter>
    </Card>
          ) )
          }
        </div>
    );
};

export default page;