// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
import Vue from 'vue'
import Router from 'vue-router'
// import shop from "./shop"
import Home from '@/components/Home'
import Shop from '@/components/Shop'
import Cart from '@/components/Cart';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta:{
        title:"首页"
      }
    },
    {
      path:'/shop',
      name:"Shop",
      component:Shop,
      meta:{
        title:"购物车列表"
      }
    },{
      path:"/cart",
      name:"Cart",
      component:Cart,
      meta:{
        title:"购物车"
      }
    }
    // ...shop
  ]
})
