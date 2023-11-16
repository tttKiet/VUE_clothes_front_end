<template>
  <a-layout v-if="user.role == 'admin'">
    <a-layout-header class="header">
      <div class="container mx-auto text-white">
        <div class="flex items-center justify-between">
          <div>
            <span>Xin chào!</span>
            <span class="text-pink-500 font-semibold mx-2">
              {{ user?.role }}</span
            >
          </div>
          <div>
            <Popover class="relative">
              <PopoverButton
                class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
              >
                <span
                  href="#"
                  class="-mx-3 flex items-center gap-2 rounded-lg px-3 text-sm font-semibold leading-7 text-gray-900"
                  >Xin chào
                  <span class="text-pink-500">{{ user.ho_ten_KH }}!</span>
                  <img
                    class="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </span>
              </PopoverButton>

              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-1"
              >
                <PopoverPanel
                  class="absolute pt-1 text-base right-0 top-full z-10 mt-3 w-screen max-w-[240px] overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
                >
                  <!-- text-gray-900 -->
                  <div class="p-1 px-3">
                    <div
                      class="group relative text-red-500 flex items-center gap-x-4 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div class="flex w-5 h-5 justify-center rounded-lg">
                        <PowerIcon class="" />
                      </div>
                      <div class="flex-auto">
                        <button
                          class="block font-semibold"
                          @click="handleClickLogout"
                        >
                          Đăng xuất
                          <span class="absolute inset-0" />
                        </button>
                      </div>
                    </div>
                  </div>
                </PopoverPanel>
              </transition>
            </Popover>
          </div>
        </div>
      </div>
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
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-red-500">Bạn không có quyền truy cập vào trang này!</div>
  </div>
  <Modal
    :open="open"
    title="Bạn muốn đăng xuất?"
    :toggle-show-modal="toggleShowModal"
    text-cancel="Hủy"
    text-submit="Đồng ý"
    :handle-click-ok="handleClickLogoutOk"
  >
    <template #body>
      <p class="text-gray-600">Bạn sẽ đăng xuất khỏi hệ thống.</p>
    </template>
  </Modal>
</template>
<script lang="ts" setup>
import Footer from "@/components/Footer.vue";
import Breadcrumb, { IBreadcrumb } from "@/components/common/Breadcrumbs.vue";
import { useAuth } from "@/hook/use-auth";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import Modal from "@/components/modal/Modal.vue";

import {
  ListBulletIcon,
  PlusIcon,
  ShoppingBagIcon,
} from "@heroicons/vue/24/solid";
import { ref } from "vue";

import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";

const open = ref(false);
const { user, logout } = useAuth();
const router = useRouter();

function toggleShowModal() {
  open.value = !open.value;
}

async function handleClickLogoutOk() {
  const role = user.value.role;

  await logout();
  if (role === "admin") {
    router.push("/");
  }

  toggleShowModal();
}
async function handleClickLogout() {
  toggleShowModal();
}
const breadcrumbs: IBreadcrumb[] = [
  {
    name: "Dash board",
    href: "/admin",
  },
];
const url = computed(() => router.currentRoute.value.fullPath);
</script>