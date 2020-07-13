<template>
  <div>
    <van-search v-model="text" placeholder="请输入商品名称" @keydown.enter="setHistory()">
        <template #left>
            <van-icon @click="back()" name="arrow-left" />
        </template>
    </van-search>
    <div class="dy-his" v-show="hFlag">
        <p>历史记录</p>
        <van-icon name="delete" size="20" @click="clear()"/>
    </div>
    <div class="dy-item">
        <div class="dy-it" v-for="(item,index) in historyList" :key="index">
            {{item}}
        </div>
    </div>
    <div class="gogd"><Goods :goodsList="Goods" v-show="!hFlag"></Goods></div>
  </div>
</template>

<script>
import Goods from '@/components/Allist'

// 导入本地存储
import storage from '@/Utils/localstorsge'
export default {
  name: '',
  data() { 
    return {
        text:"",
        searchList:[],
        hFlag:true, //判断历史记录
        historyList:[]
    }
  },
  props: [

  ],
  components:{
    Goods
  },
  mounted() {
    this.getGood();
    this.getHistory()
  },
  methods:{
    back(){
        this.$router.go(-1)
    },
    getGood(){
        this.$axios({
            url:"https://api.it120.cc/small4/shop/goods/list"
        }).then((res)=>{
            console.log(res.data.data)
            this.searchList=res.data.data
        })
    },
    //获取历史记录
    getHistory(){
        let data=storage.get("yx_history",true)
        this.historyList=(data==null?[]:data)
    },
    setHistory(){
        if(this.text==""){
            return false
        }
        this.historyList.unshift(this.text) //追加
        
        if(this.historyList.length>8){
            this.historyList.pop()
        }
        storage.set("yx_history",this.historyList,true);

        this.text=""
    },
    clear(){
       storage.remove("yx_history");
       this.getHistory()
    }
  },
  computed:{
      Goods(){
          if(this.text==""){
              this.hFlag=true;
              return []
          }
          this.hFlag=false
          return this.searchList.filter((item)=>{
              return item.name.indexOf(this.text)>-1
          })
      }
  }
 }
</script>

<style scoped lang="scss">
.dy-his{
    display: flex;
    p{
        margin-left: 20px;
    }
    .van-icon{
        margin-left: 240px;
    }
}
.gogd{
    margin-top: -40px;
}
.dy-item{
    display: flex;
    flex-wrap:wrap;
    margin-top: 10px;
    .dy-it{
        width:20%;
        margin-top: 5px;
        text-align: center;
        background: #ccc;
        margin-left: 10px;
        padding: 5px 0px;
        border-radius: 5px;
        color: #fff;
        font-weight: bold;
    }
}
</style>