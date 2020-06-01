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
            <v-card-title>Which is the article?</v-card-title>

            <v-card-text>
              <v-row justify="center" align="center">
                <v-col cols="4">
                  <v-text-field
                    label="Article"
                    name="article"
                    prepend-icon="mdi-code-tags"
                    type="text"
                    required
                    autocomplete="off"
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="8" style="padding: 0">
                  <v-card-text style="margin: 0; padding: 0">Noun</v-card-text>
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

    <v-snackbar v-model="check" color="success">
      Correct!
      <v-btn @click="check = false" text>Next</v-btn>
    </v-snackbar>
    
  </v-container>
</template>

<script>
//import { Api } from "../../utilities/Api";
export default {
  name: "input-article",
  data() {
    return {
      check: false,
    };
  },
  methods: {
    checkAnswer() {
      this.check = !this.check;
    },
  },
};
</script>
