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
        cartList:[],  //购物车列表

        orderList:[], //存储订单商品列表
        orderInfo:[]
    },
    mutations:{
        //改变loading组件的显示隐藏
        changeLoading(state,bool){
            state.isLoading=bool
        },
        //添加购物车
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
        },
        setOrderList(state){
            state.orderList=state.cartList.filter((item)=>{
                return item.checked==true
            })
        },
        setOrder(state,payload){
            state.orderInfo=payload
        },
        //清空所有数据
        clear(state){
            state.cartList=[]
            store.number=0
            store.orderInfo=[]
        }
    },
    getters:{
        total(state){
            let count=0
            state.orderList.forEach((item)=>{
                count+=item.price*item.nums
            })
            return count
        }
    },
    plugins: [createPersistedState()]
})

export default store 