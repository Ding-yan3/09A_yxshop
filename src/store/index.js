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
        user:"",
        cartList:[],
        person:"",
        ShopList:[]
    },
    mutations:{
        //改变loading组件的显示隐藏
        changeLoading(state,bool){
            state.isLoading=bool
        },
        logout(state){
            state.user=""
        },
        login(state,payload){
            state.user=payload
        },
        addCart(state,data){
            let dy_index=state.cartList.findIndex((item)=>{
                return item._id==data._id
            })
            // console.log(dy_index)
            if(dy_index>-1){
                state.cartList[dy_index].number++
            }else{
                // data.number=1
                // data.checked=true
                Vue.set(data,"number",1)
                Vue.set(data,"checked",true)
                state.cartList.push(data)
            }
            
        },
        subCart(state,data){
            state.cartList=data
        },
        delCart(state,index){
            state.cartList.splice(index,1)
        },
        //第二次
        addShop(state,data){
            // console.log(data)
            
        }
    },
    plugins: [createPersistedState()]
})

export default store 