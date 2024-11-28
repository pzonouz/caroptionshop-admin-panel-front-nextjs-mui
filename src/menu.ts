import DashboardIcon from "@mui/icons-material/Dashboard";

const menuList = [
  {
    id: "dashboard",
    title: "محصولات فروشگاه",
    type: "group",
    icon: DashboardIcon,
    children: [
      {
        id: "categories",
        title: "دسته بندی",
        type: "group",
        url: "/",
        icon: DashboardIcon,
        children: [
          {
            id: "categories-sub",
            title: "ایجاد دسته بندی",
            type: "item",
            url: "/",
            icon: DashboardIcon,
          },
          {
            id: "products",
            title: "لیست محصولات",
            type: "item",
            url: "/products",
            icon: DashboardIcon,
          },
        ],
      },
      {
        id: "categories-2",
        title: "دسته بندی-2",
        type: "group",
        url: "/",
        icon: DashboardIcon,
        children: [
          {
            id: "categories-sub",
            title: "ایجاد دسته بندی",
            type: "item",
            url: "/",
            icon: DashboardIcon,
          },
          {
            id: "products",
            title: "لیست محصولات",
            type: "item",
            url: "/products",
            icon: DashboardIcon,
          },
        ],
      },
    ],
  },
];
export type MenuListType = typeof menuList;
export { menuList };
