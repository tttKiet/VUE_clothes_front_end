<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import MyTheme from "./components/MyTheme.vue";
const route = useRoute();

const layout = computed(() => {
  const layout = route?.meta?.layout;
  return layout ? layout : "div";
});
</script>

<template>
  <component :is="layout">
    <my-theme><router-view /></my-theme>
  </component>
</template>
