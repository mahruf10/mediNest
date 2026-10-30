"use client"
import { toast } from '@/components/ui/toast';
import service from '@/src/productService/service';
import { Heart } from 'lucide-react';
const NewarrivalWishlist = ({productId}) => {

   const handleWishlist = async (productId: number) => {
  try {
    const result = await service.postWishlist(productId);

    if (result.success) {
     toast.add({
        type:'success',
        title:'wishlist saved successfully'
     })
    }
  } catch (error) {
    if (error instanceof Error) {
      toast.add({
        type:'error',
        title:error.message
     })
    } else {
     toast.add({
        type:'error',
        title:'Something went wrong.please try again.....'
     })
    }
  }
};
    return (
           <button
            type="button"
            onClick={() => handleWishlist((productId))}
            className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white shadow-md"
            aria-label="Add to wishlist"
          >
            <Heart className="size-4" />
          </button>
    );
};

export default NewarrivalWishlist;