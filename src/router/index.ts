import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import login from "../views/Login.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/Login.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/Main.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
