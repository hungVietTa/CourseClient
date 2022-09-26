import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import VuexPersistence from 'vuex-persist'

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
    toggleLogin(state) {
      state.isLogin = !state.isLogin
    }
  },
  actions: {
    // REGISTER 
    async register(context, form) {
      let result = await fetch("http://localhost:3000/users", {
        method: 'POST',
        mode: "cors",
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          'fullName': form.fullName.value,
          'email': form.email.value,
          'password': form.password.value
        })
      })
        .then(res => res, err => err)
      if (result.ok)
        router.push('/login')
      else
        alert("Oops something wrong with server")
    },
    async login(context, form) {
      if (form) {
        1 + 1
      }
      router.push(router.currentRoute.path.replace('/login', '/'))
      context.commit('toggleLogin')
      // try {
      //   let result = await fetch("http://localhost:3000/users",{
      //   method:'POST',
      //   mode:"cors",
      //   cache:'no-cache',
      //   credentials:'same-origin',
      //   headers:{
      //     'Content-Type':'application/json'
      //   },
      //   redirect:'follow',
      //   referrerPolicy:'no-referrer',
      //   body:JSON.stringify({
      //     'email':form.email.value,
      //     'password':form.password.value
      //   })
      // })
      // .then(res=>res)
      // if (result.ok)
      //   {
      //     router.push( '/' )
      //     context.commit('toggleLogin')
      //   }
      // else
      //   alert("Oops something wrong with server")
      // }
      // catch (err){
      //   console.log(err)
      // }
    },
    logout(context) {
      context.commit('toggleLogin')
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})

