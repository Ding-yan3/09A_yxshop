<template>
  <div class="dy-box">
    <el-container class="dy-container">
      <el-header>
        <div>
          <span v-if="this.$store.state.user.token">
            <a>{{this.$store.state.user.name}}</a>
            <a @click="logout">Ansmited</a>
            <i class="el-icon-shopping-cart-1" @click="goCart()"></i>
          </span>
          <span v-else>
              <a @click="doLogin">Login</a>
              <i class="el-icon-shopping-cart-1"></i>
          </span>
        </div>
        <div>
          Sort By
          <span @click="Sort()">
            price
            <i class="el-icon-d-caret" v-show="dy_sort==0"></i>
            <i class="el-icon-caret-top" v-show="dy_sort==1"></i>
            <i class="el-icon-caret-bottom" v-show="dy_sort==2"></i>
          </span>
        </div>
      </el-header>
      <el-container>
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
          <div class="dy-item" v-for="(item,index) in searchList" :key="index">
            <div>
              <img :src="'static/img/'+item.productImage" alt />
            </div>
            <div>
              <p>{{item.productName}}</p>
              <p>￥{{item.salePrice}}</p>
            </div>
            <div>
              <el-button type="danger" plain @click="addCart(item)">加入购物车</el-button>
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
      dy_aside: [
        "All",
        "0.00-100.00",
        "100.00-200.00",
        "200.00-500.00",
        "500.00-1000.00",
        "1000.00-5000.00"
      ],
      dy_active: 0,
      dy_List: [],
      dy_flag:true,
      dy_loading:false,
      dy_page:2
    };
  },
  props: [],
  components: {},
  computed:{
      searchList(){
          let dy_goods=this.dy_List
          dy_goods.sort((a,b)=>{
              if(this.dy_sort==1){
                  return a.salePrice-b.salePrice
              }else if(this.dy_sort==2){
                  return b.salePrice-a.salePrice
              }
          })

          if(this.dy_active !=0){
              let price=this.dy_aside[this.dy_active]
              let min=price.split("-")[0]
              let max=price.split("-")[1]

              dy_goods=dy_goods.filter((item)=>{
                  return item.salePrice >= min&&item.salePrice<max
              })
          }
          return dy_goods
      }
  },
  mounted() {
    this.getList();
    window.addEventListener("scroll",this.getMore)
  },
  methods: {
    Sort() {
      if (this.dy_sort == 0 || this.dy_sort == 2) {
        this.dy_sort = 1;
      } else {
        this.dy_sort = 2;
      }
    },
    getList() {
      this.$axios({
        url: "static/data.json"
      }).then(res => {
        console.log(res.data.result.list);
        this.dy_List = res.data.result.list;
      });
    },
    doLogin(){
        this.$store.commit("login",{name:"dyd",token:"123456"})
    },
    logout(){
        this.$store.commit("logout")
    },
    getMore(){
        if(this.dy_page>3||this.dy_flag==false){
            return false
        }
        this.dy_flag=false
        this.dy_loading=true

        setTimeout(() => {
            this.$axios({
                url: `static/data${this.dy_page}.json`
            }).then((res)=>{
                this.dy_List.push(...res.data.result.list)
                this.dy_page++
                this.dy_flag=true
                this.dy_loading=false
            })
        }, 1500);
    },
    addCart(item){
        if(this.$store.state.user==""){
            this.$message("用户必须登录")
            return false
        }
        this.$store.commit("addCart",item)
        this.$message({
            message:"加入购物车成功",
            type:'success'
        })
    },
    goCart(){
      this.$router.push("/cart")
    }
  }
};
</script>

<style scoped lang="scss">
.dy-box {
  width: 100%;
  background: lightgreen;
  .dy-container {
    cursor: pointer;
    width: 90%;
    margin: 0 auto;
    margin-bottom: 10px;
    background: #f0f0f0;
    .el-header {
      width: 100% !important;
      height: 110px !important;
      margin-bottom: 10px;
      div {
        width: 100%;
        padding: 0px 10px;
        box-sizing: border-box;
        height: 50px;
        line-height: 50px;
        background: #fff;
        text-align: right;
        a {
          padding: 0 5px;
          color: #0088dd;
        }
        span {
          padding-left: 10px;
        }
      }
      div:nth-of-type(1) {
        margin-bottom: 10px;
      }
    }
    @media screen and(min-width:750px) {
      .el-aside {
        width: 15% !important;
        overflow: hidden;
        ul {
          width: 100%;
          li {
            width: 100%;
            line-height: 50px;
            text-indent: 10px;
          }
          li.dy_active {
            border-left: 2px solid red;
            background: #fff;
          }
        }
      }
    }
    @media screen and(max-width:750px) {
      .el-aside {
       display: none;
      }
    }
    .el-main {
      width: 80% !important;
      display: flex;
      flex-wrap: wrap;
      .dy-item:hover{
          transform: scale(1.02);
          box-shadow: 0px 0px 6px red;
      }
      @media screen and(min-width: 960px) {
        .dy-item {
          width: 23%;
          margin: 1%;
          background: #fff;
          padding: 5px;
          box-sizing: border-box;
          div {
            width: 100%;
            img {
              width: 92%;
            }
            p:nth-of-type(2) {
              color: red;
              margin-top: 20px;
            }
            .el-button {
              width: 100%;
              margin-top: 10px;
            }
          }
        }
      }
      @media screen and(max-width: 960px) and(min-width:750px) {
        .dy-item {
          width: 30%;
          margin: 1%;
          background: #fff;
          padding: 5px;
          box-sizing: border-box;
          div {
            width: 100%;
            img {
              width: 92%;
            }
            p:nth-of-type(2) {
              color: red;
              margin-top: 20px;
            }
            .el-button {
              width: 100%;
              margin-top: 10px;
            }
          }
        }
      }

      @media screen and(max-width: 750px) {
        .dy-item {
          width: 98%;
          margin: 1%;
          background: #fff;
          padding: 5px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          div {
            width: 100%;
            img {
              width: 92%;
            }
            p:nth-of-type(2) {
              color: red;
              margin-top: 20px;
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
}
</style>