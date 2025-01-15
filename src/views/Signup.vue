<script setup>
import { ref } from "vue";

const stepCurr = ref(1);
const dataStep = ref({
  language: "",
});

const steps = ref([
  {
    text: "Register",
  },
  {
    text: "Choose plan",
  },
  {
    text: "Purchase",
  },
  {
    text: "Receive Product",
  },
]);

const languages = ref([
  {
    id: 1,
    img:
      "https://d35aaqx5ub95lt.cloudfront.net/vendor/bbe17e16aa4a106032d8e3521eaed13e.svg",
    title: "Tiếng Anh",
    desc: "12,6 Tr người học",
    key: "en",
  },
]);
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
    <ul class="steps mb-10 w-full">
      <li
        v-for="(step, index) in steps"
        :key="index"
        class="step"
        :class="{ 'step-primary': index < stepCurr }"
      >
        {{ step.text }}
      </li>
    </ul>
    <div v-if="stepCurr === 1" class="mt-[50px]">
      <h1 class="title-lv1 text-center font-bold">Tôi muốn học...</h1>
      <div class="list-card">
        <div
          class="card-item"
          v-for="language in languages"
          :key="language.id"
          :class="{ active: language.key === dataStep.language }"
          @click="dataStep.language = language.key"
        >
          <div class="flex justify-center mt-16">
            <img :src="language.img" />
          </div>
          <h2 class="title-lv2">{{ language.title }}</h2>
          <p class="mt-4 font-bold text-[#777]">{{ language.desc }}</p>
        </div>
      </div>
    </div>
    <div v-else-if="stepCurr === 2">
      <p>STEP 2</p>
    </div>
  </main>
  <footer class="footer-signup">
    <div class="footer-block page-container flex items-center justify-end">
      <button
        class="btn bg-[#55cd01] btn-next text-white rounded-lg font-bold sm:btn-sm md:btn-md lg:btn-lg"
        @click="stepCurr += 1"
      >
        Tiếp theo
      </button>
    </div>
  </footer>
</template>
