<template>
  <Table
    :columns="columns"
    :data-source="data"
    :pagination="{
      pageSize: 4,
    }"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'ten_HH'">
        <span>
          <smile-outlined />
          {{ column.title }}
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'ProductImage'">
        <a>
          <a-image
            v-if="record.ProductImage.url"
            :fallback="fallbackImg"
            :width="200"
            :height="200"
            class="object-contain"
            :src="record.ProductImage.url"
          />
          <a-image
            v-else
            :fallback="fallbackImg"
            :width="200"
            :src="fallbackImg"
          />
        </a>
      </template>

      <template v-if="column.key === 'gia'">
        <span class="text-blue-500 mr-1"
          >$ {{ record.gia.toLocaleString() }}
        </span>
      </template>
      <template v-if="column.key === 'ton_kho_so_luong_hang'">
        <span class="text-pink-500 mr-1 font-semibold"
          >{{ record.availableOrder }} / {{ record.so_luong_hang }}</span
        >
      </template>

      <template v-else-if="column.key === 'action'">
        <span class="flex items-center gap-2">
          <router-link :to="`/admin/manager-product?_id=${record._id}`">
            <Button type="dashed" class="px-6" size="middle">Sửa</Button>
          </router-link>
          <a-divider type="vertical" />
          <Button
            type="dashed"
            danger
            size="middle"
            @click="hanleCLickDelete(record._id)"
            >Xóa</Button
          >
        </span>
      </template>
    </template>
  </Table>
</template>
<script lang="ts" setup>
import productService from "@/services/product-service";
import { Button, Table } from "ant-design-vue";
import { SmileOutlined } from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import fallbackImg from "@/assets/images/image_fallback-removebg.png";
import Swal from "sweetalert2";
const columns = [
  {
    title: "Tên hàng hóa",
    dataIndex: "ten_HH",
    key: "ten_HH",
  },
  {
    title: "Giá bán",
    dataIndex: "gia",
    key: "gia",
  },
  {
    title: "Tồn kho / Số lượng hàng ",
    key: "ton_kho_so_luong_hang",
    dataIndex: "so_luong_hang",
  },
  {
    title: "Ảnh",
    key: "ProductImage",
    dataIndex: ["ProductImage", "url"],
  },
  {
    title: "Hành động",
    key: "action",
  },
];

const data = ref<any>([]);

function hanleCLickDelete(_id: string) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton:
        "btn btn-success text-red-400 mx-1 border border-red-500 rounded-xl px-4 py-1",
      cancelButton: "btn btn-danger mx-1",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Bạn có muốn xóa hàng hóa này?",
      confirmButtonText: "Đồng ý",
      text: "Hàng hóa sẽ bị xóa và không thể khôi phục!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Không xóa!",
      reverseButtons: true,
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: async () => {
        return productService
          .deleteProduct(_id)
          .then((res) => {
            if (res.status === 200) {
              Swal.fire("Đã xóa!", "", "success");
              fetchProduct();
            } else {
              Swal.fire("Đã có lỗi xảy ra vui lòng thử lại", "", "info");
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire("Đã có lỗi xảy ra vui lòng thử lại", "", "info");
          });
      },
    })
    .then(async (result) => {
      Swal.isLoading();
      if (result.isConfirmed) {
      } else if (result.isDenied) {
        Swal.fire("Thay đổi chưa được lưu", "", "info");
      }
    });
}
async function fetchProduct() {
  const res = await productService.getProduct();
  if (res.status == 200) {
    console.log(res.data);
    data.value =
      res.data.data?.map((product) => {
        return {
          key: product._id,
          ...product,
        };
      }) || [];
  }
}

onMounted(() => {
  fetchProduct();
});
</script>