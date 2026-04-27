<script setup lang="ts">
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <span>数据更新时间: {{ new Date().toLocaleDateString() }}</span>
      <span>技术支持: 数据可视化团队</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 15px 40px;
  background: linear-gradient(0deg, rgba(0, 77, 64, 0.8) 0%, rgba(0, 77, 64, 0) 100%);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: 14px;
}
</style>