import Login from "../pages/Login";
import index from "../pages/admin/dashboard";
import List from "../pages/admin/products/List";
import Edit from "../pages/admin/products/Edit";
import PageNotFound from "../pages/PageNotFound";
import Notices from "../pages/admin/notices/Index";

export const mainRoutes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/404",
    component: PageNotFound,
  },
];

export const adminRoutes = [
  {
    path: "/admin/dashboard",
    component: index,
    isShow: true,
    title: "看板",
    icon: "AreaChartOutlined",
  },
  {
    path: "/admin/products",
    component: List,
    exact: true,
    isShow: true,
    title: "商品管理",
    icon: "ShopOutlined",
  },
  {
    path: "/admin/products/edit/:id?",
    component: Edit,
    isShow: false,
  },
  {
    path: "/admin/notices",
    component: Notices,
    isShow: false,
  },
];
