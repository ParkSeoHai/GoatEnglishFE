<script setup>
import Header2 from "@/components/Header2.vue";
import api from "@/utils";
import { inject, onMounted, ref, computed } from "vue";
import { toast } from "vue3-toastify";

const URL_API = inject("URL_API");
const handleErrorAPI = inject("handleErrorAPI");
const getInfoUser = inject("getInfoUser");

const user = ref();
const progresses = ref([]);

const dataModal = ref();
const showModal = ref(false);

const lessonsBeforeCurrentLevel = computed(() => (currentOrder) => {
  return progresses.value
    .slice(0, currentOrder - 1) // Lấy các cấp trước đó
    .reduce((total, p) => total + p.lessons.length, 0); // Tính tổng số bài
});

const getAllProgressByTopic = async (topic_id) => {
  try {
    const res = await api.get(`${URL_API}/api/progress/topic/${topic_id}`);
    // send success
    if (!res || res?.status !== 200) {
      toast.error(res?.data?.message);
      return;
    }
    progresses.value = res.data?.data;
    console.log(progresses.value);
  } catch (error) {
    handleErrorAPI(error);
  }
};

const openModal = (data) => {
  dataModal.value = data;
  showModal.value = true;
};

const init = async () => {
  user.value = await getInfoUser();
  // get data progress
  await getAllProgressByTopic(user.value?.topic?._id);
};

onMounted(() => {
  init();
});
</script>

<template>
  <div id="progress">
    <Header2 :user="user" />
    <div class="progress-content page-container">
      <div class="mt-4 flex justify-between">
        <div class="flex flex-col gap-3">
          <p class="text-[24px] font-bold">Hành trình học của tôi</p>
          <p class="font-bold">Đã bắt đầu học 3 thg 2, 2025</p>
          <p class="mt-2 progress-desc">
            Theo dõi tiến độ của bạn theo cấp độ và giai đoạn - giành điểm cho mỗi từ bạn
            học, mỗi video bạn xem và mỗi cuộc trò chuyện cùng MemBot để tiếp tục lên cấp!
          </p>
        </div>
        <RouterLink to="/topic" class="text-center font-bold"
          >Chủ đề: {{ user?.topic?.name }}</RouterLink
        >
      </div>
      <div class="mt-10 list-progress">
        <div v-for="progress in progresses" :key="progress._id" class="progress-item">
          <div class="flex items-center gap-4">
            <span class="icon">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.516 21a.583.583 0 0 0 .44-.186.583.583 0 0 0 .187-.442v-5.258c.138-.045.419-.127.844-.245.425-.124.984-.186 1.677-.186.857 0 1.645.085 2.364.255.72.163 1.416.356 2.09.579.673.215 1.36.408 2.06.578.7.17 1.455.255 2.266.255.712 0 1.249-.039 1.608-.117.367-.079.72-.193 1.06-.344.307-.143.552-.336.735-.578.19-.242.285-.56.285-.952V5.021a.644.644 0 0 0-.265-.55.999.999 0 0 0-.628-.196c-.229 0-.572.066-1.03.196-.451.131-1.075.197-1.873.197-.811 0-1.57-.082-2.276-.246-.7-.17-1.386-.363-2.06-.578a25.03 25.03 0 0 0-2.09-.589C9.192 3.085 8.404 3 7.548 3c-.707 0-1.24.04-1.6.118-.359.078-.712.193-1.059.343a2.01 2.01 0 0 0-.745.579c-.183.235-.275.55-.275.941v15.391c0 .17.062.317.186.442.131.124.285.186.462.186Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
            <p class="font-bold text-[18px]">{{ progress.name }}</p>
          </div>
          <div class="progress-number-list flex justify-between items-center">
            <template v-for="(lesson, index) in progress.lessons" :key="lesson._id">
              <button
                class="progress-btn"
                :class="{ active: lesson.min_score <= user.score }"
                @click="
                  openModal({
                    name: progress.name,
                    stt: lessonsBeforeCurrentLevel(progress.order) + (index + 1),
                    ...lesson,
                  })
                "
              >
                {{ lessonsBeforeCurrentLevel(progress.order) + (index + 1) }}
              </button>
              <span
                v-if="index < progress.lessons.length - 1"
                class="dot-icon"
                :class="{ active: lesson.min_score <= user.score }"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="9" fill="currentColor"></circle>
                </svg>
              </span>
            </template>
          </div>
          <p class="mt-2 progress-desc">{{ progress.description }}</p>
        </div>
      </div>
    </div>
    <div
      v-if="showModal"
      class="modal-bg fixed flex justify-center items-center inset-0 h-[100vh] w-[100vw]"
      style="background: rgba(41, 55, 73, 0.8)"
      @click="showModal = false"
    >
      <div
        class="modal-container w-[560px] min-h-[350px] py-8 px-10 bg-white rounded-3xl overflow-auto"
        @click.stop=""
      >
        <div class="flex flex-col gap-8">
          <div class="flex items-center justify-center gap-3">
            <span class="icon">
              <svg
                viewBox="0 0 24 24"
                width="32"
                height="32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.516 21a.583.583 0 0 0 .44-.186.583.583 0 0 0 .187-.442v-5.258c.138-.045.419-.127.844-.245.425-.124.984-.186 1.677-.186.857 0 1.645.085 2.364.255.72.163 1.416.356 2.09.579.673.215 1.36.408 2.06.578.7.17 1.455.255 2.266.255.712 0 1.249-.039 1.608-.117.367-.079.72-.193 1.06-.344.307-.143.552-.336.735-.578.19-.242.285-.56.285-.952V5.021a.644.644 0 0 0-.265-.55.999.999 0 0 0-.628-.196c-.229 0-.572.066-1.03.196-.451.131-1.075.197-1.873.197-.811 0-1.57-.082-2.276-.246-.7-.17-1.386-.363-2.06-.578a25.03 25.03 0 0 0-2.09-.589C9.192 3.085 8.404 3 7.548 3c-.707 0-1.24.04-1.6.118-.359.078-.712.193-1.059.343a2.01 2.01 0 0 0-.745.579c-.183.235-.275.55-.275.941v15.391c0 .17.062.317.186.442.131.124.285.186.462.186Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
            <h2 class="text-[24px] font-bold">{{ dataModal?.name }}</h2>
          </div>
          <div class="flex justify-center">
            <button
              class="progress-btn pointer-events-none"
              :class="{ active: user?.score >= dataModal?.min_score }"
              :style="{
                height: '10rem',
                width: '10rem',
                fontSize: '4.5rem',
                boxShadow: 'rgb(204, 210, 222) 0px 0.26rem 0px 0px',
                borderWidth: user?.score >= dataModal?.min_score ? '0.4rem' : '0px',
              }"
            >
              {{ dataModal?.stt }}
            </button>
          </div>
          <div class="text-center">
            <h3
              v-if="user?.score > dataModal?.min_score"
              class="text-[20px] text-[#536175] font-bold mb-4"
            >
              Bạn đã hoàn thành cấp độ {{ dataModal?.stt }}
            </h3>
            <h3
              v-else-if="user?.score == dataModal?.min_score"
              class="text-[20px] text-[#536175] font-bold mb-4"
            >
              Bạn đang ở cấp độ {{ dataModal?.stt }}
            </h3>
            <h3 v-else class="text-[20px] text-[#536175] font-bold mb-4">
              Đạt cấp độ {{ dataModal?.stt }} tại {{ dataModal?.min_score }}đ
            </h3>
            <p class="text-[14px] text-[#293749] leading-6 px-5">
              Mỗi từ bạn học, mỗi video đã xem và mỗi đối thoại đã luyện tập với Membots
              sẽ mang điểm tới cho bạn
            </p>
          </div>
          <div class="text-center mt-8">
            <button
              class="btn-action"
              style="min-height: 4rem; background-color: #fb0"
              @click="showModal = false"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
