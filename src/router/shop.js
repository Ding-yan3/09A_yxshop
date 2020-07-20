import Register from '@/view/Register';
import Login from '@/view/Login.vue'
import Kan from '@/components/Kan'
import Special from '@/components/Special'
import Allist from '@/components/Allist'
import Detail from '@/components/Fei/Detail.vue'
import Search from '@/components/Fei/Search.vue'
import Artical from '@/components/Artical'
import Renqi from '@/components/Home/Renqi.vue'
import Goods from '@/components/Shop/Goods.vue'  //商品结算
import Pay from '@/components/Shop/Order.vue'
//图片懒加载
import Lazy from '@/components/Study/Lazy.vue'
//瀑布流
import Full from '@/components/Study/Full.vue'
import Cuteinfo from '@/components/Home/Cuteinfo.vue'
import Cute from '@/components/Home/Cute.vue'

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
    },
    {
        path:"/tui/renqi",
        name:"Renqi",
        component:Renqi,
        meta:{
            title:"商品详情"
        }
    },
    {
        path:"/order/goods",
        name:"Goods",
        component:Goods,
        meta:{
            title:"商品结算"
        }
    },
    {
        path:"/order/pay",
        name:"Pay",
        component:Pay,
        meta:{
            title:"支付"
        }
    },
    {
        path:"/lazy",
        name:"Lazy",
        component:Lazy,
        meta:{
            title:"图片懒加载"
        }
    },
    {
        path:'/full',
        name:"Full",
        component:Full,
        meta:{
            title:"瀑布流"
        }
    },
    {
        path:'/kan/cuteInfo',
        name:"Cuteinfo",
        component:Cuteinfo,
        meta:{
            title:"商品详情"
        }
    },
    {
        path:'/kan/cute',
        name:"Cute",
        component:Cute,
        meta:{
            title:"商品详情"
        }
    }
];

export default shop;