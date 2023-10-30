<script setup lang="ts">
import Header from "@comp/Header.vue";
import Footer from "@comp/Footer.vue";
</script>

<template>
  <!-- <v-layout>
    <v-main> -->
  <Header />
  <slot></slot>
  <Footer />
  <!-- </v-main>
  </v-layout> -->
</template>
