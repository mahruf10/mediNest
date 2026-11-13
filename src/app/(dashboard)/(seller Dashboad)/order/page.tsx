import Service from "@/src/productService/order.service"
import { SellerOrderItemsTable } from "../../../components/sellerComp/ordertable"
import { session } from "@/src/productService/session"

// const data: SellerOrderItem[] = 


export default async function SellerOrderPage() {
  const {data}=await session()
  //console.log(data.user.id);
  const orders=await Service.getSellerOrders(data.user.id)
 // console.log(orders);
  return (
    <div>
      <SellerOrderItemsTable data={orders.data} />
    </div>
  )
}