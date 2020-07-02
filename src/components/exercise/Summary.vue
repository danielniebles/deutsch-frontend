<template>
  <v-container fluid class="fill-height">
      <v-card>
          <v-progress-circular dark
      :value="ratio"
      color="green"
      size="200"
      width="15"
      >{{ ratio }}</v-progress-circular
    >

      </v-card>
    
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      ratio: 0
    };
  },
  computed: mapState(["currentQuestion", "exercise"]),
  methods: {
    ...mapGetters(["getCorrectCount"]),
    format(num) {
      num.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
  },
  mounted() {
    this.ratio = ((this.getCorrectCount() / this.exercise.length) * 100).toFixed(2)
    console.log(this.ratio)
    this.getCorrectCount();
  },
};
</script>
