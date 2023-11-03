<template>
  <a-config-provider
    :theme="{
      token: {
        fontSize: 16,
      },
      component: {
        Button: {
          backgroundColor: '#1677ff',
        },
        
      },
    }"
  >
    <slot></slot>
  </a-config-provider>
</template>

<script setup lang="ts"></script>


