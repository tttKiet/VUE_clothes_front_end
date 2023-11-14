<template>
  <TransitionRoot appear :show="open" as="template">
    <Dialog as="div" @close="toggleShowModal" class="relative z-40">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full container max-w-[1024px] transform text-left align-middle shadow-xl transition-all"
            >
              <div class="mt-2 grid grid-cols-12 gap-1">
                <div
                  class="p4 col-span-7 border-r-2 border-transparent flex flex-col justify-between bg-white overflow-hidden rounded-l-2xl p-6 pr-1"
                >
                  <DialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900 text-center"
                  >
                    Xác nhận đơn hàng
                  </DialogTitle>
                  <div class="flex-1">
                    <h4>Hàng hóa Order</h4>

                    <!-- Item order -->
                    <ul class="bg-white">
                      <div
                        class="divide-y pr-12 max-h-[380px] overflow-y-scroll"
                      >
                        <li
                          v-for="productCart in cartItems"
                          :key="productCart._id"
                          class="py-6 grid grid-cols-12 relative"
                        >
                          <ProductCartItemDetails :productCart="productCart" />
                        </li>
                        <hr />
                      </div>
                      <div
                        :class="[
                          'py-6 pb-4',
                          totalProduct >= 3 ? 'pr-[calc(3rem+4px)]' : 'pr-12',
                        ]"
                      >
                        <div
                          class="pb-3 flex items-center gap-1 justify-between"
                        >
                          <span>Tổng mặc hàng:</span>
                          <span class="">{{ totalProduct }}</span>
                        </div>
                        <div
                          class="pb-3 flex items-center gap-1 justify-between"
                        >
                          <span>Tổng số lượng:</span>
                          <span class="">{{ totalProductRaw }}</span>
                        </div>

                        <div
                          class="flex items-center gap-1 text-black font-semibold justify-between"
                        >
                          <span>Giá trị đơn hàng (ship + tổng giá): </span>
                          <span class=""
                            >${{ totalPrice.toLocaleString() }}</span
                          >
                        </div>
                      </div>
                    </ul>
                  </div>
                  <div class="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      class="transition-all inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      @click="toggleShowModal"
                    >
                      Hủy
                    </button>
                    <button
                      type="button"
                      class="transition-all inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      @click="handleConfirm"
                    >
                      Xác nhận đặt hàng
                    </button>
                  </div>
                </div>
                <div
                  class="p4 col-span-5 overflow-hidden bg-white rounded-r-2xl p-6"
                >
                  <div class="divide-y">
                    <div class="py-6">
                      <h4
                        class="mb-0 font-semibold text-black flex items-center gap-1"
                      >
                        <BanknotesIcon class="w-5 h-5 relative -top-[1px]" />
                        Thông tin đơn đặt hàng
                      </h4>
                      <div class="py-4 flex items-center gap-2">
                        <span class="mb-0 text-gray-600">Ngày đặt hàng:</span>
                        <span class="">{{
                          new Date().toLocaleDateString()
                        }}</span>
                      </div>
                    </div>
                    <div class="py-6">
                      <h4
                        class="mb-0 font-semibold text-black flex items-center gap-1"
                      >
                        <UserIcon class="w-5 h-5 relative -top-[1px]" />
                        Thông tin khách hàng
                      </h4>
                      <div class="py-1 pt-3 flex items-center gap-2">
                        <span class="mb-0 min-w-[202px] text-gray-600"
                          >Tên khách hàng:</span
                        >
                        <span class="flex-1 text-pink-500">{{
                          user.ho_ten_KH
                        }}</span>
                      </div>
                      <div class="py-1 flex items-center gap-2">
                        <span class="mb-0 min-w-[202px] text-gray-600"
                          >Số điện thoại nhận hàng:</span
                        >
                        <span class="flex-1">
                          <Input
                            v-model:value="userInforPayment.so_dien_thoai"
                            placeholder="Nhập số điện thoại nhận hàng..."
                        /></span>
                      </div>
                      <div class="py-1">
                        <span class="min-w-[202px] text-gray-600 mb-2 block"
                          >Địa chỉ nhận hàng:</span
                        >
                        <span class="flex-1">
                          <Input.TextArea
                            v-model:value="userInforPayment.dia_chi"
                            placeholder="Nhập địa chỉ nhận hàng..."
                          />
                        </span>
                      </div>
                    </div>
                    <div class="py-6">
                      <h4
                        class="mb-0 text-black font-semibold flex items-center gap-1"
                      >
                        <CreditCardIcon class="w-5 h-5 relative -top-[1px]" />
                        Phương thức thanh toán
                      </h4>
                      <div class="py-4 flex items-center gap-2">
                        <a-checkbox :checked="true">Khi nhận hàng</a-checkbox>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import ProductCartItemDetails from "./ProductCartItemDetails.vue";
import { useAuth } from "@/hook/use-auth";
import { Input } from "ant-design-vue";
import {
  BanknotesIcon,
  UserIcon,
  CreditCardIcon,
} from "@heroicons/vue/24/outline";
import { reactive, watch } from "vue";
const { user } = useAuth();

const props = defineProps<{
  totalPrice: number;
  totalProduct: number;
  totalProductRaw: number;
  open: boolean;
  toggleShowModal: () => void;
  cartItems: ProductCart[];
}>();

const emit = defineEmits<{
  (
    e: "confirmed",
    {
      productCartIds,
      dia_chi_nhan,
      so_dien_thoai_dat_hang,
    }: {
      productCartIds: string[];
      so_dien_thoai_dat_hang: string;
      dia_chi_nhan: string;
    },
  ): void;
}>();

function handleConfirm() {
  console.log("props.cartItems", props.cartItems);
  const productCartIds: string[] = props.cartItems.map((c) => c._id!);
  emit("confirmed", {
    productCartIds,
    dia_chi_nhan: userInforPayment.dia_chi,
    so_dien_thoai_dat_hang: userInforPayment.so_dien_thoai,
  });
}

const userInforPayment = reactive({
  so_dien_thoai: user.value.so_dien_thoai,
  dia_chi: user.value.dia_chi,
});

watch(user, (user) => {
  userInforPayment.so_dien_thoai = user.so_dien_thoai;
  userInforPayment.dia_chi = user.dia_chi;
});
</script>