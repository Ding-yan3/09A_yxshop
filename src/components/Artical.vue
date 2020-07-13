<template>
  <div>
    <van-nav-bar title="专栏详情" left-arrow @click-left="back()"/>
    <div class="dy-box" v-for="(item,index) in dy_List" :key="index">
        <h4>{{item.title}}</h4>
        <img :src="item.pic" alt="">
        <div v-html="item.content"></div>
    </div>
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
    console.log(this.$route.query.id)
    this.getDetail()
  },
  methods:{
    getDetail(){
        this.$axios({
            url:`https://api.it120.cc/small4/cms/news/detail?id=${this.$route.query.id}`,
            methods:"post"
        }).then((res)=>{
            console.log(res.data.data)
            this.dy_List=res.data
        })
    },
    back(){
        this.$router.go(-1)
    }
  },
 }
</script>

<style scoped lang="scss">
.dy-box{
    h4{
        text-align: center;
        font-weight: bold;
        font-size: 18px;
    }
    img{
        width: 95%;
        margin-left: 10px;
        margin-top: 20px;
    }
    div{
        padding: 5px 10px;
        text-indent: 20px;
        >p{
            margin-top: 5px;
        }
    }
}
</style>