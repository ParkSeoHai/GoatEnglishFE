<script setup>
import { ref } from "vue";

const { user } = defineProps(["user"]);

const userDropdown = ref(false);
const backgroundPopup = ref(false);

const handleClickBgPopup = () => {
  backgroundPopup.value = false;
  userDropdown.value = false;
};
</script>

<template>
  <header class="header-v2">
    <div class="flex justify-between items-center">
      <p v-if="user?.topic" class="topic-text">
        <RouterLink to="/topic"> Chủ đề: {{ user?.topic?.name }} </RouterLink>
      </p>
      <div class="actions-right ms-auto">
        <div class="action-item">
          <span>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.333 8.367a.602.602 0 0 1-.428-.168.534.534 0 0 1-.178-.403c0-.157.059-.291.178-.403a.602.602 0 0 1 .428-.168h6.885c.16 0 .3.056.419.168a.523.523 0 0 1 .187.403.523.523 0 0 1-.187.403.591.591 0 0 1-.42.168H9.334Zm0 2.386a.602.602 0 0 1-.428-.168.544.544 0 0 1 0-.807.602.602 0 0 1 .428-.168h5.226c.166 0 .309.056.428.168a.544.544 0 0 1 0 .806.602.602 0 0 1-.428.169H9.333ZM6.738 21h11.549a.686.686 0 0 0 .499-.202.61.61 0 0 0 .214-.47.646.646 0 0 0-.143-.403.731.731 0 0 0-.356-.244c-.375-.14-.646-.37-.812-.689-.16-.313-.2-.66-.116-1.041.083-.386.31-.756.678-1.109.166-.156.333-.352.5-.588.166-.235.249-.562.249-.982V5.637c0-.873-.232-1.531-.696-1.973C17.847 3.22 17.157 3 16.235 3h-9.47c-.922 0-1.615.221-2.078.664C4.229 4.1 4 4.758 4 5.637v12.768c0 .862.229 1.509.687 1.94.457.437 1.141.655 2.05.655Zm.08-1.352c-.452 0-.797-.11-1.034-.328-.232-.218-.348-.526-.348-.924 0-.375.13-.675.392-.899.268-.23.624-.344 1.07-.344h9.15c.113 0 .217-.008.312-.025-.208.437-.3.873-.276 1.31.03.443.163.846.401 1.21H6.818Zm-.267-3.772a.504.504 0 0 1-.357-.142.456.456 0 0 1-.152-.345V4.781a.43.43 0 0 1 .152-.336.503.503 0 0 1 .357-.143c.136 0 .255.048.356.143a.42.42 0 0 1 .16.336v10.608c0 .135-.053.25-.16.345a.504.504 0 0 1-.356.142Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
        </div>
        <div class="action-item">
          <div class="flex items-center">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.252 3c-2.315 2.863-4.56 5.96-4.533 8.748-.78-.232-1.06-1.62-1.118-2.913-2.717 3.638-1.674 7.907.877 10.402 2.552 2.494 6.473 2.266 8.855-.204 1.384-1.436 3.205-6.792.669-10.065-.073 1.333-.223 2.745-.913 3.26-.311-3.25-2.592-5.53-3.837-9.228Z"
                fill="#CCD2DE"
              ></path>
              <path
                d="M11.465 10.926c-1.124 1.63-1.945 3.442-1.652 5.302-.495-.149-1.04-.97-1.214-1.373-.812 2.04-.266 3.549.464 4.483.56.712 2.12 1.948 4.513.732 1.886-.958 1.764-3.211 1.145-4.626-.062.8-.482 1.496-.917 1.688.389-2.216-1.394-4.22-2.339-6.206Z"
                fill="#F6F6F6"
              ></path>
            </svg>
            <span class="text font-bold ms-3">0</span>
          </div>
        </div>
        <div class="action-item relative">
          <span class="icon" @click="(userDropdown = true), (backgroundPopup = true)">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 21c4.924 0 9-4.085 9-9 0-4.924-4.085-9-9.009-9C7.076 3 3 7.076 3 12c0 4.915 4.085 9 9 9Zm0-5.991c-2.647 0-4.694.944-5.585 2.003A7.453 7.453 0 0 1 4.509 12c0-4.165 3.317-7.5 7.482-7.5s7.5 3.335 7.509 7.5a7.45 7.45 0 0 1-1.906 5.02c-.891-1.058-2.938-2.011-5.594-2.011Zm0-1.5c1.694.018 3.027-1.43 3.027-3.327 0-1.782-1.333-3.264-3.027-3.264-1.694 0-3.035 1.482-3.026 3.264.008 1.897 1.332 3.31 3.026 3.327Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
          <div v-if="userDropdown" class="dropdown-header">
            <div class="dropdown-block mt-5 cursor-default">
              <p class="mb-3 font-bold">Tài khoản của bạn:</p>
              <p>{{ user?.email }}</p>
            </div>
            <div class="dropdown-block">
              <ul>
                <li class="mb-5"><a href="#" class="dropdown-link">Cài đặt hồ sơ</a></li>
                <li><a href="#" class="dropdown-link">Cài đặt chế độ Học tập</a></li>
              </ul>
            </div>
            <div class="dropdown-block">
              <ul>
                <li><a href="#" class="dropdown-link">Trợ giúp</a></li>
              </ul>
            </div>
            <div class="dropdown-block">
              <ul>
                <li><a href="#" class="dropdown-link text-[#dc362e]">Đăng xuất</a></li>
              </ul>
            </div>
          </div>
          <div
            v-if="backgroundPopup"
            @click="handleClickBgPopup"
            class="background-popup"
          ></div>
        </div>
      </div>
    </div>
  </header>
</template>
