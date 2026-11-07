import { allRoutes } from "../type";

export const AdminRoute: allRoutes = {
  items: [
    {
      title: "Admin Dashboard",
      url: "/",
      items: [
        {
          title: "Add Users",
          url: "/product/users",
        },
        {
          title: "All Orders",
          url: "/product/allorders",
        },
        {
          title: "Categories",
          url: "/product/categories",
        },
      ],
    },
  ],
};
