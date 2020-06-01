<template>
  <v-container fluid class="fill-height" id="exercise">
    <v-row justify="center" align="center">
      <v-col>
        <v-btn success>Start</v-btn>
      </v-col>
    </v-row>

    <v-container fluid v-for="item in exerciseIn" :key="item.id">
      <template v-if="item.id == 1">
        <InputArticle></InputArticle>
      </template>

      <template v-else-if="item.id == 2">
        <Translate></Translate>
      </template>
    </v-container>
  </v-container>
</template>

<script>
import InputArticle from "./InputArticle.vue";
import Translate from "./Translate.vue";
//import { eventBus } from "../../main.js";
export default {
  name: "exercise",
  components: {
    InputArticle,
    Translate,
  },
  data() {
    return {
      exerciseIn: [{ id: 1 }, { id: 2 }, { id: 1 }],
      render: 0
    };
  },
  methods:{
      async loader(){
          this.exerciseIn.forEach( (elm) => {
              this.render = elm.id
              //await eventBus.$on('next' ())
          })
      }
  }
};
</script>
