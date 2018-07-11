<template>
  <div>
    <!--<back :name="nameData"></back>-->
    <div class="details">
      <el-row class="top_title  mb_20">
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
          <input type="text" class="price_input t-r" v-model="price" readonly>
        </el-col>
      </el-row>-->
      <el-row class="grey mb_20">
        <el-col :span="24" class="t_a left bb">
          构型
        </el-col>
        <el-col v-if="configuration" :span="24" class="t_a">
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
      <!--<div>各种被切割材料推荐攻牙速度(m/min)</div>
      <el-row class="grey" :class="{'bt_none':index!=0,'mb_20':index == down.length-1}" v-for="(item,index) in down">
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
        configuration:"",
        price:"",
        unit:"",
        up:[
          {name:"产品编号",value:'',code:'part_num'},
          {name:"构型规格",value:'',code:'spec'},
          {name:"螺纹种类",value:'',code:'thread_type'},
          {name:"产品代号",value:'',code:'product_code'},
          {name:"品名",value:'',code:'product_name'},
          {name:"显示品名",value:'',code:'display_name'},
          {name:"尺寸",value:'',code:'size'},
          {name:"尺寸简写",value:'',code:'size_app'},
          {name:"牙距/牙数",value:'',code:'pitch'},
          {name:"外径(D)",value:'',code:'external_diameter'},
          {name:"厚度(T)",value:'',code:'thickness'},
          {name:"排屑孔数",value:'',code:'chip_num'},
          {name:"有无背隙",value:'',code:'is_clearance'},
          {name:"刀刃牙数",value:'',code:'teeth_num'},
          {name:"到基准径的长(ℓg)",value:'',code:'to_datum_length'},
          {name:"精度等级",value:'',code:'accuracy_lv'},
          {name:"材质",value:'',code:'material_quality'},
          {name:"表面处理",value:'',code:'surface_treatment'},
          {name:"构型",value:'',code:''},
          // {name:"单位",value:'',code:'unit'},
        ],
        /*down:[
          {name:"低碳钢",value:'',code:'less_carbon_steel'},
          {name:"中碳钢",value:'',code:'medium_carbon_steel'},
          {name:"钢碳钢",value:'',code:'steel_carbon_steel'},
          {name:"合金钢",value:'',code:'alloy_steel'},
          {name:"不锈钢",value:'',code:'stainless_steel'},
          {name:"铝滚轧材",value:'',code:'al_rolling_material'},
          {name:"铝合金铸件",value:'',code:'al_alloy_casting'},
          {name:"锌合金铸件",value:'',code:'zn_alloy_casting'},
          {name:"黄铜",value:'',code:'brass'},
          {name:"黄铜铸件",value:'',code:'brass_casting'},
          {name:"青铜",value:'',code:'bronze'},
          {name:"镁合金铸件",value:'',code:'mg_alloy_casting'},
          {name:"钛合金",value:'',code:'ti_alloy'},
          {name:"镍合金",value:'',code:'ni_alloy'},
          {name:"调制刚(25-35HRC)",value:'',code:'modulated_steel_25'},
          {name:"调制刚(35-45HRC)",value:'',code:'modulated_steel_35'},
          {name:"调制刚(45-55HRC)",value:'',code:'modulated_steel_45'},
          {name:"调制刚(50-63HRC)",value:'',code:'modulated_steel_50'},
          {name:"调制钢",value:'',code:'modulated_steel'},
          {name:"工具钢",value:'',code:'tool_steel'},
          {name:"铸铁",value:'',code:'cast_iron'},
          {name:"强韧铸铁",value:'',code:'strong_cast_iron'},
          {name:"热固性塑料",value:'',code:'thermo_set'},
        ]*/
      }
    },
    methods:{
      getDetail(){
        let _t = this;
        api.yuanbanDetail({id:_t.id}).then(res => {
          _t.name = res.data.product_name;
          _t.configuration = res.data.configuration;
          _t.unit = res.data.unit;
          _t.price = 'JPY '+res.data.price;
          for(let i in res.data){
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
