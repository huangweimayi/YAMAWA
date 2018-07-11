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
      <el-form-item label="构型种类" @change="getList" class="t_a">
        <el-radio-group v-model="search.configuration_type" style="width:100%;text-align:left">
          <div v-for="item in options1" v-bind:class="{ center: item.name == '不指定',not_center: item.name != '不指定'}" style="height:85px;line-height:85px;width:45%;margin:0 5px 5px 0;border:1px solid black;box-sizing:border-box;display:inline-block;position:relative">
            <el-radio :label="item.name" :value="item.value">
              {{item.name}}
            </el-radio>
            <img src="../images/ax.jpg" alt="" v-if="item.value == 'Ａ形'" style="width:50%;positiob:absolute;right:0">
            <img src="../images/bx.jpg" alt="" v-if="item.value == 'Ｂ形'" style="width:50%;positiob:absolute;right:0">
            <img src="../images/sx.jpg" alt="" v-if="item.value == 'Ｃ形'" style="width:50%;positiob:absolute;right:0">
            <img src="../images/rx.jpg" alt="" v-if="item.value == 'Ｒ形'" style="width:50%;positiob:absolute;right:0">
          </div>
        </el-radio-group>
      </el-form-item>
      <!--<el-select v-model="search.configuration_type" @change="getList" @focus="getZhuan('configuration_type')" placeholder="构型种类">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>-->
      <el-select v-model="search.brick_diameter" placeholder="钻头径(Dc)" @change="getList"  @focus="getZhuan('brick_diameter')">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="search.handle_diameter" placeholder="柄径(Ds)" @change="getList" @focus="getZhuan('handle_diameter')">
        <el-option
          v-for="item in options3"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="search.angle" placeholder="角度(θ)" @change="getList"  @focus="getZhuan('angle')">
        <el-option
          v-for="item in options4"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="search.product_code" placeholder="产品代号" @change="getList"  @focus="getZhuan('product_code')">
        <el-option
          v-for="item in options5"
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
      <el-table-column prop="material_quality" label="材质"></el-table-column>
      <el-table-column prop="size" label="尺寸" width="150"></el-table-column>
      <el-table-column prop="length" label="全长(OAL)" width="100"></el-table-column>
      <el-table-column prop="brick_diameter" label="钻头径"></el-table-column>
      <el-table-column prop="surface_treatment" label="表面处理"></el-table-column>
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
      },
      'search.configuration_type'(n,o){
        this.getList()
      }
    },
    data(){
      return{
        name:'中心钻',
        showTable:false,
        rows:[
          {size:30},
          {size:50},
          {size:100},
        ],
        search:{
          search:'',
          configuration_type:'不指定',//构型种类
          brick_diameter:'',//钻头径
          handle_diameter:'',//柄径
          angle:'',//角度
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
        this.$router.push({path: '/detail4',query:{id:row.id}})
      },
      getZhuan(type) {
        let _t = this;
        let c_type = _t.search.configuration_type == '不指定'?'':_t.search.configuration_type;
        let data = {
          search: type,
          'data[configuration_type]': c_type,//构型种类
          'data[brick_diameter]': _t.search.brick_diameter,//钻头径
          'data[handle_diameter]': _t.search.handle_diameter,//柄径
          'data[angle]': _t.search.angle,//角度
          'data[product_code]': _t.search.product_code,//产品代号
        };
        api.zhuan(data).then(res => {
          let getArr = [];
          switch (type) {
            case 'configuration_type':
              for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].configuration_type != '-') {
                  getArr.push({name: res.data[i].configuration_type, value: res.data[i].configuration_type})
                }
              }
              getArr.push({name: '不指定', value: ''});
              _t.options1 = getArr;
              break;
            case 'brick_diameter':
              getArr.push({name: '钻头径(Dc)', value: ''});
              for (let i = 0; i < res.data.length; i++) {
                getArr.push({name: res.data[i].brick_diameter, value: res.data[i].brick_diameter})
              }
              _t.options2 = getArr;
              break;
            case 'handle_diameter':
              getArr.push({name: '柄径(Ds)', value: ''});
              for (let i = 0; i < res.data.length; i++) {
                res.data[i].handle_diameter != '-' ? getArr.push({
                  name: res.data[i].handle_diameter,
                  value: res.data[i].handle_diameter
                }) : ''
              }
              _t.options3 = getArr;
              break;
            case 'angle':
              getArr.push({name: '角度(θ)', value: ''});
              for (let i = 0; i < res.data.length; i++) {
                res.data[i].angle != '-' ? getArr.push({
                  name: res.data[i].angle,
                  value: res.data[i].angle
                }) : ''
              }
              _t.options4 = getArr;
              break;
            case 'product_code':
              getArr.push({name: '产品代号', value: ''});
              for (let i = 0; i < res.data.length; i++) {
                getArr.push({name: res.data[i].product_code, value: res.data[i].product_code})
              }
              _t.options5 = getArr;
              break;
          }
        })
      },
      getList(e) {
        let _t = this;
        let data = {
          page:_t.page,
          pageSize:_t.size,
          configuration_type: _t.search.configuration_type,
          brick_diameter: _t.search.brick_diameter,
          handle_diameter: _t.search.handle_diameter,
          angle: _t.search.angle,
          product_code: _t.search.product_code,
        };
        if(data.configuration_type == '不指定'){
          data.configuration_type = ''
        }
        api.zhuanList(data).then(res => {
          console.log(res);
          _t.total = res.total;
          _t.count = res.count;
          _t.tableData = res.data;
          _t.showTable = true;
        })
      },
    },
    created(){
      this.getZhuan('configuration_type')
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
  .el-form-item.t_a{
    .el-form-item__label{
      width:100%;
      text-align: center;
    }
    .center{
      text-align:center;
    }
    .not_center{
      .el-radio{
        width: 65px;
        position:relative;
        top:-10px;
        span{
          display:block
        }
        .el-radio__input{
          position:relative;
          left:16px;
          margin-bottom:5px
        }
      }
    }
  }
  }

</style>
