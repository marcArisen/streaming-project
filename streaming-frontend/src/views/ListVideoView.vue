<template>
  <div v-for="video in videos" :key="video">
    <video-player
      :src="video"
      controls
      :loop="true"
      :volume="0.6"
      :width="800"
      :height="640"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import apiService from "../services/api-service";
import { VideoPlayer } from "@videojs-player/vue";
import "video.js/dist/video-js.css";

export default defineComponent({
  components: {
    VideoPlayer,
  },
  data() {
    return {
      videos: [],
    };
  },
  async mounted() {
    this.videos = ["https://youtu.be/Lh-lcHfyEN0", "https://youtu.be/Lh-lcHfyEN0", "https://youtu.be/Lh-lcHfyEN0"]
    // this.videos = await apiService.getVideos();
  },
});
</script>
