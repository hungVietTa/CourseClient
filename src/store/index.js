import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username:undefined,
    isUserLogin:false,
    isAdminLogin:false,
    token:""
  },
  getters: {
  },
  mutations: {
    toggleUserLogin(state) {
      state.isUserLogin = !state.isUserLogin
    },
    toggleAdminLogin(state){
      state.isAdminLogin = !state.isAdminLogin
      state.isUserLogin = !state.isUserLogin
    },
    setToken(state,token){
      state.token = token
    },
    setUsername(state,username){
      state.username = username
    }
  },
  actions: {
    async login(context,[form,role]) {
        await axios.post("api/v1/users/login",
          {
            'email': form.email.value,
            'password': form.password.value,
          }
        )
        .then(res => {
          context.commit('setToken',res.data.token)
          if ( role == "admin")
            {
              context.commit('toggleAdminLogin')
              router.push('/admin')
            }
          else 
            {
              context.commit('toggleUserLogin')
              router.push('/')
            } 
          
        })
        .catch(error => {
          if (error.response) {
            form.server.validate = false
            if (error.response.data)
            {
            form.server.message = error.response.data.message
            form.password.value = ""
            }
            else
              form.server.message = "Vui lòng kiểm tra lại kết nối của bạn"
          }
          else if (error.request) {
            form.server.validate = false
            form.server.message = "Vui lòng kiểm tra lại kết nối của bạn"
          }
          else
            { form.server.validate = false
              form.server.message = "Lỗi không xác định, vui lòng thử lại sau giây lát" }
        })
        if ( context.state.isUserLogin == true || context.state.isAdminLogin )
          {
            axios.get('api/v1/users/profile').then(res=>console.log(res.data)).catch(res=>console.log(res))
          }
    },
    // REGISTER 
    register(context, form) {
      axios.post("api/v1/users/register",
        {
          'name': form.name.value,
          'email': form.email.value,
          'password': form.password.value,
          'password_confirmation': form.confirmPassword.value
        }
      )
      .then(() => {
        alert("Register succesfully !")
        router.push('/login')
      })
      .catch(error => {
        if (error.response) {
          form.server.validate = false
          if (error.response.data)
          {
          form.server.message = error.response.data.message
          form.password.value = ""
          }
          else
          form.server.message = "Vui lòng kiểm tra lại kết nối của bạn"
        }
        else if (error.request) {
          form.server.validate = false
          form.server.message = "Vui lòng kiểm tra lại kết nối của bạn"
        }
        else
          { form.server.validate = false
            form.server.message = "Lỗi không xác định, vui lòng thử lại sau giây lát" }
      })
    },
      logout(context) {
      if ( context.state.isAdminLogin == true)
        { 
          context.commit('toggleAdminLogin')
          context.commit('setToken','')
          router.push("/admin/login")
        }
      else 
        {
          context.commit('toggleUserLogin')
          context.commit('setToken','')
          router.push("/login")
        }
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})

