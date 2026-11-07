import UpdateProduct from "@/src/app/components/sellerComp/updateProduct";

const UpdateProductPage = async ({
  params,
}: {
  params: Promise<{ updateProductId: string }>;
}) => {
  const { updateProductId } = await params;

  return (
    <div>
     <UpdateProduct id={updateProductId}></UpdateProduct>
    </div>
  );
};

export default UpdateProductPage;