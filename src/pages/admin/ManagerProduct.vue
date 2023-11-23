<template>
  <div class="p-2">
    <div class="">
      <ProductForm @submit_form_product="submitForm" :loading="loading" />
    </div>
  </div>
</template>
<script setup lang="ts">
import ProductForm from "@/components/ProductForm.vue";
import productService from "@/services/product-service";
import { message } from "ant-design-vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const loading = ref(false);
const router = useRouter();
async function submitForm(product: IFormState) {
  try {
    loading.value = true;
    const res = await productService.createOrUpdateProduct(product);
    if (res.status == 200) {
      message.success({
        content: res.data.msg,
      });
      router.push("/admin");
    } else {
      message.error({
        content: res.data.msg,
      });
    }
  } catch (error) {
    const err = error as Error;
    message.error({
      content: err.message,
    });
  } finally {
    loading.value = false;
  }
}
</script>