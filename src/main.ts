import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import routers from "./router";
import "./style.css";
import Antd from "ant-design-vue";

import VueSweetalert2 from "vue-sweetalert2";

import "sweetalert2/dist/sweetalert2.min.css";
import "ant-design-vue/dist/reset.css";
import { createPinia } from "pinia";

import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

const pinia = createPinia();
const router = createRouter({
  history: createWebHistory(),
  routes: routers,
});

const app = createApp(App);

const options: PluginOptions = {};

app.use(Toast, options);
app.use(pinia);
app.use(VueSweetalert2);
app.use(router);
app.use(Antd);

app.mount("#app");
