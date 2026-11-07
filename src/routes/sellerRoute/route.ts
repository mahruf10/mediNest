import { allRoutes } from "../type";

export const sellerRoute: allRoutes = {
  items: [
    {
      title: "Seller Dashboard",
      url: "/",
      items: [
        {
          title: "My Product",
          url: "/myProduct",
        },
        {
          title: "Add Product",
          url: "/addProduct",
        },
        {
          title: "Orders",
          url: "/orders",
        },
        {
          title: "StockOut Products",
          url: "/stockout",
        },
      ],
    },
  ],
};
