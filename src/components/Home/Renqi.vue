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
                <span>好评</span>
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
    />

    <van-goods-action class="dy-van">
      <van-goods-action-icon icon="service-o" />
      <van-goods-action-icon icon="shopping-cart-o" />
      <van-goods-action-icon icon="star-o" />
      <van-goods-action-button class="dy-btn" type="warning" text="立即购买" />
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
      dy_show:false
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
        url: `https://api.it120.cc/small4/shop/goods/detail?id=${this.$route.query.id}`
      }).then(res => {
        console.log(res.data.data);
        this.dy_img = res.data.data.pics;
        this.dy_head = res.data.data.basicInfo;
        this.dy_content = res.data.data.content;
      });
    },
    getPin() {
      this.$axios({
        url: `https://api.it120.cc/small4/shop/goods/reputation?goodsId=${this.$route.query.id}`,
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
</style>