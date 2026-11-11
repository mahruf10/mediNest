import { allRoutes } from "../type";

export const AdminRoute: allRoutes = {
  items: [
    {
      title: "Admin Dashboard",
      url: "/",
      items: [
        {
          title: "Users",
          url: "/allUsers",
        },
        {
          title: "All Orders",
          url: "/allorders",
        },
        {
          title: "Categories",
          url: "/categories",
        },
      ],
    },
  ],
};
