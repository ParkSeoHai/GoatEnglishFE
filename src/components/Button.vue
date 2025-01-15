<script setup>
const { item } = defineProps(["item"]);
</script>

<template>
  <button type="button" class="btn text-[16px]">
    <RouterLink v-if="item.href" :to="item.href">{{ item.text }}</RouterLink>
    <span v-else>{{ item.text }}</span>
  </button>
</template>
