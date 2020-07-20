<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in dy_List" :key="index">
          <img :src="item.picUrl" alt="">
      </van-swipe-item>
    </van-swipe>
    <ul>
        <li>
            <img src="../../../static/image/1.png" alt="">
            <p>签到</p>
        </li>
        <li>
            <img src="../../../static/image/2.png" alt="">
            <p>礼券</p>
        </li>
        <li>
            <img src="../../../static/image/3.png" alt="">
            <p>砍价</p>
        </li>
        <li>
            <img src="../../../static/image/4.png" alt="">
            <p>专栏</p>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
        dy_List:[]
    };
  },
  props: [],
  components: {},
  mounted() {
      this.getList()
  },
  methods: {
      getList(){
          this.$axios({
              url:"https://api.it120.cc/small4/banner/list"
          }).then((res)=>{
              console.log(res.data.data)
              this.dy_List=res.data.data
          })
      }
  }
};
</script>

<style scoped lang="scss">
.my-swipe,.van-swipe-item{
    width: 100%;
    img{
        width: 100%;
    }
}
ul{
    display: flex;
    position: absolute;
    background: #fff;
    height: 7rem;
    top: 250px;
    right: 0;
    left: 0;
    width: 100%;
    justify-content: space-around;
    border-radius: 30% 30% 0 0;
    border-bottom: 0.6rem solid #f5f5f5;
    li{
        text-align: center;
        margin-top: 1rem;
        img{
            width: 3em;
            height: 3rem;
        }
        p{
            // margin-top: -0.05rem;
        }
    }
}
</style>