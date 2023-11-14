<script setup lang="ts">
import { registerValidate } from "@/yup-validate";
import userService from "@/services/user-service";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useRouter } from "vue-router";
import { toastMsgFromPromise } from "@/untils";
import logo from "@/assets/images/shirt.png";

const router = useRouter();

async function onSubmit(values: any) {
  const api = userService.register({
    ho_ten_KH: values.ho_ten_KH,
    so_dien_thoai: values.phone,
    dia_chi: values.dia_chi,
    password: values.password,
  });

  const res = await toastMsgFromPromise(api);
  if (res.status == 200) {
    router.push("/login");
  }
}
</script>

<template>
  <div class="">
    <div class="">
      <div
        class="grid grid-cols-12 px-6 py-8 mx-auto bg-white md:min-h-screen lg:py-0"
      >
        <div
          class="p-6 col-span-5 overflow-hidden flex justify-center items-center"
        >
          <div aria-hidden="true" class="pointer-events-none">
            <div class="">
              <div class="flex items-center space-x-6 lg:space-x-8">
                <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                  <div
                    class="h-44 w-36 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100"
                  >
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                      alt=""
                      class="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div class="h-44 w-36 overflow-hidden rounded-lg">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                      alt=""
                      class="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
                <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                  <div class="h-44 w-36 overflow-hidden rounded-lg">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                      alt=""
                      class="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div class="h-44 w-36 overflow-hidden rounded-lg">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                      alt=""
                      class="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div class="h-44 w-36 overflow-hidden rounded-lg">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                      alt=""
                      class="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
                <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                  <div class="h-44 w-36 overflow-hidden rounded-lg">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                      alt=""
                      class="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div class="h-44 w-36 overflow-hidden rounded-lg">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                      alt=""
                      class="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-7 flex items-center">
          <div
            class="flex flex-1 min-h-full flex-col justify-center px-6 py-12 lg:px-8"
          >
            <div class="sm:w-full">
              <div class="flex justify-center">
                <img class="h-14 w-auto" :src="logo" alt="Logo" />
              </div>
              <h2
                class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
              >
                Đăng ký thành viên mới
              </h2>
            </div>

            <div class="mt-10 sm:w-full">
              <Form
                @submit="onSubmit"
                :validation-schema="registerValidate"
                class="gap-4 grid grid-cols-1 md:grid-cols-2"
              >
                <div class="">
                  <label
                    for="ho_ten_KH"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Họ và tên</label
                  >
                  <div class="mt-2 min-h-[70px]">
                    <Field
                      id="ho_ten_KH"
                      name="ho_ten_KH"
                      type="ho_ten_KH"
                      autocomplete="ho_ten_KH"
                      placeholder="Vd: Nguyen Van A"
                      required
                      class="block w-full rounded-lg px-3 py-1.5 outline-none transition-all duration-200 text-gray-900 shadow border placeholder:text-gray-400 focus:border-blue-500 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      class="field-error pt-1 block"
                      name="ho_ten_KH"
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="phone"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Số điện thoại</label
                  >
                  <div class="mt-2 min-h-[70px]">
                    <Field
                      id="phone"
                      name="phone"
                      type="phone"
                      autocomplete="phone"
                      placeholder="Vd: 0123456789"
                      required
                      class="block w-full rounded-lg px-3 py-1.5 outline-none transition-all duration-200 text-gray-900 shadow border placeholder:text-gray-400 focus:border-blue-500 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage class="field-error pt-1 block" name="phone" />
                  </div>
                </div>
                <div>
                  <label
                    for="dia_chi"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Địa chỉ</label
                  >
                  <div class="mt-2 min-h-[70px]">
                    <Field
                      id="dia_chi"
                      name="dia_chi"
                      type="dia_chi"
                      autocomplete="dia_chi"
                      placeholder="Vd: Nhập địa chỉ của bạn"
                      required
                      class="block w-full rounded-lg px-3 py-1.5 outline-none transition-all duration-200 text-gray-900 shadow border placeholder:text-gray-400 focus:border-blue-500 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      class="field-error pt-1 block"
                      name="dia_chi"
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="password"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Mật khẩu</label
                  >
                  <div class="mt-2 min-h-[70px]">
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Mật khẩu của bạn"
                      autocomplete="current-password"
                      required
                      class="block w-full rounded-lg px-3 py-1.5 outline-none transition-all duration-200 text-gray-900 shadow border placeholder:text-gray-400 focus:border-blue-500 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      class="field-error pt-1 block"
                      name="password"
                    />
                  </div>
                </div>

                <div>
                  <div class="flex items-center justify-between">
                    <label
                      for="re-password min-h-[70px]"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >Nhập lại mật khẩu</label
                    >
                  </div>
                  <div class="mt-2 min-h-[70px]">
                    <Field
                      id="re-password"
                      name="re-password"
                      type="re-password"
                      placeholder="Nhập lại mật khẩu của bạn"
                      required
                      class="block w-full rounded-lg px-3 py-1.5 outline-none transition-all duration-200 text-gray-900 shadow border placeholder:text-gray-400 focus:border-blue-500 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      class="field-error pt-1 block"
                      name="re-password"
                    />
                  </div>
                </div>

                <div class="col-span-2">
                  <button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Đăng ký
                  </button>
                </div>
              </Form>

              <p class="mt-10 text-center text-sm text-gray-500">
                Bạn đã có tài khoản?
                <router-link
                  to="Login"
                  class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  >Đăng nhập ngay!</router-link
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>