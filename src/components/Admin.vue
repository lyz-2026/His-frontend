<template>
  <div>
    <el-menu :router="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" :route="{path:'/Admin/Schedule'}">排班管理</el-menu-item>
      <el-menu-item index="2" :route="{path:'/Admin/CheckItem'}">检查项目管理</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'Admin',
    data: function() {
      return {
        activeIndex: "1"
      }
    }
  }
</script>

<style>
</style>
