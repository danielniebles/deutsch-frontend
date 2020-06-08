<template>
  <v-container fluid class="fill-height" id="input-article">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card shaped dark>
          <v-toolbar color="secondary" dark flat>
            <v-toolbar-title>Exercise</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon>mdi-pencil</v-icon>
          </v-toolbar>

          <v-form @submit.prevent="checkAnswer">
            <v-card-title>Which is the article?</v-card-title>

            <v-card-text>
              <v-row justify="center" align="center">
                <v-col cols="4">
                  <v-text-field
                    label="Article"
                    name="article"
                    v-model="article"
                    prepend-icon="mdi-code-tags"
                    type="text"
                    required
                    autocomplete="off"
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="8" style="padding: 0">
                  <v-card-text style="margin: 0; padding: 0">{{currentQuestion.noun}}</v-card-text>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-row>
                <v-col align="end">
                  <router-link to="/" style="text-decoration: none;">
                    <v-btn>I don't know</v-btn>
                  </router-link>
                  <v-btn type="submit" class="secondary ml-3 mr-1">Check</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="check" :color="status">
      {{message}}
      <v-btn @click="nextClicked" text>Next</v-btn>
    </v-snackbar>
    
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import { eventBus } from "../../main.js";
export default {
  name: "input-article",
  data() {
    return {
      article: null,
      check: false,
      status: null,
      message: null
    };
  },
  computed: mapState(['currentQuestion']),
  methods: {
    ...mapGetters(['getRandomQuestion']),
    ...mapActions(['markAnswered']),
    checkAnswer() {
      this.check = !this.check;
      if(this.article === this.currentQuestion.article){
        this.status = "success"
        this.message = "Correct!"
      }else{
        this.status = "red"
        this.message = "Wrong!"
      }
    },
    nextClicked(){
      this.check = false
      this.article = null
      this.markAnswered({prop: "answered", value:true, position: this.currentQuestion.exerciseid})
      console.log('emit from next')
      eventBus.$emit('next-click')
    }
  },
  mounted(){
    console.log(this.currentQuestion.id)
  }
};
</script>
