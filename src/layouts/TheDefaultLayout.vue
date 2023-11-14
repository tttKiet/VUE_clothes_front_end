<script setup lang="ts">
import Header from "@comp/Header.vue";
import Footer from "@comp/Footer.vue";
</script>

<template>
  <!-- <v-layout>
    <v-main> -->
  <Header />
  <div class="min-h-screen"><slot></slot></div>
  <Footer />
  <!-- </v-main>
  </v-layout> -->
</template>
