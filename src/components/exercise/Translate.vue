<template>
  <v-container fluid class="fill-height" id="add-verb">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card shaped dark>
          <v-toolbar color="secondary" dark flat>
            <v-toolbar-title>Exercise</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon>mdi-pencil</v-icon>
          </v-toolbar>

          <v-form @submit.prevent="checkAnswer">
            <v-card-title>Whats the translation of...</v-card-title>

            <v-card-subtitle v-show="currentQuestion.id === '02'">
              {{ currentQuestion.translation }}</v-card-subtitle>
            <v-card-subtitle v-show="currentQuestion.id === '03'">
              {{ currentQuestion.article + ' ' + currentQuestion.noun }}</v-card-subtitle>
            <v-card-subtitle v-show="currentQuestion.id === '04'">
              {{ currentQuestion.translation }}</v-card-subtitle>
            <v-card-subtitle v-show="currentQuestion.id === '05'">
              {{ currentQuestion.value }}</v-card-subtitle>
            
            <v-card-text>
              
                  <v-text-field
                    label="Translation"
                    name="article"
                    v-model="translation"
                    prepend-icon="mdi-code-tags"
                    type="text"
                    required
                    autocomplete="off"
                  >
                  </v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-row>
                <v-col align="end">
                  <router-link to="/" style="text-decoration: none;">
                    <v-btn>I don't know</v-btn>
                  </router-link>
                  <v-btn type="submit" class="secondary ml-3 mr-1" :disabled="disabled"
                    >Check</v-btn
                  >
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
import { eventBus } from "../../main.js";
import { mapGetters, mapState, mapActions } from 'vuex';
export default {
  name: "input-article",
  data() {
    return {
      check: false,
      status: null,
      message: null,
      translation: null,
      disabled: null
    };
  },
  computed: mapState(['currentQuestion']),
  methods: {
    ...mapGetters(['getRandomQuestion']),
    ...mapActions(['markAnswered']),
    checkAnswer() {
      this.check = !this.check;
      this.disabled = !this.disabled
      //Translate EN-DE Noun
      if(this.currentQuestion.id === '02' && 
      (this.translation == this.currentQuestion.article + ' ' + this.currentQuestion.noun)){
        this.status = "success"
        this.message = "Correct!"
      }
      //Translate DE-EN Noun
      else if (this.currentQuestion.id === '03' &&
      (this.translation === this.currentQuestion.translation)){
        this.status = "success"
        this.message = "Correct!"
      }
      //Translate EN-DE Verb-Adj
      else if(this.currentQuestion.id === '04' && 
      (this.translation === this.currentQuestion.value)){
        this.status = "success"
        this.message = "Correct!"
      }
      //Translate DE-EN Verb-Adj
      else if(this.currentQuestion.id === '05' && 
      this.translation === this.currentQuestion.translation){
        this.status = "success"
        this.message = "Correct!"
      } 
      else{
        this.status = "red"
        this.message = "Wrong!"
      }

    },
    nextClicked(){
      this.check = false
      this.disabled = !this.disabled
      this.translation = null
      this.status = null,
      this.message = null
      this.markAnswered({prop: "answered", value:true, position: this.currentQuestion.exerciseid})
      console.log('next click')
      eventBus.$emit('next-click')
    }
  },
  mounted(){
  }
};
</script>


<style>
.value-box{
  padding: 0px
}

</style>