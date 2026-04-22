import { useMemo } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router";
import cityData from "./cityData";

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 48px;
  background: linear-gradient(180deg, #e8f8ee 0%, #dff3e8 100%);
  color: #14532d;
`;

const Card = styled.div`
  margin: 48px auto 0;
  max-width: 720px;
  padding: 28px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(234, 88, 12, 0.2);
  box-shadow: 0 18px 36px rgba(211, 84, 0, 0.08);
`;

const BackButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 10px 16px;
  background: #16a34a;
  color: #fff;
  cursor: pointer;
`;

type RegionDetailData = {
  city: string;
  population: number;
  gdp: string;
  area: string;
};

export default function RegionDetail() {
  const navigate = useNavigate();
  const { city = "" } = useParams();
  const location = useLocation();
  const stateDetail = location.state as RegionDetailData | undefined;

  const detail = useMemo(() => {
    if (stateDetail?.city) return stateDetail;
    const fallback = cityData[city as keyof typeof cityData];
    if (!fallback) return null;
    return { city, ...fallback };
  }, [city, stateDetail]);

  if (!detail) {
    return (
      <Wrapper>
        <BackButton onClick={() => navigate("/demo1")}>返回地图</BackButton>
        <Card>未找到该区域详情信息。</Card>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <BackButton onClick={() => navigate("/demo1")}>返回地图</BackButton>
      <Card>
        <h1>{detail.city}</h1>
        <p>人口：{detail.population} 万</p>
        <p>GDP：{detail.gdp}</p>
        <p>面积：{detail.area}</p>
      </Card>
    </Wrapper>
  );
}
