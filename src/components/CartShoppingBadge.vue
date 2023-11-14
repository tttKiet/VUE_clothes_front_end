<template>
  <router-link to="/cart">
    <div
      class="text-gray-700 cursor-pointer hover:opacity-70 transition-all from-purple-200 flex items-center gap-1"
    >
      <ShoppingCartIcon class="w-5 h-5" />
      <span class="rounded-full border-white border-2">{{ totalCart }}</span>
    </div>
  </router-link>
</template>
<script setup lang="ts">
import { ShoppingCartIcon } from "@heroicons/vue/24/solid";
defineProps<{
  totalCart: number;
}>();
</script>
