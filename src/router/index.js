// import Vue from 'vue'
// import Router from 'vue-router'
 // import HelloWorld from '@/components/HelloWorld'

// Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })

import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import GuaHao from '../components/GuaHao.vue'
import GuaHaoGL from '../components/GuaHaoGL.vue'
import GuaHaoSF from '../components/GuaHaoSF.vue'
import GuaHaoTH from '../components/GuaHaoTH.vue'

import MenZhen from '../components/MenZhen.vue'
import MenZhenBL from '../components/MenZhenBL.vue'
import MenZhenJCS from '../components/MenZhenJCS.vue'
import MenZhenJYS from '../components/MenZhenJYS.vue'
import MenZhenZB from '../components/MenZhenZB.vue'

import Admin from '../components/Admin.vue'
import Schedule from '../components/Schedule.vue'
import CheckItem from '../components/CheckItem.vue'
import User from '../components/User.vue'

import JianCha from '../components/JianCha.vue'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path:'/GuaHao',
      name:'GuaHao',
      component:GuaHao,
     children:[{
        path:'/GuaHao/GuaHaoGL',
        name:'GuaHaoGL',
        component:GuaHaoGL
      },{
        path:'/GuaHao/GuaHaoSF',
        name:'GuaHaoSF',
        component:GuaHaoSF
      },{
        path:'/GuaHao/GuaHaoTH',
        name:'GuaHaoTH',
        component:GuaHaoTH
      },
      {
        path:'',
        name:'GuaHaoGL',
        component:GuaHaoGL
      },]

    },
    {
      path:'/MenZhen',
      name:'MenZhen',
      component:MenZhen,
      children:[{
        path:'/MenZhen/MenZhenBL',
        name:'MenZhenBL',
        component:MenZhenBL
      },{
        path:'/MenZhen/MenZhenJCS',
        name:'MenZhenJCS',
        component:MenZhenJCS
      },{
        path:'/MenZhen/MenZhenJYS',
        name:'MenZhenJYS',
        component:MenZhenJYS
      },{
        path:'/MenZhen/MenZhenZB',
        name:'MenZhenZB',
        component:MenZhenZB
      }]
    },
    {
      path:'/Admin',
      name:'Admin',
      component:Admin,
      children:[{
        path:'/Admin/Schedule',
        name:'Schedule',
        component:Schedule
      },
      {
        path:'/Admin/CheckItem',
        name:'CheckItem',
        component:CheckItem
      }]
    },
    {
      path:'/JianCha',
      name:'JianCha',
      component:JianCha
    },
    {
      path:'/User',
      name:'User',
      component:User
    }
  ]
});
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
