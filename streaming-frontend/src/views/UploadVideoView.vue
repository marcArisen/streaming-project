<template>
  <v-container class="d-flex align-center h-100">
    <v-col class="text-center">
      <v-form ref="form" @submit.prevent="submitFile">
        <v-file-input
          label="Choose file"
          @change="inputVideo($event)"
        ></v-file-input>
        <v-btn type="submit" color="success"> Submit </v-btn>
      </v-form>
    </v-col>
  </v-container>
</template>

<script>
import apiService from "../services/api-service";

export default {
  data() {
    return {
      video: "",
    };
  },
  methods: {
    inputVideo(event) {
      this.video = event.target.files[0];
    },
    async submitFile() {
      if (this.video) {
        const formData = new FormData();
        formData.append("file", this.video);
        await apiService.uploadVideo(formData);
        this.$router.push("/");
      }
    },
  },
};
</script>
