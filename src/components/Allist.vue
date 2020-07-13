<template>
  <div>
    <div class="dy-box">
      <!-- <p>
        <span @click="back">&lt;</span>
        <span>人气推荐</span>
      </p> -->
      <ul>
        <li v-for="(item,index) in dy_List" :key="index">
          <img :src="item.pic" alt />
          <div>
            <p>{{item.name}}</p>
            <p>{{item.characteristic}}</p>
            <p>
              <span style="color:#d00000">￥{{item.minPrice}}</span>
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
    this.$axios.get("https://api.it120.cc/small4/shop/goods/list").then(res => {
      console.log(res.data.data);
      this.dy_List = res.data.data;
    });
  },
  methods: {
    back() {
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>

<style scoped lang="scss">
.dy-box {
  > p {
    position: fixed;
    top: 0;
    background: #fff;
    width: 100%;
    height: 50px;
    // border-bottom: 2px solid #f5f5f5;
    line-height: 50px;
    span:nth-of-type(1) {
      font-size: 20px;
      margin-left: 20px;
    }
    span:nth-of-type(2) {
      font-size: 14px;
      margin-left: 110px;
    }
  }
  ul {
    display: flex;
    margin-top: 50px;
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