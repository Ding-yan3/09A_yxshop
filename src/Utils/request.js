import axios from 'axios'
import store from '@/store'

//create方法创建一个axios的实例
const Server=axios.create({
    baseURL:"",
    timeout:3000,
});

//使用server方法创建请求拦截器，请求发送出去之前执行的
Server.interceptors.response.use(function(config){
    store.state.isLoading = true
    return config
},function(err){
    return Promise.reject(err)
});

//使用server方法创建响应拦截器，服务端数据返回到组件之前执行
Server.interceptors.response.use(function(response){
    return response
},function(err){
    return Promise.reject(err)
});

//抛出实例化对象
export default Server