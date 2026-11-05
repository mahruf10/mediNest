const Service={
    postOrders:async(OrderInfo:any)=>{
  try {
    const res=await fetch('http://localhost:5000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(OrderInfo)
    })
    const data=await res.json()
    console.log(data);
    if(!data.success){
        return {success:false,error:data.message.name}
    }
    return data
  } catch (error) {

    console.log(error);
    return {success:false,error:error}
  }
    },
    getOrders:async(id)=>{
  try {
    const res=await fetch(`http://localhost:5000/orders/${id}`)
    const data=await res.json()
    return data
  } catch (error) {
    console.log(error);
  }
    }
}
export default Service