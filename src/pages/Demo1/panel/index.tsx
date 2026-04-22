import { useEffect } from "react";
import styled from "styled-components";
import useMoveTo from "@/hooks/useMoveTo";
import AutoFit from "@/components/autoFit";
import { useConfigStore } from "../stores";

import Headder from "./headder";
import Footer from "./footer";
import Chart1 from "./chart1";
import Chart4 from "./chart4";
import Chart5 from "./chart5";

const GridWrapper = styled.div`
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: repeat(6, minmax(0, 1fr));
  gap: 20px;
  padding: 20px;
`;

const Card = styled.div`
  position: relative;
  background: rgba(232, 248, 238, 0.68);
  border: 1px solid rgba(22, 163, 74, 0.3);
  position: relative;
  padding: 15px;
  backdrop-filter: blur(4px);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
  z-index: 9999;

  &::before {
    content: "";
    position: absolute;
    top: -1px;
    left: -1px;
    width: 10px;
    height: 10px;
    border-top: 2px solid #16a34a;
    border-left: 2px solid #16a34a;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -1px;
    right: -1px;
    width: 10px;
    height: 10px;
    border-bottom: 2px solid #16a34a;
    border-right: 2px solid #16a34a;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  &:hover::before,
  &:hover::after {
    width: 100%;
    height: 100%;
    opacity: 0.5;
  }
`;

const CardTitle = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  padding-left: 10px;
  border-left: 4px solid #22c55e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #14532d;

  span {
    font-size: 10px;
    color: rgba(0, 0, 0, 0.4);
    font-weight: normal;
  }
`;

export default function Content() {
  const topBox = useMoveTo("toBottom", 0.6);
  const leftBox = useMoveTo("toRight", 0.8, 0.5);
  const rightBox = useMoveTo("toLeft", 0.8, 0.5);
  const rightBox1 = useMoveTo("toLeft", 0.8, 0.6);
  const bottomBox = useMoveTo("toTop", 0.8, 0.5);

  useEffect(() => {
    const unMapPlaySub = useConfigStore.subscribe(
      (s) => s.mapPlayComplete,
      (v) => {
        if (v) {
          topBox.restart();
          bottomBox.restart();
          leftBox.restart();
          rightBox.restart();
          rightBox1.restart();
        }
      }
    );

    const unModeSub = useConfigStore.subscribe(
      (s) => s.mode,
      (v) => {
        if (v) {
          topBox.restart();
          leftBox.restart();
          rightBox.restart();
          rightBox1.restart();
        } else {
          topBox.reverse();
          leftBox.reverse();
          rightBox.reverse();
          rightBox1.reverse();
        }
      }
    );

    return () => {
      unMapPlaySub();
      unModeSub();
    };
  }, []);

  return (
    <AutoFit>
      <Headder ref={topBox.ref} />
      <GridWrapper>
        <Card ref={leftBox.ref} style={{ gridArea: "1 / 1 / 7 / 2" }}>
          <CardTitle>
            重点产区茶叶种植规模<span>TEA PLANTING SCALE</span>
          </CardTitle>
          <Chart1 />
        </Card>
        <Card ref={rightBox.ref} style={{ gridArea: "1 / 4 / 4 / 5" }}>
          <CardTitle>
            茶叶种植统计<span>TEA PLANTING STATISTICS</span>
          </CardTitle>
          <Chart4 />
        </Card>
        <Card ref={rightBox1.ref} style={{ gridArea: "4 / 4 / 7 / 5" }}>
          <CardTitle>
            茶类结构占比<span>TEA CATEGORY RATIO</span>
          </CardTitle>
          <Chart5 />
        </Card>
      </GridWrapper>
      <Footer ref={bottomBox.ref} />
    </AutoFit>
  );
}
