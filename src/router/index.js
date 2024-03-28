import { createRouter, createWebHistory } from "vue-router";
import SchedulePage from "../pages/Schedule.vue";
import LeaderboardPage from "../pages/Leaderboard.vue";
import NotFoundPage from "../pages/404.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: SchedulePage,
  },
  {
    path: "/Schedule",
    name: "Schedule",
    component: SchedulePage,
  },
  {
    path: "/Leaderboard",
    name: "Leaderboard",
    component: LeaderboardPage,
  },
  {
    path: "/:catchAll(.*)",
    name: "404 Not Found",
    component: NotFoundPage,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
