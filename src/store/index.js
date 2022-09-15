import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:false
  },
  getters: {
  },
  mutations: {
  },
  actions: {
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
    }
  },
  modules: {
  }
})
