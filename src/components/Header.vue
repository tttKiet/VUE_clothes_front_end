<template>
  <header class="bg-white sticky top-0 z-50">
    <div class="shadow border-b">
      <nav
        class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div class="flex lg:flex-1">
          <router-link to="/" class="-m-1.5 p-1.5">
            <span class="sr-only">Clothes</span>
            <img class="h-8 w-auto" :src="logo" alt="Logo" />
          </router-link>
        </div>
        <div class="flex lg:hidden">
          <button
            type="button"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = true"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <PopoverGroup class="hidden lg:flex lg:gap-x-12">
          <Popover class="relative">
            <PopoverButton
              class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
            >
              Hàng hóa
              <ChevronDownIcon
                class="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
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
                class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
              >
                <div class="p-4">
                  <div
                    v-for="item in products"
                    :key="item.name"
                    class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                  >
                    <div
                      class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
                    >
                      <component
                        :is="item.icon"
                        class="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div class="flex-auto">
                      <a
                        :href="item.href"
                        class="block font-semibold text-gray-900"
                      >
                        {{ item.name }}
                        <span class="absolute inset-0" />
                      </a>
                      <p class="mt-1 text-gray-600">{{ item.description }}</p>
                    </div>
                  </div>
                </div>
                <div
                  class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50"
                >
                  <a
                    v-for="item in callsToAction"
                    :key="item.name"
                    :href="item.href"
                    class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                  >
                    <component
                      :is="item.icon"
                      class="h-5 w-5 flex-none text-gray-400"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </a>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>

          <a href="#" class="text-sm font-semibold leading-6 text-gray-900"
            >Chức năng</a
          >
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900"
            >Chợ</a
          >
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900"
            >Công ty</a
          >
        </PopoverGroup>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <router-link
            v-if="!user._id"
            to="/login"
            class="text-sm font-semibold leading-6 text-gray-900"
          >
            Đăng nhập <span aria-hidden="true">&rarr;</span>
          </router-link>
          <div v-else class="">
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

                <a-divider type="vertical" />

                <CartShoppingBadge :total-cart="totalCart" />
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
                      class="group relative flex items-center gap-x-4 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div class="flex w-5 h-5 justify-center rounded-lg">
                        <CheckBadgeIcon class="" />
                      </div>

                      <router-link to="/order" class="flex-auto">
                        <button class="block font-semibold">
                          Order của bạn
                          <span class="absolute inset-0" />
                        </button>
                      </router-link>
                    </div>
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
                  <div
                    class="text-sm flex items-center justify-center text-center px-4 py-1 bg-gray-50"
                  >
                    * * *
                  </div>
                </PopoverPanel>
              </transition>
            </Popover>
          </div>
        </div>
      </nav>
      <Dialog
        as="div"
        class="lg:hidden"
        @close="mobileMenuOpen = false"
        :open="mobileMenuOpen"
      >
        <div class="fixed inset-0 z-10" />
        <DialogPanel
          class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
        >
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Clothes</span>
              <img
                class="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              class="-m-2.5 rounded-md p-2.5 text-gray-700"
              @click="mobileMenuOpen = false"
            >
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <Disclosure as="div" class="-mx-3" v-slot="{ open }">
                  <DisclosureButton
                    class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Sản phẩm
                    <ChevronDownIcon
                      :class="[open ? 'rotate-180' : '', 'h-5 w-5 flex-none']"
                      aria-hidden="true"
                    />
                  </DisclosureButton>
                  <DisclosurePanel class="mt-2 space-y-2">
                    <DisclosureButton
                      v-for="item in [...products, ...callsToAction]"
                      :key="item.name"
                      as="a"
                      :href="item.href"
                      class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >{{ item.name }}</DisclosureButton
                    >
                  </DisclosurePanel>
                </Disclosure>
                <a
                  href="#"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >Chức năng</a
                >
                <a
                  href="#"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >Chợ</a
                >
                <a
                  href="#"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >Công ty</a
                >
              </div>
              <div v-if="!user._id" class="py-6">
                <a
                  href="#"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >Đăng nhập
                </a>
              </div>
              <div v-else class="py-6">
                <a
                  href="#"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >{{ user.ho_ten_KH }}
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  </header>
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

<script setup lang="ts">
import logo from "@/assets/images/shirt.png";
import { useAuth } from "@/hook/use-auth";
import cartService from "@/services/cart-service";
import { emitter } from "@/untils/emitterGlobal.js";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/vue";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
  PowerIcon,
} from "@heroicons/vue/20/solid";
import {
  Bars3Icon,
  ChartPieIcon,
  XMarkIcon,
  CheckBadgeIcon,
} from "@heroicons/vue/24/outline";
import { onMounted, ref } from "vue";
import CartShoppingBadge from "./CartShoppingBadge.vue";
import Modal from "./modal/Modal.vue";

const { user, logout } = useAuth();
const open = ref(false);

function toggleShowModal() {
  open.value = !open.value;
}

const products = [
  {
    name: "Sản phẩm nổi bậc",
    description: "Sản phẩm được nhiều người mua và đánh giá cao.",
    href: "#",
    icon: ChartPieIcon,
  },
];
const callsToAction = [
  { name: "Xem demo", href: "#", icon: PlayCircleIcon },
  { name: "Liên hệ với nhân viên", href: "#", icon: PhoneIcon },
];

const mobileMenuOpen = ref(false);
const totalCart = ref(0);

const fetchProductCart = () => {
  cartService
    .getProduct()
    .then((res) => {
      if (res.status == 200) {
        totalCart.value =
          res.data.data?.reduce((init, value) => init + value.so_luong, 0) || 0;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  emitter.on("changeCart", () => {
    fetchProductCart();
  });
  fetchProductCart();
});

async function handleClickLogoutOk() {
  await logout();
  toggleShowModal();
}

function handleClickLogout() {
  toggleShowModal();
}
</script>

<style scope>
button {
  outline: none;
}
</style>