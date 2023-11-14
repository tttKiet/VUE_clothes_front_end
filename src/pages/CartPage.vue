<template>
  <div class="relative min-h-screen bg-gray-900 overflow-hidden">
    <svg
      viewBox="0 0 1024 1024"
      class="absolute left-0 top-1/2 z-0 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
      aria-hidden="true"
    >
      <circle
        cx="512"
        cy="512"
        r="512"
        fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
        fill-opacity="0.7"
      />
      <defs>
        <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
          <stop stop-color="#7775D6" />
          <stop offset="1" stop-color="#E935C1" />
        </radialGradient>
      </defs>
    </svg>
    <div
      v-if="!user._id"
      class="min-h-screen flex items-center justify-center mx-auto text-white"
    >
      Bạn chưa đăng nhập
    </div>

    <div v-else class="container mx-auto px-2 py-10">
      <div
        v-if="products?.length === 0"
        class="text-center flex-1 px-8 py-12 pt-16 flex-wrap divide-gray-200 rounded-2xl shadow-md shadow-gray bg-white"
      >
        Giỏ hàng trống... hãy thêm hàng hóa vào giỏ hàng!
        <br />
        <RouterLink to="/"
          ><div class="mt-4 text-blue-500 font-medium">Thêm sản phẩm ngay</div>
        </RouterLink>
        <div
          class="min-h-[300px] mt-5 rounded-xl text-gray-500 flex items-center justify-center"
        >
          <img :src="cart_empty" />
        </div>
      </div>
      <div v-else>
        <div
          class="my-5 flex justify-between items-center text-sm text-gray-500"
        >
          <router-link
            to="/"
            class="font-medium text-white transition-all hover:text-indigo-500 w-[140px]"
          >
            <span aria-hidden="true" class="mr-1"> &larr;</span>
            Tiếp tục mua sắm
          </router-link>
          <h4
            class="text-white text-xl mb-0 font-semibold flex text-center items-center gap-2"
          >
            <ShoppingCartIcon class="w-6 h-6" />
            Giỏ hàng của bạn
          </h4>
          <div class="w-[140px]"></div>
        </div>

        <div class="flex gap-5">
          <div
            class="p-2 rounded-2xl pr-1 shadow-gray bg-white flex-1 px-8 py-6 flex-wrap shadow-md"
          >
            <ul
              class="divide-y divide-gray-200 max-h-[700px] pr-8 overflow-y-scroll"
            >
              <li class="grid grid-cols-12 py-3 pb-6 font-semibold">
                <div class="col-span-1">
                  <Checkbox
                    v-model:checked="checkOrder.checkAll"
                    @change="onCheckAllChange"
                    class="flex items-center text-sm"
                  >
                    All
                  </Checkbox>
                </div>
                <div class="col-span-4 flex items-center">Hàng hóa</div>
                <div class="col-span-2 flex items-center">Giá</div>
                <div class="col-span-3 flex items-center">Số lượng</div>
                <div class="col-span-2 flex items-center">Tổng</div>
              </li>
              <li
                v-for="product in products"
                :key="product.product_id._id"
                class="py-6 grid grid-cols-12 relative"
              >
                <ProductCartItem
                  :checked="
                    checkOrder.checkedList.some((p) => product._id == p)
                  "
                  @change-check-order="onChangeOrderCheck"
                  :loading="loading"
                  :product="product"
                  @setLoading="setLoading"
                  @delete-product="deleteProduct"
                  @fetch-product="fetchProduct"
                />
              </li>
            </ul>
          </div>

          <div>
            <div
              class="min-w-[340px] rounded-2xl shadow-md bg-white px-6 py-4 pb-6"
            >
              <div class="my-1">
                <h3 class="mb-6 font-medium text-black text-xl text-center">
                  Tổng quát
                </h3>
              </div>
              <div class="flex items-center justify-between gap-1 py-2">
                <span>Tổng mặc hàng</span>
                <span>{{ totalProduct }}</span>
              </div>
              <div class="flex items-center justify-between gap-1 py-2">
                <span>Số lượng sản phẩm</span>
                <span>{{ totalProductRaw }}</span>
              </div>
              <div class="flex items-center justify-between gap-1 py-2">
                <span>Ship</span>
                <span>$0</span>
              </div>
              <div class="flex items-center justify-between gap-1 py-2">
                <span>Giảm giá</span>
                <span>0%</span>
              </div>
              <hr class="my-2" />
              <div class="flex items-center justify-between gap-1 py-2">
                <span class="font-semibold">Tổng cộng</span>
                <span class="font-semibold"
                  >${{ totalPrice.toLocaleString() }}</span
                >
              </div>
              <div class="mt-4">
                <Button
                  type="primary"
                  :disabled="productOrderConfirm.length == 0"
                  html-type="button"
                  @click="order"
                  class="w-full"
                  >Đặt hàng</Button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ModalConfirmOrder
    @confirmed="handleConfirmOrder"
    :total-product="totalProduct"
    :total-product-raw="totalProductRaw"
    :totalPrice="totalPrice"
    :cart-items="productOrderConfirm"
    :open="isOpenModalConfirm"
    :toggle-show-modal="toggleModalConfirm"
  />
</template>
<script setup lang="ts">
import cartService from "@/services/cart-service";
import { computed, onMounted, reactive, ref, watch } from "vue";
import ProductCartItem from "@/components/ProductCartItem.vue";
import { useAuth } from "@/hook/use-auth";
import { Button, Checkbox } from "ant-design-vue";
import { ShoppingCartIcon } from "@heroicons/vue/24/outline";
import { RouterLink } from "vue-router";
import cart_empty from "@/assets/images/empty_cart.jpg";
import ModalConfirmOrder from "@/components/ModalConfirmOrder.vue";
import userService from "@/services/user-service";
import { toastMsgFromPromise } from "@/untils";
const { user } = useAuth();

const loading = ref(false);

const isOpenModalConfirm = ref(false);

function toggleModalConfirm() {
  isOpenModalConfirm.value = !isOpenModalConfirm.value;
}

async function handleConfirmOrder(data: {
  productCartIds: string[];
  so_dien_thoai_dat_hang: string;
  dia_chi_nhan: string;
}) {
  loading.value = true;
  const api = userService.orderProductInCart(data);
  const res = await toastMsgFromPromise(api);
  if (res.status == 200) {
    fetchProduct();
    toggleModalConfirm();
  }
  loading.value = false;
}

function setLoading(isLoading: boolean) {
  loading.value = isLoading;
}

const products = ref<ProductCart[]>();
function fetchProduct() {
  cartService
    .getProduct()
    .then((res) => {
      console.log("res", res.data);

      if (res.status === 200) {
        products.value = res.data.data;
      }
    })
    .catch((err) => console.log(err));
}

async function deleteProduct({ product_id }: { product_id: string }) {
  cartService
    .deleteProduct({ product_id: product_id })
    .then((res) => {
      if (res.status === 200) {
        fetchProduct();
        console.log("Removed product in cart ....");
      }
    })
    .catch((err) => console.log(err));
}

const plainOptions = computed(
  (): string[] => products.value?.map((product) => product._id!) || [],
);

function order() {
  toggleModalConfirm();
}

const totalProduct = computed((): number => checkOrder.checkedList.length);
const totalProductRaw = computed(
  (): number =>
    products.value
      ?.filter((p) => checkOrder.checkedList.includes(p._id!))
      .reduce((init, p) => {
        return init + p.so_luong;
      }, 0) || 0,
);

const productOrderConfirm = computed(
  (): ProductCart[] =>
    products.value?.filter((p) => checkOrder.checkedList.includes(p._id!)) ||
    [],
);
const checkOrder = reactive<{
  checkAll: boolean;
  checkedList: string[];
}>({
  checkAll: false,
  checkedList: [],
});

const totalPrice = computed((): number => {
  return (
    products.value
      ?.filter((p) => checkOrder.checkedList.includes(p._id!))
      .reduce((init, p) => {
        return init + p.so_luong * p.product_id.gia;
      }, 0) || 0
  );
});

function onChangeOrderCheck({
  cart_id,
  checked,
}: {
  cart_id: string;
  checked: boolean;
}) {
  const existed = checkOrder.checkedList.some((c) => c == cart_id);
  if (checked) {
    if (!existed) checkOrder.checkedList = [...checkOrder.checkedList, cart_id];
  } else {
    if (existed)
      checkOrder.checkedList = checkOrder.checkedList.filter(
        (c) => c != cart_id,
      );
  }
}

const onCheckAllChange = (e: any) => {
  checkOrder.checkedList = e.target.checked ? plainOptions.value : [];
};
watch(
  () => checkOrder.checkedList,
  (val) => {
    checkOrder.checkAll = val.length === plainOptions.value.length;
  },
);

onMounted(() => {
  fetchProduct();
});
</script>