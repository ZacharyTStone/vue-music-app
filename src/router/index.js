import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Record from "@/views/Record.vue";
import Manage from "@/views/Manage.vue";
import Song from "@/views/Song.vue";
import store from "@/store";

const routes = [
  {
    name: "home",
    path: "/", // example.com/
    component: Home,
  },
  {
    name: "record",
    path: "/record",
    component: Record,
  },
  {
    name: "manage",
    // alias: '/manage',
    path: "/manage-music",
    meta: {
      requiresAuth: true,
    },
    component: Manage,
    beforeEnter: (to, from, next) => {
      console.log("Manage Route Guard");
      next();
    },
  },
  {
    path: "/manage",
    redirect: { name: "manage" },
  },
  {
    name: "song",
    path: "/song/:id",
    component: Song,
  },
  {
    // catch all other routes
    path: "/:pathMatch(.*)",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
});

router.beforeEach((to, from, next) => {
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }

  if (store.state.userLoggedIn) {
    next();
  } else {
    next({ name: "home" });
  }
});

export default router;
