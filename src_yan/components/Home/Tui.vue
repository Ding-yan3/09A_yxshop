<template>
  <div class="dy-box">
    <div class="dy-list">
      <p @click="jump()">人气推荐 ></p>
      <ul>
        <li v-for="(item,index) in dy_List" :key="index" @click="toggle(item.id)">
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
      this.dy_List = res.data.data.slice(9, 13);
    });
  },
  methods: {
    jump(){
      this.$router.push({
        path:"/allist"
      })
    },
    toggle(id){
      this.$router.push("/tui/renqi?id="+id)
    }
  }
};
</script>

<style scoped lang="scss">
.dy-box {
  height: 400px;
  .dy-list {
    width: 100%;
    // height: 400px;
    // background: red;
    border-bottom: 1.2rem solid #f5f5f5;
    > p {
      height: 40px;
      // background: #000;
      line-height: 40px;
      text-align: center;
      font-size: 17px;
    }
    ul {
      display: flex;
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
}
</style>