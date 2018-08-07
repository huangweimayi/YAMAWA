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
      <el-select v-model="search.handle_type" @change="getList($event)" @focus="getLuowen('handle_type')" placeholder="螺丝攻种类">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="search.spec" placeholder="JIS" @change="getList"  @focus="getLuowen('spec')">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="search.hole_type" placeholder="底孔形状" @change="getList">
        <el-option
          v-for="item in options3"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="search.thread_type" placeholder="螺纹种类" @change="getList"  @focus="getLuowen('thread_type')">
        <el-option
          v-for="item in options4"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="search.size_app" placeholder="尺寸简写" @change="getList"  @focus="getLuowen('size_app')">
        <el-option
          v-for="item in options5"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="search.pitch" placeholder="牙距/牙数" @change="getList"  @focus="getLuowen('pitch')">
        <el-option
          v-for="item in options6"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="search.qie" placeholder="被切削" @change="getList('qie')"  @focus="getLuowen('qie')">
        <el-option
          v-for="item in options7"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="search.product_code" placeholder="产品代号" @change="getList"  @focus="getLuowen('product_code')">
        <el-option
          v-for="item in options8"
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
      <el-table-column prop="size" label="尺寸" width="120"></el-table-column>
      <el-table-column prop="precision_level" label="精度等级"></el-table-column>
      <el-table-column prop="length" label="全长(L)"></el-table-column>
      <el-table-column prop="handle_diameter" label="柄部径(Ds)"></el-table-column>
      <el-table-column prop="surface_treatment" label="表面处理"></el-table-column>
    </el-table>
    <!--工具条-->
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
    watch: {
      size(n,o){
        this.page = 1;
        this.getList();
      }
    },
    data(){
      return{
        name:'螺丝攻',
        showTable:false,
        rows:[
          {size:30},
          {size:50},
          {size:100},
        ],
        search:{
          search:'handle_type',
          handle_type:'',//螺丝攻种类
          spec:'JIS',//构型规格
          hole_type:'',//底孔形状通孔
          blind_hole:'',//底孔形状盲孔
          thread_type:'',//螺纹种类
          size_app:'',//尺寸简写
          pitch:'',//牙距牙数
          qie:'',//被切削
          product_code:'',//产品代号
        },
        options1:[],
        options2:[],
        options3:[
          {name:'底孔形状',value:''},
          {name:'底孔形状通孔',value:'through_hole'},
          {name:'底孔形状盲孔',value:'blind_hole'},
        ],
        options4:[],
        options5:[],
        options6:[],
        options7:[
          {name:'被切削',value:''},
          {name:'低碳钢',value:'less_carbon_steel'},
          {name:'中碳钢',value:'medium_carbon_steel'},
          {name:'钢碳钢',value:'steel_carbon_steel'},
          {name:'合金钢',value:'alloy_steel'},
          {name:'不锈钢',value:'stainless_steel'},
          {name:'铝滚扎材',value:'al_rolling_material'},
          {name:'铝合金铸件',value:'al_alloy_casting'},
          {name:'锌合金铸件',value:'zn_alloy_casting'},
          {name:'黄铜',value:'brass'},
          {name:'黄铜铸件',value:'brass_casting'},
          {name:'青铜',value:'bronze'},
          {name:'镁合金铸件',value:'mg_alloy_casting'},
          {name:'钛合金',value:'ti_alloy'},
          {name:'镍合金',value:'ni_alloy'},
          {name:'调质钢（25～35HRC）',value:'modulated_steel_25'},
          {name:'调质钢（35～45HRC）',value:'modulated_steel_35'},
          {name:'调质钢（45～55HRC）',value:'modulated_steel_45'},
          {name:'调质钢（50～63HRC）',value:'modulated_steel_50'},
          {name:'调质钢',value:'modulated_steel'},
          {name:'工具钢',value:'tool_steel'},
          {name:'铸铁',value:'cast_iron'},
          {name:'强韧铸铁',value:'strong_cast_iron'},
          {name:'热固性塑料',value:'thermo_set'}
        ],
        options8:[],
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
        this.$router.push({path: '/detail1',query:{id:row.id}})
      },
      getLuowen(type) {
        let _t = this;
        let typeHole = _t.search.hole_type;
        let through = '', blind = '';
        if (typeHole) {
          if (typeHole == 'through_hole') {
            through = '○';
            blind = '';
          } else {
            through = '';
            blind = '○';
          }
        }
        let data = {
          search: type,
          'data[handle_type]': _t.search.handle_type,//螺丝攻种类
          'data[spec]': _t.search.spec,//构型规格
          'data[through_hole]': through,//底孔形状通孔
          'data[blind_hole]': blind,//底孔形状盲孔
          'data[thread_type]': _t.search.thread_type,//螺纹种类
          'data[size_app]': _t.search.size_app,//尺寸简写
          'data[pitch]': _t.search.pitch,//牙距牙数
          'data[product_code]': _t.search.product_code,//产品代号
          'data[qie]': _t.search.qie,//产品代号
        };
        if(!through){
          delete data['data[through_hole]']
        }
        if(!blind){
          delete data['data[blind_hole]']
        }
        api.luowen(data).then(res => {
          let getArr = [];
          switch (type) {
            case 'handle_type':
              getArr.push({name: '螺丝攻种类', value: ''});
              for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].handle_type != '-') {
                  getArr.push({name: res.data[i].handle_type, value: res.data[i].handle_type})
                }
              }
              _t.options1 = getArr;
              break;
            case 'spec':
              getArr.push({name: '构型规格', value: ''});
              for (let i = 0; i < res.data.length; i++) {
                getArr.push({name: res.data[i].spec, value: res.data[i].spec})
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
              _t.options4 = getArr;
              break;
            case 'size_app':
              getArr.push({name: '尺寸简写', value: ''});
              for (let i = 0; i < res.data.length; i++) {
                res.data[i].size_app != '-' ? getArr.push({
                  name: res.data[i].size_app,
                  value: res.data[i].size_app
                }) : ''
              }
              _t.options5 = getArr;
              break;
            case 'pitch':
              getArr.push({name: '牙距/牙数', value: ''});
              for (let i = 0; i < res.data.length; i++) {
                res.data[i].pitch != '-' ? getArr.push({name: res.data[i].pitch, value: res.data[i].pitch}) : ''
              }
              _t.options6 = getArr;
              break;
            case 'product_code':
              getArr.push({name: '产品代号', value: ''});
              for (let i = 0; i < res.data.length; i++) {
                getArr.push({name: res.data[i].product_code, value: res.data[i].product_code})
              }
              _t.options8 = getArr;
              break;
          }
        })
      },
      getList (type) {
        let _t = this;
        let typeHole = _t.search.hole_type;
        let through = '', blind = '';
        if (typeHole) {
          if (typeHole == 'through_hole') {
            through = '○';
            blind = '';
          } else {
            through = '';
            blind = '○';
          }
        }
        if(type == 'qie'){
          _t.search.handle_type = '';
          _t.search.thread_type = '';
          _t.search.hole_type = '';
          _t.search.size_app = '';
          _t.search.pitch = '';
          _t.search.product_code = '';
        }
        let data = {
          page:_t.page,
          pageSize:_t.size,
          handle_type: _t.search.handle_type,
          spec: _t.search.spec,
          through_hole: through,
          blind_hole: blind,
          thread_type: _t.search.thread_type,
          size_app: _t.search.size_app,
          pitch: _t.search.pitch,
          product_code: _t.search.product_code,
          qie: _t.search.qie,
        };
        if( !_t.search.qie ){
          delete data.qie
        }
        if(!blind){
          delete data.blind_hole
        }
        if(!through){
          delete data.through_hole
        }
        api.luowenlist(data).then(res => {
          _t.total = res.total;
          _t.count = res.count;
          _t.tableData = res.data;
          _t.showTable = true;
        })
      },
    },
    created(){
      // this.getLuowen()
    },
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
