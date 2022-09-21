import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import VueYoutube from 'vue-youtube'
 


// import the fontawesome core 
import { library } from '@fortawesome/fontawesome-svg-core'

// import font awesome icon component 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// import specific icons
// import { fas } from '@fortawesome/free-solid-svg-icons'
import { fas} from '@fortawesome/free-solid-svg-icons'
// add icons to the library
library.add(fas)

// add font awesome icon component
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.use(VueYoutube)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to,from,next) => {
  if ( ( store.state.isLogin == true && to.name == 'login' ) || ( store.state.isLogin == true && to.name == 'register' ))
    next({name:'home'})
  else next()
})



