import { createWebHistory, createRouter } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import JobListings from "@/components/JobListings.vue";
import NotFound from "@/views/NotFound.vue";
import ViewJob from "@/components/ViewJob.vue";
import AddJobView from "@/views/AddJobView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/jobs", name: "jobs", component: JobListings },
  { path: "/job/add", name: "add-job", component: AddJobView },
  { path: "/job/edit/:id", name: "edit-job", component: AddJobView },
  { path: "/jobs/:id", name: "view-job", component: ViewJob },
  {
    path: "/:catchAll(.*)",
    name: "not-found",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
