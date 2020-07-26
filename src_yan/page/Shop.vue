<template>
  <div>
    <div class="dy-head">
        <span>编辑</span>
        <span>购物车</span>
    </div>
    <ul class="dy-ul1">
        <li v-for="(item,index) in $store.state.cartList" :key="index">
            <van-checkbox v-model="item.checked"/>
            <div><img :src="item.pic" alt=""></div>
            <div class="dy-div">
                <p>{{item.name}}</p>
                <p>￥{{item.price}}</p>
            </div>
            <van-stepper button-size="18" class="dy-btn" v-model="item.nums" />
        </li>
    </ul>

    <div class="dy-footer">
        <van-checkbox v-model="checked" @click="qx()"/><span>全选</span>
        <p style="color:red">合计:￥{{sum}}</p>
        <van-button class="dy-btt" type="danger" @click="submit()">下单</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Shop',
  data() { 
    return {
        checked:true,
        cartList:[]
    }
  },
  props: [

  ],
  components:{
  },
  mounted() {
    this.cartList=this.$store.state.cartList
  },
  methods:{
    qx(){
        if(this.checked){
            this.cartList.forEach((item)=>{
                item.checked=true
            })
        }else{
            this.cartList.forEach((item)=>{
                item.checked=false
            })
        }
    },
    submit(){
        this.$toast.loading({
            duration:3000, //持续时间
            message:"商品准备中...",
            overlay:true
        })
        this.$store.commit("setOrderList")
        setTimeout(() => {
            this.$router.push("/order/goods")
        }, 3000);
    }
  },
  computed:{
      sum(){
          let dy_sum=0
          this.cartList.forEach((item)=>{
              if(item.checked==true){
                  dy_sum+=item.nums*item.price
              }
          })
          return dy_sum
      }
  },
  watch:{
      cartList:{
          handler(value){
              this.$store.commit("addCart",value)
              this.$store.commit("countCarts")

              let dy_arr=value.filter((item)=>{
                  return item.checked==true
              })

              if(value.length==dy_arr.length){
                  this.checked=true
              }else{
                  this.chrcked=false
              }
          },
          deep:true
      }
  }
 }
</script>

<style scoped lang="scss">
.dy-head{
    margin: 10px;
    span:nth-of-type(1){
        color: red;
        font-size: 0.27rem;
    }
    span:nth-of-type(2){
        margin-left: 130px;
    }
}
.dy-ul1{
    li{
        display: flex;
        border-right: 0.04rem solid red;
        padding: 10px;
        position: relative;
        img{
            width: 80px;
            height: 80px;
            margin-left: 10px;
        }
        .dy-div{
            width: 180px;
            margin-left: 10px;
            p:nth-of-type(1){
                font-size: 0.25rem;
                margin-top: 10px;
            }
            p:nth-of-type(2){
                color: red;
                margin-top: 35px;
            }
        }
        .dy-btn{
            position: absolute;
            right: 40px;
            top:70px;
        }
    }
}
.dy-footer{
    display: flex;
    height: 50px;
    // background: #000;
    border-top: 0.04rem solid #f5f5f5;
    position: fixed;
    bottom: 50px;
    right: 0;
    left: 0;
    padding-left: 5px;
    >span{
        margin-top: 20px;
        margin-left: 5px;
    }
    >p{
        margin-left: 100px;
        margin-top: 20px;
    }
    .dy-btt{
        padding: 0 30px;
        height: 50px;
        margin-left: 30px;
    }
}
</style>