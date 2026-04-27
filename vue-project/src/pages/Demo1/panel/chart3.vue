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
        type: "cross",
      },
    },
    legend: {
      data: ["种植面积", "产量"],
      textStyle: {
        color: "#333",
      },
    },
    xAxis: {
      type: "category",
      data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      axisLine: {
        lineStyle: {
          color: "#999",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "面积(万亩)",
        axisLine: {
          lineStyle: {
            color: "#86efac",
          },
        },
      },
      {
        type: "value",
        name: "产量(吨)",
        axisLine: {
          lineStyle: {
            color: "#16a34a",
          },
        },
      },
    ],
    series: [
      {
        name: "种植面积",
        type: "bar",
        data: [120, 130, 150, 180, 200, 220, 210, 190, 170, 150, 140, 130],
        itemStyle: {
          color: "#86efac",
        },
      },
      {
        name: "产量",
        type: "line",
        yAxisIndex: 1,
        data: [50, 60, 80, 120, 180, 220, 200, 170, 140, 100, 80, 60],
        itemStyle: {
          color: "#16a34a",
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
    <h3 class="chart-title">年度种植与产量趋势</h3>
    <div ref="chartRef" class="chart-content"></div>
  </div>
</template>

<style scoped>
.chart-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.chart-title {
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #333;
}

.chart-content {
  width: 100%;
  height: calc(100% - 40px);
  min-height: 250px;
}
</style>