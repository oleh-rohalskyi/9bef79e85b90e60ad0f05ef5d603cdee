<template>
  <v-app>
    <v-main>
      <v-container class="wrap d-flex flex-column">
        <v-card shaped class="content mb-3">
          <router-view />
        </v-card>
        <Footer class="pa-3" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Footer
  },
  name: "App",
  data: () => ({})
};
</script>

<style lang="sass" scoped>
.wrap
  min-height: 100vh
  .content
    flex: 1
</style>
