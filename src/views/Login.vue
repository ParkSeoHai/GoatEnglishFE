<script setup>
import { useLayoutStore } from "@/stores/layout";
import { onMounted, reactive, ref, inject } from "vue";
import Button from "../components/Button.vue";
import { toast } from "vue3-toastify";
import axios from "axios";

const layout = useLayoutStore();

const URL_API = inject("URL_API");
const handleErrorAPI = inject("handleErrorAPI");

const loading = ref(false);
const showPassword = ref(false);

const data = reactive({
  username: "",
  password: "",
});

const init = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    location.href = "/dashboard";
  }
};

const handleLogin = async () => {
  const toastId = toast.loading("Đang xử lý...");
  try {
    loading.value = true;
    const res = await axios.post(`${URL_API}/api/auth/login`, {
      username: data.username,
      password: data.password,
    });
    const dataRes = res.data;
    // send success
    if (dataRes?.status === 200) {
      toast.update(toastId, {
        render: dataRes?.message || "Đăng nhập thành công",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      // luu token
      localStorage.setItem("token", dataRes?.data?.token);
      let urlTarget = "/dashboard";
      if (dataRes?.data?.role === "admin") {
        urlTarget = "/admin/dashboard";
      }
      // redirect
      setTimeout(() => {
        location.href = urlTarget;
      }, 1000);
    } else {
      // toast.error(dataRes?.message);
      toast.update(toastId, {
        render: dataRes?.message,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  } catch (error) {
    handleErrorAPI(error, toastId);
    // console.error(error);
    // error?.response?.data?.errors?.forEach((error) => {
    //   toast.error(error?.message);
    // });
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  init();
  layout.show();
});
</script>

<template>
  <div id="login" class="page-container">
    <div class="login-content">
      <h1 class="title-lv1 text-center font-bold mb-10">Đăng nhập</h1>
      <div class="signin-input__with-icon">
        <input
          type="text"
          class="signin-input"
          style="padding: 14px 20px"
          placeholder="Username"
          v-model.trim="data.username"
        />
        <img
          src="../components/icons/close.svg"
          @click="data.username = ''"
          class="signin-icon signin-icon__email"
        />
      </div>
      <div class="signin-input__with-icon">
        <input
          :type="showPassword ? 'text' : 'password'"
          class="signin-input"
          placeholder="Password"
          v-model.trim="data.password"
        />
        <span
          v-if="showPassword"
          @click="showPassword = false"
          class="signin-icon signin-icon__email"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            class="bi bi-eye-slash"
            viewBox="0 0 16 16"
          >
            <path
              d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"
            />
            <path
              d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"
            />
            <path
              d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"
            />
          </svg>
        </span>
        <span v-else @click="showPassword = true" class="signin-icon signin-icon__email">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            class="bi bi-eye"
            viewBox="0 0 16 16"
          >
            <path
              d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
            />
            <path
              d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
            />
          </svg>
        </span>
      </div>
      <div class="signin-input__with-icon">
        <Button
          :item="{ text: 'Đăng nhập', style: 'font-size: 1.8rem' }"
          :loading="loading"
          class="btn-next btn-primary-custom text-white w-full py-8 mt-8 rounded-lg font-bold sm:btn-sm md:btn-md lg:btn-lg"
          @click="handleLogin"
        />
      </div>
      <div class="signin-input__with-icon text-center">
        <router-link
          to="/forgot-password"
          class="hover:decoration-slate-950 hover:underline"
        >
          Quên mật khẩu?
        </router-link>
      </div>
      <div
        class="signin-input__with-icon pt-3 text-center"
        style="border-top: 1px solid #ccc"
      >
        <Button
          :item="{
            text: 'Tạo tài khoản mới',
            style: 'font-size: 1.8rem; background-color: rgb(66, 183, 42); width: 70%',
            href: '/signup',
          }"
          class="btn-next btn-primary-custom text-white py-8 mt-8 rounded-lg font-bold sm:btn-sm md:btn-md lg:btn-lg"
        />
      </div>
    </div>
  </div>
</template>
