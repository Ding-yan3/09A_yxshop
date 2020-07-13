<template>
  <div>
    <div class="dy-head">
      <img src="../../static/image/m-1.jpg" alt />
      <div>
        <p>立即登录</p>
        <p>积分：0</p>
      </div>
      <span>X</span>
    </div>
    <div class="dy-lun">
      <van-notice-bar
        color="red"
        aria-setsize="10px"
        left-icon="volume-o"
        text="新上线更稳定的付费快递查询接口 ........................"
      />
    </div>
    <div class="dy-ding">
      <van-icon class="dy-p" size="20px" name="description" color="orange"/>
      <p>我的订单</p>
      <van-icon class="dy-p1" size="15" name="arrow" />
    </div>

    <div class="dy-lei">
        <ul>
            <li>
                <van-icon size="30" name="balance-pay" />
                <p>待付款</p>
            </li>
            <li>
                <van-icon size="30" name="send-gift-o" />
                <p>待发货</p>
            </li>
            <li>
                <van-icon size="30" name="logistics" />
                <p>待收货</p>
            </li>
            <li>
                <van-icon size="30" name="comment-o" />
                <p>待评价</p>
            </li>
        </ul>
    </div>

    <ul class="dy-footer">
        <li>
            <van-icon color="red" size="30" name="refund-o" />
            <p>我的余额</p>
        </li>
        <li>
            <van-icon color="red" size="30" name="edit" />
            <p>我的砍价</p>
        </li>
        <li>
            <van-icon color="orange" size="30" name="coupon-o" />
            <p>我的礼券</p>
        </li>
        <li>
            <van-icon color="orange" size="30" name="star-o" />
            <p>我的收藏</p>
        </li>
        <li>
            <van-icon name="location" color="rgb(101, 140, 247)" size="30" />
            <p>我的地址</p>
        </li>
        <li>
            <van-icon name="service-o" color="rgb(101, 140, 247)" size="30" />
            <p>联系客服</p>
        </li>
    </ul>
    <p class="dy-zhu">The work of ding yan</p>
  </div>
</template>

<script>
export default {
  name: "Person",
  data() {
    return {};
  },
  props: [],
  components: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.dy-head {
  height: 150px;
  background: #c1b18f;
  display: flex;
  position: relative;
  img {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    margin-left: 20px;
    margin-top: 40px;
  }
  div {
    color: #fff;
    margin-top: 50px;
    margin-left: 18px;
    p:nth-of-type(1) {
      font-size: 20px;
    }
    p:nth-of-type(2) {
      background: #b3a078;
      font-size: 12px;
      border-radius: 4px;
      // text-align: center;
      padding: 5px 5px;
      width: 80px;
      margin-top: 15px;
    }
  }
  span {
    background: #aaa;
    border-radius: 50%;
    display: inline-block;
    font-size: 12px;
    text-align: center;
    padding: 2px;
    color: #fff;
    border: 1px solid #fff;
    position: absolute;
    top: 40px;
    left: 90px;
    width: 10px;
    height: 10px;
    line-height: 10px;
  }
}
.dy-lun {
  border-bottom: 6px solid #f5f5f5;
  height: 40px;
  background: #ffff;
  font-size: 12px;
}
.dy-ding {
  border-bottom: 2px solid #f5f5f5;
  height: 40px;
  background: #ffff;
  font-size: 12px;
  display: flex;
  .dy-p{
      line-height: 40px;
      margin-left: 20px;
  }
  p:nth-of-type(1){
      font-size: 12px;
      line-height: 40px;
      margin-left: 10px;
  }
  .dy-p1{
    line-height: 40px;
    margin-left: 220px;
  }
}
.dy-lei{
    border-bottom: 6px solid #f5f5f5;
    height: 70px;
    ul{
        display: flex;
        align-content: center;
        justify-content: space-around;
        li{
            margin-top: 10px;
            text-align: center;
            p{
                font-size:14px;
            }
        }
    }
}
.dy-footer{
    border-bottom: 1px solid #f5f5f5;
    height: 160px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    li{
        width: 33%;
        text-align: center;
        margin-top: 5px;
    }
}
.dy-zhu{
    background: #f5f5f5;
    text-align: center;
    font-size: 12px;
    padding: 5px 0px;
}
</style>