import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAxiosPlugin from 'vue-axios-plugin'
import WotUIPlugin from './wotui'
import { Slider,Popup} from 'vant';

Vue.use(WotUIPlugin)
Vue.use(Slider);
Vue.use(Popup);
// Vue.use(Cell);
Vue.use(VueAxiosPlugin, {
  reqHandleFunc: config => {
    return config
  },
  reqErrorFunc: error => Promise.reject(error),
  resHandleFunc: response => {
    return response.data
  },
  resErrorFunc: error => Promise.reject(error)
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


router.replace('/home')

