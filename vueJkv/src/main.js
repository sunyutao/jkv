// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$ajax = axios
Vue.prototype.$qs = qs
Vue.prototype.addressUrl = 'http://192.168.3.15:8098'
Vue.prototype.sourceUrl = 'http://192.168.3.15:9098'
Vue.prototype.thisAddress = 'http://192.168.3.94:8098'


axios.defaults.timeout = 5000
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.baseURL = 'http://192.168.3.15:8098'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
