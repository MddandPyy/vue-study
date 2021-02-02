// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'                  
import 'element-ui/lib/theme-chalk/index.css' 
import router from './router'
import axios from './router/http'
import filters from './filters/timefilter'

Vue.use(ElementUI) 
Vue.config.productionTip = false
Vue.prototype.$axios=axios

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
