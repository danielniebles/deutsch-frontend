<template>
  <v-container fluid class="fill-height" id="edit-noun">
    <v-row align="center" justify="center">
      <v-col>
        <v-card shaped>
          <v-toolbar color="secondary" dark flat>
            <v-toolbar-title>Edit Noun</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon>mdi-pencil</v-icon>
          </v-toolbar>

          <v-form @submit.prevent="updateNoun">
            <v-card-text>
              <v-text-field
                prepend-icon="mdi-code-tags"
                value="noun.article"
                v-model="noun.article"
                type="text"
                required
                autocomplete="off"
              >
              </v-text-field>

              <v-text-field
                prepend-icon="mdi-code-tags"
                value="noun.noun"
                v-model="noun.noun"
                type="text"
                required
                autocomplete="off"
              >
              </v-text-field>

              <v-text-field
                prepend-icon="mdi-code-tags"
                value="noun.translation"
                v-model="noun.translation"
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
  name: "edit-noun",
  data() {
    return {
        overlay: null,
        errors: []
    };
  },
  props: {
     noun: {
          type: Object,
          required: true
        }
  },
  methods: {
    clickBack() {
      this.overlay = !this.overlay;
      eventBus.$emit("click-back", this.overlay);
    },
    async updateNoun(){
      this.errors.length = 0
      const url = `/nouns/update/${this.noun.docId}`
        if(this.noun.article && this.noun.noun){
            await Api().post(url, {
                article: this.noun.article,
                noun: this.noun.noun
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
