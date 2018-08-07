<template>
  <div class="index">
    <el-row class="mb_10">
      <el-col :span="24">
        <img src="../images/logo.png" alt="">
      </el-col>
    </el-row>
    <el-row class="m_10_0">
      <el-col :span="24" class="p_r">
        <router-link to="/product_search">
          <img src="../images/home_product.jpg" alt="">
        </router-link>
        <span class="p_a top_word">产品检索</span>
      </el-col>
    </el-row>
    <div class="m_10_0 t_a">
      加 工 计 算 工 具
    </div>
    <el-row class="m_10_0" :gutter="5">
      <router-link to="/sfc">
        <el-col :span="12">
          <div class="left blue">
            <div>
              建议的加工速度可换算成主轴转速/进给
            </div>
          </div>
        </el-col>
      </router-link>
      <router-link to="/bsc">
        <el-col :span="12">
          <div class="left red">
            <div>
              计算建议的底孔径
            </div>
          </div>
        </el-col>
      </router-link>
    </el-row>
    <el-row :gutter="30" class="link_to">
      <el-col :span="8" class="t_a">
        <a href="http://www.yamawa.tw/support/index.html">
          <img src="../images/home_catalog.jpg" alt="">
          <div>网站目录</div>
        </a>
      </el-col>
      <el-col :span="8" class="t_a">
        <a href="http://www.yamawa.tw/support/index.html">
          <img src="../images/home_search.jpg" alt="">
          <div>咨询、支援</div>
        </a>
      </el-col>
      <el-col :span="8" class="t_a">
        <a href="http://www.yamawa.tw/support/index.html">
          <img src="../images/home_video.jpg" alt="">
          <div>网站动画</div>
        </a>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import api from '@/api/api'
  export default {
    data(){
      return {
        list:[],
      }
    },
    methods:{
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .index{
    font-size:2rem;
  .top_word{
    letter-spacing: 10px;
    display: inline-block;
    text-align: center;
    bottom: 20px;
    width: 100%;
    position: absolute;
    color: white;
    font-size: 2.4rem;
  }
  .link_to{
  a{
    color:black;
    font-size: 1.3rem;
    text-decoration: none;
  }
  }
  .left{
    color:white;
    font-size:1.8rem;
    padding:1.3rem;

  &.red{
     background-color:#CF363B;
  >div{
    height:80px;
    box-sizing:border-box;
    padding-top:1rem;
  }
  }
  &.blue{
     background-color:#34528A;
   }
  >div{
    background:rgba(255,255,255,.2);
    height:80px;
    line-height: 1;
  }
  }
  }
</style>
