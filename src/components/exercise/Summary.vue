<template>
  <v-container id="summary">
    <v-row>
      <v-col cols="12" align="center">
        <h1 style="color: white;">Exercise Finished!</h1>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="3">
        <v-card align="center" justify="center">
          <v-progress-circular
            style="margin:10px;"
            dark
            :value="aux"
            color="green"
            size="200"
            width="15"
            rotate="-90"
          >{{ ratio }}</v-progress-circular>
        </v-card>
      </v-col>
      <v-col cols="12" align="center">
        <h2 style="color: white">Your score:</h2>
        <h2 style="color: white">{{ correct + "/" + total }}</h2>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-col cols="2">
        <v-btn>Exercise again</v-btn>
      </v-col>
      <v-col cols="1">
        <v-btn @click="onBack">Back</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      ratio: 0,
      correct: 0,
      total: 0,
      interval: {},
      aux: 0
    };
  },
  computed: mapState(["currentQuestion", "exercise"]),
  methods: {
    ...mapGetters(["getCorrectCount"]),
    ...mapMutations(["cleanExercise"]),
    format(num) {
      num.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },
    onBack(){
      this.cleanExercise()
      const path = "/";
      if (this.$route.path !== path) this.$router.push("/exercise");
    }
  },
  mounted() {
    this.correct = this.getCorrectCount();
    this.total = this.exercise.length;
    this.ratio = ((this.correct / this.total) * 100).toFixed(2);
    this.interval = setInterval(() => {
      if (this.aux < this.ratio) {
        this.aux += 3;
      } else {
        this.aux = this.ratio;
      }
    }, 10);
    console.log(this.ratio);
  }
};
</script>
