<template>
  <div class="group">
    <div
      class="aspect-h-1 aspect-w-1 w-full h-[270px] shadow overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
    >
      <img
        :src="product.ProductImage.url"
        :alt="product.ten_HH"
        class="h-full w-full object-cover object-center group-hover:opacity-75"
      />
    </div>
    <div class="flex items-start gap-1 justify-between mt-4">
      <h3 class="text-sm text-gray-700 flex-1 mb-0">{{ product.ten_HH }}</h3>
      <span class="text-sm flex items-start gap-1">
        4
        <Rate
          class="text-sm relative -top-[3.2px]"
          :value="4"
          :allow-clear="false"
          :autofocus="false"
          :disabled="true"
        />
      </span>
    </div>
    <div class="mt-1 flex items-center gap-1 mb-4">
      <CurrencyDollarIcon class="w-5 h-5 text-pink-600" />
      <p class="text-lg font-medium mb-0 text-pink-600">
        {{ product.gia.toLocaleString() }}
      </p>
    </div>
  </div>
  <div class="flex items-center justify-center gap-1">
    <Button type="dashed" class="flex-1">Mua ngay</Button>
    <Button
      type="default"
      @click="toggleDialogCart"
      class="flex items-center justify-center gap-1"
      >+<ShoppingCartIcon class="w-4 h-4" />
    </Button>
    <ProductDialog
      :open="openDialog"
      :handle-close="toggleDialogCart"
      :product="product"
      @add-product-in-cart="addProductInCart"
    />
  </div>
</template>
<script setup lang="ts">
import ProductDialog from "@comp/ProductDialog.vue";
import { ref } from "vue";
import { Button } from "ant-design-vue";
import {
  ShoppingCartIcon,
  CurrencyDollarIcon,
} from "@heroicons/vue/24/outline";
import { Rate } from "ant-design-vue";
import { useToast } from "vue-toastification";
import cartService from "@/services/cart-service";
const openDialog = ref(false);
const toast = useToast();
function addProductInCart({
  size,
  product_id,
  so_luong,
}: {
  size: string;
  product_id: string;
  so_luong: number;
}) {
  cartService
    .addProduct({
      product_id: product_id,
      size: size as Sizes,
      so_luong: so_luong,
    })
    .then((res) => {
      if (res.status == 200) {
        openDialog.value = false;

        toast("Đã thêm vào giỏ hàng!", {
          timeout: 3000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: false,
          closeButton: "button",
          icon: true,
          rtl: false,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function toggleDialogCart() {
  openDialog.value = !openDialog.value;
}

defineProps<{
  product: Product;
}>();
</script>