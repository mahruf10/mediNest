import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { session } from './productService/session'

export async function proxy(request: NextRequest) {
    const pathname=request.nextUrl.pathname
  let isAuthenticated=false
  let isAdmin=false
  const{data}=await session()
  if(data){
  isAuthenticated=true
  isAdmin=data.user.role==='ADMIN'
}

if(!isAuthenticated) {
  return NextResponse.redirect(new URL("/login", request.url))
}
//  if(isAdmin && pathname.startsWith('/userDashboard')){
//     return NextResponse.redirect(new URL('/adminDashboard',request.url))
//   }
//   if(!isAdmin && pathname.startsWith('/adminDashboard')){
//     return NextResponse.redirect(new URL('/dashboard',request.url))
//   }
return NextResponse.next()
}
export const config = {
  matcher: ['/dashboard','/adminDashboard','/adminDashboard/:path*','/dashboard/:path*','/account','/cart','/wishlist'],
}