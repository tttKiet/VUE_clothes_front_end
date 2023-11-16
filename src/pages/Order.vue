<template>
  <div v-if="!user._id" class="text-center py-6">Bạn chưa đăng nhập!!</div>
  <div v-else class="container mx-auto my-3">
    <Tabs tab-position="top" v-model:active-key="activeKey">
      <TabPane key="NEW" tab="Chờ xác nhận"></TabPane>
      <TabPane key="CONFIRMED" tab="Đã xác nhận" force-render></TabPane>
      <TabPane key="PICKED_UP" tab="Đã lấy hàng"></TabPane>
      <TabPane key="DELIVERING" tab="Đang giao hàng"></TabPane>
      <TabPane key="DELIVERED" tab="Đã giao"></TabPane>
      <TabPane key="CANCEL" tab="Đã hủy"></TabPane>
    </Tabs>
    <ListOrder :data="orderFilters" />
  </div>
</template>
<script lang="ts" setup>
import ListOrder from "@/components/lists/ListOrder.vue";
import { useAuth } from "@/hook/use-auth";
import userService from "@/services/user-service";
import { TabPane, Tabs } from "ant-design-vue";
import { onMounted, reactive, ref, watch, toRaw } from "vue";

const { user } = useAuth();
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
  console.log(newActivekey);
  const dataFilter = filter(newActivekey);
  orderFilters.value = dataFilter;
  console.log("forderFilters", orderFilters.value);
});

function filter(status: Status): OrderBill[] {
  const data = toRaw(orders.data) || [];
  return data.filter((order) => {
    return order.order.trang_thai_DH == status;
  });
}

onMounted(() => {
  userService
    .getOrderBill()
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
});
</script>
