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
const openDialog = ref(false);

function toggleDialogCart() {
  openDialog.value = !openDialog.value;
}

defineProps<{
  product: Product;
}>();
</script>