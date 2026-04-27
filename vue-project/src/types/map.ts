export interface CityProperties {
  adcode: number;
  name: string;
  center: [number, number];
  centroid: [number, number];
  childrenNum?: number;
  level: string;
  parent?: { adcode: number };
  subFeatureIndex?: number;
  acroutes?: number[];
}

export interface CityFeature {
  type: "Feature";
  properties: CityProperties;
  geometry: {
    type: "MultiPolygon";
    coordinates: number[][][];
  };
}

export interface CityGeoJSON {
  type: "FeatureCollection";
  features: CityFeature[];
}