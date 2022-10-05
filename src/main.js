import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import VueYoutube from 'vue-youtube'
import VueCarousel from 'vue-carousel';


// import the fontawesome core 
import { library } from '@fortawesome/fontawesome-svg-core'

// import font awesome icon component 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// import specific icons
// import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter,faFacebook,faYoutube,faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faUserSecret,faUserGraduate,faEye,faEyeSlash,faReply,faSquareUpRight,faEnvelope,faLocationDot,faPhone,faMagnifyingGlass,faLessThan,faGreaterThan} from '@fortawesome/free-solid-svg-icons'
// add icons to the library
library.add(faUserSecret,faUserGraduate,faEye,faEyeSlash,faReply,faTwitter,faFacebook,faYoutube,faLinkedin,faSquareUpRight,faEnvelope,faLocationDot,faPhone,faMagnifyingGlass,faLessThan,faGreaterThan)

// add font awesome icon component
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueAxios, axios)
Vue.use(VueCarousel);
Vue.config.productionTip = false
Vue.use(VueYoutube)

axios.defaults.baseURL = 'http://127.0.0.1:3000';
axios.defaults.headers.common= {'Authorization':`Bearer ${store.state.token}`}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')




