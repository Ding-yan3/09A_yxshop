import Vue from 'vue'
import Vuex from 'vuex'
// 引入插件
import createPersistedState from 'vuex-persistedstate'
// 使用vuex
Vue.use(Vuex)

let store = new Vuex.Store({
    state:{
        count:100,
        isLoading:false, //控制正在加载
        number:0,
        cartList:[]
    },
    mutations:{
        //改变loading组件的显示隐藏
        changeLoading(state,bool){
            state.isLoading=bool
        },
        addCart(state,payload){
            state.cartList=payload
        },
        //购物车数量
        countCarts(state){
            let sum=0
            state.cartList.forEach((item)=>{
                sum+=item.nums
            })
            state.number=sum
        }
    },
    plugins: [createPersistedState()]
})

export default store 