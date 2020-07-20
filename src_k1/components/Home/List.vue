<template>
  <div>
    <div class="dy-list">
        <p>全民砍价 <van-icon name="arrow" /></p>
        <ul>
            <li v-for="(item,index) in dy_List" v-show="index>99761" :key="index">
                <img :src="item.pic" alt="">
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
export default {
  name: '',
  data() { 
    return {
        dy_List:[]
    }
  },
  props: [

  ],
  components:{
  },
  mounted() {
    this.getList()
  },
  methods:{
    getList(){
        this.$axios({
            url:"https://api.it120.cc/small4/shop/goods/kanjia/list"
        }).then((res)=>{
            console.log(res.data.data.goodsMap)
            this.dy_List=res.data.data.goodsMap
        })
    }
  },
 }
</script>

<style scoped lang="scss">
.dy-list{
    border-bottom: 50px solid #f5f5f5;
    >p{
        height: 40px;
        // background: red;
        border-bottom: 0.08rem solid #f5f5f5;
        text-align: center;
        line-height: 40px;
        font-size: 0.9rem;
    }
     ul {
      // padding: 5px;
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
            font-size: 10px;
            color: #b2b2b2;
            margin-top: 5px;
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