<template>
  <div class="col-span-4">
    <div class="flex items-center justify-start gap-2">
      <div class="overflow-hidden rounded-md border border-gray-200">
        <img
          :src="product.product_id.ProductImage.url"
          class="h-20 w-20 object-cover object-center"
        />
      </div>
      <span class="text-gray-600">
        {{ product.product_id.ten_HH }}
      </span>
    </div>
  </div>

  <div class="col-span-2">
    <span class="text-gray-600 h-full flex items-center font-medium"
      >${{ product.product_id.gia.toLocaleString() }}</span
    >
  </div>

  <div class="col-span-3">
    <span class="text-gray-600 h-full flex items-center">
      <InputNumberChoose
        :disable="loading"
        :number="number"
        :handle-change="handleChangeNumber"
      />
    </span>
  </div>
  <div class="col-span-2">
    <span class="text-gray-600 h-full flex items-center">
      ${{ (product.so_luong * product.product_id.gia).toLocaleString() }}
    </span>
  </div>

  <div class="col-span-1">
    <span
      @click="deleteProduct(product.product_id._id)"
      class="px-2- py-1 text-gray-600 h-full flex items-center transition-all duration-200 hover:transform hover:scale-105 hover:text-black cursor-pointer origin-center"
    >
      <XMarkIcon class="w-5 h-5" />
    </span>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import InputNumberChoose from "./InputNumberChoose.vue";
import { ValueType } from "ant-design-vue/es/input-number/src/utils/MiniDecimal";
import cartService from "@/services/cart-service";
import { XMarkIcon } from "@heroicons/vue/24/solid";

const emit = defineEmits<{
  (e: "setLoading", isLoading: boolean): void;
  (e: "deleteProduct", { product_id }: { product_id: string }): void;
}>();

const props = defineProps<{
  loading: boolean;
  product: ProductCart;
}>();

const number = ref(props.product.so_luong);

async function deleteProduct(_id: string) {
  emit("deleteProduct", {
    product_id: _id,
  });
}

async function handleChangeNumber(value: ValueType) {
  emit("setLoading", true);
  try {
    const res = await cartService.updateProduct({
      product_id: props.product.product_id._id,
      so_luong: value as number,
    });
    console.log(res.data);

    if (res.status === 200) {
      number.value = Number.parseInt(value.toString());
    }
  } catch (error) {
  } finally {
    emit("setLoading", false);
  }
}
</script>