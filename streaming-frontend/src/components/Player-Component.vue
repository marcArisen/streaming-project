<template>
  <video-player
    :src="vdoUrl"
    :poster="posterUrl"
    controls
    :loop="true"
    :volume="0.6"
    :width="800"
    :height="640"
  />
</template>

<script>
import { defineComponent } from "vue";
import { VideoPlayer } from "@videojs-player/vue";
import "video.js/dist/video-js.css";

export default defineComponent({
  name: "player",
  props: ["vdoUrl", "posterUrl"],
  components: {
    VideoPlayer,
  },
});
</script>
