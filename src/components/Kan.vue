<template>
  <div>
    <div class="dy-box">
      <p>
        <span @click="back">&lt;</span>
        <span>砍价列表</span>
      </p>
      <ul>
        <li v-for="(item,index) in dy_List" :key="index" @click="jump(item.id)">
          <img :src="item.pic" alt />
          <div>
            <p>{{item.name}}</p>
            <p>{{item.characteristic}}</p>
            <p>
              <span>￥{{item.minPrice}}</span>
              <span>￥{{item.originalPrice}}</span>
              <span>{{item.stores}}件</span>
            </p>
            <p>
              <span>低价</span>
              <span>原价</span>
              <span>限量</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      dy_List: []
    };
  },
  props: [],
  components: {},
  mounted() {
    this.$axios
      .get("https://api.it120.cc/small4/shop/goods/kanjia/list")
      .then(res => {
        console.log(res.data.data.goodsMap);
        this.dy_List = res.data.data.goodsMap;
      });
  },
  methods: {
    back() {
      this.$router.push({
        path: "/"
      });
    },
    jump(id){
      // let kjid=0
      // this.dy_List.forEach((item)=>{
      //   if(item.goodsId==id){
      //     kjid=item.id
      //   }
      // })
      this.$router.push("/kan/cuteinfo?id="+id)
    }
  }
};
</script>

<style scoped lang="scss">
.dy-box {
  >p {
    width: 100%;
    height: 50px;
    // border-bottom: 2px solid #f5f5f5;
    line-height: 50px;
    position: fixed;
    top: 0;
    background: #fff;
    span:nth-of-type(1) {
      font-size: 20px;
      margin-left: 20px;
    }
    span:nth-of-type(2) {
      font-size: 15px;
      margin-left: 110px;
    }
  }
  ul {
      // padding: 5px;
      margin-top: 50px;
      > li {
        display: flex;
        margin-top: 5px;
        border-top: 0.04rem solid #f5f5f5;
        padding: 8px;
        > img {
          width: 110px;
          height: 110px;
          border-radius: 5px;
        }
        > div {
          margin-left: 8px;
          > p:nth-of-type(1) {
            font-size: 15px;
          }
          > p:nth-of-type(2) {
            font-size: 12px;
            color: #b2b2b2;
            margin-top: 10px;
          }
          > p:nth-of-type(3) {
            font-size: 14px;
            color: #b2b2b2;
            margin-top: 25px;
            span:nth-of-type(1) {
              color: #d00000;
              font-weight: bold;
            }
            span:nth-of-type(2) {
             margin-left: 30px;
            }
            span:nth-of-type(3) {
             margin-left: 30px;
            }
          }
          > p:nth-of-type(4) {
            font-size: 13px;
            margin-top: 10px;
            color: #b2b2b2;
            span:nth-of-type(1) {
              color: #000;
            }
            span:nth-of-type(2) {
             margin-left: 35px;
            }
            span:nth-of-type(3) {
             margin-left: 38px;
            }
          }
        }
      }
    }
}
</style>