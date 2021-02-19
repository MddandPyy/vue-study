import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import websocket from '@/components/websocket'
import user from '@/components/user'
import register from '@/components/register'
import nologin from '@/components/nologin'

Vue.use(Router)

//解决vue-router重复点击url报错问题
const originalPush = Router.prototype.push
   Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/hello',
      //name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        requireAuth: true, // 判断是否需要登录
      },
      children:[
        {
          path: '/websocket',
          //name: 'login',
          component: websocket
        },
        {
          path: '/user',
          //name: 'login',
          meta: {
            requireAuth: true, // 判断是否需要登录
          },
          component: user
        }
      ]
    },
    {
      path: '/login',
      //name: 'login',
      component: login
    },
    {
      path: '/register',
      //name: 'login',
      component: register
    },
    {
      path: '/nologin',
      //name: 'login',
      component: nologin
    }
  ]
})
