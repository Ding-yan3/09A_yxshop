<template>
  <div>
    <van-nav-bar title="登录账号" left-arrow />
    <!-- 表单信息 -->
    <div class="box">
      <van-cell-group>
        <h4>平台用户登录</h4>
        <van-field v-model="mobile" class="inp" placeholder="手机号码" right-icon="graphic" />
        <van-field
          v-model="psw"
          class="inp"
          placeholder="密码"
          :type="hid?'password':'text'"
          :right-icon="hid?'closed-eye':'eye-o'"
          @click-right-icon="hid=!hid"
        />
        <van-button class="btn" type="info" @click="login()">登录</van-button>
        <p class="dy-login">
          <router-link to="/register">还没有注册？立即注册</router-link>
        </p>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import storage from '@/Utils/localstorsge'
export default {
  name: "",
  data() {
    return {
      mobile: "",
      psw: "",
      hid:true
    };
  },
  //组件内路由守卫，判断用户是否登陆
  beforeRouteEnter (to, from, next) {
      //获取用户本地存储的token值，判断是否为空
      let data = storage.get("09A_user",true);
      ///已经登陆过，直接跳转到首页
      if(data != null){
          next("/");
      }else{//没有登陆，继续在当前页面停留
          next();
      }
  },
  props: [],
  components: {},
  mounted() {},
  methods: {
      login(){
          if(this.mobile==""||this.psw==""){
             this.$toast.fail("手机号或密码不能为空")
             return false
          }
          //手机号效验
          var dy_reg=/^1[345678]\d{9}$/
          if(!dy_reg.test(this.mobile)){
              this.$toast.fail("请输入正确的手机号")
              return false
          }
          this.doLogin()  //调用执行登录的方法
      },


      //执行登录的操作
      doLogin(){
          this.$axios({
              url:"https://api.it120.cc/small4/user/m/login?deviceId=007&deviceName=monkey",
              params:{
                  mobile:this.mobile,
                  pwd:this.psw
              }
          }).then(res=>{
              console.log(res)
              if(res.data.code!=0){
                  this.$toast.fail(res.data.msg)
                  return false
              }

              //把用户登录成功的信息储存到本地
              let user=new Object()
              user.uid=res.data.data.uid
              user.token=res.data.data.token
              user.account=this.mobile
              storage.set("09A_user",user,true)
              this.$toast.success("用户登录成功")
              this.$router.go(-1)
          })
      }
  }
};
</script>

<style scoped lang="scss">
.box {
  width: 95%;
  border: 1px solid #eee;
  border-radius: 3px;
  margin: 0.1rem auto;
  padding: 0.2rem;
  box-sizing: border-box;
  h4 {
    line-height: 0.88rem;
    font-size: 0.35rem;
  }
  .inp {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 0.3rem;
    background: #f5f5f5;
  }
  .btn {
    background: linear-gradient(90deg, #5ea6f8, #bb87f6);
    border: none;
    box-shadow: 0px 3px 3px rgba($color: #000000, $alpha: 0.3);
    width: 50%;
    margin-left: 25%;
  }
  .van-image {
    width: 3rem;
  }
  .dy-login {
    text-align: center;
    margin-top: 20px;
  }
}
</style>