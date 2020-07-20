<template>
  <div>
    <h4>瀑布流布局</h4>
    <ul>
      <li class="item" v-for="(item,index) in dy_List" :key="index">
          <img :src="item.pic" alt="">
          <p>{{index+1}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
        dy_List:[]
    };
  },
  props: [],
  components: {},
  mounted() {
      this.getGoods()
  },
  methods: {
    getGoods() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/list"
      }).then(res => {
        console.log(res.data.data);
        this.dy_List = res.data.data;
        // console.log(this.dy_List);
        this.$nextTick(() => {
          this.WatchFull();
        });
      });
    },
    WatchFull(){
        //获取所有元素，计算每一行的列数
        let item=document.querySelectorAll(".item")
        //屏幕宽度
        let bodyWidth=document.documentElement.clientWidth;
        //每个元素的宽度
        let itemWidth=item[0].clientWidth;
        //每一行显示的列数
        let columns=parseInt(bodyWidth/itemWidth)

        let columnArr=[]
        let space=10

        for(let i=0;i<item.length;i++){
            //第一行图片的操作
            if(i<columns){
                item[i].style.top="0px"
                item[i].style.left=(itemWidth+space)*i+"px"
                //保存第一行第一列的高度
                columnArr.push(item[i].clientHeight)
            }else{
                let minIndex=0; //找出每一列最小值的小标
                let minHeight=columnArr[0]

                for(let m=0;m<columnArr.length;m++){
                    if(columnArr[m]<minHeight){
                        minHeight=columnArr[m]
                        minIndex=m
                    }
                }
                item[i].style.left=item[minIndex].offsetLeft+"px"
                item[i].style.top=minHeight+space+"px"
                columnArr[minIndex]=minHeight+item[i].clientHeight+space
            }
        }
    }
  }
};
</script>

<style scoped lang="scss">
h4 {
  text-align: center;
}
ul{
    display: flex;
    flex-wrap: wrap;
    position: relative;
    margin-top: 10px;
    li{
        width: 30%;
        // padding: 5px;
        position: absolute;
        margin-top: 5px;
        img{
            width: 100%;
            box-shadow: 1px 5px 7px #000;
        }
        p{
            color: red;
            position: absolute;
            bottom: 10px;
        }
    }
}
</style>