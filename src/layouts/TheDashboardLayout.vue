<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo" />
      sads
    </a-layout-header>
    <div class="min-h-[80vh]">
      <div class="container mx-auto">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>

        <a-layout style="padding: 24px 0; background: #fff">
          <a-layout-sider width="200" style="background: #fff">
            <a-menu openKeys="1" mode="inline" style="height: 100%">
              <a-menu-item key="2">
                <router-link to="/admin">
                  <span> Danh sách hàng hóa </span>
                </router-link>
              </a-menu-item>
              <a-menu-item key="1">
                <router-link to="/admin/manager-product"
                  ><span> Thêm hàng hóa </span></router-link
                >
              </a-menu-item>
              <a-menu-item key="3">
                <router-link to="/admin/order">
                  <span> Order </span></router-link
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
import Breadcrumb, { IBreadcrumb } from "@/components/common/Breadcrumbs.vue";
const breadcrumbs: IBreadcrumb[] = [
  {
    name: "Dash board",
    href: "/admin",
  },
];
</script>
<!-- <style scoped>
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
</style> -->