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
    <a-form-item label="Ảnh hàng hóa" required name="image">
      <Upload
        list-type="picture-card"
        accept="image/*"
        :multiple="false"
        :file-list="fileList"
        :onChange="handleChangeImag"
        :on-preview="handlePreview"
        :beforeUpload="
          () => {
            /* update state here */
            return false;
          }
        "
      >
        <div v-if="fileList.length < 1">
          <PlusOutlined />
          <div style="margin-top: 8px">Tải ảnh</div>
        </div>
      </Upload>
    </a-form-item>

    <div class="pt-5">
      <Button type="primary" :loading="loading" @click="onSubmit">
        Thêm
      </Button>
      <Button type="dashed" style="margin-left: 10px" @click="resetForm"
        >Làm mới</Button
      >
    </div>
  </a-form>
  <Modal
    :open="previewOpen"
    :title="previewTitle"
    :footer="null"
    :onCancel="handleCancel"
  >
    <img alt="example" :style="{ width: '100%' }" :src="previewImage" />
  </Modal>
</template>
<script lang="ts" setup>
import { PlusOutlined } from "@ant-design/icons-vue";
import {
  Button,
  Modal,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "ant-design-vue";
import type { Rule } from "ant-design-vue/es/form";
import { RcFile } from "ant-design-vue/es/vc-upload/interface";
import type { UnwrapRef } from "vue";
import { reactive, ref, toRaw } from "vue";
defineProps<{
  loading: boolean;
}>();
const formRef = ref();
const previewOpen = ref(false);

const previewImage = ref("");
const previewTitle = ref("");

const fileList = ref<UploadFile[]>([]);
console.log(fileList);

const formState: UnwrapRef<Partial<IFormState>> = reactive({
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
  image: [
    {
      required: true,
      message: "Vui lòng tải lên ảnh",
      trigger: "change",
    },
  ],
};

const emit = defineEmits(["submit_form_product"]);

const onSubmit = () => {
  formRef.value.validate().then(async () => {
    console.log("values", formState, toRaw(formState));
    emit("submit_form_product", toRaw(formState));
  });
};
const handleCancel = () => (previewOpen.value = false);

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const handlePreview = async (file: UploadFile) => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj as RcFile);
  }

  previewImage.value = file.url || (file.preview as string);
  previewOpen.value = true;
  previewTitle.value =
    file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1);
};
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
function isValidFormatFiles(files: UploadFile[]) {
  if (!files || files.length === 0) return true; // Bỏ qua nếu không có tệp ảnh
  const isValid = files.every((file) => {
    return file.type && SUPPORTED_FORMATS.includes(file.type);
  });
  return isValid;
}
const handleChangeImag: UploadProps["onChange"] = ({
  fileList: newFileList,
  file,
}) => {
  console.log("file", file);
  if (newFileList.length > 1) {
    // return toast.error("Chỉ được tải lên 3 ảnh");
    return message.error({
      content: "Chỉ được tải lên 1 ảnh",

      style: {
        fontSize: "14px",
      },
    });
  } else if (!isValidFormatFiles(newFileList)) {
    return message.error({
      content: "Vui lòng chỉ tải lên ảnh.",
      style: {
        fontSize: 14,
      },
    });
  }
  // onChange(newFileList);
  fileList.value = newFileList;
  formState.image = newFileList[0];
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