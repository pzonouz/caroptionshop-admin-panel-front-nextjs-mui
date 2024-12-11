import CartIcon from "@mui/icons-material/ShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TvIcon from "@mui/icons-material/Tv";
import SettingsIcon from "@mui/icons-material/Settings";
import UserIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

const menuList = [
  {
    id: "dashboard",
    title: "داشبورد",
    type: "item",
    icon: DashboardIcon,
  },
  {
    id: "live",
    title: "مشاهده سایت",
    type: "item",
    icon: TvIcon,
  },
  {
    id: "settings",
    title: "تنظیمات سایت",
    type: "group",
    icon: SettingsIcon,
    children: [
      {
        id: "main-site-setting",
        title: "تنظیمات اصلی",
        type: "item",
      },
    ],
  },
  {
    id: "users",
    title: "مدیریت کاربران",
    type: "item",
    icon: UserIcon,
  },
  {
    id: "products-categories",
    title: "محصولات فروشگاه",
    type: "group",
    icon: CartIcon,
    children: [
      {
        id: "categories",
        title: "دسته بندی",
        type: "item",
        icon: CategoryIcon,
      },
      {
        id: "products",
        title: "محصولات",
        type: "item",
        icon: ShoppingBasketIcon,
      },
    ],
  },
];
export type MenuListType = typeof menuList;
export { menuList };
