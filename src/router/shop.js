import Register from '@/view/Register';
import Login from '@/view/Login.vue'
import Kan from '@/components/Kan'
import Special from '@/components/Special'
import Allist from '@/components/Allist'
import Detail from '@/components/Fei/Detail.vue'
import Search from '@/components/Fei/Search.vue'
import Artical from '@/components/Artical'

//定义一个变量
const shop=[
    {
        path:'/register',
        name:"Register",
        component:Register,
        meta:{
            title:"注册"
        }
    },
    {
        path:'/login',
        name:"Login",
        component:Login,
        meta:{
            title:"登录"
        }
    },
    {
        path:"/kan",
        name:"Kan",
        component:Kan,
        meta:{
            title:"砍价列表"
        }
    },
    {
        path:"/special",
        name:"Special",
        component:Special,
        meta:{
            title:"严选专栏"
        }
    },
    {
        path:"/allist",
        name:"Allist",
        component:Allist,
        meta:{
            title:"人气推荐"
        }
    },
    {
        path:"/fei/detail",
        name:"Detail",
        component:Detail,
        meta:{
            title:"分类商品"
        }
    },
    {
        path:"/fei/search",
        name:"Search",
        component:Search,
        meta:{
            title:"搜索"
        }
    },
    {
        path:"/special/artiacl",
        name:"Artical",
        component:Artical,
        meta:{
            title:"专栏详情"
        }
    }
];

export default shop;