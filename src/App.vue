<template>
  <v-app class="back">
    <v-app-bar app color="secondary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Deutsch Lernen</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      app
      v-model="drawer"
      temporary
      dark
      class="back"
      
    >
      <v-list>
        <v-list-item v-for="nav in navs" :key="nav.title" :to="{path: `/${nav.link}`}">
          <v-list-item-icon>
            <v-icon>{{nav.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{nav.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

<v-content>
<router-view />
</v-content>
    
  </v-app>
</template>

<script>
export default {
  //<!-- src="https://wallpapercave.com/wp/wp2260612.jpg"-->
  name: "App",

  components: {},

  data: () => ({
    drawer: null,
    navs: []
  }),
  created() {
    this.navs = [
      {
        icon: "dashboard",
        title: "Verbs",
        link: "verbs/all"
      },
      {
        icon: "dashboard",
        title: "Nouns",
        link: "nouns/all"
      },
      {
        icon: "dashboard",
        title: "Adjectives",
        link: "adjs/all"
      },
      {
        icon: "mdi-pencil",
        title: "Exercise",
        link: "exercise"
      }
    ];
  }
};
//https://wallpaperaccess.com/full/1198741.jpg
//https://i.pinimg.com/originals/a1/9a/b7/a19ab7e71095bb14bd13c6c0fc4c5e55.jpg
</script>


<style>
.back {
  background: url("https://wallpapercave.com/wp/wp4030805.jpg") no-repeat center
    center fixed !important;
  background-size: cover;
  /* background: linear-gradient(208deg, #001355, #1c4f86, #2291b9, #00d8ef) !important */
}

</style>