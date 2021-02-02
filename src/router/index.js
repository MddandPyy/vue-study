import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import websocket from '@/components/websocket'
import user from '@/components/user'


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
      children:[
        {
          path: '/websocket',
          //name: 'login',
          component: websocket
        },
        {
          path: '/user',
          //name: 'login',
          component: user
        }
      ]
    },
    {
      path: '/login',
      //name: 'login',
      component: login
    }
  ]
})
