<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";

const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

const initChart = () => {
  if (!chartRef.value) return;
  chartInstance = echarts.init(chartRef.value);

  const option: echarts.EChartsOption = {
    tooltip: { trigger: "item" },
    series: [{ name: "分布", type: "pie", radius: "60%", data: [{ value: 335, name: "第一产业" }, { value: 234, name: "第二产业" }, { value: 154, name: "第三产业" }] }],
  };

  chartInstance.setOption(option);
};

onMounted(() => {
  initChart();
  window.addEventListener("resize", () => chartInstance?.resize());
});

onUnmounted(() => {
  chartInstance?.dispose();
});
</script>

<template>
  <div class="chart-card">
    <h3 class="chart-title">产业结构</h3>
    <div ref="chartRef" class="chart-content"></div>
  </div>
</template>

<style scoped>
.chart-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.chart-title {
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #333;
}
.chart-content {
  width: 100%;
  height: 200px;
}
</style>