<template>
  <div>
    <!--<back :name="nameData"></back>-->
    <div class="sfc">
      <el-row :gutter="10" class="top_title">
        <el-col :span="12" class="t_r">
          <img src="../images/logo.jpg" alt="">
        </el-col>
        <el-col :span="12">
          <div>速度与进给</div>
          <div>计算器</div>
        </el-col>
      </el-row>
      <el-tabs type="border-card" v-model="activeName" style="margin-top:15px;">
        <el-tab-pane label="公制" name="mm">
          <el-form class="d_form">
            <el-row>
              <el-col :span="24" class="t_a">
                <el-select v-model="search.luowen_type"  @focus="speed" placeholder="请选择" style="width:65%">
                  <el-option
                    v-for="item in options1"
                    :key="item.luowen_type"
                    :label="item.luowen_type"
                    :value="item.luowen_type">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="t_a">

                <div style="font-weight:bold;margin: 10px 0;">尺寸</div>
                <el-select v-model="search.nominal_size" @focus="speed" placeholder="请选择">
                  <el-option
                    v-for="item in options2"
                    :key="item.nominal_size"
                    :label="item.nominal_size"
                    :value="item.nominal_size">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="12" class="t_a">

                <div style="font-weight:bold;margin: 10px 0;">牙距/牙数</div>
                <el-select v-model="search.pitch" @focus="speed" placeholder="请选择">
                  <el-option
                    v-for="item in options3"
                    :key="item.pitch"
                    :label="item.pitch"
                    :value="item.pitch">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form>
          <div class="t_a">m/min</div>
          <el-form class="t_a black_bd">
            <el-form-item>
              <el-input style="width:45%" v-model="num1"></el-input>
              <el-button type="warning" @click="getNum2">Calculate</el-button>
            </el-form-item>
          </el-form>
          <div class="t_a">rpm</div>
          <el-form class="t_a black_bd">
            <el-form-item>
              <el-input style="width:45%" v-model="num2"></el-input>
              <el-button type="warning" @click="getNum1">Calculate</el-button>
            </el-form-item>
          </el-form>
          <el-card class="card_s">
            <el-form class="t_a">
              <div class="t_a" style="font-weight:bold">Feed(m/min)</div>
              <el-form-item>
                <el-input style="width:90%" disabled v-model="num3"></el-input>
              </el-form-item>
              <div class="t_a" style="font-weight:bold">Feed(mm/rev)</div>
              <el-form-item>
                <el-input style="width:90%" disabled v-model="num4"></el-input>
              </el-form-item>
            </el-form>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="英寸" name="inch">
          <el-form class="d_form">
            <el-row>
              <el-col :span="24" class="t_a">
                <el-select v-model="search.luowen_type" placeholder="请选择" class="my_select" style="width:65%">
                  <el-option
                    v-for="item in options1"
                    :key="item.luowen_type"
                    :label="item.luowen_type"
                    :value="item.luowen_type">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="t_a">
                <!--<div style="color:#fff">1 </div>-->
                <div style="font-weight:bold;margin: 10px 0;">尺寸</div>
                <el-select v-model="search.nominal_size" placeholder="请选择">
                  <el-option
                    v-for="item in options2"
                    :key="item.nominal_size"
                    :label="item.nominal_size"
                    :value="item.nominal_size">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="12" class="t_a">
                <!--<div style="color:#fff">1 </div>-->
                <div style="font-weight:bold;margin: 10px 0;">牙距/牙数</div>
                <el-select v-model="search.pitch" placeholder="请选择">
                  <el-option
                    v-for="item in options3"
                    :key="item.pitch"
                    :label="item.pitch"
                    :value="item.pitch">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form>
          <div class="t_a">SFM</div>
          <el-form class="t_a black_bd">
            <el-form-item>
              <el-input style="width:45%" v-model="num5"></el-input>
              <el-button type="warning" @click="getNum6">Calculate</el-button>
            </el-form-item>
          </el-form>
          <div class="t_a">rpm</div>
          <el-form class="t_a black_bd">
            <el-form-item>
              <el-input style="width:45%" v-model="num6"></el-input>
              <el-button type="warning" @click="getNum5">Calculate</el-button>
            </el-form-item>
          </el-form>
          <el-card class="card_s">
            <el-form class="t_a">
              <div class="t_a" style="font-weight:bold">Feed(IPM)</div>
              <el-form-item>
                <el-input style="width:90%" disabled v-model="num7"></el-input>
              </el-form-item>
              <div class="t_a" style="font-weight:bold">Feed(IPR)</div>
              <el-form-item>
                <el-input style="width:90%" disabled v-model="num8"></el-input>
              </el-form-item>
            </el-form>
          </el-card>
        </el-tab-pane>
      </el-tabs>
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
    watch:{
      'search.luowen_type'(n,o){
        this.speed(1);
      },
      'search.nominal_size'(n,o){
        this.speed(2);
      },
      'search.pitch'(n,o){
        this.speed(3);
      }
    },
    data(){
      return{
        nameData:{name:'Speed & Feed'},
        topName:'121',
        activeName:'mm',
        options1:[],
        options2:[],
        options3:[],
        search:{
          luowen_type:'',
          nominal_size:'',
          pitch:'',
        },
        num1:'',
        num2:'',
        num3:'',
        num4:'',
        num5:'',
        num6:'',
        num7:'',
        num8:'',
        speedGet:{
          dajing: '',
          luowen_num: '',
          luowen_type: '',
          nominal_size: '',
          pitch:'',
          size:'',
          type_of_threads:'',
          yaju:''
        }
      }
    },
    methods:{
      speed(isOnce) {
        let _t = this;
        api.speed(_t.search).then(res => {
          let getArr = [],
            treadsA = res.data.treads,
            pitchA = res.data.pitch,
            speedA = res.data.speed,
            sizeA = res.data.size;
          _t.options1 = treadsA;
          _t.options2 = sizeA;
          _t.options3 = pitchA;
          _t.speedGet = speedA;
          if(isOnce == 0){
            _t.search.luowen_type = treadsA.length>0?treadsA[0].luowen_type:'';
          }
          if(isOnce == 1){
            _t.search.nominal_size = sizeA.length>0?sizeA[0].nominal_size:'';
          }
          if(isOnce == 2){
            _t.search.pitch = pitchA.length>0?pitchA[0].pitch:'';
          }
        })
      },
      getNum1(){
        let _t = this;
        _t.num1 = (Number(_t.num2)*_t.speedGet.dajing*3.14/1000).toFixed(1);
        _t.getNum34();
      },
      getNum2(){
        let _t = this;
        _t.num2 = Math.round(Number(_t.num1)*1000/3.14/_t.speedGet.dajing);
        _t.getNum34();
      },
      getNum34(){
        let _t = this;
        _t.num3 = Math.round(Number(_t.num2)*_t.speedGet.yaju);
        _t.num4 = _t.speedGet.yaju;
      },
      getNum5(){
        let _t = this;
        _t.num5 = (Number(_t.num6)*_t.speedGet.dajing*3.14/304.8).toFixed(1);
        _t.getNum78();
      },
      getNum6(){
        let _t = this;
        _t.num6 = Math.round(Number(_t.num5)*304.8/3.14/_t.speedGet.dajing);
        _t.getNum78();
      },
      getNum78(){
        let _t = this;
        _t.num7 = ((Number(_t.speedGet.yaju)*Number(_t.num6)/25.4)*1000/1000).toFixed(3);
        _t.num8 = (Number(_t.speedGet.yaju)/25.4).toFixed(4);
      },
    },
    created(){
      this.speed(0);
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scope>
  .sfc{
    margin-top:20px;
    font-size:1.6rem;
  input[disabled = 'disabled']{
    box-shadow:1px 1px 1px 1px #ddd;
  }
  img{
    width:65%
  }
  .top_title{
    padding-bottom:20px;
  }
  .el-form-item{
    margin-bottom:10px
  }
  .card_s input{
    height:20px;
    line-height: 20px;
    border-radius:10px;
    background-color:#e8e7e4;
  }
  .my_select{
    color: red;
  }
  .el-input__inner{
    height: 35px;
    line-height: 35px;
    color: black;
  }
  .black_bd{
  .el-input__inner{
    /*border-color: black;*/
    border-radius:0;
  }
  }
  .el-button--warning{
    font-weight: bold;
    font-size: 1.6rem;
    padding: 9px 10px;
    margin: 0;
    position: relative;
    left: -5px;
    border-radius:0;
  }
  }
  .el-select-dropdown__item {
    white-space: normal;
    overflow: auto;
    text-overflow: none;
    height:auto;
  }
  .el-card__body{
  .el-form-item{
    margin:-5px 0;
  .el-input.is-disabled .el-input__inner{
    background-color:#F6F3EE;
  }
  }
  }
</style>
