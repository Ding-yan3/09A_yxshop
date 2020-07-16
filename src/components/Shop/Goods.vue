<template>
  <div>
    <van-nav-bar title="确认订单" left-arrow @click-left="back()" />
    <div class="dy-address">
      <van-icon name="location-o" />
      <div>
        <p>{{addInfo.linkMan}} {{addInfo.mobile}}</p>
        <p>{{addInfo.address}}</p>
      </div>
      <van-icon name="arrow" />
    </div>
    <div class="dy-list">
      <p>商品列表</p>
      <ul>
        <li v-for="(item,index) in $store.state.orderList" :key="index">
          <img :src="item.pic" alt />
          <div>
            <p>{{item.name}}</p>
            <p>{{item.price}}</p>
          </div>
          <div>
            <p>￥{{item.price}}</p>
            <p>x{{item.nums}}</p>
          </div>
        </li>
      </ul>
    </div>
    <p class="dy-p">
      <span>配送方式</span>
      <span>快递</span>
    </p>
    <div class="dy-bei">
      <van-field placeholder="如需备注请输入" label="备注" />
    </div>

    <p class="dy-p">
      <span>商品金额</span>
      <span>￥{{this.$store.getters.total}}</span>
    </p>
    <div class="dy-footer">
      <p style="color:red">合计:￥{{this.$store.getters.total}}</p>
      <van-button class="dy-btt" type="danger" @click="creatOrder">提交订单</van-button>
    </div>
  </div>
</template>

<script>
import storage from "@/Utils/localstorsge";
import qs from "qs";
export default {
  name: "",
  data() {
    return {
      addInfo: [],
      token:storage.get("09A_user",true).token
    };
  },
  props: [],
  components: {},
  mounted() {
    this.getAddress();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getAddress() {
      let dy_data = storage.get("09A_user", true);
      console.log(dy_data);
      if (dy_data == null) {
        this.$toast.fail("请先登录");
        this.$router.push("/login");
        return false;
      }
      this.$axios({
        url: `https://api.it120.cc/small4/user/shipping-address/default?token=${dy_data.token}`
      }).then(res => {
        // console.log(res.data);
        if (res.data.code != 0) {
          this.$toast.fail("请先登录");
          this.$router.push("/login");
          return false;
        }

        console.log(res.data.data);
        this.addInfo = res.data.data;
      });
    },
    //创建订单的信息
    creatOrder() {
      let user = storage.get("90a_user", true); //获取登录信息

      let dy_arr = [];
      this.$store.state.orderList.forEach(item => {
        console.log(item)
        let object = new Object();
        object.goodId = item.goods_id;
        object.number = item.nums;
        object.propertyChildIds = item.properties;
        object.logisticsType = 0;
        dy_arr.push(object);
        // console.log(dy_arr)
      });
      let formate=new FormData()
      formate.append("token",this.token)
      formate.append("goodsJsonStr",JSON.stringify(dy_arr))

      this.$axios.post("https://api.it120.cc/small4/order/create",formate).then((res)=>{
        //   console.log(res.data)
          this.$toast.loading({
              message:"订单正在努力生成中...",
              overlay:true
          })
          this.$store.commit("setOrder",res.data.data)
          setInterval(() => {
              this.$router.push("/order/pay")
          }, 3000);
      })
    }
  }
};
</script>

<style scoped lang="scss">
.dy-address {
  display: flex;
  border-bottom: 0.06rem solid red;
  padding: 10px;
  .van-icon:nth-of-type(1) {
    margin-top: 10px;
    color: #ccc;
    font-size: 15px;
  }
  div {
    margin-left: 0.5rem;
    p:nth-of-type(1) {
      font-size: 0.22rem;
    }
    p:nth-of-type(2) {
      font-size: 0.22rem;
      margin-top: 0.4rem;
    }
  }
  .van-icon:nth-of-type(2) {
    margin-top: 10px;
    color: #ccc;
    font-size: 15px;
    margin-left: 2.99rem;
  }
}
.dy-list {
  > p {
    height: 50px;
    // background: #000;
    border-bottom: 0.04rem solid #f5f5f5;
    line-height: 50px;
    box-sizing: border-box;
    padding-left: 0.2rem;
    font-size: 0.25rem;
  }
  > ul {
    border-bottom: 0.2rem solid #f5f5f5;
    li {
      display: flex;
      padding: 0.2rem;
      border-bottom: 0.02rem solid #f5f5f5;
      img {
        width: 1.6rem;
        height: 1.6rem;
      }
      div:nth-of-type(1) {
        margin-left: 0.2rem;
        p:nth-of-type(1) {
          font-size: 0.25rem;
          margin-top: 0.2rem;
        }
        p:nth-of-type(2) {
          font-size: 0.25rem;
          color: #888;
          margin-top: 0.8rem;
        }
      }
      div:nth-of-type(2) {
        margin-left: 1rem;
        p:nth-of-type(1) {
          font-size: 0.25rem;
          margin-top: 0.2rem;
        }
        p:nth-of-type(2) {
          font-size: 0.25rem;
          color: #888;
          margin-top: 0.8rem;
        }
      }
    }
  }
}
.dy-p {
  height: 40px;
  line-height: 40px;
  border-bottom: 0.04rem solid #f5f5f5;
  font-size: 0.25rem;
  padding: 0 0.2rem;
  span:nth-of-type(2) {
    margin-left: 5rem;
  }
}
.dy-bei {
  border-bottom: 0.2rem solid #f5f5f5;
}
.dy-footer {
    background: #fff;
  display: flex;
  height: 50px;
  // background: #000;
  border-top: 0.04rem solid #f5f5f5;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding-left: 5px;
  > p {
    margin-left: 2.85rem;
    margin-top: 20px;
  }
  .dy-btt {
    padding: 0 30px;
    height: 50px;
    margin-left: 10px;
  }
}
</style>