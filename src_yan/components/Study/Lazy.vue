<template>
  <div>
    <h4>图片懒加载</h4>
    <ul class="dy-img">
        <li v-for="(item,index) in dy_List" :key="index">
            <img src="@/assets/logo.png" :data_src="item.pic">
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: '',
  data() { 
    return {
        dy_List:[]
    }
  },
  props: [

  ],
  components:{
  },
  mounted() {
    this.getGoods();
    window.addEventListener("scroll",this.lazyload)
  },
  methods:{
    getGoods(){
        this.$axios({
            url:"https://api.it120.cc/small4/shop/goods/list"
        }).then((res)=>{
            console.log(res.data.data)
            this.dy_List=res.data.data
            console.log(this.dy_List)
            this.$nextTick(()=>{
                this.lazyload()
            })
        })
    },
    lazyload(){
        //定义一个兼容性的写法
        let html=document.documentElement||document.body
        //获取所有的图片信息
        let imgs=document.querySelectorAll("img")
        console.log(imgs)

        for(var i=0;i<imgs.length;i++){
            if(html.scrollTop+html.clientHeight>imgs[i].offsetTop){
                this.$toast.loading("努力加载中，请稍后...")
                // window.setTimeout(()=>{
                    imgs[i].src=imgs[i].getAttribute("data_src")
                // },2000)
                
            }
        }
    }
  },
 }
</script>

<style scoped lang="scss">
h4{
    text-align: center;
}
.dy-img{
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-around;
    li{
        width: 45%;
       margin-left: 15px;
       margin-top: 10px;
       img{
           width: 100%;
           height: 200px;
       }
    }
}
</style>