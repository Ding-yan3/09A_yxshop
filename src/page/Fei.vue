<template>
  <div>
    <div class="dy-head">
      <input type="text" placeholder="回车搜索商品" />
    </div>
    <div class="dy-box">
      <div class="dy-left">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item title="所有分类" @click="change(0)" />
          <van-sidebar-item
            @click="change(item.id)"
            v-for="(item,index) in dy_List"
            v-show="item.pid==0"
            :key="index"
            :title="item.name"
          />
        </van-sidebar>
      </div>
      <div class="dy-right">
        <van-swipe
          class="my-swipe"
          :autoplay="3000"
        >
          <van-swipe-item v-for="(item,index) in dy_img" :key="index">
            <img :src="item" alt />
          </van-swipe-item>
        </van-swipe>

        <ul>
          <li v-for="(item,index) in search" :key="index">
            <img :src="item.icon" alt />
            <p>{{item.name}}</p>
          </li>
        </ul>
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
      dy_List: [],
      dy_active: 0,
      pid: 0,
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
    this.$axios
      .get("https://api.it120.cc/small4/shop/goods/category/all")
      .then(res => {
        console.log(res.data.data);
        this.dy_List = res.data.data;
      });
  },
  methods: {
    change(id) {
      this.pid = id;
    }
  },
  computed: {
    search() {
      if (this.pid == 0) {
        return this.dy_List;
      } else {
        var dy_arr = [];
        this.dy_List.forEach(item => {
          if (item.pid == this.pid) {
            dy_arr.push(item);
          }
        });
        return dy_arr;
      }
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
  display: flex;
  .dy-right {
    padding-bottom: 60px;
    .my-swipe,.van-swipe-item{
      width: 220px;
      border-radius: 5px;
      margin: 0 auto;
      img{
        width: 100%;
        height: 120px;
        border-radius: 5px;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        text-align: center;
        margin-top: 10px;
        margin-left: 5px;
        img {
          width: 80px;
          height: 80px;
        }
        p {
          font-size: 13px;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>