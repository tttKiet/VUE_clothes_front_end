<template>
  <div class="col-span-2">
    <div class="flex items-center justify-start gap-2">
      <div class="overflow-hidden rounded-md border border-gray-200">
        <img
          :src="productCart.product_id.ProductImage.url"
          class="h-20 w-20 object-cover object-center"
        />
      </div>
    </div>
  </div>
  <div class="col-span-10">
    <div class="flex flex-col justify-between h-full">
      <div>
        <div class="flex justify-between gap-2">
          <span class="text-black">
            {{ productCart.product_id.ten_HH }}
          </span>
          <span class="text-black flex items-start font-medium"
            >${{ productCart.product_id.gia.toLocaleString() }}</span
          >
        </div>
        <div class="flex items-center gap-1 mt-1">
          <span class="text-gray-600 text-sm">
            Size: {{ productCart.size }}
          </span>
        </div>
      </div>
      <span class="text-gray-600 text-sm w-20"
        >x {{ productCart.so_luong }}</span
      >
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  productCart: ProductCart;
}>();
</script>