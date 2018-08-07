<template>
  <div>
    <!--<back :name="nameData"></back>-->
    <div class="sfc">
      <el-row :gutter="10" class="top_title">
        <el-col :span="12" class="t_r">
          <img src="../images/logo.jpg" alt="">
        </el-col>
        <el-col :span="12">
          <div style="font-size: 1.8rem;">钻孔尺寸</div>
          <div style="font-size: 1.8rem;">计算器</div>
        </el-col>
      </el-row>
      <el-form class="d_form" style="margin-top: 20px">
        <el-row class="mt_20 mb_10">
          <el-col :span="24" class="t_a">
            <el-select v-model="search.luosigong_type" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in options1"
                :key="item.luosigong_type"
                :label="item.luosigong_type"
                :value="item.luosigong_type">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="mb_20">
          <el-col :span="24" class="t_a">
            <el-select v-model="search.type_of_threads" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in options2"
                :key="item.type_of_threads"
                :label="item.type_of_threads"
                :value="item.type_of_threads">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="t_a">
            <!--<div style="color:#fff">1 </div>-->
            <div style="font-weight:bold;margin-bottom: 10px">尺寸</div>
            <el-select v-model="search.nominal_size" placeholder="请选择">
              <el-option
                v-for="item in options3"
                :key="item.nominal_size"
                :label="item.nominal_size"
                :value="item.nominal_size">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="12" class="t_a">
            <!--<div style="color:#fff">1 </div>-->
            <div style="font-weight:bold;margin-bottom: 10px">牙距/牙数</div>
            <!--<div style="font-weight:bold">threads</div>-->
            <el-select v-model="search.pitch" placeholder="请选择">
              <el-option
                v-for="item in options4"
                :key="item.pitch"
                :label="item.pitch"
                :value="item.pitch">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form>
      <el-card style="margin-top: 10px;">
        <el-row v-if="options5.length>0">
          <el-col :span="16" class="left_grey" style="height:40px">
            G class for forming taps
          </el-col>
          <el-col :span="8">
            <el-select v-model="search.class" placeholder="请选择">
              <el-option
                v-for="item in options5"
                :key="item.class"
                :label="item.class"
                :value="item.class">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <!--<el-row>
          <el-col :span="16" class="left_grey">
            Recommended bored hole size (inch)
          </el-col>
          <el-col :span="8">
            <input type="text" v-model="boredNum_inch" style="width:98%">
          </el-col>
        </el-row>-->
        <el-row>
          <el-col :span="16" class="left_grey" style="font-size: 1.6rem;padding:5px 0;">
            推荐的钻孔尺寸 (mm)
          </el-col>
          <el-col :span="8">
            <input type="text" v-model="boredNum" style="width:98%;padding: 5px 0;">
          </el-col>
        </el-row>
      </el-card>
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
      'search.luosigong_type'(n,o){
        this.bored(1)
      },
      'search.type_of_threads'(n,o){
        this.bored(2)
      },
      'search.nominal_size'(n,o){
        this.bored(3)
      },
      'search.pitch'(n,o){
        this.bored(4)
      },
      'search.class'(n,o){
        this.bored(5)
      },
    },
    data(){
      return{
        nameData:{name:'Bord Hole Size'},
        options1:[],
        options2:[],
        options3:[],
        options4:[],
        options5:[],
        boredNum:'',
        boredNum_inch:'',
        search:{
          luosigong_type:'',
          type_of_threads:'',
          nominal_size:'',
          pitch:'',
          'class':'',
        },
      }
    },
    methods:{
      bored(isOnce) {
        let _t = this;
        api.bored(_t.search).then(res => {
          let getArr = [],
            luowenA = res.data.luosigong,
            treadsA = res.data.threads,
            pitchA = res.data.pitch,
            classA = res.data.class,
            sizeA = res.data.size;
          _t.boredNum = res.data.bored ? res.data.bored.recommended_bored_hole_size_mm : '';
          _t.boredNum_inch = res.data.bored ? res.data.bored.recommended_bored_hole_size_inch : '';
          _t.options1 = luowenA;
          _t.options2 = treadsA;
          _t.options3 = sizeA;
          _t.options4 = pitchA;
          _t.options5 = classA;
          if(isOnce == 0){
            _t.search.luosigong_type = luowenA[0].luosigong_type;
          }
          if(isOnce == 1){
            _t.search.type_of_threads = treadsA[0].type_of_threads;
          }
          if(isOnce == 2){
            _t.search.nominal_size = sizeA[0].nominal_size;
          }
          if(isOnce == 3){
            _t.search.pitch = pitchA[0].pitch;
          }
          if(isOnce == 4){
            _t.search.class = classA.length>0?classA[0].class:'';
          }
        })
      },
    },
    created(){
      this.bored(0);
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .sfc{
    margin-top:20px;
    font-size:1.6rem;
  img{
    width:60%
  }
  .top_title{
    padding-bottom:20px;
  }
  .el-form-item{
    margin-bottom:10px
  }
  .left_grey{
    background-color:#f8f5ee;
    border:1px solid #888;
    padding:5px;
    text-align:center;
  }
  .el-input__inner{
    height: 35px;
    line-height: 35px;
    color:black;
  }
  .el-card__body {
    padding: 20px 10px 20px 0;
  }
  }
  .el-select-dropdown__item {
    white-space: normal;
    overflow: auto;
    text-overflow: none;
    height:auto;
  }
</style>
