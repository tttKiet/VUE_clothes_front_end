<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    layout="vertical"
    class="text-base max-w-[600px] mx-auto"
  >
    <a-form-item ref="ten_HH" label="Tên hàng hóa" name="ten_HH">
      <a-input
        v-model:value="formState.ten_HH"
        placeholder="Nhập tên hàng hóa..."
      />
    </a-form-item>

    <a-form-item label="Mô tả" required name="mo_ta_HH">
      <a-textarea
        v-model:value="formState.mo_ta_HH"
        placeholder="Nhập mô tả cho hàng hóa..."
      />
    </a-form-item>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <a-form-item label="Số lượng trong kho" required name="so_luong_hang">
        <a-input-number
          class="w-full"
          v-model:value="formState.so_luong_hang"
          placeholder="Nhập số lượng tồn..."
        />
      </a-form-item>
      <a-form-item label="Giá bán" required name="gia">
        <a-input-number
          class="w-full"
          v-model:value="formState.gia"
          placeholder="Nhập giá bán"
        />
      </a-form-item>
    </div>

    <a-form-item label="Ghi chú" name="ghi_chu">
      <a-textarea
        v-model:value="formState.ghi_chu"
        placeholder="Nhập ghi chú..."
      />
    </a-form-item>

    <a-form-item>
      <Button type="primary" :loading="loading" @click="onSubmit">
        Thêm
      </Button>
      <Button type="dashed" style="margin-left: 10px" @click="resetForm"
        >Làm mới</Button
      >
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive, ref, toRaw } from "vue";
import type { UnwrapRef } from "vue";
import type { Rule } from "ant-design-vue/es/form";
import { Button } from "ant-design-vue";

const formRef = ref();
const loading = ref(false);

const formState: UnwrapRef<Partial<Product>> = reactive({
  _id: "",
  ten_HH: "",
  mo_ta_HH: "",
  ghi_chu: "",
});
const rules: Record<string, Rule[]> = {
  ten_HH: [
    {
      required: true,
      message: "Vui lòng điền tên hàng hóa",
      trigger: "change",
    },
    { min: 4, message: "Tên hàng hóa từ 4 kí tự", trigger: "blur" },
  ],
  mo_ta_HH: [
    {
      required: true,
      message: "Vui lòng nhập mô tả cho hàng hóa",
      trigger: "change",
    },
  ],
  gia: [
    {
      required: true,
      message: "Nhập giá bán",
      trigger: "change",
    },
  ],
  so_luong_hang: [
    {
      required: true,
      message: "Nhập số lượng hàng hóa",
      trigger: "change",
    },
  ],
};
const onSubmit = () => {
  formRef.value.validate().then(() => {
    console.log("values", formState, toRaw(formState));
  });
};
const resetForm = () => {
  formRef.value.resetFields();
};
</script>

<style scoped>
.ant-btn-primary {
  background-color: #1677ff;
}
</style>