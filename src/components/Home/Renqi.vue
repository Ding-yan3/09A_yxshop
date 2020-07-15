<template>
  <div>
    <p class="dy-p" @click="back()">
      <span>
        <van-icon size="20" name="arrow-left" />
      </span>
    </p>
    <van-swipe class="my-swipe" :autoplay="3000">
      <van-swipe-item v-for="(item,index) in dy_img" :key="index">
        <img :src="item.pic" alt />
      </van-swipe-item>
    </van-swipe>
    <div class="dy-middle">
      <p>{{dy_head.name}}</p>
      <p>{{dy_head.characteristic}}</p>
      <p>
        <span>低价￥{{dy_head.minPrice}}</span>
        <span>原价￥{{dy_head.originalPrice}}</span>
        <span>库存{{dy_head.stores}}</span>
      </p>
    </div>

    <van-tabs>
      <van-tab title="商品介绍">
        <div class="dy-cs" v-html="dy_content"></div>
      </van-tab>
      <van-tab title="商品评价">
        <ul class="dy-ul">
          <li v-for="(item,index) in dy_Shop" :key="index">
            <div class="dy-left">
              <i class="van-icon van-icon-user-circle-o" style="fontSize:60px"></i>
            </div>
            <div class="dy-right">
              <p>
                <span>?{{item.user.nick}}</span>
                <span>{{item.goods.goodReputationStr}}</span>
              </p>
              <p>
                <span>{{item.goods.goodReputationRemark}}</span>
              </p>
              <p>
                <span>{{item.goods.dateReputation}}</span>
                <span>选择规格</span>
                <span>{{item.goods.property}}</span>
              </p>
            </div>
          </li>
        </ul>
      </van-tab>
    </van-tabs>

    <van-popup
      v-model="dy_show"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '50%' }"
    >
    <ul>
      <li>
        <div class="dy-li">
           <img :src="dy_head.pic" alt="">
           <div>
             <p>{{dy_head.name}}</p>
             <p>￥{{dy_head.minPrice}}</p>
           </div>
        </div>
       
       <div class="dy-two" v-for="(item,index) in dy_Gou.properties" :key="index">
         <p>{{item.name}}</p>
         <ol>
           <li @click="ttg(index)" :style="{border:dy_active==index?'0.03rem solid red':''}" v-for="(item,index) in item.childsCurGoods" :key="index">{{item.name}}</li>
         </ol>
       </div>
       <div class="dy-shu">
         <span>购买数量</span>
         <van-stepper class="dy-btn" v-model="num" />
       </div>
       <van-button class="dy-btt" type="danger" @click="addShop()">加入购物车</van-button>
      </li>
    </ul>
    </van-popup>

    <van-goods-action class="dy-van">
      <van-goods-action-icon icon="service-o" />
      <van-goods-action-icon icon="shopping-cart-o" @click="tog()" :badge="this.$store.state.number"/>
      <van-goods-action-icon icon="star-o" />
      <van-goods-action-button class="dy-btn" type="warning" text="立即购买"/>
      <van-goods-action-button class="dy-btn1" @click="tan()" type="danger" text="加入购物车" />
    </van-goods-action>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      dy_img: [],
      dy_head: [],
      dy_content: [],
      dy_Shop: [],
      dy_show:false,
      dy_Gou:{},
      dy_active:0,
      num:1,
      gId:this.$route.query.id
    };
  },
  props: [],
  components: {},
  mounted() {
    console.log(this.$route.query.id);
    this.getInfo();
    this.getPin();
  },
  methods: {
    getInfo() {
      this.$axios({
        url: `https://api.it120.cc/small4/shop/goods/detail?id=${this.gId}`
      }).then(res => {
        console.log(res.data.data);
        this.dy_img = res.data.data.pics;
        this.dy_head = res.data.data.basicInfo;
        this.dy_content = res.data.data.content;
        this.dy_Gou=res.data.data
      });
    },
    getPin() {
      this.$axios({
        url: `https://api.it120.cc/small4/shop/goods/reputation?goodsId=${this.gId}`,
        methods: "post"
      }).then(res => {
        console.log(res.data.data);
        this.dy_Shop = res.data.data;
      });
    },
    back() {
      this.$router.go(-1);
    },
    tan(){
      this.dy_show=true
    },
    tog(){
      this.$router.push({path:'/shop'})
    },
    ttg(index){
      this.dy_active=index
    },
    //加入购物车
    addShop(){
      // let dy_data=localStorage.getItem("90A_user")
      // if(dy_data==null){
      //   this.$toast.fail("请先登录")
      //   this.$router.push("/login")
      //   return false
      // }
      // console.log(dy_data)

      let cartList=this.$store.state.cartList

      let dy_index=cartList.findIndex((item)=>{
        return item.goods_id==this.gId
      })

      console.log(dy_index)
      if(dy_index==-1){
        //添加购物车对象
        let object=new Object()
        object.goods_id=this.gId
        object.name=this.dy_head.name
        object.price=this.dy_head.originalPrice
        object.nums=this.num
        object.properties=""
        object.checked=true
        object.pic=this.dy_head.pic
        cartList.push(object)
        console.log(cartList)
      }else{
        cartList[dy_index].nums+=this.num
      }
      this.dy_show=false  //隐藏
      this.$toast.success("添加购物车成功")
      this.$store.commit("addCart",cartList)
      this.$store.commit("countCarts")
    }
  }
};
</script>

<style lang="scss">
.my-swipe,
.van-swipe-item {
  width: 100%;
  height: 370px;
  img {
    width: 100%;
    height: 370px;
  }
}
.dy-p {
  position: fixed;
  z-index: 100;
  border: 1px solid #fff;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
  top: 10px;
  left: 10px;
  span {
    background: #fff;
    display: inline-block;
    width: 25px;
    height: 25px;
    line-height: 25px;
    border-radius: 50%;
    margin-top: 3px;
  }
}
.dy-middle {
  border-bottom: 0.15rem solid #f5f5f5;
  p:nth-of-type(1) {
    margin: 15px;
  }
  p:nth-of-type(2) {
    margin-left: 15px;
    font-size: 0.2rem;
    color: #8888;
  }
  p:nth-of-type(3) {
    margin: 15px;
    color: #888888;
    span:nth-of-type(1) {
      color: #cc0c0c;
      font-size: 0.25rem;
      font-weight: bold;
    }
    span:nth-of-type(2) {
      font-size: 0.16rem;
      margin-left: 5px;
    }
    span:nth-of-type(3) {
      font-size: 0.16rem;
      margin-left: 180px;
    }
  }
}
.dy-cs {
  width: 100% !important;
  height: 100px;
  padding: 5px;
  img {
    width: 98% !important;
    height: 100px !important;
  }
}
.dy-ul {
  padding-bottom: 60px;
  > li {
    display: flex;
    border-bottom: 0.08rem solid #f5f5f5;
    padding-bottom: 10px;
    .dy-left {
      margin: 10px;
    }
    .dy-right {
      p:nth-of-type(1) {
        margin-top: 10px;
        font-size: 0.26rem;
        span:nth-of-type(2) {
          display: inline-block;
          background: #b7282e;
          color: #fff;
          padding: 5px;
          border-radius: 4px;
          margin-left: 10px;
        }
      }
      p:nth-of-type(2) {
        font-size: 0.26rem;
        margin-top: 10px;
      }
      p:nth-of-type(3) {
        margin-top: 10px;
        font-size: 0.16rem;
        span:nth-of-type(1) {
          color: #aaa;
        }
        span:nth-of-type(2) {
          color: #888;
          margin-left: 10px;
        }
        span:nth-of-type(3) {
          color: #888;
        }
      }
    }
  }
}
.dy-van {
  width: 96%;
}
.dy-btn {
  background: #fff;
  color: #000;
  border-radius: 0px;
}
.dy-btn1 {
  background: #b7282e;
  border-radius: 0px;
}
.dy-li{
  display: flex;
  img{
    width: 60px;
    height: 60px;
    margin: 10px;
  }
  >div{
    p:nth-of-type(1){
        font-size: 0.22rem;
        margin-top: 25px;
    }
    p:nth-of-type(2){
        font-size: 0.22rem;
        margin-top: 20px;
        color: red;
    }
  }
}
.dy-two{
  padding:20px 0;
  border-top: 0.04rem solid #f5f5f5;
  border-bottom: 0.04rem solid #f5f5f5;
  p{
    font-size: 0.2rem;
    margin-left: 5px;
  }
  ol{
    display: flex;
    margin-top: 10px;
    li{
      border: 0.03rem solid #f5f5f5;
      border-radius: 0.08rem;
      font-size: 0.25rem;
      margin-left: 5px;
      padding: 8px 13px;
    }
  }
}
.dy-shu{
  display: flex;
  margin-top: 20px;
  span{
    font-size: 0.25rem;
    margin-top: 10px;
    margin-left: 10px;
  }
  .dy-btn{
    margin-left: 180px;
  }
}
.dy-btt{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
}
</style>