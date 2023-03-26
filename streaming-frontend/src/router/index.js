import { createRouter, createWebHistory } from "vue-router";
import UploadVideoView from "../views/UploadVideoView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/upload-video",
      name: "uploadVideoView",
      component: UploadVideoView,
    },
  ],
});

export default router;
