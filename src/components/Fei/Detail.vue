<template>
  <div>
    <van-nav-bar title="分类商品" left-arrow @click-left="back" />
    <Goods v-if="Goods.length>0" :Goods="Goods"></Goods>
    <van-empty v-else description="还没有商品呢" />
  </div>
</template>

<script>
import Goods from '@/components/Allist'
export default {
  name: "",
  data() {
    return {
        dy_List:[],
        cid:0
    };
  },
  props: [],
  components: {
      Goods
  },
  mounted() {
    // console.log(this.$route.query.id);
    this.getGood()
    this.cid=this.$route.query.id
    
  },
  computed:{
      Goods(){
          return this.dy_List.filter((item)=>{
              return item.categoryId==this.cid
          })
      }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getGood(){
        this.$axios({
            url:"https://api.it120.cc/small4/shop/goods/list"
        }).then((res)=>{
            console.log(res.data.data)
            this.dy_List=res.data.data
        })
    }
  }
};
</script>

<style scoped lang="scss">
.dy-box {
  ul {
    display: flex;
    // margin-top: 50px;
    flex-wrap: wrap;
    li {
      margin-left: 10px;
      img {
        width: 160px;
        height: 200px;
      }
      p:nth-of-type(1) {
        font-size: 14px;
        width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 3px;
      }
      p:nth-of-type(2) {
        font-size: 12px;
        width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #aaa;
        margin-top: 8px;
      }
      p:nth-of-type(3) {
        font-size: 12px;
        margin-top: 6px;
      }
    }
  }
}
</style>