<template>
  <v-container class="d-flex align-center h-100">
    <v-col class="text-center">
      <h1>Add a Video</h1>
      <v-form class="mt-3" ref="form" @submit.prevent="submit">
        <v-text-field label="Video Name *" v-model="form.name" prepend-icon="mdi-tag-text-outline"
          hint="Video Name must not contain any space and is not editable."
          :rules="[rules.required, rules.name]"></v-text-field>
        <v-textarea label="Description" v-model="form.description" prepend-icon="mdi-information-outline"></v-textarea>
        <v-file-input label="Choose a Video File *" v-model="form.defaultName" accept="video/*" :rules="[rules.required]"
          @change="inputVideo($event)"></v-file-input>
        <div class="mt-6">
          <v-btn type="submit" prepend-icon="mdi-content-save" color="success"> Submit </v-btn>
          <RouterLink class="router-link" to="/">
            <v-btn class="ml-6" prepend-icon="mdi-close" color="error"> Cancel </v-btn>
          </RouterLink>
        </div>
      </v-form>
    </v-col>
  </v-container>
</template>

<script>
import apiService from "../services/api-service";

export default {
  data() {
    return {
      form: {
        video: "",
        defaultName: "",
        name: "",
        description: "",
      },
      rules: {
        required: value => !!value || 'Required.',
        name: value => {
          const pattern = /^\S+$/;
          return pattern.test(value) || 'Invalid Video Name.';
        },
      },
    };
  },
  methods: {
    inputVideo(event) {
      this.form.video = event.target.files[0];
    },
    async submit() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        const formData = new FormData();
        formData.append("file", this.form.video);
        formData.append("name", this.form.name);
        formData.append("description", this.form.description);
        await apiService.uploadVideo(formData);
        this.$router.push("/");
      }
    },
  },
};
</script>
