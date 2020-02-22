import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import vuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new vuexPersistence({
  storage: window.sessionStorage
})

export const store = new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    isLogin: false
  },
  mutations
})
