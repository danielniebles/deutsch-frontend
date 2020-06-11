<template>
  <v-container fluid class="fill-height">
    <v-container fluid style="height: 200px">
      <v-row>
        <v-col cols="6">
          <h1 class="display-1">Lorem, ipsum dolor.</h1>
        </v-col>
      </v-row>
    </v-container>

    <v-row align="end" style="height: 200px">
      <v-col cols="4">
        <h1 class="display-1">Lorem ipsum dolor.</h1>
      </v-col>
      <v-col cols="8">
        <h1 class="display-1">Lorem ipsum dolor.</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  computed: mapState(["exercise"]),
  methods: {
    ...mapGetters(["getRandomQuestion"]),
    ...mapActions(["getExercise"]),
  },
  mounted() {},
};
</script>
