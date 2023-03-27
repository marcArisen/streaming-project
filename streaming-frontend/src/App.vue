<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
.router-link {
  text-decoration: none;
  color: inherit;
}

.v-messages__message {
  margin-top: -5px;
  text-align: left;
}
</style>
