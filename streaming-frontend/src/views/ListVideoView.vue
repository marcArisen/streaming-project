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
      md="6"
      lg="4"
      xl="4"
      v-for="video in filteredVideos"
      :key="video"
    >
      <v-card class="text-center">
        <video-player
          :src="video.url"
          controls
          loop="true"
          width="100"
          height="100"
        />
        <br />
        <v-btn class="mx-4 my-3" color="error" @click="openDialog(video.name)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog v-model="showDialog" width="auto">
    <v-card>
      <v-toolbar height="80" color="error">
        <v-col class="d-flex justify-space-around">
          <v-icon icon="mdi-alert-circle-outline" size="70"></v-icon>
        </v-col>
      </v-toolbar>
      <v-card-text class="text-center">
        Are you sure you want to delete video
        <br />
        {{ deleteVideoName }} ?
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn color="success" @click="showDialog = false">Cancel</v-btn>
        <v-btn color="error" @click="deleteVideo()">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
      showDialog: false,
      deleteVideoName: "",
    };
  },
  methods: {
    search() {
      this.filteredVideos = this.videos.filter((video) => {
        const lowerCaseSearchInput = this.searchInput.toLowerCase();
        return video.name.toLowerCase().includes(lowerCaseSearchInput);
      });
    },
    openDialog(name) {
      this.showDialog = true;
      this.deleteVideoName = name;
    },
    async deleteVideo() {
      this.showDialog = false;
      // await apiService.deleteContact(this.deleteContactId);
      window.location.reload();
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
