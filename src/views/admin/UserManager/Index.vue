<script setup>
import { inject, onMounted, ref, watch } from "vue";
import CreateOrUpdate from "./CreateOrUpdate.vue";

import { useRoute } from "vue-router";
import api from "@/utils";
import { toast } from "vue3-toastify";
const route = useRoute();

const URL_API = inject("URL_API");
const handleErrorAPI = inject("handleErrorAPI");

const users = ref([]);

const init = async () => {
  if (!route.query?._id) {
    users.value = await getUsers();
  }
};

watch(
  () => route.params._id,
  async () => {
    await init();
  },
  { deep: true }
);

const getUsers = async () => {
  try {
    const res = await api.get(`${URL_API}/api/user`);
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

const handleDelete = async (user_id) => {
  const result = confirm("Xác nhận xóa chủ đề");
  if (result) {
    try {
      const res = await api.delete(`${URL_API}/api/user/${user_id}`);
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
    <h2 class="lv2">Danh sách người dùng</h2>
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
          <th scope="col" class="text-center">STT</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col" class="text-center">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user._id">
          <td class="text-center">{{ index + 1 }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td class="flex justify-center gap-2">
            <RouterLink
              :to="`?_id=${user._id}`"
              class="btn btn-outline-primary"
              title="Sửa"
            >
              <i class="bi bi-gear"></i>
            </RouterLink>
            <button
              type="button"
              @click.prevent="handleDelete(user._id)"
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
