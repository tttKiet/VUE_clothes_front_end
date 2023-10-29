import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import routers from "./router";
import "./style.css";

const router = createRouter({
  history: createWebHistory(),
  routes: routers,
});

const app = createApp(App);
app.use(router);

app.mount("#app");
