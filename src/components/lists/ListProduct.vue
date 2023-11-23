<template>
  <div class="bg-white">
    <div class="flex justify-center mx-auto">
      <div class="w-[520px] relative">
        <Input
          type="text"
          v-debounce:400ms="handleChangeSearch"
          placeholder="Tìm kiếm sản phẩm"
          class="my-4 px-6 py-3 w-full shadow rounded-xl border relative z-0"
        >
        </Input>
        <span
          class="absolute top-1/2 right-5 translate-y-[-50%] px-2 py-1 hover:bg-gray-100 rounded-md"
        >
          <MagnifyingGlassIcon
            class="w-6 h-6 z-10 cursor-pointer hover:opacity-80 transition-all"
          />
        </span>
      </div>
    </div>

    <div class="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl">
      <h2 class="sr-only">Products</h2>
      <div
        class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
      >
        <div
          v-for="product in productSearch"
          :key="product._id"
          :to="product.ProductImage.url"
          class="group"
        >
          <Product :product="product" @click-buy="handleClickBuy" />
        </div>
      </div>
    </div>
  </div>
  <!-- modal confirm -->
  <ModalConfirmOrder
    @confirmed="handleConfirmOrder"
    :total-product="1"
    :total-product-raw="totalProductRaw"
    :total-price="totalPrice"
    :cart-items="[cartTemp]"
    :open="isOpenModalConfirm"
    :toggle-show-modal="toggleModalConfirm"
  />
</template>

<script setup lang="ts">
import userService from "@/services/user-service";
import Product from "@comp/Product.vue";
import { onMounted, ref, watch, toRaw } from "vue";
import ModalConfirmOrder from "../ModalConfirmOrder.vue";
import { useToast } from "vue-toastification";
import { computed } from "@vue/reactivity";
import productService from "@/services/product-service";
import { toastMsgFromPromise } from "@/untils";
import { useRouter } from "vue-router";
import { Input } from "ant-design-vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
const products = ref<Product[]>([]);
const productSearch = ref<Product[]>([]);
const loading = ref(false);
const isOpenModalConfirm = ref(false);
const cartTemp = ref<any>();
const searchText = ref<string>("");
const router = useRouter();
const toast = useToast();

async function fetchProduct() {
  const res = await productService.getProduct();
  if (res.status == 200) {
    products.value = res.data?.data || [];
    productSearch.value = res.data?.data || [];
  }
}

function toNormalize(text: string): string {
  const str = text;
  let result = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  result = result.replace(new RegExp(/[đ]/g), "d");
  return result;
}

watch(searchText, (newSearchText) => {
  console.log("newSearchText", newSearchText);
  productSearch.value = toRaw(products.value).filter((p) => {
    const textCompare = toNormalize(p.ten_HH).toLocaleLowerCase();
    return textCompare.includes(newSearchText.toLocaleLowerCase());
  });
});

function handleChangeSearch(value: string) {
  searchText.value = value || "";
}

const totalProductRaw = computed((): number => cartTemp.value?.so_luong || 0);
const totalPrice = computed(
  (): number => cartTemp.value?.so_luong * cartTemp.value?.product_id.gia,
);

async function handleClickBuy({
  size,
  product_id,
  so_luong,
}: {
  size: string;
  product_id: string;
  so_luong: number;
}) {
  const res = await productService.getProductById(product_id);
  if (res.status == 200) {
    cartTemp.value = {
      gia_Dat_hang: res.data?.data?.gia!,
      product_id: res.data?.data!,
      size: size as Sizes,
      so_luong,
    };
    toggleModalConfirm();
  } else {
    toast.error("Có lỗi xảy ra.");
  }
}

function toggleModalConfirm() {
  isOpenModalConfirm.value = !isOpenModalConfirm.value;
}

async function handleConfirmOrder({
  dia_chi_nhan,
  so_dien_thoai_dat_hang,
}: {
  so_dien_thoai_dat_hang: string;
  dia_chi_nhan: string;
}) {
  loading.value = true;
  const api = userService.orderOnlyProduct({
    dia_chi_nhan,
    size: cartTemp.value?.size,
    so_dien_thoai_dat_hang,
    so_luong: cartTemp.value?.so_luong,
    product_id: cartTemp.value?.product_id._id,
  });
  const res = await toastMsgFromPromise(api);
  if (res.status == 200) {
    router.push("/order/" + res.data?.data?.order._id + "?t=success");
    toggleModalConfirm();
  }
  loading.value = false;
}

onMounted(() => {
  fetchProduct();
});
</script>