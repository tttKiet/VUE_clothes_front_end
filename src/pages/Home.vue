<template>
  <div class="bg-white">
    <!-- Header home -->
    <div class="bg-gray-900 relative overflow-hidden">
      <svg
        viewBox="0 0 1024 1024"
        class="absolute left-0 top-1/2 z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
        aria-hidden="true"
      >
        <circle
          cx="512"
          cy="512"
          r="512"
          fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
          fill-opacity="0.7"
        />
        <defs>
          <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
            <stop stop-color="#7775D6" />
            <stop offset="1" stop-color="#E935C1" />
          </radialGradient>
        </defs>
      </svg>
      <div class="mx-auto max-w-7xl py-24 pt-12">
        <div
          class="relative z-20 isolate overflow-hidden px-6 pt-16 sm:rounded-3xl lg:flex lg:gap-x-20 lg:px-8 lg:pt-0"
        >
          <div
            class="mx-auto flex-1 text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left"
          >
            <h2
              class="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              <p class="font-light mb-2 tracking-wide">Clothes shop</p>
              Lựa chọn tốt nhất của bạn<br />Bắt đầu sử dụng website từ hôm này.
            </h2>
            <p class="mt-6 text-lg leading-8 text-gray-300">
              Nhưng món đồ hấp dẩn trong giỏ hàng của bạn. Hãy thêm vào giỏ hàng
              nhưng sản phẩm ưng ý.
            </p>
            <div
              class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start"
            >
              <a
                href="#start"
                class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >Bắt đầu mua sắm</a
              >
              <a href="#" class="text-sm font-semibold leading-6 text-white"
                >Xem thêm <span aria-hidden="true">→</span></a
              >
            </div>
          </div>
          <div class="flex justify-end">
            <div
              class="grid grid-cols-2 max-w-[600px] grid-rows-2 gap-4 sm:gap-6 lg:gap-8"
            >
              <img
                src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg"
                alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
                class="rounded-lg bg-gray-100"
              />
              <img
                src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg"
                alt="Top down view of walnut card tray with embedded magnets and card groove."
                class="rounded-lg bg-gray-100"
              />
              <img
                src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg"
                alt="Side of walnut card tray with card groove and recessed card area."
                class="rounded-lg bg-gray-100"
              />
              <img
                src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg"
                alt="Walnut card tray filled with cards and card angled in dedicated groove."
                class="rounded-lg bg-gray-100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Breadcrumbs -->
    <div id="start" class="container mx-auto px-2 mt-8">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
    </div>
    <!-- List product -->
    <ListProduct />
    <StatHome />
  </div>
</template>
<script setup lang="ts">
import ListProduct from "@comp/lists/ListProduct.vue";
import StatHome from "@comp/common/StatHome.vue";
import Breadcrumbs, { IBreadcrumb } from "@comp/common/Breadcrumbs.vue";

const breadcrumbs: IBreadcrumb[] = [
  {
    name: "Trang chủ",
    href: "/",
  },
];
</script>