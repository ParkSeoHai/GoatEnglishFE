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

const data = reactive({
  email: "",
  otp: "",
  password: "",
  confirmPassword: "",
});

const step = ref(1);

const init = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    location.href = "/dashboard";
  }
};

const handleSendOTP = async () => {
  try {
    loading.value = true;
    const res = await axios.post(`${URL_API}/api/auth/send-otp-forgot-password`, {
      email: data.email,
    });
    const dataRes = res.data;
    // send success
    if (dataRes?.status === 200) {
      toast.success(dataRes?.message);
      step.value = 2;
    } else {
      toast.error(dataRes?.message);
    }
  } catch (error) {
    handleErrorAPI(error);
  } finally {
    loading.value = false;
  }
};

const handleVerifyOTP = async () => {
  try {
    if (!data.otp) {
      toast.error("Vui lòng nhập mã OTP");
      return;
    }
    loading.value = true;
    const res = await axios.post(`${URL_API}/api/auth/verify-otp-forgot-password`, {
      email: data.email,
      otp: data.otp,
    });
    const dataRes = res.data;
    console.log(dataRes);
    // verify success
    if (dataRes?.status === 200) {
      toast.success(dataRes?.message);
      step.value = 3;
    } else {
      toast.error(dataRes?.message);
    }
  } catch (error) {
    handleErrorAPI(error);
  } finally {
    loading.value = false;
  }
};

const handleResetPassword = async () => {
  try {
    if (!data.password || !data.confirmPassword) {
      toast.error("Vui lòng nhập mật khẩu mới và xác nhận mật khẩu mới");
      return;
    }
    if (data.password !== data.confirmPassword) {
      toast.error("Mật khẩu không khớp");
      return;
    }
    loading.value = true;
    const res = await axios.post(`${URL_API}/api/auth/reset-password`, {
      email: data.email,
      password: data.password,
    });
    const dataRes = res.data;
    // reset success
    if (dataRes?.status === 200) {
      toast.success(dataRes?.message);
      location.href = "/login";
    } else {
      toast.error(dataRes?.message);
    }
  } catch (error) {
    handleErrorAPI(error);
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
      <h1 class="title-lv1 text-center font-bold mb-10">Quên mật khẩu</h1>
      <div class="signin-input__with-icon">
        <input
          type="email"
          class="signin-input"
          style="padding: 14px 20px"
          placeholder="Nhập email"
          v-model.trim="data.email"
        />
        <img
          src="../components/icons/close.svg"
          @click="data.email = ''"
          class="signin-icon signin-icon__email"
        />
      </div>
      <div v-if="step > 1" class="signin-input__with-icon">
        <input
          type="text"
          class="signin-input"
          style="padding: 14px 20px"
          placeholder="Nhập mã OTP"
          v-model.trim="data.otp"
        />
        <img
          src="../components/icons/close.svg"
          @click="data.otp = ''"
          class="signin-icon signin-icon__email"
        />
      </div>
      <div v-if="step > 2" class="signin-input__with-icon">
        <input
          type="password"
          class="signin-input"
          style="padding: 14px 20px"
          placeholder="Nhập mật khẩu mới"
          v-model.trim="data.password"
        />
        <img
          src="../components/icons/close.svg"
          @click="data.password = ''"
          class="signin-icon signin-icon__email"
        />
      </div>
      <div v-if="step > 2" class="signin-input__with-icon">
        <input
          type="password"
          class="signin-input"
          style="padding: 14px 20px"
          placeholder="Xác nhận mật khẩu mới"
          v-model.trim="data.confirmPassword"
        />
        <img
          src="../components/icons/close.svg"
          @click="data.confirmPassword = ''"
          class="signin-icon signin-icon__email"
        />
      </div>
      <div class="signin-input__with-icon">
        <Button
          v-if="step === 1"
          :item="{ text: 'Gửi yêu cầu', style: 'font-size: 1.8rem' }"
          :loading="loading"
          :disabled="!data.email || loading"
          class="btn-next btn-primary-custom text-white w-full py-8 mt-8 rounded-lg font-bold sm:btn-sm md:btn-md lg:btn-lg"
          @click="handleSendOTP"
        />
        <Button
          v-if="step === 2"
          :item="{ text: 'Xác thực email', style: 'font-size: 1.8rem' }"
          :loading="loading"
          :disabled="!data.otp || loading"
          class="btn-next btn-primary-custom text-white w-full py-8 mt-8 rounded-lg font-bold sm:btn-sm md:btn-md lg:btn-lg"
          @click="handleVerifyOTP"
        />
        <Button
          v-if="step === 3"
          :item="{ text: 'Đặt lại mật khẩu', style: 'font-size: 1.8rem' }"
          :loading="loading"
          :disabled="!data.password || !data.confirmPassword || loading"
          class="btn-next btn-primary-custom text-white w-full py-8 mt-8 rounded-lg font-bold sm:btn-sm md:btn-md lg:btn-lg"
          @click="handleResetPassword"
        />
      </div>
    </div>
  </div>
</template>
