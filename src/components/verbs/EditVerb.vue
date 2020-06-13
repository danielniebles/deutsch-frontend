<template>
  <v-container fluid class="fill-height" id="edit-verb">
    <v-row align="center" justify="center">
      <v-col>
        <v-card shaped class="card-width">
          <v-toolbar color="secondary" dark flat>
            <v-toolbar-title>Edit Verb</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon>mdi-pencil</v-icon>
          </v-toolbar>

          <v-form @submit.prevent="updateVerb">
            <v-card-text>
              <v-text-field
                prepend-icon="mdi-code-tags"
                value="verb.value"
                v-model="verb.value"
                type="text"
                required
                autocomplete="off"
              >
              </v-text-field>

              <v-text-field
                prepend-icon="mdi-code-tags"
                value="verb.translation"
                v-model="verb.translation"
                type="text"
                required
                autocomplete="off"
              >
              </v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-row>
                <v-col align="end ">
                  <v-btn @click="clickBack">Back</v-btn>
                  <v-btn type="submit" class="secondary ml-3 mr-1"
                    >Submit</v-btn
                  >
                </v-col>
              </v-row>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { eventBus } from "../../main.js";
import { Api } from "../../utilities/Api";
export default {
  name: "edit-verb",
  data() {
    return {
      overlay: null,
       errors: []
    };
  },
  props: {
     verb: {
          type: Object,
          required: true
        }
  },
  methods: {
    clickBack() {
      this.overlay = !this.overlay;
      eventBus.$emit("click-back", this.overlay);
    },
    async updateVerb(){
      this.errors.length = 0
      const url = `/verbs/update/${this.verb.docId}`
        if(this.verb.translation && this.verb.value){
            await Api().post(url, {
                value: this.verb.value,
                translation: this.verb.translation
                })
            this.clickBack();
        }else{
            if(!this.value)this.errors.push("Value required")
            if(!this.translation)this.errors.push("Translation required")
        }
    }
  },
  
  
};
</script>

<style scoped>
  @import "../../assets/style.css";
</style>