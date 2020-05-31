<template>
  <v-container id="view-nouns" fluid>
    <v-row>
      <v-col>
        <v-card class="mx-auto" shaped elevation="8">
          <v-list two-line>
            <v-subheader>Nouns</v-subheader>
            <template v-for="(noun,index) in nouns">
              <v-divider
                v-if="true"
                :key="noun.noun"
                :inset="false"
              ></v-divider>

              <v-list-item else :key="noun.docId" style="height:1px">
                <v-list-item-content>
                  <v-list-item-title v-text="noun.article + ' ' + noun.noun"></v-list-item-title>
                  <v-list-item-subtitle v-text="noun.translation"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-icon>
                  <router-link
                    style="text-decoration: none;"
                    :to="{
                      name: 'view-noun',
                      params: { docId: noun.docId },
                    }"
                  >
                    <v-btn icon>
                      <v-icon>mdi-information</v-icon>
                    </v-btn>
                  </router-link>
                </v-list-item-icon>

                <v-list-item-icon>
                  <v-btn icon @click="editNoun(index)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-list-item-icon>
                
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <router-link to="/verbs/addnoun" style="text-decoration: none">
      <v-btn class="mx-2 secondary" fab fixed right bottom>
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </router-link>

    <v-row>
        <v-col cols="12">
             <v-overlay :value="overlay" :absolute="absolute">
                <EditNoun :noun="this.nouns[this.selectedNoun]"></EditNoun>
            </v-overlay>
        </v-col>
    </v-row>

    
  </v-container>
</template>

<script>
import { Api } from "../../utilities/Api";
import { eventBus } from "../../main.js";
import EditNoun from "./EditNoun";

export default {

  name: "view-nouns",
  components: {
    EditNoun,
  },
  data() {
    return {
      nouns: [],
      selectedNoun: 0,
      overlay: false,
      absolute: false,
    };
  },
  methods: {
    async getNouns() {
      const response = await Api().get("/nouns/all");
      const dummyVar = response.data.data;
      dummyVar.forEach((element) => {
        this.nouns.push(element);
      });
    },
    editNoun(index){
      this.selectedNoun = index
      this.overlay = !this.overlay
    }
  },
  mounted() {
    this.getNouns();
    eventBus.$on('click-back', (overlay) => {
      this.overlay = !overlay;
    });
    
  },
};
</script>
