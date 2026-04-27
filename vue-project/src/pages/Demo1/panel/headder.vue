<script setup lang="ts">
import { ref } from "vue";

const currentTime = ref(new Date().toLocaleString());

setInterval(() => {
  currentTime.value = new Date().toLocaleString();
}, 1000);
</script>

<template>
  <header class="header">
    <div class="header-left">
      <img src="/logo.svg" alt="logo" class="logo" />
    </div>
    <h1 class="title">湖北省茶叶种植数据大屏</h1>
    <div class="header-right">
      <span class="time">{{ currentTime }}</span>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  background: linear-gradient(180deg, rgba(0, 77, 64, 0.8) 0%, rgba(0, 77, 64, 0) 100%);
}

.header-left,
.header-right {
  width: 200px;
}

.logo {
  height: 50px;
}

.title {
  font-size: 36px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  margin: 0;
}

.time {
  color: #fff;
  font-size: 16px;
}
</style>