<template>
  <v-container fluid class="fill-height">
    <v-row>
      <v-col cols="12" align="center" justify="center">
        <h1>Willkommen!</h1>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" >
      <v-col cols="6">
        <v-hover v-slot:default="{ hover }">
          <v-carousel v-model="currentSlide" class="wrapper">
            <v-carousel-item
              v-for="(slide, i) in slides"
              :key="i"
              :src="slide.src"
            >
              <v-fade-transition >
                <div v-if="hover" >
                  <v-overlay v-if="hover" absolute class="align-center">
                    <v-btn href="https://www.spiegel.de" target="_blank">SEE MORE</v-btn>
                  </v-overlay>
                </div>
              </v-fade-transition>
            </v-carousel-item>
          </v-carousel>
        </v-hover>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
        <p v-show="currentSlide === 0" style="color: white">Check the newest news in German</p>
        <p v-show="currentSlide === 1" style="color: white">Check the Busuu App to learn German!</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
      overlay: false,
      slides: [
        {
          src:
            "https://ichef.bbci.co.uk/news/624/cpsprodpb/17096/production/_104885349_spieg985.jpg",
          color: "indigo",
          text: "Full Exercise",
        },
        {
          src:
            "https://blog.busuu.com/wp-content/uploads/2019/06/Busuu-New-Logo-Blog-Post-324x160.png",
          color: "indigo",
          text: "Full Exercise",
        },
      ],
    };
  },
};
</script>

<style scoped>
.wrapper {
    width:200px;
    height:200px;
    background:#ddd;
    vertical-align:middle;    
    display:table-cell;
}

.insider{
    background:#ccc;
    margin:20px;
    text-align:center;}
</style>
