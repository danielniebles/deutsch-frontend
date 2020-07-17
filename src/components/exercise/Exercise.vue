<template>
  <v-container fluid class="parent-container" id="exercise">
    <v-row
      align="center"
      justify="center"
      style="height:210px"
      v-if="!currentQuestion && isFinished === false"
    >
      <v-col cols="1">
        <p class="title white--text">Verbs</p>
      </v-col>
      <template v-for="(verbsExercise, i) in verbsExercises">
        <v-col :key="i" width="10%">
          <v-hover v-slot="{ hover }">
            <v-card :class="{ 'on-hover':hover }" :elevation="hover ? 12 : 2" color="#046CB1">
              <v-card-title>{{ verbsExercise.title }}</v-card-title>
              <v-card-text>{{ verbsExercise.body }}</v-card-text>
              <v-card-actions>
                <v-row v-show="hover">
                  <v-col align="end">
                    <v-btn @click="startExercise(verbsExercises[i])">Go</v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>

    <v-row
      align="center"
      justify="center"
      style="height:225px"
      v-if="!currentQuestion && isFinished === false"
    >
      <v-col cols="1">
        <p class="title white--text">Nouns</p>
      </v-col>
      <template v-for="(nounsExercise, i) in nounsExercises">
        <v-col :key="i" width="10%">
          <v-hover v-slot="{ hover }">
            <v-card :class="{ 'on-hover':hover }" :elevation="hover ? 12 : 2" color="#0582CD">
              <v-card-title>{{ nounsExercise.title }}</v-card-title>
              <v-card-text>{{ nounsExercise.body }}</v-card-text>
              <v-card-actions>
                <v-row v-show="hover">
                  <v-col align="end">
                    <v-btn @click="startExercise(nounsExercises[i])">Go</v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>

    <v-row
      align="center"
      justify="center"
      style="height:210px"
      v-if="!currentQuestion && isFinished === false"
    >
      <v-col cols="1">
        <p class="title white--text">Adjectives</p>
      </v-col>
      <template v-for="(AdjsExercise, i) in AdjsExercises">
        <v-col :key="i" width="10%">
          <v-hover v-slot="{ hover }">
            <v-card :class="{ 'on-hover':hover }" :elevation="hover ? 12 : 2" color="#159FEA">
              <v-card-title>{{ AdjsExercise.title }}</v-card-title>
              <v-card-text>{{ AdjsExercise.body }}</v-card-text>
              <v-card-actions>
                <v-row v-show="hover">
                  <v-col align="end">
                    <v-btn @click="startExercise(AdjsExercises[i])">Go</v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>

    <v-slide-y-transition mode="in" hide-on-leave="true">
      <Translate v-if="currentQuestion" v-show="currentQuestion.id === '02'"></Translate>
    </v-slide-y-transition>
    <v-slide-y-transition mode="in" hide-on-leave="true">
      <Translate v-if="currentQuestion" v-show="currentQuestion.id === '03'"></Translate>
    </v-slide-y-transition>
    <v-slide-y-transition mode="in" hide-on-leave="true">
      <Translate v-if="currentQuestion" v-show="currentQuestion.id === '04'"></Translate>
    </v-slide-y-transition>
    <v-slide-y-transition mode="in" hide-on-leave="true">
      <Translate v-if="currentQuestion" v-show="currentQuestion.id === '05'"></Translate>
    </v-slide-y-transition>

    <v-slide-y-transition mode="in" hide-on-leave="true">
      <InputArticle v-if="currentQuestion" v-show="currentQuestion.id === '01'"></InputArticle>
    </v-slide-y-transition>

    <!-- <Summary v-if="!currentQuestion && isFinished === true"></Summary> -->
  </v-container>
</template>

<script>
import InputArticle from "./InputArticle.vue";
import Translate from "./Translate.vue";
// import Summary from "./Summary.vue";
import { eventBus } from "../../main.js";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "exercise",
  components: {
    InputArticle,
    Translate
  },
  data() {
    return {
      isFinished: false,
      currentExercise: 0,
      verbsExercises: [
        {
          title: "Full Verbs Exercise",
          body: "Practice verbs wiht different type of exercises",
          url: "full/verbs"
        },
        {
          title: "Translation EN-DE",
          body: "Practice translation: English to German",
          url: "getSingle?id=04&module=verbs"
        },
        {
          title: "Translation DE-EN",
          body: "Practice translation: German to English",
          url: "getSingle?id=05&module=verbs"
        }
      ],
      nounsExercises: [
        {
          title: "Full Nouns Exercise",
          body: "Practice verbs wiht different type of exercises",
          url: "full/nouns"
        },
        {
          title: "Input the article",
          body: "Show your skills with DER, DIE, DAS articles",
          url: "getSingle?id=01&module=nouns"
        },
        {
          title: "Translation DE-EN",
          body: "Practice translation: German to English",
          url: "getSingle?id=03&module=nouns"
        },
        {
          title: "Translation EN-DE",
          body: "Practice translation: English to German",
          url: "getSingle?id=02&module=nouns"
        }
      ],
      AdjsExercises: [
        {
          title: "Full Adjectives Exercise",
          body: "Practice adjectives wiht different type of exercises",
          url: "full/adjs"
        },
        {
          title: "Translation EN-DE",
          body: "Practice translation: English to German",
          url: "getSingle?id=04&module=adjectives"
        },
        {
          title: "Translation DE-EN",
          body: "Practice translation: German to English",
          url: "getSingle?id=05&module=adjectives"
        }
      ]
    };
  },
  computed: mapState(["exercise", "currentQuestion", "remaining"]),
  methods: {
    ...mapGetters(["getRandomQuestion", "getRemaining"]),
    ...mapActions(["getExercise", "newRandomQuestion"]),
    ...mapMutations(["cleanExercise"]),
    async startExercise(type) {
      try {
        await this.getExercise(type.url);
        this.newRandomQuestion();
        console.log(type.url);
        console.log("start exercise");
      } catch (error) {
        console.log(error);
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log(this.isFinished);
    if (this.isFinished === false) {
      if (confirm("If you leave all progress will be lost. Continue?")) {
        this.cleanExercise();
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
  mounted() {
    console.log("Get remaining on mounted", this.getRemaining());
    eventBus.$on("next-click", () => {
      this.newRandomQuestion();
      console.log("Quedan from getter", this.getRemaining());
    });
    eventBus.$on("finished", () => {
      this.isFinished = true;
      const path = "/";
      if (this.$route.path !== path) this.$router.push("/exercise/summary");
    });
  }
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

.v-card:not(.on-hover) {
  opacity: 0.8;
}

.v-card {
  transition: opacity 0.4s ease-in-out;
}

.parent-container .container {
  height: 100%;
}

.parent-container .container .main-row {
  height: 100%;
}
.parent-container {
  height: 100%;
}
</style>
