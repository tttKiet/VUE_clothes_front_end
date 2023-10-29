<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { TheDefaultLayout } from "./layouts";
const route = useRoute();

const layout = computed(() => {
  const layout = route?.meta?.layout;
  console.log(layout);
  return layout ? layout : "div";
});
</script>

<template>
  <div class="text-red-500">class</div>
  <div class="flex items-center gap-2 text-red-500">
    <router-link to="/">home</router-link>
    <router-link to="/about">about</router-link>
  </div>
  <component :is="layout">
    <router-view />
  </component>
</template>
