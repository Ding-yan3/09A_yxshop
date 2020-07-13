<template>
  <div>
    <div class="dy-head">
      <input type="text" @keydown.enter="Scer()" placeholder="回车搜索商品" />
    </div>
    <div class="dy-box">
      <div class="dy-left">
        <van-tree-select
          @click-nav="changeLeft"
          height="165vw"
          :items="dy_List"
          :main-active-index.sync="active"
        >
          <template #content>
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
              <van-swipe-item v-for="(item,index) in dy_img" :key="index">
                <img :src="item" alt="">
              </van-swipe-item>
            </van-swipe>
            <div class="dy-right">
              <div
                class="dy-item"
                v-for="(item,index) in search"
                :key="index"
                @click="jump(item.id)"
              >
                <img :src="item.icon" alt="无图片" />
                <p>{{item.name}}</p>
              </div>
            </div>
          </template>
        </van-tree-select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Fei",
  data() {
    return {
      activeKey: 0,
      dy_List: [{ text: "所有分类" }],
      cateIds: [0],
      active: 0,
      dy_cate: [],
      dy_img: [
        "static/image/f3.jpg",
        "static/image/f.jpg",
        "static/image/f1.jpg",
        "static/image/f2.jpg"
      ]
    };
  },
  props: [],
  components: {},
  mounted() {
    this.getList();
  },
  methods: {
    changeLeft(index) {
      console.log(this.cateIds[index]);
    },
    getList() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/category/all"
      }).then(res => {
        console.log(res.data.data);
        this.dy_cate = res.data.data;
        res.data.data.forEach(item => {
          if (item.pid == 0) {
            this.dy_List.push({ text: item.name });
            this.cateIds.push(item.id);
          }
        });
      });
    },
    jump(id) {
      this.$router.push({
        path: "/fei/detail",
        query: {
          id: id
        }
      });
    },
    Scer(){
      this.$router.push({path:"/fei/search"})
    }
  },
  computed: {
    search() {
      let dy_arr = this.dy_cate;
      if (this.active == 0) {
        return dy_arr;
      }

      return dy_arr.filter(item => {
        return item.pid == this.cateIds[this.active];
      });
    }
  }
};
</script>

<style scoped lang="scss">
.dy-head {
  width: 100%;
  height: 40px;
  // background: #000;
  input {
    background: #f5f5f5;
    width: 240px;
    border-radius: 20px;
    height: 20px;
    color: #bbb;
    font-size: 13px;
    padding-left: 10px;
    margin-top: 12px;
    margin-left: 10px;
  }
}
.dy-box {
  // display: flex;
  .dy-left {
    .my-swipe,.van-swipe-item{
      width: 95%;
      // margin-left: 10px;
      height: 150px;
      border-radius: 4px;
      img{
        width: 100%;
        border-radius: 4px;
        height: 130px;
      }
    }
    .dy-right {
      max-height: 85%;
      overflow: auto;
      position: fixed;
      display: flex;
      flex-wrap: wrap;
      .dy-item {
        width: 28%;
        height: 90px;
        img {
          width: 90%;
          margin: 1%；;
        }
        p {
          line-height: 0.6rem;
          width: 90%;
          text-align: center;
          font-size: 12px;
        }
      }
    }
  }
}
</style>