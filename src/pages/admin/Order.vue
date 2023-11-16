<template>
  <div class="my-3">
    <Tabs tab-position="top" v-model:active-key="activeKey">
      <TabPane key="NEW" tab="Chờ xác nhận"></TabPane>
      <TabPane key="CONFIRMED" tab="Đã xác nhận" force-render></TabPane>
      <TabPane key="PICKED_UP" tab="Đã lấy hàng"></TabPane>
      <TabPane key="DELIVERING" tab="Đang giao hàng"></TabPane>
      <TabPane key="DELIVERED" tab="Đã giao"></TabPane>
      <TabPane key="CANCEL" tab="Đã hủy"></TabPane>
    </Tabs>
    <ManagerListOrder :data="orderFilters || []" @fetch-order="fetchOrder" />
  </div>
</template>
<script setup lang="ts">
import ManagerListOrder from "@/components/lists/ManagerListOrder.vue";
import adminService from "@/services/admin-service";
import { TabPane, Tabs } from "ant-design-vue";
import { onMounted, reactive, ref, watch, toRaw } from "vue";

type Status =
  | "NEW"
  | "CONFIRMED"
  | "CONFIRMED"
  | "PICKED_UP"
  | "DELIVERING"
  | "DELIVERED"
  | "CANCEL";

const orders = reactive<{
  data: OrderBill[] | null;
}>({ data: null });
const orderFilters = ref<OrderBill[] | null>(null);
const activeKey = ref<string>("NEW");

watch(activeKey, (newActivekey: any) => {
  const dataFilter = filter(newActivekey);
  orderFilters.value = dataFilter;
});

function filter(status: Status): OrderBill[] {
  const data = toRaw(orders.data) || [];
  return data.filter((order) => {
    return order.order.trang_thai_DH == status;
  });
}

function fetchOrder() {
  adminService
    .getOrder()
    .then((res) => {
      if (res.status == 200) {
        orders.data =
          res.data.data?.map((o) => {
            return {
              ...o,
              key: o.order._id,
            };
          }) || [];
        const dataFilter = filter("NEW");
        orderFilters.value = dataFilter;
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

onMounted(() => {
  fetchOrder();
});
</script>
