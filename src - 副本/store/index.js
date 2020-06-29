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
    },
    mutations:{
        //改变loading组件的显示隐藏
        changeLoading(state,bool){
            state.isLoading=bool
        }
    },
    plugins: [createPersistedState()]
})

export default store 