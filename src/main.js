import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

// import VueCompositionAPI from '@vue/composition-api'
// import VueTextareaAutosize from 'vue-textarea-autosize'

// Vue.use(VueTextareaAutosize)
// Vue.use(vuetify);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
