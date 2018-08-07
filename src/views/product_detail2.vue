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
      <el-select v-model="search.spec" @change="getList" @focus="getYuanban('spec')" placeholder="JIS">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="search.external_diameter" placeholder="外径（D）" @change="getList"  @focus="getYuanban('external_diameter')">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="search.thread_type" placeholder="螺纹种类" @change="getList" @focus="getYuanban('thread_type')">
        <el-option
          v-for="item in options3"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="search.size_app" placeholder="尺寸简写" @change="getList"  @focus="getYuanban('size_app')">
        <el-option
          v-for="item in options4"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="search.pitch" placeholder="牙距/牙数" @change="getList"  @focus="getYuanban('pitch')">
        <el-option
          v-for="item in options5"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="search.product_code" placeholder="产品代号" @change="getList"  @focus="getYuanban('product_code')">
        <el-option
          v-for="item in options6"
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
      v-if="showTable"
      border
      :data="tableData"
      @row-click="tableClick"
      style="width: 100%">
      <el-table-column prop="product_code" label="产品代号"></el-table-column>
      <el-table-column prop="material_quality" label="材质"></el-table-column>
      <el-table-column prop="size" label="尺寸" width="150"></el-table-column>
      <el-table-column prop="external_diameter" label="外径"></el-table-column>
      <el-table-column prop="thickness" label="厚度"></el-table-column>
      <el-table-column prop="accuracy_lv" label="精度等级"></el-table-column>
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
        name:'圆板牙',
        showTable:false,
        rows:[
          {size:30},
          {size:50},
          {size:100},
        ],
        search:{
          search:'',
          spec:'JIS',//构型规格
          external_diameter:'',//外径
          thread_type:'',//螺纹种类
          size_app:'',//尺寸简写
          pitch:'',//牙距牙数
          product_code:'',//产品代号
        },
        options1:[],
        options2:[],
        options3:[],
        options4:[],
        options5:[],
        options6:[],
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
        this.$router.push({path: '/detail2',query:{id:row.id}})
      },
      getYuanban(type) {
        let _t = this;
        let data = {
          search: type,
          'data[spec]': _t.search.spec,//构型规格
          'data[external_diameter]': _t.search.external_diameter,//外径
          'data[thread_type]': _t.search.thread_type,//螺纹种类
          'data[size_app]': _t.search.size_app,//尺寸简写
          'data[pitch]': _t.search.pitch,//牙距牙数
          'data[product_code]': _t.search.product_code,//产品代号
        };
        api.yuanban(data).then(res => {
          let getArr = [];
          switch (type) {
            case 'spec':
              getArr.push({name: '构型规格', value: ''});
              for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].spec != '-') {
                  getArr.push({name: res.data[i].spec, value: res.data[i].spec})
                }
              }
              _t.options1 = getArr;
              break;
            case 'external_diameter':
              getArr.push({name: '外径（D）', value: ''});
              for (let i = 0; i < res.data.length; i++) {
                getArr.push({name: res.data[i].external_diameter, value: res.data[i].external_diameter})
              }
              _t.options2 = getArr;
              break;
            case 'thread_type':
              getArr.push({name: '螺纹种类', value: ''});
              for (let i = 0; i < res.data.length; i++) {
                res.data[i].thread_type != '-' ? getArr.push({
                  name: res.data[i].thread_type,
                  value: res.data[i].thread_type
                }) : ''
              }
              _t.options3 = getArr;
              break;
            case 'size_app':
              getArr.push({name: '尺寸简写', value: ''});
              for (let i = 0; i < res.data.length; i++) {
                res.data[i].size_app != '-' ? getArr.push({
                  name: res.data[i].size_app,
                  value: res.data[i].size_app
                }) : ''
              }
              _t.options4 = getArr;
              break;
            case 'pitch':
              getArr.push({name: '牙距/牙数', value: ''});
              for (let i = 0; i < res.data.length; i++) {
                res.data[i].pitch != '-' ? getArr.push({name: res.data[i].pitch, value: res.data[i].pitch}) : ''
              }
              _t.options5 = getArr;
              break;
            case 'product_code':
              getArr.push({name: '产品代号', value: ''});
              for (let i = 0; i < res.data.length; i++) {
                getArr.push({name: res.data[i].product_code, value: res.data[i].product_code})
              }
              _t.options6 = getArr;
              break;
          }
        })
      },
      getList(e) {
        let _t = this;
        let data = {
          page:_t.page,
          pageSize:_t.size,
          spec: _t.search.spec,
          thread_type: _t.search.thread_type,
          external_diameter: _t.search.external_diameter,
          size_app: _t.search.size_app,
          pitch: _t.search.pitch,
          product_code: _t.search.product_code,
        };
        api.yuanbanlist(data).then(res => {
          console.log(res);
          _t.total = res.total;
          _t.count = res.count;
          _t.tableData = res.data;
          _t.showTable = true;
        })
      },
    },
    created(){
      // this.getYuanban()
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
