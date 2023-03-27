<template>
  <v-row class="mt-5 mx-6">
    <RouterLink class="router-link" to="/upload-video">
      <v-btn class="mx-2" icon="mdi-plus" color="warning"></v-btn>
    </RouterLink>
    <v-responsive>
      <v-form @submit.prevent="search">
        <v-text-field class="ml-3" label="Search..." v-model="searchInput">
          <template v-slot:append-inner>
            <v-btn
              class="append-inner-icon"
              type="submit"
              color="blue-grey"
              @click="search"
              >Search</v-btn
            >
          </template>
        </v-text-field>
      </v-form>
    </v-responsive>
  </v-row>
  <v-row class="mx-3 mt-0">
    <v-col
      cols="12"
      sm="6"
      md="4"
      lg="3"
      xl="3"
      v-for="video in filteredVideos"
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
      filteredVideos: [],
      searchInput: "",
    };
  },
  methods: {
    search() {
      this.filteredVideos = this.videos.filter((video) => {
        const lowerCaseSearchInput = this.searchInput.toLowerCase();
        return video.name.toLowerCase().includes(lowerCaseSearchInput);
      });
    },
  },
  async mounted() {
    this.videos = await apiService.getVideos();
    this.filteredVideos = this.videos;
  },
});
</script>

<style scoped>
.append-inner-icon {
  margin-top: -5px;
}
</style>
