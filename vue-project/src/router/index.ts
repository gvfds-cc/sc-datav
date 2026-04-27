import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/demo1",
  },
  {
    path: "/demo1",
    name: "Demo1",
    component: () => import("@/pages/Demo1/index.vue"),
  },
  {
    path: "/demo1/region/:city",
    name: "RegionDetail",
    component: () => import("@/pages/Demo1/region-detail.vue"),
  },
  {
    path: "/demo0",
    name: "Demo0",
    component: () => import("@/pages/Demo0/index.vue"),
  },
  {
    path: "/demo2",
    name: "Demo2",
    component: () => import("@/pages/Demo2/index.vue"),
  },
  {
    path: "/demo3",
    name: "Demo3",
    component: () => import("@/pages/Demo3/index.vue"),
  },
  {
    path: "/index",
    name: "Index",
    component: () => import("@/pages/Index/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;