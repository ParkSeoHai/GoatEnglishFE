<script setup>
import { ref } from "vue";
</script>

<template>
  <header class="header-signup">
    <nav class="nav-signup page-container flex items-center justify-between">
      <div class="logo">
        <img
          src="https://d35aaqx5ub95lt.cloudfront.net/images/splash/f92d5f2f7d56636846861c458c0d0b6c.svg"
        />
      </div>
      <div
        class="language-page flex items-center text-[#afafaf] font-bold uppercase text-[15px] cursor-pointer"
      >
        <p class="text me-3">Ngôn ngữ hiển thị: Tiếng Việt</p>
        <span class="icon"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-down"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
            /></svg
        ></span>
      </div>
    </nav>
  </header>
  <main class="main-signup page-container p-[40px]">
    <div class="mt-[50px]">
      <h1 class="title-lv1 text-center font-bold">Tôi muốn học...</h1>
    </div>
  </main>
</template>
