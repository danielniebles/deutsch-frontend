import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import vuetify from './plugins/vuetify';
import store from './store'

export const eventBus = new Vue();

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
