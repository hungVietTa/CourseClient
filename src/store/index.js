import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import createPersistedState from "vuex-persistedstate"


// MODULES
// GENERAL
import authenStore from './modules/general/authen.js'
import homeCourseIdStore from './modules/general/courses/_id.js'
import alertStore from './modules/general/alert.js'
// ADMIN
import adminStore from './modules/admin/index.js'
// import adminBillboardsStore from './modules/admin/billboards/index.js'
import adminCoursesStore from './modules/admin/courses/index.js'
import adminCourseIdStore from './modules/admin/courses/_id.js'

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
    // GENERAL
    authen: authenStore,
    // ADMIN
    admin: adminStore,
    adminCourses:adminCoursesStore ,
    adminCourseId:adminCourseIdStore,
    homeCourseId:homeCourseIdStore,
    alert:alertStore
  },
  plugins: [vuexLocal.plugin, 
    createPersistedState({
    paths: ['authen']
  })]
})

