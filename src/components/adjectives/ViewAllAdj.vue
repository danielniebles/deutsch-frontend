<template>
  <v-container id="view-all-adjs" fluid>
    <v-row>
      <v-col>
        <v-card class="mx-auto" shaped elevation="8">
          <v-list two-line>
            <v-subheader>Adjectives</v-subheader>
            <template v-for="(adjective,index) in adjectives">
              <v-divider
                v-if="true"
                :key="adjective.value"
                :inset="false"
              ></v-divider>

              <v-list-item else :key="adjective.docId" style="height:1px">
                <v-list-item-content>
                  <v-list-item-title v-text="adjective.value"></v-list-item-title>
                  <v-list-item-subtitle v-text="adjective.translation"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-icon>
                  <router-link
                    style="text-decoration: none;"
                    :to="{
                      name: 'view-adj',
                      params: { docId: adjective.docId },
                    }"
                  >
                    <v-btn icon>
                      <v-icon>mdi-information</v-icon>
                    </v-btn>
                  </router-link>
                </v-list-item-icon>

                <v-list-item-icon>
                  <v-btn icon @click="editAdj(index)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-list-item-icon>
                
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <router-link to="/adj/addadj" style="text-decoration: none">
      <v-btn class="mx-2 secondary" fab fixed right bottom>
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </router-link>

             <v-overlay :value="overlay" :absolute="absolute">
                <EditAdj :adj="this.adjectives[this.selectedAdj]"></EditAdj>
            </v-overlay>
    
  </v-container>
</template>

<script>
import { Api } from "../../utilities/Api";
import { eventBus } from "../../main.js";
import EditAdj from "./EditAdj";

export default {

  name: "view-adj",
  components: {
    EditAdj,
  },
  data() {
    return {
      adjectives: [],
      selectedAdj: 0,
      overlay: false,
      absolute: false,
    };
  },
  methods: {
    async getAdjs() {
      const response = await Api().get("/adjectives/all");
      const dummyVar = response.data.data;
      dummyVar.forEach((element) => {
        this.adjectives.push(element);
      });
    },
    editAdj(index){
      this.selectedAdj = index
      this.overlay = !this.overlay
    }
  },
  mounted() {
    this.getAdjs();
    eventBus.$on('click-back', (overlay) => {
      this.overlay = !overlay;
    });
    
  },
};
</script>
