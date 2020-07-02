<template>
  <v-container fluid class="fill-height" id="exercise">
    <v-content style="padding: 0px">
      <v-carousel v-if="!currentQuestion && isFinished === false" v-model="currentSlide">
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
          <v-btn v-if="!currentQuestion && isFinished === false" @click="startExercise">Start </v-btn>
        </v-col>
      </v-row>
    </v-content>

    <v-slide-y-transition mode="in" hide-on-leave=true>
      <Translate
        v-if="currentQuestion"
        v-show="currentQuestion.id === '02'"
      ></Translate>
    </v-slide-y-transition>
    <v-slide-y-transition mode="in" hide-on-leave=true>
      <Translate
        v-if="currentQuestion"
        v-show="currentQuestion.id === '03'"
      ></Translate>
    </v-slide-y-transition>
    <v-slide-y-transition mode="in" hide-on-leave=true>
      <Translate
        v-if="currentQuestion"
        v-show="currentQuestion.id === '04'"
      ></Translate>
    </v-slide-y-transition>
    <v-slide-y-transition mode="in" hide-on-leave=true>
      <Translate
        v-if="currentQuestion"
        v-show="currentQuestion.id === '05'"
      ></Translate>
    </v-slide-y-transition>

    <v-slide-y-transition mode="in" hide-on-leave=true>
      <InputArticle
        v-if="currentQuestion"
        v-show="currentQuestion.id === '01'"
      ></InputArticle>
    </v-slide-y-transition>

    <Summary v-if="!currentQuestion && isFinished === true"></Summary>

  </v-container>
</template>

<script>
import InputArticle from "./InputArticle.vue";
import Translate from "./Translate.vue";
import Summary from "./Summary.vue";
import { eventBus } from "../../main.js";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "exercise",
  components: {
    InputArticle,
    Translate,
    Summary
  },
  data() {
    return {
      colors: ["indigo", "warning", "success", "error"],
      slides: ["Full Exercise", "Verbs", "Nouns", "Adjectives"],
      currentSlide: 0,
      isFinished: false
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
    console.log("Get remaining on mounted", this.getRemaining());
    eventBus.$on("next-click", () => {
      this.newRandomQuestion();
      console.log("Quedan from getter", this.getRemaining());
    })
    eventBus.$on("finished", () => {
      this.isFinished = true
    })

  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
