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
    path: "/about",
    name: "About",
    component: () => import("@components/About.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@pages/NotFound.vue"),
  },
];

export default routes;
