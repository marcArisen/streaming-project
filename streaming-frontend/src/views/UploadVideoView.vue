<template>
  <v-container class="d-flex align-center h-100">
    <v-col class="text-center">
      <v-form ref="form" @submit.prevent="submitFile">
        <v-file-input
          label="Choose file"
          @change="uploadVideo($event)"
        ></v-file-input>
        <v-btn type="submit" color="success"> Submit </v-btn>
      </v-form>
    </v-col>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      video: "",
    };
  },
  methods: {
    uploadVideo(event) {
      this.video = event.target.files[0];
    },
    submitFile() {
      if (this.video) {
        const formData = new FormData();
        formData.append("file", this.video);

        axios
          .post("http://localhost:5002/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(function () {
            console.log("SUCCESS!!!");
          })
          .catch(function () {
            console.log("FAILURE!!!");
          });

        console.log(formData.get("file"));
        this.$router.push("/");
      }
    },
  },
};
</script>
