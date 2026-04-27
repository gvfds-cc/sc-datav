<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";

const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

const initChart = () => {
  if (!chartRef.value) return;
  chartInstance = echarts.init(chartRef.value);

  const option: echarts.EChartsOption = {
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: ["2019", "2020", "2021", "2022", "2023", "2024"] },
    yAxis: { type: "value", name: "增长率(%)" },
    series: [{ name: "增长率", type: "line", data: [5.2, 6.8, 4.5, 7.2, 8.1, 6.5], smooth: true, itemStyle: { color: "#16a34a" } }],
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
    <h3 class="chart-title">年度增长率</h3>
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