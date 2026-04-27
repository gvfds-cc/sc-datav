<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useConfigStore } from "@/stores";
import Map from "./map/index.vue";
import Panel from "./panel/index.vue";

const configStore = useConfigStore();

onMounted(() => {
  configStore.reset();
});

onUnmounted(() => {
  configStore.reset();
});
</script>

<template>
  <div class="wrapper">
    <Map />
    <Panel />
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
}
</style>