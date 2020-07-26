<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
    <Loading v-if="isLoading"></Loading>
  </div>
</template>

<script>
import Index from '@/assets/reset.css'
export default {
  name: 'App',
  data(){
    return{

    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  components:{
    Index
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
