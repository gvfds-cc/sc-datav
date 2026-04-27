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
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#999",
        },
      },
    },
    yAxis: {
      type: "category",
      data: ["武汉市", "宜昌市", "襄阳市", "恩施州", "咸宁市"],
      axisLine: {
        lineStyle: {
          color: "#999",
        },
      },
    },
    series: [
      {
        name: "产值(亿元)",
        type: "bar",
        data: [120, 200, 150, 80, 70],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: "#86efac" },
            { offset: 1, color: "#16a34a" },
          ]),
          borderRadius: [0, 4, 4, 0],
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
    <h3 class="chart-title">各地市产值排名</h3>
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