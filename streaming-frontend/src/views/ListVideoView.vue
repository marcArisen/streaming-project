<template>
  <v-row class="mx-3 mt-0">
    <v-col
      cols="12"
      sm="6"
      md="4"
      lg="3"
      xl="3"
      v-for="video in videos"
      :key="video"
    >
      <video-player
        :src="video.url"
        controls
        loop="true"
        volume="0.5"
        width="auto"
        height="auto"
      />
    </v-col>
  </v-row>
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
    this.videos = await apiService.getVideos();
  },
});
</script>
