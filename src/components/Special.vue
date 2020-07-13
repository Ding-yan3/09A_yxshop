<template>
  <div>
    <div class="dy-box">
      <p>
        <span @click="back">&lt;</span>
        <span>严选专栏</span>
      </p>
      <ul>
        <li v-for="(item,index) in dy_List" :key="index" @click="toggle(item.id)">
          <img :src="item.pic" alt />
          <div>
            <p>{{item.title}}</p>
            <p>{{item.descript}}</p>
            <p>查看详情</p>
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
    this.$axios.get("https://api.it120.cc/small4/cms/news/list").then(res => {
      console.log(res.data.data);
      this.dy_List = res.data.data;
    });
  },
  methods: {
    back() {
      this.$router.push({
        path: "/"
      });
    },
     toggle(id){
      this.$router.push("/special/artiacl?id="+id)
    }
  }
};
</script>

<style scoped lang="scss">
.dy-box {
  > p {
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
  > ul {
    > li {
      padding: 0px 5px;
      position: relative;
      margin-top: 5px;
      > img {
        width: 100%;
        height: 200px;
      }
      > div {
        position: absolute;
        z-index: 100;
        color: #fff;
        // background: red;
        width: 300px;
        text-align: center;
        top:60px;
        left: 30px;
        > p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        >p:nth-of-type(1){
            font-weight: bold;
            font-size: 18px;
        }
        >p:nth-of-type(2){
            margin-top: 20px;
        }
         >p:nth-of-type(3){
            margin-top: 10px;
            border: 1px solid #fff;
            width: 80px;
            text-align: center;
            margin-left: 110px;
            padding: 5px 0px;
            border-radius: 20px;
        }
      }
    }
  }
}
</style>