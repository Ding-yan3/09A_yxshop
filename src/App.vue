<template>
  <div id="app">
    <router-view/>
    <Loading v-if="isLoading"></Loading>
  </div>
</template>

<script>
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
*{
  margin: 0;
  padding: 0;
  list-style: none;
}
html,body{
  height: 100%;
}
</style>
