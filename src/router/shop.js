import Register from '@/view/Register';
import Login from '@/view/Login.vue'
import Kan from '@/components/Kan'
import Special from '@/components/Special'
import Allist from '@/components/Allist'

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
    },
    {
        path:"/kan",
        name:"Kan",
        component:Kan
    },
    {
        path:"/special",
        name:"Special",
        component:Special
    },
    {
        path:"/allist",
        name:"Allist",
        component:Allist
    }
];

export default shop;