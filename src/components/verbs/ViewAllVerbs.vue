<template>
  <v-container id="view-all-verbs" fluid>
    <v-row>
      <v-col>
        <v-card shaped elevation="8" style="margin:12px;">
          <v-list two-line>
            <v-subheader>Verbs</v-subheader>
            <template v-for="(verb,index) in verbs">
              <v-divider v-if="true" :key="verb.value" :inset="false"></v-divider>

              <v-list-item else :key="verb.docId" style="height:1px">
                <v-list-item-content>
                  <v-list-item-title v-text="verb.value"></v-list-item-title>
                  <v-list-item-subtitle v-text="verb.translation"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-icon>
                  <router-link
                    style="text-decoration: none;"
                    :to="{
                      name: 'view-verb',
                      params: { docId: verb.docId, verb: verb },
                    }"
                  >
                    <v-btn icon>
                      <v-icon>mdi-information</v-icon>
                    </v-btn>
                  </router-link>
                </v-list-item-icon>

                <v-list-item-icon>
                  <v-btn icon @click="editVerb(index)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-list-item-icon>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <router-link to="/verbs/addverb" style="text-decoration: none">
      <v-btn class="mx-2 secondary" fab fixed right bottom>
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </router-link>

    <v-overlay :value="overlay" :absolute="absolute">
      <EditVerb :verb="this.verbs[this.selectedVerb]"></EditVerb>
    </v-overlay>
  </v-container>
</template>

<script>
import { Api } from "../../utilities/Api";
import { eventBus } from "../../main.js";
import EditVerb from "./EditVerb";
import { mapState } from "vuex";

export default {
  name: "view-verbs",
  components: {
    EditVerb
  },
  data() {
    return {
      verbs: [],
      selectedVerb: 0,
      overlay: false,
      absolute: false
    };
  },
  computed: mapState(["currentQuestion", "exercise"]),
  methods: {
    async getVerbs() {
      const response = await Api().get("/verbs/all");
      const dummyVar = response.data.data;
      //console.log(dummyVar);
      dummyVar.forEach(element => {
        this.verbs.push(element);
      });
    },
    editVerb(index) {
      this.selectedVerb = index;
      this.overlay = !this.overlay;
      //eventBus.$emit('edit-verbs', this.verbs[this.selectedVerb])
      //console.log('emitted')
    }
  },
  mounted() {
    this.getVerbs();
    eventBus.$on("click-back", overlay => {
      this.overlay = !overlay;
    });
    console.log(this.exercise.length)
  }
};
</script>

<style scoped>
.container .v-list {
  --background: #e0e5ec;
  --gray: #797d7f;
  background-color: var(--background);
}

.container {
  --background: #e0e5ec;
  --gray: #797d7f;
  background-color: var(--background);
}

.v-list {
  box-shadow: 8px 8px 16px rgba(165, 177, 198, 0.8),
    -8px -8px 16px rgba(255, 255, 255, 0.8) !important;
}

.v-list .v-sheet{
  box-shadow: 8px 8px 16px rgba(165, 177, 198, 0.8),
    -8px -8px 16px rgba(255, 255, 255, 0.8) !important;
}
</style>
