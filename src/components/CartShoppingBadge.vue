<template>
  <router-link to="/cart">
    <div
      class="relative cursor-pointer hover:opacity-70 transition-all from-purple-200"
    >
      <ShoppingCartIcon class="w-5 h-5" />
      <span
        class="absolute bottom-full left-full rounded-full px-1 py-[1px] border-white border-2 bg-red-500 text-xs text-white -translate-x-[9px] translate-y-[10px]"
        >12</span
      >
    </div>
  </router-link>
</template>
<script setup lang="ts">
import { ShoppingCartIcon } from "@heroicons/vue/24/solid";
</script>
