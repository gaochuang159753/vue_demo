// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.prototype.$ajax = axios
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  axios,
  template: '<App/>',
  components: { App }
})
