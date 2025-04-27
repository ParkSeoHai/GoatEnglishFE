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
