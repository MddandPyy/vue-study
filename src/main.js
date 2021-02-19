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

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
//    console.log('需要登录');
//    if (localStorage.getItem('usertoken')) { // 判断当前的token是否存在 ； 登录存入的token
//     next();
//    }
//    else {
//     next({
//      path: '/nologin',
//      query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
//     })
//    }
//   }
//   else {
//    next();
//   }
//  });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
