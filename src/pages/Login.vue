<script setup lang="ts">
import img1 from "@/assets/images/img1.jpg";
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
              <form class="space-y-6" action="#" method="POST">
                <div>
                  <label
                    for="phone"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Số điện thoại</label
                  >
                  <div class="mt-2">
                    <input
                      id="phone"
                      name="phone"
                      type="phone"
                      autocomplete="phone"
                      placeholder="Vd: 0123456789"
                      required
                      class="block w-full rounded-lg px-3 py-1.5 outline-none transition-all duration-200 text-gray-900 shadow border placeholder:text-gray-400 focus:border-blue-500 sm:text-sm sm:leading-6"
                    />
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
                  <div class="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autocomplete="current-password"
                      required
                      class="block w-full rounded-lg px-3 py-1.5 outline-none transition-all duration-200 text-gray-900 shadow border placeholder:text-gray-400 focus:border-blue-500 sm:text-sm sm:leading-6"
                    />
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
              </form>

              <p class="mt-10 text-center text-sm text-gray-500">
                Not a member?
                <a
                  href="#"
                  class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  >Bắt đầu sử dụng website</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>