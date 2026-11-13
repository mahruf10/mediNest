
const adminService={
    getUser:async(cookie:string)=>{
        try {
             const res=await fetch('http://localhost:5000/users',{
                method:'GET',
                headers:{
                    cookie
                }
             })
             //console.log(res);
  if(!res.ok){
     throw new Error('could not find users')
  }
  const users=await res.json()
  return users
        } catch (error) {
            //console.log(error);
            throw error
        }
 
    },
    getOrders:async(cookie:string)=>{
        try {
             const res=await fetch('http://localhost:5000/users/allorders',{
                method:'GET',
                headers:{
                    cookie
                }
             })
             //console.log(res);
  if(!res.ok){
     throw new Error('could not find orders')
  }
  const orders=await res.json()
  return orders
        } catch (error) {
            //console.log(error);
            throw error
        }
 
    },

    updateUserRole:async(id:string,role:string,cookie:string)=>{
        //  const cookieHeader = (await cookies()).toString()
        try {
              const res=await fetch(`http://localhost:5000/users/${id}`,{
            method:'PATCH',
            headers:{
                'content-type':'application/json',
                cookie:cookie
            },
            body:JSON.stringify({role})

        }
      
       
    )
      //console.log(res);
     if(!res.ok){
    const body = await res.text() // read the backend's own error message
    console.error("updateUserRole failed:", res.status, body)
    throw new Error(`Update failed (${res.status}): ${body}`)
  }
  const data=await res.json()
    return data
        } 
        catch (error) {
            //console.log(error);
            throw error
        }
      
    }
}
export default adminService