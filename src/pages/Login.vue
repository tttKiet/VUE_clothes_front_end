<script setup lang="ts">
import { loginValidate } from "@/yup-validate";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useAuth } from "@/hook/use-auth";
import { useRouter } from "vue-router";
const { login } = useAuth();
const router = useRouter();
async function onSubmit(values: any) {
  console.log(values);
  await login({
    so_dien_thoai: values.phone,
    password: values.password,
  });
  router.push("/");
}
</script>

<template>
  <div class="">
    <div class="">
      <div
        class="grid grid-cols-2 px-6 py-8 mx-auto bg-white md:h-screen lg:py-0"
      >
        <div class="p-6 overflow-hidden flex justify-center items-center">
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
        <div class="flex items-center">
          <div
            class="flex flex-1 min-h-full flex-col justify-center px-6 py-12 lg:px-8"
          >
            <div class="sm:w-full sm:max-w-sm">
              <div class="flex justify-center">
                <img
                  class="h-10 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                />
              </div>
              <h2
                class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
              >
                Chào mừng bạn trở lại
              </h2>
            </div>

            <div class="mt-10 sm:w-full sm:max-w-sm">
              <Form
                @submit="onSubmit"
                :validation-schema="loginValidate"
                class="space-y-1"
              >
                <div>
                  <label
                    for="phone"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Số điện thoại</label
                  >
                  <div class="min-h-[70px] mt-2">
                    <Field
                      id="phone"
                      name="phone"
                      type="phone"
                      autocomplete="phone"
                      placeholder="Vd: 0123456789"
                      required
                      class="block w-full rounded-lg px-3 py-1.5 outline-none transition-all duration-200 text-gray-900 shadow border placeholder:text-gray-400 focus:border-blue-500 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage class="field-error" name="phone" />
                  </div>
                </div>

                <div>
                  <div class="flex items-center justify-between">
                    <label
                      for="password"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >Mật khẩu</label
                    >
                    <div class="text-sm">
                      <a
                        href="#"
                        class="font-semibold text-indigo-600 hover:text-indigo-500"
                        >Quên mật khẩu?</a
                      >
                    </div>
                  </div>
                  <div class="min-h-[70px] mt-2">
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Mật khẩu của bạn"
                      required
                      class="block w-full rounded-lg px-3 py-1.5 outline-none transition-all duration-200 text-gray-900 shadow border placeholder:text-gray-400 focus:border-blue-500 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage class="field-error" name="password" />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Đăng nhập
                  </button>
                </div>
              </Form>

              <p class="mt-10 text-center text-sm text-gray-500">
                Not a member?
                <span href="#" class="font-semibold leading-6"
                  >Bắt đầu sử dụng website</span
                >
                -
                <router-link
                  class="text-indigo-600 hover:text-indigo-500 font-bold"
                  :to="{ name: 'Register' }"
                >
                  Đăng ký ngay!</router-link
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>