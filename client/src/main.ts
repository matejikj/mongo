import Vue from 'vue'
import App from './app/App.vue'
import router from './app/router'
import store from './app/store'
import VueSocketIO from 'vue-socket.io'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(new VueSocketIO({
  connection: 'http://localhost:5000'
}))
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
