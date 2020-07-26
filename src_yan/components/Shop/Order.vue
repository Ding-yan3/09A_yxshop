<template>
  <div>
    <van-nav-bar title="确认付款" left-arrow @click-left="back()" />

    <!-- 金额 -->
    <div class="dy-jin">
      <van-icon name="gold-coin-o" />
      <div>
        <p>
          商品总额：
          <!-- {{this.$store.state.orderInfo}} -->
          <span>￥{{this.$store.getters.total}}</span>
        </p>
        <p>订单号:￥{{this.$store.state.orderInfo.orderNumber}}</p>
      </div>
    </div>

    <div class="dy-address">
      <van-icon name="location-o" />
      <div>
        <p>{{addressInfo.linkMan}} {{addressInfo.mobile}}</p>
        <p>{{addressInfo.address}}</p>
      </div>
    </div>

    <van-button @click="pay()" class="dy-btn" type="danger">立即支付</van-button>
  </div>
</template>

<script>
import storage from "@/Utils/localstorsge";
export default {
  name: "",
  data() {
    return {
      addressInfo: []
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
      this.$axios({
        url: "https://api.it120.cc/small4/user/shipping-address/default",
        params: {
          token: dy_data.token
        }
      }).then(res => {
        console.log(res.data.data);
        this.addressInfo = res.data.data;
      });
    },
    pay(){
      this.$toast.success("支付成功") 
      this.$store.commit("clear")  //清空所有数据
      this.$router.push("/")
    }
  }
};
</script>

<style scoped lang="scss">
.dy-jin {
  display: flex;
  border-top: 0.03rem solid #f5f5f5;
  padding: 0.4rem;
  .van-icon {
    font-size: 23px;
    color: orange;
  }
  p:nth-of-type(1) {
    font-size: 0.25rem;
    margin-top: -0.1rem;
    margin-left: 0.4rem;
    span {
      color: red;
    }
  }
  p:nth-of-type(2) {
    margin-left: 0.4rem;
    font-size: 0.25rem;
    color: #888;
    margin-top: 0.4rem;
  }
}
.dy-address {
  display: flex;
  border-top: 0.03rem solid #f5f5f5;
  padding: 0.4rem;
  .van-icon{
      color: blue;
      font-size: 0.4rem;
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
}
.dy-btn{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
}
</style>