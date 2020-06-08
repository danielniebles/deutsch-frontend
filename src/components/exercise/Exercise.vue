<template>
  <v-container fluid class="fill-height" id="exercise">
    <v-row justify="center" align="center">
      <v-col>
        <v-btn v-if="!currentQuestion" @click="startExercise">Start
        </v-btn>
      </v-col>
    </v-row>

    <InputArticle v-if="currentQuestion" 
    v-show="currentQuestion.id === '01'"></InputArticle>
    <Translate v-if="currentQuestion" 
    v-show="
    currentQuestion.id === '02' ||
    currentQuestion.id === '03' ||
    currentQuestion.id === '04' ||
    currentQuestion.id === '05'"></Translate>
    
      

  </v-container>
</template>

<script>
import InputArticle from "./InputArticle.vue";
import Translate from "./Translate.vue";
import { eventBus } from "../../main.js";
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: "exercise",
  components: {
    InputArticle,
    Translate,
  },
  data() {
    return {
    };
  },
  computed: mapState(['exercise', 'currentQuestion', 'remaining']),
  methods:{
      ...mapGetters(['getRandomQuestion','getRemaining']),
      ...mapActions(['getExercise', 'newRandomQuestion']),
      startExercise(){
        this.newRandomQuestion()
        console.log('start exercise')
      }
    },
  mounted(){
        this.getExercise()
        console.log(this.exercise)
        eventBus.$on('next-click', () => {
          this.newRandomQuestion()
          console.log('Quedan from getter', this.getRemaining())
        })
  }
}
</script>
