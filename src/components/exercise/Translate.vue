<template>
  <v-container id="translate">
    <v-row class="main-row" align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card shaped dark>
          <v-toolbar color="secondary" dark flat>
            <v-toolbar-title>Exercise</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon>mdi-pencil</v-icon>
          </v-toolbar>

          <v-form @submit.prevent="checkAnswer">
            <v-card-title
              v-show="
                currentQuestion.id === '02' || currentQuestion.id === '04'
              "
              style="padding: 0px"
              class="mt-2 ml-5"
              >Whats the translation of...</v-card-title
            >

            <v-card-title
              v-show="
                currentQuestion.id === '03' || currentQuestion.id === '05'
              "
              style="padding: 0px"
              class="mt-2 ml-5"
              >Welche ist die Übersetzung...</v-card-title
            >

            <v-card-subtitle
              style="padding: 0px"
              class="mt-2 ml-5"
              v-show="currentQuestion.id === '02'"
            >
              {{ currentQuestion.translation }}</v-card-subtitle
            >
            <v-card-subtitle
              style="padding: 0px"
              class="mt-2 ml-5"
              v-show="currentQuestion.id === '03'"
            >
              {{
                currentQuestion.article + " " + currentQuestion.noun
              }}</v-card-subtitle
            >
            <v-card-subtitle
              style="padding: 0px"
              class="mt-2 ml-5"
              v-show="currentQuestion.id === '04'"
            >
              {{ currentQuestion.translation }}</v-card-subtitle
            >
            <v-card-subtitle
              style="padding: 0px"
              class="mt-2 ml-5"
              v-show="currentQuestion.id === '05'"
            >
              {{ currentQuestion.value }}</v-card-subtitle
            >

            <v-card-text>
              <v-text-field
                label="Translation"
                name="article"
                v-model="translation"
                prepend-icon="mdi-code-tags"
                type="text"
                required
                autocomplete="off"
                spellcheck="false"
              >
              </v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-row>
                <v-col align="end">
                  <v-btn>I don't know</v-btn>
                  <v-btn
                    type="submit"
                    class="secondary ml-3 mr-1"
                    :disabled="disabled"
                    >Check</v-btn
                  >
                </v-col>
              </v-row>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <v-row style="height:20%; margin-top:40px">
      <v-container style="padding:0px;" class=" fill-height align-end">
        <v-alert
          :value="check"
          :color="status"
          dense
          transition="scale-transition"
          :icon="icon"
          prominent
          style="width:100%"
          class="mb-0 justify-end "
        >
          <v-row class="align-center justify-center">
            <v-col class="grow">
              {{ message }}
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="shrink">
              <v-btn @click="nextClicked" text outlined>Next</v-btn>
            </v-col>
          </v-row>
        </v-alert>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import { eventBus } from "../../main.js";
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "input-article",
  data() {
    return {
      check: false,
      status: null,
      message: null,
      translation: null,
      disabled: null,
      icon: null,
    };
  },
  computed: mapState(["currentQuestion", "exercise"]),
  methods: {
    ...mapGetters(["getRandomQuestion", "getAnsweredCount"]),
    ...mapActions(["markAnswered", "changeStatus"]),
    ...mapMutations(["cleanExercise"]),
    checkAnswer() {
      this.check = !this.check;
      this.disabled = !this.disabled;
      //Translate EN-DE Noun
      if (
        this.currentQuestion.id === "02" &&
        this.translation ==
          this.currentQuestion.article + " " + this.currentQuestion.noun
      ) {
        this.pushCorrectInfo();
      }
      //Translate DE-EN Noun
      else if (
        this.currentQuestion.id === "03" &&
        this.translation === this.currentQuestion.translation
      ) {
        this.pushCorrectInfo();
      }
      //Translate EN-DE Verb-Adj
      else if (
        this.currentQuestion.id === "04" &&
        this.translation === this.currentQuestion.value
      ) {
        this.pushCorrectInfo();
      }
      //Translate DE-EN Verb-Adj
      else if (
        this.currentQuestion.id === "05" &&
        this.translation === this.currentQuestion.translation
      ) {
        this.pushCorrectInfo();
      } else {
        this.status = "red";
        this.message = "Wrong!";
        this.icon = "cancel";
      }
    },
    nextClicked() {
      this.check = false;
      this.disabled = !this.disabled;
      this.translation = null;
      (this.status = null), (this.message = null);
      this.markAnswered({
        prop: "answered",
        value: true,
        position: this.currentQuestion.exerciseid,
      });
      if (this.exercise.length === this.getAnsweredCount()){
        eventBus.$emit("next-click")
        eventBus.$emit('finished')
        console.log("Exercise finished")
      }else{
        eventBus.$emit("next-click")
        console.log("next click");
      }

    },
    pushCorrectInfo() {
      this.status = "success";
      this.message = "Correct!";
      this.icon = "mdi-check-circle";
      this.changeStatus({
        prop: "correct",
        value: true,
        position: this.currentQuestion.exerciseid,
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.value-box {
  padding: 0px;
}
</style>
