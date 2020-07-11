<template>
  <div>
    <Head></Head>
    <List></List>
    <Jin></Jin>
    <Tui></Tui>
  </div>
</template>

<script>
import Head from '@/components/Home/Head';
import List from '@/components/Home/List'
import Jin from '@/components/Home/Jin'
import Tui from '@/components/Home/Tui'
export default {
  name: 'Home',
  data() { 
    return {

    }
  },
  props: [

  ],
  components:{
    Head,
    List,
    Jin,
    Tui
  },
  mounted() {

  },
  methods:{

  },
 }
</script>

<style scoped>
</style>