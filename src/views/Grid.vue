<template>
  <v-container fluid class="fill-height">
    <v-row align="end" style="height: 200px">
      <v-col cols="4">
        <h1 class="display-1">Lorem ipsum dolor.</h1>
      </v-col>
      <v-col cols="8">
        <h1 class="display-1">Lorem ipsum dolor.</h1>
      </v-col>
    </v-row>

    <div
      data-verbix-conjugate-language='deu'
      data-verbix-conjugate-key='e82c7237-ad4e-11ea-8527-e237142b3bef'
      data-verbix-conjugate-verb='üben'
    ></div>
    <h3>Indicative Present</h3>
    <div data-verbix-conjugate-tense="52"></div>
    <div data-verbix-conjugate-tense="0"></div>
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
