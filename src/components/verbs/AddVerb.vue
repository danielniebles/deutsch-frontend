<template>
  <v-container fluid class="fill-height" id="add-verb">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card shaped dark>
          <v-toolbar color="secondary" dark flat>
            <v-toolbar-title>Add Verb</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon>mdi-plus</v-icon>
          </v-toolbar>

          <v-form @submit.prevent="saveVerb">
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
                  <router-link to="/verbs/all" style="text-decoration: none;">
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
  name: "add-verb",
  data() {
    return {
      value: null,
      translation: null,
      errors: [],
      rules: [v => !!v || "This value is required"]
    };
  },
  methods: {
    async saveVerb() {
      this.errors.length = 0;
      if (this.translation && this.value) {
        await Api().post("/verbs/write", {
          value: this.value,
          translation: this.translation
        });
        const path = "/";
        if (this.$route.path !== path) this.$router.push("/verbs/all");
      } else {
        if (!this.value) this.errors.push("Value required");
        if (!this.translation) this.errors.push("Translation required");
      }
    }
  }
};
</script>

<style scoped>
.container {
  --background: #e0e5ec;
  --gray: #797d7f;
  background-color: var(--background);
}

.container .v-card{
  --background: #e0e5ec;
  --gray: #797d7f;
  background-color: var(--background);
}

.v-card{
  box-shadow: 8px 8px 16px rgba(165, 177, 198, 0.8),
    -8px -8px 16px rgba(255, 255, 255, 0.8) !important;
}
</style>
