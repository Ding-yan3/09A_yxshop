<template>
  <div>
     <van-nav-bar title="我的订单" left-arrow @click-left="goBack()"/>
  </div>
</template>

<script>
// import Head from '@/common/Header'
export default {
  name: '',
  data() { 
    return {

    }
  },
  props: [

  ],
  components:{
    // Head
  },
  mounted() {

  },
  methods:{
    goBack(){
        this.$router.go(-1)
    }
  },
 }
</script>

<style scoped>
</style>