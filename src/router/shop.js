import Register from '@/view/Register';
import Login from '@/view/Login.vue'

//定义一个变量
const shop=[
    {
        path:'/register',
        name:"Register",
        component:Register
    },
    {
        path:'/login',
        name:"Login",
        component:Login
    }
];

export default shop;