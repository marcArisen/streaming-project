<template>
  <div>
    <Player
      v-for="video in videoList"
      :key="video.url"
      :vdoUrl="video.url"
      :posterUrl="video.poster"
    />
  </div>
</template>
  
  <script>
import { defineComponent } from "vue";
import Player from "./Player-Component.vue";

export default defineComponent({
  props: ["videoList"],
  components: {
    Player,
  },
});
</script>