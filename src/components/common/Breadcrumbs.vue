<template>
  <div class="w-max text-left bg-inherit my-4">
    <nav aria-label="breadcrumb">
      <ol
        class="flex w-full bg-inherit flex-wrap items-center rounded-md py-2 px-4"
      >
        <li
          v-for="breadcrumb in breadcrumbs"
          :key="breadcrumb.name"
          class="flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-black antialiased transition-colors duration-300 hover:text-pink-500"
        >
          <router-link :to="breadcrumb.href" class="opacity-60">
            <span>
              {{ breadcrumb.name }}
            </span>
          </router-link>
          <span
            class="pointer-events-none mx-2 select-none font-sans text-sm font-normal leading-normal text-blue-gray-500 antialiased"
          >
            /
          </span>
        </li>
      </ol>
    </nav>
  </div>
</template>
<script lang="ts" setup>
export interface IBreadcrumb {
  name: string;
  href: string;
}
export interface BreadcrumbProps {
  breadcrumbs: IBreadcrumb[];
}
defineProps<BreadcrumbProps>();
</script>