import Vue from 'vue'
import Vuex from 'vuex'
import  router from '../router'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:false
  },
  getters: {
  },
  mutations: {
    toggleLogin(state){
      state.isLogin = !state.isLogin
    }
  },
  actions: {
    // VALIDATOR
    validator(context,[type,value,givenValue]){
      if (value=="")
        return [false,"Vui lòng không bỏ trống mục này"]
      var regEx;
      var message;
      var message2 = "Mật khẩu xác nhận không giống" ;
      var opt = false;
      switch (type) {
        case 'name':
          regEx = /^[a-zA-Z ]{2,30}$/; //eslint-disable-line
          message = "Thông tin bạn vừa nhập không hợp lệ"
          break;
        case 'email':
          regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //eslint-disable-line
          message = "Hãy chắc rằng bạn nhập đúng email của mình."
          break;
        case 'password':
          regEx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/; //eslint-disable-line
          message = "Mật khẩu là chuỗi có độ dài từ 7-15 ký tự và chứa ít nhất 1 ký tự đặc biệt:!@#$%^*"
          if ( value == givenValue){
            opt = true
          }
          break;
        case 'confirm':
          regEx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/; //eslint-disable-line
          message = "Mật khẩu là chuỗi có độ dài từ 7-15 ký tự và chứa ít nhất 1 ký tự đặc biệt:!@#$%^*"
          if ( value != givenValue){
            message = "Mật khẩu xác nhận không giống"
            return [false,message]
          }
          break;
        default:
          console.log("Validator has been wrongly use")
          return false
      }
      if (regEx.test(value))
          return [true,'',opt,message2]
      return [false,message];
    },
    // REGISTER 
    async register(context,form){
        let result = await fetch("http://localhost:3000/users",{
          method:'POST',
          mode:"cors",
          cache:'no-cache',
          credentials:'same-origin',
          headers:{
            'Content-Type':'application/json'
          },
          redirect:'follow',
          referrerPolicy:'no-referrer',
          body:JSON.stringify({
            'fullName':form.fullName.value,
            'email':form.email.value,
            'password':form.password.value
          })
        })
        .then(res=>res,err=>err)
        if (result.ok)
          router.push('/login')
        else
          alert("Oops something wrong with server")
    },
    async login(context,form){
      if (form){
        1+1
      }
      router.push(router.currentRoute.path.replace('/login','/'))
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
    logout(context){
      context.commit('toggleLogin')
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})

