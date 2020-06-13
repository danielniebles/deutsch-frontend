<template>
  <v-container fluid class="fill-height" id="edit-adj">
    <v-row align="center" justify="center">
      <v-col>
        <v-card shaped class="card-width   card-two-line">
          <v-toolbar color="secondary" dark flat>
            <v-toolbar-title>Edit Adjective</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon>mdi-pencil</v-icon>
          </v-toolbar>

          <v-form @submit.prevent="updateAdj">
            <v-card-text>
              <v-text-field
                prepend-icon="mdi-code-tags"
                value="adj.value"
                v-model="adj.value"
                type="text"
                required
                autocomplete="off"
              >
              </v-text-field>

              <v-text-field
                prepend-icon="mdi-code-tags"
                value="adj.translation"
                v-model="adj.translation"
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
  name: "edit-adj",
  data() {
    return {
      overlay: null,
      errors: [],
    };
  },
  props: {
    adj: {
      type: Object,
      required: true,
    },
  },
  methods: {
    clickBack() {
      this.overlay = !this.overlay;
      eventBus.$emit("click-back", this.overlay);
    },
    async updateAdj() {
      this.errors.length = 0;
      const url = `/adjectives/update/${this.adj.docId}`;
      if (this.adj.translation && this.adj.value) {
        await Api().post(url, {
          value: this.adj.value,
          translation: this.adj.translation,
        });
        this.clickBack();
      } else {
        if (!this.value) this.errors.push("Value required");
        if (!this.translation) this.errors.push("Translation required");
      }
    },
  },
};
</script>

<style scoped>
  @import "../../assets/style.css";
</style>
