<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo" />
      sads
    </a-layout-header>
    <div class="min-h-[80vh] pb-20">
      <div class="container mx-auto">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>

        <a-layout
          style="padding: 24px 0; background: #fff"
          class="rounded-2xl shadow-xl"
        >
          <a-layout-sider class="pl-5" width="280" style="background: #fff">
            <a-menu
              class="pr-5"
              :selectedKeys="[url]"
              mode="inline"
              style="height: 100%"
            >
              <a-menu-item key="/admin" active>
                <router-link to="/admin">
                  <span class="flex items-center gap-2 justify-start">
                    <ListBulletIcon class="w-5 h-5" /> Danh sách hàng hóa
                  </span></router-link
                >
              </a-menu-item>
              <a-menu-item key="/admin/manager-product">
                <router-link to="/admin/manager-product">
                  <span class="flex items-center gap-2 justify-start">
                    <PlusIcon class="w-5 h-5" /> Thêm hàng hóa
                  </span></router-link
                >
              </a-menu-item>
              <a-menu-item key="/admin/order">
                <router-link to="/admin/order">
                  <span class="flex items-center gap-2 justify-start">
                    <ShoppingBagIcon class="w-5 h-5" /> Order
                  </span></router-link
                >
              </a-menu-item>
            </a-menu>
          </a-layout-sider>
          <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
            <slot />
          </a-layout-content>
        </a-layout>
      </div>
    </div>
    <Footer></Footer>
  </a-layout>
</template>
<script lang="ts" setup>
import Footer from "@/components/Footer.vue";
import {
  PlusIcon,
  ListBulletIcon,
  ShoppingBagIcon,
} from "@heroicons/vue/24/solid";
import Breadcrumb, { IBreadcrumb } from "@/components/common/Breadcrumbs.vue";
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
const router = useRouter();
const breadcrumbs: IBreadcrumb[] = [
  {
    name: "Dash board",
    href: "/admin",
  },
];
const url = computed(() => router.currentRoute.value.fullPath);
</script>
<style scoped>
#components-layout-demo-top-side .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>