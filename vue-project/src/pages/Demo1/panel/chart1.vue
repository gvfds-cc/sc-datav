<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";

const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

const colors = ["#86efac", "#16a34a"];

const data = [
  { name: "武汉市", value: 68 },
  { name: "宜昌市", value: 61 },
  { name: "襄阳市", value: 58 },
  { name: "恩施州", value: 44 },
  { name: "咸宁市", value: 36 },
];

const initChart = () => {
  if (!chartRef.value) return;

  chartInstance = echarts.init(chartRef.value);

  const option: echarts.EChartsOption = {
    grid: {
      top: 0,
      bottom: 0,
      left: "8%",
      right: "12%",
    },
    xAxis: {
      show: false,
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 14,
        margin: 16,
        inside: false,
        verticalAlign: "middle",
        color: "#000",
        formatter: (v: string, i: number) => {
          return `{a|NO.${++i}} ${v}`;
        },
        rich: {
          a: {
            color: "rgba(0, 0, 0,0.6)",
          },
        },
      },
      data: data.map((item) => item.name),
      type: "category",
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
    },
    series: [
      {
        type: "bar",
        data: data.map((item) => item.value),
        realtimeSort: true,
        barWidth: 8,
        itemStyle: {
          color: (params: any) => {
            return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: colors[0] },
              { offset: 1, color: colors[1] },
            ]);
          },
        },
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
          borderRadius: 4,
        },
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
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
  window.removeEventListener("resize", () => {
    chartInstance?.resize();
  });
});
</script>

<template>
  <div class="chart-card">
    <h3 class="chart-title">茶叶产量排名</h3>
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