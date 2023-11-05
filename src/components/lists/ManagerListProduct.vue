<template>
  <a-table :columns="columns" :data-source="data">
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

      <template v-else-if="column.key === 'action'">
        <span>
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
  </a-table>
</template>
<script lang="ts" setup>
import productService from "@/services/product-service";
import { Button } from "ant-design-vue";
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
    title: "Số lượng hàng",
    key: "so_luong_hang",
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

// const data = [
//   {
//     key: 1,
//     _id: "6544751e6c7aaf75d2ba4b69",
//     ten_HH: "sadsa",
//     mo_ta_HH: "sadadsad",
//     gia: 2,
//     so_luong_hang: 2,
//     ghi_chu: "sadsa",
//     createdAt: "2023-11-03T04:20:46.813Z",
//     updatedAt: "2023-11-03T05:42:05.472Z",
//     __v: 0,
//     ProductImage: {
//       _id: "6544751e6c7aaf75d2ba4b6b",
//       url: "undefined",
//       product_id: "6544751e6c7aaf75d2ba4b69",
//       createdAt: "2023-11-03T04:20:46.854Z",
//       updatedAt: "2023-11-03T05:42:05.396Z",
//       __v: 0,
//     },
//   },
// ];

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
    data.value =
      res.data.data?.map((product) => {
        return {
          key: product._id,
          ...product,
        };
      }) || [];
  }
  console.log("res", res);
}

onMounted(() => {
  fetchProduct();
});
</script>