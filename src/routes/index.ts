import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/pages/register.vue"),
  },
  {
    path: "/Profile",
    name: "Profile",
    component: () => import("@/pages/profile.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    return next({ name: "Login" });
  }

  next();
});

export default router;
