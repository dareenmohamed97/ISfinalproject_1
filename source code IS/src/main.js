// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import store from './modules/store'
import Notifications from 'vue-notification'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import interceptor from './modules/interceptors'
import axios from 'axios'

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://bitwise-backend.herokuapp.com/api' : 'http://localhost:3000/api'

Vue.use(BootstrapVue)
Vue.use(Notifications)
Vue.config.productionTip = false

interceptor()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
