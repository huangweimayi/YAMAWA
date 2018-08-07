<template>
  <div>
    <!--<back :name="nameData"></back>-->
    <div class="details">
      <el-row class="top_title mb_20">
        <el-col :span="24" class="t_a">
          <img class="logo" src="../images/s_logo.png" alt="">
        </el-col>
        <el-col :span="24">
          <div><span class="p_r"></span>{{name}}</div>
        </el-col>
      </el-row>
      <!--<el-row>
        <el-col :span="20" class="price">
          <div>单价</div>
          <input type="text" class="t_r price_input" v-model="price" readonly>
        </el-col>
      </el-row>-->
      <el-row class="grey mb_20 lh_50">
        <el-col :span="15" class="t_a left">
          型録
        </el-col>
        <el-col :span="9" class="t_a">
          <a :href="pdf" download>
            pdf
            <i class="el-icon-message p_r"></i>
          </a>
        </el-col>
      </el-row>
      <el-row class="grey mb_20">
        <el-col :span="24" class="t_a left bb">
          构型
        </el-col>
        <el-col :span="24" class="t_a">
          <img :src="configuration" alt="">
        </el-col>
      </el-row>
      <div>Spec(单位：{{unit}})</div>
      <table>
        <tr class="grey" :class="{'bt_none':index!=0,'mb_20':index == up.length-1}" v-for="(item,index) in up">
          <td class="t_a left">{{item.name}}</td>
          <td class="t_a">{{item.value}}</td>
        </tr>
      </table>
      <!--<el-row class="grey" :class="{'bt_none':index!=0,'mb_20':index == up.length-1}" v-for="(item,index) in up">
        <el-col :span="15" class="t_a left">
          {{item.name}}
        </el-col>
        <el-col :span="9" class="t_a">
          {{item.value}}
        </el-col>
      </el-row>-->
    </div>
    <div class="t_a" style="margin-top:10px;font-size: 1rem;color:#A5A5A5">
      ©2007-2017 YAMAWA MFG. Co., Ltd. All right reserved.
    </div>
  </div>
</template>

<script>
  import back from '@/components/back'
  import api from '@/api/api'
  export default {
    components:{back},
    name: "",
    data(){
      return{
        nameData:{name:'DETAIL'},
        name:'',
        id:this.$route.query.id,
        pdf:"",
        configuration:"",
        price:"",
        unit:"",
        up:[
          {name:"产品编号",value:'',code:'part_num'},
          {name:"用途",value:'',code:'purpose'},
          {name:"产品代号",value:'',code:'product_code'},
          {name:"品名",value:'',code:'product_name'},
          {name:"显示品名",value:'',code:'display_name'},
          {name:"尺寸",value:'',code:'size'},
          {name:"砖头径",value:'',code:'brick_diameter'},
          {name:"角度",value:'',code:'angle'},
          {name:"全长",value:'',code:'length'},
          {name:"ℓ",value:'',code:'l'},
          {name:"ℓ1",value:'',code:'l1'},
          {name:"ℓ2",value:'',code:'l2'},
          {name:"D1",value:'',code:'d1'},
          {name:"柄径",value:'',code:'handle_diameter'},
          {name:"H",value:'',code:'h'},
          {name:"沟数",value:'',code:'ditch_num'},
          {name:"材质",value:'',code:'material_quality'},
          {name:"表面处理",value:'',code:'surface_treatment'},
          {name:"构型",value:'',code:''},
        ]
      }
    },
    methods:{
      getDetail(){
        let _t = this;
        api.kongmianDetail({id:_t.id}).then(res => {
          _t.name = res.data.product_name;
          _t.pdf = res.data.pdf;
          _t.unit = res.data.unit;
          _t.configuration = res.data.configuration;
          _t.price = 'JPY '+res.data.price;
          for(let i in res.data){
            console.log(res.data[i])
            for(let k = 0;k<_t.up.length;k++){
              if(i == _t.up[k].code){
                _t.up[k].value = res.data[i]
              }
            }
            if(i == 'configuration'){
              let arr = res.data[i].split('/');
              _t.up[_t.up.length-1].value = arr[arr.length-1].split('.')[0]
            }
          }
        })
      }
    },
    created(){
      this.getDetail();
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $border:1px solid #888;
  .details {
    margin-top: 20px;
    font-size: 1.8rem;
    overflow: hidden;
    width: 100%;
  img.logo {
    width: 40%
  }
  .grey{
    border-top:$border;
    border-bottom:$border;
    font-size: 1.6rem;
    line-height:30px;
  &.lh_50{
     line-height:50px;
   }
  &.bt_none{
     border-top:none;
   }
  .left{
    background-color:#e8e7e4;
    box-sizing:border-box;
    border-right:$border;
  &.bb{
     border-bottom:$border;
     border-right:none;
   }
  }
  a{
    text-decoration:none;
  i{
    font-size:3.5rem;
    color:#333;
    top:5px;
  }
  }
  }

  .line {
    display: inline-block;
    width:2px;
    background-color:#333;
    height:1.4rem;
    margin-right:10px;
    top:1px;
  }
  .price{
    font-size:1.8rem;
    margin-top:20px;
  .price_input{
    color:red;
    border:none;
    border-bottom:1px solid #ddd;
    outline:none;
    width:100%;
    text-align:right;
    font-size:1.8rem;
    margin-bottom:10px
  }
  }

  }
  table{
    width:100%;
    border-collapse: collapse;
    table-layout: fixed;
    margin:10px 0;
  }
</style>
