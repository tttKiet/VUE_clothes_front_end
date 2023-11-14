<template>
  <Table
    :columns="columns"
    :data-source="data"
    class="transition-all duration-300"
    :pagination="{
      pageSize: 2,
      total: data.length,
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
      <template v-if="column.key === 'so_luong_hang'">
        <span class="text-pink-500 mr-1 font-semibold">{{
          record.so_luong_hang
        }}</span>
      </template>
      <template v-if="column.key === 'order.ngay_dat_hang'">
        <span class="text-pink-500 mr-1 font-semibold">{{
          moment(record.order.ngay_dat_hang).format("L")
        }}</span>
      </template>
      <template v-if="column.key === 'order.ngay_giao_hang'">
        <span class="text-pink-500 mr-1 font-semibold">{{
          record.order.ngay_giao_hang
            ? moment(record.order.ngay_giao_hang).format("L")
            : "./"
        }}</span>
      </template>
      <template v-if="column.key === 'trang_thai_DH'">
        <!-- <span class="text-pink-500 mr-1 font-semibold">{{
          record.order.trang_thai_DH
        }}</span> -->
        <Select
          ref="select"
          :loading="isLoading"
          :default-value="record.order.trang_thai_DH"
          :value="record.order.trang_thai_DH"
          style="width: 160px"
          @change="(e) => handleChangeStatus(e, record.order._id)"
        >
          <Select.Option v-for="stt in StatusEnum" :value="stt.name">{{
            stt.value
          }}</Select.Option>
        </Select>
      </template>
    </template>

    <template #expandedRowRender="{ record }">
      <h4 class="text-gray-600 flex items-center gap-2">* Chi tiết đặt hàng</h4>
      <a-table
        :columns="innerColumns"
        :data-source="record.orderDetails"
        :pagination="false"
      >
        <template #bodyCell="{ column, record: columnChild }">
          <template v-if="column.key === 'product_id.ten_HH'">
            <span class="text-black font-semibold">
              {{ columnChild.product_id.ten_HH }}
            </span>
          </template>
          <template v-if="column.key === 'gia_Dat_hang'">
            <span class="text-blue-500 font-semibold">
              {{ columnChild.gia_Dat_hang.toLocaleString() }} vnđ
            </span>
          </template>
          <template v-if="column.key === 'so_luong'">
            <span class="text-gray-600"> x {{ columnChild.so_luong }} </span>
          </template>

          <template v-if="column.key === 'total'">
            <span class="text-blue-600 font-semibold">
              {{
                (
                  columnChild.gia_Dat_hang * columnChild.so_luong
                ).toLocaleString()
              }}
              vnđ
            </span>
          </template>
        </template>
      </a-table>
      <hr />
      <h4 class="text-gray-600 mt-6 flex items-center">
        <div>Tổng đơn hàng:</div>
        <div class="w-[158px] text-left p-4 text-blue-500">
          {{ totalPrice(record.orderDetails).toLocaleString() }} vnđ
        </div>
      </h4>
    </template>
  </Table>
</template>
<script lang="ts" setup>
import adminService from "@/services/admin-service";
import { Select, Table } from "ant-design-vue";
import { SmileOutlined } from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import moment from "moment";
import { SelectValue } from "ant-design-vue/es/select";
import { toastMsgFromPromise } from "@/untils";
function totalPrice(productsCart: ProductCart[]): number {
  return (
    productsCart.reduce((init, p) => {
      return init + p.so_luong * p.gia_Dat_hang;
    }, 0) || 0
  );
}

const isLoading = ref<boolean>(false);

const StatusEnum = [
  {
    name: "NEW",
    value: "Chưa xác nhận",
  },
  {
    name: "CONFIRMED",
    value: "Đã xác nhận",
  },
  {
    name: "PICKED_UP",
    value: "Đã lấy hàng",
  },
  {
    name: "DELIVERING",
    value: "Đang giao hàng",
  },
  {
    name: "DELIVERED",
    value: "Đã giao",
  },
];

async function handleChangeStatus(value: SelectValue, order_id: string) {
  isLoading.value = true;
  const api = adminService.changeStatusOrder({
    order_id: order_id,
    status: value?.toString() || "",
  });
  const res = await toastMsgFromPromise(api);
  if (res.status == 200) {
    fetchOrder();
  }
  isLoading.value = false;
}

const innerColumns = [
  {
    title: "Tên sản phẩm",
    dataIndex: ["product_id", "ten_HH"],
    key: "product_id.ten_HH",
  },
  { title: "Đơn giá", dataIndex: "gia_Dat_hang", key: "gia_Dat_hang" },
  {
    title: "Số lượng",
    dataIndex: "so_luong",
    key: "so_luong",
  },

  { title: "Size", dataIndex: "size", key: "size" },
  {
    title: "Thành tiền",
    key: "total",
  },
];

const columns = [
  {
    title: "Mã đơn hàng",
    dataIndex: ["order", "_id"],
    key: "order._id",
  },
  {
    title: "Khách hàng",
    dataIndex: ["order", "user_id", "ho_ten_KH"],
    key: "order.user_id.ho_ten_KH",
  },
  {
    title: "Số điện thoại",
    dataIndex: ["order", "user_id", "so_dien_thoai"],
    key: "order.so_dien_thoai_dat_hang",
  },
  {
    title: "Ngày đặt",
    dataIndex: ["order", "ngay_dat_hang"],
    key: "order.ngay_dat_hang",
  },
  {
    title: "Ngày giao",
    dataIndex: ["order", "ngay_giao_hang"],
    key: "order.ngay_giao_hang",
  },
  {
    title: "Trạng thái",
    dataIndex: ["order", "trang_thai_DH"],
    key: "trang_thai_DH",
  },
];

const data = ref<any>([]);

async function fetchOrder() {
  const res = await adminService.getOrder();
  if (res.status == 200) {
    data.value =
      res.data.data?.map((order) => {
        return {
          key: order.order._id,
          ...order,
        };
      }) || [];
  }
}

onMounted(() => {
  fetchOrder();
});
</script>