<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    class="text-base"
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

    <a-form-item label="Ghi chú" name="date1">
      <a-input v-model:value="formState.ghi_chu" placeholder="ghi_chu" />
    </a-form-item>

    <a-form-item label="Số lượng trong kho" required name="so_luong_hang">
      <a-input
        v-model:value="formState.so_luong_hang"
        placeholder="Nhập số lượng tồn..."
      />
    </a-form-item>
    <a-form-item label="Giá bán" required name="gia">
      <a-input v-model:value="formState.gia" placeholder="Nhập giá bán" />
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">Thêm</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">Làm mới</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive, ref, toRaw } from "vue";
import type { UnwrapRef } from "vue";
import type { Rule } from "ant-design-vue/es/form";

const formRef = ref();
const labelCol = { span: 5 };
const wrapperCol = { span: 13 };
const formState: UnwrapRef<Partial<Product>> = reactive({
  _id: "",
  ten_HH: "",
  mo_ta_HH: "",
  ghi_chu: "",
  gia: 0,
  so_luong_hang: 0,
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