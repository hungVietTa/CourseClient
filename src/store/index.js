import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import createPersistedState from "vuex-persistedstate"


// MODULES
import adminStore from './modules/admin/index.js'
import authenStore from './modules/general/authen.js'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
      admin: adminStore,
      authen: authenStore
  },
  plugins: [vuexLocal.plugin, 
    createPersistedState({
    paths: ['authen']
  })]
})

