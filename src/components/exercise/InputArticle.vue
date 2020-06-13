<template>
  <v-container fluid class="fill-height" id="input-article">
    <v-row align="center" justify="center" class="mt-12">
      <v-col cols="12" sm="8" md="4">
        <v-card shaped dark>
          <v-toolbar color="secondary" dark flat>
            <v-toolbar-title>Exercise</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon>mdi-pencil</v-icon>
          </v-toolbar>

          <v-form @submit.prevent="checkAnswer">
            <v-card-title style="padding: 0px" class="mt-2 ml-5"
              >Which is the article?</v-card-title
            >

            <v-card-text style="padding: 0px">
              <v-row
                justify="center"
                align="center"
                style="padding: 0px"
                class="mt-2 ml-5"
              >
                <v-col cols="4" style="padding: 0px">
                  <v-text-field
                    label="Article"
                    name="article"
                    v-model="article"
                    prepend-icon="mdi-code-tags"
                    type="text"
                    required
                    autocomplete="off"
                    spellcheck="false"
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="8" style="padding: 0">
                  <v-card-text style="margin: 0; padding: 0">{{
                    currentQuestion.noun
                  }}</v-card-text>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-row align="start">
                <v-col align="end">
                  <v-btn>I don't know</v-btn>
                  <v-btn type="submit" class="secondary ml-3 mr-1">Check</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <v-row column justify-space-between style="height:100px">
      <v-container style="padding:0px;" class=" fill-height align-end">
        <v-alert
          :value="check"
          :color="status"
          dense
          transition="scale-transition"
          :icon="icon"
          prominent
          style="width:100%"
          class="mb-0"
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
import { mapGetters, mapState, mapActions } from "vuex";
import { eventBus } from "../../main.js";
export default {
  name: "input-article",
  data() {
    return {
      article: null,
      check: false,
      status: null,
      message: null,
      icon: null,
    };
  },
  computed: mapState(["currentQuestion"]),
  methods: {
    ...mapGetters(["getRandomQuestion"]),
    ...mapActions(["markAnswered"]),
    checkAnswer() {
      this.check = !this.check;
      if (this.article === this.currentQuestion.article) {
        this.status = "success";
        this.message = "Correct!";
        this.icon = "mdi-check-circle";
      } else {
        this.status = "red";
        this.message = "Wrong!";
        this.icon = "cancel";
      }
    },
    nextClicked() {
      this.check = false;
      this.article = null;
      this.markAnswered({
        prop: "answered",
        value: true,
        position: this.currentQuestion.exerciseid,
      });
      console.log("emit from next");
      eventBus.$emit("next-click");
    },
  },
  mounted() {
    console.log(this.currentQuestion.id);
  },
};
</script>
