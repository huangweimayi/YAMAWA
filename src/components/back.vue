<template>
  <div>
    <div class="top_header"><i class="el-icon-arrow-left back" @click="$router.go(-1)"></i>{{name.name}}</div>
  </div>
</template>

<script>
    export default {
        name: "back",
        props: ['name'],
        created(){
          console.log(this.$router)
        }
    }
</script>

<style scoped  rel="stylesheet/scss" lang="scss">
  .top_header{
    height: 4rem;
    line-height: 4rem;
    background-color: #3F51B5;
    color: white;
    font-size: 2rem;
    position: relative;
    padding-left: 1rem;
    .back{
      margin-right: 2rem;
    }
  }

</style>
