<template>
  <div class="relative min-h-screen bg-gray-900 overflow-hidden">
    <svg
      viewBox="0 0 1024 1024"
      class="absolute left-0 top-1/2 z-0 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
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
    <div
      v-if="!user._id"
      class="min-h-screen flex items-center justify-center mx-auto text-white"
    >
      Bạn chưa đăng nhập
    </div>

    <div v-else class="container mx-auto px-2 py-10">
      <div
        v-if="products?.length === 0"
        class="text-center flex-1 px-8 py-6 flex-wrap divide-gray-200 rounded-2xl shadow-md shadow-gray bg-white"
      >
        Giỏ hàng trống... hãy thêm hàng hóa vào giỏ hàng!
        <br />
        <RouterLink to="/"
          ><div class="mt-2 text-blue-500 font-medium">Thêm sản phẩm ngay</div>
        </RouterLink>
        <div
          class="min-h-[320px] mt-5 border rounded-xl text-gray-500 flex items-center justify-center"
        >
          Trống
        </div>
      </div>
      <div v-else>
        <h4
          class="text-white text-xl font-semibold mb-5 flex items-center gap-2"
        >
          <ShoppingCartIcon class="w-6 h-6" />
          Giỏ hàng của bạn
        </h4>

        <div class="flex gap-5">
          <ul
            class="divide-y flex-1 px-8 py-6 flex-wrap divide-gray-200 rounded-2xl shadow-md shadow-gray bg-white"
          >
            <li class="grid grid-cols-12 py-3 pb-6 font-semibold">
              <div class="col-span-4">Hàng hóa</div>
              <div class="col-span-2">Giá</div>
              <div class="col-span-3">Số lượng</div>
              <div class="col-span-3">Tổng</div>
            </li>
            <li
              v-for="product in products"
              :key="product.product_id._id"
              class="py-6 grid grid-cols-12"
            >
              <ProductCartItem
                :loading="loading"
                :product="product"
                @setLoading="setLoading"
                @delete-product="deleteProduct"
                @fetch-product="fetchProduct"
              />
            </li>
          </ul>

          <div class="min-w-[340px] rounded-2xl shadow-md bg-white px-6 py-4">
            <div class="my-1">
              <h3 class="mb-6 font-medium text-black text-xl text-center">
                Tổng quát
              </h3>
            </div>
            <div class="flex items-center justify-between gap-1 py-2">
              <span>Tổng sản phẩm</span>
              <span>$2</span>
            </div>
            <div class="flex items-center justify-between gap-1 py-2">
              <span>Tổng sản phẩm</span>
              <span>12</span>
            </div>
            <div class="flex items-center justify-between gap-1 py-2">
              <span>Giảm giá</span>
              <span>0%</span>
            </div>
            <hr class="my-2" />
            <div class="flex items-center justify-between gap-1 py-2">
              <span class="font-semibold">Tổng cộng</span>
              <span class="font-semibold">$12000</span>
            </div>
            <div class="mt-4">
              <Button type="primary" class="w-full">Đặt hàng</Button>
            </div>
            <div
              class="mt-5 flex justify-center text-center text-sm text-gray-500"
            >
              <p>
                hoặc
                <router-link
                  to="/"
                  type="button"
                  class="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Tiếp tục mua sắm
                  <span aria-hidden="true"> &rarr;</span>
                </router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import cartService from "@/services/cart-service";
import { onMounted, ref } from "vue";
import ProductCartItem from "@/components/ProductCartItem.vue";
import { useAuth } from "@/hook/use-auth";
import { Button } from "ant-design-vue";
import { ShoppingCartIcon } from "@heroicons/vue/24/outline";
import { RouterLink } from "vue-router";
const { user } = useAuth();
const loading = ref(false);

function setLoading(isLoading: boolean) {
  console.log("isLoading", isLoading);
  loading.value = isLoading;
}

const products = ref<ProductCart[]>();
function fetchProduct() {
  cartService
    .getProduct()
    .then((res) => {
      if (res.status === 200) {
        products.value = res.data.data;
      }
    })
    .catch((err) => console.log(err));
}

async function deleteProduct({ product_id }: { product_id: string }) {
  cartService
    .deleteProduct({ product_id: product_id })
    .then((res) => {
      if (res.status === 200) {
        fetchProduct();
        console.log("Removed product in cart ....");
      }
    })
    .catch((err) => console.log(err));
}

onMounted(() => {
  fetchProduct();
});
</script>