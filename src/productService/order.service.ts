import { orderInfo } from "../app/(dashboard)/product/cart/page"

const Service={
    postOrders:async(OrderInfo:orderInfo)=>{
  try {
    const res=await fetch('https://medi-nest-server-ten.vercel.app/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(OrderInfo)
    })
    const data=await res.json()
   //console.log(data);
    if(!data.success){
        return {success:false,error:data.message.name}
    }
    return data
  } catch (error) {

   //console.log(error);
    return {success:false,error:error}
  }
    },
    getOrders:async(id:string)=>{
  try {
    const res=await fetch(`https://medi-nest-server-ten.vercel.app/orders/${id}`)
    const data=await res.json()
    return data
  } catch (error) {
    //console.log(error);
  }
    },
    getSellerOrders:async(id:string)=>{
  try {
    const res=await fetch(`https://medi-nest-server-ten.vercel.app/orders/sellerOrder/${id}`)
    const data=await res.json()
    return data
  } catch (error) {
   // console.log(error);
  }
    }
}
export default Service