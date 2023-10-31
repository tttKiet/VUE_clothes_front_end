import { RouteRecordRaw } from "vue-router";
import TheDefaultLayout from "@layouts/TheDefaultLayout.vue";
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
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@pages/NotFound.vue"),
  },
];

export default routes;
