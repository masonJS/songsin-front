import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import { store } from './store'
import VueProgressBar from 'vue-progressbar'
import { $ } from './utils/$'

Vue.config.productionTip = false

Vue.prototype.$ = $
Vue.use(VueProgressBar, { color: '#00bfff' })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
