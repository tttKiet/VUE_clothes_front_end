<template>
  <div class="bg-white">
    <div
      class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
    >
      <h2 class="sr-only">Products</h2>
      <div
        class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
      >
        <div
          v-for="product in products"
          :key="product._id"
          :to="product.ProductImage.url"
          class="group"
        >
          <Product :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import productService from "@/services/product-service";
import Product from "@comp/Product.vue";
import { onMounted, ref } from "vue";
const products = ref<Product[]>([]);

async function fetchProduct() {
  const res = await productService.getProduct();
  if (res.status == 200) {
    products.value = res.data?.data || [];
  }
}

onMounted(() => {
  fetchProduct();
});
</script>