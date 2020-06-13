<template>
  <v-container fluid class="fill-height">
    <v-row>
      <v-col cols="12" align="center" justify="center">
        <h1 style="color: white">Willkommen!</h1>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" >
      <v-col cols="6">
        <v-hover v-slot:default="{ hover }" >
          <v-carousel cycle v-model="currentSlide" height="400">
            <v-carousel-item
              v-for="(slide, i) in slides"
              :key="i"
              :src="slide.src"
            >
              <v-fade-transition>
                <v-container fluid class="fill-height wrapper" >
                  <v-row align="center" justify="center">
                    <v-col >
                      <v-overlay v-if="hover" absolute class="wrapper">
                        <v-btn :href="slide.link" target="_blank"
                          >SEE MORE</v-btn
                        >
                      </v-overlay>
                    </v-col>
                  </v-row>
                </v-container>
              </v-fade-transition>
            </v-carousel-item>
          </v-carousel>
        </v-hover>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
        <p class="display-1" v-show="currentSlide === 0" style="color: white">
          Check the newest news in German
        </p>
        <p class="display-1" v-show="currentSlide === 1" style="color: white">
          Check the Busuu App to learn German!
        </p>
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
          link: 'https://www.spiegel.de'
        },
        {
          src:
            "https://lh3.googleusercontent.com/FeX76vHVPmnh4to6dFEvhM0agREB3YZ76Qoo2HTGYmwL9DRKOz1Y7pU9bwHbo-Gsxek",
          color: "indigo",
          text: "Full Exercise",
          link: 'https://www.busuu.com/dashboard#/timeline'
        },
      ],
    };
  },
};
</script>

<style scoped>
.wrapper{
    height:400px;
}
</style>
