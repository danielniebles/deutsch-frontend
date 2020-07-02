<template>
  <v-container fluid class="fill-height">
    <h3>{{ verb.translation }}</h3>
    <div
      data-verbix-conjugate-language="deu"
      data-verbix-conjugate-key="e82c7237-ad4e-11ea-8527-e237142b3bef"
      :data-verbix-conjugate-verb="verb.value"
    ></div>
    <h3>Indicative Present</h3>
    <v-card>
        <div data-verbix-conjugate-tense="1" ></div>
    </v-card>
    
  </v-container>
</template>

<script>
import { Api } from "../../utilities/Api";
export default {
  name: "view-verb",
  date() {
    return {
      value: null,
      translation: null,
      test: null
    };
  },
  props: {
    verb: {
      type: Object,
      required: true,
    },
  },

  methods: {
    async getVerbById() {
      const url = `/verbs/getbyId?valuedb=docId&conditions=%3D%3D&docId=${this.verb.docId}`;
      console.log(url);
      const response = await Api().get(url);
      console.log(response);
    },
  },
  mounted() {
    let verbixScript = document.createElement('script')
    verbixScript.setAttribute('src', 'https://verbix-api.nyc3.cdn.digitaloceanspaces.com/conjugator/v2.0.0.js')
    document.head.appendChild(verbixScript)
    //this.getVerbById()
  },
};
</script>
