<template>
  <div>
    <van-nav-bar title="用户注册" left-arrow />
    <!-- 页面主题 -->
    <div class="box">
      <van-cell-group>
        <h4>新用户注册</h4>
        <van-field v-model="mobile" class="inp" placeholder="手机号码" right-icon="graphic"/>
        <van-field v-model="psw" class="inp" placeholder="密码" 
            :type="hid?'password':'text'"
            :right-icon="hid?'closed-eye':'eye-o'"
            @click-right-icon="hid=!hid"
            />
        <van-field v-model="psw1" class="inp" placeholder="确认密码" 
            :type="hid1?'password':'text'"
            :right-icon="hid1?'closed-eye':'eye-o'"
            @click-right-icon="hid1=!hid1"
            />
        <van-field v-model="name" class="inp" placeholder="用户名" right-icon="user-o"/>
        <van-field v-model="img" class="inp" placeholder="验证码">
            <template #right-icon>
                <van-image :src="imgurl" @click="createImgCode"></van-image>
            </template>
        </van-field>
        <van-field v-model="area" class="inp" placeholder="选择城市" right-icon="location-o" @click="dy_Show=true"/>
        <!-- 城市列表弹框 -->
        <van-popup v-model="dy_Show" position="bottom" :style="{ height: '50%' }">
            <van-area title="选择城市" :area-list="AreaList" @cancel="dy_Show=false" @confirm="selectedArea"></van-area>
        </van-popup>

        <van-field v-model="code" class="inp" placeholder="手机验证码">
            <template #button>
                <van-button type="danger" plain-size="small" :disabled="btnD" @click="send">{{mag}}</van-button>
            </template>
        </van-field>
        <van-button class="btn" type="info" @click="submit()">立即注册</van-button>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import "@/assets/reset.css";
import AreaList from "@/Utils/area";
export default {
  name: "",
  data() {
    return {
        hid:true,
        hid1:true,
        mobile:"",//手机验证
        psw:"",   //密码
        psw1:"",  //验证密码
        name:"",  //用户名
        img:"",   //图验证码
        code:"",  //手机验证
        area:"",  //地区
        // 验证码
        imgurl:"",
        pick:"",
        //选择地区
        dy_Show:false,
        AreaList:AreaList,  //城市列表数据
        provice:"",  //省
        city:"",  //城市


        //倒计时
        mag:"发送验证码",
        btnD:false
    };
  },
  props: [],
  components: {},
  mounted() {
      this.createImgCode()
  },
  methods: {
      submit(){
          if(this.mobile==""||this.pwd==""||this.name==""||this.img==""||this.code==""){
              this.$toast.fail("手机号，密码，用户名，验证码不能为空")
              return false
          }

          //手机号效验
          var dy_reg=/^1[345678]\d{9}$/
          if(!dy_reg.test(this.mobile)){
              this.$toast.fail("请输入正确的手机号")
              return false
          }

          //确认密码是否一致
          if(this.psw1!=this.psw){
              this.$toast.fail("密码不一致，请重新输入")
              return false
          }
          this.$toast.success("恭喜您，注册成功")
      },
      //图文验证码
      createImgCode(){
          //生成图片随机参数
          this.pick=(new Date()).getTime();
          let dy_Url = "https://api.it120.cc/small4/verification/pic/get";
          this.imgurl=`${dy_Url}?key=${this.pick}`
      },
      //选择城市
      selectedArea(arr){
          this.dy_Show=false;
          //去除数组中的name值
          let dy_map=arr.map(item=>{
              return item.name
          })
          //处理省份
          this.provice=dy_map[0];
          this.city=dy_map[1]
          //数组转换成字符串
          this.area=dy_map.join(" ")
      },
      //倒计时的功能
      countSeconds(){
          this.btnD=true
          //倒计时的时间
          let dy_timeout=60;
          //倒计时间歇
          let dy_timer=setInterval(() => {
              //读秒结束
              if(dy_timeout<1){
                  this,btnD=false;
                  //清除定时器
                  clearInterval(dy_timer)
                  this.mag="重新发送"
                  return false
              }
              //正在倒计时的时候
              this.mag=`${dy_timeout}s后重试`
              dy_timeout--
          }, 1000);
      },
      //发送验证码
      send(){
          this.$axios({
              url:"https://api.it120.cc/small4/verification/sms/get",
              params:{
                  mobile:this.mobile,
                  key:this.pick,
                  picCode:this.img
              }
          }).then((res)=>{
              console.log(res)
              //失败
              if(res.data.code!=0){
                  this.$toast.fail(res.data.msg)
                  return false
              }
              this.countSeconds()  //调用计时器方法
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
  margin: 0.5rem auto;
  padding: 0.2rem;
  box-sizing: border-box;
  h4{
      line-height: .88rem;
      font-size: .35rem;
  }
  .inp{
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-bottom: .3rem;
      background: #f5f5f5;
  }
  .btn{
      background: linear-gradient(90deg, #5ea6f8, #bb87f6);
      border: none;
      box-shadow: 0px 3px 3px rgba($color: #000000, $alpha: .3);
      width: 100%;
  }
  .van-image{
      width: 3rem;
  }
}
</style>