<template>
  <div v-if="!user._id" class="text-center py-6">Bạn chưa đăng nhập!!</div>

  <div v-else class="page">
    <div class="py-14 px-6 container mx-auto">
      <div class="">
        <!--  -->

        <div
          v-if="router.currentRoute.value.query?.t == 'success'"
          class="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 sm:px-3.5 shadow-md rounded-md"
        >
          <div
            class="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            aria-hidden="true"
          >
            <div
              class="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
              :style="{
                clipPath: `polygon(
                  74.8% 41.9%,
                  97.2% 73.2%,
                  100% 34.9%,
                  92.5% 0.4%,
                  87.5% 0%,
                  75% 28.6%,
                  58.5% 54.6%,
                  50.1% 56.8%,
                  46.9% 44%,
                  48.3% 17.4%,
                  24.7% 53.9%,
                  0% 27.9%,
                  11.9% 74.2%,
                  24.9% 54.1%,
                  68.6% 100%,
                  74.8% 41.9%
                )`,
              }"
            />
          </div>
          <div
            class="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            aria-hidden="true"
          >
            <div
              class="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
              :style="{
                clipPath: `polygon(
                  74.8% 41.9%,
                  97.2% 73.2%,
                  100% 34.9%,
                  92.5% 0.4%,
                  87.5% 0%,
                  75% 28.6%,
                  58.5% 54.6%,
                  50.1% 56.8%,
                  46.9% 44%,
                  48.3% 17.4%,
                  24.7% 53.9%,
                  0% 27.9%,
                  11.9% 74.2%,
                  24.9% 54.1%,
                  68.6% 100%,
                  74.8% 41.9%
                )`,
              }"
            />
          </div>
          <div class="">
            <h4
              class="text-xl text-gray-900 flex items-center gap-x-4 m-0 px-4 py-3"
            >
              <span class="font-semibold text-blue-900"
                ><CheckBadgeIcon class="w-7 h-7" /></span
              ><svg
                viewBox="0 0 2 2"
                class="mx-2 inline h-0.5 w-0.5 fill-current"
                aria-hidden="true"
              >
                <circle cx="1" cy="1" r="1" />
              </svg>
              Cám ơn bạn đã đặt hàng!! Đơn hàng sẽ sớm được giao đến bạn.
            </h4>
          </div>
        </div>
        <!--  -->
        <h1 class="text-3xl lg:text-4xl my-7 font-semibold mb-2 text-gray-800">
          Order #{{ orderData?.order._id }}
        </h1>
        <p class="text-base font-medium text-gray-600">
          {{ moment(orderData?.order.ngay_dat_hang).format("LLLL") }}
        </p>
      </div>
      <div
        class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0"
      >
        <div
          class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8"
        >
          <div
            class="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full"
          >
            <p
              class="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800"
            >
              Đơn hàng
            </p>
            <div
              class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
              v-for="o in orderData?.orderDetails"
            >
              <div class="pb-4 md:pb-8 w-full md:w-40">
                <img
                  class="w-full hidden md:block"
                  :src="o.product_id.ProductImage.url"
                  alt="dress"
                />
              </div>
              <div
                class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0"
              >
                <div
                  class="w-full flex flex-col justify-start items-start space-y-8"
                >
                  <h3
                    class="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800"
                  >
                    {{ o.product_id.ten_HH }}
                  </h3>
                  <div
                    class="flex justify-start items-start flex-col space-y-2"
                  >
                    <p
                      class="text-sm dark:text-white leading-none text-gray-800"
                    >
                      <span class="dark:text-gray-400 text-gray-300"
                        >Size:
                      </span>
                      {{ o.size }}
                    </p>
                  </div>
                </div>
                <div class="flex justify-between space-x-8 items-start w-full">
                  <p class="text-base dark:text-white xl:text-lg leading-6">
                    $ {{ o.gia_Dat_hang.toLocaleString() }}
                  </p>
                  <p
                    class="text-base dark:text-white xl:text-lg leading-6 text-gray-800"
                  >
                    {{ o.so_luong < 10 ? `0${o.so_luong}` : o.so_luong }}
                  </p>
                  <p
                    class="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800"
                  >
                    $ {{ (o.so_luong * o.gia_Dat_hang).toLocaleString() }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8"
          >
            <div
              class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6"
            >
              <h3
                class="text-xl dark:text-white font-semibold leading-5 text-gray-800"
              >
                Tổng quan
              </h3>
              <div
                class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4"
              >
                <div class="flex justify-between w-full">
                  <p class="text-base dark:text-white leading-4 text-gray-800">
                    Hàng hóa
                  </p>
                  <p
                    class="text-base dark:text-gray-300 leading-4 text-gray-600"
                  >
                    ${{ totalProductPrice.toLocaleString() }}
                  </p>
                </div>
                <div class="flex justify-between items-center w-full">
                  <p class="text-base dark:text-white leading-4 text-gray-800">
                    Ship
                  </p>
                  <p
                    class="text-base dark:text-gray-300 leading-4 text-gray-600"
                  >
                    - $20.00 (100%)
                  </p>
                </div>
                <div class="flex justify-between items-center w-full">
                  <p class="text-base dark:text-white leading-4 text-gray-800">
                    Giảm giá
                  </p>
                  <p
                    class="text-base dark:text-gray-300 leading-4 text-gray-600"
                  >
                    $0
                  </p>
                </div>
              </div>
              <div class="flex justify-between items-center w-full">
                <p
                  class="text-base dark:text-white font-semibold leading-4 text-gray-800"
                >
                  Tổng cộng
                </p>
                <p
                  class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600"
                >
                  ${{ totalProductPrice.toLocaleString() }}
                </p>
              </div>
            </div>
            <div
              class="justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6"
            >
              <h3
                class="text-xl dark:text-white font-semibold leading-5 text-gray-800"
              >
                Mua sắm
              </h3>
              <div class="flex justify-between items-start w-full">
                <div class="flex justify-center items-center space-x-4">
                  <div class="w-8 h-8 text-white flex items-center">
                    <PlusIcon class="w-6 h-6" />
                  </div>
                  <div
                    class="flex flex-col justify-start items-center text-white"
                  >
                    Điểm số
                  </div>
                </div>
                <p class="text-lg font-semibold dark:text-white text-gray-800">
                  + 10
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="w-[554px]">
          <div
            class="bg-gray-50 dark:bg-gray-800 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col"
          >
            <h3
              class="text-xl dark:text-white font-semibold leading-5 text-gray-800"
            >
              Khách hàng
            </h3>
            <div class="flex flex-col justify-start w-full">
              <div class="">
                <div
                  class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200"
                >
                  <img
                    class="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div class="flex justify-start items-start flex-col gap-2">
                    <p
                      class="text-base mb-0 dark:text-white font-semibold text-left text-gray-800"
                    >
                      {{ orderData?.order.user_id.ho_ten_KH }}
                    </p>
                    <p
                      class="text-sm mb-0 dark:text-gray-300 leading-5 text-gray-600"
                    >
                      {{ orderData?.order.user_id.dia_chi }}
                    </p>
                  </div>
                </div>

                <div
                  class="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full"
                >
                  <PhoneIcon class="w-5 h-5" />

                  <p class="cursor-pointer text-sm mb-0">
                    {{ orderData?.order.user_id.so_dien_thoai }}
                  </p>
                </div>
              </div>
              <div
                class="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0"
              >
                <div
                  class="flex justify-center md:justify-start space-y-6 flex-col items-center md:items-start"
                >
                  <div
                    class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8"
                  >
                    <p
                      class="text-base mb-0 dark:text-white font-semibold leading-1 text-center md:text-left text-gray-800"
                    >
                      Địa chỉ nhận hàng
                    </p>
                    <p
                      class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600"
                    >
                      {{ orderData?.order.dia_chi_nhan }}
                    </p>
                  </div>
                  <div
                    class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4"
                  >
                    <p
                      class="text-base mb-0 dark:text-white font-semibold leading-1 text-center md:text-left text-gray-800"
                    >
                      Số điện thoại nhận hàng
                    </p>
                    <p
                      class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600"
                    >
                      {{ orderData?.order.so_dien_thoai_dat_hang }}
                    </p>
                  </div>

                  <div class="flex items-center gap-4">
                    <p
                      class="mb-0 text-base dark:text-white font-semibold text-center md:text-left text-gray-800"
                    >
                      Trạng thái đơn hàng
                    </p>
                    <p
                      :class="` mb-0 bg-white rounded-md x px-4 py-2 text-center md:text-left text-sm  ${
                        orderData?.order.trang_thai_DH == 'NEW'
                          ? 'text-yellow-600 '
                          : `${
                              orderData?.order.trang_thai_DH == 'CANCEL'
                                ? 'text-red-600 '
                                : 'text-blue-600 '
                            }`
                      }`"
                    >
                      {{
                        StatusEnum.find(
                          (s) => s.name == orderData?.order.trang_thai_DH,
                        )?.value
                      }}
                    </p>
                  </div>

                  <router-link to="/" class="py-2 text-blue-600"
                    >Tiếp tục mua sắm</router-link
                  >
                </div>
                <div
                  class="flex w-full justify-center items-center md:justify-start md:items-start"
                >
                  <div class="w-full flex justify-center items-center mt-6">
                    <button
                      @click="handleCLickCancelOrder"
                      :disabled="orderData?.order.trang_thai_DH != 'NEW'"
                      class="cancel hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white"
                    >
                      Hủy đơn hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "@/hook/use-auth";
import userService from "@/services/user-service";
import { toastMsgFromPromise } from "@/untils";
import { CheckBadgeIcon, PlusIcon, PhoneIcon } from "@heroicons/vue/24/solid";
import { computed } from "@vue/reactivity";
import moment from "moment";
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const { user } = useAuth();
const orderData = ref<OrderBill | null>(null);

const router = useRouter();
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

async function handleCLickCancelOrder() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton:
        "btn btn-success text-red-400 mx-1 border border-red-500 rounded-xl px-4 py-1",
      cancelButton: "btn btn-danger mx-1",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons.fire({
    title: "Bạn có muốn hủy đơn hàng này này?",
    confirmButtonText: "Đồng ý",
    text: "Đơn hàng sẽ bị hủy và không thể khôi phục!",
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "Không hủy!",
    reverseButtons: true,
    showLoaderOnConfirm: true,
    allowOutsideClick: () => !Swal.isLoading(),
    preConfirm: async () => {
      const api = userService.cancelOrder(
        router.currentRoute.value.params?._id?.toString(),
      );
      const res = await toastMsgFromPromise(api);
      if (res.status == 200) {
        router.push(`/order/${router.currentRoute.value.params._id}`);
        fetchOrder();
      }
    },
  });
  // .then(async (result) => {
  //   Swal.isLoading();
  //   if (result.isConfirmed) {
  //   } else if (result.isDenied) {
  //     Swal.fire("Thay đổi chưa được lưu", "", "info");
  //   }
  // });
}

function fetchOrder() {
  const { _id } = router.currentRoute.value.params;
  userService
    .getOrderDetail(_id.toString())
    .then((res) => {
      orderData.value = res.data?.data || null;
    })
    .catch((err) => {
      console.log(err);
    });
}

const totalProductPrice = computed((): number => {
  return (
    orderData.value?.orderDetails.reduce((init, p) => {
      return init + p.so_luong * p.gia_Dat_hang;
    }, 0) || 0
  );
});

onMounted(() => {
  console.log(router);
  fetchOrder();
});
</script>
