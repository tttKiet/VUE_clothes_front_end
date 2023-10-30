<template>
  <router-link to="/product" class="group">
    <div
      class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
    >
      <img
        :src="product.imageSrc"
        :alt="product.imageAlt"
        class="h-full w-full object-cover object-center group-hover:opacity-75"
      />
    </div>
    <h3 class="mt-4 text-sm text-gray-700">{{ product.name }}</h3>
    <p class="mt-1 text-lg font-medium text-gray-900">
      {{ product.price }}
    </p>
  </router-link>
</template>
<script setup lang="ts">
// import { HangHoa } from "@/models";

defineProps<{
  product: any;
}>();
</script>