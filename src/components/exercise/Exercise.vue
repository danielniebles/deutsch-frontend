<template>
  <v-container fluid class="fill-height" id="exercise">
    <v-content style="padding: 0px">
      <v-carousel v-if="!currentQuestion" v-model="currentSlide">
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-sheet :color="colors[i]" height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <div class="display-3">{{ slide }}</div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>

      <v-row>
        <v-col align="end">
          <v-btn v-if="!currentQuestion" @click="startExercise">Start </v-btn>
        </v-col>
      </v-row>
    </v-content>

    <Translate
      v-if="currentQuestion"
      v-show="
        currentQuestion.id === '02' ||
          currentQuestion.id === '03' ||
          currentQuestion.id === '04' ||
          currentQuestion.id === '05'
      "
    ></Translate>
    <InputArticle
      v-if="currentQuestion"
      v-show="currentQuestion.id === '01'"
    ></InputArticle>
  </v-container>
</template>

<script>
import InputArticle from "./InputArticle.vue";
import Translate from "./Translate.vue";
import { eventBus } from "../../main.js";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "exercise",
  components: {
    InputArticle,
    Translate,
  },
  data() {
    return {
      colors: ["indigo", "warning", "success", "error"],
      slides: ["Full Exercise", "Verbs", "Nouns", "Adjectives"],
      currentSlide: 0,
    };
  },
  computed: mapState(["exercise", "currentQuestion", "remaining"]),
  methods: {
    ...mapGetters(["getRandomQuestion", "getRemaining"]),
    ...mapActions(["getExercise", "newRandomQuestion"]),
    async startExercise() {
      await this.getExercise();
      this.newRandomQuestion();
      console.log("Current slide is:", this.currentSlide);
      console.log("start exercise");
    },
    updateSlide(index) {
      this.currentSlide = index;
    },
  },
  mounted() {
    console.log(this.exercise);
    eventBus.$on("next-click", () => {
      this.newRandomQuestion();
      console.log("Quedan from getter", this.getRemaining());
    });
  },
};
</script>

<style scoped></style>
