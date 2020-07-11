<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" active-color="red">
      <van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/fei">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/shop">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/person">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
        active:0
    };
  },
  props: [],
  components: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped>
</style>