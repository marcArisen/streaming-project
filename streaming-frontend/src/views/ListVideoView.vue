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
        <video-player class="mb-2" :src="video.url" controls fluid="true" />
        <p class="font-weight-black">{{ video.name }}</p>
        <p v-if="video.description">{{ video.description }}</p>
        <p v-else>(No description)</p>
        <v-btn
          class="mx-4 my-3"
          color="info"
          @click="openEditDialog(video.name, video.description)"
        >
          <v-icon icon="mdi-square-edit-outline"></v-icon>
        </v-btn>
        <v-btn
          class="mx-4 my-3"
          color="error"
          @click="openDeleteDialog(video.name)"
        >
          <v-icon icon="mdi-delete"></v-icon>
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog v-model="showEditDialog" width="500">
    <v-card>
      <v-toolbar height="80" color="warning">
        <v-col class="d-flex justify-space-around">
          <v-icon icon="mdi-square-edit-outline" size="55"></v-icon>
        </v-col>
      </v-toolbar>
      <v-card-text class="text-center">
        Edit
        <span class="font-weight-black">{{ editForm.name }}</span>
        's description
        <v-textarea
          class="mt-4"
          label="Description"
          v-model="editForm.description"
        ></v-textarea>
      </v-card-text>
      <v-card-actions class="justify-center mb-2">
        <v-btn
          color="secondary"
          variant="outlined"
          @click="showEditDialog = false"
        >
          Cancel
        </v-btn>
        <v-btn color="success" variant="outlined" @click="editVideo()">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="showDeleteDialog" width="400">
    <v-card>
      <v-toolbar height="80" color="error">
        <v-col class="d-flex justify-space-around">
          <v-icon icon="mdi-delete" size="60"></v-icon>
        </v-col>
      </v-toolbar>
      <v-card-text class="text-center">
        Are you sure you want to delete video
        <br />
        <span class="font-weight-black">{{ deleteVideoName }}</span> ?
      </v-card-text>
      <v-card-actions class="justify-center mb-2">
        <v-btn
          color="success"
          variant="outlined"
          @click="showDeleteDialog = false"
        >
          Cancel
        </v-btn>
        <v-btn color="error" variant="outlined" @click="deleteVideo()">
          Delete
        </v-btn>
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
      showEditDialog: false,
      showDeleteDialog: false,
      deleteVideoName: "",
      editForm: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
    search() {
      this.filteredVideos = this.videos.filter((video) => {
        const lowerCaseSearchInput = this.searchInput.toLowerCase();
        return video.name.toLowerCase().includes(lowerCaseSearchInput);
      });
    },
    openEditDialog(name, description) {
      this.showEditDialog = true;
      this.editForm.name = name;
      this.editForm.description = description;
    },
    openDeleteDialog(name) {
      this.showDeleteDialog = true;
      this.deleteVideoName = name;
    },
    async editVideo() {
      this.showEditDialog = false;
      await apiService.updateVideo(this.editForm);
      window.location.reload();
    },
    async deleteVideo() {
      this.showDeleteDialog = false;
      await apiService.deleteVideo(this.deleteVideoName);
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
