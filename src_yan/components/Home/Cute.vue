<template>
  <div>
    <p class="item">{{deteStr}}</p>
  </div>
</template>

<script>
import storage from '@/Utils/localstorsge'
export default {
  name: '',
  data() { 
    return {
        id:0,
        kjid:0,
        cuteInfo:[],
        deteStr:""
    }
  },
  props: [

  ],
  components:{
  },
  mounted() {
    this.id=this.$route.query.id
    this.kjid=this.$route.query.kjid
    this.doCut()
    this.getDate()
  },
  methods:{
    doCut(){
        let fordata=new FormData();
        let user=storage.get("09A_user",true)

        fordata.append("token",user.token);
        fordata.append("kjid",this.kjid)

        this.$axios.post("https://api.it120.cc/small4/shop/goods/kanjia/join",fordata).then((res)=>{
            console.log(res.data)
            this.cuteInfo=res.data
        })
    },
    getDate() {
      setInterval(() => {
        let time1 = new Date();
        let time2 = new Date("2020-07-19");
        let diff = time2 - time1;
        let day = parseInt(diff / 1000 / 60 / 60 / 24);
        let hours = parseInt(diff / 1000 / 60 / 60) % 24;
        let minutes = parseInt((diff / 1000 / 60) % 60);
        let seconds = parseInt((diff / 1000) % 60);
        //console.log(day, hours, minutes, seconds);

        this.deteStr = `${day}:${hours}:${minutes}:${seconds}`;
      },1000);
    }
  },
 }
</script>

<style scoped>
.time {
  width: 100%;
  padding: 1rem 0px;
  text-align: center;
  background-color: #f0f0f0;
  font-size: 0.35rem;
}
</style>