<template>
  <h4 class="text-gray-600 text-base text-center pb-4">
    {{ _id ? "Sửa hàng hóa" : "Thêm hàng hóa mới" }}
  </h4>

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
        {{ _id ? "Sửa hàng hóa" : "Thêm" }}
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
import productService from "@/services/product-service";
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
import { onMounted, reactive, ref, toRaw } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const _id = router.currentRoute.value.query._id;
defineProps<{
  loading: boolean;
}>();

async function getProductById() {
  const res = await productService.getProductById(_id as string);
  if (res.status == 200) {
    formState._id = res.data.data?._id!;
    formState.ten_HH = res.data.data?.ten_HH!;
    formState.so_luong_hang = res.data.data?.so_luong_hang!;
    formState.mo_ta_HH = res.data.data?.mo_ta_HH!;
    formState.gia = res.data.data?.gia!;
    formState.ghi_chu = res.data.data?.ghi_chu!;
    formState.image = res.data.data?.ProductImage.url!;

    if (res.data.data?.ProductImage.url) {
      const file: UploadFile = {
        uid: `${res.data.data?.ProductImage._id}`,
        name: "image.png",
        status: "done",
        url: res.data.data?.ProductImage.url,
        type: "image/jpeg",
      };
      (fileList.value as any) = [file];
    }
  }
}

onMounted(() => {
  if (_id) getProductById();
});

const formRef = ref();
const previewOpen = ref(false);

const previewImage = ref("");
const previewTitle = ref("");

const fileList = ref<UploadFile[]>([]);

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
}) => {
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