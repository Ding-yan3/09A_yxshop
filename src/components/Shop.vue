<template>
  <div class="dy-box">
    <el-container>
      <el-header>
        <div>
          <span>
            <a>admin</a>
            <a>Logout</a>
            <i class="el-icon-shopping-cart-2"></i>
          </span>
        </div>
        <div>
          Sort By :Defult
          <span class="dy-div" @click="Sort()">
            Price
            <i class="el-icon-d-caret" v-show="dy_sort==0"></i>
            <i class="el-icon-caret-top" v-show="dy_sort==1"></i>
            <i class="el-icon-caret-bottom" v-show="dy_sort==2"></i>
          </span>
        </div>
      </el-header>
      <el-container class="dy-con">
        <el-aside>
          <ul>
            <li
              @click="dy_active=index"
              :class="{dy_active:dy_active==index}"
              v-for="(item,index) in dy_aside"
              :key="index"
            >{{item}}</li>
          </ul>
        </el-aside>
        <el-main v-loading="dy_loading" element-loading-text="拼命加载中...">
          <div class="dy-item" v-for="(item,index) in serchList" :key="index">
            <div>
              <img :src="'static/img/'+item.productImage" alt />
            </div>
            <div>
              <p>{{item.productName}}</p>
              <p>{{item.salePrice}}</p>
            </div>
            <div>
              <el-button type="danger" plain @click="addShop(item)">加入购物车</el-button>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      dy_sort: 0,
      dy_active: 0,
      dy_aside: [
        "0.00-100.00",
        "100.00-200.00",
        "200.00-500.00",
        "500.00-1000.00",
        "1000.00-5000.00"
      ],
      dy_List: [],
      dy_loading: false,
      dy_page: 2,
      dy_flag: true
    };
  },
  props: [],
  computed: {
    serchList() {
      let dy_arr = this.dy_List;
      dy_arr.sort((a, b) => {
        if (this.dy_sort == 1) {
          return a.salePrice - b.salePrice;
        } else if (this.dy_sort == 2) {
          return b.salePrice - a.salePrice;
        }
      });

      if (this.dy_active != 0) {
        let dy_price = this.dy_aside[this.dy_active];
        let dy_min = dy_price.split("-")[0];
        let dy_max = dy_price.split("-")[1];

        dy_arr = dy_arr.filter(item => {
          return item.salePrice >= dy_min && item.salePrice < dy_max;
        });
      }

      return dy_arr;
    }
  },
  components: {},
  mounted() {
    this.getList();
    window.addEventListener("scroll", this.getMore);
  },
  methods: {
    getList() {
      this.$axios({
        url: "static/data.json"
      }).then(res => {
        console.log(res.data.result.list);
        this.dy_List = res.data.result.list;
      });
    },
    Sort() {
      if (this.dy_sort == 0 || this.dy_sort == 2) {
        this.dy_sort = 1;
      } else {
        this.dy_sort = 2;
      }
    },
    getMore() {
      if (this.dy_page > 3 || this.dy_flag == false) {
        return false;
      }
      this.dy_flag = false;
      this.dy_loading = true;

      setTimeout(() => {
        this.$axios({
          url: `static/data${this.dy_page}.json`
        }).then(res => {
        //   console.log(res.data.result.list);
          this.dy_List.push(...res.data.result.list);
          this.dy_page++
          this.dy_flag=true
          this.dy_loading=false
        });
      }, 1500);
    },
    addShop(item){
      // alert(item)
      this.$store.commit("addShop",item)
    }
  }
};
</script>

<style scoped lang="scss">
.dy-box {
  width: 100%;
  background: rgb(132, 217, 228);
  .el-container {
    cursor: pointer;
    width: 90%;
    background: #f0f0f0;
    margin: 0 auto;
    margin-bottom: 10px;
    .el-header {
      width: 100% !important;
      height: 100px !important;
      margin-bottom: 10px;
      > div {
        background: #fff;
        width: 100%;
        display: flex;
        height: 50px;
        padding: 0 10px;
        line-height: 50px;
        text-align: right;
        box-sizing: border-box;
        span {
          margin-left: 10px;
        }
      }
      div:nth-of-type(1) {
        margin-bottom: 10px;
      }
    }
  }

  .dy-con {
    width: 100%;
  }

  @media screen and(min-width: 750px) {
    .el-aside {
      //   background: #aaa;
      width: 15% !important;
      overflow: hidden;
      margin-top: 10px;
      ul {
        //   padding: 10px;
        width: 100%;
        li {
          padding: 15px;
        }
        li.dy_active {
          border-left: 3px solid red;
          background: #fff;
        }
      }
    }
  }

  @media screen and(max-width: 750px) {
    .el-aside {
      display: none;
    }
  }

  .el-main {
    width: 80% !important;
    //   background: red;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    .dy-item:hover {
      transform: scale(1.03);
      box-shadow: 0px 0px 8px red;
    }

    @media screen and(min-width:960px) {
      .dy-item {
        width: 21%;
        background: #fff;
        margin: 1%;
        padding: 5px;
        div {
          width: 100%;
          img {
            width: 89%;
          }
          p {
            margin-top: 10px;
          }
          p:nth-of-type(2) {
            margin-top: 15px;
          }
          .el-button {
            width: 100%;
            margin-top: 10px;
          }
        }
      }
    }

    @media screen and(min-width:750px) and(max-width:960px) {
      .dy-item {
        width: 28%;
        background: #fff;
        margin: 1%;
        padding: 5px;
        div {
          width: 100%;
          img {
            width: 89%;
          }
          p {
            margin-top: 10px;
          }
          p:nth-of-type(2) {
            margin-top: 15px;
          }
          .el-button {
            width: 100%;
            margin-top: 10px;
          }
        }
      }
    }

    @media screen and(max-width:750px) {
      .dy-item {
        width: 98%;
        background: #fff;
        margin: 1%;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        div {
          width: 100%;
          img {
            width: 89%;
          }
          p {
            margin-top: 10px;
          }
          p:nth-of-type(2) {
            margin-top: 15px;
          }
          .el-button {
            width: 100%;
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>