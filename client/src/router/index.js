import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/clubs",
    name: "clubs",
    component: () => import("../views/Clubs.vue"),
  },
  {
    path: "/clubs/:name",
    name: "club",
    component: () => import("../views/Club.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/verify-email/:key",
    name: "verify-email",
    component: () => import("../views/VerifyEmail.vue"),
  },
  {
    path: "/profile",
    name: "profile  ",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "page-not-found",
    component: () => import("../views/PageNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;