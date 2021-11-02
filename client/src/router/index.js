import { createRouter, createWebHistory } from "vue-router";
import useAuth from "../composables/useAuth";

const { isAuthenticated, loadAuth } = useAuth();

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
    meta: {
      authorize: true,
    },
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  await loadAuth();
  if (to.meta.authorize && !isAuthenticated.value) {
    next({ name: "login" });
  } else if (isAuthenticated.value && to.name === "login") {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
