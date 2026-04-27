import { Suspense } from "react";
import Cloud from "./cloud";
import Base from "./base";
import Bottom from "./bottom";
import type { CityGeoJSON } from "@/types/map";

import hbMapData from "@/assets/hb.json";
import hbOutlineData from "@/assets/hb_outline.json";

const mapData = hbMapData as CityGeoJSON,
  outlineData = hbOutlineData as CityGeoJSON;

export default function Scene() {
  return (
    <Suspense fallback={null}>
      <Cloud />

      <Base data={mapData} outlineData={outlineData} />

      <Bottom />
    </Suspense>
  );
}
