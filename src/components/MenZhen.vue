<template>
  <div>
    <el-menu :router="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" :route="{path:'/MenZhen/MenZhenBL'}">病例首页</el-menu-item>
      <el-menu-item index="2" :route="{path:'/MenZhen/MenZhenJCS'}">检查申请</el-menu-item>
      <!-- <el-menu-item index="3" :route="{path:'/MenZhen/MenZhenJYS'}">检验申请</el-menu-item> -->
      <el-menu-item index="4" :route="{path:'/MenZhen/MenZhenZB'}">确诊</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'MenZhen',
    data: function() {
      return {
        activeIndex: "1"
      }
    }
  }
</script>

<style>
</style>
