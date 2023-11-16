<template>
  <div v-if="data && data?.length > 0">
    <Table
      :columns="columns"
      :data-source="data || []"
      class="transition-all duration-300"
      :pagination="{
        pageSize: 2,
        total: (data || []).length,
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
        <template v-if="column.key === 'order._id'">
          <span class="text-gray-600 mr-1 font-semibold flex items-center gap-2"
            >{{ record.order._id }}
            <router-link :to="`/order/${record.order._id}`">
              <EyeIcon class="w-5 h-5" /> </router-link
          ></span>
        </template>
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
          <span class="text-pink-500 mr-1 font-semibold">{{
            StatusEnum.find((s) => s.name === record.order.trang_thai_DH)!.value
          }}</span>
        </template>
      </template>

      <template #expandedRowRender="{ record }">
        <h4 class="text-gray-600 flex items-center gap-2">
          * Chi tiết đặt hàng
        </h4>
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
                $ {{ columnChild.gia_Dat_hang.toLocaleString() }}
              </span>
            </template>
            <template v-if="column.key === 'so_luong'">
              <span class="text-gray-600"> x {{ columnChild.so_luong }} </span>
            </template>

            <template v-if="column.key === 'total'">
              <span class="text-blue-600 font-semibold">
                $
                {{
                  (
                    columnChild.gia_Dat_hang * columnChild.so_luong
                  ).toLocaleString()
                }}
              </span>
            </template>
          </template>
        </a-table>
        <hr />
        <h4 class="text-gray-600 mt-6 flex items-center">
          <div>Tổng đơn hàng:</div>
          <div class="w-[158px] text-left p-4 text-blue-500">
            $ {{ totalPrice(record.orderDetails).toLocaleString() }}
          </div>
        </h4>
      </template>
    </Table>
  </div>
  <div v-else class="text-center py-4">Không có đơn hàng nào!</div>
</template>
<script lang="ts" setup>
import { Table } from "ant-design-vue";
import { SmileOutlined } from "@ant-design/icons-vue";
import moment from "moment";
import { EyeIcon } from "@heroicons/vue/24/solid";

defineProps<{
  data: OrderBill[] | null;
}>();

function totalPrice(productsCart: ProductCart[]): number {
  return (
    productsCart.reduce((init, p) => {
      return init + p.so_luong * p.gia_Dat_hang;
    }, 0) || 0
  );
}

const StatusEnum = [
  {
    name: "NEW",
    value: "Chờ xác nhận",
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
  {
    name: "CANCEL",
    value: "Đã hủy",
  },
];

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
</script>
