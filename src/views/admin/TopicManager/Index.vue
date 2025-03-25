<script setup>
import { inject, onMounted, ref, watch } from "vue";
import { toast } from "vue3-toastify";
import CreateOrUpdate from "./CreateOrUpdate.vue";
import api from "@/utils";

import { useRoute } from "vue-router";

const route = useRoute();

const URL_API = inject("URL_API");
const handleErrorAPI = inject("handleErrorAPI");
const formattedLocalTime = inject("formattedLocalTime");

const topics = ref([]);

const init = async () => {
  if (!route.query?._id) {
    topics.value = await getTopics();
  }
};

watch(
  () => route.params._id,
  async () => {
    await init();
  },
  { deep: true }
);

const getTopics = async () => {
  try {
    const res = await api.get(`${URL_API}/api/topic`);
    // send success
    if (res?.status !== 200) {
      toast.error(res?.data?.message);
      return;
    }
    return res?.data?.data;
  } catch (error) {
    handleErrorAPI(error);
  }
};

const handleDelete = async (topic_id) => {
  const result = confirm("Xác nhận xóa chủ đề");
  if (result) {
    try {
      const res = await api.delete(`${URL_API}/api/topic/${topic_id}`);
      // send success
      if (res?.status !== 200 || (res?.data?.status && !res?.data?.status !== 200)) {
        toast.error(res?.data?.message);
        return;
      }
      toast.success(res?.data?.message || "Thành công!");
      await init();
    } catch (error) {
      handleErrorAPI(error);
    }
  }
};

onMounted(() => {
  init();
});
</script>

<template>
  <template v-if="route.query?._id">
    <CreateOrUpdate />
  </template>
  <template v-else>
    <h2 class="lv2">Danh sách chủ đề</h2>
    <div class="text-start d-flex justify-content-between" style="margin: 12px 0">
      <RouterLink to="?_id=null" class="btn btn-outline-primary">
        <i class="bi bi-plus-circle"></i>&nbsp; Tạo mới
      </RouterLink>
      <div class="search-block w-25">
        <div class="input-group">
          <span class="input-group-text search-icon" onclick="searchUser()">
            <i class="bi bi-search"></i>
          </span>
          <input
            type="text"
            class="form-control search-user"
            placeholder="Search"
            onkeypress="searchUserEnter(event)"
          />
        </div>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
        <tr class="table-primary">
          <th scope="col">Tên chủ để</th>
          <th scope="col">Mô tả</th>
          <th scope="col">Hình ảnh</th>
          <th scope="col">Ngày tạo</th>
          <th scope="col">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="topic in topics" :key="topic?._id">
          <td>{{ topic?.name }}</td>
          <td>{{ topic?.description }}</td>
          <td>
            <img class="w-[50px] h-[50px] object-cover" :src="topic?.image" />
          </td>
          <td class="text-nowrap">{{ formattedLocalTime(topic?.createdAt) }}</td>
          <td class="flex flex-col gap-2">
            <RouterLink
              :to="`?_id=${topic._id}`"
              class="btn btn-outline-primary"
              title="Sửa"
            >
              <i class="bi bi-gear"></i>
            </RouterLink>
            <button
              type="button"
              @click.prevent="handleDelete(topic._id)"
              class="btn btn-outline-danger"
              title="Xóa"
            >
              <i class="bi bi-trash3"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
</template>
