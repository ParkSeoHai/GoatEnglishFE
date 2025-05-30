<script setup>
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
import { useLayoutStore } from "@/stores/layout";

const { className } = defineProps(["className"]);

const route = useRoute();
const layout = useLayoutStore();

const isSidebarCollapsed = ref(false);

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
  // save the sidebar state in local storage
  if (isSidebarCollapsed.value) {
    localStorage.setItem("sidebarState", "collapsed");
  } else {
    localStorage.removeItem("sidebarState");
  }
  layout.isCollapsed = isSidebarCollapsed.value;
};

onMounted(() => {
  // check the sidebar state in local storage
  const sidebarState = localStorage.getItem("sidebarState");
  if (sidebarState === "collapsed") {
    isSidebarCollapsed.value = true;
  } else {
    isSidebarCollapsed.value = false;
  }
  layout.isCollapsed = isSidebarCollapsed.value;
});
</script>

<template>
  <div
    class="sidebar bg-white"
    :class="[
      className,
      isSidebarCollapsed ? 'collapsed' : '',
      layout.showSidebar ? 'show' : '',
    ]"
  >
    <div class="relative h-full">
      <router-link to="/dashboard" class="logo">
        <p
          class="font-bold text-logo text-logo__expanded text-[#fff] bg-[#2c3e50] p-5 rounded-3xl"
        >
          GOAT ENGLISH
        </p>
        <p
          class="text-logo__collapsed font-bold text-logo text-[#fff] bg-[#2c3e50] p-5 rounded-3xl"
        >
          G
        </p>
      </router-link>
      <div class="tab-item" :class="{ active: route.name === 'Dashboard' }">
        <router-link to="/dashboard" class="tab-item__link">
          <span class="tab-item__icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.427 21H5.582c-.86 0-1.508-.206-1.941-.617-.427-.41-.641-1.021-.641-1.832V9.928c0-.817.214-1.428.641-1.833.433-.41 1.08-.616 1.94-.616h12.846c.849 0 1.49.205 1.923.616.433.405.65 1.016.65 1.833v8.623c0 .81-.217 1.421-.65 1.832-.433.412-1.074.617-1.923.617Zm.713-14.866H4.878c.054-.337.172-.594.356-.77.184-.183.466-.275.846-.275H17.93c.38 0 .662.092.846.274.184.177.305.434.365.771ZM17.5 3.96H6.65c.03-.308.136-.545.32-.71.184-.166.454-.249.81-.249h8.6c.35 0 .617.083.801.248.19.166.297.403.32.711ZM6.973 12.432H17.02a.55.55 0 0 0 .388-.148.476.476 0 0 0 .16-.363.438.438 0 0 0-.16-.343.57.57 0 0 0-.388-.14H6.973a.584.584 0 0 0-.398.14.451.451 0 0 0-.15.344c0 .142.05.263.15.362.106.099.239.148.398.148Zm10.046 2.665H6.973a.584.584 0 0 1-.398-.139.462.462 0 0 1-.15-.353.48.48 0 0 1 .15-.353.562.562 0 0 1 .398-.148H17.02a.55.55 0 0 1 .388.148c.107.1.16.217.16.353 0 .143-.053.26-.16.353a.57.57 0 0 1-.388.14Zm-3.608 2.675H6.973a.584.584 0 0 1-.398-.14.48.48 0 0 1-.15-.353c0-.142.05-.263.15-.362a.562.562 0 0 1 .398-.148h6.438c.153 0 .28.05.379.148.106.1.16.22.16.362a.466.466 0 0 1-.16.353.534.534 0 0 1-.379.14Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
          <span class="tab-item__link--text">Trang chủ</span>
        </router-link>
      </div>
      <div class="tab-item" :class="{ active: route.name === 'Topic' }">
        <router-link to="/topic" class="tab-item__link">
          <span class="tab-item__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-stack"
              viewBox="0 0 16 16"
            >
              <path
                d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.6.6 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.6.6 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.6.6 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535z"
              />
              <path
                d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.6.6 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0z"
              />
            </svg>
          </span>
          <span class="tab-item__link--text">Chủ đề</span>
        </router-link>
      </div>
      <div class="tab-item" :class="{ active: route.name === 'Progress' }">
        <router-link to="/progress" class="tab-item__link">
          <span class="tab-item__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-graph-up-arrow"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </span>
          <span class="tab-item__link--text">Tiến độ học tập</span>
        </router-link>
      </div>
      <div class="tab-item" :class="{ active: route.name === 'Vocabulary' }">
        <router-link to="/vocabulary" class="tab-item__link">
          <span class="tab-item__icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                clip-rule="evenodd"
                d="m20.155 7.354.006-.01a1.559 1.559 0 0 0-.244-1.957l-1.303-1.285c-.469-.462-1.182-.648-1.846-.477-1.368.351-2.717.728-4.065 1.13-2.515.748-5.435 2.42-7.389 4.037-.41.338-1.974 1.154-1.677 1.793.148.318.975.5 1.322.473 1.32-.107 2.216-1.727 3.516-1.643.027.343-1.567 1.308-1.875 1.643-.527.572-1.392 1.382-1.9 1.965-.657.754.2.847.892.893.653.043.93-.475 1.388-.802.64-.455 1.204-1.012 1.853-1.476.31-.222.706-.563 1.081-.648-.226.706-.715 1.335-.914 2.078-.112.417-.087.562.21.94.593.752 1.306 1.548 2.1 2.1.21.147.676.51.972.354.256-.137.311-.793.235-1.036-.158-.502-.68-1.05-.961-1.512-.245-.403-.358-.562-.142-.972.753-1.427 2.154-3.115 4.05-1.77.35.247.116 1.42.011 1.77-.28.938-.593.848-.849 1.79-.153.564.076 1.246.849 1.121 1.066-.173 1.86-1.827 2.239-2.595.94-1.908 1.329-4.094 2.44-5.904Z"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linejoin="round"
              ></path>
              <path
                clip-rule="evenodd"
                d="M11.998 18.631c-.116-.553-.752-.591-.957-.101-.112.269-.108.617-.137.909-.033.324-.065.593.065.9.193.456.752.515 1.012.101.284-.452.129-1.307.017-1.809Z"
                stroke="currentColor"
                stroke-width=".714"
                stroke-linejoin="round"
              ></path>
            </svg>
          </span>
          <span class="tab-item__link--text">Tra cứu từ vựng</span>
        </router-link>
      </div>
      <div class="tab-item" :class="{ active: route.name === 'Chatbot' }">
        <router-link to="/chatbot" class="tab-item__link">
          <span class="tab-item__icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.6729 3.91287C16.8918 2.69392 18.8682 2.69392 20.0871 3.91287C21.3061 5.13182 21.3061 7.10813 20.0871 8.32708L14.1499 14.2643C13.3849 15.0293 12.3925 15.5255 11.3215 15.6785L9.14142 15.9899C8.82983 16.0344 8.51546 15.9297 8.29289 15.7071C8.07033 15.4845 7.96554 15.1701 8.01005 14.8586L8.32149 12.6785C8.47449 11.6075 8.97072 10.615 9.7357 9.85006L15.6729 3.91287ZM18.6729 5.32708C18.235 4.88918 17.525 4.88918 17.0871 5.32708L11.1499 11.2643C10.6909 11.7233 10.3932 12.3187 10.3014 12.9613L10.1785 13.8215L11.0386 13.6986C11.6812 13.6068 12.2767 13.3091 12.7357 12.8501L18.6729 6.91287C19.1108 6.47497 19.1108 5.76499 18.6729 5.32708ZM11 3.99929C11.0004 4.55157 10.5531 4.99963 10.0008 5.00007C9.00227 5.00084 8.29769 5.00827 7.74651 5.06064C7.20685 5.11191 6.88488 5.20117 6.63803 5.32695C6.07354 5.61457 5.6146 6.07351 5.32698 6.63799C5.19279 6.90135 5.10062 7.24904 5.05118 7.8542C5.00078 8.47105 5 9.26336 5 10.4V13.6C5 14.7366 5.00078 15.5289 5.05118 16.1457C5.10062 16.7509 5.19279 17.0986 5.32698 17.3619C5.6146 17.9264 6.07354 18.3854 6.63803 18.673C6.90138 18.8072 7.24907 18.8993 7.85424 18.9488C8.47108 18.9992 9.26339 19 10.4 19H13.6C14.7366 19 15.5289 18.9992 16.1458 18.9488C16.7509 18.8993 17.0986 18.8072 17.362 18.673C17.9265 18.3854 18.3854 17.9264 18.673 17.3619C18.7988 17.1151 18.8881 16.7931 18.9393 16.2535C18.9917 15.7023 18.9991 14.9977 18.9999 13.9992C19.0003 13.4469 19.4484 12.9995 20.0007 13C20.553 13.0004 21.0003 13.4485 20.9999 14.0007C20.9991 14.9789 20.9932 15.7808 20.9304 16.4426C20.8664 17.116 20.7385 17.7136 20.455 18.2699C19.9757 19.2107 19.2108 19.9756 18.27 20.455C17.6777 20.7568 17.0375 20.8826 16.3086 20.9421C15.6008 21 14.7266 21 13.6428 21H10.3572C9.27339 21 8.39925 21 7.69138 20.9421C6.96253 20.8826 6.32234 20.7568 5.73005 20.455C4.78924 19.9756 4.02433 19.2107 3.54497 18.2699C3.24318 17.6776 3.11737 17.0374 3.05782 16.3086C2.99998 15.6007 2.99999 14.7266 3 13.6428V10.3572C2.99999 9.27337 2.99998 8.39922 3.05782 7.69134C3.11737 6.96249 3.24318 6.3223 3.54497 5.73001C4.02433 4.7892 4.78924 4.0243 5.73005 3.54493C6.28633 3.26149 6.88399 3.13358 7.55735 3.06961C8.21919 3.00673 9.02103 3.00083 9.99922 3.00007C10.5515 2.99964 10.9996 3.447 11 3.99929Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
          <span class="tab-item__link--text">Chatbot</span>
        </router-link>
      </div>
      <button class="sidebar-collapse" title="Thu gọn" @click="toggleSidebar">
        <span class="icon">
          <svg
            width="20"
            height="32"
            viewBox="0 0 20 32"
            fill="#ccc"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.479 4.828c-.963-.849-1.9-1.747-2.844-2.618-.416-.384-.914-1.025-1.428-1.259-.63-.287-1.002.49-1.336.908-.807 1.012-1.718 1.92-2.637 2.825-.484.477-.982.938-1.465 1.416-.465.46-1.006.828-1.447 1.314-.433.477-.727 1.03-1.219 1.461a56.318 56.318 0 0 0-1.86 1.685c-.64.614-1.24 1.272-1.874 1.894-.64.627-1.165 1.29-1.742 1.97-.36.423-.97.854-1.204 1.371-.054.119-.079.315-.12.45-.041.14-.086.262-.08.412.014.412.325.733.542 1.056.343.51.63 1.05 1.062 1.493.592.608 1.25 1.164 1.86 1.757 1.21 1.18 2.303 2.515 3.684 3.504.695.497 1.271 1.038 1.855 1.665.45.481.955.866 1.441 1.303.463.414.77.943 1.216 1.37.456.437.895.905 1.378 1.31.196.165.41.3.613.455.235.178.472.531.775.54.33.012.585-.395.813-.596.195-.172.407-.323.599-.498.913-.834 1.788-1.85 2.536-2.837.166-.22.336-.434.517-.64.31-.353.337-.447.034-.809-.518-.62-1.136-1.183-1.694-1.777-.55-.586-1.146-1.127-1.739-1.668-.594-.544-1.1-1.169-1.738-1.664-.611-.473-1.21-.963-1.801-1.462-.614-.519-1.004-1.22-1.596-1.755-.346-.312-1.155-.766-.887-1.3.123-.245.346-.419.55-.59.303-.254.565-.547.86-.81.453-.406.932-.733 1.356-1.18.402-.423.816-.835 1.208-1.267.46-.506.955-.997 1.37-1.54.519-.678.963-1.303 1.6-1.878.999-.905 1.852-1.935 2.758-2.928.09-.098.235-.176.305-.288.172-.274.042-.623-.221-.795Z"
              fill="currentColor"
            ></path>
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>
