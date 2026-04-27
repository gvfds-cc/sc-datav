<script setup lang="ts">
import Header from "./headder.vue";
import Chart1 from "./chart1.vue";
import Chart2 from "./chart2.vue";
import Chart3 from "./chart3.vue";
import Chart4 from "./chart4.vue";
import Chart5 from "./chart5.vue";
import Chart6 from "./chart6.vue";
</script>

<template>
  <div class="panel">
    <Header />
    <div class="charts">
      <div class="charts-left">
        <Chart1 />
        <Chart2 />
      </div>
      <div class="charts-center">
        <Chart3 />
      </div>
      <div class="charts-right">
        <Chart4 />
        <Chart5 />
        <Chart6 />
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  pointer-events: none;
}

.charts {
  flex: 1;
  display: flex;
  padding: 20px;
  gap: 20px;
}

.charts-left,
.charts-right {
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.charts-center {
  flex: 1;
}
</style>