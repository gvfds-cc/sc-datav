import { PieChart, type PieSeriesOption } from "echarts/charts";
import Chart from "@/components/chart";
import type { ComposeOption } from "echarts/core";
import {
  LegendComponent,
  TooltipComponent,
  type LegendComponentOption,
  type TooltipComponentOption,
} from "echarts/components";

type PieOption = ComposeOption<
  PieSeriesOption | TooltipComponentOption | LegendComponentOption
>;

const color = ["#bbf7d0", "#86efac", "#4ade80", "#16a34a"];

const trafficWay = [
  { name: "绿茶", value: 42 },
  { name: "红茶", value: 24 },
  { name: "茉莉花茶", value: 18 },
  { name: "黑茶", value: 16 },
];

const data = trafficWay.reduce<PieSeriesOption["data"]>((pre, cur, i) => {
  pre?.push(
    {
      value: cur.value,
      name: cur.name,
      itemStyle: {
        borderRadius: 10,
        shadowBlur: 20,
        color: color[i],
        shadowColor: color[i],
      },
    },
    {
      value: 2,
      name: "",
      itemStyle: {
        color: "rgba(0, 0, 0, 0)",
        borderColor: "rgba(0, 0, 0, 0)",
        borderWidth: 0,
      },
    }
  );
  return pre;
}, []);

export default function Chart5() {
  return (
    <Chart<PieOption>
      use={[PieChart, TooltipComponent, LegendComponent]}
      option={{
        color: color[0],
        tooltip: {
          show: false,
        },
        legend: {
          icon: "circle",
          orient: "vertical",
          data: ["绿茶", "红茶", "茉莉花茶", "黑茶"],
          top: "middle",
          right: "10%",
          textStyle: {
            color: "#000000",
          },
          itemGap: 20,
        },
        series: {
          name: "",
          type: "pie",
          center: ["30%", "50%"],
          radius: [70, 80],
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          data: data,
        },
      }}
    />
  );
}
