import { allRoutes, } from "../type";

export const userRoute: allRoutes = {
  items: [
    {
      title: "User Dashboard",
      url: "/",
      items: [
        {
          title: "Cart",
          url: "/product/cart",
        },
        {
          title: "Wishlist",
          url: "/product/wishlist",
        },
        
      ],
    },
  ],
};
