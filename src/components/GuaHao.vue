<template>
  <div>
    <el-menu :router="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" :route="{path:'/GuaHao/GuaHaoGL'}">门诊挂号处理</el-menu-item>
      <el-menu-item index="2" :route="{path:'/GuaHao/GuaHaoSF'}">门诊收费管理</el-menu-item>
      <el-menu-item index="3" :route="{path:'/GuaHao/GuaHaoTH'}">门诊退号管理</el-menu-item>
    </el-menu>
    <router-view></router-view>

    <!-- v-on:click  @click -->
    <!-- v-bind:router  :router -->
  </div>
</template>

<script>
  export default {
    name: 'GuaHao',
    data: function() {
      return {
        activeIndex: '1',

      }
    },
    methods: {
      handleSelect: function(key, keyPath) {
        console.log("key:" + key);
        console.log("keyPath:" + keyPath);
        this.nav(key);

      },
      nav: function(index) {
        let path = '';
        if (index == '1')
          path = '/GuaHao/GuaHaoGL';
        if (index == '2')
          path = '/GuaHao/GuaHaoSF';
        if (index == '3')
          path = '/GuaHao/GuaHaoTH';
        this.$router.push(path);
      }
    }
  }
</script>

<style>
</style>
