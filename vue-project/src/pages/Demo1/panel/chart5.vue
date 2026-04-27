<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";

const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

const initChart = () => {
  if (!chartRef.value) return;

  chartInstance = echarts.init(chartRef.value);

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: "axis",
    },
    radar: {
      indicator: [
        { name: "产量", max: 100 },
        { name: "质量", max: 100 },
        { name: "销量", max: 100 },
        { name: "出口", max: 100 },
        { name: "产值", max: 100 },
      ],
    },
    series: [
      {
        name: "茶叶发展指数",
        type: "radar",
        data: [
          {
            value: [85, 90, 80, 75, 88],
            name: "发展指数",
          },
        ],
        itemStyle: {
          color: "#16a34a",
        },
        areaStyle: {
          color: "rgba(22, 163, 74, 0.3)",
        },
      },
    ],
  };

  chartInstance.setOption(option);
};

onMounted(() => {
  initChart();
  window.addEventListener("resize", () => {
    chartInstance?.resize();
  });
});

onUnmounted(() => {
  chartInstance?.dispose();
});
</script>

<template>
  <div class="chart-card">
    <h3 class="chart-title">发展指数分析</h3>
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