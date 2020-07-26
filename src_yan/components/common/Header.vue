<template>
  <div>
    <van-nav-bar :title="title" left-arrow @click-left="goBack()"/>
  </div>
</template>

<script>
export default {
  name: '',
  data() { 
    return {

    }
  },
  props: [
    "title"
  ],
  components:{
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