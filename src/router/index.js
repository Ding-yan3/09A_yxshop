import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/Index'
import Home from '@/page/Home'
import Fei from '@/page/Fei'
import Shop from '@/page/Shop'
import Person from '@/page/Person'

import shop from "./shop"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect:"/home",
      children:[
        {
          path:"home",
          name:"Home",
          component:Home,
          meta:{
            title:"首页"
          },
        },
        {
          path:"fei",
          name:"Fei",
          component:Fei,
          meta:{
            title:"分类"
          }
        },
        {
          path:"shop",
          name:"Shop",
          component:Shop,
          meta:{
            title:"购物车"
          }
        },
        {
          path:"person",
          name:"Person",
          component:Person,
          meta:{
            title:"我的"
          }
        }
      ]
    },
    ...shop
  ]
})
