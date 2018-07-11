<template>
  <div class="detail">
    <el-row :gutter="10" class="top_title">
      <el-col :span="12" class="t_r">
        <img src="../images/s_logo.png" alt="">
      </el-col>
      <el-col :span="12">
        <div>商品情报 · 检索</div>
        <div>{{name}}</div>
      </el-col>
    </el-row>
    <el-form class="d_form">
      <el-select v-model="search.thread_type" @change="getList" @focus="getZhuan('thread_type')" placeholder="螺纹种类">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="search.processing_diamete" placeholder="最小加工径（mm）" @change="getList"  @focus="getZhuan('min_processing_diameter')">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="search.pitch" placeholder="牙距" @change="getList"  @focus="getZhuan('pitch')">
        <el-option
          v-for="item in options3"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="search.product_code" placeholder="产品代号" @change="getList"  @focus="getZhuan('product_code')">
        <el-option
          v-for="item in options4"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-row v-if="showTable">
        <el-col :span="24" style="line-height:40px;">
          <span>results: <span style="color:red">{{count}}</span>/{{total}} </span>
          <el-select v-model="size" style="width:25%;float:right">
            <el-option
              v-for="item in rows"
              :key="item.size"
              :label="item.size"
              :value="item.size">
            </el-option>
          </el-select>
          <span style="float:right;margin-right:5px;">每页: </span>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      border
      v-if="showTable"
      :data="tableData"
      @row-click="tableClick"
      style="width: 100%">
      <el-table-column prop="product_code" label="产品代号"></el-table-column>
      <el-table-column prop="thread_type" label="螺纹种类" width="250"></el-table-column>
      <el-table-column prop="blade_distance" label="刃部径(Dc)" width="100"></el-table-column>
      <el-table-column prop="pitch" label="牙距"></el-table-column>
      <el-table-column prop="processing_diamete" label="最小加工径(mm)" width="130"></el-table-column>
      <el-table-column prop="length" label="全长(L)" width="100"></el-table-column>
    </el-table>
    <!--工具条-->
    <!--@current-change="handleCurrentChange"-->
    <el-col :span="24" class="toolbar" v-if="showTable">
      <el-pagination
        background
        class="t_a"
        :page-size=size
        :current-page=page
        small
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total=count>
      </el-pagination>
    </el-col>
    <div class="t_a" style="margin-top:10px;font-size: 1.4rem;color:rgb(59, 156, 232)">
      <img src="../images/play.png" alt="" style="width:1.2rem;height:1.2rem;position: relative;top: 0.2rem;">
      <a href="http://www.yamawa.tw/support/index.html" style="color: #3a8ee6;text-decoration: none">Inquiry & Support</a>
    </div>
    <div class="t_a" style="margin-top:10px;font-size: 1rem;color:#A5A5A5">
      ©2007-2017 YAMAWA MFG. Co., Ltd. All right reserved.
    </div>
  </div>

</template>

<script>
  import api from '@/api/api'
  export default {
    watch:{
      size(n,o){
        this.page = 1;
        this.getList();
      }
    },
    data(){
      return{
        name:'螺纹铣刀',
        showTable:false,
        rows:[
          {size:30},
          {size:50},
          {size:100},
        ],
        search:{
          search:'',
          thread_type:'',//螺纹种类
          processing_diamete:'',//最小加工径（mm）
          pitch:'',//牙距/牙数
          product_code:'',//产品代号,
        },
        options1:[],
        options2:[],
        options3:[],
        options4:[],
        options5:[],
        now:99999,
        total:0,
        count:0,
        size:30,
        page:1,
        tableData: [],
      }
    },
    methods: {
      handleCurrentChange(val){
        this.page = val;
        this.getList();
      },
      tableClick(row, event, column) {
        this.$router.push({path: '/detail3',query:{id:row.id}})
      },
      getZhuan(type) {
        let _t = this;
        let data = {
          search: type,
          'data[thread_type]': _t.search.thread_type,//螺纹种类
          'data[min_processing_diameter]': _t.search.min_processing_diameter,//最小加工径
          'data[pitch]': _t.search.pitch,//牙距/牙数
          'data[product_code]': _t.search.product_code,//产品代号
        };
        api.chongdao(data).then(res => {
          let getArr = [];
          switch (type) {
            case 'thread_type':
              getArr.push({name: '螺纹种类', value: ''});
              for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].thread_type != '-') {
                  getArr.push({name: res.data[i].thread_type, value: res.data[i].thread_type})
                }
              }
              _t.options1 = getArr;
              break;
            case 'min_processing_diameter':
              getArr.push({name: '最小加工径（mm）', value: ''});
              for (let i = 0; i < res.data.length; i++) {
                getArr.push({name: res.data[i].min_processing_diameter, value: res.data[i].min_processing_diameter})
              }
              _t.options2 = getArr;
              break;
            case 'pitch':
              getArr.push({name: '牙距', value: ''});
              for (let i = 0; i < res.data.length; i++) {
                getArr.push({name: res.data[i].pitch, value: res.data[i].pitch})
              }
              _t.options3 = getArr;
              break;
            case 'product_code':
              getArr.push({name: '产品代号', value: ''});
              for (let i = 0; i < res.data.length; i++) {
                getArr.push({name: res.data[i].product_code, value: res.data[i].product_code})
              }
              _t.options4 = getArr;
              break;
          }
        })
      },
      getList(e) {
        let _t = this;
        let data = {
          page:_t.page,
          pageSize:_t.size,
          thread_type: _t.search.thread_type,
          processing_diamete: _t.search.processing_diamete,
          pitch: _t.search.pitch,
          product_code: _t.search.product_code,
        };
        api.chongdaolist(data).then(res => {
          console.log(res);
          _t.total = res.total;
          _t.count = res.count;
          _t.tableData = res.data;
          _t.showTable = true;
        })
      },
    },
    created(){
      // this.getZhuan()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .detail{
    margin-top:20px;
    font-size:2rem;
    img{
      width:70%
    }
    .top_title{
      padding-bottom:20px;
    }
    .d_form{
      >div{
        width:100%;
        margin-bottom:5px;
      }
      .el-row{
        font-size:1.4rem;
      }
    }
  }

</style>
