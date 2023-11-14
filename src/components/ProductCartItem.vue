<template>
  <div class="col-span-1">
    <span class="flex items-center h-full">
      <Checkbox :checked="checked" @change="handleChangeCheckOrder"
    /></span>
  </div>

  <div class="col-span-4">
    <div class="flex items-center justify-start gap-2">
      <div class="overflow-hidden rounded-md border border-gray-200">
        <img
          :src="product.product_id.ProductImage.url"
          class="h-20 w-20 object-cover object-center"
        />
      </div>

      <div class="flex flex-col ml-2 gap-2">
        <span class="text-gray-600">
          {{ product.product_id.ten_HH }}
        </span>
        <div class="flex items-center gap-1 mt-1">
          <span class="text-gray-600 text-xs"> Size: </span>
          <Select
            :value="product.size"
            size="small"
            :bordered="false"
            class="text-gray-600 text-xs w-20"
            @change="handleChangeSize"
            :disable="loading"
          >
            <a-select-option value="XXS">XXS</a-select-option>
            <a-select-option value="XS">XS</a-select-option>
            <a-select-option value="S">S</a-select-option>
            <a-select-option value="M">M</a-select-option>
            <a-select-option value="L">L</a-select-option>
            <a-select-option value="XL">XL</a-select-option>
            <a-select-option value="XXL">XXL</a-select-option>
          </Select>
        </div>
      </div>
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
      ${{ (number * product.product_id.gia).toLocaleString() }}
    </span>
  </div>

  <div class="absolute bottom-0 right-0">
    <span
      @click="deleteProduct(product.product_id._id)"
      class="px-2- py-1 pb-2 text-gray-600 h-full flex items-center transition-all duration-200 hover:transform hover:scale-105 hover:text-black text-sm cursor-pointer origin-center"
    >
      Xóa <XMarkIcon class="w-4 h-4" />
    </span>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import InputNumberChoose from "./InputNumberChoose.vue";
import { ValueType } from "ant-design-vue/es/input-number/src/utils/MiniDecimal";
import cartService from "@/services/cart-service";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { Checkbox, Select } from "ant-design-vue";
import { SelectValue } from "ant-design-vue/es/select";
import { CheckboxChangeEvent } from "ant-design-vue/es/checkbox/interface";

const emit = defineEmits<{
  (e: "setLoading", isLoading: boolean): void;
  (e: "fetchProduct"): void;
  (e: "deleteProduct", { product_id }: { product_id: string }): void;
  (
    e: "changeCheckOrder",
    {
      cart_id,
      checked,
    }: {
      cart_id: string;
      checked: boolean;
    },
  ): void;
}>();

const props = defineProps<{
  loading: boolean;
  product: ProductCart;
  checked: boolean;
}>();

const number = ref(props.product.so_luong);
const size = ref(props.product.size);

async function deleteProduct(_id: string) {
  emit("deleteProduct", {
    product_id: _id,
  });
}

function handleChangeCheckOrder(e: CheckboxChangeEvent) {
  emit("changeCheckOrder", {
    cart_id: props.product._id!,
    checked: e.target.checked,
  });
}

async function handleChangeSize(value: SelectValue) {
  emit("setLoading", true);
  try {
    const res = await cartService.updateProduct({
      product_id: props.product.product_id._id,
      size: value?.toString() as Sizes,
      size_old: props.product.size,
    });

    if (res.status === 200) {
      size.value = value?.toString() as Sizes;
      emit("fetchProduct");
    }
  } catch (error) {
  } finally {
    emit("setLoading", false);
  }
}

async function handleChangeNumber(value: ValueType) {
  emit("setLoading", true);
  try {
    const res = await cartService.updateProduct({
      product_id: props.product.product_id._id,
      size: size.value as Sizes,
      so_luong: value as number,
    });

    if (res.status === 200) {
      emit("fetchProduct");
      number.value = Number.parseInt(value.toString());
    }
  } catch (error) {
  } finally {
    emit("setLoading", false);
  }
}
</script>