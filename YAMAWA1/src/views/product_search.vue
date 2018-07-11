<template>
  <div class="p_search">
    <div class="t_a">
      产 品 检 索
    </div>
    <el-row>
      <el-col :span="24" class="p_r">
        <router-link :to="{path:'/product_detail1'}">
          <img src="../images/show_luosigong.jpg" alt="">
          <div class="s_title">螺丝攻</div>
        </router-link>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12" class="p_r">
        <router-link :to="{path:'/product_detail2'}">
          <img src="../images/show_yuanbanya.jpg" alt="">
          <div class="s_title">圆板牙</div>
        </router-link>
      </el-col>
      <el-col :span="12" class="p_r">
        <router-link :to="{path:'/product_detail3'}">
          <img src="../images/show_luowentaidao.jpg" alt="">
          <div class="s_title">螺纹铣刀</div>
        </router-link>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12" class="p_r">
        <router-link :to="{path:'/product_detail4'}">
          <img src="../images/show_zhongxinzuan.jpg" alt="">
          <div class="s_title">中心鑚</div>
        </router-link>
      </el-col>
      <el-col :span="12" class="p_r">
        <router-link :to="{path:'/product_detail5'}">
          <img src="../images/show_kongmiangongju.jpg" alt="">
          <div class="s_title">孔面工具</div>
        </router-link>
      </el-col>
    </el-row>
    <div class="t_a" style="margin-top:10px;font-size: 1rem;color:#A5A5A5">
      ©2007-2017 YAMAWA MFG. Co., Ltd. All right reserved.
    </div>
  </div>

</template>

<script>
    export default {
        name: ""
    }
</script>

<style rel="stylesheet/scss" lang="scss">
  .p_search{
    font-size:2rem;
    .t_a{
      margin:20px 0 10px 0;
    }
    .s_title{
      position: absolute;
      width: 100%;
      text-align: center;
      bottom: 35px;
      color: white;
    }
  }

</style>
