<template>
  <div>
    <router-view />
    <van-tabbar active-color="red" v-model="active">
      <van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/fei">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/shop">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/person">我的</van-tabbar-item>
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