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
            <v-card-subtitle>Tanzen</v-card-subtitle>

            <v-card-text>
              
                  <v-text-field
                    label="Article"
                    name="article"
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
                  <v-btn type="submit" class="secondary ml-3 mr-1"
                    >Check</v-btn
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
//import { Api } from "../../utilities/Api";
export default {
  name: "input-article",
  data() {
    return {};
  },
};
</script>
