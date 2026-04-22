import { useLayoutEffect, useRef } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { gsap } from "gsap";
import Demo1 from "./pages/Demo1";
import RegionDetail from "./pages/Demo1/region-detail";

function App() {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [location.key]);

  return (
    <div ref={containerRef} style={{ willChange: "transform, opacity" }}>
      <Routes>
        <Route path="/" element={<Navigate to="/demo1" replace />} />
        <Route path="/demo1" element={<Demo1 />} />
        <Route path="/demo1/region/:city" element={<RegionDetail />} />
      </Routes>
    </div>
  );
}

export default App;
