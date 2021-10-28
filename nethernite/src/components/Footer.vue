<template>
  <v-footer shaped>
    <v-img :src="require('../assets/logo.svg')" contain height="80" />
    <v-card class="mx-auto" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-subtitle  >Oleg Rogalskyi</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-avatar rounded size="60">
          <v-img :src="require('../assets/avatar.png')" />
        </v-list-item-avatar>
      </v-list-item>
      <v-card-actions>
        <v-btn :href="git" class="ml-auto" color="#84A4F6" outlined rounded text>GIT</v-btn>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    git: "https://github.com/oleh-rohalskyi/9bef79e85b90e60ad0f05ef5d603cdee",
    name: "Oleg",
    photo: ""
  })
};
</script>
