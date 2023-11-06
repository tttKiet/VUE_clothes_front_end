<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-50" @close="handleClose">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enter-to="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 md:scale-100"
            leave-to="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          >
            <DialogPanel
              class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl"
            >
              <div
                class="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8"
              >
                <button
                  type="button"
                  class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                  @click="handleClose"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>

                <div
                  class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8"
                >
                  <div
                    class="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5"
                  >
                    <img
                      :src="product.ProductImage.url"
                      :alt="product.ten_HH"
                      class="object-cover object-center"
                    />
                  </div>
                  <div class="sm:col-span-8 lg:col-span-7">
                    <h2 class="text-2xl font-bold text-gray-900 sm:pr-12">
                      {{ product.ten_HH }}
                    </h2>

                    <section aria-labelledby="information-heading" class="mt-2">
                      <h3 id="information-heading" class="sr-only">
                        Product information
                      </h3>

                      <p class="text-2xl text-pink-500 flex items-center gap-2">
                        <CurrencyDollarIcon class="w-6 h-6" />
                        {{ product.gia.toLocaleString() }}
                      </p>

                      <!-- Reviews -->
                      <div class="mt-6">
                        <h4 class="sr-only">Reviews</h4>
                        <div class="flex items-center">
                          <div class="flex items-center">
                            <StarIcon
                              v-for="rating in [0, 1, 2, 3, 4]"
                              :key="rating"
                              :class="[
                                'text-gray-900',
                                'h-5 w-5 flex-shrink-0',
                              ]"
                              aria-hidden="true"
                            />
                          </div>
                          <p class="sr-only">4 out of 5 stars</p>
                          <a
                            href="#"
                            class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >400 đánh giá</a
                          >
                        </div>
                      </div>
                    </section>

                    <section aria-labelledby="options-heading" class="mt-10">
                      <h3 id="options-heading" class="sr-only">
                        Product options
                      </h3>

                      <form>
                        <!-- Sizes -->
                        <div class="my-10">
                          <div class="flex items-center justify-between">
                            <h4 class="text-sm font-medium text-gray-900">
                              Size
                            </h4>
                            <a
                              href="#"
                              class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                              >Bảng chọn size</a
                            >
                          </div>

                          <RadioGroup v-model="selectedSize" class="mt-4">
                            <RadioGroupLabel class="sr-only"
                              >Chọn size</RadioGroupLabel
                            >
                            <div class="grid grid-cols-4 gap-4">
                              <RadioGroupOption
                                as="template"
                                v-for="size in sizes"
                                :key="size.name"
                                :value="size"
                                :disabled="!size.inStock"
                                v-slot="{ active, checked }"
                              >
                                <div
                                  :class="[
                                    size.inStock
                                      ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                      : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                    active ? 'ring-2 ring-indigo-500' : '',
                                    'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1',
                                  ]"
                                >
                                  <RadioGroupLabel as="span">{{
                                    size.name
                                  }}</RadioGroupLabel>
                                  <span
                                    v-if="size.inStock"
                                    :class="[
                                      active ? 'border' : 'border-2',
                                      checked
                                        ? 'border-indigo-500'
                                        : 'border-transparent',
                                      'pointer-events-none absolute -inset-px rounded-md',
                                    ]"
                                    aria-hidden="true"
                                  />
                                  <span
                                    v-else
                                    aria-hidden="true"
                                    class="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                  >
                                    <svg
                                      class="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                      viewBox="0 0 100 100"
                                      preserveAspectRatio="none"
                                      stroke="currentColor"
                                    >
                                      <line
                                        x1="0"
                                        y1="100"
                                        x2="100"
                                        y2="0"
                                        vector-effect="non-scaling-stroke"
                                      />
                                    </svg>
                                  </span>
                                </div>
                              </RadioGroupOption>
                            </div>
                          </RadioGroup>
                        </div>

                        <!-- Số lượng -->
                        <div>
                          <h4 class="text-sm font-medium text-gray-900">
                            Số lượng
                          </h4>
                          <InputNumberChoose
                            :handle-change="handleChangeNumber"
                            :number="number"
                          />
                        </div>

                        <div class="flex items-center gap-2 my-10">
                          <span class="text-sm font-medium text-gray-900">
                            Tổng cộng:
                          </span>
                          <span class="font-semibold flex gap-1 items-center">
                            <CurrencyDollarIcon class="w-6 h-6" />
                            {{ total.toLocaleString() }}</span
                          >
                        </div>

                        <button
                          type="submit"
                          class="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Thêm vào giỏ hàng
                        </button>
                      </form>
                    </section>
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
import { ref } from "vue";

import {
  Dialog,
  DialogPanel,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { StarIcon } from "@heroicons/vue/20/solid";
import InputNumberChoose from "./InputNumberChoose.vue";
import { CurrencyDollarIcon } from "@heroicons/vue/24/outline";
import { ValueType } from "ant-design-vue/es/input-number/src/utils/MiniDecimal";
import { computed } from "vue";
const props = defineProps<{
  open: boolean;
  handleClose: () => void;
  product: Product;
}>();
// const product = {
//   name: "Basic Tee 6-Pack ",
//   price: "$192",
//   rating: 3.9,
//   reviewCount: 117,
//   href: "#",
//   imageSrc:
//     "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
//   imageAlt: "Two each of gray, white, and black shirts arranged on table.",
//   colors: [
//     { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
//     { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
//     { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
//   ],
//   sizes: [
//     { name: "XXS", inStock: true },
//     { name: "XS", inStock: true },
//     { name: "S", inStock: true },
//     { name: "M", inStock: true },
//     { name: "L", inStock: true },
//     { name: "XL", inStock: true },
//     { name: "XXL", inStock: true },
//     { name: "XXXL", inStock: false },
//   ],
// };

const sizes = [
  { name: "XXS", inStock: true },
  { name: "XS", inStock: true },
  { name: "S", inStock: true },
  { name: "M", inStock: true },
  { name: "L", inStock: true },
  { name: "XL", inStock: true },
  { name: "XXL", inStock: true },
  { name: "XXXL", inStock: false },
];
function handleChangeNumber(value: ValueType) {
  number.value = value;
}

const total = computed(() => {
  return (
    Number.parseFloat(number.value.toString()) *
    Number.parseFloat(props.product.gia.toString())
  );
});

const number = ref<ValueType>(1);
const selectedSize = ref(sizes[2]);
</script>