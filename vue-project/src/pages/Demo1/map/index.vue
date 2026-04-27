<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { gsap } from "gsap";
import hbMapData from "@/assets/hb.json";
import hbOutlineData from "@/assets/hb_outline.json";
import { useConfigStore } from "@/stores";
import type { CityGeoJSON } from "@/types/map";

const canvasRef = ref<HTMLCanvasElement | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
let animationId: number;

const initScene = () => {
  if (!canvasRef.value || !containerRef.value) return;

  const width = containerRef.value.clientWidth;
  const height = containerRef.value.clientHeight;

  scene = new THREE.Scene();
  scene.background = new THREE.Color("#e8f8ee");

  camera = new THREE.PerspectiveCamera(50, width / height, 1, 2000);
  camera.position.set(-50, 125, 250);

  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = true;
  controls.enableZoom = true;
  controls.enableRotate = true;
  controls.zoomSpeed = 0.3;
  controls.minDistance = 100;
  controls.maxDistance = 300;
  controls.maxPolarAngle = 1.5;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(100, 100, 50);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  animate();

  window.addEventListener("resize", onResize);
};

const animate = () => {
  animationId = requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

const onResize = () => {
  if (!containerRef.value) return;
  const width = containerRef.value.clientWidth;
  const height = containerRef.value.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

const initCameraAnimation = () => {
  gsap.to(camera.position, {
    x: 60,
    y: 125,
    z: 160,
    duration: 2,
    ease: "circ.out",
    onComplete: () => {
      const configStore = useConfigStore();
      configStore.mapPlayComplete = true;
    },
  });
};

onMounted(() => {
  initScene();
  initCameraAnimation();
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  window.removeEventListener("resize", onResize);
  renderer?.dispose();
});
</script>

<template>
  <div ref="containerRef" class="canvas-container">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style scoped>
.canvas-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

canvas {
  width: 100%;
  height: 100%;
}
</style>