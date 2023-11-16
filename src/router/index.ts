import { RouteRecordRaw } from "vue-router";
import TheDefaultLayout from "@layouts/TheDefaultLayout.vue";
import TheDashboardLayout from "@layouts/TheDashboardLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@pages/Home.vue"),
    meta: {
      layout: TheDefaultLayout,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@pages/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@pages/Register.vue"),
  },
  {
    path: "/order",
    name: "Order",
    component: () => import("@pages/Order.vue"),

    meta: {
      layout: TheDefaultLayout,
    },
  },
  {
    path: "/order/:_id",
    name: "Order:id",
    component: () => import("@pages/OrderDetails.vue"),
    meta: {
      layout: TheDefaultLayout,
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@pages/CartPage.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/pages/admin/Dashboard.vue"),
    meta: {
      layout: TheDashboardLayout,
    },
  },
  {
    path: "/admin/manager-product",
    name: "Admin/ManagerProduct",
    component: () => import("@/pages/admin/ManagerProduct.vue"),
    meta: {
      layout: TheDashboardLayout,
    },
  },
  {
    path: "/admin/order",
    name: "Admin/Order",
    component: () => import("@/pages/admin/Order.vue"),
    meta: {
      layout: TheDashboardLayout,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@pages/NotFound.vue"),
  },
];

export default routes;
