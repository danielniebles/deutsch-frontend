<template>
  <v-container fluid class="fill-height" id="add-adj">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card shaped dark>
          <v-toolbar color="secondary" dark flat>
            <v-toolbar-title>Add Adjective</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon>mdi-plus</v-icon>
          </v-toolbar>

          <v-form @submit.prevent="saveAdj">
            <v-card-text>
              <v-text-field
                label="Value"
                name="value"
                prepend-icon="mdi-code-tags"
                :rules="rules"
                type="text"
                v-model="value"
                required
                autocomplete="off"
              ></v-text-field>

              <v-text-field
                label="Translation"
                name="translation"
                prepend-icon="mdi-code-tags"
                :rules="rules"
                type="text"
                v-model="translation"
                required
                autocomplete="off"
              ></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-row>
                <v-col align="end ">
                  <router-link to="/adjs/all" style="text-decoration: none;">
                    <v-btn>Back</v-btn>
                  </router-link>
                  <v-btn type="submit" class="secondary ml-3 mr-1">Submit</v-btn>
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
import { Api } from "../../utilities/Api";
export default {
  name: "add-adj",
  data() {
    return {
      value: null,
      translation: null,
      errors: [],
      rules: [v => !!v || "This value is required"]
    };
  },
  methods: {
    async saveAdj() {
      this.errors.length = 0;
      if (this.translation && this.value) {
        await Api().post("/adjectives/write", {
          value: this.value,
          translation: this.translation
        });
        const path = "/";
        if (this.$route.path !== path) this.$router.push("/adjs/all");
      } else {
        if (!this.value) this.errors.push("Value required");
        if (!this.translation) this.errors.push("Translation required");
      }
    }
  }
};
</script>
