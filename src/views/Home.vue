<script setup>
import Button from "@/components/Button.vue";
</script>
<template>
  <div class="home-body page-container flex items-center">
    <div class="flex items-center justify-between">
      <div class="banner">
        <img class="img" src="../assets/images/19467ffee68fe.png" />
      </div>
      <div class="block-text">
        <h1 class="title">Nâng cao kỹ năng tiếng Anh của bạn với công nghệ tiên tiến!</h1>
        <Button
          :item="{ text: 'Bắt đầu ngay', href: '/signup' }"
          class="btn-primary-custom"
        />
        <Button
          :item="{ text: 'Tôi đã có tài khoản', href: '/login' }"
          class="btn-default-custom"
        />
      </div>
    </div>
  </div>
</template>
