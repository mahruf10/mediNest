import * as React from "react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ShoppingBag } from "lucide-react"
import { authClient } from "@/src/lib/auth-client"
// import { role } from "better-auth/client"
import { userRoute } from "@/src/routes/userRoute/route"
import { adminRoute } from "@/src/routes/adminRoute/route"

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Cart",
          url: "/cart",
        },
        
      ],
    },
    
   
    {
      title: "Architecture",
      url: "#",
      items: [
        {
          title: "WishList",
          url: "/wishlist",
        },
  
      ],
    },
  ],
}
export  function AppSidebar({user, ...props }: React.ComponentProps<typeof Sidebar>) {
  // console.log(user);
  // let route=[]
  // switch(user.role){
  //   case 'USER':
  //     route=userRoute
  //     break;
  //     case 'ADMIN':
  //       route=adminRoute
  //       break;
  // }
  const route =
user.role === "ADMIN"
? adminRoute
: userRoute;
  return (
    <Sidebar {...props}>
      <SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
  {route.items.map((group) => (
    <SidebarGroup key={group.title}>
      <SidebarGroupLabel>
        {group.title}
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {group.items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                isActive={item.isActive}
                render={<a href={item.url} />}
              >
                <ShoppingBag />
                {item.title}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ))}
</SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}