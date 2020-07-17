<template>
  <v-container fluid class="fill-height" id="add-noun">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card shaped dark >
          <v-toolbar color="secondary" dark flat>
            <v-toolbar-title>Add Noun</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon>mdi-plus</v-icon>
          </v-toolbar>

          <v-form @submit.prevent="saveNoun">
            <v-card-text>
              <v-text-field
                label="article"
                name="article"
                prepend-icon="mdi-code-tags"
                :rules="rules"
                type="text"
                v-model="article"
                required
                autocomplete="off"
              >
              </v-text-field>

              <v-text-field
                label="noun"
                name="noun"
                prepend-icon="mdi-code-tags"
                :rules="rules"
                type="text"
                v-model="noun"
                required
                autocomplete="off"
              >
              </v-text-field>

              <v-text-field
                label="Translation"
                name="translation"
                prepend-icon="mdi-code-tags"
                :rules="rules"
                type="text"
                v-model="translation"
                required
                autocomplete="off"
              >
              </v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-row>
                <v-col align="end ">
                  <router-link to="/nouns/all" style="text-decoration: none;">
                    <v-btn >Back</v-btn>
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
  name: "add-noun",
  data() {
    return {
      article: null,
      noun: null,
      translation: null,
      errors: [],
      rules: [(v) => !!v || "This value is required"],
    };
  },
  methods: {
    async saveNoun() { 
        this.errors.length = 0
        if(this.article && this.noun && this.translation) {
            await Api().post("/nouns/write", {
                article: this.article,
                noun: this.noun,
                translation: this.translation
                })
            const path = "/";
            if (this.$route.path !== path) this.$router.push("/nouns/all");
        }else{
            if(!this.article)this.errors.push("Article required")
            if(!this.noun)this.errors.push("Noun required")
            if(!this.translation)this.errors.push("Translation required")
        }    
    },
  },
};
</script>
