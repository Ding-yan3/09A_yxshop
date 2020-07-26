<template>
  <div class="dy-main">
    <div class="dy-box">
      <h4>MY CART</h4>
      <table cellpadding="0" ceppspacing="0">
        <thead>
          <tr>
            <th> </th>
            <th>ITEMS</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>SUBTOTAL</th>
            <th>EDIT</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in cartList" :key="index">
            <td><input type="checkbox" v-model="item.checked"></td>
            <td>
                <img :src="'static/img/'+item.productImage" alt="">
                <span>{{item.productName}}</span>
            </td>
            <td>￥{{item.salePrice | numFormat}}</td>
            <td>
                <button class="dy-btn" @click="count(index)">-</button>
                <span>{{item.number}}</span>
                <button class="dy-btn" @click="item.number++">+</button>
            </td>
            <td style="color:red">{{item.salePrice*item.number | numFormat}}</td>
            <td>
                <i class="el-icon-delete" @click="del(index)"></i>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="1">
              selectAll
              <input type="checkbox" :checked="check" @change="checkAll"/>
            </td>
            <td colspan="5" style="text-align:right">
                <span style="color:#ccc">item total</span>:<strong style="color:red">{{sum | numFormat}}</strong>
                &nbsp; &nbsp;
                <button class="dy-btt">CHECKOUT</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
        cartList:[],
        check:true
    };
  },
  props: [],
  components: {},
  computed:{
    sum(){
        let sum=0
        this.cartList.forEach((item)=>{
            if(item.checked){
                sum+=item.salePrice*item.number
            }
        })

        if(this.cartList.length>0){
            this.$store.commit("subCart",this.cartList)
        }
        return sum
    }
  },
  mounted() {
      this.cartList=this.$store.state.cartList
  },
  methods: {
      del(index){
          this.$store.commit("delCart",index)
      },
      checkAll(e){
        this.cartList.map((item)=>{
            item.checked=e.target.checked
        })
        // console.log(this.check)
        // console.log(e.target.checked)
      },
      count(index){
          if(this.cartList[index].number<=1){
              alert("数量不能小于1")
              return false
          }

          this.cartList[index].number--
      }
  },
  filters:{
      numFormat(val,num=2){
          return val.toFixed(num)
      }
  },
  watch:{
      cartList:{
          handler(newValue){
            //   console.log(newValue)
              let dy_arr=newValue.filter((item)=>{
                  return item.checked==true
              })

                // console.log(dy_arr)
              if(dy_arr.length==newValue.length){
                  this.check=true
              }else{
                  this.check=false
              }
          },
          deep:true
      }
  }
};
</script>

<style scoped lang="scss">
.dy-main{
    background: #f0f0f0;
    width: 100%;
    overflow: hidden;
}
.dy-box {
  width: 90%;
  margin: 20px auto;
  table{
      width: 100%;
      margin-top: 10px;
      border-collapse: collapse;
      text-align: center;
      thead{
          background: rgba(0,0,0,0.5);
          color: #fff;
          th{
              padding: 5px 0px;
          }
      }
      tbody,tfoot{
          background: #fff;
      }
      td{
          padding: 5px 0;
          border-top: 1px solid #ccc;
      }
      tfoot{
          margin-top: 10px;
          border-top: 8px solid #f0f0f0;
      }
      img{
          width: 80px;
      }
      .dy-btn{
          padding: 0 10px;
      }
      .dy-btt{
        padding: 5px 10px;
        background: #ccc;
        color: #fff;
      }
  }
}
</style>